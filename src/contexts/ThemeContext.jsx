import { createContext, useContext, useState, useEffect } from "react";

const STORAGE_KEY = "portfolio-theme";

const ThemeContext = createContext({
  theme: "dark",
  setTheme: () => {},
});

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    if (typeof window === "undefined") return "dark";
    return (window.localStorage.getItem(STORAGE_KEY) || "dark");
  });

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const setTheme = (value) => {
    if (value === "dark" || value === "light") setThemeState(value);
  };

  const applyToggle = () => setThemeState((t) => (t === "dark" ? "light" : "dark"));

  /**
   * Toggles the theme. When the browser supports the View Transitions API and
   * the user hasn't requested reduced motion, the switch is wrapped so
   * ::view-transition-new(root) can play a circular reveal from the origin
   * point (typically the toggle button). `originEvent` is an optional click
   * event used to compute that origin; falls back to viewport center.
   */
  const toggleTheme = (originEvent) => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (typeof document === "undefined" || !document.startViewTransition || prefersReducedMotion) {
      applyToggle();
      return;
    }

    const x = originEvent?.clientX ?? window.innerWidth / 2;
    const y = originEvent?.clientY ?? window.innerHeight / 2;
    document.documentElement.style.setProperty("--vt-x", `${x}px`);
    document.documentElement.style.setProperty("--vt-y", `${y}px`);

    document.startViewTransition(() => {
      applyToggle();
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
