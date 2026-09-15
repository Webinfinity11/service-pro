import type { Metadata } from "next";
import { getContent } from "./content";
import { localize } from "./i18n";

/** Page metadata with the canonical URL and its Georgian / English alternates. */
export async function pageMeta(
  path: string,
  title: string,
  description: string,
  extra: Metadata = {}
): Promise<Metadata> {
  const { lang } = await getContent();
  return {
    title,
    description,
    alternates: {
      canonical: localize(lang, path),
      languages: { ka: path, en: localize("en", path), "x-default": path },
    },
    ...extra,
  };
}
