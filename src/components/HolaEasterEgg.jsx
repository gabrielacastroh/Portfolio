import { useEffect, useRef, useState } from "react";
// eslint-disable-next-line no-unused-vars -- `motion` is used via JSX (<motion.div>); this ESLint config lacks eslint-plugin-react's jsx-uses-vars, same as every other file in this codebase that uses framer-motion.
import { AnimatePresence, motion } from "framer-motion";
import { easterEgg } from "../data/mockData";
import { getTranslation } from "../data/translations";
import { useLanguage } from "../contexts/LanguageContext";

const TRIGGER = "hola";
const AUTO_DISMISS_MS = 8000;

/**
 * Global "type hola" easter egg. Listens for keystrokes outside form fields
 * and shows a small dismissible personal note when the buffer ends with
 * "hola". Auto-dismisses after ~8s, or on click.
 */
function HolaEasterEgg() {
  const { language } = useLanguage();
  const t = (key) => getTranslation(language, key);
  const isEn = language === "en";
  const message = isEn && easterEgg.messageEn ? easterEgg.messageEn : easterEgg.message;

  const [visible, setVisible] = useState(false);
  const bufferRef = useRef("");
  const dismissTimerRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const target = e.target;
      const isFormField =
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable);
      if (isFormField) return;

      if (e.key.length === 1) {
        bufferRef.current = (bufferRef.current + e.key).slice(-TRIGGER.length).toLowerCase();
        if (bufferRef.current === TRIGGER) {
          bufferRef.current = "";
          setVisible(true);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (!visible) return undefined;
    dismissTimerRef.current = window.setTimeout(() => setVisible(false), AUTO_DISMISS_MS);

    // No Escape handler: the project modal owns Escape-to-close; the toast
    // auto-dismisses and can be dismissed on click.
    return () => {
      window.clearTimeout(dismissTimerRef.current);
    };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="status"
          aria-live="polite"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          onClick={() => setVisible(false)}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[60] max-w-xs sm:max-w-sm p-4 rounded-xl border bg-theme-card backdrop-blur-sm cursor-pointer shadow-lg"
          style={{ borderColor: "var(--border)" }}
        >
          <p className="text-xs sm:text-sm leading-relaxed" style={{ color: "var(--text-primary)" }}>
            {message}
          </p>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setVisible(false);
            }}
            className="mt-2 text-xs font-medium hover:opacity-80 transition-opacity"
            style={{ color: "var(--accent)" }}
          >
            {t("easterEgg.dismiss")}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default HolaEasterEgg;
