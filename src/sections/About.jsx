import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { about, stats } from "../data/mockData";
import { useLanguage } from "../contexts/LanguageContext";
import TitleReveal from "../components/TitleReveal";
import ScrollStatement from "../components/ScrollStatement";
import OrbitalText from "../components/OrbitalText";
import { EASE } from "../lib/motion";

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
      onViewportEnter={handleViewportEnter}
      viewport={{ once: true, margin: "-40px" }}
      className="flex flex-col items-center md:items-start"
    >
      <span className="font-display font-bold text-xl sm:text-2xl" style={{ color: "var(--text-primary)" }}>
        {count}
        {stat.suffix}
      </span>
      <span className="text-xs sm:text-sm text-theme-muted-2">{label}</span>
    </motion.div>
  );
}

function About() {
  const { language } = useLanguage();
  const hasPhoto = about.photo != null && about.photo !== "";
  const isEn = language === "en";
  const title = isEn && about.titleEn ? about.titleEn : about.title;
  const description = isEn && about.descriptionEn ? about.descriptionEn : about.description;
  const shortBio = isEn && about.shortBioEn ? about.shortBioEn : about.shortBio;
  const exploring = isEn && about.exploringEn ? about.exploringEn : about.exploring;
  const statement = isEn && about.statementEn ? about.statementEn : about.statement;
  const orbitalBuilding =
    isEn && about.orbitalBuildingEn ? about.orbitalBuildingEn : about.orbitalBuilding;

  return (
    <section
      id="about"
      className="relative min-h-screen min-h-[100dvh] flex flex-col items-center justify-center px-4 sm:px-6 py-16 sm:py-24 border-t border-theme-subtle overflow-hidden"
    >
      {orbitalBuilding && (
        <div className="absolute left-[2%] top-[10%] -z-[1]" aria-hidden>
          <OrbitalText text={orbitalBuilding} size={240} direction={-1} />
        </div>
      )}
      <div className="max-w-3xl w-full mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="flex flex-col items-center md:flex-row md:items-start gap-6 sm:gap-8 text-center md:text-left"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="shrink-0"
          >
            {hasPhoto ? (
              <img
                src={about.photo}
                alt=""
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover ring-2 ring-offset-2"
                style={{ ["--tw-ring-color"]: "var(--border)", ["--tw-ring-offset-color"]: "var(--bg-base)" }}
              />
            ) : (
              <div
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full ring-2 ring-offset-2 bg-theme-card animate-pulse"
                style={{ ["--tw-ring-color"]: "var(--border)", ["--tw-ring-offset-color"]: "var(--bg-base)" }}
                aria-hidden
              />
            )}
          </motion.div>
          <div className="space-y-4 sm:space-y-6 flex-1 min-w-0">
            <TitleReveal
              as="h2"
              text={title}
              className="font-display font-bold text-2xl sm:text-3xl md:text-4xl"
              style={{ color: "var(--text-primary)" }}
              withDivider
              dividerClassName="mx-auto md:mx-0"
            />
            {statement && (
              <ScrollStatement
                text={statement}
                className="font-display font-semibold text-xl sm:text-2xl leading-snug"
              />
            )}
            <p className="text-theme-muted text-sm sm:text-base leading-relaxed whitespace-pre-line">
              {description}
            </p>
            <p className="text-sm text-theme-muted-2">{shortBio}</p>
            {exploring && (
              <p
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium px-3 py-1.5 rounded-full border bg-theme-card"
                style={{ borderColor: "var(--border)", color: "var(--accent)" }}
              >
                <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: "var(--accent)" }} aria-hidden />
                {exploring}
              </p>
            )}
            {stats && stats.length > 0 && (
              <div className="flex flex-wrap justify-center md:justify-start gap-6 sm:gap-8 pt-2">
                {stats.map((stat) => (
                  <CounterStat key={stat.id} stat={stat} isEn={isEn} />
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default About;
