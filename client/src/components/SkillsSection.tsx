/* ============================================================
   MINIMALIST MODERN — SkillsSection (Light Theme)
   Asymmetric layout: skills tag cloud left, circuit visual right.
   Staggered entrance animation on scroll reveal.
   ============================================================ */

import { useScrollReveal } from "@/hooks/useScrollReveal";

const SKILL_GROUPS = [
  {
    label: "AI & ML",
    skills: [
      "Machine Learning",
      "Deep Learning",
      "Artificial Intelligence",
      "Large Language Models (LLM)",
      "Natural Language Processing",
      "Computer Vision",
      "Chatbots",
    ],
  },
  {
    label: "Frameworks & Tools",
    skills: [
      "Python",
      "TensorFlow",
      "PyTorch",
      "Scikit-learn",
      "Pandas",
      "XGBoost",
      "Sentence BERT",
      "RoBERTa",
    ],
  },
  {
    label: "Data & Infrastructure",
    skills: [
      "Data Science",
      "Data Pipelines",
      "Data Warehousing",
      "AWS",
      "Apache Kafka",
      "SQL",
      "ML Ops",
      "CI/CD",
    ],
  },
];

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

        {/* Skills grid + visual */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Skill groups */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {SKILL_GROUPS.map((group, gi) => (
              <div
                key={group.label}
                className="clean-card p-6"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(30px)",
                  transition: `opacity 0.7s ease ${gi * 0.15 + 0.2}s, transform 0.7s ease ${gi * 0.15 + 0.2}s`,
                }}
              >
                <div className="section-label mb-4">{group.label}</div>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill, si) => (
                    <span
                      key={skill}
                      className="skill-tag"
                      style={{
                        opacity: isVisible ? 1 : 0,
                        transition: `opacity 0.5s ease ${gi * 0.15 + si * 0.05 + 0.4}s`,
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Circuit visual */}
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{
              aspectRatio: "1/1",
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "scale(1)" : "scale(0.9)",
              transition: "opacity 0.8s ease 0.5s, transform 0.8s ease 0.5s",
              border: "1px solid oklch(0.92 0.004 240)",
              boxShadow: "0 8px 24px oklch(0 0 0 / 8%)",
            }}
          >
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663464327095/6ZsUhZ3wFpAw9eECH4yDCF/skills-visual-ftHhHhTP7bz8stxPjVsoYn.webp"
              alt="Neural circuit visualization"
              className="w-full h-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(135deg, oklch(0.96 0.003 240 / 30%), transparent 60%)",
              }}
            />
            {/* Overlay text */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div
                className="font-bold text-3xl gradient-text"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                4+
              </div>
              <div
                className="text-sm mt-1"
                style={{ color: "oklch(0.50 0.05 220)", fontFamily: "'Outfit', sans-serif" }}
              >
                Years in AI/ML
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
