export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Resolves a root-relative `public/` path (e.g. "/movies/movie-1.webp",
 * as written in src/data/invitation.ts) against Vite's configured base
 * path. Runtime `<img src="/...">` references don't get base-prefixed
 * the way index.html and imported assets do, so on GitHub Pages — served
 * from a `/<repo>/` subpath — an unresolved path would 404.
 */
export function resolveAsset(path: string): string {
  const base = import.meta.env.BASE_URL;
  return path.startsWith("/") ? `${base}${path.slice(1)}` : `${base}${path}`;
}
