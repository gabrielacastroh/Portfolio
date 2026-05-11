import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { skillCategories } from "../data/mockData";
import { getTranslation } from "../data/translations";
import { useLanguage } from "../contexts/LanguageContext";

const SKILL_COLORS = {
  react: "61DAFB",
  javascript: "F7DF1E",
  typescript: "3178C6",
  tailwindcss: "06B6D4",
  nextdotjs: "9CA3AF",
  mui: "007FFF",
  fastapi: "009688",
  django: "2BA977",
  flask: "AAAAAA",
  graphql: "E10098",
  swagger: "85EA2D",
  jsonwebtokens: "D63AFF",
  openid: "F78C40",
  zustand: "443C55",
  redux: "764ABC",
  reactquery: "FF4154",
  postgresql: "4169E1",
  microsoftsqlserver: "CC2927",
  docker: "2496ED",
  amazonaws: "FF9900",
  linux: "FCC624",
  git: "F05032",
  playwright: "2EAD33",
  axecore: "663399",
  openai: "9CA3AF",
  groq: "F55036",
  flutter: "02569B",
  dart: "0175C2",
  codepen: "9CA3AF",
};

/** Slugs fuera del CDN oficial de Simple Icons o sin icono allí → URL fija (Iconify / jsDelivr). */
const ICON_SOURCE_OVERRIDES = {
  // CDN simpleicons.org sin estos assets → mismo paquete en jsDelivr.
  playwright: "https://cdn.jsdelivr.net/npm/simple-icons@11/icons/playwright.svg",
  microsoftsqlserver:
    "https://cdn.jsdelivr.net/npm/simple-icons@11/icons/microsoftsqlserver.svg",
  amazonaws: "https://cdn.jsdelivr.net/npm/simple-icons@11/icons/amazonaws.svg",
  openai: "https://cdn.jsdelivr.net/npm/simple-icons@11/icons/openai.svg",
  // Sin entrada en Simple Icons CDN (o 404 estable).
  zustand: "https://api.iconify.design/devicon-plain:zustand.svg",
  groq: "https://api.iconify.design/bxl:groq-ai.svg",
  axecore: "https://api.iconify.design/mdi:accessibility.svg",
};

/** URL de respaldo si la imagen falla al cargar. */
function getFallbackIconUrl() {
  const hex = SKILL_COLORS.codepen;
  return `https://cdn.simpleicons.org/codepen/${hex}`;
}

function resolveSkillIconSrc(slug) {
  const override = ICON_SOURCE_OVERRIDES[slug];
  if (override) return override;
  const hex = SKILL_COLORS[slug] ?? "6B7280";
  return `https://cdn.simpleicons.org/${slug}/${hex}`;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
};

const categoryVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const skillVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.25 } },
};

function SkillBadge({ skill }) {
  const iconSlug = skill.icon || "codepen";
  const primarySrc = resolveSkillIconSrc(iconSlug);
  const [iconSrc, setIconSrc] = useState(primarySrc);
  const triedFallback = useRef(false);

  return (
    <motion.div
      variants={skillVariants}
      className="group/skill flex items-center gap-2 rounded-xl border px-2.5 py-2 transition-all duration-200 hover:border-opacity-60"
      style={{
        borderColor: "var(--border)",
        backgroundColor: "var(--bg-card)",
        color: "var(--text-primary)",
      }}
    >
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/5 dark:bg-black/10">
        <img
          src={iconSrc}
          alt=""
          className="h-4 w-4 object-contain"
          width={16}
          height={16}
          loading="lazy"
          onError={() => {
            if (triedFallback.current) return;
            triedFallback.current = true;
            setIconSrc(getFallbackIconUrl());
          }}
        />
      </span>
      <span className="text-xs font-medium min-w-0 truncate" style={{ color: "var(--text-muted)" }}>
        {skill.name}
      </span>
    </motion.div>
  );
}

function SkillCategory({ category, language }) {
  const label = language === "en" ? category.labelEn : category.label;

  return (
    <motion.div
      variants={categoryVariants}
      className="group/cat flex flex-col rounded-2xl border p-4 sm:p-5 transition-all duration-300 hover:border-[var(--accent)]/25"
      style={{
        borderColor: "var(--border)",
        backgroundColor: "var(--bg-card)",
      }}
    >
      <span
        className="mb-3 text-[10px] font-bold uppercase tracking-widest"
        style={{ color: "var(--accent)" }}
      >
        {label}
      </span>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-20px" }}
        className="grid grid-cols-2 gap-2"
      >
        {category.skills.map((skill) => (
          <SkillBadge key={skill.name} skill={skill} />
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
          <h2
            className="font-display font-bold text-2xl sm:text-3xl md:text-4xl"
            style={{ color: "var(--text-primary)" }}
          >
            {t("skills.title")}
          </h2>
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
