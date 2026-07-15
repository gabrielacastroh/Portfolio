import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

/**
 * Single scroll authority for the whole site.
 *
 * Lenis owns scroll position; ScrollTrigger reads it through the canonical
 * bridge (gsap.ticker drives Lenis' raf, Lenis' "scroll" event drives
 * ScrollTrigger.update). Nothing else should call window.scrollTo / set
 * scrollTop directly — anchor nav goes through `getLenis()?.scrollTo(...)`
 * with a native `scrollIntoView` fallback when Lenis isn't active.
 *
 * Under prefers-reduced-motion, Lenis is never instantiated: native browser
 * scroll takes over and any scrub-linked ScrollTrigger effects should be
 * authored to render their final static state instead of scrubbing.
 */
let lenisInstance = null;

export function getLenis() {
  return lenisInstance;
}

export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

gsap.registerPlugin(ScrollTrigger);

/**
 * Mount once, high in the tree (App.jsx). Sets up / tears down the Lenis +
 * ScrollTrigger bridge for the lifetime of the app.
 */
export function useSmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) {
      // Native scroll only — no Lenis instance, no ticker hookup. Existing
      // scrub ScrollTriggers still register elsewhere but should be authored
      // to snap to their final state under reduced motion.
      return undefined;
    }

    const lenis = new Lenis({
      autoRaf: false,
      smoothWheel: true,
      lerp: 0.08,
    });
    lenisInstance = lenis;

    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);

    const tickerFn = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerFn);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerFn);
      lenis.off("scroll", onScroll);
      lenis.destroy();
      lenisInstance = null;
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);
}

/**
 * Smooth-scrolls to a section by id/selector, routing through Lenis when
 * it's active and falling back to native scrollIntoView otherwise (also the
 * reduced-motion path). Use this from every anchor-nav click handler instead
 * of calling scrollIntoView / window.scrollTo directly.
 */
export function scrollToSection(target, options = {}) {
  const { offset = 0, duration = 1.2 } = options;
  const el = typeof target === "string" ? document.querySelector(target) : target;
  if (!el) return;

  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(el, { offset, duration });
    return;
  }

  el.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" });
}

/** Thin wrapper component so App.jsx can mount the hook declaratively. */
function SmoothScrollProvider({ children }) {
  useSmoothScroll();
  return children ?? null;
}

export default SmoothScrollProvider;
