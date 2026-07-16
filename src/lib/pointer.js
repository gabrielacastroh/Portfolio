import { useEffect } from "react";
import { motionValue } from "framer-motion";

/**
 * Shared pointer singleton: ONE global `pointermove` listener backing every
 * cursor-driven effect (CursorGlow, OrbitalText parallax, etc). Consumers
 * subscribe via `usePointer()` so the listener attaches lazily on first use
 * and detaches once nothing needs it — never per-component listeners.
 *
 * Values are plain framer-motion MotionValues (not React state), so updates
 * never trigger a React re-render / setState-per-frame.
 */
let store = null;

function createStore() {
  const hasWindow = typeof window !== "undefined";
  const x = motionValue(hasWindow ? window.innerWidth / 2 : 0);
  const y = motionValue(hasWindow ? window.innerHeight / 2 : 0);
  let attached = false;
  let subscribers = 0;

  const handlePointerMove = (e) => {
    x.set(e.clientX);
    y.set(e.clientY);
  };

  const attach = () => {
    if (attached || !hasWindow) return;
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    attached = true;
  };

  const detach = () => {
    if (!attached || !hasWindow) return;
    window.removeEventListener("pointermove", handlePointerMove);
    attached = false;
  };

  return {
    x,
    y,
    subscribe() {
      subscribers += 1;
      attach();
      return () => {
        subscribers = Math.max(0, subscribers - 1);
        if (subscribers === 0) detach();
      };
    },
  };
}

export function getPointer() {
  if (!store) store = createStore();
  return store;
}

let fineHover = null;

/**
 * Whether this device has a fine, hovering pointer (mouse/trackpad).
 *
 * Resolved once and cached: matchMedia() parses the query and allocates a new
 * MediaQueryList on every call, and the callers are mousemove handlers running
 * at pointer-sample rate. This is a device capability — it cannot change
 * between two samples of the same gesture, so paying for it per event is pure
 * GC pressure on the hottest path in the app.
 */
export function hasFinePointer() {
  if (fineHover === null) {
    fineHover =
      typeof window !== "undefined" &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  }
  return fineHover;
}

/** React hook: returns the shared { x, y } pointer motion values and manages subscription lifecycle. */
export function usePointer() {
  const pointer = getPointer();

  useEffect(() => {
    const unsubscribe = pointer.subscribe();
    return unsubscribe;
  }, [pointer]);

  return pointer;
}
