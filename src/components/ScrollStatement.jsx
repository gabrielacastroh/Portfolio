import { useRef } from "react";
// eslint-disable-next-line no-unused-vars -- `motion` is used via JSX (<motion.span>); this ESLint config lacks eslint-plugin-react's jsx-uses-vars, same as every other file in this codebase that uses framer-motion.
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

/**
 * Signature scroll-storytelling moment: a statement line whose words paint
 * from muted to full color as the user scrolls through the section (Apple /
 * Stripe style). Driven entirely by scroll progress via motion values — no
 * per-frame setState. Reduced motion: full color immediately, no scroll tie.
 */
function Word({ word, index, total, scrollYProgress, isLast }) {
  // Each word owns an overlapping slice of the section's scroll progress so
  // the paint reads as a smooth wave rather than hard on/off steps.
  const slice = 1 / total;
  const start = index * slice * 0.7;
  const end = start + slice * 1.6;
  const color = useTransform(
    scrollYProgress,
    [Math.max(0, start), Math.min(1, end)],
    ["var(--text-muted)", "var(--text-primary)"]
  );

  return (
    <motion.span aria-hidden style={{ color }}>
      {word}
      {!isLast ? " " : ""}
    </motion.span>
  );
}

function ScrollStatement({ text, className, style }) {
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "start 0.25"],
  });

  const words = text.split(" ");

  if (prefersReducedMotion) {
    return (
      <p ref={ref} className={className} style={{ ...style, color: "var(--text-primary)" }}>
        {text}
      </p>
    );
  }

  return (
    <p ref={ref} className={className} style={style} aria-label={text}>
      {words.map((w, i) => (
        <Word
          key={`${w}-${i}`}
          word={w}
          index={i}
          total={words.length}
          isLast={i === words.length - 1}
          scrollYProgress={scrollYProgress}
        />
      ))}
    </p>
  );
}

export default ScrollStatement;
