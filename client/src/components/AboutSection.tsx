/* ============================================================
   MINIMALIST MODERN — AboutSection (Light Theme)
   Two-column layout: portrait left, bio text right.
   Clean cards with subtle shadows and teal accents.
   ============================================================ */

import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function AboutSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="about" className="py-28 relative overflow-hidden">
      {/* Subtle background glow */}
      <div
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, oklch(0.58 0.15 180 / 6%) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="container">
        <div
          ref={ref}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(40px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          {/* Portrait */}
          <div className="relative flex justify-center lg:justify-start">
            <div className="relative">
              {/* Subtle shadow ring */}
              <div
                className="absolute -inset-4 rounded-2xl"
                style={{
                  background: "linear-gradient(135deg, oklch(0.58 0.15 180 / 12%), oklch(0.45 0.08 220 / 12%))",
                  filter: "blur(20px)",
                }}
              />
              {/* Image */}
              <div
                className="relative rounded-2xl overflow-hidden"
                style={{
                  width: "clamp(260px, 35vw, 380px)",
                  aspectRatio: "3/4",
                  border: "1px solid oklch(0.92 0.004 240)",
                  boxShadow: "0 8px 32px oklch(0 0 0 / 10%)",
                }}
              >
                <img
                  src="/about/him.jpg"
                  alt="Ignacio Avas"
                  className="w-full h-full object-cover"
                />
                {/* Gradient overlay at bottom */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-1/3"
                  style={{
                    background: "linear-gradient(to top, oklch(0.98 0.002 240), transparent)",
                  }}
                />
              </div>

              {/* Floating stat cards */}
              <div
                className="absolute -right-6 top-8 clean-card px-4 py-3 text-center"
                style={{ minWidth: "100px" }}
              >
                <div
                  className="gradient-text font-bold text-2xl"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  10+
                </div>
                <div className="text-xs mt-0.5" style={{ color: "oklch(0.50 0.05 220)", fontFamily: "'Outfit', sans-serif" }}>
                  Years Exp.
                </div>
              </div>

              <div
                className="absolute -left-6 bottom-16 clean-card px-4 py-3 text-center"
                style={{ minWidth: "100px" }}
              >
                <div
                  className="gradient-text font-bold text-2xl"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  3
                </div>
                <div className="text-xs mt-0.5" style={{ color: "oklch(0.50 0.05 220)", fontFamily: "'Outfit', sans-serif" }}>
                  Publications
                </div>
              </div>
            </div>
          </div>

          {/* Bio text */}
          <div>
            <div className="section-label mb-4">About Me</div>
            <h2
              className="font-bold mb-6 leading-tight"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                color: "oklch(0.18 0.01 240)",
              }}
            >
              Building{" "}
              <span className="gradient-text">Intelligent</span>
              <br />
              Systems That Matter
            </h2>

            <div
              className="space-y-4 leading-relaxed"
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "1rem",
                color: "oklch(0.50 0.05 220)",
                lineHeight: 1.8,
              }}
            >
              <p>
                As a seasoned Machine Learning Engineer and Software Development Leader
                with over a decade of expertise, I specialize in Recommendation and
                Classification Systems. I pioneered the development of advanced AI tools,
                including a recommender system that streamlines candidate vetting and a
                ranking system that enhances job search relevance on a leading HR platform.
              </p>
              <p>
                I also led the design and implementation of a POS software system
                extensively deployed across thousands of retail outlets in the US and Canada.
                My focus remains on developing recommendation and online classification
                systems, with an emphasis on <span style={{ color: "oklch(0.58 0.15 180)" }}>explainability</span>,{" "}
                <span style={{ color: "oklch(0.58 0.15 180)" }}>interpretability</span>, and{" "}
                <span style={{ color: "oklch(0.58 0.15 180)" }}>bias mitigation</span>.
              </p>
              <p>
                My robust educational background in machine learning and software engineering
                supports my commitment to innovative and ethical technology solutions.
              </p>
            </div>

            {/* Social links */}
            <div className="flex flex-wrap gap-3 mt-8">
              {[
                { label: "GitHub", href: "https://github.com/igui" },
                { label: "LinkedIn", href: "https://linkedin.com/in/iavas" },
                { label: "X / Twitter", href: "https://x.com/ignacioavas" },
                { label: "Email", href: "mailto:contact@ignacioavas.com" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="skill-tag"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
