/**
 * Locale routing. Georgian is the main site and keeps unprefixed URLs
 * (/about); English lives under /en (/en/about). `src/proxy.ts` rewrites
 * unprefixed requests onto the internal /ka segment.
 */

export const locales = ["ka", "en"] as const;
export type Lang = (typeof locales)[number];
export const defaultLang: Lang = "ka";

export const isLang = (s: string): s is Lang => (locales as readonly string[]).includes(s);

/** Site path for a language: ("en", "/about") → "/en/about", ("ka", "/about") → "/about". */
export function localize(lang: Lang, href: string): string {
  if (lang === defaultLang || !href.startsWith("/")) return href;
  return href === "/" ? `/${lang}` : `/${lang}${href}`;
}

/** Path without any locale prefix. Strips the internal /ka too, so the server
 *  render (which sees /ka/about) and the browser (/about) agree. */
export function stripLang(path: string): string {
  const m = path.match(/^\/(ka|en)(?=\/|$)/);
  if (!m) return path;
  return path.slice(m[0].length) || "/";
}
