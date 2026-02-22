import { motion } from "framer-motion";
import { about } from "../data/mockData";
import { useLanguage } from "../contexts/LanguageContext";

function About() {
  const { language } = useLanguage();
  const hasPhoto = about.photo != null && about.photo !== "";
  const isEn = language === "en";
  const title = isEn && about.titleEn ? about.titleEn : about.title;
  const description = isEn && about.descriptionEn ? about.descriptionEn : about.description;
  const shortBio = isEn && about.shortBioEn ? about.shortBioEn : about.shortBio;

  return (
    <section
      id="about"
      className="relative min-h-screen min-h-[100dvh] flex flex-col items-center justify-center px-4 sm:px-6 py-16 sm:py-24 border-t border-theme-subtle"
    >
      <div className="max-w-3xl w-full mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
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
            <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl" style={{ color: "var(--text-primary)" }}>
              {title}
            </h2>
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
