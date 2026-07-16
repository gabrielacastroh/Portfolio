import { useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { projects } from "../data/mockData";
import { getTranslation } from "../data/translations";
import { useLanguage } from "../contexts/LanguageContext";
import ProjectModal from "../components/ProjectModal";
import TitleReveal from "../components/TitleReveal";
import Watermark from "../components/Watermark";
import { fadeUp, staggerContainer } from "../lib/motion";

const container = staggerContainer({ stagger: 0.1, delayChildren: 0.2 });
const card = fadeUp;

/** Small stagger container/item for the tech-tag pills — inherits the card's
 * whileInView state via variants only (no separate viewport trigger), same
 * nested-reveal pattern already used in Skills.jsx to avoid flicker. */
const tagContainer = staggerContainer({ stagger: 0.04, delayChildren: 0 });
const tagItem = {
  hidden: { opacity: 0, y: 4 },
  show: { opacity: 1, y: 0, transition: { duration: 0.25 } },
};

const TILT_MAX_DEG = 3.5;
const TILT_SPRING = { stiffness: 220, damping: 20, mass: 0.4 };

function ProjectCard({ project, index, t, language, onSelect }) {
  const isEn = language === "en";
  const title = isEn && project.titleEn ? project.titleEn : project.title;
  const description = isEn && project.descriptionEn ? project.descriptionEn : project.description;
  const typeLabel = isEn && project.typeLabelEn ? project.typeLabelEn : project.typeLabel;
  const isClientProject = project.type === "client";
  const tech = project.tech ?? [];
  const repoUrl = project.repo;
  const demoUrl = project.demo;
  const image = project.image;
  const previewVideo = project.previewVideo;

  const prefersReducedMotion = useReducedMotion();
  const videoRef = useRef(null);
  const cardRef = useRef(null);
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // 3D tilt + cursor-tracked inner highlight — element-relative motion values,
  // no per-frame setState. Reduced motion / touch: springs stay at rest and
  // the highlight never becomes visible (opacity driven purely by CSS hover).
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, TILT_SPRING);
  const springRotateY = useSpring(rotateY, TILT_SPRING);
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const glowXPercent = useTransform(glowX, (v) => `${v}%`);
  const glowYPercent = useTransform(glowY, (v) => `${v}%`);

  const canTilt = () =>
    !prefersReducedMotion &&
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  const handleCardMouseMove = (e) => {
    if (!canTilt()) return;
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rotateY.set((px - 0.5) * 2 * TILT_MAX_DEG);
    rotateX.set(-(py - 0.5) * 2 * TILT_MAX_DEG);
    glowX.set(px * 100);
    glowY.set(py * 100);
  };

  const handleCardMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  const canHoverPreview = () =>
    previewVideo &&
    !prefersReducedMotion &&
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  const handleMouseEnter = () => {
    if (!canHoverPreview()) return;
    const video = videoRef.current;
    if (!video) return;
    if (!video.src) video.src = previewVideo;
    video.currentTime = 0;
    video.play().catch(() => {});
    setIsPreviewing(true);
  };

  const handleMouseLeave = () => {
    if (!previewVideo) return;
    setIsPreviewing(false);
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  };

  return (
    <motion.article
      ref={cardRef}
      variants={card}
      onClick={() => onSelect(project)}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleCardMouseMove}
      onMouseLeave={() => {
        handleMouseLeave();
        handleCardMouseLeave();
      }}
      style={{
        borderColor: "var(--border)",
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformPerspective: 1000,
        "--mx": glowXPercent,
        "--my": glowYPercent,
      }}
      className="group relative flex flex-col h-full rounded-2xl border bg-theme-card overflow-hidden backdrop-blur-sm transition-all duration-300 hover:opacity-95 cursor-pointer"
    >
      {/* Imagen: 16:9 fija arriba */}
      <div className="relative w-full aspect-video shrink-0 rounded-t-2xl overflow-hidden bg-theme-base">
        {image ? (
          <img
            src={image}
            alt=""
            onLoad={() => setImageLoaded(true)}
            className="w-full h-full object-cover transition-[opacity,transform] duration-500 ease-out group-hover:scale-[1.04]"
            style={{ opacity: imageLoaded ? 1 : 0 }}
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ backgroundColor: "var(--bg-card)" }}
            aria-hidden
          >
            <span className="text-theme-muted-2 text-xs font-medium">
              {t("projects.project")} {String(index + 1).padStart(2, "0")}
            </span>
          </div>
        )}
        {previewVideo && (
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload="none"
            aria-hidden
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
            style={{ opacity: isPreviewing ? 1 : 0 }}
          />
        )}
        {typeLabel && (
          <span
            className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[0.65rem] font-semibold uppercase tracking-wide backdrop-blur-sm transition-transform duration-300 ease-out group-hover:-translate-y-0.5"
            style={
              isClientProject
                ? { backgroundColor: "var(--accent)", color: "#fff" }
                : { backgroundColor: "rgba(0,0,0,0.55)", color: "#fff" }
            }
          >
            {typeLabel}
          </span>
        )}
      </div>

      {/* Contenido */}
      <div className="flex flex-col flex-1 min-h-0 p-4 sm:p-5 md:p-6">
        <h3
          className="font-display font-bold text-base sm:text-lg mb-2 line-clamp-2 transition-all duration-300 ease-out group-hover:opacity-80 group-hover:-translate-y-0.5"
          style={{ color: "var(--text-primary)" }}
          title={title}
        >
          {title}
        </h3>

        <p
          className="text-theme-muted text-xs sm:text-sm leading-relaxed line-clamp-3 min-h-[3.75rem] mb-3"
          title={description}
        >
          {description}
        </p>

        <motion.div variants={tagContainer} className="flex flex-wrap gap-2 min-h-[3.25rem] mb-4">
          {tech.map((techItem) => (
            <motion.span
              key={techItem}
              variants={tagItem}
              className="hover-lift px-2.5 py-1 text-xs font-medium rounded-lg bg-theme-card border border-theme"
              style={{ color: "var(--text-muted)" }}
            >
              {techItem}
            </motion.span>
          ))}
        </motion.div>

        <div className="flex-1 min-h-2" />

        {/* Acciones — stopPropagation para no abrir el modal */}
        <div
          className="flex flex-wrap items-center gap-2 shrink-0 pt-1"
          onClick={(e) => e.stopPropagation()}
        >
          {repoUrl && (
            <motion.a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium border transition-all hover:opacity-90 hover:border-[color:var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/50"
              style={{
                borderColor: "var(--border)",
                backgroundColor: "var(--bg-card)",
                color: "var(--text-primary)",
              }}
            >
              <span>{t("projects.repository")}</span>
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </motion.a>
          )}
          {demoUrl && (
            <motion.a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium text-white transition-all focus:outline-none focus:ring-2 focus:ring-white/30 shadow-lg"
              style={{
                background: "linear-gradient(135deg, #7c3aed 0%, #a78bfa 50%, #c4b5fd 100%)",
                boxShadow: "0 0 0 1px rgba(255,255,255,0.1), 0 4px 14px rgba(124, 58, 237, 0.35)",
              }}
            >
              <span>{t("projects.demo")}</span>
              <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path d="M8 5v14l11-7z" />
              </svg>
            </motion.a>
          )}
        </div>
      </div>

      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-gradient-to-br from-[#a78bfa]/5 to-transparent" />
      {/* Cursor-tracked inner highlight — position driven by --mx/--my custom
          properties, updated from motion values (no per-frame setState). */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: "radial-gradient(circle at var(--mx) var(--my), rgba(167, 139, 250, 0.18), transparent 60%)",
        }}
        aria-hidden
      />
    </motion.article>
  );
}

function Projects() {
  const { language } = useLanguage();
  const t = (key) => getTranslation(language, key);
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <>
      <section
        id="projects"
        className="relative min-h-screen min-h-[100dvh] flex flex-col justify-center px-4 sm:px-6 py-16 sm:py-24 border-t border-theme-subtle overflow-hidden"
      >
        <Watermark text="SYSTEMS" className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="max-w-6xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="mb-8 sm:mb-12 md:mb-16"
          >
            <TitleReveal
              as="h2"
              text={t("projects.title")}
              className="font-display font-bold text-2xl sm:text-3xl md:text-4xl"
              style={{ color: "var(--text-primary)" }}
              withDivider
            />
            <p className="mt-2 text-theme-muted-2 text-sm sm:text-base max-w-xl">
              {t("projects.subtitle")}
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 items-stretch"
          >
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                t={t}
                language={language}
                onSelect={setSelectedProject}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
            t={t}
            language={language}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default Projects;
