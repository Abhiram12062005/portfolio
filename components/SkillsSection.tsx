"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const skills = [
  // AI / ML
  { name: "PyTorch", level: 90, category: "AI / ML" },
  { name: "LLM Fine-Tuning (QLoRA / PEFT)", level: 88, category: "AI / ML" },
  { name: "Computer Vision (YOLOv8)", level: 87, category: "AI / ML" },
  { name: "Deep Learning (DenseNet / CNN)", level: 85, category: "AI / ML" },
  { name: "Hugging Face Transformers", level: 86, category: "AI / ML" },
  { name: "scikit-learn / Pandas / NumPy", level: 88, category: "AI / ML" },

  // Backend & APIs
  { name: "Python / FastAPI", level: 88, category: "Backend" },
  { name: "Node.js / Express.js", level: 84, category: "Backend" },
  { name: "REST API Design", level: 87, category: "Backend" },
  { name: "JWT Authentication", level: 85, category: "Backend" },

  // Frontend
  { name: "React.js / Next.js", level: 90, category: "Frontend" },
  { name: "TailwindCSS", level: 92, category: "Frontend" },
  { name: "TypeScript / JavaScript", level: 88, category: "Frontend" },
  { name: "Framer Motion", level: 80, category: "Frontend" },

  // Data & Databases
  { name: "MongoDB", level: 83, category: "Database" },
  { name: "Power BI / Data Visualization", level: 82, category: "Analytics" },
];

const techStack = [
  "PyTorch", "QLoRA", "PEFT", "YOLOv8", "Hugging Face", "FastAPI",
  "DenseNet121", "TinyLlama", "BiFPN", "SPD-Conv", "Focal Loss",
  "React.js", "Next.js", "Node.js", "MongoDB", "PostgreSQL",
  "TailwindCSS", "TypeScript", "Framer Motion", "Power BI",
  "scikit-learn", "Pandas", "NumPy", "JWT", "REST API",
];

export default function SkillsSection() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const x1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const x2 = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <section id="skills" ref={ref} className="relative py-40 overflow-hidden bg-charcoal/30">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, #0d0d0d 0%, #111111 50%, #0d0d0d 100%)" }}
      />

      <div className="relative max-w-7xl mx-auto px-8 md:px-20 mb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="section-line" />
            <span className="font-mono text-xs text-clay/80 tracking-[0.3em] uppercase">Expertise</span>
          </div>
          <h2 className="font-display text-5xl md:text-7xl text-bone leading-none mb-16">
            Skills<span className="text-clay">.</span>
          </h2>
        </motion.div>

        {/* Skills bars */}
        <div className="grid md:grid-cols-2 gap-8">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.7 }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[10px] text-clay/60 uppercase tracking-wider">
                    {skill.category}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-clay/30" />
                  <span className="font-sans text-sm text-bone">{skill.name}</span>
                </div>
                <span className="font-mono text-xs text-bone/40">{skill.level}%</span>
              </div>
              <div className="h-px bg-white/5 relative overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-y-0 left-0"
                  style={{ background: `linear-gradient(90deg, #c8846a, #c8846a88)` }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Parallax marquee rows */}
      <div className="py-8 overflow-hidden border-y border-white/5">
        <motion.div style={{ x: x1 }} className="flex gap-8 whitespace-nowrap">
          {[...techStack, ...techStack].map((tech, i) => (
            <span key={i} className="font-display text-3xl md:text-5xl text-bone/5 italic flex-shrink-0">
              {tech}
            </span>
          ))}
        </motion.div>
      </div>
      <div className="py-8 overflow-hidden border-b border-white/5">
        <motion.div style={{ x: x2 }} className="flex gap-8 whitespace-nowrap">
          {[...techStack.slice().reverse(), ...techStack.slice().reverse()].map((tech, i) => (
            <span key={i} className="font-display text-3xl md:text-5xl text-clay/10 italic flex-shrink-0">
              {tech}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}