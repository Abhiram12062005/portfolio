"use client";

import { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
} from "framer-motion";
import CircularGallery from "./Circulargallery";

/* ─── Responsive bend hook ────────────────────────────────────── */
function useResponsiveBend() {
  const [bend, setBend] = useState(5);
  useEffect(() => {
    function update() {
      const w = window.innerWidth;
      if (w < 480)       setBend(0);   // small mobile — flat
      else if (w < 640)  setBend(1);   // mobile
      else if (w < 768)  setBend(2);   // large mobile
      else if (w < 1024) setBend(3);   // tablet
      else if (w < 1280) setBend(4);   // small laptop
      else               setBend(5);   // desktop+
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return bend;
}

/* ─── Data ────────────────────────────────────────────────────── */
const roles = [
  {
    id: "01",
    title: "President",
    org: "The Startup & Entrepreneurship Club",
    short: "S&E Club",
    period: "Aug 2025 — May 2026",
    tenure: "1 Academic Year",
    color: "#c8846a",
    accentDark: "#7a3a20",
    icon: "",
    description:
      "Led the Startup & Entrepreneurship Club with a focus on fostering innovation and building a strong entrepreneurial mindset across campus. Spearheaded initiatives that encouraged students to explore ideas, build solutions, and engage with real-world startup challenges.",
    impact: [
      { value: "10+", label: "Events & Workshops Conducted" },
      { value: "120+", label: "Students Engaged" },
    ],
    responsibilities: [
      "Organised entrepreneurship workshops and hands-on innovation sessions",
      "Conducted speaker sessions with founders and industry professionals",
      "Led ideation challenges and startup-themed competitive events",
      "Created opportunities for students to pitch ideas and validate concepts",
      "Coordinated cross-functional teams to execute large-scale campus events",
    ],
    quote: "Innovation begins when ideas meet execution.",
  },
  {
    id: "02",
    title: "General Secretary",
    org: "EIS 4.0 — International Conference on Entrepreneurship, Innovation & Society",
    short: "EIS 4.0",
    period: "Oct 2025 — Feb 2026",
    tenure: "5 Months",
    color: "#7a9e7e",
    accentDark: "#2a4a2e",
    icon: "",
    description:
      "Served as the General Secretary for EIS 4.0, the flagship international conference by the Institute for Innovation & Entrepreneurship (I2E) at BML Munjal University. Led cross-functional teams to execute a large-scale summit focused on AI, sustainability, and inclusive innovation, bringing together leaders from academia, industry, and policy.",
    impact: [
      { value: "30+", label: "Guests Managed" },
      { value: "40+", label: "Papers Recieved" },
      { value: "Multiple", label: "Cross-Functional Teams Led" },
      { value: "60+", label: "Organising Team" },
    ],
    responsibilities: [
      "Led and coordinated core teams across marketing, social media, operations, sponsorships, and hospitality",
      "Oversaw end-to-end execution of a 2-day national-level conference",
      "Managed speaker communication, scheduling, and on-ground coordination",
      "Directed sponsorship outreach and partner engagement initiatives",
      "Ensured seamless delegate experience through structured operational planning",
      "Aligned event strategy with themes of AI, sustainability, and inclusive innovation",
    ],
    quote: "Innovation scales when leadership aligns vision with execution.",
  },
];

/* ─── Impact stat ─────────────────────────────────────────────── */
function ImpactStat({ value, label, color, delay, inView }: {
  value: string; label: string; color: string; delay: number; inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="flex flex-col items-center text-center"
    >
      <div className="font-display text-4xl md:text-5xl leading-none mb-1" style={{ color }}>
        {value}
      </div>
      <div className="font-mono text-[10px] text-bone/40 tracking-[0.2em] uppercase">{label}</div>
    </motion.div>
  );
}

/* ─── Role panel ──────────────────────────────────────────────── */
function RolePanel({ role, index }: { role: (typeof roles)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const lineW = useTransform(scrollYProgress, [0.1, 0.6], ["0%", "100%"]);
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden py-20 md:py-32 px-6 md:px-20"
      style={{ background: `radial-gradient(ellipse at ${isEven ? "30%" : "70%"} 50%, ${role.color}07 0%, transparent 60%)` }}
    >
      {/* Parallax BG number */}
      <motion.div
        className="absolute pointer-events-none select-none"
        style={{ y: bgY, ...(isEven ? { right: "-5%" } : { left: "-5%" }), top: "50%", transform: "translateY(-50%)" }}
      >
        <span className="font-display font-black leading-none" style={{ fontSize: "clamp(100px, 28vw, 340px)", color: `${role.color}07` }}>
          {role.id}
        </span>
      </motion.div>

      {/* Diagonal stripe */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{ backgroundImage: `repeating-linear-gradient(-55deg, ${role.color}, ${role.color} 1px, transparent 1px, transparent 40px)` }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-start lg:items-center">
        {/* Left / info */}
        <div className={isEven ? "" : "lg:order-2"}>
          <motion.div
            initial={{ opacity: 0, x: isEven ? -30 : 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="inline-flex items-center gap-3 mb-6 md:mb-8 px-4 py-2 border"
            style={{ borderColor: `${role.color}35`, backgroundColor: `${role.color}08` }}
          >
            <span className="text-xl leading-none">{role.icon}</span>
            <span className="font-mono text-xs tracking-[0.25em] uppercase" style={{ color: `${role.color}99` }}>
              College Leadership
            </span>
          </motion.div>

          <div className="overflow-hidden mb-2">
            <motion.h3
              initial={{ y: 80 }}
              animate={inView ? { y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-bone leading-none"
            >
              {role.title}
            </motion.h3>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mb-6 md:mb-8"
          >
            <span className="font-display text-lg md:text-2xl italic" style={{ color: role.color }}>{role.org}</span>
            <div className="flex items-center gap-3 mt-2 flex-wrap">
              <span className="font-mono text-xs text-bone/35">{role.period}</span>
              <span className="w-1 h-1 rounded-full bg-bone/20" />
              <span className="font-mono text-xs text-bone/35">{role.tenure}</span>
            </div>
          </motion.div>

          <div className="h-px bg-white/5 mb-6 md:mb-8 overflow-hidden">
            <motion.div style={{ width: lineW, height: "100%", backgroundColor: role.color, opacity: 0.5 }} />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="font-sans text-sm text-bone/45 leading-relaxed"
          >
            {role.description}
          </motion.p>
        </div>

        {/* Right / stats + responsibilities */}
        <div className={isEven ? "" : "lg:order-1"}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="grid grid-cols-2 gap-4 md:gap-6 p-6 md:p-8 mb-6 border"
            style={{ borderColor: `${role.color}20`, backgroundColor: `${role.color}05` }}
          >
            <div className="col-span-2 font-mono text-[10px] text-bone/30 tracking-[0.3em] uppercase mb-2 pb-4 border-b" style={{ borderColor: `${role.color}15` }}>
              Impact Metrics
            </div>
            {role.impact.map((stat, i) => (
              <ImpactStat key={stat.label} value={stat.value} label={stat.label} color={role.color} delay={0.4 + i * 0.08} inView={inView} />
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="p-6 md:p-8 border"
            style={{ borderColor: `${role.color}20`, backgroundColor: `${role.color}04` }}
          >
            <div className="font-mono text-[10px] text-bone/30 tracking-[0.3em] uppercase mb-5 pb-4 border-b" style={{ borderColor: `${role.color}15` }}>
              Key Responsibilities
            </div>
            <ul className="space-y-3">
              {role.responsibilities.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.07 }}
                  className="flex items-start gap-3 font-sans text-sm text-bone/55 leading-relaxed"
                >
                  <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: role.color }} />
                  {item}
                </motion.li>
              ))}
            </ul>
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="mt-8 pt-6 border-t"
              style={{ borderColor: `${role.color}15` }}
            >
              <p className="font-display text-base italic leading-relaxed" style={{ color: `${role.color}80` }}>
                "{role.quote}"
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* ─── Section ─────────────────────────────────────────────────── */
export default function LeadershipSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: headerScroll } = useScroll({ target: headerRef, offset: ["start end", "end start"] });
  const headerY = useTransform(headerScroll, [0, 1], [40, -40]);

  // Responsive bend — flat on mobile, curved on desktop
  const bend = useResponsiveBend();

  return (
    <section id="leadership" className="relative bg-obsidian overflow-hidden">
      {/* Header */}
      <div ref={headerRef} className="relative px-6 md:px-20 pt-32 pb-0 max-w-7xl mx-auto overflow-hidden">
        <motion.div
          style={{ y: headerY }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="section-line" />
            <span className="font-mono text-xs text-clay/80 tracking-[0.3em] uppercase">College Leadership</span>
          </div>
          <div className="flex items-end justify-between flex-wrap gap-4 mb-6">
            <h2 className="font-display text-5xl md:text-7xl text-bone leading-none">
              Roles<span className="text-clay">.</span>
            </h2>
            <p className="font-sans text-bone/35 text-sm max-w-xs text-right hidden md:block leading-relaxed">
              Beyond code — the chapters where I led, organised, and inspired.
            </p>
          </div>
          <div className="flex items-center gap-4 mt-10">
            <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, #c8846a66, transparent)" }} />
            <span className="font-mono text-[10px] text-bone/20 tracking-widest uppercase">{roles.length} roles</span>
          </div>
        </motion.div>
      </div>

      {/* Role panels */}
      <div className="divide-y divide-white/[0.04]">
        {roles.map((role, i) => <RolePanel key={role.id} role={role} index={i} />)}
      </div>

      {/* Gallery */}
      <div className="pb-24">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "5%" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div style={{ height: "700px" }}>
            <CircularGallery
              bend={bend}
              scrollSpeed={2}
              items={[
                { image: "/events/image-1.jpg", text: "" },
                { image: "/events/image-2.jpg", text: "" },
                { image: "/events/image-3.jpg", text: "" },
                { image: "/events/image-4.jpg", text: "" },
                { image: "/events/image-5.jpg", text: "" },
                { image: "/events/image-6.jpeg", text: "" },
                { image: "/events/image-7.jpeg", text: "" },
                { image: "/events/image-8.jpeg", text: "" },
                { image: "/events/image-9.jpg", text: "" },
                { image: "/events/image-10.jpg", text: "" },
                { image: "/events/image-11.jpg", text: "" },
                { image: "/events/image-12.jpg", text: "" },
                { image: "/events/image-14.jpg", text: "" },
                { image: "/events/image-15.jpg", text: "" },
                { image: "/events/image-16.jpg", text: "" },
                { image: "/events/image-17.jpg", text: "" },
                { image: "/events/image-18.jpg", text: "" },
                { image: "/events/image-19.jpg", text: "" },
                { image: "/events/image-20.jpg", text: "" },
                { image: "/events/image-21.jpg", text: "" },
                { image: "/events/image-22.jpg", text: "" },
              ]}
            />
          </div>
        </motion.div>

        <div className="flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-7xl mx-auto px-8 md:px-20 mb-10 flex flex-col items-center"
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="font-mono text-2xl md:text-3xl text-clay/80 tracking-[0.3em] uppercase">
                Moments & Memories
              </span>
            </div>
            <p className="font-sans text-bone/30 text-sm max-w-sm text-center">
              Drag or scroll to explore snapshots from both roles.
            </p>
          </motion.div>
        </div>

        {/* Bottom divider */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center gap-4 max-w-7xl mx-auto px-8 md:px-20 mt-16"
        >
          <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, transparent, #7a9e7e33, transparent)" }} />
          <span className="font-mono text-[10px] text-bone/15 tracking-widest uppercase">End of leadership chapter</span>
          <div className="flex-1 h-px" style={{ background: "linear-gradient(to left, transparent, #7a9e7e33, transparent)" }} />
        </motion.div>
      </div>
    </section>
  );
}