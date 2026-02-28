"use client";

import { useRef, useEffect } from 'react';
import {
  Clock,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  SRGBColorSpace,
  MathUtils,
  Vector2,
  Vector3,
  MeshPhysicalMaterial,
  ShaderChunk,
  Color,
  Object3D,
  InstancedMesh,
  PMREMGenerator,
  SphereGeometry,
  AmbientLight,
  PointLight,
  ACESFilmicToneMapping,
  Raycaster,
  Plane,
} from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

// ─── Mini Three.js wrapper ───────────────────────────────────────────────────
class ThreeApp {
  canvas: HTMLCanvasElement;
  camera: PerspectiveCamera;
  cameraFov: number;
  cameraMinAspect?: number;
  cameraMaxAspect?: number;
  maxPixelRatio?: number;
  minPixelRatio?: number;
  scene: Scene;
  renderer: WebGLRenderer;
  size = { width: 0, height: 0, wWidth: 0, wHeight: 0, ratio: 0, pixelRatio: 0 };
  onBeforeRender: (t: any) => void = () => {};
  onAfterRender: (t: any) => void = () => {};
  onAfterResize: (s: any) => void = () => {};
  private _isVisible = false;
  private _running = false;
  private _ro?: ResizeObserver;
  private _io?: IntersectionObserver;
  private _raf?: number;
  private _resizeTimer?: ReturnType<typeof setTimeout>;
  private _clock = new Clock();
  private _time = { elapsed: 0, delta: 0 };
  private _opts: any;
  isDisposed = false;

  constructor(opts: any) {
    this._opts = opts;
    this.camera = new PerspectiveCamera();
    this.cameraFov = this.camera.fov;
    this.scene = new Scene();

    if (opts.canvas) this.canvas = opts.canvas;
    else if (opts.id) this.canvas = document.getElementById(opts.id) as HTMLCanvasElement;
    else throw new Error('ThreeApp: Missing canvas or id');

    this.canvas.style.display = 'block';
    this.renderer = new WebGLRenderer({
      canvas: this.canvas,
      powerPreference: 'high-performance',
      ...(opts.rendererOptions ?? {}),
    });
    this.renderer.outputColorSpace = SRGBColorSpace;

    window.addEventListener('resize', this._onResize.bind(this));
    if (opts.size === 'parent' && this.canvas.parentNode) {
      this._ro = new ResizeObserver(this._onResize.bind(this));
      this._ro.observe(this.canvas.parentNode as Element);
    }
    this._io = new IntersectionObserver(
      ([entry]) => {
        this._isVisible = entry.isIntersecting;
        this._isVisible ? this._startLoop() : this._stopLoop();
      },
      { threshold: 0 }
    );
    this._io.observe(this.canvas);
    document.addEventListener('visibilitychange', this._onVisibility.bind(this));

    this.resize();
  }

  private _onVisibility() {
    if (this._isVisible) document.hidden ? this._stopLoop() : this._startLoop();
  }
  private _onResize() {
    clearTimeout(this._resizeTimer!);
    this._resizeTimer = setTimeout(() => this.resize(), 100);
  }

