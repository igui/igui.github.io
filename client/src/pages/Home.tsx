/* ============================================================
   MINIMALIST MODERN — Home Page (Light Theme)
   Assembles all sections: Hero → About → Skills → Experience
   → Publications → Projects → Contact → Footer
   ============================================================ */

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ExperienceSection from "@/components/ExperienceSection";
import PublicationsSection from "@/components/PublicationsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div
      className="min-h-screen"
      style={{ background: "oklch(0.98 0.002 240)" }}
    >
      <Navbar />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <PublicationsSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
