/**
 * Shared shape for the two catalogues carried over from the old site —
 * products (/products) and services (/services). Both render with the same
 * cards and the same inner page, so they share one item type and one set of
 * lookup helpers.
 */

export type Shot = { src: string; caption?: string };

export type IntroBlock = { h?: string; p?: string; list?: string[] };

/** Interactive pieces a long-form article can embed. */
export type WidgetName = "steam-calculator" | "jacket-calculator" | "recuperator-curve";

/** Long-form article block, from the client's product documents. Text may use `**bold**`. */
export type ContentBlock =
  | { type: "h2" | "h3" | "p" | "note"; text: string }
  | { type: "list"; items: string[] }
  | { type: "table"; head: string[]; rows: string[][] }
  | { type: "image"; src: string; alt: string; width: number; height: number; localized?: boolean }
  /** Internal cross-link, e.g. from a product article to the matching service. `href` is an
   *  unprefixed site path — the article localises it. */
  | { type: "link"; href: string; text: string }
  | { type: "widget"; name: WidgetName };

export type Item = {
  slug: string;
  t: string;
  d: string;
  /** Card and header photo. */
  img: string;
  /** Slug of the category this item sits under (second-level items only). */
  parent?: string;
  /** Slugs shown as cards on the category page — top-level or second-level. */
  children?: string[];
  /** Cut-out shots on white read better uncropped. */
  fit?: "cover" | "contain";
  intro?: IntroBlock[];
  /** Long-form article; replaces `intro` on the page when present. */
  content?: ContentBlock[];
  video?: string;
  gallery: Shot[];
};

export type Catalog = {
  base: string;
  /** Breadcrumb and "back" label, e.g. "პროდუქტები". */
  label: string;
  /** Eyebrow above a top-level item's title, e.g. "პროდუქტი". */
  noun: string;
  /** Ticks under the description; `label` titles them when set. */
  features: { label: string; items: string[] };
  copy: {
    others: string; // "სხვა პროდუქტები"
    all: string; // "ყველა პროდუქტი"
    order: string; // order box heading
    cta: string; // closing band title
    missing: string; // enquiry tile closing the grid
  };
  top: Item[];
  sub: Item[];
  find: (slug: string) => Item | undefined;
  href: (item: Item) => string;
  childrenOf: (item: Item) => Item[];
};

/** Translatable text of one item; everything else (slug, photos) is shared. */
export type ItemText = Pick<Item, "t" | "d" | "intro" | "content"> & {
  /** Gallery captions keyed by photo `src`. */
  captions?: Record<string, string>;
};

/** Translatable copy of a catalogue. */
export type CatalogText = Pick<Catalog, "label" | "noun" | "features" | "copy">;

export function makeCatalog(
  c: Pick<Catalog, "base" | "label" | "noun" | "features" | "copy" | "top" | "sub">
): Catalog {
  const all = [...c.top, ...c.sub];
  const find = (slug: string) => all.find((x) => x.slug === slug);
  return {
    ...c,
    find,
    href: (x) => (x.parent ? `${c.base}/${x.parent}/${x.slug}` : `${c.base}/${x.slug}`),
    childrenOf: (x) => (x.children ?? []).map(find).filter((k): k is Item => !!k),
  };
}
