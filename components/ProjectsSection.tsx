"use client";

import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const projects = [
  {
    id: "01",
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
    github_link: "https://github.com/Abhiram12062005/OCT-based-Retinal-disease-detection"
  },
  {
    id: "02",
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
    id: "03",
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
    id: "04",
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
  {
    id: "05",
    title: "Melted Moments – E-Commerce for Local Cookie Brand",
    category: "Full Stack / E-Commerce",
    year: "2026",
    description:
      "A full-featured e-commerce platform developed for a small-scale cookie business. Built a responsive storefront with product catalog, cart system, secure authentication, order management, payment integration, and admin dashboard.",
    tags: ["Next.js", "Node.js", "Express.js", "MongoDB", "TypeScript", "JWT", "Tailwind CSS", "Razorpay"],
    color: "#9B5CF6",
    bgColor: "#141018",
    accent: "#9B5CF6",
    media: { type: "video", src: "/demo/Melted-Moments-demo.mp4" },
    github_link: "https://github.com/Abhiram12062005/",
  },
];

/* ── Media renderer ── */
function CardMedia({ project, className }: { project: (typeof projects)[0]; className?: string }) {
  return project.media?.type === "video" ? (
    <video src={project.media.src} autoPlay loop muted playsInline className={className} />
  ) : (
    <div className={`relative ${className}`}>
      <Image src={project.media?.src || ""} alt={project.title} fill className="object-cover" />
    </div>
  );
}

/* ── Reusable "View Project" link button ── */
function ViewProjectBtn({ href, accent, className = "" }: { href: string; accent: string; className?: string }) {
  if (!href) return null;
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-block border font-mono tracking-wider uppercase transition-opacity duration-200 hover:opacity-80 ${className}`}
      style={{ borderColor: accent + "60", color: accent }}
    >
      View Project ↗
    </Link>
  );
}

function ProjectCard({ project, index }: { project: (typeof projects)[0]; index: number }) {
  return (
    <>
      {/* ────────────────────────────────────────────────────────
          MOBILE  < 768px  — sticky stacking, single column
      ──────────────────────────────────────────────────────── */}
      <div
        className="md:hidden stack-card"
        style={{ top: `calc(12vh + ${index * 18}px)`, zIndex: index + 1 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-5%" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
          className="relative overflow-hidden rounded-2xl mx-3"
          style={{ backgroundColor: project.bgColor }}
        >
          <div className="absolute inset-0 rounded-2xl opacity-25 pointer-events-none" style={{ border: `1px solid ${project.accent}` }} />

          {/* Media */}
          <div className="relative w-full aspect-video overflow-hidden" style={{ borderBottom: `1px solid ${project.accent}20` }}>
            <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at 60% 40%, ${project.accent}20 0%, transparent 70%)` }} />
            <CardMedia project={project} className="w-full h-full object-cover" />
            <div className="absolute top-3 right-3 font-mono text-[10px] px-2 py-1" style={{ backgroundColor: project.accent + "25", color: project.accent, border: `1px solid ${project.accent}45` }}>
              {project.year}
            </div>
          </div>

          <div className="p-5">
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase" style={{ color: project.accent + "99" }}>{project.category}</span>
            <h3 className="font-display text-xl text-bone leading-tight mt-2 mb-3">{project.title}</h3>
            <p className="font-sans text-bone/40 text-xs leading-relaxed mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-1.5 mb-5">
              {project.tags.map((tag) => (
                <span key={tag} className="px-2 py-1 font-mono text-[9px]" style={{ backgroundColor: project.accent + "15", color: project.accent + "cc", border: `1px solid ${project.accent}25` }}>{tag}</span>
              ))}
            </div>
            <ViewProjectBtn href={project.github_link} accent={project.accent} className="w-full py-2.5 text-[10px] text-center" />
          </div>
        </motion.div>
      </div>

      {/* ────────────────────────────────────────────────────────
          TABLET  768–1023px  — sticky stacking, vertical layout
      ──────────────────────────────────────────────────────── */}
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
          <div className="absolute inset-0 opacity-20" style={{ border: `1px solid ${project.accent}` }} />

          {/* Media full-width */}
          <div className="relative w-full aspect-video overflow-hidden" style={{ borderBottom: `1px solid ${project.accent}15` }}>
            <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at 60% 40%, ${project.accent}18 0%, transparent 65%)` }} />
            <CardMedia project={project} className="w-full h-full object-cover" />
            <div className="absolute -right-4 -bottom-6 font-display font-black leading-none select-none pointer-events-none" style={{ fontSize: "100px", color: project.accent + "0d" }}>
              {project.id}
            </div>
            <div className="absolute top-4 right-4 font-mono text-[10px] px-2 py-1" style={{ backgroundColor: project.accent + "22", color: project.accent, border: `1px solid ${project.accent}40` }}>
              {project.year}
            </div>
          </div>

          {/* Text block */}
          <div className="p-8">
            <div className="flex items-start justify-between mb-4 gap-4">
              <div>
                <span className="font-mono text-xs tracking-[0.3em] uppercase block mb-2" style={{ color: project.accent + "99" }}>{project.category}</span>
                <h3 className="font-display text-3xl text-bone leading-tight">{project.title}</h3>
              </div>
              <div className="font-mono text-5xl font-bold text-bone/5 flex-shrink-0">{project.id}</div>
            </div>

            <p className="font-sans text-bone/40 leading-relaxed text-sm mb-6">{project.description}</p>

            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag) => (
                <span key={tag} className="px-3 py-1.5 font-mono text-xs" style={{ backgroundColor: project.accent + "15", color: project.accent + "cc", border: `1px solid ${project.accent}25` }}>{tag}</span>
              ))}
            </div>

            <ViewProjectBtn href={project.github_link} accent={project.accent} className="px-6 py-3 text-xs" />
          </div>
        </motion.div>
      </div>

      {/* ────────────────────────────────────────────────────────
          DESKTOP  ≥ 1024px  — original two-column sticky stack
      ──────────────────────────────────────────────────────── */}
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
          <div className="absolute inset-0 opacity-20" style={{ border: `1px solid ${project.accent}` }} />

          <div className="grid grid-cols-[1fr_1.2fr] min-h-[420px]">
            {/* Left */}
            <div className="p-14 flex flex-col justify-between border-r border-white/5">
              <div>
                <div className="flex items-center justify-between mb-8">
                  <span className="font-mono text-xs tracking-[0.3em] uppercase" style={{ color: project.accent + "99" }}>{project.category}</span>
                  <span className="font-mono text-xs text-bone/30">{project.year}</span>
                </div>
                <div className="font-mono text-6xl font-bold text-bone/5 mb-4">{project.id}</div>
                <h3 className="font-display text-4xl text-bone leading-tight mb-6">{project.title}</h3>
                <p className="font-sans text-bone/40 leading-relaxed text-sm">{project.description}</p>
              </div>
              <div className="pt-8">
                <ViewProjectBtn href={project.github_link} accent={project.accent} className="px-6 py-3 text-xs" />
              </div>
            </div>

            {/* Right */}
            <div className="relative overflow-hidden min-h-[260px]">
              <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at 60% 40%, ${project.accent}18 0%, transparent 65%)` }} />
              <div className="absolute -right-8 -bottom-10 font-display font-black leading-none select-none pointer-events-none" style={{ fontSize: "clamp(120px, 18vw, 220px)", color: project.accent + "0d" }}>
                {project.id}
              </div>
              <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                <div className="relative w-[85%] max-w-[500px] aspect-video rounded-2xl overflow-hidden shadow-2xl border" style={{ borderColor: project.accent + "40", boxShadow: `0 20px 60px ${project.accent}25` }}>
                  <CardMedia project={project} className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="absolute bottom-10 left-10 flex flex-wrap gap-2 z-30">
                {project.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1.5 font-mono text-xs" style={{ backgroundColor: project.accent + "15", color: project.accent + "cc", border: `1px solid ${project.accent}25` }}>{tag}</span>
                ))}
              </div>
              <div className="absolute top-10 right-10 w-20 h-20 opacity-20">
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

