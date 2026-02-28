"use client";

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import ContactSection from "@/components/ContactSection";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";
import ExperienceSection from "@/components/Experiencesection";
import LeadershipSection from "@/components/Leadershipsection";
import MobileWarningPopup from "@/components/Mobilewarningpopup";

export default function Home() {
  return (
    <SmoothScroll>
      <MobileWarningPopup/>
      <CustomCursor />
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ExperienceSection/>
        <SkillsSection />
        <LeadershipSection/>
        <ContactSection />
      </main>
    </SmoothScroll>
  );
}
