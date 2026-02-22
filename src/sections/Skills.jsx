import { motion } from "framer-motion";
import { skills } from "../data/mockData";
import { getTranslation } from "../data/translations";
import { useLanguage } from "../contexts/LanguageContext";

const SKILL_COLORS = {
  react: "61DAFB",
  javascript: "F7DF1E",
  typescript: "3178C6",
  html5: "E34F26",
  css: "1572B6",
  tailwindcss: "06B6D4",
  nextdotjs: "9CA3AF",
  mui: "007FFF",
  python: "3776AB",
  django: "2BA977",
  swagger: "85EA2D",
  postman: "FF6C37",
  flutter: "02569B",
  sqlite: "0EA5E9",
  postgresql: "4169E1",
  git: "F05032",
  github: "A8B4C0",
  figma: "F24E1E",
  codepen: "9CA3AF",
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.12 },
  },
};

const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0 },
};

function SkillCard({ skill, variants }) {
  const iconSlug = skill.icon || "codepen";
  const hex = SKILL_COLORS[iconSlug] || "6B7280";
  const iconUrl = `https://cdn.simpleicons.org/${iconSlug}/${hex}`;

  return (
    <motion.div
      variants={variants}
      className="group flex items-center gap-2 sm:gap-3 rounded-xl border px-2.5 sm:px-3 py-2 sm:py-2.5 transition-all duration-300 hover:border-opacity-50 min-w-0"
      style={{
        borderColor: "var(--border)",
        backgroundColor: "var(--bg-card)",
        color: "var(--text-primary)",
      }}
    >
      <span className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg bg-white/5 dark:bg-black/10">
        <img
          src={iconUrl}
          alt=""
          className="h-5 w-5 sm:h-6 sm:w-6 object-contain"
          width={24}
          height={24}
          loading="lazy"
        />
      </span>
      <span className="text-xs sm:text-sm font-medium min-w-0 break-words">{skill.name}</span>
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
      <div className="max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-6 sm:mb-8 md:mb-10 text-center"
        >
          <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl" style={{ color: "var(--text-primary)" }}>
            {t("skills.title")}
          </h2>
          <p className="mt-2 text-theme-muted-2 text-sm sm:text-base max-w-md mx-auto">
            {t("skills.subtitle")}
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4"
        >
          {skills.map((skill) => (
            <SkillCard
              key={skill.name}
              skill={typeof skill === "string" ? { name: skill, icon: "codepen" } : skill}
              variants={item}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Skills;
