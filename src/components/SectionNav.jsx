import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { navLinks } from "../data/mockData";
import { getTranslation } from "../data/translations";
import { useLanguage } from "../contexts/useLanguage";
import { scrollToSection } from "../lib/smoothScroll";

const sectionIds = navLinks.map((link) => link.id);
const sections = navLinks;

const DOT_GAP = 28;
const TRACK_LEFT = 5;

// Every dot renders at DOT_SIZE and is scaled down when inactive. Sizing them
// per-state would change each <a>'s height and shift every dot below it, so the
// box stays fixed and only the transform varies.
const DOT_SIZE = 10;
const DOT_INACTIVE_SCALE = 0.6;

// border-box means the border eats into DOT_SIZE rather than growing the box, and
// the transform shrinks the border along with everything else. Pre-dividing by the
// inactive scale makes the ring land on its intended 1.5px once scaled down.
const DOT_BORDER_WIDTH = 1.5 / DOT_INACTIVE_SCALE;

// The fill bar's maximum extent: the last dot's centre plus the half-gap the
// design carries past it. The bar is always rendered this tall and scaled from the
// top, so this is the denominator every fill fraction is measured against.
const TRACK_HEIGHT = (sectionIds.length - 1) * DOT_GAP + DOT_GAP / 2;

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

  // indexOf returns -1 for an activeId outside sectionIds, which would drive the
  // fill to a negative scale. Clamp before it reaches the transform.
  const fillIndex = Math.max(activeIndex, 0);
  const fillHeight = fillIndex * DOT_GAP + DOT_GAP / 2;
  const fillScaleY = TRACK_HEIGHT > 0 ? Math.min(fillHeight / TRACK_HEIGHT, 1) : 0;

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

      {/* The bar is held at its full height and revealed with scaleY rather than
          animated on height: height is a layout property, and framer only animates
          what it is given as a target, so a height driven from style would snap and
          reflow on every IntersectionObserver update mid-scroll. scaleY is a
          compositor transform, so the spring below actually has something to run on. */}
      <motion.div
        className="absolute left-0 rounded-full"
        initial={false}
        animate={{ scaleY: fillScaleY }}
        transition={{ type: "spring", stiffness: 120, damping: 24 }}
        style={{
          top: DOT_GAP / 2,
          width: 1,
          height: TRACK_HEIGHT,
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
              {/* scale, not width/height. Two reasons: (1) width/height are layout
                  properties, so resizing the active dot changes its <a>'s height and
                  shifts every dot below it — and activeId comes from an
                  IntersectionObserver, so that reflow lands mid-scroll; (2) framer only
                  corrects the border-radius distortion of a layout animation when it
                  owns borderRadius, which a `rounded-full` class hides from it, so the
                  dot stretched into an ellipse on the way. borderRadius lives in style
                  here for the same reason. */}
              <motion.span
                initial={false}
                animate={{ scale: isActive ? 1 : DOT_INACTIVE_SCALE }}
                transition={{ type: "spring", stiffness: 400, damping: 28 }}
                className="relative z-10 shrink-0"
                style={{
                  width: DOT_SIZE,
                  height: DOT_SIZE,
                  borderRadius: "50%",
                  marginLeft: -TRACK_LEFT,
                  border: isActive ? "none" : `${DOT_BORDER_WIDTH}px solid var(--line-muted)`,
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
