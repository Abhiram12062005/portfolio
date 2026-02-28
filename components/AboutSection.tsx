"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const stats = [
  { value: "2+", label: "Years Experience" },
  { value: "10+", label: "Projects Completed" },
  { value: "4+", label: "Internships" },
  { value: "100%", label: "Ownership Mindset" },
];

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const textY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section id="about" ref={ref} className="relative py-40 px-8 md:px-20 overflow-hidden bg-obsidian">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 opacity-10"
        style={{ background: "radial-gradient(circle, #c8846a 0%, transparent 70%)" }} />

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
        {/* Left visual */}
        <motion.div style={{ y: imageY }} className="relative">
          <div className="relative aspect-[3/4] max-w-sm">
            {/* Decorative frame */}
            <div className="absolute -top-4 -left-4 w-full h-full border border-clay/20" />
            <div className="absolute top-4 left-4 w-full h-full border border-clay/10" />

            {/* Image placeholder with gradient */}
            <div className="relative w-full h-full bg-gradient-to-br from-charcoal to-obsidian overflow-hidden">
              <div className="absolute inset-0"
                style={{ background: "linear-gradient(135deg, #1a1a1a 0%, #2a1a14 50%, #1a1a1a 100%)" }} />

                <Image
                  src="/My_image.png"
                  alt="Aarav Kumar"
                  fill
                  className="object-cover opacity-30"
                  priority
                />

              {/* Code snippet decoration */}
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <div className="font-mono text-xs text-clay/30 text-left space-y-2 leading-relaxed">
                  <div><span className="text-sage/50">const</span> <span className="text-clay/60">developer</span> = {"{"}</div>
                  <div className="pl-4"><span className="text-bone/30">name:</span> <span className="text-clay/50">'Putta Abhiram'</span>,</div>
                  <div className="pl-4"><span className="text-bone/30">passion:</span> <span className="text-clay/50">'Application Developer + Entrepreneur'</span>,</div>
                  <div className="pl-4"><span className="text-bone/30">tools:</span> [</div>
                  <div className="pl-8 text-clay/40">'React', 'Next.js','TypeScript'</div>
                  <div className="pl-8 text-clay/40">'JavaScript', 'Node.js', 'Three.js'</div>
                  <div className="pl-4">],</div>
                  <div className="pl-4"><span className="text-bone/30">status:</span> <span className="text-sage/50">'open to work'</span></div>
                  <div>{"}"}</div>
                </div>
              </div>

              {/* Corner accent */}
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-clay/10" style={{ clipPath: "polygon(0 100%, 100% 100%, 0 0)" }} />
            </div>

            {/* Experience badge */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-8 -right-8 bg-clay px-6 py-4"
            >
              <div className="font-mono text-3xl font-bold text-obsidian">2+</div>
              <div className="font-sans text-xs text-obsidian/70 uppercase tracking-wider">Years</div>
            </motion.div>
          </div>
        </motion.div>

        {/* Right text */}
        <motion.div style={{ y: textY }}>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="section-line" />
              <span className="font-mono text-xs text-clay/80 tracking-[0.3em] uppercase">About Me</span>
            </div>

            <h2 className="font-display text-5xl md:text-6xl text-bone leading-tight mb-8">
              I build products that <span className="text-highlight italic">perform.</span>
            </h2>

            <p className="font-sans text-bone/50 leading-relaxed mb-6">
             I’m a full-stack developer who turns ideas into scalable digital platforms. 
             I’ve built secure e-commerce systems, full-stack campus platforms, analytics dashboards, 
             and machine learning models deployed with real evaluation pipelines.
            </p>

            <p className="font-sans text-bone/50 leading-relaxed mb-12">
              My focus is simple:<br></br>
              write clean code, design efficient architecture, and ship production-ready solutions.
              Whether it’s optimizing APIs, integrating payment systems, or training deep learning 
              models — I build with impact in mind.
            </p>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="border-l border-clay/30 pl-4"
                >
                  <div className="font-display text-4xl text-clay mb-1">{stat.value}</div>
                  <div className="font-mono text-xs text-bone/40 uppercase tracking-wider">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
