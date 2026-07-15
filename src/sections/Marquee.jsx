import FastMarquee from "react-fast-marquee";
import { useReducedMotion } from "framer-motion";
import { marquee } from "../data/mockData";
import { useLanguage } from "../contexts/LanguageContext";

const SEPARATOR = "·";

/** Edge fade so the marquee band reads as fading into the section background
 * in both themes, instead of a hard-coded gradient color. */
const fadeMaskStyle = {
  WebkitMaskImage:
    "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
  maskImage:
    "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
};

function MarqueeRow({ words, direction, speed, textClassName }) {
  const prefersReducedMotion = useReducedMotion();

  // Short rows (e.g. row two's 4 phrases) render narrower than the viewport,
  // leaving a visible gap before react-fast-marquee loops. Duplicate the
  // words enough times so the row always overflows and loops seamlessly.
  const loopWords = words.length < 6 ? [...words, ...words, ...words] : words;

  return (
    <div className="relative" style={fadeMaskStyle}>
      <FastMarquee
        direction={direction}
        speed={speed}
        pauseOnHover
        gradient={false}
        play={!prefersReducedMotion}
      >
        {loopWords.map((word, i) => (
          <span key={`${word}-${i}`} className={textClassName}>
            {word}
            <span className="mx-6 sm:mx-8 opacity-40" aria-hidden>
              {SEPARATOR}
            </span>
          </span>
        ))}
      </FastMarquee>
    </div>
  );
}

function Marquee() {
  const { language } = useLanguage();
  const isEn = language === "en";
  const rowOne = isEn && marquee.rowOneEn ? marquee.rowOneEn : marquee.rowOne;
  const rowTwo = isEn && marquee.rowTwoEn ? marquee.rowTwoEn : marquee.rowTwo;

  const textClassBase =
    "font-display uppercase tracking-wide whitespace-nowrap text-theme-muted";

  return (
    <section
      aria-hidden
      className="relative overflow-hidden py-16 sm:py-20 border-t border-theme-subtle flex flex-col gap-4 sm:gap-5"
    >
      <MarqueeRow
        words={rowOne}
        direction="left"
        speed={26}
        textClassName={`${textClassBase} text-xl sm:text-2xl md:text-3xl font-semibold`}
      />
      <MarqueeRow
        words={rowTwo}
        direction="right"
        speed={22}
        textClassName={`${textClassBase} text-base sm:text-lg md:text-xl font-medium opacity-70`}
      />
    </section>
  );
}

export default Marquee;
