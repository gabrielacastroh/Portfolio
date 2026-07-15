import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { howIWork } from "../data/mockData";
import { getTranslation } from "../data/translations";
import { useLanguage } from "../contexts/LanguageContext";
import TitleReveal from "../components/TitleReveal";
import { fadeUp, scaleXReveal, staggerContainer } from "../lib/motion";
import { prefersReducedMotion as prefersReducedMotionStatic } from "../lib/smoothScroll";

const container = staggerContainer({ stagger: 0.1, delayChildren: 0.15 });
const step = fadeUp;
const line = scaleXReveal;

/**
 * Step numbers start muted and illuminate (color toward --accent, subtle
 * scale) sequentially as each one enters the viewport, via ScrollTrigger —
 * a one-shot discrete reveal per step, not a scrub. Reduced motion: all
 * steps render already active.
 */
function HowIWorkStep({ entry, language }) {
  const isEn = language === "en";
  const title = isEn && entry.titleEn ? entry.titleEn : entry.title;
  const description = isEn && entry.descriptionEn ? entry.descriptionEn : entry.description;
  const numberRef = useRef(null);
  const reduced = prefersReducedMotionStatic();

  useEffect(() => {
    const el = numberRef.current;
    if (!el || reduced) return undefined;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0.5, scale: 1 },
        {
          opacity: 1,
          scale: 1.06,
          duration: 0.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => ctx.revert();
  }, [reduced]);

  return (
    <motion.div variants={step} className="relative flex flex-col gap-2 flex-1 min-w-0">
      <span
        ref={numberRef}
        className="font-display font-bold text-2xl sm:text-3xl inline-block"
        style={{ color: "var(--accent)", opacity: reduced ? 1 : 0.5 }}
      >
        {entry.step}
      </span>
      <h3 className="font-display font-semibold text-sm sm:text-base" style={{ color: "var(--text-primary)" }}>
        {title}
      </h3>
      <p className="text-theme-muted text-xs sm:text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
}

function HowIWork() {
  const { language } = useLanguage();
  const t = (key) => getTranslation(language, key);
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="how-i-work"
      className="relative py-16 sm:py-24 px-4 sm:px-6 border-t border-theme-subtle"
    >
      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-8 sm:mb-12"
        >
          <TitleReveal
            as="h2"
            text={t("howIWork.title")}
            className="font-display font-bold text-2xl sm:text-3xl md:text-4xl"
            style={{ color: "var(--text-primary)" }}
            withDivider
          />
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="flex flex-col sm:flex-row gap-8 sm:gap-6"
        >
          {howIWork.map((entry, i) => (
            <div key={entry.id} className="flex flex-1 items-start gap-4 sm:block sm:gap-0">
              <HowIWorkStep entry={entry} language={language} />
              {i < howIWork.length - 1 &&
                (prefersReducedMotion ? (
                  <div
                    className="hidden sm:block mt-3 h-px flex-1"
                    style={{ background: "linear-gradient(to right, var(--border), transparent)" }}
                    aria-hidden
                  />
                ) : (
                  <motion.div
                    variants={line}
                    className="hidden sm:block mt-3 h-px flex-1 origin-left"
                    style={{ background: "linear-gradient(to right, var(--border), transparent)" }}
                    aria-hidden
                  />
                ))}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default HowIWork;