  resize() {
    let w: number, h: number;
    if (this._opts.size === 'parent' && this.canvas.parentNode) {
      w = (this.canvas.parentNode as HTMLElement).offsetWidth;
      h = (this.canvas.parentNode as HTMLElement).offsetHeight;
    } else {
      w = window.innerWidth;
      h = window.innerHeight;
    }
    this.size.width = w;
    this.size.height = h;
    this.size.ratio = w / h;

    this.camera.aspect = w / h;
    if (this.cameraMaxAspect && this.camera.aspect > this.cameraMaxAspect) {
      const t = Math.tan(MathUtils.degToRad(this.cameraFov / 2)) / (this.camera.aspect / this.cameraMaxAspect);
      this.camera.fov = 2 * MathUtils.radToDeg(Math.atan(t));
    } else {
      this.camera.fov = this.cameraFov;
    }
    this.camera.updateProjectionMatrix();

    const fovRad = (this.camera.fov * Math.PI) / 180;
    this.size.wHeight = 2 * Math.tan(fovRad / 2) * this.camera.position.length();
    this.size.wWidth = this.size.wHeight * this.camera.aspect;

    let pr = window.devicePixelRatio;
    if (this.maxPixelRatio && pr > this.maxPixelRatio) pr = this.maxPixelRatio;
    this.renderer.setSize(w, h);
    this.renderer.setPixelRatio(pr);
    this.size.pixelRatio = pr;
    this.onAfterResize(this.size);
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  private _startLoop() {
    if (this._running) return;
    this._running = true;
    this._clock.start();
    const tick = () => {
      this._raf = requestAnimationFrame(tick);
      this._time.delta = this._clock.getDelta();
      this._time.elapsed += this._time.delta;
      this.onBeforeRender(this._time);
      this.render();
      this.onAfterRender(this._time);
    };
    tick();
  }

  private _stopLoop() {
    if (!this._running) return;
    cancelAnimationFrame(this._raf!);
    this._running = false;
    this._clock.stop();
  }

  clear() {
    this.scene.traverse((obj: any) => {
      if (obj.isMesh) {
        obj.geometry?.dispose();
        if (obj.material) {
          Object.values(obj.material).forEach((v: any) => v?.dispose?.());
          obj.material.dispose();
        }
      }
    });
    this.scene.clear();
  }

  dispose() {
    window.removeEventListener('resize', this._onResize.bind(this));
    this._ro?.disconnect();
    this._io?.disconnect();
    document.removeEventListener('visibilitychange', this._onVisibility.bind(this));
    this._stopLoop();
    this.clear();
    this.renderer.dispose();
    this.isDisposed = true;
  }
}

// ─── Pointer / touch tracker ─────────────────────────────────────────────────
const pointerMap = new Map<HTMLElement, any>();
const globalPointer = new Vector2();
let listenersAdded = false;

function createPointer(opts: any) {
  const state = {
    position: new Vector2(),
    nPosition: new Vector2(),
    hover: false,
    touching: false,
    onEnter() {},
    onMove() {},
    onClick() {},
    onLeave() {},
    dispose() {},
    ...opts,
  };
  pointerMap.set(opts.domElement, state);
  if (!listenersAdded) {
    document.body.addEventListener('pointermove', onPointerMove);
    document.body.addEventListener('pointerleave', onPointerLeave);
    document.body.addEventListener('click', onPointerClick);
    document.body.addEventListener('touchstart', onTouchStart, { passive: false });
    document.body.addEventListener('touchmove', onTouchMove, { passive: false });
    document.body.addEventListener('touchend', onTouchEnd, { passive: false });
    document.body.addEventListener('touchcancel', onTouchEnd, { passive: false });
    listenersAdded = true;
  }
  state.dispose = () => {
    pointerMap.delete(opts.domElement);
    if (pointerMap.size === 0) {
      document.body.removeEventListener('pointermove', onPointerMove);
      document.body.removeEventListener('pointerleave', onPointerLeave);
      document.body.removeEventListener('click', onPointerClick);
      document.body.removeEventListener('touchstart', onTouchStart);
      document.body.removeEventListener('touchmove', onTouchMove);
      document.body.removeEventListener('touchend', onTouchEnd);
      document.body.removeEventListener('touchcancel', onTouchEnd);
      listenersAdded = false;
    }
  };
  return state;
}

function updatePointer(state: any, rect: DOMRect) {
  state.position.x = globalPointer.x - rect.left;
  state.position.y = globalPointer.y - rect.top;
  state.nPosition.x = (state.position.x / rect.width) * 2 - 1;
  state.nPosition.y = -(state.position.y / rect.height) * 2 + 1;
}
function isOverRect(rect: DOMRect) {
  const { x, y } = globalPointer;
  return x >= rect.left && x <= rect.left + rect.width && y >= rect.top && y <= rect.top + rect.height;
}
function onPointerMove(e: PointerEvent) {
  globalPointer.set(e.clientX, e.clientY);
  for (const [el, s] of pointerMap) {
    const r = el.getBoundingClientRect();
    if (isOverRect(r)) {
      updatePointer(s, r);
      if (!s.hover) { s.hover = true; s.onEnter(s); }
      s.onMove(s);
    } else if (s.hover && !s.touching) { s.hover = false; s.onLeave(s); }
  }
}
function onPointerLeave() {
  for (const s of pointerMap.values()) { if (s.hover) { s.hover = false; s.onLeave(s); } }
}
function onPointerClick(e: MouseEvent) {
  globalPointer.set(e.clientX, e.clientY);
  for (const [el, s] of pointerMap) {
    const r = el.getBoundingClientRect();
    updatePointer(s, r);
    if (isOverRect(r)) s.onClick(s);
  }
}
function onTouchStart(e: TouchEvent) {
  if (!e.touches.length) return;
  e.preventDefault();
  globalPointer.set(e.touches[0].clientX, e.touches[0].clientY);
  for (const [el, s] of pointerMap) {
    const r = el.getBoundingClientRect();
    if (isOverRect(r)) { s.touching = true; updatePointer(s, r); if (!s.hover) { s.hover = true; s.onEnter(s); } s.onMove(s); }
  }
}
function onTouchMove(e: TouchEvent) {
  if (!e.touches.length) return;
  e.preventDefault();
  globalPointer.set(e.touches[0].clientX, e.touches[0].clientY);
  for (const [el, s] of pointerMap) {
    const r = el.getBoundingClientRect();
    updatePointer(s, r);
    if (isOverRect(r)) { if (!s.hover) { s.hover = true; s.touching = true; s.onEnter(s); } s.onMove(s); }
    else if (s.hover && s.touching) s.onMove(s);
  }
}
function onTouchEnd() {
  for (const s of pointerMap.values()) { if (s.touching) { s.touching = false; if (s.hover) { s.hover = false; s.onLeave(s); } } }
}

// ─── Physics ──────────────────────────────────────────────────────────────────
const { randFloat, randFloatSpread } = MathUtils;
const _v1 = new Vector3(), _v2 = new Vector3(), _v3 = new Vector3();
const _vel1 = new Vector3(), _vel2 = new Vector3();
const _diff = new Vector3(), _push1 = new Vector3(), _push2 = new Vector3();
const _sphere0 = new Vector3();

class BallPhysics {
  config: any;
  positionData: Float32Array;
  velocityData: Float32Array;
  sizeData: Float32Array;
  center: Vector3;

