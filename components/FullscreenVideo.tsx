"use client";

import { useRef, useState, useEffect } from "react";

interface FullscreenVideoProps {
  src: string;
  className?: string;
  accent: string;
}

export default function FullscreenVideo({
  src,
  className = "",
  accent,
}: FullscreenVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  /* ── Fullscreen change listener ── */
  useEffect(() => {
    const handleChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handleChange);
    document.addEventListener("webkitfullscreenchange", handleChange);
    document.addEventListener("msfullscreenchange", handleChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleChange);
      document.removeEventListener("webkitfullscreenchange", handleChange);
      document.removeEventListener("msfullscreenchange", handleChange);
    };
  }, []);

  const enterFullscreen = async () => {
    const el = containerRef.current as any;
    if (!el) return;
    try {
      if (el.requestFullscreen) await el.requestFullscreen();
      else if (el.webkitRequestFullscreen) await el.webkitRequestFullscreen();
      else if (el.msRequestFullscreen) await el.msRequestFullscreen();
    } catch (err) {
      console.error("Enter fullscreen error:", err);
    }
  };

  const exitFullscreen = async () => {
    try {
      const doc = document as any;
      if (doc.exitFullscreen) await doc.exitFullscreen();
      else if (doc.webkitExitFullscreen) await doc.webkitExitFullscreen();
      else if (doc.msExitFullscreen) await doc.msExitFullscreen();
    } catch (err) {
      console.error("Exit fullscreen error:", err);
    }
  };

  /* Click on the video area: enter fullscreen if not already in it */
  const handleContainerClick = () => {
    if (!isFullscreen) enterFullscreen();
  };

  /* Close button: exit fullscreen */
  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    exitFullscreen();
  };

  return (
    <div
      ref={containerRef}
      className={`relative group ${className} ${
        isFullscreen ? "cursor-default" : "cursor-zoom-in"
      }`}
      onClick={handleContainerClick}
    >
      <video
        ref={videoRef}
        src={src}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover pointer-events-none"
      />

      {/* Hover hint — only when not fullscreen */}
      {!isFullscreen && (
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md"
            style={{
              backgroundColor: `${accent}25`,
              border: `1px solid ${accent}40`,
              color: accent,
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <polyline points="15 3 21 3 21 9" />
              <polyline points="9 21 3 21 3 15" />
              <line x1="21" y1="3" x2="14" y2="10" />
              <line x1="3" y1="21" x2="10" y2="14" />
            </svg>
            <span className="font-mono text-[10px]">Click to fullscreen</span>
          </div>
        </div>
      )}

      {/* Accent corner indicator — only when not fullscreen */}
      {!isFullscreen && (
        <div
          className="absolute top-0 left-0 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
          style={{
            borderLeft: `2px solid ${accent}`,
            borderTop: `2px solid ${accent}`,
          }}
        />
      )}

      {/* Close button — only when fullscreen */}
      {isFullscreen && (
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 z-[9999] flex items-center justify-center w-11 h-11 rounded-full
                     bg-black/70 hover:bg-black/90 transition-colors duration-150
                     border border-white/25 hover:border-white/50"
          aria-label="Close fullscreen"
          title="Close fullscreen (Esc)"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}
    </div>
  );
}