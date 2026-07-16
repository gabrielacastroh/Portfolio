import { motion, useReducedMotion } from "framer-motion";

/**
 * Minimal decorative geometric shape (thin ring or line) that floats very
 * slowly in an empty area of the layout. Purely ambient — aria-hidden,
 * pointer-events-none, transform-only animation. Reduced motion: renders
 * static (no float loop).
 */
function FloatingShape({ variant = "ring", size = 160, className = "" }) {
  const prefersReducedMotion = useReducedMotion();

  const float = prefersReducedMotion
    ? {}
    : {
        animate: { y: [0, -14, 0], rotate: variant === "ring" ? [0, 6, 0] : [0, -3, 0] },
        transition: { duration: 14, repeat: Infinity, ease: "easeInOut" },
      };

  return (
    <motion.div
      aria-hidden
      className={`pointer-events-none select-none ${className}`}
      style={{ width: size, height: size }}
      {...float}
    >
      {variant === "ring" ? (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
          <circle
            cx="50"
            cy="50"
            r="46"
            stroke="var(--border)"
            strokeWidth="1"
            opacity="0.5"
          />
        </svg>
      ) : (
        <svg width={size} height={size} viewBox="0 0 160 40" fill="none">
          <line x1="0" y1="20" x2="160" y2="20" stroke="var(--border)" strokeWidth="1" opacity="0.5" />
        </svg>
      )}
    </motion.div>
  );
}

export default FloatingShape;
