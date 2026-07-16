import { useState, useEffect } from "react";
import { LanguageContext } from "./languageContextValue";

const STORAGE_KEY = "portfolio-lang";

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    if (typeof window === "undefined") return "es";
    return window.localStorage.getItem(STORAGE_KEY) || "es";
  });

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, language);
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang) => {
    if (lang === "es" || lang === "en") setLanguageState(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}
