import { useState } from "react";
import FastMarquee from "react-fast-marquee";
import { useReducedMotion } from "framer-motion";
import { techMarquee } from "../data/mockData";
import { resolveSkillIconSrc, getFallbackIconUrl, isFixedColorSource } from "../lib/skillIcons";
import { useTheme } from "../contexts/useTheme";

/** Theme-aware monochrome hex for the marquee logos — noticeably whiter on
 * dark so they read against the dark bg, dimmer gray on light so they don't
 * overpower the page. */
const MONOCHROME_HEX_BY_THEME = {
  dark: "E5E7EB",
  light: "6B7280",
};

/** Same edge-fade mask used by the text Marquee band, reused here so both
 * bands read as one visual family. */
const fadeMaskStyle = {
  WebkitMaskImage:
    "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
  maskImage:
    "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
};

/** Simple Icons has no official DRF logo — these slugs render as a small
 * uppercase text pill instead of an <img>, matching the row's muted style.
 * Any item missing a slug falls into the same text-pill path generically. */
const NO_ICON_SLUGS = new Set(["drf"]);

function TechLogo({ item, monochromeHex }) {
  const hasIcon = Boolean(item.slug) && !NO_ICON_SLUGS.has(item.slug);
  const [loaded, setLoaded] = useState(false);
  // A miss is a property of the slug, not of the hex: overrides are fixed
  // assets and the simpleicons.org URLs differ only in the color segment, so a
  // slug that 404s in one theme 404s in the other. Sticking to the fallback
  // across theme changes avoids re-requesting a URL we know is dead.
  const [erroredOnce, setErroredOnce] = useState(false);
  // Derived, not state: freezing this in a useState initializer meant the only
  // way to pick up a new hex was remounting every logo on theme toggle, which
  // put ~72 unmounts + 72 cold CDN requests inside the 500ms View Transition.
  const src = !hasIcon
    ? null
    : erroredOnce
      ? getFallbackIconUrl()
      : resolveSkillIconSrc(item.slug, { monochrome: true, monochromeHex });
  // Fixed-asset overrides (e.g. AWS) ignore monochromeHex — their SVG has no
  // `fill`, which browsers default to black, invisible on the dark theme.
  // invert(1) maps that black to white, then brightness tunes it toward the
  // theme's target gray. ponytail: filter approximation, not pixel-exact —
  // swap for a CSS mask-image recolor if an exact hex match is ever needed.
  const needsColorFilter = hasIcon && !erroredOnce && isFixedColorSource(item.slug);
  const colorFilter = needsColorFilter
    ? monochromeHex === MONOCHROME_HEX_BY_THEME.dark
      ? "invert(1) brightness(0.9)"
      : "invert(1) brightness(0.42)"
    : undefined;

  if (!hasIcon) {
    return (
      <span
        className="mx-6 sm:mx-8 inline-flex items-center justify-center h-7 px-2.5 rounded-md border text-[0.7rem] font-bold uppercase tracking-wide shrink-0 opacity-60"
        style={{ borderColor: "var(--border)", color: monochromeHex ? `#${monochromeHex}` : "var(--text-muted)" }}
        title={item.name}
      >
        {item.name}
      </span>
    );
  }

  return (
    <span className="mx-6 sm:mx-8 inline-flex items-center justify-center shrink-0" title={item.name}>
      <img
        src={src}
        alt=""
        loading="lazy"
        width={32}
        height={32}
        className="h-7 w-7 sm:h-8 sm:w-8 object-contain opacity-60 transition-opacity duration-300 ease-out"
        // `loaded` deliberately never resets when the theme swaps the src. The
        // element now persists across themes, so the browser keeps painting the
        // previous frame until the (already cached) recolored icon decodes —
        // there is no blank gap to fade over, and forcing one back to 0 would
        // flash every logo out mid View Transition. Only the genuinely blank
        // states — first load and the fallback swap — need the fade.
        style={{ opacity: loaded ? 0.6 : 0, filter: colorFilter }}
        onLoad={() => setLoaded(true)}
        onError={() => {
          if (erroredOnce) return;
          setErroredOnce(true);
          setLoaded(false);
        }}
      />
    </span>
  );
}

/** Decorative single-row band of tech logos, monochrome/muted so it reads as
 * one elegant strip rather than a multicolor badge wall. Purely visual —
 * aria-hidden, doesn't duplicate any information conveyed elsewhere. */
function TechMarquee() {
  const prefersReducedMotion = useReducedMotion();
  const { theme } = useTheme();
  const monochromeHex = MONOCHROME_HEX_BY_THEME[theme] ?? MONOCHROME_HEX_BY_THEME.dark;

  // Repeat the set so the row always overflows the viewport on wide screens —
  // otherwise react-fast-marquee leaves a large gap before the content repeats.
  const items =
    techMarquee.length < 16
      ? [...techMarquee, ...techMarquee, ...techMarquee]
      : techMarquee;

  return (
    <section
      aria-hidden
      className="relative overflow-hidden py-10 sm:py-12 border-t border-theme-subtle"
    >
      <div className="relative" style={fadeMaskStyle}>
        <FastMarquee
          direction="left"
          speed={24}
          pauseOnHover
          gradient={false}
          play={!prefersReducedMotion}
        >
          {items.map((item, i) => (
            <TechLogo
              // Identity must not depend on the theme: TechLogo derives its src
              // from monochromeHex, so a plain re-render picks up the new color.
              // Keying on theme instead remounted all 72 instances (12 items,
              // tripled, then doubled internally by react-fast-marquee) and
              // retriggered its width measurement mid theme transition.
              key={`${item.slug || item.name}-${i}`}
              item={item}
              monochromeHex={monochromeHex}
            />
          ))}
        </FastMarquee>
      </div>
    </section>
  );
}

export default TechMarquee;
