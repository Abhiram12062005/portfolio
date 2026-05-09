"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const Ballpit = dynamic(() => import("./Ballpit"), { ssr: false });

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const ballpitOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative h-[300vh] overflow-hidden"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Ballpit background */}
        <motion.div
          style={{ opacity: ballpitOpacity }}
          className="absolute inset-0 z-0"
        >
          {/*
            followCursor defaults to true — Ballpit.tsx auto-detects touch
            devices via `pointer: coarse` and disables cursor interactivity
            (+ scroll-blocking) on mobile/tablet automatically.
          */}
          <Ballpit
            count={120}
            gravity={0.012}
            friction={0.9975}
            wallBounce={0.95}
            colors={[0xc8846a, 0x7a3a20, 0x1a1a1a, 0x0d0d0d, 0x7a9e7e, 0x3a2a1a]}
          />
        </motion.div>

        {/* Radial vignette */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(13,13,13,0.0) 0%, rgba(13,13,13,0.55) 70%, rgba(13,13,13,0.9) 100%)",
          }}
        />

        {/* Top/bottom fades */}
        <div className="absolute inset-x-0 top-0 h-32 z-10 pointer-events-none bg-gradient-to-b from-obsidian to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-56 z-10 pointer-events-none bg-gradient-to-t from-obsidian to-transparent" />

        {/* Grid lines */}
        <div
          className="absolute inset-0 z-10 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(#f5f0e8 1px, transparent 1px), linear-gradient(90deg, #f5f0e8 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        {/* ── Main content ── */}
        <motion.div
          style={{ y: contentY, opacity: contentOpacity }}
          className="relative z-20 h-full flex items-center px-6 sm:px-10 md:px-16 lg:px-24"
        >
          <div className="w-full max-w-7xl mx-auto">

            {/* ── MOBILE layout: stacked, photo on top ── */}
            <div className="flex flex-col md:hidden items-center text-center pt-4 gap-6">

              {/* Label */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="flex items-center justify-center gap-3"
              >
                <span className="section-line" />
                <span className="font-mono text-[10px] text-clay/80 tracking-[0.3em] uppercase">
                  Full-Stack Developer
                </span>
              </motion.div>

              {/* Name */}
              <div>
                <div className="overflow-hidden">
                  <motion.h1
                    initial={{ y: 60 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="font-display text-6xl sm:text-7xl leading-none text-bone glow"
                  >
                    Abhiram
                  </motion.h1>
                </div>
                <div className="overflow-hidden">
                  <motion.h1
                    initial={{ y: 60 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1, delay: 0.58, ease: [0.16, 1, 0.3, 1] }}
                    className="font-display text-6xl sm:text-7xl leading-none text-highlight italic"
                  >
                    Putta
                  </motion.h1>
                </div>
              </div>

              {/* Bio */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="font-sans text-bone/50 text-sm leading-relaxed max-w-xs"
              >
                Building scalable web platforms and intelligent systems using MERN,
                Next.js, and modern backend architecture.
              </motion.p>

              {/* CTA buttons */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
                className="flex items-center gap-5"
              >
                <button
                  data-hover
                  onClick={() =>
                    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="px-6 py-3 bg-clay text-obsidian font-mono text-xs tracking-widest uppercase hover:bg-bone transition-colors duration-300"
                >
                  View Work
                </button>
                <button
                  data-hover
                  onClick={() =>
                    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="font-mono text-xs text-bone/60 hover:text-clay tracking-widest uppercase transition-colors duration-300 border-b border-transparent hover:border-clay pb-px"
                >
                  Let's Talk ↗
                </button>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="flex items-center justify-center gap-6 mt-2"
              >
                {[
                  { n: "2+", label: "Years" },
                  { n: "10+", label: "Projects" },
                  { n: "4+", label: "Internships" },
                ].map((s) => (
                  <div key={s.label} className="border-l border-clay/30 pl-4 text-left">
                    <div className="font-display text-2xl text-clay leading-none">{s.n}</div>
                    <div className="font-mono text-[11px] text-bone/30 uppercase tracking-wider mt-0.5">
                      {s.label}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* ── DESKTOP layout: side by side ── */}
            <div className="hidden md:grid grid-cols-2 gap-12 lg:gap-20 items-center">

              {/* LEFT: Intro */}
              <div>
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="flex items-center gap-3 mb-6"
                >
                  <span className="section-line" />
                  <span className="font-mono text-xs text-clay/80 tracking-[0.3em] uppercase">
                    Full-Stack Developer
                  </span>
                </motion.div>

                <div className="overflow-hidden mb-2">
                  <motion.h1
                    initial={{ y: 80 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="font-display text-6xl md:text-7xl lg:text-8xl leading-none text-bone glow"
                  >
                    Abhiram
                  </motion.h1>
                </div>
                <div className="overflow-hidden mb-8">
                  <motion.h1
                    initial={{ y: 80 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
                    className="font-display text-6xl md:text-7xl lg:text-8xl leading-none text-highlight italic"
                  >
                    Putta
                  </motion.h1>
                </div>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="font-sans text-bone/50 text-base md:text-lg leading-relaxed max-w-4xl mb-10"
                >
                  Building scalable web platforms and intelligent systems
                  using MERN, Next.js, and modern backend architecture.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.0 }}
                  className="flex items-center gap-6"
                >
                  <button
                    data-hover
                    onClick={() =>
                      document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="px-8 py-4 bg-clay text-obsidian font-mono text-sm tracking-widest uppercase hover:bg-bone transition-colors duration-300"
                  >
                    View Work
                  </button>
                  <button
                    data-hover
                    onClick={() =>
                      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="font-mono text-sm text-bone/60 hover:text-clay tracking-widest uppercase transition-colors duration-300 border-b border-transparent hover:border-clay pb-px"
                  >
                    Let's Talk ↗
                  </button>
                </motion.div>

                {/* Stat chips */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.3, duration: 0.8 }}
                  className="flex items-center gap-6 mt-12"
                >
                  {[
                    { n: "2+", label: "Years" },
                    { n: "10+", label: "Projects" },
                    { n: "4+", label: "Internships" },
                  ].map((s) => (
                    <div key={s.label} className="border-l border-clay/30 pl-4">
                      <div className="font-display text-3xl text-clay leading-none">{s.n}</div>
                      <div className="font-mono text-[15px] text-bone/30 uppercase tracking-wider mt-0.5">
                        {s.label}
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* RIGHT: Photo */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="flex justify-center lg:justify-end"
              >
                <div className="relative">
                  <div className="absolute -top-4 -left-4 w-full h-full border border-clay/25 pointer-events-none" />
                  <div className="absolute top-4 right-4 w-full h-full border border-clay/10 pointer-events-none" />

                  <div
                    className="relative w-72 lg:w-80 aspect-[3/4] overflow-hidden"
                    style={{
                      background:
                        "linear-gradient(145deg, #1e1510 0%, #2a1a14 40%, #111 100%)",
                    }}
                  >
                    <Image
                      src="/My_image.png"
                      alt="Abhiram Putta"
                      fill
                      className="object-cover"
                      priority
                    />
                    <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-obsidian/80 to-transparent pointer-events-none" />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <div className="font-mono text-[10px] text-clay/60 tracking-widest uppercase mb-1">
                        Based in Gurgaon
                      </div>
                      <div className="font-display text-lg text-bone/80 italic">
                        Available for work
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </motion.div>

        {/* ── Scroll indicator ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        >
          <span className="font-mono text-[10px] text-bone/30 tracking-[0.3em] uppercase">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-bone/30 to-transparent relative overflow-hidden">
            <motion.div
              animate={{ y: ["-100%", "200%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="absolute inset-x-0 h-1/2 bg-clay"
            />
          </div>
        </motion.div>

        {/* ── Side label (desktop only) ── */}
        <div className="hidden md:block absolute right-8 top-1/2 -translate-y-1/2 -rotate-90 z-20">
          <span className="font-mono text-[10px] text-bone/20 tracking-[0.4em] uppercase">
            Portfolio 2026
          </span>
        </div>
      </div>
    </section>
  );
}