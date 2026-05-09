"use client";

import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import Image from "next/image";
import FullscreenVideo from "./FullscreenVideo";

const projects = [
  {
    id: "01",
    title: "SmartFarm AI – QLoRA Fine-Tuned LLM for Agricultural Advisory",
    category: "LLM Fine-Tuning / NLP",
    year: "2025",
    description:
      "Fine-tuned TinyLlama-1.1B using QLoRA, achieving +161% ROUGE-L and +2,152% BLEU improvements while reducing VRAM usage to 0.72 GB. Built an automated data pipeline converting ML outputs into 900+ Alpaca-format pairs and deployed the model via FastAPI and Next.js for real-time streaming inference.",
    tags: ["LLM Fine-Tuning", "QLoRA", "PEFT", "PyTorch", "Hugging Face", "FastAPI", "Streaming Inference", "ROUGE", "BLEU"],
    color: "#4ADE80",
    bgColor: "#0F1F15",
    accent: "#4ADE80",
    media: { type: "video", src: "/demo/smart-agri-demo.mp4" },
    github_link: "https://github.com/Abhiram12062005/",
  },
  {
    id: "02",
    title: "CADI-AI – Object Detection for Plant Stress Analysis",
    category: "Computer Vision / Object Detection",
    year: "2025",
    description:
      "Modified YOLOv8s with SPD-Conv, EMA Attention, and BiFPN for small-object plant stress detection, improving mAP@0.5 by +21.9% and F1 by +10.4%. Addressed class imbalance via Focal Loss and channel-spatial attention; achieved better Precision-Recall curves across 3 stress classes (abiotic, insect, disease).",
    tags: ["Object Detection", "YOLOv8", "Computer Vision", "Small-Object Detection", "SPD-Conv", "EMA Attention", "BiFPN", "PyTorch"],
    color: "#3B82F6",
    bgColor: "#0F1723",
    accent: "#3B82F6",
    media: { type: "video", src: "/demo/CADI-demo.mp4" },
    github_link: "https://github.com/Abhiram12062005/",
  },
  {
    id: "03",
    title: "OCT-Based Retinal Disease Detection",
    category: "AI / Deep Learning",
    year: "2025",
    description:
      "A deep learning-based medical imaging system for retinal disease detection using a fine-tuned DenseNet121 model with robust evaluation metrics and production-ready deployment.",
    tags: ["Python", "TensorFlow", "Deep Learning", "Computer Vision"],
    color: "#c8846a",
    bgColor: "#1a100c",
    accent: "#c8846a",
    media: { type: "video", src: "/demo/OCT_retinal_disease_project_demo.mp4" },
    github_link: "https://github.com/Abhiram12062005/OCT-based-Retinal-disease-detection",
  },
  {
    id: "04",
    title: "Chicago Crime Data Analysis Dashboard",
    category: "Data Analytics / Visualization",
    year: "2025",
    description:
      "An interactive Power BI dashboard analyzing crime trends across Chicago using big data processing and machine learning insights. Integrated Random Forest and KNN models with visual analytics to highlight high-risk regions and support data-driven decisions.",
    tags: ["Python", "Power BI", "Pandas", "Machine Learning"],
    color: "#a0a0cc",
    bgColor: "#0d0d1a",
    accent: "#a0a0cc",
    media: { type: "image", src: "/projects/bankruptcy.png" },
    github_link: "https://github.com/Abhiram12062005/crime_analysis",
  },
  {
    id: "05",
    title: "MERN E-Commerce Platform",
    category: "Full Stack Development",
    year: "2024",
    description:
      "A full-stack e-commerce application featuring product listings, shopping cart functionality, secure JWT authentication, payment gateway integration, and admin dashboard. Built scalable REST APIs and implemented secure checkout workflows.",
    tags: ["MongoDB", "Express.js", "React.js", "Node.js", "JWT"],
    color: "#cc8080",
    bgColor: "#1a0d0d",
    accent: "#cc8080",
    media: { type: "video", src: "/demo/Full_stack_project_demo.mp4" },
    github_link: "https://github.com/Abhiram12062005/Full-stack-website",
  },
  {
    id: "06",
    title: "AgriMart – Farm-to-Customer Platform",
    category: "Full Stack / Marketplace",
    year: "2024",
    description:
      "A farm-to-consumer digital marketplace eliminating middlemen by connecting farmers directly with customers. Implemented authentication, order handling, payment integration, notifications, and separate Farmer/Admin dashboards with scalable backend architecture.",
    tags: ["Node.js", "React.js", "MongoDB", "JWT", "Tailwind CSS"],
    color: "#d4a373",
    bgColor: "#1a140d",
    accent: "#d4a373",
    media: { type: "video", src: "/demo/AgriMart_project_demo.mp4" },
    github_link: "https://github.com/Abhiram12062005",
  },
];

