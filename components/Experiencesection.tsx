"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  duration: string;
  period: string;
  type: "full-time" | "internship" | "contract" | "freelance";
  current: boolean;
  description: string;
  highlights: string[];
  tech: string[];
  color: string;
}

const experiences: Experience[] = [
  {
    id: "01",
    role: "Full-Stack Web Developer",
    company: "Zittle Technologies",
    location: "Hyderabad, India",
    duration: "3 mos",
    period: "Jun 2025 — Aug 2025",
    type: "internship",
    current: false,
    description:
      "Developed and maintained full-stack features for Zittle's web platform using TypeScript, Next.js, Node.js, and MongoDB. Focused on building scalable backend APIs and responsive frontend interfaces to enhance lead management and business workflows.",
    highlights: [
      "Built scalable full-stack features using Next.js and Node.js",
      "Optimized backend APIs for performance and maintainability",
      "Improved UI responsiveness and user experience",
    ],
    tech: ["Next.js", "TypeScript", "Node.js", "MongoDB"],
    color: "#c8846a",
  },
  {
    id: "02",
    role: "Full-Stack Web Developer",
    company: "Unisphere",
    location: "Haryana, India",
    duration: "5 mos",
    period: "Sept 2024 — Jan 2025",
    type: "internship",
    current: false,
    description:
      "Collaborated on building a MERN stack-based campus engagement platform designed to streamline student activities and improve university-wide interaction systems.",
    highlights: [
      "Developed scalable RESTful APIs using Express.js",
      "Built interactive frontend features with React.js",
      "Worked in a team environment following structured development workflows",
    ],
    tech: ["MongoDB", "Express.js", "React.js", "Node.js"],
    color: "#7a9e7e",
  },
  {
    id: "03",
    role: "Full-Stack Web Developer",
    company: "Sri Sai Maheshwari Industries",
    location: "Hyderabad, India",
    duration: "3 mos",
    period: "Jun 2024 — Aug 2024",
    type: "internship",
    current: false,
    description:
      "Developed a scalable e-commerce platform featuring product listings, cart functionality, and secure payment integration to enhance digital sales operations.",
    highlights: [
      "Built dynamic frontend using React.js",
      "Developed backend logic and APIs using Node.js",
      "Integrated secure payment workflows for checkout",
    ],
    tech: ["React.js", "Node.js", "MongoDB", "Payment Integration"],
    color: "#a0a0cc",
  },
];

const typeLabel: Record<string, string> = {
  "full-time": "Full-time",
  internship: "Internship",
  contract: "Contract",
  freelance: "Freelance",
};

/* ─── Desktop card (alternating left/right) ──────────────────── */
function ExperienceCardDesktop({ exp, index, totalProgress }: { exp: Experience; index: number; totalProgress: any }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-15%" });
  const isLeft = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`relative hidden md:flex items-center gap-0 ${isLeft ? "flex-row" : "flex-row-reverse"}`}
    >
      {/* Card */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -60 : 60, y: 20 }}
        animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="w-[calc(50%-40px)] group"
      >
        <div
          className="relative p-7 border transition-all duration-500 cursor-default"
          style={{ backgroundColor: `${exp.color}06`, borderColor: `${exp.color}22` }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.backgroundColor = `${exp.color}10`;
            (e.currentTarget as HTMLElement).style.borderColor = `${exp.color}50`;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.backgroundColor = `${exp.color}06`;
            (e.currentTarget as HTMLElement).style.borderColor = `${exp.color}22`;
          }}
        >
          <div className="absolute top-0 left-0 w-8 h-8" style={{ background: `linear-gradient(135deg, ${exp.color}40 0%, transparent 60%)` }} />

          <div className="mb-4">
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <span className="font-mono text-[10px] tracking-[0.25em] uppercase px-2 py-0.5 border" style={{ color: exp.color, borderColor: `${exp.color}40` }}>
                {typeLabel[exp.type]}
              </span>
              {exp.current && (
                <span className="flex items-center gap-1.5 font-mono text-[10px] tracking-wider text-sage uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-sage animate-pulse" />
                  Current
                </span>
              )}
            </div>
            <h3 className="font-display text-2xl text-bone leading-tight mb-1">{exp.role}</h3>
            <div className="flex items-center gap-2">
              <span className="font-sans text-base font-medium" style={{ color: exp.color }}>{exp.company}</span>
              <span className="text-bone/20">·</span>
              <span className="font-mono text-xs text-bone/40">{exp.location}</span>
            </div>
          </div>

          <p className="font-sans text-sm text-bone/45 leading-relaxed mb-5">{exp.description}</p>

          <ul className="space-y-2 mb-5">
            {exp.highlights.map((h, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                className="flex items-start gap-2.5 font-sans text-xs text-bone/55 leading-relaxed"
              >
                <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: exp.color }} />
                {h}
              </motion.li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-2">
            {exp.tech.map((t) => (
              <span key={t} className="font-mono text-[10px] px-2.5 py-1 border" style={{ color: `${exp.color}99`, borderColor: `${exp.color}25`, backgroundColor: `${exp.color}08` }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Center connector + dot */}
      <div className="w-20 flex flex-col items-center flex-shrink-0 relative z-10">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className={`absolute top-1/2 -translate-y-1/2 h-px w-8 ${isLeft ? "right-1/2" : "left-1/2"}`}
          style={{ backgroundColor: exp.color, transformOrigin: isLeft ? "right" : "left", opacity: 0.5 }}
        />
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.25, type: "spring", stiffness: 300 }}
          className="relative z-10 w-5 h-5 rounded-full border-2 flex items-center justify-center"
          style={{ borderColor: exp.color, backgroundColor: "#0d0d0d", boxShadow: `0 0 18px ${exp.color}60, 0 0 40px ${exp.color}20` }}
        >
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: exp.color }} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="absolute top-[calc(50%+18px)] text-center w-24"
        >
          <div className="font-mono text-[9px] text-bone/30 leading-tight">{exp.period}</div>
          <div className="font-mono text-[9px] text-bone/20">{exp.duration}</div>
        </motion.div>
      </div>

      <div className="w-[calc(50%-40px)]" />
    </div>
  );
}

