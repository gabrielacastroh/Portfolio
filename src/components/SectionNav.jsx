import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { navLinks } from "../data/mockData";
import { getTranslation } from "../data/translations";
import { useLanguage } from "../contexts/useLanguage";
import { scrollToSection } from "../lib/smoothScroll";

const sectionIds = ["hero", "what-i-build", "projects", "how-i-work", "about", "skills", "contact"];
const sections = navLinks;

const DOT_GAP = 28;
const TRACK_LEFT = 5;

function SectionNav() {
  const { language } = useLanguage();
  const [activeId, setActiveId] = useState("hero");
  const isEn = language === "en";
  const sectionLabel = (link) => (isEn && link.labelEn ? link.labelEn : link.label);
  const activeIndex = sectionIds.indexOf(activeId);

  useEffect(() => {
    const observers = sectionIds.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActiveId(id);
          });
        },
        { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
      );
      observer.observe(el);
      return () => observer.disconnect();
    });
    return () => observers.forEach((cleanup) => cleanup?.());
  }, []);

  const handleClick = (e, href) => {
    e.preventDefault();
    scrollToSection(href);
  };

  const fillHeight = activeIndex * DOT_GAP + DOT_GAP / 2;

  return (
    <nav
      className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden lg:block"
      aria-label="Navegación por secciones"
      style={{ paddingLeft: TRACK_LEFT }}
    >
      <div
        className="absolute rounded-full"
        style={{
          left: 0,
          top: DOT_GAP / 2,
          bottom: DOT_GAP / 2,
          width: 1,
          backgroundColor: "var(--line-muted)",
          opacity: 0.7,
        }}
        aria-hidden
      />

      <motion.div
        className="absolute left-0 rounded-full"
        transition={{ type: "spring", stiffness: 120, damping: 24 }}
        style={{
          top: DOT_GAP / 2,
          width: 1,
          height: fillHeight,
          background: "linear-gradient(to bottom, var(--accent), rgba(167, 139, 250, 0.5))",
          transformOrigin: "top",
        }}
        aria-hidden
      />

      <div className="relative flex flex-col items-center">
        {sections.map((section) => {
          const isActive = activeId === section.id;

          return (
            <a
              key={section.id}
              href={section.href}
              onClick={(e) => handleClick(e, section.href)}
              className="group relative flex items-center gap-3 py-[10px]"
              aria-current={isActive ? "section" : undefined}
              aria-label={`${getTranslation(language, "a11y.goTo")} ${sectionLabel(section)}`}
            >
              <motion.span
                layout
                transition={{ type: "spring", stiffness: 400, damping: 28 }}
                className="relative z-10 shrink-0 rounded-full"
                style={{
                  width: isActive ? 10 : 6,
                  height: isActive ? 10 : 6,
                  marginLeft: -TRACK_LEFT,
                  border: isActive ? "none" : "1.5px solid var(--line-muted)",
                  backgroundColor: isActive ? "var(--accent)" : "transparent",
                  boxShadow: isActive
                    ? "0 0 0 3px rgba(167, 139, 250, 0.25), 0 0 12px rgba(167, 139, 250, 0.4)"
                    : "none",
                }}
              />

              <motion.span
                initial={false}
                animate={{
                  opacity: isActive ? 1 : 0,
                  x: isActive ? 0 : -8,
                }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="absolute left-full ml-4 top-1/2 -translate-y-1/2 whitespace-nowrap pointer-events-none select-none rounded px-2 py-1"
                style={{
                  color: "var(--text-primary)",
                  fontSize: "0.6875rem",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  backgroundColor: isActive ? "var(--bg-card)" : "transparent",
                  borderLeft: isActive ? "2px solid var(--accent)" : "none",
                }}
              >
                {sectionLabel(section)}
              </motion.span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}

export default SectionNav;
