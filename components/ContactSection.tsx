"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";

const socials = [
  { label: "GitHub", href: "https://github.com/Abhiram12062005" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/abhiram-putta-485322297/" },
  { label: "Instagram", href: "https://www.instagram.com/abhi_ram_1236/" },
];

export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-24 md:py-40 px-6 md:px-20 overflow-hidden bg-obsidian"
    >
      {/* Parallax background */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none">
        <div
          className="absolute bottom-0 left-0 right-0 h-64 md:h-96 opacity-10"
          style={{ background: "radial-gradient(ellipse at 50% 100%, #c8846a 0%, transparent 60%)" }}
        />
        <div className="absolute top-20 -left-20 w-48 md:w-64 h-48 md:h-64 opacity-5 border border-clay rounded-full" />
        <div className="absolute top-40 -right-10 w-32 md:w-40 h-32 md:h-40 opacity-5 border border-sage rounded-full" />
      </motion.div>

      <div className="max-w-5xl mx-auto text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          {/* Label */}
          <div className="flex items-center justify-center gap-3 mb-6 md:mb-8">
            <span className="section-line" />
            <span className="font-mono text-xs text-clay/80 tracking-[0.3em] uppercase">Get In Touch</span>
            <span className="section-line" />
          </div>

          {/* Headline */}
          <h2 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-bone leading-tight md:leading-none mb-6 md:mb-8">
            Let's build something
            <br className="hidden sm:block" />
            {" "}
            <span className="text-highlight italic">extraordinary.</span>
          </h2>

          {/* Sub-copy */}
          <p className="font-sans text-bone/40 text-base md:text-lg max-w-xl mx-auto mb-10 md:mb-16 leading-relaxed px-2">
            Whether you have a project in mind, want to collaborate, or just want to say hello —
            my inbox is always open.
          </p>

          {/* CTA email button */}
          <motion.a
            href="mailto:putta.abhiram.23cse@bmu.edu.in"
            data-hover
            className="group inline-flex items-center gap-3 md:gap-4 px-6 sm:px-10 md:px-12 py-4 md:py-6 border border-clay/40 hover:border-clay text-clay font-mono text-xs md:text-sm tracking-widest uppercase transition-all duration-500 relative overflow-hidden"
            onHoverStart={() => setHovering(true)}
            onHoverEnd={() => setHovering(false)}
            whileHover={{ scale: 1.02 }}
          >
            <motion.span
              className="absolute inset-0 bg-clay"
              initial={{ x: "-100%" }}
              animate={{ x: hovering ? "0%" : "-100%" }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            />
            <span
              className="relative z-10 transition-colors duration-300 break-all sm:break-normal"
              style={{ color: hovering ? "#0d0d0d" : "#c8846a" }}
            >
              putta.abhiram.23cse@bmu.edu.in
            </span>
            <span className="relative z-10 transition-colors duration-300 flex-shrink-0" style={{ color: hovering ? "#0d0d0d" : "#c8846a" }}>
              ↗
            </span>
          </motion.a>

          {/* Social links */}
          <div className="flex items-center justify-center flex-wrap gap-6 md:gap-10 mt-14 md:mt-20">
            {socials.map((s) => (
              <motion.a
                key={s.label}
                href={s.href}
                data-hover
                className="font-mono text-xs text-bone/30 hover:text-clay tracking-widest uppercase transition-colors duration-300"
                whileHover={{ y: -2 }}
              >
                {s.label}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="relative mt-16 md:absolute md:mt-0 md:bottom-8 md:left-8 md:right-8 flex flex-col sm:flex-row items-center justify-between gap-2 md:gap-0">
        <span className="font-mono text-xs text-bone/20">© 2025 Putta Abhiram</span>
        <span className="font-mono text-xs text-bone/20">Crafted with care ♥</span>
      </div>
    </section>
  );
}