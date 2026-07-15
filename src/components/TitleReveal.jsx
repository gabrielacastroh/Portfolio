import { createElement, Fragment } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "../lib/motion";

const WORD_DURATION = 0.5;
const WORD_STAGGER = 0.08;

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: WORD_STAGGER } },
};

const wordVariants = {
  hidden: { opacity: 0.1, y: 12, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: WORD_DURATION, ease: EASE },
  },
};

/**
 * Divider line under a section title: fills left-to-right (scaleX) in the
 * accent color once, as the header enters the viewport. A single framer-motion
 * transition owns the whole effect — no scroll scrub and no second animation
 * system writing to the same element, which is what caused flicker before.
 * Reduced motion: renders the final filled state, no animation.
 */
function DividerLine({ className, delay, reduced }) {
  if (reduced) {
    return (
      <div
        className={`h-px w-16 mt-4 ${className}`}
        style={{ backgroundColor: "var(--accent)" }}
        aria-hidden
      />
    );
  }

  return (
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: EASE, delay }}
      className={`h-px w-16 mt-4 origin-left ${className}`}
      style={{ backgroundColor: "var(--accent)" }}
      aria-hidden
    />
  );
}

/**
 * Section-title word reveal: splits `text` into words and reveals them on
 * scroll with a subtle blur + rise stagger. Renders as `as` (default "h2")
 * so callers keep their exact heading tag/classes — typography untouched,
 * motion only. Optionally draws a divider line under the title once the
 * words finish revealing.
 */
function TitleReveal({ as: tag = "h2", text, className, style, withDivider = false, dividerClassName = "" }) {
  const prefersReducedMotion = useReducedMotion();
  const words = text.split(" ");
  const dividerDelay = words.length * WORD_STAGGER + WORD_DURATION * 0.4;

  if (prefersReducedMotion) {
    return (
      <>
        {createElement(tag, { className, style }, text)}
        {withDivider && <DividerLine className={dividerClassName} reduced />}
      </>
    );
  }

  const MotionTag = motion[tag] || motion.h2;

  return (
    <>
      <MotionTag
        className={className}
        style={style}
        aria-label={text}
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
      >
        {words.map((w, i) => (
          <Fragment key={`${w}-${i}`}>
            <motion.span
              aria-hidden
              variants={wordVariants}
              style={{ display: "inline-block" }}
            >
              {w}
            </motion.span>
            {i < words.length - 1 ? " " : ""}
          </Fragment>
        ))}
      </MotionTag>
      {withDivider && <DividerLine className={dividerClassName} delay={dividerDelay} />}
    </>
  );
}

export default TitleReveal;
