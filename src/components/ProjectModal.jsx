import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

/* ─── Gallery ─────────────────────────────────────────────────────────── */

function Gallery({ screenshots }) {
  const [active, setActive] = useState(0);

  if (!screenshots?.length) return null;

  return (
    <div className="space-y-3">
      {/* Main image */}
      <div
        className="w-full aspect-video rounded-xl overflow-hidden relative"
        style={{ border: "1px solid var(--border)" }}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={active}
            src={screenshots[active]}
            alt=""
            className="w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          />
        </AnimatePresence>
        {/* Subtle hover glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(167,139,250,0.08) 0%, transparent 65%)",
          }}
        />
      </div>

      {/* Thumbnails — only when multiple screenshots */}
      {screenshots.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {screenshots.map((src, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="shrink-0 w-24 aspect-video rounded-lg overflow-hidden transition-[border-color,opacity] duration-200"
              style={{
                border: `2px solid ${i === active ? "var(--accent)" : "var(--border)"}`,
                opacity: i === active ? 1 : 0.45,
              }}
            >
              <img src={src} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Animation variants ──────────────────────────────────────────────── */

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } },
};

/* ─── Modal ───────────────────────────────────────────────────────────── */

function ProjectModal({ project, onClose, t, language }) {
  const isEn = language === "en";

  // ESC to close. Page scroll is held by the overlay itself, not by a body
  // overflow lock: `body { overflow: hidden }` is inert here because
  // index.css sets `html { overflow-x: hidden }`, so the root already supplies
  // the viewport's overflow and body is never consulted for it. The overlay
  // covers the viewport and carries data-lenis-prevent + overscroll-contain,
  // which keeps every wheel/touch gesture inside it — see the className below.
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  const title = isEn && project.titleEn ? project.titleEn : project.title;
  const typeLabel = isEn && project.typeLabelEn ? project.typeLabelEn : project.typeLabel;
  const isClientProject = project.type === "client";

  const fullDesc = isEn
    ? project.longDescriptionEn || project.descriptionEn || project.description
    : project.longDescription || project.description;

  const highlights = isEn
    ? project.highlightsEn ?? project.highlights ?? []
    : project.highlights ?? [];

  const tech = project.tech ?? [];

  return (
    <motion.div
      // data-lenis-prevent: Lenis captures wheel/touch globally and applies it
      // to the page, so without this the overlay's own scroller never receives
      // the gesture. Lenis checks this attribute before its isStopped branch and
      // returns without preventDefault, which is what lets native scrolling run
      // here — lenis.stop() alone would cancel the event and freeze this too.
      // overscroll-contain stops the page from scrolling once this hits its end.
      data-lenis-prevent
      className="fixed inset-0 z-50 overflow-y-auto overscroll-contain"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <motion.div
          className="fixed inset-0"
          style={{ backgroundColor: "rgba(0,0,0,0.68)", backdropFilter: "blur(8px)" }}
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        {/* Panel */}
        <motion.div
          className="relative z-10 w-full max-w-3xl rounded-2xl border overflow-hidden"
          style={{
            borderColor: "var(--border)",
            backgroundColor: "var(--bg-base)",
          }}
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top glow accent */}
          <div
            className="absolute inset-x-0 top-0 h-48 pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, rgba(124,58,237,0.09), transparent)",
            }}
          />

          {/* Header */}
          <div className="relative flex items-start justify-between gap-4 p-5 sm:p-6 pb-4 sm:pb-5">
            <div className="min-w-0">
              {typeLabel && (
                <span
                  className="inline-block mb-2 px-2.5 py-1 rounded-full text-[0.65rem] font-semibold uppercase tracking-wide"
                  style={
                    isClientProject
                      ? { backgroundColor: "var(--accent)", color: "#fff" }
                      : { backgroundColor: "var(--bg-card)", color: "var(--text-muted)", border: "1px solid var(--border)" }
                  }
                >
                  {typeLabel}
                </span>
              )}
              <h2
                className="font-display font-bold text-xl sm:text-2xl leading-tight"
                style={{ color: "var(--text-primary)" }}
              >
                {title}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="mt-0.5 shrink-0 w-8 h-8 rounded-full flex items-center justify-center border transition-colors hover:bg-white/5"
              style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
              aria-label={t("projects.close")}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path
                  d="M1 1l12 12M13 1L1 13"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          {/* Divider */}
          <div className="h-px mx-5 sm:mx-6" style={{ backgroundColor: "var(--border)" }} />

          {/* Body — staggered children */}
          <motion.div
            className="relative p-5 sm:p-6 space-y-6"
            variants={stagger}
            initial="hidden"
            animate="show"
          >
            {/* Gallery */}
            {project.screenshots?.length > 0 && (
              <motion.div variants={fadeUp}>
                <Gallery screenshots={project.screenshots} />
              </motion.div>
            )}

            {/* Full description */}
            <motion.div variants={fadeUp}>
              <p
                className="text-sm sm:text-[0.9375rem] leading-relaxed whitespace-pre-line"
                style={{ color: "var(--text-muted)" }}
              >
                {fullDesc}
              </p>
            </motion.div>

            {/* Highlights */}
            {highlights.length > 0 && (
              <motion.div variants={fadeUp}>
                <h3
                  className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] mb-3"
                  style={{ color: "var(--text-muted-2)" }}
                >
                  {isEn ? "Highlights" : "Características"}
                </h3>
                <ul className="space-y-2">
                  {highlights.map((h, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-sm"
                      style={{ color: "var(--text-muted)" }}
                    >
                      <span
                        className="mt-[0.4rem] w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: "var(--accent)" }}
                      />
                      {h}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Tech stack */}
            <motion.div variants={fadeUp}>
              <h3
                className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] mb-3"
                style={{ color: "var(--text-muted-2)" }}
              >
                {isEn ? "Tech Stack" : "Stack Tecnológico"}
              </h3>
              <div className="flex flex-wrap gap-2">
                {tech.map((item) => (
                  <span
                    key={item}
                    className="hover-lift px-2.5 py-1 text-xs font-medium rounded-lg bg-theme-card border border-theme"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Action buttons */}
            {(project.repo || project.demo) && (
              <motion.div variants={fadeUp} className="flex flex-wrap gap-3 pt-1">
                {project.repo && (
                  <motion.a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium border transition-[color,background-color,border-color,opacity] hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/50"
                    style={{
                      borderColor: "var(--border)",
                      backgroundColor: "var(--bg-card)",
                      color: "var(--text-primary)",
                    }}
                  >
                    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path
                        fillRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {t("projects.repository")}
                  </motion.a>
                )}
                {project.demo && (
                  <motion.a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/30 shadow-lg"
                    style={{
                      background:
                        "linear-gradient(135deg, #7c3aed 0%, #a78bfa 50%, #c4b5fd 100%)",
                      boxShadow:
                        "0 0 0 1px rgba(255,255,255,0.1), 0 4px 14px rgba(124, 58, 237, 0.35)",
                    }}
                  >
                    <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    {t("projects.demo")}
                  </motion.a>
                )}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default ProjectModal;
