import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { about } from "../data/mockData";
import { useLanguage } from "../contexts/useLanguage";
import TitleReveal from "../components/TitleReveal";
import ScrollStatement from "../components/ScrollStatement";
import OrbitalText from "../components/OrbitalText";
import { EASE } from "../lib/motion";
import { prefersReducedMotion } from "../lib/smoothScroll";

/**
 * Wraps OrbitalText with a very subtle scroll-position parallax, additive to
 * OrbitalText's own cursor-driven parallax (handled internally via the
 * shared pointer singleton). Reduced motion: no scrub, static position.
 */
function ParallaxOrbitalText(props) {
  const wrapperRef = useRef(null);

  useEffect(() => {
    const el = wrapperRef.current;
    const section = el?.closest("section");
    if (!el || !section || prefersReducedMotion()) return undefined;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { yPercent: -8 },
        {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapperRef}>
      <OrbitalText {...props} />
    </div>
  );
}

function About() {
  const { language } = useLanguage();
  const hasPhoto = about.photo != null && about.photo !== "";
  const isEn = language === "en";
  const title = isEn && about.titleEn ? about.titleEn : about.title;
  const description = isEn && about.descriptionEn ? about.descriptionEn : about.description;
  const shortBio = isEn && about.shortBioEn ? about.shortBioEn : about.shortBio;
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
          <ParallaxOrbitalText text={orbitalBuilding} size={240} direction={-1} />
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
          <div className="space-y-4 sm:space-y-6 flex-1 min-w-0 w-full">
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
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default About;
