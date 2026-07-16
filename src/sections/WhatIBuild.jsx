import { motion } from "framer-motion";
import { whatIBuild } from "../data/mockData";
import { getTranslation } from "../data/translations";
import { useLanguage } from "../contexts/useLanguage";
import TitleReveal from "../components/TitleReveal";
import { fadeUp, staggerContainer, scaleXReveal } from "../lib/motion";

const container = staggerContainer({ stagger: 0.1, delayChildren: 0.2 });
const card = fadeUp;

/**
 * Thin decorative connecting line drawn behind the card row. Uses the SAME
 * `variants`/`whileInView` entrance as the cards (via the shared `container`
 * context) instead of an independent GSAP scroll-scrub. A scrub tied to raw
 * scroll position completes instantly whenever the row is entered by a jump
 * (nav click, reload with scroll restored) rather than a gradual scroll —
 * the line would render fully drawn before the cards' own entrance had time
 * to play, since the two were on unrelated timelines. Piggybacking on the
 * cards' one-shot entrance guarantees they always stay in lockstep.
 */
function ConnectingLine() {
  return (
    <motion.div
      variants={scaleXReveal}
      aria-hidden
      className="pointer-events-none absolute left-0 right-0 top-1/2 -z-[1] h-px origin-left"
      style={{ backgroundColor: "var(--border)" }}
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
      className="group flex flex-col h-full rounded-2xl border bg-theme-card-solid p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:opacity-95"
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

  return (
    <section
      id="what-i-build"
      className="relative min-h-screen min-h-[100dvh] flex flex-col justify-center px-4 sm:px-6 py-16 sm:py-24 border-t border-theme-subtle overflow-hidden"
    >
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
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="relative grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          <ConnectingLine />
          {whatIBuild.map((entry, i) => (
            <WhatIBuildCard key={entry.id} entry={entry} language={language} floatDelay={i * 0.4} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default WhatIBuild;
