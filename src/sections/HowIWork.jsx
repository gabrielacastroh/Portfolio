import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { howIWork } from "../data/mockData";
import { getTranslation } from "../data/translations";
import { useLanguage } from "../contexts/LanguageContext";
import TitleReveal from "../components/TitleReveal";
import { fadeUp, staggerContainer } from "../lib/motion";
import { prefersReducedMotion as prefersReducedMotionStatic } from "../lib/smoothScroll";

const container = staggerContainer({ stagger: 0.1, delayChildren: 0.15 });
const step = fadeUp;

const ACTIVE_COLOR = "var(--accent)";
const MUTED_COLOR = "var(--text-muted)";

/**
 * Step number: opacity is owned entirely by the parent motion.div's
 * framer-motion fadeUp entrance (see the render below) — GSAP never touches
 * it. On desktop, the section's master GSAP timeline (see HowIWork's ctx
 * below) only drives `color` via .to() calls positioned along the timeline,
 * for the progressive muted->accent "walk the path" activation. On mobile
 * (no connector, `sm:` and below) each step's color activates independently
 * via its own ScrollTrigger with toggleActions "play none none none" — plays
 * once and stays active, no reverse-pulse. Keeping opacity single-authority
 * (framer only) avoids the parent/child opacity multiplying against GSAP's
 * own, differently-timed animation — that produced a visible flicker during
 * continuous scroll when both were animating opacity independently.
 */
function HowIWorkStep({ entry, language, registerNumberRef }) {
  const isEn = language === "en";
  const title = isEn && entry.titleEn ? entry.titleEn : entry.title;
  const description = isEn && entry.descriptionEn ? entry.descriptionEn : entry.description;
  const reduced = prefersReducedMotionStatic();
  const numberRef = useRef(null);

  useEffect(() => {
    const el = numberRef.current;
    if (!el || reduced) return undefined;

    // Mobile-only fallback: simple one-shot activation, independent of the
    // desktop master timeline (which only targets the sm:block connector
    // layout's steps visually, but this per-step trigger works everywhere
    // and is superseded visually by the master timeline where it also runs).
    // Only touches `color` — opacity is owned entirely by the parent
    // motion.div's fadeUp entrance (see HowIWorkStep's render below). GSAP
    // used to also animate opacity here, which multiplied against the
    // parent's independent framer-motion opacity fade and produced a
    // flickery, unsynced brightness curve during continuous scroll.
    const mm = gsap.matchMedia();
    let ctx;
    mm.add("(max-width: 639px)", () => {
      ctx = gsap.context(() => {
        gsap.fromTo(
          el,
          { color: MUTED_COLOR },
          {
            color: ACTIVE_COLOR,
            duration: 0.4,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    });

    return () => {
      ctx?.revert();
      mm.revert();
    };
  }, [reduced]);

  return (
    <motion.div variants={step} className="relative flex flex-col gap-2 flex-1 min-w-0">
      <span
        ref={(el) => {
          numberRef.current = el;
          registerNumberRef(el);
        }}
        className="font-display font-bold text-2xl sm:text-3xl inline-block"
        style={{ color: reduced ? ACTIVE_COLOR : MUTED_COLOR }}
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
  const sectionRef = useRef(null);
  // howIWork has a fixed length, so these arrays never need clearing between
  // renders — each callback ref just writes/clears its own stable index.
  const numberRefs = useRef([]);
  const lineRefs = useRef([]);

  const registerNumberRef = (i) => (el) => {
    numberRefs.current[i] = el;
  };
  const setLineRef = (i) => (el) => {
    lineRefs.current[i] = el;
  };

  /**
   * Single master ScrollTrigger scrub across the whole section (desktop
   * only, matching the sm:block connector layout). Connector lines fill
   * progressively and each step's number/text transitions muted -> active
   * as scroll progress passes that step's position on the timeline — a
   * single continuous progression instead of independent per-step pulses.
   * Scrolling back up reverses the timeline exactly (scrub ties progress to
   * scroll position both ways). Reduced motion: skipped entirely, steps
   * render already active and lines already drawn via inline styles.
   */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotionStatic()) return undefined;

    const mm = gsap.matchMedia();
    let ctx;
    mm.add("(min-width: 640px)", () => {
      ctx = gsap.context(() => {
        const lines = lineRefs.current.filter(Boolean);
        const numbers = numberRefs.current.filter(Boolean);
        gsap.set(lines, { scaleX: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top center",
            end: "bottom center",
            scrub: 1,
          },
        });

        const count = numbers.length;
        numbers.forEach((el, i) => {
          const pos = count > 1 ? i / (count - 1) : 0;
          // Only `color` — opacity is owned by the parent motion.div's
          // fadeUp entrance. Animating opacity here too used to multiply
          // against that independent, differently-timed framer transition,
          // producing an unsynced flicker between the number and the
          // title/description right beside it during continuous scroll.
          tl.to(
            el,
            { color: ACTIVE_COLOR, duration: 0.15, ease: "none" },
            pos
          );
          const lineEl = lines[i];
          if (lineEl) {
            tl.to(lineEl, { scaleX: 1, duration: 0.2, ease: "none" }, pos);
          }
        });
      }, section);
    });

    return () => {
      ctx?.revert();
      mm.revert();
    };
  }, []);

  return (
    <section
      id="how-i-work"
      ref={sectionRef}
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
              <HowIWorkStep entry={entry} language={language} registerNumberRef={registerNumberRef(i)} />
              {i < howIWork.length - 1 && (
                <div
                  ref={setLineRef(i)}
                  className="hidden sm:block mt-3 h-px flex-1 origin-left"
                  style={{
                    background: "linear-gradient(to right, var(--border), transparent)",
                    transform: prefersReducedMotion ? "scaleX(1)" : undefined,
                  }}
                  aria-hidden
                />
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default HowIWork;
