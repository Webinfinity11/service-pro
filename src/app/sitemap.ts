import type { MetadataRoute } from "next";
import { localize, locales } from "@/lib/i18n";
import { nav } from "@/lib/site";
import { productCatalog } from "@/lib/products";
import { serviceCatalog } from "@/lib/services";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://service-pro.ge";

const url = (path: string) => `${BASE}${path === "/" ? "" : path}`;

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    ...nav.map((item) => ({ path: item.href, priority: item.href === "/" ? 1 : 0.7 })),
    ...[productCatalog, serviceCatalog].flatMap((c) =>
      [...c.top, ...c.sub].map((p) => ({ path: c.href(p), priority: p.parent ? 0.5 : 0.6 }))
    ),
  ];

  // Every page in both languages, each entry pointing at its counterpart.
  return pages.flatMap(({ path, priority }) =>
    locales.map((lang) => ({
      url: url(localize(lang, path)),
      lastModified: new Date(),
      changeFrequency: path === "/" ? ("weekly" as const) : ("monthly" as const),
      priority,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, url(localize(l, path))])),
      },
    }))
  );
}
