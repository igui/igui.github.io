/* ============================================================
   MINIMALIST MODERN — Footer (Light Theme)
   Minimal footer with name, tagline, and copyright.
   ============================================================ */

export default function Footer() {
  return (
    <footer
      className="py-8 border-t"
      style={{
        borderColor: "oklch(0.92 0.004 240)",
        background: "oklch(0.98 0.002 240)",
      }}
    >
      <div className="container flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className="w-7 h-7 rounded-md flex items-center justify-center font-bold text-xs text-white"
            style={{
              background: "linear-gradient(135deg, #0EA5A5, #0D9488)",
              fontFamily: "'Space Grotesk', sans-serif",
              boxShadow: "0 4px 12px oklch(0.58 0.15 180 / 25%)",
            }}
          >
            IA
          </div>
          <span
            className="text-sm"
            style={{ color: "oklch(0.50 0.05 220)", fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Ignacio Avas
          </span>
        </div>

        <p
          className="text-xs text-center"
          style={{ color: "oklch(0.60 0.04 240)", fontFamily: "'Outfit', sans-serif" }}
        >
          © {new Date().getFullYear()} Ignacio Avas · AI Engineer · Built with precision
        </p>

        <div className="flex items-center gap-4">
          {[
            { label: "GitHub", href: "https://github.com/igui" },
            { label: "LinkedIn", href: "https://linkedin.com/in/iavas" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs transition-colors duration-200"
              style={{
                color: "oklch(0.60 0.04 240)",
                fontFamily: "'Space Grotesk', sans-serif",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "oklch(0.58 0.15 180)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "oklch(0.60 0.04 240)")}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
