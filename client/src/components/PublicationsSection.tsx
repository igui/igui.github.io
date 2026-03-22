/* ============================================================
   MINIMALIST MODERN — PublicationsSection (Light Theme)
   Publication cards with venue badges, abstract text,
   and link buttons. Clean, professional design.
   ============================================================ */

import { useScrollReveal } from "@/hooks/useScrollReveal";

const PUBLICATIONS = [
  {
    title: "Align MacridVAE: Multimodal Alignment for Disentangled Recommendations",
    venue: "ECIR 2024: Advances in Information Retrieval",
    year: "2024",
    abstract:
      "We introduce a new recommendation model that combines text and image data to suggest items to users. By aligning the visual and textual descriptions in a shared space, our model better understands item features, improving recommendation accuracy and helping us visualize user preferences based on different item aspects. Based on the master thesis at KU Leuven.",
    tags: ["Recommendation Systems", "Multimodal", "VAE", "KU Leuven"],
    href: "#",
    featured: true,
  },
  {
    title: "Learning Résumé Embeddings with Search Data and Transformers",
    venue: "2023 IEEE International Conference on Systems, Man, and Cybernetics (SMC)",
    year: "2023",
    abstract:
      "We explore how users' clicks and interactions with search results can teach us about the hidden connections between different search results. Using contrastive learning with BERT models, we train a similarity model that helps make better recommendations based on what users are actually interested in.",
    tags: ["NLP", "BERT", "Contrastive Learning", "Resume Embeddings"],
    href: "#",
    featured: false,
  },
  {
    title: "A Photon Tracing Approach to Solve Inverse Rendering Problems",
    venue: "Conference On Graphics, Patterns And Images (SIBGRAPI), 2018",
    year: "2018",
    abstract:
      "We introduce a new method to help designers achieve their lighting goals more efficiently. By combining photon tracing with an optimization technique, our approach handles various lighting needs without requiring lots of computing power, and it works well even when the space's shape is part of the design. Based on the Computer Engineering thesis at UdelaR.",
    tags: ["Computer Graphics", "Photon Tracing", "Inverse Rendering", "Optimization"],
    href: "#",
    featured: false,
  },
];

export default function PublicationsSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section
      id="publications"
      className="py-28 relative overflow-hidden"
      style={{ background: "oklch(0.98 0.002 240)" }}
    >
      {/* Subtle glow */}
      <div
        className="absolute top-1/3 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, oklch(0.45 0.08 220 / 6%) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      <div className="container relative z-10">
        <div
          ref={ref}
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <div className="section-label mb-4">Research</div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-6 gap-4">
            <h2
              className="font-bold leading-tight"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                color: "oklch(0.18 0.01 240)",
              }}
            >
              Publications &{" "}
              <span className="gradient-text">Research</span>
            </h2>
          </div>

          <p
            className="max-w-2xl mb-4"
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "0.95rem",
              color: "oklch(0.50 0.05 220)",
              lineHeight: 1.7,
            }}
          >
            I have created models and methods to improve recommendation systems and solve
            lighting problems in design. My work on Align MacridVAE combines visual and
            text data to make recommendations more accurate and easier to understand.
          </p>

          <p
            className="max-w-lg mb-16"
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "0.9rem",
              color: "oklch(0.60 0.04 240)",
              fontStyle: "italic",
            }}
          >
            "Somewhere, something incredible is waiting to be known."
            <br />
            <span style={{ fontSize: "0.8rem", color: "oklch(0.65 0.04 240)" }}>— Carl Sagan</span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {PUBLICATIONS.map((pub, i) => (
            <div
              key={pub.title}
              className="clean-card p-6 flex flex-col"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(40px)",
                transition: `opacity 0.7s ease ${i * 0.15 + 0.2}s, transform 0.7s ease ${i * 0.15 + 0.2}s`,
                borderColor: pub.featured ? "oklch(0.58 0.15 180 / 25%)" : undefined,
              }}
            >
              {/* Year badge */}
              <div className="flex items-center justify-between mb-4">
                <span
                  className="text-xs px-2 py-1 rounded"
                  style={{
                    background: "oklch(0.58 0.15 180 / 12%)",
                    color: "oklch(0.58 0.15 180)",
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 600,
                    letterSpacing: "0.05em",
                  }}
                >
                  {pub.year}
                </span>
                {pub.featured && (
                  <span
                    className="text-xs px-2 py-1 rounded"
                    style={{
                      background: "linear-gradient(135deg, oklch(0.58 0.15 180 / 15%), oklch(0.45 0.08 220 / 15%))",
                      color: "oklch(0.58 0.15 180)",
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 600,
                    }}
                  >
                    Featured
                  </span>
                )}
              </div>

              {/* Title */}
              <h3
                className="font-bold mb-2 leading-snug"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "1rem",
                  color: "oklch(0.18 0.01 240)",
                }}
              >
                {pub.title}
              </h3>

              {/* Venue */}
              <div
                className="text-xs mb-4"
                style={{
                  color: "oklch(0.58 0.15 180)",
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 500,
                }}
              >
                {pub.venue}
              </div>

              {/* Abstract */}
              <p
                className="flex-1 mb-4 leading-relaxed"
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "0.85rem",
                  color: "oklch(0.50 0.05 220)",
                  lineHeight: 1.7,
                }}
              >
                {pub.abstract}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {pub.tags.map((tag) => (
                  <span key={tag} className="skill-tag" style={{ fontSize: "0.7rem" }}>
                    {tag}
                  </span>
                ))}
              </div>

              {/* Link */}
              <a
                href={pub.href}
                className="outline-btn px-4 py-2 text-xs text-center"
              >
                Read Paper →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
