import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { whatIBuild } from "../data/mockData";
import { getTranslation } from "../data/translations";
import { useLanguage } from "../contexts/LanguageContext";
import TitleReveal from "../components/TitleReveal";
import Watermark from "../components/Watermark";
import { fadeUp, staggerContainer } from "../lib/motion";
import { prefersReducedMotion } from "../lib/smoothScroll";

const container = staggerContainer({ stagger: 0.1, delayChildren: 0.2 });
const card = fadeUp;

/**
 * Thin decorative connecting line drawn behind the card row via ScrollTrigger
 * scrub as the row enters the viewport — purely decorative, aria-hidden,
 * pointer-events-none. Reduced motion: renders fully drawn, no scrub.
 */
function ConnectingLine({ rowRef }) {
  const lineRef = useRef(null);
  const reduced = prefersReducedMotion();

  useEffect(() => {
    const el = lineRef.current;
    const row = rowRef.current;
    if (!el || !row || reduced) return undefined;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: row,
            start: "top 85%",
            end: "top 45%",
            scrub: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, [rowRef, reduced]);

  return (
    <div
      ref={lineRef}
      aria-hidden
      className="pointer-events-none absolute left-0 right-0 top-1/2 -z-[1] h-px origin-left"
      style={{
        backgroundColor: "var(--border)",
        transform: reduced ? "scaleX(1)" : undefined,
      }}
    />
  );
}

const ICONS = {
  systems: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.75}
        d="M4 6a2 2 0 012-2h12a2 2 0 012 2v9a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM8 21h8M12 17v4"
      />
    </svg>
  ),
  saas: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.75}
        d="M13 10V3L4 14h7v7l9-11h-7z"
      />
    </svg>
  ),
  ai: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.75}
        d="M9.663 17h4.673M12 3v2m6.364.636l-1.414 1.414M21 12h-2M5 12H3m3.05-6.95L7.464 6.464M12 8a4 4 0 00-4 4c0 1.5.816 2.5 1.5 3.2.417.427.5.827.5 1.3v.5h4v-.5c0-.473.083-.873.5-1.3.684-.7 1.5-1.7 1.5-3.2a4 4 0 00-4-4z"
      />
    </svg>
  ),
};

function WhatIBuildCard({ entry, language, floatDelay }) {
  const isEn = language === "en";
  const title = isEn && entry.titleEn ? entry.titleEn : entry.title;
  const description = isEn && entry.descriptionEn ? entry.descriptionEn : entry.description;

  return (
    <motion.article
      variants={card}
      className="group flex flex-col h-full rounded-2xl border bg-theme-card p-5 sm:p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:opacity-95"
      style={{ borderColor: "var(--border)" }}
    >
      <div
        className="flex items-center justify-center w-11 h-11 rounded-xl mb-4 shrink-0 icon-float"
        style={{
          backgroundColor: "var(--bg-card)",
          color: "var(--accent)",
          border: "1px solid var(--border)",
          animationDelay: `${floatDelay}s`,
        }}
      >
        {ICONS[entry.icon]}
      </div>
      <h3
        className="font-display font-bold text-base sm:text-lg mb-2"
        style={{ color: "var(--text-primary)" }}
      >
        {title}
      </h3>
      <p className="text-theme-muted text-sm leading-relaxed">{description}</p>
    </motion.article>
  );
}

function WhatIBuild() {
  const { language } = useLanguage();
  const t = (key) => getTranslation(language, key);
  const rowRef = useRef(null);

  return (
    <section
      id="what-i-build"
      className="relative min-h-screen min-h-[100dvh] flex flex-col justify-center px-4 sm:px-6 py-16 sm:py-24 border-t border-theme-subtle overflow-hidden"
    >
      <Watermark text="PRODUCTS" className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-8 sm:mb-12 md:mb-16"
        >
          <TitleReveal
            as="h2"
            text={t("whatIBuild.title")}
            className="font-display font-bold text-2xl sm:text-3xl md:text-4xl"
            style={{ color: "var(--text-primary)" }}
            withDivider
          />
          <p className="mt-2 text-theme-muted-2 text-sm sm:text-base max-w-xl">
            {t("whatIBuild.subtitle")}
          </p>
        </motion.div>

        <motion.div
          ref={rowRef}
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="relative grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          <ConnectingLine rowRef={rowRef} />
          {whatIBuild.map((entry, i) => (
            <WhatIBuildCard key={entry.id} entry={entry} language={language} floatDelay={i * 0.4} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default WhatIBuild;
