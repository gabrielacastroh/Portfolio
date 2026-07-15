/**
 * Shared motion language for the whole site — ONE easing curve, ONE set of
 * durations, ONE stagger/reveal vocabulary. Sections import from here
 * instead of redefining local variants so every scroll reveal, hover and
 * transition feels like the same hand designed it.
 */

/** Signature ease — calm deceleration, no bounce. Used across every reveal. */
export const EASE = [0.22, 1, 0.36, 1];

export const DURATION_SHORT = 0.6;
export const DURATION_LONG = 0.8;

/** Fade + rise reveal for section blocks and cards. Cap the travel at 24px — small, premium, never bouncy. */
export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: DURATION_SHORT, ease: EASE } },
};

/** Plain opacity fade, no translation — for elements where movement would be too much. */
export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: DURATION_SHORT, ease: EASE } },
};

/** A line/divider that draws in from the left, origin-left required on the element. */
export const scaleXReveal = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: DURATION_SHORT, ease: EASE } },
};

/**
 * Stagger container factory — most sections use the 0.1 / 0.2 defaults;
 * pass overrides for sections that intentionally move faster/slower.
 */
export function staggerContainer({ stagger = 0.1, delayChildren = 0.2 } = {}) {
  return {
    hidden: {},
    show: {
      transition: { staggerChildren: stagger, delayChildren },
    },
  };
}