  constructor(config: any) {
    this.config = config;
    this.positionData = new Float32Array(3 * config.count).fill(0);
    this.velocityData = new Float32Array(3 * config.count).fill(0);
    this.sizeData = new Float32Array(config.count).fill(1);
    this.center = new Vector3();
    this._init();
    this.setSizes();
  }

  _init() {
    const { config: c, positionData: p } = this;
    this.center.toArray(p, 0);
    for (let i = 1; i < c.count; i++) {
      const b = 3 * i;
      p[b] = randFloatSpread(2 * c.maxX);
      p[b + 1] = randFloatSpread(2 * c.maxY);
      p[b + 2] = randFloatSpread(2 * c.maxZ);
    }
  }

  setSizes() {
    const { config: c, sizeData: s } = this;
    s[0] = c.size0;
    for (let i = 1; i < c.count; i++) s[i] = randFloat(c.minSize, c.maxSize);
  }

  update(e: any) {
    const { config: c, positionData: p, velocityData: v, sizeData: sz } = this;
    let start = 0;
    if (c.controlSphere0) {
      start = 1;
      _sphere0.fromArray(p, 0);
      _sphere0.lerp(this.center, 0.1).toArray(p, 0);
      _vel1.set(0, 0, 0).toArray(v, 0);
    }
    for (let i = start; i < c.count; i++) {
      const b = 3 * i;
      _v1.fromArray(p, b);
      _vel1.fromArray(v, b);
      _vel1.y -= e.delta * c.gravity * sz[i];
      _vel1.multiplyScalar(c.friction);
      _vel1.clampLength(0, c.maxVelocity);
      _v1.add(_vel1);
      _v1.toArray(p, b);
      _vel1.toArray(v, b);
    }
    for (let i = start; i < c.count; i++) {
      const b = 3 * i;
      _v1.fromArray(p, b);
      _vel1.fromArray(v, b);
      const r1 = sz[i];
      for (let j = i + 1; j < c.count; j++) {
        const bj = 3 * j;
        _v2.fromArray(p, bj);
        _vel2.fromArray(v, bj);
        const r2 = sz[j];
        _diff.copy(_v2).sub(_v1);
        const dist = _diff.length();
        const sum = r1 + r2;
        if (dist < sum) {
          const overlap = sum - dist;
          _push1.copy(_diff).normalize().multiplyScalar(0.5 * overlap);
          _push2.copy(_push1).multiplyScalar(Math.max(_vel1.length(), 1));
          const _push2b = _push1.clone().multiplyScalar(Math.max(_vel2.length(), 1));
          _v1.sub(_push1); _vel1.sub(_push2);
          _v1.toArray(p, b); _vel1.toArray(v, b);
          _v2.add(_push1); _vel2.add(_push2b);
          _v2.toArray(p, bj); _vel2.toArray(v, bj);
        }
      }
      if (c.controlSphere0) {
        _sphere0.fromArray(p, 0);
        _diff.copy(_sphere0).sub(_v1);
        const dist = _diff.length();
        const sum = r1 + sz[0];
        if (dist < sum) {
          const diff2 = sum - dist;
          _push1.copy(_diff.normalize()).multiplyScalar(diff2);
          _push2.copy(_push1).multiplyScalar(Math.max(_vel1.length(), 2));
          _v1.sub(_push1); _vel1.sub(_push2);
        }
      }
      if (Math.abs(_v1.x) + r1 > c.maxX) { _v1.x = Math.sign(_v1.x) * (c.maxX - r1); _vel1.x = -_vel1.x * c.wallBounce; }
      if (c.gravity === 0) {
        if (Math.abs(_v1.y) + r1 > c.maxY) { _v1.y = Math.sign(_v1.y) * (c.maxY - r1); _vel1.y = -_vel1.y * c.wallBounce; }
      } else if (_v1.y - r1 < -c.maxY) { _v1.y = -c.maxY + r1; _vel1.y = -_vel1.y * c.wallBounce; }
      const mz = Math.max(c.maxZ, c.maxSize);
      if (Math.abs(_v1.z) + r1 > mz) { _v1.z = Math.sign(_v1.z) * (c.maxZ - r1); _vel1.z = -_vel1.z * c.wallBounce; }
      _v1.toArray(p, b); _vel1.toArray(v, b);
    }
  }
}

// ─── SSS Material ─────────────────────────────────────────────────────────────
class SSSMaterial extends MeshPhysicalMaterial {
  uniforms: any;
  onBeforeCompile2?: (shader: any) => void;

