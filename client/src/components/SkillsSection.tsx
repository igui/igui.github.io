/* ============================================================
   MINIMALIST MODERN — SkillsSection (Light Theme)
   Header + scrolling tech-logo marquee.
   ============================================================ */

import { useScrollReveal } from "@/hooks/useScrollReveal";
import SkillsMarquee from "./SkillsMarquee";

export default function SkillsSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section
      id="skills"
      className="py-28 relative overflow-hidden"
      style={{
        background: "oklch(0.96 0.003 240)",
      }}
    >
      {/* Glow accents */}
      <div
        className="absolute top-0 right-0 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, oklch(0.45 0.08 220 / 8%) 0%, transparent 70%)",
          filter: "blur(50px)",
          transform: "translate(30%, -30%)",
        }}
      />

      <div className="container">
        {/* Header */}
        <div
          ref={ref}
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <div className="section-label mb-4">Technical Expertise</div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 gap-4">
            <h2
              className="font-bold leading-tight"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                color: "oklch(0.18 0.01 240)",
              }}
            >
              Skills &{" "}
              <span className="gradient-text">Technologies</span>
            </h2>
            <p
              className="max-w-md"
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "0.95rem",
                color: "oklch(0.50 0.05 220)",
                lineHeight: 1.7,
                fontStyle: "italic",
              }}
            >
              "The most complicated one is to be simple."
              <br />
              <span style={{ color: "oklch(0.60 0.04 240)", fontSize: "0.85rem" }}>— Dejan Stojanović</span>
            </p>
          </div>
        </div>

        {/* Tech logo marquee */}
        <div
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s",
          }}
        >
          <SkillsMarquee />
        </div>
      </div>
    </section>
  );
}
