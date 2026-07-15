/**
 * Shared Simple Icons resolution helpers — icon color map, CDN source
 * overrides, and URL builders. Used by both the Skills grid (brand-colored
 * icons) and the TechMarquee band (monochrome/muted icons).
 */

export const SKILL_COLORS = {
  react: "61DAFB",
  javascript: "F7DF1E",
  typescript: "3178C6",
  tailwindcss: "06B6D4",
  nextdotjs: "9CA3AF",
  mui: "007FFF",
  fastapi: "009688",
  django: "2BA977",
  flask: "AAAAAA",
  graphql: "E10098",
  swagger: "85EA2D",
  jsonwebtokens: "D63AFF",
  openid: "F78C40",
  zustand: "443C55",
  redux: "764ABC",
  reactquery: "FF4154",
  postgresql: "4169E1",
  microsoftsqlserver: "CC2927",
  docker: "2496ED",
  amazonaws: "FF9900",
  linux: "FCC624",
  git: "F05032",
  playwright: "2EAD33",
  axecore: "663399",
  openai: "9CA3AF",
  groq: "F55036",
  flutter: "02569B",
  dart: "0175C2",
  codepen: "9CA3AF",
};

/** Muted neutral gray used for monochrome icon rendering (e.g. TechMarquee). */
export const MONOCHROME_HEX = "9CA3AF";

/** Slugs fuera del CDN oficial de Simple Icons o sin icono allí → URL fija (Iconify / jsDelivr). */
export const ICON_SOURCE_OVERRIDES = {
  // CDN simpleicons.org sin estos assets → mismo paquete en jsDelivr.
  playwright: "https://cdn.jsdelivr.net/npm/simple-icons@11/icons/playwright.svg",
  microsoftsqlserver:
    "https://cdn.jsdelivr.net/npm/simple-icons@11/icons/microsoftsqlserver.svg",
  amazonaws: "https://cdn.jsdelivr.net/npm/simple-icons@11/icons/amazonaws.svg",
  openai: "https://cdn.jsdelivr.net/npm/simple-icons@11/icons/openai.svg",
  // Sin entrada en Simple Icons CDN (o 404 estable).
  zustand: "https://api.iconify.design/devicon-plain:zustand.svg",
  groq: "https://api.iconify.design/bxl:groq-ai.svg",
  axecore: "https://api.iconify.design/mdi:accessibility.svg",
};

/** URL de respaldo si la imagen falla al cargar. */
export function getFallbackIconUrl() {
  const hex = SKILL_COLORS.codepen;
  return `https://cdn.simpleicons.org/codepen/${hex}`;
}

/**
 * Resolves the icon URL for a slug. Overrides (jsDelivr/Iconify) ignore the
 * `monochrome` flag since they're fixed assets; simpleicons.org CDN sources
 * honor it by swapping in the neutral gray hex instead of the brand color.
 * `monochromeHex` lets callers (e.g. the theme-aware TechMarquee) override
 * the default muted gray with a theme-specific hex.
 */
export function resolveSkillIconSrc(slug, { monochrome = false, monochromeHex } = {}) {
  const override = ICON_SOURCE_OVERRIDES[slug];
  if (override) return override;
  const hex = monochrome ? (monochromeHex ?? MONOCHROME_HEX) : (SKILL_COLORS[slug] ?? "6B7280");
  return `https://cdn.simpleicons.org/${slug}/${hex}`;
}
