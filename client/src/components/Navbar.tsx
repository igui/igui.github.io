/* ============================================================
   MINIMALIST MODERN — Navbar (Light Theme)
   Clean sticky navigation with active section tracking,
   subtle shadow on scroll, and teal accent underlines.
   ============================================================ */

import { useEffect, useState } from "react";

const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Publications", href: "#publications" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      // Determine active section
      const sections = NAV_ITEMS.map((item) => item.href.replace("#", ""));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(id);
          return;
        }
      }
      setActiveSection("");
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "oklch(0.98 0.002 240 / 95%)" : "oklch(0.98 0.002 240)",
        backdropFilter: scrolled ? "blur(10px)" : "none",
        boxShadow: scrolled ? "0 2px 12px oklch(0 0 0 / 8%)" : "none",
        borderBottom: scrolled ? "1px solid oklch(0.92 0.004 240)" : "none",
      }}
    >
      <div className="container flex items-center justify-between py-4">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2 group"
        >
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm text-white"
            style={{
              background: "linear-gradient(135deg, #0EA5A5, #0D9488)",
              fontFamily: "'Space Grotesk', sans-serif",
              boxShadow: "0 4px 12px oklch(0.58 0.15 180 / 25%)",
            }}
          >
            IA
          </div>
          <span
            className="hidden sm:block font-semibold text-sm group-hover:text-teal-600 transition-colors"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              letterSpacing: "0.05em",
              color: "oklch(0.18 0.01 240)",
            }}
          >
            Ignacio Avas
          </span>
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.href}
              onClick={() => handleNav(item.href)}
              className={`nav-link ${activeSection === item.href.replace("#", "") ? "active" : ""}`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://github.com/igui"
            target="_blank"
            rel="noopener noreferrer"
            className="outline-btn px-4 py-2 text-sm"
          >
            GitHub
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className="block w-5 h-0.5 transition-all duration-300"
            style={{
              background: "oklch(0.18 0.01 240)",
              transform: menuOpen ? "rotate(45deg) translate(4px, 4px)" : "none",
            }}
          />
          <span
            className="block w-5 h-0.5 transition-all duration-300"
            style={{
              background: "oklch(0.18 0.01 240)",
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <span
            className="block w-5 h-0.5 transition-all duration-300"
            style={{
              background: "oklch(0.18 0.01 240)",
              transform: menuOpen ? "rotate(-45deg) translate(4px, -4px)" : "none",
            }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className="md:hidden overflow-hidden transition-all duration-300"
        style={{
          maxHeight: menuOpen ? "400px" : "0",
          background: "oklch(0.98 0.002 240)",
          borderTop: menuOpen ? "1px solid oklch(0.92 0.004 240)" : "none",
        }}
      >
        <div className="container py-4 flex flex-col gap-4">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.href}
              onClick={() => handleNav(item.href)}
              className="nav-link text-left py-2"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
