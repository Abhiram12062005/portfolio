# Portfolio — 3D Interactive Portfolio

A stunning Next.js portfolio featuring a real-time 3D procedural human head model with scroll and mouse-tracking animations, stacked scroll cards for projects, and smooth parallax effects throughout.

## Features

- 🧠 **High-poly 3D procedural human head** — Built with Three.js using sphere subdivision, custom vertex deformation to create realistic facial features (eyes, nose, lips, hair, ears, eyebrows)
- 👁️ **Mouse tracking** — Head smoothly follows mouse cursor in real-time
- 📜 **Scroll animation** — Head tilts back as user scrolls down (look-up effect)
- 🃏 **Stacked scroll cards** — Projects section uses sticky stacking card effect (ReactBits style)
- 🌊 **Parallax effects** — Multiple sections with scroll-driven parallax using Framer Motion
- 🖱️ **Custom cursor** — Animated dual-layer cursor with hover effects
- 🌟 **Smooth scroll** — Lenis smooth scroll library integration
- 💅 **Premium design** — Playfair Display + DM Sans + JetBrains Mono, dark clay/bone palette

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **TailwindCSS**
- **Three.js + @react-three/fiber + @react-three/drei**
- **Framer Motion**
- **Lenis** (smooth scroll)
- **GSAP** (available for additional animations)

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Customization

### Change Name/Info
- Edit `components/HeroSection.tsx` for the hero name and tagline
- Edit `components/AboutSection.tsx` for bio text and stats
- Edit `components/ContactSection.tsx` for email and social links

### Change Projects
Edit the `projects` array in `components/ProjectsSection.tsx`

### 3D Model
The human head is procedurally generated in `components/HeroModel.tsx`. You can:
- Adjust skin color via `skinMaterial` color value
- Change hair color in the hair mesh material
- Modify lighting by adjusting `<Lights />` component

## Structure

```
portfolio/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── HeroSection.tsx       # Main hero with 3D model
│   ├── HeroModel.tsx         # Three.js 3D head model
│   ├── Navbar.tsx
│   ├── AboutSection.tsx      # About with parallax
│   ├── ProjectsSection.tsx   # Stacked scroll cards
│   ├── SkillsSection.tsx     # Skills + parallax marquee
│   ├── ContactSection.tsx    # Contact form
│   ├── CustomCursor.tsx      # Custom cursor
│   └── SmoothScroll.tsx      # Lenis wrapper
├── tailwind.config.ts
├── tsconfig.json
└── next.config.js
```
