import { lang as rootLang } from "next/root-params";
import { makeCatalog, type Catalog, type CatalogText, type Item, type ItemText } from "./catalog";
import { dicts } from "./dict";
import { defaultLang, isLang, localize, type Lang } from "./i18n";
import * as site from "./site";
import { productCatalog, products, subProducts } from "./products";
import { highlightProjects, ongoingProjects, projects } from "./projects";
import { serviceCatalog, services, subServices } from "./services";
import * as siteEn from "./en/site";
import { productCatalogEn, productsEn } from "./en/products";
import { highlightProjectsEn, ongoingProjectsEn, projectsEn } from "./en/projects";
import { serviceCatalogEn, servicesEn } from "./en/services";

/** Georgian items with English text laid over them; photos and slugs stay shared. */
function translate(items: Item[], text: Record<string, ItemText>): Item[] {
  return items.map((it) => {
    const tr = text[it.slug];
    if (!tr) return it;
    return {
      ...it,
      t: tr.t,
      d: tr.d,
      intro: tr.intro ?? it.intro,
      gallery: it.gallery.map((g) =>
        g.caption && tr.captions?.[g.src] ? { ...g, caption: tr.captions[g.src] } : g
      ),
    };
  });
}

function catalogFor(
  base: Catalog,
  top: Item[],
  sub: Item[],
  lang: Lang,
  text?: CatalogText,
  items?: Record<string, ItemText>
): Catalog {
  const t = text ?? base;
  return makeCatalog({
    base: localize(lang, base.base),
    label: t.label,
    noun: t.noun,
    features: t.features,
    copy: t.copy,
    top: items ? translate(top, items) : top,
    sub: items ? translate(sub, items) : sub,
  });
}

function build(lang: Lang) {
  const en = lang === "en";
  const L = (href: string) => localize(lang, href);

  return {
    lang,
    t: dicts[lang],
    /** Localised link for a site path. */
    L,
    contact: en ? { ...site.contact, ...siteEn.contactEn } : site.contact,
    nav: site.nav.map((n) => ({
      href: L(n.href),
      label: en ? siteEn.navEn[n.href] ?? n.label : n.label,
    })),
    hero: en
      ? {
          ...site.hero,
          title: siteEn.heroEn.title,
          description: siteEn.heroEn.description,
          primary: { href: L(site.hero.primary.href), label: siteEn.heroEn.primary },
          secondary: { href: L(site.hero.secondary.href), label: siteEn.heroEn.secondary },
        }
      : site.hero,
    heroStats: site.heroStats.map((s, i) => ({
      ...s,
      label: en ? siteEn.heroStatLabelsEn[i] : s.label,
    })),
    homeServices: site.homeServices.map((s, i) =>
      en ? { ...s, ...siteEn.homeServicesEn[i] } : s
    ),
    stats: site.stats.map((s, i) => ({ ...s, k: en ? siteEn.statLabelsEn[i] : s.k })),
    galleryGroups: site.galleryGroups.map((g, i) => ({
      ...g,
      label: en ? siteEn.galleryGroupLabelsEn[i] : g.label,
    })),
    aboutParagraphs: en ? siteEn.aboutParagraphsEn : site.aboutParagraphs,
    tagline: en ? siteEn.taglineEn : site.tagline,
    safety: en ? siteEn.safetyEn : site.safety,
    cooperation: en ? siteEn.cooperationEn : site.cooperation,
    projects: {
      completed: en ? [...highlightProjectsEn, ...projectsEn] : [...highlightProjects, ...projects],
      ongoing: en ? ongoingProjectsEn : ongoingProjects,
    },
    services: catalogFor(
      serviceCatalog, services, subServices, lang,
      en ? serviceCatalogEn : undefined, en ? servicesEn : undefined
    ),
    products: catalogFor(
      productCatalog, products, subProducts, lang,
      en ? productCatalogEn : undefined, en ? productsEn : undefined
    ),
  };
}

export type Content = ReturnType<typeof build>;

const cache = new Map<Lang, Content>();

export function contentFor(lang: Lang): Content {
  let c = cache.get(lang);
  if (!c) cache.set(lang, (c = build(lang)));
  return c;
}

/** Current language from the [lang] root segment. Server Components only. */
export async function getLang(): Promise<Lang> {
  const l = await rootLang();
  return isLang(l) ? l : defaultLang;
}

/** Everything a Server Component needs to render in the current language. */
export async function getContent(): Promise<Content> {
  return contentFor(await getLang());
}

export { FOUNDED, YEARS, gallery, partners } from "./site";
