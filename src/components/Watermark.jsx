import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "../lib/smoothScroll";

/**
 * Giant decorative background word, parallaxed via ScrollTrigger scrub as
 * its parent section passes through the viewport. Purely visual: absolute,
 * behind content (negative z-index), pointer-events-none, aria-hidden, very
 * low opacity so it never competes with real text. The parent section must
 * have `overflow-hidden` so the oversized glyphs never cause horizontal
 * scroll. Reduced motion: renders static, no parallax.
 */
function Watermark({ text, className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return undefined;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { yPercent: -8 },
        {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: el.closest("section") || el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className={`absolute -z-10 pointer-events-none select-none font-display font-bold leading-none whitespace-nowrap ${className}`}
      style={{
        fontSize: "clamp(5rem, 13vw, 11rem)",
        color: "var(--text-primary)",
        opacity: "var(--watermark-opacity, 0.035)",
      }}
    >
      {text}
    </div>
  );
}

export default Watermark;