  constructor(params?: any) {
    super(params);
    this.uniforms = {
      thicknessDistortion: { value: 0.1 },
      thicknessAmbient: { value: 0 },
      thicknessAttenuation: { value: 0.1 },
      thicknessPower: { value: 2 },
      thicknessScale: { value: 10 },
    };
    (this as any).defines = (this as any).defines || {};
    (this as any).defines.USE_UV = '';
    this.onBeforeCompile = (shader: any) => {
      Object.assign(shader.uniforms, this.uniforms);
      shader.fragmentShader = `
        uniform float thicknessPower;
        uniform float thicknessScale;
        uniform float thicknessDistortion;
        uniform float thicknessAmbient;
        uniform float thicknessAttenuation;
      ` + shader.fragmentShader;
      shader.fragmentShader = shader.fragmentShader.replace('void main() {', `
        void RE_Direct_Scattering(const in IncidentLight directLight, const in vec2 uv, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, inout ReflectedLight reflectedLight) {
          vec3 scatteringHalf = normalize(directLight.direction + (geometryNormal * thicknessDistortion));
          float scatteringDot = pow(saturate(dot(geometryViewDir, -scatteringHalf)), thicknessPower) * thicknessScale;
          #ifdef USE_COLOR
            vec3 scatteringIllu = (scatteringDot + thicknessAmbient) * vColor;
          #else
            vec3 scatteringIllu = (scatteringDot + thicknessAmbient) * diffuse;
          #endif
          reflectedLight.directDiffuse += scatteringIllu * thicknessAttenuation * directLight.color;
        }
        void main() {
      `);
      const t = ShaderChunk.lights_fragment_begin.replaceAll(
        'RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );',
        `RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
         RE_Direct_Scattering(directLight, vUv, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, reflectedLight);`
      );
      shader.fragmentShader = shader.fragmentShader.replace('#include <lights_fragment_begin>', t);
      this.onBeforeCompile2?.(shader);
    };
  }
}

// ─── InstancedSpheres ────────────────────────────────────────────────────────
const _dummy = new Object3D();

const DEFAULT_CONFIG = {
  count: 200,
  colors: [0x000000],
  ambientColor: 0xffffff,
  ambientIntensity: 1,
  lightIntensity: 200,
  materialParams: { metalness: 0.5, roughness: 0.5, clearcoat: 1, clearcoatRoughness: 0.15 },
  minSize: 0.5,
  maxSize: 1,
  size0: 1,
  gravity: 0.5,
  friction: 0.9975,
  wallBounce: 0.95,
  maxVelocity: 0.15,
  maxX: 5, maxY: 5, maxZ: 2,
  controlSphere0: false,
  followCursor: true,
};

class InstancedSpheres extends InstancedMesh {
  config: any;
  physics: BallPhysics;
  ambientLight: AmbientLight;
  light: PointLight;

