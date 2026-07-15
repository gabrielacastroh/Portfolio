import { skillCategories, projects } from "../data/mockData";
import { resolveSkillIconSrc } from "./skillIcons";

/**
 * Kick off downloads for the remote imagery used by the lower sections (skill
 * icons and project screenshots) as soon as the app mounts, so they are cached
 * well before the user scrolls down to Skills / Projects.
 *
 * Without this, skill icons load lazily on arrival and appear in an uneven wave
 * AFTER the section's reveal animation has already run — reading as a flicker /
 * "second paint". Fire-and-forget: the browser HTTP cache does the rest, and
 * the real <img> tags then resolve instantly from cache.
 */
export function preloadRemoteAssets() {
  if (typeof window === "undefined") return;

  const urls = new Set();

  for (const category of skillCategories) {
    for (const skill of category.skills) {
      urls.add(resolveSkillIconSrc(skill.icon || "codepen"));
    }
  }

  for (const project of projects) {
    if (project.image) urls.add(project.image);
  }

  for (const url of urls) {
    const img = new Image();
    img.decoding = "async";
    img.src = url;
  }
}
