/* ============================================================
   MINIMALIST MODERN — ExperienceSection (Light Theme)
   Vertical timeline with clean cards, subtle connector line,
   and staggered scroll reveal animations.
   ============================================================ */

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useState } from "react";
import { profile, type ExperienceItem } from "@shared/content";

const EXPERIENCES = profile.experience;

function ExperienceCard({ exp, index, isVisible }: {
  exp: ExperienceItem;
  index: number;
  isVisible: boolean;
}) {
  const [expanded, setExpanded] = useState(index === 0);

  return (
    <div
      className="relative flex gap-6"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateX(0)" : "translateX(-30px)",
        transition: `opacity 0.6s ease ${index * 0.08}s, transform 0.6s ease ${index * 0.08}s`,
      }}
    >
      {/* Timeline dot and line */}
      <div className="flex flex-col items-center" style={{ minWidth: "24px" }}>
        <div
          className="w-3 h-3 rounded-full mt-5 flex-shrink-0 z-10"
          style={{
            background: exp.highlight
              ? "linear-gradient(135deg, #0EA5A5, #0D9488)"
              : "oklch(0.58 0.15 180 / 50%)",
            boxShadow: exp.highlight ? "0 0 12px oklch(0.58 0.15 180 / 40%)" : "none",
          }}
        />
        {index < EXPERIENCES.length - 1 && (
          <div
            className="w-px flex-1 mt-2"
            style={{
              background: "linear-gradient(to bottom, oklch(0.58 0.15 180 / 60%), oklch(0.45 0.08 220 / 30%), transparent)",
              minHeight: "40px",
            }}
          />
        )}
      </div>

      {/* Card */}
      <div
        className={`clean-card flex-1 mb-4 overflow-hidden ${exp.highlight ? "border-teal-300" : ""}`}
        style={{
          borderColor: exp.highlight ? "oklch(0.58 0.15 180 / 30%)" : undefined,
          boxShadow: exp.highlight ? "0 8px 24px oklch(0.58 0.15 180 / 12%)" : undefined,
        }}
      >
        <button
          className="w-full text-left p-5 flex items-start justify-between gap-4"
          onClick={() => setExpanded(!expanded)}
        >
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-1">
              {exp.logo && (
                <img
                  src={exp.logo}
                  alt={`${exp.company} logo`}
                  className="w-6 h-6 object-contain rounded flex-shrink-0"
                />
              )}
              <span
                className="font-bold"
                style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.05rem", color: "oklch(0.18 0.01 240)" }}
              >
                {exp.company}
              </span>
              {exp.highlight && (
                <span
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{
                    background: "oklch(0.58 0.15 180 / 15%)",
                    border: "1px solid oklch(0.58 0.15 180 / 30%)",
                    color: "oklch(0.58 0.15 180)",
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}
                >
                  Current
                </span>
              )}
            </div>
            <div
              className="text-sm"
              style={{ color: "oklch(0.50 0.05 220)", fontFamily: "'Outfit', sans-serif" }}
            >
              {exp.role}
            </div>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <span
              className="text-xs"
              style={{ color: "oklch(0.60 0.04 240)", fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {exp.period}
            </span>
            <div
              className="w-5 h-5 flex items-center justify-center transition-transform duration-300"
              style={{
                transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
                color: "oklch(0.58 0.15 180)",
              }}
            >
              ▾
            </div>
          </div>
        </button>

        <div
          className="overflow-hidden transition-all duration-400"
          style={{ maxHeight: expanded ? "500px" : "0" }}
        >
          <div className="px-5 pb-5">
            <p
              className="mb-4 leading-relaxed"
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "0.9rem",
                color: "oklch(0.50 0.05 220)",
                lineHeight: 1.75,
              }}
            >
              {exp.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {exp.tags.map((tag) => (
                <span key={tag} className="skill-tag" style={{ fontSize: "0.75rem" }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ExperienceSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="experience" className="py-28 relative overflow-hidden">
      {/* Glow */}
      <div
        className="absolute bottom-0 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, oklch(0.58 0.15 180 / 5%) 0%, transparent 70%)",
          filter: "blur(60px)",
          transform: "translate(30%, 30%)",
        }}
      />

      <div className="container">
        <div
          ref={ref}
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <div className="section-label mb-4">Career</div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 gap-4">
            <h2
              className="font-bold leading-tight"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                color: "oklch(0.18 0.01 240)",
              }}
            >
              Work{" "}
              <span className="gradient-text">Experience</span>
            </h2>
            <p
              className="max-w-sm"
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "0.9rem",
                color: "oklch(0.60 0.04 240)",
                fontStyle: "italic",
              }}
            >
              "Design and programming are human activities; forget that and all is lost."
              <br />
              <span style={{ color: "oklch(0.65 0.04 240)", fontSize: "0.8rem" }}>— Bjarne Stroustrup</span>
            </p>
          </div>
        </div>

        <div className="max-w-3xl">
          {EXPERIENCES.map((exp, i) => (
            <ExperienceCard key={`${exp.company}-${exp.period}`} exp={exp} index={i} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}
