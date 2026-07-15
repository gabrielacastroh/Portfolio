import { useRef } from "react";
// eslint-disable-next-line no-unused-vars -- `motion` is used via JSX (<motion.div>); this ESLint config lacks eslint-plugin-react's jsx-uses-vars, same as every other file in this codebase that uses framer-motion.
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

const MAX_OFFSET = 8;
const SPRING = { stiffness: 200, damping: 15, mass: 0.3 };

/**
 * Wraps a single child (typically a CTA button/link) with a subtle magnetic
 * pull toward the cursor. Only active on pointer-fine devices; disabled
 * entirely under prefers-reduced-motion.
 */
function Magnetic({ children, className }) {
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, SPRING);
  const springY = useSpring(y, SPRING);

  if (prefersReducedMotion) {
    return children;
  }

  const handleMouseMove = (e) => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(Math.max(Math.min(relX * 0.35, MAX_OFFSET), -MAX_OFFSET));
    y.set(Math.max(Math.min(relY * 0.35, MAX_OFFSET), -MAX_OFFSET));
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY, display: "inline-flex" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default Magnetic;
