/* ============================================================
   MINIMALIST MODERN — ProjectsSection (Light Theme)
   Masonry-style project cards with hover effects.
   ============================================================ */

import { useScrollReveal } from "@/hooks/useScrollReveal";

const PROJECTS = [
  {
    name: "RPSolver",
    description:
      "A tool released as part of a publication for using Photon Mapping for solving architectural lighting problems. Combines photon tracing with optimization techniques.",
    tags: ["Python", "Computer Graphics", "Photon Mapping", "Research"],
    type: "Research Tool",
    image: "/projects/rpsolver.jpg",
  },
  {
    name: "SCIS — SuiteCommerce InStore",
    description:
      "A point of sales application leveraging Netsuite ERP capabilities with web technologies. Deployed across thousands of retail outlets in the US and Canada.",
    tags: ["Backbone.js", "Sass", "Netsuite", "POS"],
    type: "Enterprise Software",
    image: "/projects/scis.jpg",
  },
  {
    name: "Scraping Development Framework",
    description:
      "SDF is a Python framework that allows easy scraping of sites. Enables making XPath and CSS selectors, managing sessions, and handling complex scraping workflows.",
    tags: ["Python", "Web Scraping", "XPath", "Framework"],
    type: "Open Source",
    image: "/projects/sdf.jpg",
  },
  {
    name: "Pasteboard",
    description:
      "A link sharing app oriented to share links among coworkers or people that work in the same project. Streamlines information sharing within teams.",
    tags: ["Web App", "Collaboration", "Node.js"],
    type: "Web Application",
    image: "/projects/pasteboard.jpg",
  },
  {
    name: "Say Cheese",
    description:
      "The main result of a University course with 3 partners. A computer vision project exploring real-time image processing and recognition techniques.",
    tags: ["Computer Vision", "Python", "University Project"],
    type: "Computer Vision",
    image: "/projects/saycheese.jpg",
  },
  {
    name: "Flappy Bird (OpenGL)",
    description:
      "An OpenGL game made as an assignment for a Computer Graphics course at the University. Demonstrates real-time rendering and game loop implementation.",
    tags: ["OpenGL", "C++", "Game Dev", "Computer Graphics"],
    type: "Game",
    image: "/projects/flappybird.jpg",
  },
  {
    name: "One vs One Hundred",
    description:
      "1 vs 100 for Windows Mobile was a project which began as an assignment of a University course in association with Microsoft Uruguay.",
    tags: ["Windows Mobile", "C#", "Microsoft"],
    type: "Mobile App",
    image: "/projects/1vs100.jpg",
  },
  {
    name: "Your Project?",
    description:
      "Feel free to contact me if you want to collaborate on a project or if you have any questions. I'm always open to discussing new ideas and opportunities.",
    tags: ["Collaboration", "Open to Work"],
    type: "Let's Connect",
    image: "/projects/question.jpg",
    cta: true,
  },
];

const TYPE_COLORS: Record<string, string> = {
  "Research Tool": "oklch(0.45 0.08 220)",
  "Enterprise Software": "oklch(0.58 0.15 180)",
  "Open Source": "oklch(0.55 0.14 190)",
  "Web Application": "oklch(0.58 0.15 180)",
  "Computer Vision": "oklch(0.50 0.10 210)",
  "Game": "oklch(0.65 0.12 200)",
  "Mobile App": "oklch(0.58 0.15 180)",
  "Let's Connect": "oklch(0.58 0.15 180)",
};

export default function ProjectsSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="projects" className="py-28 relative overflow-hidden" style={{ background: "oklch(0.96 0.003 240)" }}>
      {/* Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, oklch(0.58 0.15 180 / 5%) 0%, transparent 70%)",
          filter: "blur(80px)",
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
          <div className="section-label mb-4">Portfolio</div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-6 gap-4">
            <h2
              className="font-bold leading-tight"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                color: "oklch(0.18 0.01 240)",
              }}
            >
              Selected{" "}
              <span className="gradient-text">Projects</span>
            </h2>
          </div>
          <p
            className="max-w-xl mb-16"
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "0.9rem",
              color: "oklch(0.60 0.04 240)",
              fontStyle: "italic",
            }}
          >
            "Sometimes it is the people no one imagines anything of who do the things that no one can imagine."
            <br />
            <span style={{ fontSize: "0.8rem", color: "oklch(0.65 0.04 240)" }}>— Alan Turing</span>
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PROJECTS.map((proj, i) => (
            <div
              key={proj.name}
              className={`clean-card p-5 flex flex-col ${proj.cta ? "border-dashed" : ""}`}
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(30px)",
                transition: `opacity 0.6s ease ${i * 0.07 + 0.2}s, transform 0.6s ease ${i * 0.07 + 0.2}s`,
                borderColor: proj.cta ? "oklch(0.58 0.15 180 / 30%)" : undefined,
              }}
            >
              {/* Project image */}
              {proj.image && (
                <div
                  className="w-full h-32 -mx-5 -mt-5 mb-4 overflow-hidden"
                  style={{ width: "calc(100% + 2.5rem)" }}
                >
                  <img
                    src={proj.image}
                    alt={proj.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Type badge */}
              <div
                className="text-xs font-semibold mb-3 self-start px-2 py-0.5 rounded"
                style={{
                  background: `${TYPE_COLORS[proj.type] || "oklch(0.58 0.15 180)"}15`,
                  color: TYPE_COLORS[proj.type] || "oklch(0.58 0.15 180)",
                  fontFamily: "'Space Grotesk', sans-serif",
                  letterSpacing: "0.05em",
                }}
              >
                {proj.type}
              </div>

              <h3
                className="font-bold mb-2"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "0.95rem",
                  color: "oklch(0.18 0.01 240)",
                }}
              >
                {proj.name}
              </h3>

              <p
                className="flex-1 mb-4 text-sm leading-relaxed"
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  color: "oklch(0.50 0.05 220)",
                  lineHeight: 1.65,
                }}
              >
                {proj.description}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {proj.tags.map((tag) => (
                  <span key={tag} className="skill-tag" style={{ fontSize: "0.7rem" }}>
                    {tag}
                  </span>
                ))}
              </div>

              {proj.cta && (
                <a
                  href="mailto:contact@ignacioavas.com"
                  className="primary-btn mt-4 px-4 py-2 text-xs text-center"
                >
                  Let's Collaborate →
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
