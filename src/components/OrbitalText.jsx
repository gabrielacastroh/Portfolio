import { useEffect, useId, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { hasFinePointer, usePointer } from "../lib/pointer";

const ROTATION_SECONDS = 40;
const PARALLAX_MAX = 10;
const PARALLAX_SPRING = { stiffness: 60, damping: 20, mass: 0.5 };

/**
 * Decorative SVG circular text ring, slowly rotating via CSS animation.
 * Pauses on hover, drifts a few px toward the cursor using the shared
 * pointer singleton (motion values only — no per-frame setState). Hidden
 * below `lg` so it never crowds mobile layouts. Reduced motion: static ring.
 */
function OrbitalText({ text, size = 220, direction = 1, className = "", textColor }) {
  const rawId = useId();
  const pathId = `orbital-path-${rawId.replace(/[^a-zA-Z0-9-]/g, "")}`;
  const wrapperRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const pointer = usePointer();

  const localX = useMotionValue(0);
  const localY = useMotionValue(0);
  const springX = useSpring(localX, PARALLAX_SPRING);
  const springY = useSpring(localY, PARALLAX_SPRING);

  useEffect(() => {
    if (prefersReducedMotion || !hasFinePointer()) return undefined;

    const updateFromPointer = () => {
      const el = wrapperRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const offsetX = ((pointer.x.get() - cx) / (window.innerWidth / 2)) * PARALLAX_MAX;
      const offsetY = ((pointer.y.get() - cy) / (window.innerHeight / 2)) * PARALLAX_MAX;
      localX.set(Math.max(Math.min(offsetX, PARALLAX_MAX), -PARALLAX_MAX));
      localY.set(Math.max(Math.min(offsetY, PARALLAX_MAX), -PARALLAX_MAX));
    };

    // Subscribe to `y` ONLY. pointer.js sets x then y per pointermove and
    // MotionValue.set() notifies subscribers synchronously, so by the time y
    // fires both values already hold the current sample — one complete,
    // deduplicated read per event. Subscribing to both would run this handler
    // twice with identical input, doubling the getBoundingClientRect() above
    // (a forced layout) for no gain.
    return pointer.y.on("change", updateFromPointer);
  }, [pointer, prefersReducedMotion, localX, localY]);

  const radius = size / 2 - 14;
  const cx = size / 2;
  const cy = size / 2;
  const d = `M ${cx - radius} ${cy} A ${radius} ${radius} 0 1 1 ${cx + radius} ${cy} A ${radius} ${radius} 0 1 1 ${cx - radius} ${cy}`;

  return (
    <div
      ref={wrapperRef}
      className={`hidden lg:block pointer-events-none select-none ${className}`}
      style={{ width: size, height: size }}
      aria-hidden
    >
      <motion.div style={{ x: prefersReducedMotion ? 0 : springX, y: prefersReducedMotion ? 0 : springY }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className={prefersReducedMotion ? "" : "orbital-spin"}
          style={{
            animationDuration: `${ROTATION_SECONDS}s`,
            animationDirection: direction > 0 ? "normal" : "reverse",
            animationPlayState: paused ? "paused" : "running",
          }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <defs>
            <path id={pathId} d={d} fill="none" />
          </defs>
          <text
            fontSize="9.5"
            letterSpacing="2.5"
            fontWeight="600"
            fill={textColor || "var(--text-muted)"}
            style={{ pointerEvents: "visiblePainted", textTransform: "uppercase" }}
          >
            <textPath href={`#${pathId}`} startOffset="0%">
              {text}
            </textPath>
          </text>
        </svg>
      </motion.div>
    </div>
  );
}

export default OrbitalText;