export default function ProjectsSection() {
  const ref = useRef<HTMLDivElement>(null);
  useScroll({ target: ref });

  return (
    <section id="projects" ref={ref} className="relative bg-obsidian">
      {/* Header */}
      <div className="px-6 md:px-20 pt-32 pb-20 max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <span className="section-line" />
          <span className="font-mono text-xs text-clay/80 tracking-[0.3em] uppercase">Selected Work</span>
        </div>
        <div className="flex items-end justify-between">
          <h2 className="font-display text-5xl md:text-7xl text-bone leading-none">
            Projects<span className="text-clay">.</span>
          </h2>
          <span className="font-mono text-sm text-bone/30 pb-2 hidden md:block">{projects.length} case studies</span>
        </div>
      </div>

      {/* Mobile stacking container  < 768px */}
      <div className="relative md:hidden px-0" style={{ paddingBottom: `${projects.length * 100 + 200}px` }}>
        {projects.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
      </div>

      {/* Tablet stacking container  768–1023px */}
      <div className="relative hidden md:block lg:hidden px-6" style={{ paddingBottom: `${projects.length * 90 + 180}px` }}>
        {projects.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
      </div>

      {/* Desktop stacking container  ≥ 1024px */}
      <div className="relative hidden lg:block px-12" style={{ paddingBottom: `${projects.length * 80 + 160}px` }}>
        {projects.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
      </div>
    </section>
  );
}