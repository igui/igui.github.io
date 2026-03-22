/* ============================================================
   MINIMALIST MODERN — HeroSection (Light Theme)
   Clean hero with large typography, gradient text,
   typewriter role cycling, and smooth animations.
   ============================================================ */

import { useEffect, useState } from "react";

const ROLES = [
  "AI Engineer",
  "ML Researcher",
  "Recommendation Systems",
  "NLP Specialist",
  "Deep Learning",
];

export default function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const current = ROLES[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (typing) {
      if (displayed.length < current.length) {
        timeout = setTimeout(() => {
          setDisplayed(current.slice(0, displayed.length + 1));
        }, 60);
      } else {
        timeout = setTimeout(() => setTyping(false), 2000);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => {
          setDisplayed(displayed.slice(0, -1));
        }, 35);
      } else {
        setRoleIndex((i) => (i + 1) % ROLES.length);
        setTyping(true);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayed, typing, roleIndex]);

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20"
      style={{
        background: "linear-gradient(135deg, oklch(0.98 0.002 240) 0%, oklch(0.96 0.003 200) 100%)",
      }}
    >
      {/* Subtle background accent */}
      <div
        className="absolute top-20 right-10 w-72 h-72 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, oklch(0.58 0.15 180 / 8%) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, oklch(0.45 0.08 220 / 6%) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      {/* Content */}
      <div
        className="relative z-10 container flex flex-col items-center text-center"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(30px)",
          transition: "opacity 0.8s ease, transform 0.8s ease",
        }}
      >
        {/* Eyebrow label */}
        <div className="flex items-center gap-3 mb-6">
          <div
            className="h-px w-12"
            style={{ background: "linear-gradient(90deg, transparent, #0EA5A5)" }}
          />
          <span className="section-label">Available for opportunities</span>
          <div
            className="h-px w-12"
            style={{ background: "linear-gradient(90deg, #0EA5A5, transparent)" }}
          />
        </div>

        {/* Name */}
        <h1
          className="font-bold leading-none tracking-tight mb-4"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(3rem, 10vw, 7rem)",
            color: "oklch(0.18 0.01 240)",
          }}
        >
          Ignacio{" "}
          <span className="gradient-text">Avas</span>
        </h1>

        {/* Typewriter role */}
        <div
          className="flex items-center gap-2 mb-8"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(1rem, 3vw, 1.5rem)",
            color: "oklch(0.45 0.08 220)",
            fontWeight: 500,
            minHeight: "2.5rem",
          }}
        >
          <span>{displayed}</span>
          <span
            className="inline-block w-0.5 h-6"
            style={{
              background: "oklch(0.58 0.15 180)",
              animation: "blink 1s step-end infinite",
            }}
          />
        </div>

        {/* Bio snippet */}
        <p
          className="max-w-2xl mb-10 leading-relaxed"
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "clamp(0.95rem, 2vw, 1.1rem)",
            color: "oklch(0.50 0.05 220)",
            lineHeight: 1.7,
          }}
        >
          Seasoned ML Engineer with 10+ years of expertise in Recommendation Systems,
          NLP, and ethical AI. Building intelligent systems that are explainable,
          interpretable, and fair.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            className="primary-btn px-8 py-3 text-sm"
            onClick={() => {
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Get in Touch
          </button>
          <button
            className="outline-btn px-8 py-3 text-sm"
            onClick={() => {
              document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            View Experience
          </button>
        </div>

        {/* Flags */}
        <div className="flex items-center gap-2 mt-10 text-sm" style={{ color: "oklch(0.50 0.05 220)" }}>
          <span>🇺🇾</span>
          <span>🇪🇸</span>
          <span>🇧🇪</span>
          <span className="ml-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Spanish · English · Italian · Dutch
          </span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{
          opacity: mounted ? 0.6 : 0,
          transition: "opacity 1s ease 1s",
        }}
      >
        <span className="section-label text-xs">Scroll</span>
        <div
          className="w-px h-12"
          style={{
            background: "linear-gradient(to bottom, #0EA5A5, transparent)",
            animation: "pulse 2s ease-in-out infinite",
          }}
        />
      </div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </section>
  );
}
