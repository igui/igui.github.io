/* ============================================================
   MINIMALIST MODERN — ContactSection (Light Theme)
   Full-width contact section with social links, email CTA,
   and a subtle gradient background accent.
   ============================================================ */

import { useScrollReveal } from "@/hooks/useScrollReveal";

const SOCIAL_LINKS = [
  {
    label: "GitHub",
    handle: "github.com/igui",
    href: "https://github.com/igui",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    handle: "linkedin.com/in/iavas",
    href: "https://linkedin.com/in/iavas",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "X / Twitter",
    handle: "x.com/ignacioavas",
    href: "https://x.com/ignacioavas",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Email",
    handle: "contact@ignacioavas.com",
    href: "mailto:contact@ignacioavas.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
];

export default function ContactSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section
      id="contact"
      className="py-28 relative overflow-hidden"
      style={{ background: "oklch(0.98 0.002 240)" }}
    >
      {/* Subtle glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 100%, oklch(0.58 0.15 180 / 8%) 0%, transparent 60%)",
        }}
      />

      <div className="container relative z-10">
        <div
          ref={ref}
          className="max-w-3xl mx-auto text-center"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(40px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          <div className="section-label mb-6">Get In Touch</div>

          <h2
            className="font-bold leading-tight mb-6"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              color: "oklch(0.18 0.01 240)",
            }}
          >
            Let's Build{" "}
            <span className="gradient-text">Together</span>
          </h2>

          <p
            className="mb-4 leading-relaxed"
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "1rem",
              color: "oklch(0.50 0.05 220)",
              lineHeight: 1.8,
            }}
          >
            I'm always open to discussing new opportunities, research collaborations,
            or interesting AI/ML projects. Whether you have a question or just want
            to say hi, my inbox is always open.
          </p>

          <p
            className="mb-12 text-sm"
            style={{
              fontFamily: "'Outfit', sans-serif",
              color: "oklch(0.60 0.04 240)",
              fontStyle: "italic",
            }}
          >
            "Hiring people to write code to sell is not the same as hiring people to design and build durable, usable, dependable software."
            <br />
            <span style={{ color: "oklch(0.65 0.04 240)", fontSize: "0.8rem" }}>— Larry Constantine</span>
          </p>

          {/* Email CTA */}
          <a
            href="mailto:contact@ignacioavas.com"
            className="primary-btn inline-block px-10 py-4 text-base mb-16"
          >
            Say Hello →
          </a>

          {/* Social links */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {SOCIAL_LINKS.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="clean-card p-5 flex flex-col items-center gap-3 group"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(20px)",
                  transition: `opacity 0.6s ease ${i * 0.1 + 0.3}s, transform 0.6s ease ${i * 0.1 + 0.3}s`,
                  textDecoration: "none",
                }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: "oklch(0.58 0.15 180 / 12%)",
                    color: "oklch(0.58 0.15 180)",
                  }}
                >
                  {link.icon}
                </div>
                <div>
                  <div
                    className="font-semibold text-sm"
                    style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.18 0.01 240)" }}
                  >
                    {link.label}
                  </div>
                  <div
                    className="text-xs mt-0.5"
                    style={{ color: "oklch(0.60 0.04 240)", fontFamily: "'Outfit', sans-serif" }}
                  >
                    {link.handle}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
