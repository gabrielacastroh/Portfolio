import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { stats } from "../data/mockData";
import { getTranslation } from "../data/translations";
import { useLanguage } from "../contexts/useLanguage";
import TitleReveal from "../components/TitleReveal";
import { fadeUp, staggerContainer } from "../lib/motion";

const containerVariants = staggerContainer({ stagger: 0.1, delayChildren: 0.15 });

/**
 * Count-up stat card. Relocated from About.jsx (formerly a local fn there) —
 * same count-up + reduced-motion guard, unchanged logic.
 */
function CounterStat({ stat, isEn }) {
  const prefersReducedMotion = useReducedMotion();
  const [count, setCount] = useState(prefersReducedMotion ? stat.value : 0);
  const hasAnimated = useRef(false);
  const frameRef = useRef(null);
  const label = isEn && stat.labelEn ? stat.labelEn : stat.label;

  useEffect(() => () => cancelAnimationFrame(frameRef.current), []);

  const handleViewportEnter = () => {
    if (prefersReducedMotion || hasAnimated.current) return;
    hasAnimated.current = true;
    const duration = 900;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * stat.value));
      if (progress < 1) frameRef.current = requestAnimationFrame(tick);
    };
    frameRef.current = requestAnimationFrame(tick);
  };

  return (
    <motion.div
      variants={fadeUp}
      onViewportEnter={handleViewportEnter}
      viewport={{ once: true, margin: "-40px" }}
      className="flex flex-col items-center gap-1 rounded-2xl border bg-theme-card backdrop-blur-sm px-4 py-5 sm:py-6 text-center"
      style={{ borderColor: "var(--border)" }}
    >
      <span className="font-display font-bold text-2xl sm:text-3xl" style={{ color: "var(--text-primary)" }}>
        {count}
        {stat.suffix}
      </span>
      <span className="text-xs sm:text-sm text-theme-muted-2">{label}</span>
    </motion.div>
  );
}

/**
 * Static breadth pill — not a counter, just what's true today: web + backend
 * + cloud. Same label in both languages (short technical shorthand, no
 * translation needed — ponytail: skip translations.js entry for a literal
 * that reads the same in ES/EN).
 */
function BreadthPill() {
  return (
    <motion.div
      variants={fadeUp}
      className="flex flex-col items-center justify-center gap-1 rounded-2xl border bg-theme-card backdrop-blur-sm px-4 py-5 sm:py-6 text-center"
      style={{ borderColor: "var(--border)" }}
    >
      <span className="font-display font-bold text-lg sm:text-xl" style={{ color: "var(--accent)" }}>
        Full Stack
      </span>
      <span className="text-xs sm:text-sm text-theme-muted-2">Web + Backend + Cloud</span>
    </motion.div>
  );
}

function TrustSection() {
  const { language } = useLanguage();
  const isEn = language === "en";
  const t = (key) => getTranslation(language, key);

  return (
    <section
      id="trust"
      className="relative px-4 sm:px-6 py-16 sm:py-24 border-t border-theme-subtle"
    >
      <div className="max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-8 sm:mb-12 text-center"
        >
          <span
            className="text-xs font-bold uppercase tracking-widest"
            style={{ color: "var(--accent)" }}
          >
            {t("trust.eyebrow")}
          </span>
          <TitleReveal
            as="h2"
            text={t("trust.heading")}
            className="mt-2 font-display font-bold text-2xl sm:text-3xl md:text-4xl"
            style={{ color: "var(--text-primary)" }}
            withDivider
            dividerClassName="mx-auto"
          />
          <p className="mt-2 text-theme-muted-2 text-sm sm:text-base max-w-md mx-auto">
            {t("trust.subtitle")}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5"
        >
          {stats.map((stat) => (
            <CounterStat key={stat.id} stat={stat} isEn={isEn} />
          ))}
          <BreadthPill />
        </motion.div>
      </div>
    </section>
  );
}

export default TrustSection;
