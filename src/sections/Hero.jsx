import { motion } from "framer-motion";
import { personal, contact } from "../data/mockData";
import { getTranslation } from "../data/translations";
import { useLanguage } from "../contexts/LanguageContext";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

function Hero() {
  const { language } = useLanguage();
  const t = (key) => getTranslation(language, key);
  const tagline = language === "en" && personal.taglineEn ? personal.taglineEn : personal.tagline;

  return (
    <section
      id="hero"
      className="relative min-h-screen min-h-[100dvh] flex items-center justify-center overflow-hidden w-full safe-top"
    >
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(to right, transparent, var(--border), transparent)" }} />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 w-full max-w-4xl px-4 sm:px-6 flex flex-col items-center justify-center text-center lg:-translate-x-[2.5rem]"
      >
        <motion.p
          variants={item}
          className="text-xs sm:text-sm md:text-base font-medium text-[#a78bfa] tracking-[0.15em] sm:tracking-[0.2em] uppercase mb-3 sm:mb-4"
        >
          {t("hero.hi")}
        </motion.p>
        <motion.h1
          variants={item}
          className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-tight leading-tight mb-4 w-full text-center"
          style={{ color: "var(--text-primary)" }}
        >
          {personal.name}
        </motion.h1>
        <motion.p variants={item} className="text-lg sm:text-xl md:text-2xl text-theme-muted font-medium mb-4 sm:mb-6">
          {personal.professionalTitle}
        </motion.p>
        {tagline && (
          <motion.p variants={item} className="text-base md:text-lg text-theme-muted-2 max-w-xl mx-auto leading-relaxed">
            {tagline}
          </motion.p>
        )}

        <motion.div
          variants={item}
          className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3"
        >
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-2.5 rounded-lg border bg-theme-card text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 transition-colors min-h-[44px]"
            style={{ borderColor: "var(--border)", color: "var(--text-primary)" }}
          >
            <span aria-hidden>@</span>
            {t("hero.contactMe")}
          </a>
          {contact.cvUrl && (
            <a
              href={contact.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-2.5 rounded-lg border bg-theme-card text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 transition-colors min-h-[44px] items-center"
              style={{ borderColor: "var(--border)", color: "var(--text-primary)" }}
            >
              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              {t("hero.downloadCv")}
            </a>
          )}
          <span className="w-px h-6 opacity-30" style={{ backgroundColor: "var(--border)" }} aria-hidden />
          <a
            href={contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-lg border bg-theme-card focus:outline-none focus:ring-2 transition-colors hover:opacity-90 min-w-[44px] min-h-[44px] flex items-center justify-center"
            style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
            aria-label="GitHub"
          >
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
          </a>
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-lg border bg-theme-card focus:outline-none focus:ring-2 transition-colors hover:opacity-90 min-w-[44px] min-h-[44px] flex items-center justify-center"
            style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
            aria-label="LinkedIn"
          >
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
        </motion.div>

        <motion.div
          variants={item}
          className="mt-12 h-1 w-24 mx-auto rounded-full bg-gradient-to-r from-transparent via-[#a78bfa]/60 to-transparent blur-sm"
        />
      </motion.div>

    </section>
  );
}

export default Hero;
