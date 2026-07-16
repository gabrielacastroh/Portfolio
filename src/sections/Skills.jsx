import { motion, useMotionValue, useTransform, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";
import { skillCategories } from "../data/mockData";
import { getTranslation } from "../data/translations";
import { useLanguage } from "../contexts/useLanguage";
import TitleReveal from "../components/TitleReveal";
import { fadeUp, staggerContainer } from "../lib/motion";
import { resolveSkillIconSrc, getFallbackIconUrl } from "../lib/skillIcons";

const containerVariants = staggerContainer({ stagger: 0.07, delayChildren: 0.1 });
const categoryVariants = fadeUp;

const skillVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.25 } },
};

function SkillBadge({ skill, index = 0 }) {
  const iconSlug = skill.icon || "codepen";
  const primarySrc = resolveSkillIconSrc(iconSlug);
  const [iconSrc, setIconSrc] = useState(primarySrc);
  const [iconLoaded, setIconLoaded] = useState(false);
  const triedFallback = useRef(false);

  return (
    <motion.div
      variants={skillVariants}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className="group/skill rounded-xl border px-2.5 py-2 transition-colors duration-200 hover:border-[color:var(--accent)]"
      style={{
        borderColor: "var(--border)",
        backgroundColor: "var(--bg-card)",
        color: "var(--text-primary)",
      }}
    >
      {/* Ambient float lives on this inner element, not the motion.div above:
          framer-motion's entrance (opacity/scale) and this CSS keyframe both
          animate `transform` — on the same element they fight for it (framer
          leaves a static inline transform after entrance that permanently
          wins the cascade over the CSS animation, and during the overlap
          window the two visibly race). Separate elements, separate `transform`
          ownership, no conflict. */}
      <div
        className="skill-float flex items-center gap-2"
        style={{ animationDelay: `${(index % 4) * 0.3}s` }}
      >
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/5 dark:bg-black/10">
          <img
            src={iconSrc}
            alt=""
            className="h-4 w-4 object-contain transition-opacity duration-300 ease-out"
            style={{ opacity: iconLoaded ? 1 : 0 }}
            width={16}
            height={16}
            onLoad={() => setIconLoaded(true)}
            onError={() => {
              if (triedFallback.current) return;
              triedFallback.current = true;
              setIconLoaded(false);
              setIconSrc(getFallbackIconUrl());
            }}
          />
        </span>
        <span className="text-xs font-medium min-w-0 truncate" style={{ color: "var(--text-muted)" }}>
          {skill.name}
        </span>
      </div>
    </motion.div>
  );
}

/**
 * One shared cursor spotlight per category card (not per badge) — same
 * technique as Projects.jsx's ProjectCard: motion values updated from a
 * local onMouseMove handler drive a --mx/--my radial-gradient overlay.
 * Gated to fine-pointer hover devices and off under reduced motion.
 */
function SkillCategory({ category, language }) {
  const label = language === "en" ? category.labelEn : category.label;
  const cardRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const mxPercent = useTransform(mx, (v) => `${v}%`);
  const myPercent = useTransform(my, (v) => `${v}%`);

  const handleMouseMove = (e) => {
    if (
      prefersReducedMotion ||
      typeof window === "undefined" ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches
    ) {
      return;
    }
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mx.set(((e.clientX - rect.left) / rect.width) * 100);
    my.set(((e.clientY - rect.top) / rect.height) * 100);
  };

  return (
    <motion.div
      ref={cardRef}
      variants={categoryVariants}
      onMouseMove={handleMouseMove}
      className="group/cat relative flex flex-col overflow-hidden rounded-2xl border p-4 sm:p-5 transition-all duration-300 hover:border-[var(--accent)]/25"
      style={{
        borderColor: "var(--border)",
        backgroundColor: "var(--bg-card)",
        "--mx": mxPercent,
        "--my": myPercent,
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/cat:opacity-100"
        style={{
          background: "radial-gradient(circle at var(--mx) var(--my), rgba(167, 139, 250, 0.14), transparent 60%)",
        }}
        aria-hidden
      />
      <span
        className="relative mb-3 text-[10px] font-bold uppercase tracking-widest"
        style={{ color: "var(--accent)" }}
      >
        {label}
      </span>
      {/* No independent whileInView here — this grid inherits its parent
          SkillCategory's animate state (hidden/show) so both levels of the
          reveal cascade run off a single viewport trigger instead of two
          separate ones. */}
      <motion.div variants={containerVariants} className="relative grid grid-cols-2 gap-2">
        {category.skills.map((skill, index) => (
          <SkillBadge key={skill.name} skill={skill} index={index} />
        ))}
      </motion.div>
    </motion.div>
  );
}

function Skills() {
  const { language } = useLanguage();
  const t = (key) => getTranslation(language, key);

  return (
    <section
      id="skills"
      className="relative min-h-screen min-h-[100dvh] flex flex-col justify-center px-4 sm:px-6 py-16 sm:py-24 border-t border-theme-subtle"
    >
      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-8 sm:mb-12 text-center"
        >
          <TitleReveal
            as="h2"
            text={t("skills.title")}
            className="font-display font-bold text-2xl sm:text-3xl md:text-4xl"
            style={{ color: "var(--text-primary)" }}
            withDivider
            dividerClassName="mx-auto"
          />
          <p className="mt-2 text-theme-muted-2 text-sm sm:text-base max-w-md mx-auto">
            {t("skills.subtitle")}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
        >
          {skillCategories.map((category) => (
            <SkillCategory
              key={category.id}
              category={category}
              language={language}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Skills;
