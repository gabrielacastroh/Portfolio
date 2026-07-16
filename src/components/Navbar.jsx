import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks } from "../data/mockData";
import { getTranslation } from "../data/translations";
import { useLanguage } from "../contexts/useLanguage";
import { useTheme } from "../contexts/useTheme";
import { scrollToSection } from "../lib/smoothScroll";

function Navbar() {
  const { language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isEn = language === "en";

  const navLabel = (link) => (isEn && link.labelEn ? link.labelEn : link.label);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    scrollToSection(href);
    setMobileOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled ? "shadow-[0_1px_3px_0_rgba(0,0,0,0.12)]" : ""
      }`}
      style={{
        // No backdrop-filter here: the navbar is fixed over the aurora layer,
        // which animates transform on infinite keyframes and never settles, so
        // a blur would force a full-width GPU re-sample every frame even on an
        // idle page — the same trade already made for cards, see the
        // .bg-theme-card-solid comment in index.css. A near-opaque --navbar-bg
        // carries the separation instead.
        backgroundColor: scrolled ? "var(--navbar-bg)" : "transparent",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
      }}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, "#hero")}
          className="font-display font-semibold text-lg tracking-[0.04em] transition-colors duration-200 hover:opacity-90"
          style={{ color: "var(--accent)" }}
        >
          Gabriela Castro
        </a>

        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="nav-link-underline text-sm font-medium transition-colors hover:opacity-100"
                  style={{ color: "var(--text-muted)" }}
                >
                  {navLabel(link)}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={(e) => toggleTheme(e)}
              className="p-2 rounded-lg transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              style={{ color: "var(--text-primary)" }}
              aria-label={theme === "dark" ? "Modo claro" : "Modo oscuro"}
            >
              {theme === "dark" ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
            <div className="flex items-center gap-0.5 rounded-lg p-0.5" style={{ borderWidth: 1, borderStyle: "solid", borderColor: "var(--border)" }}>
              <button
                type="button"
                onClick={() => setLanguage("es")}
                className={`px-2 py-1 rounded-md transition-colors text-base leading-none ${language === "es" ? "opacity-100" : "opacity-50 hover:opacity-80"}`}
                style={{ backgroundColor: language === "es" ? "var(--border)" : "transparent" }}
                aria-pressed={language === "es"}
                aria-label="Español"
              >
                🇪🇸
              </button>
              <button
                type="button"
                onClick={() => setLanguage("en")}
                className={`px-2 py-1 rounded-md transition-colors text-base leading-none ${language === "en" ? "opacity-100" : "opacity-50 hover:opacity-80"}`}
                style={{ backgroundColor: language === "en" ? "var(--border)" : "transparent" }}
                aria-pressed={language === "en"}
                aria-label="English"
              >
                🇺🇸
              </button>
            </div>
          </div>
        </div>

        <div className="md:hidden flex items-center gap-2">
          <button
            type="button"
            onClick={(e) => toggleTheme(e)}
            className="p-2 rounded-lg transition-opacity hover:opacity-80"
            style={{ color: "var(--text-primary)" }}
            aria-label={theme === "dark" ? "Modo claro" : "Modo oscuro"}
          >
            {theme === "dark" ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
          <div className="flex items-center gap-0.5 rounded-lg p-0.5" style={{ borderWidth: 1, borderStyle: "solid", borderColor: "var(--border)" }}>
            <button type="button" onClick={() => setLanguage("es")} className={`px-2 py-1 rounded-md text-base leading-none ${language === "es" ? "opacity-100" : "opacity-50"}`} style={{ backgroundColor: language === "es" ? "var(--border)" : "transparent" }} aria-label="Español">🇪🇸</button>
            <button type="button" onClick={() => setLanguage("en")} className={`px-2 py-1 rounded-md text-base leading-none ${language === "en" ? "opacity-100" : "opacity-50"}`} style={{ backgroundColor: language === "en" ? "var(--border)" : "transparent" }} aria-label="English">🇺🇸</button>
          </div>
          <button
            type="button"
            aria-label={mobileOpen ? getTranslation(language, "a11y.closeMenu") : getTranslation(language, "a11y.openMenu")}
            onClick={() => setMobileOpen((o) => !o)}
            className="p-2 opacity-90 hover:opacity-100 transition-opacity"
            style={{ color: "var(--text-primary)" }}
          >
            {mobileOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden border-b border-theme-subtle"
            style={{ backgroundColor: "var(--navbar-bg)" }}
          >
            <ul className="px-4 sm:px-6 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="block py-3 font-medium opacity-90 hover:opacity-100 transition-opacity min-h-[44px] flex items-center"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {navLabel(link)}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default Navbar;
