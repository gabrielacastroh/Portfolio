import { useState } from "react";
import FastMarquee from "react-fast-marquee";
import { useReducedMotion } from "framer-motion";
import { techMarquee } from "../data/mockData";
import { resolveSkillIconSrc, getFallbackIconUrl } from "../lib/skillIcons";
import { useTheme } from "../contexts/ThemeContext";

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
  const [src, setSrc] = useState(() =>
    hasIcon ? resolveSkillIconSrc(item.slug, { monochrome: true, monochromeHex }) : null
  );
  const [loaded, setLoaded] = useState(false);
  const [erroredOnce, setErroredOnce] = useState(false);

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
        style={{ opacity: loaded ? 0.6 : 0 }}
        onLoad={() => setLoaded(true)}
        onError={() => {
          if (erroredOnce) return;
          setErroredOnce(true);
          setLoaded(false);
          setSrc(getFallbackIconUrl());
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
              // Remount on theme change so the src recomputes and the
              // per-image onLoad fade replays cleanly with the new hex.
              key={`${item.slug || item.name}-${i}-${theme}`}
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