/* ── Media renderer ── */
function CardMedia({
  project,
  className,
}: {
  project: (typeof projects)[0];
  className?: string;
}) {
  if (project.media?.type === "video") {
    return (
      <FullscreenVideo
        src={project.media.src}
        className={className}
        accent={project.accent}
      />
    );
  }
  return (
    <div className={`relative ${className}`}>
      <Image
        src={project.media?.src || ""}
        alt={project.title}
        fill
        className="object-cover"
      />
    </div>
  );
}

/* ── "View Project" link ── */
function ViewProjectBtn({
  href,
  accent,
  className = "",
}: {
  href: string;
  accent: string;
  className?: string;
}) {
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      className={`inline-block border font-mono tracking-wider uppercase
                  transition-opacity duration-200 hover:opacity-80
                  cursor-pointer select-none ${className}`}
      style={{
        borderColor: accent + "60",
        color: accent,
        position: "relative",
        zIndex: 9999,
        pointerEvents: "auto",
      }}
    >
      View Project ↗
    </a>
  );
}

/* ════════════════════════════════════════════════════════════
   MOBILE CARD — plain vertical flow, fully scrollable
   No sticky, no z-index stacking, everything clickable.
════════════════════════════════════════════════════════════ */
function MobileProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.04 * index }}
      className="relative overflow-hidden rounded-2xl mx-3 mb-6"
      style={{ backgroundColor: project.bgColor }}
    >
      {/* Accent border — decorative, no pointer events */}
      <div
        className="absolute inset-0 rounded-2xl opacity-25 pointer-events-none"
        style={{ border: `1px solid ${project.accent}` }}
      />

      {/* Video / Image */}
      <div
        className="relative w-full aspect-video overflow-hidden"
        style={{ borderBottom: `1px solid ${project.accent}20` }}
      >
        {/* Gradient overlay — purely decorative */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 60% 40%, ${project.accent}20 0%, transparent 70%)`,
          }}
        />
        {/* Video/image must remain interactive for fullscreen tap */}
        <CardMedia project={project} className="w-full h-full object-cover" />
        {/* Year badge — decorative */}
        <div
          className="absolute top-3 right-3 font-mono text-[10px] px-2 py-1 pointer-events-none"
          style={{
            backgroundColor: project.accent + "25",
            color: project.accent,
            border: `1px solid ${project.accent}45`,
          }}
        >
          {project.year}
        </div>
      </div>

      {/* Text content — fully in normal flow */}
      <div className="p-5">
        <span
          className="font-mono text-[10px] tracking-[0.25em] uppercase"
          style={{ color: project.accent + "99" }}
        >
          {project.category}
        </span>
        <h3 className="font-display text-xl text-bone leading-tight mt-2 mb-3">
          {project.title}
        </h3>
        <p className="font-sans text-bone/40 text-xs leading-relaxed mb-4">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 font-mono text-[9px]"
              style={{
                backgroundColor: project.accent + "15",
                color: project.accent + "cc",
                border: `1px solid ${project.accent}25`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
        {/* Button sits in document flow — always reachable by scroll */}
        <ViewProjectBtn
          href={project.github_link}
          accent={project.accent}
          className="w-full py-3 text-[10px] text-center block"
        />
      </div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════════
   TABLET + DESKTOP CARD — sticky stacking effect
════════════════════════════════════════════════════════════ */
function StackProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  return (
    <>
      {/* ── TABLET 768–1023px ── */}
      <div
        className="hidden md:block lg:hidden stack-card"
        style={{ top: `calc(8vh + ${index * 22}px)`, zIndex: index + 1 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 70, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
          className="relative mx-auto max-w-2xl overflow-hidden"
          style={{ backgroundColor: project.bgColor }}
          whileHover={{ scale: 1.01 }}
        >
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{ border: `1px solid ${project.accent}` }}
          />

          <div
            className="relative w-full aspect-video overflow-hidden"
            style={{ borderBottom: `1px solid ${project.accent}15` }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(ellipse at 60% 40%, ${project.accent}18 0%, transparent 65%)`,
              }}
            />
            <CardMedia project={project} className="w-full h-full object-cover" />
            <div
              className="absolute -right-4 -bottom-6 font-display font-black leading-none select-none pointer-events-none"
              style={{ fontSize: "100px", color: project.accent + "0d" }}
            >
              {project.id}
            </div>
            <div
              className="absolute top-4 right-4 font-mono text-[10px] px-2 py-1 pointer-events-none"
              style={{
                backgroundColor: project.accent + "22",
                color: project.accent,
                border: `1px solid ${project.accent}40`,
              }}
            >
              {project.year}
            </div>
          </div>

          <div className="p-8">
            <div className="flex items-start justify-between mb-4 gap-4">
              <div>
                <span
                  className="font-mono text-xs tracking-[0.3em] uppercase block mb-2"
                  style={{ color: project.accent + "99" }}
                >
                  {project.category}
                </span>
                <h3 className="font-display text-3xl text-bone leading-tight">
                  {project.title}
                </h3>
              </div>
              <div className="font-mono text-5xl font-bold text-bone/5 flex-shrink-0 pointer-events-none">
                {project.id}
              </div>
            </div>

            <p className="font-sans text-bone/40 leading-relaxed text-sm mb-6">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-6 pointer-events-none">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 font-mono text-xs"
                  style={{
                    backgroundColor: project.accent + "15",
                    color: project.accent + "cc",
                    border: `1px solid ${project.accent}25`,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <div style={{ position: "relative", zIndex: 9999 }}>
              <ViewProjectBtn
                href={project.github_link}
                accent={project.accent}
                className="px-6 py-3 text-xs"
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── DESKTOP ≥ 1024px ── */}
      <div
        className="hidden lg:block stack-card"
        style={{ top: `calc(10vh + ${index * 24}px)`, zIndex: index + 1 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 80, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="relative mx-auto max-w-5xl overflow-hidden"
          style={{ backgroundColor: project.bgColor }}
          whileHover={{ scale: 1.01 }}
        >
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{ border: `1px solid ${project.accent}` }}
          />

          <div className="grid grid-cols-[1fr_1.2fr] min-h-[420px]">
            {/* Left */}
            <div className="p-14 flex flex-col justify-between border-r border-white/5">
              <div>
                <div className="flex items-center justify-between mb-8">
                  <span
                    className="font-mono text-xs tracking-[0.3em] uppercase"
                    style={{ color: project.accent + "99" }}
                  >
                    {project.category}
                  </span>
                  <span className="font-mono text-xs text-bone/30">{project.year}</span>
                </div>
                <div className="font-mono text-6xl font-bold text-bone/5 mb-4 pointer-events-none">
                  {project.id}
                </div>
                <h3 className="font-display text-4xl text-bone leading-tight mb-6">
                  {project.title}
                </h3>
                <p className="font-sans text-bone/40 leading-relaxed text-sm">
                  {project.description}
                </p>
              </div>
              <div className="pt-8" style={{ position: "relative", zIndex: 9999 }}>
                <ViewProjectBtn
                  href={project.github_link}
                  accent={project.accent}
                  className="px-6 py-3 text-xs"
                />
              </div>
            </div>

            {/* Right */}
            <div className="relative overflow-hidden min-h-[260px]">
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse at 60% 40%, ${project.accent}18 0%, transparent 65%)`,
                }}
              />
              <div
                className="absolute -right-8 -bottom-10 font-display font-black leading-none select-none pointer-events-none"
                style={{
                  fontSize: "clamp(120px, 18vw, 220px)",
                  color: project.accent + "0d",
                }}
              >
                {project.id}
              </div>
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div
                  className="relative w-[85%] max-w-[500px] aspect-video rounded-2xl overflow-hidden shadow-2xl border"
                  style={{
                    borderColor: project.accent + "40",
                    boxShadow: `0 20px 60px ${project.accent}25`,
                  }}
                >
                  <CardMedia project={project} className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="absolute bottom-10 left-10 flex flex-wrap gap-2 z-30 pointer-events-none">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 font-mono text-xs"
                    style={{
                      backgroundColor: project.accent + "15",
                      color: project.accent + "cc",
                      border: `1px solid ${project.accent}25`,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="absolute top-10 right-10 w-20 h-20 opacity-20 pointer-events-none">
                <svg viewBox="0 0 80 80" fill="none">
                  <circle cx="40" cy="40" r="39" stroke={project.accent} strokeWidth="0.5" />
                  <circle cx="40" cy="40" r="28" stroke={project.accent} strokeWidth="0.5" />
                  <line x1="40" y1="0" x2="40" y2="80" stroke={project.accent} strokeWidth="0.5" />
                  <line x1="0" y1="40" x2="80" y2="40" stroke={project.accent} strokeWidth="0.5" />
                </svg>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}

/* ════════════════════════════════════════════════════════════
   SECTION
════════════════════════════════════════════════════════════ */
export default function ProjectsSection() {
  const ref = useRef<HTMLDivElement>(null);
  useScroll({ target: ref });

  return (
    <section id="projects" ref={ref} className="relative bg-obsidian">
      {/* Header */}
      <div className="px-6 md:px-20 pt-32 pb-12 max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <span className="section-line" />
          <span className="font-mono text-xs text-clay/80 tracking-[0.3em] uppercase">
            Selected Work
          </span>
        </div>
        <div className="flex items-end justify-between">
          <h2 className="font-display text-5xl md:text-7xl text-bone leading-none">
            Projects<span className="text-clay">.</span>
          </h2>
          <span className="font-mono text-sm text-bone/30 pb-2 hidden md:block">
            {projects.length} case studies
          </span>
        </div>
      </div>

      {/* ── MOBILE < 768px: simple vertical scroll, NO sticky stacking ── */}
      <div className="md:hidden px-0 pb-16">
        {projects.map((p, i) => (
          <MobileProjectCard key={p.id} project={p} index={i} />
        ))}
      </div>

      {/* ── TABLET 768–1023px: sticky stacking ── */}
      <div
        className="relative hidden md:block lg:hidden px-6"
        style={{ paddingBottom: `${projects.length * 90 + 180}px` }}
      >
        {projects.map((p, i) => (
          <StackProjectCard key={p.id} project={p} index={i} />
        ))}
      </div>

      {/* ── DESKTOP ≥ 1024px: sticky stacking ── */}
      <div
        className="relative hidden lg:block px-12"
        style={{ paddingBottom: `${projects.length * 80 + 160}px` }}
      >
        {projects.map((p, i) => (
          <StackProjectCard key={p.id} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}