/* ─── Mobile card (left spine) ────────────────────────────────── */
function ExperienceCardMobile({ exp, index }: { exp: Experience; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <div ref={ref} className="relative md:hidden flex items-stretch gap-0">
      {/* Left spine: dot + connector */}
      <div className="relative flex flex-col items-center w-10 flex-shrink-0">
        {/* Dot */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.15, type: "spring", stiffness: 300 }}
          className="relative z-10 w-4 h-4 rounded-full border-2 flex items-center justify-center mt-5 flex-shrink-0"
          style={{ borderColor: exp.color, backgroundColor: "#0d0d0d", boxShadow: `0 0 14px ${exp.color}70, 0 0 28px ${exp.color}25` }}
        >
          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: exp.color }} />
        </motion.div>

        {/* Horizontal tick to card */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.35, delay: 0.22, ease: "easeOut" }}
          className="absolute top-[28px] left-[16px] h-px w-5"
          style={{ backgroundColor: exp.color, opacity: 0.5, transformOrigin: "left" }}
        />
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, x: 36, y: 10 }}
        animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="flex-1 mb-8 min-w-0"
      >
        {/* Period above card */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="flex items-center gap-2 mb-2 pl-1"
        >
          <span className="font-mono text-[9px] text-bone/30">{exp.period}</span>
          <span className="font-mono text-[9px] text-bone/20">· {exp.duration}</span>
        </motion.div>

        <div
          className="relative p-5 border transition-all duration-500"
          style={{ backgroundColor: `${exp.color}06`, borderColor: `${exp.color}22` }}
        >
          {/* Corner accent */}
          <div className="absolute top-0 left-0 w-6 h-6" style={{ background: `linear-gradient(135deg, ${exp.color}40 0%, transparent 60%)` }} />

          {/* Badge */}
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className="font-mono text-[9px] tracking-[0.2em] uppercase px-2 py-0.5 border" style={{ color: exp.color, borderColor: `${exp.color}40` }}>
              {typeLabel[exp.type]}
            </span>
            {exp.current && (
              <span className="flex items-center gap-1 font-mono text-[9px] tracking-wider text-sage uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-sage animate-pulse" />
                Current
              </span>
            )}
          </div>

          <h3 className="font-display text-xl text-bone leading-tight mb-1">{exp.role}</h3>
          <div className="flex items-center gap-2 flex-wrap mb-4">
            <span className="font-sans text-sm font-medium" style={{ color: exp.color }}>{exp.company}</span>
            <span className="text-bone/20 text-xs">·</span>
            <span className="font-mono text-[10px] text-bone/40">{exp.location}</span>
          </div>

          <p className="font-sans text-xs text-bone/45 leading-relaxed mb-4">{exp.description}</p>

          <ul className="space-y-2 mb-4">
            {exp.highlights.map((h, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.08, duration: 0.45 }}
                className="flex items-start gap-2 font-sans text-[11px] text-bone/50 leading-relaxed"
              >
                <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: exp.color }} />
                {h}
              </motion.li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-1.5">
            {exp.tech.map((t) => (
              <span key={t} className="font-mono text-[9px] px-2 py-0.5 border" style={{ color: `${exp.color}99`, borderColor: `${exp.color}25`, backgroundColor: `${exp.color}08` }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ─── Section ─────────────────────────────────────────────────── */
export default function ExperienceSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "end 20%"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" ref={sectionRef} className="relative py-40 overflow-hidden bg-obsidian">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 30%, rgba(122,158,126,0.04) 0%, transparent 60%)" }} />

      {/* Section header */}
      <div className="max-w-7xl mx-auto px-6 md:px-20 mb-24">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <div className="flex items-center gap-3 mb-6">
            <span className="section-line" />
            <span className="font-mono text-xs text-clay/80 tracking-[0.3em] uppercase">Career Path</span>
          </div>
          <div className="flex items-end justify-between flex-wrap gap-4">
            <h2 className="font-display text-5xl md:text-7xl text-bone leading-none">
              Experience<span className="text-clay">.</span>
            </h2>
            <span className="font-mono text-sm text-bone/30 pb-2 hidden md:block">{experiences.length} positions</span>
          </div>
        </motion.div>
      </div>

      {/* ── DESKTOP: center spine roadmap ── */}
      <div className="relative hidden md:block max-w-7xl mx-auto px-4 md:px-12">
        {/* Vertical spine */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-white/5">
          <motion.div style={{ height: lineHeight }} className="absolute top-0 left-0 right-0" ref={lineRef}>
            <div className="w-full h-full" style={{ background: "linear-gradient(to bottom, #c8846a, #7a9e7e, #a0a0cc, #cc8080)" }} />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full" style={{ background: "#c8846a", boxShadow: "0 0 20px #c8846a, 0 0 40px rgba(200,132,106,0.5)" }} />
          </motion.div>
        </div>

        <div className="relative flex flex-col gap-20 py-8">
          {experiences.map((exp, i) => (
            <ExperienceCardDesktop key={exp.id} exp={exp} index={i} totalProgress={scrollYProgress} />
          ))}
        </div>

        {/* Desktop end cap */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, type: "spring" }}
          className="relative flex flex-col items-center mt-8 pb-8"
        >
          <div className="w-px h-12" style={{ background: "linear-gradient(to bottom, #c8846a22, transparent)" }} />
          <div className="w-12 h-12 rounded-full border border-clay/30 flex items-center justify-center" style={{ background: "radial-gradient(circle, #1a0e0a, #0d0d0d)" }}>
            <span className="font-display text-xl text-clay/60 italic">AP</span>
          </div>
          <span className="font-mono text-[10px] text-bone/25 tracking-[0.3em] uppercase mt-3">The journey continues</span>
        </motion.div>
      </div>

      {/* ── MOBILE: left spine roadmap ── */}
      <div className="relative md:hidden max-w-7xl mx-auto px-4">
        {/* Left vertical spine */}
        <div className="absolute left-[28px] top-0 bottom-0 w-px bg-white/5">
          <motion.div style={{ height: lineHeight }} className="absolute top-0 left-0 right-0">
            <div className="w-full h-full" style={{ background: "linear-gradient(to bottom, #c8846a, #7a9e7e, #a0a0cc, #cc8080)" }} />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full" style={{ background: "#c8846a", boxShadow: "0 0 14px #c8846a, 0 0 28px rgba(200,132,106,0.5)" }} />
          </motion.div>
        </div>

        <div className="relative flex flex-col py-4">
          {experiences.map((exp, i) => (
            <ExperienceCardMobile key={exp.id} exp={exp} index={i} />
          ))}
        </div>

        {/* Mobile end cap */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, type: "spring" }}
          className="relative flex flex-col items-start pb-8 pl-[18px]"
        >
          <div className="w-10 h-10 rounded-full border border-clay/30 flex items-center justify-center" style={{ background: "radial-gradient(circle, #1a0e0a, #0d0d0d)" }}>
            <span className="font-display text-base text-clay/60 italic">AP</span>
          </div>
          <span className="font-mono text-[9px] text-bone/25 tracking-[0.3em] uppercase mt-2">The journey continues</span>
        </motion.div>
      </div>
    </section>
  );
}