  constructor(renderer: WebGLRenderer, config: any = {}) {
    const c = { ...DEFAULT_CONFIG, ...config };
    const env = new PMREMGenerator(renderer).fromScene(new (RoomEnvironment as any)()).texture;
    const geo = new SphereGeometry();
    const mat = new SSSMaterial({ envMap: env, ...c.materialParams });
    mat.envMapRotation.x = -Math.PI / 2;
    super(geo, mat, c.count);
    this.config = c;
    this.physics = new BallPhysics(c);
    this.ambientLight = new AmbientLight(c.ambientColor, c.ambientIntensity);
    this.add(this.ambientLight);
    this.light = new PointLight(c.colors[0], c.lightIntensity);
    this.add(this.light);
    this._applyColors(c.colors);
  }

  _applyColors(cols: any[]) {
    if (!Array.isArray(cols) || cols.length <= 1) return;
    const parsed = cols.map(c => new Color(c));
    for (let i = 0; i < this.count; i++) {
      const ratio = i / this.count;
      const scaled = ratio * (parsed.length - 1);
      const idx = Math.floor(scaled);
      const alpha = scaled - idx;
      const start = parsed[idx];
      const end = parsed[Math.min(idx + 1, parsed.length - 1)];
      const col = new Color(
        start.r + alpha * (end.r - start.r),
        start.g + alpha * (end.g - start.g),
        start.b + alpha * (end.b - start.b)
      );
      this.setColorAt(i, col);
      if (i === 0) this.light.color.copy(col);
    }
    this.instanceColor!.needsUpdate = true;
  }

  update(e: any) {
    this.physics.update(e);
    for (let i = 0; i < this.count; i++) {
      _dummy.position.fromArray(this.physics.positionData, 3 * i);
      _dummy.scale.setScalar(i === 0 && !this.config.followCursor ? 0 : this.physics.sizeData[i]);
      _dummy.updateMatrix();
      this.setMatrixAt(i, _dummy.matrix);
      if (i === 0) this.light.position.copy(_dummy.position);
    }
    this.instanceMatrix.needsUpdate = true;
  }
}

// ─── Factory ──────────────────────────────────────────────────────────────────
function createBallpit(canvas: HTMLCanvasElement, opts: any = {}) {
  const app = new ThreeApp({ canvas, size: 'parent', rendererOptions: { antialias: true, alpha: true } });
  app.renderer.toneMapping = ACESFilmicToneMapping;
  app.camera.position.set(0, 0, 20);
  app.camera.lookAt(0, 0, 0);
  app.cameraMaxAspect = 1.5;
  app.resize();

  let spheres: InstancedSpheres;
  let paused = false;

  const raycaster = new Raycaster();
  const plane = new Plane(new Vector3(0, 0, 1), 0);
  const hit = new Vector3();

  canvas.style.touchAction = 'none';
  canvas.style.userSelect = 'none';

  function init(config: any) {
    if (spheres) { app.clear(); app.scene.remove(spheres); }
    spheres = new InstancedSpheres(app.renderer, config);
    app.scene.add(spheres);
  }

  init(opts);

  const pointer = createPointer({
    domElement: canvas,
    onMove() {
      raycaster.setFromCamera(pointer.nPosition, app.camera);
      app.camera.getWorldDirection(plane.normal);
      raycaster.ray.intersectPlane(plane, hit);
      spheres.physics.center.copy(hit);
      spheres.config.controlSphere0 = true;
    },
    onLeave() { spheres.config.controlSphere0 = false; },
  });

  app.onBeforeRender = (t) => { if (!paused) spheres.update(t); };
  app.onAfterResize = (s) => {
    spheres.config.maxX = s.wWidth / 2;
    spheres.config.maxY = s.wHeight / 2;
  };

  return {
    three: app,
    get spheres() { return spheres; },
    togglePause() { paused = !paused; },
    dispose() { pointer.dispose(); app.dispose(); },
  };
}

// ─── React Component ──────────────────────────────────────────────────────────
interface BallpitProps {
  className?: string;
  followCursor?: boolean;
  count?: number;
  gravity?: number;
  friction?: number;
  wallBounce?: number;
  colors?: number[];
  [key: string]: any;
}

const Ballpit = ({ className = '', followCursor = true, ...props }: BallpitProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const instanceRef = useRef<any>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    instanceRef.current = createBallpit(canvas, { followCursor, ...props });
    return () => { instanceRef.current?.dispose(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: '100%', height: '100%', display: 'block' }}
    />
  );
};

export default Ballpit;
