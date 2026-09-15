import Link from "next/link";
import GalleryGrid from "./GalleryGrid";
import ProductCard from "./ProductCard";
import ProductArticle from "./ProductArticle";
import ProductCta from "./ProductCta";
import ProductViewer from "./ProductViewer";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import { getContent } from "@/lib/content";
import type { Catalog, Item } from "@/lib/catalog";

/** Card grids fill their width only when there are enough cards to do so. */
const cols: Record<number, string> = {
  1: "max-w-md",
  2: "sm:grid-cols-2 lg:max-w-4xl",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};

/** Inner page shared by both catalogues: /products/x, /products/x/y, /services/x, … */
export default async function ProductDetail({ item: p, catalog: c }: { item: Item; catalog: Catalog }) {
  const { t, L, contact } = await getContent();
  const parent = p.parent ? c.find(p.parent) : undefined;
  const kids = c.childrenOf(p);

  // Siblings for sub-products, neighbouring categories for top-level ones.
  const pool = parent ? c.sub.filter((s) => s.parent === parent.slug) : c.top;
  const at = pool.findIndex((x) => x.slug === p.slug);
  const related = [
    ...new Set([1, 2, 3, 4].map((n) => pool[(at + n) % pool.length])),
  ]
    .filter((x) => x.slug !== p.slug && !kids.includes(x))
    .slice(0, 3);

  const trail = [
    { href: c.base, label: c.label },
    ...(parent ? [{ href: c.href(parent), label: parent.t }] : []),
  ];

  // Viewer set: the cover first, then the range (the cover is often one of them).
  const shots = [{ src: p.img }, ...p.gallery].filter(
    (x, i, arr) => arr.findIndex((y) => y.src === x.src) === i
  );

  let n = 0;
  const idx = () => String(++n).padStart(2, "0");

  return (
    <>
      {/* ── Product hero: photos left, what it is and how to order right ── */}
      <section className="border-b border-line bg-white">
        <div className="wrap pb-16 pt-8 lg:pb-20 lg:pt-10">
          <nav aria-label={t.common.breadcrumb} className="tag flex flex-wrap items-center gap-x-3 gap-y-2 text-slate">
            {[{ href: L("/"), label: t.common.home }, ...trail].map((c) => (
              <span key={c.href} className="flex items-center gap-3">
                <Link href={c.href} className="transition-colors hover:text-red-ink">
                  {c.label}
                </Link>
                <span className="text-red-ink">/</span>
              </span>
            ))}
            <span className="text-ink">{p.t}</span>
          </nav>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
            <ProductViewer images={shots} title={p.t} contain={p.fit === "contain"} />

            <div className="flex min-w-0 flex-col">
              <p className="tag flex items-center gap-3 text-red-ink">
                <span className="h-px w-9 bg-red" />
                {parent ? parent.t : c.noun}
              </p>
              <h1 className="display-ge mt-5 text-[clamp(1.6rem,2.8vw,2.3rem)] leading-tight text-ink">
                {p.t}
              </h1>
              <p className="mt-6 text-[1.0625rem] leading-relaxed text-slate">{p.d}</p>

              {c.features.label && <p className="tag mt-7 text-slate">{c.features.label}</p>}
              <ul className={`flex flex-wrap gap-2 ${c.features.label ? "mt-3" : "mt-7"}`}>
                {c.features.items.map((t) => (
                  <li
                    key={t}
                    className="tag flex items-center gap-2 rounded-cta border border-line bg-paper px-4 py-3 text-ink"
                  >
                    <span className="text-red-ink">✓</span>
                    {t}
                  </li>
                ))}
              </ul>

              {kids.length > 0 && (
                <div className="mt-8">
                  <p className="tag text-slate">{t.products.subCategories}</p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {kids.map((k) => (
                      <li key={k.slug}>
                        <Link
                          href={c.href(k)}
                          className="flex items-center gap-2 rounded-full border border-ink/20 px-4 py-2 text-sm font-semibold text-ink transition-colors hover:border-red-ink hover:bg-red-ink hover:text-white"
                        >
                          {k.t}
                          <span aria-hidden>→</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Pushes the order box to the column foot, never closer than 2rem. */}
              <div aria-hidden className="min-h-8 grow" />
              <div className="rounded-cta bg-steel p-6 text-white">
                <p className="tag text-white/50">{c.copy.order}</p>
                <div className="mt-3 flex flex-wrap items-center justify-between gap-4">
                  <a
                    href={contact.phoneHref}
                    className="display text-2xl transition-colors hover:text-red-soft"
                  >
                    {contact.phone}
                  </a>
                  <Link
                    href={L("/contact")}
                    className="tag group flex items-center gap-3 rounded-cta bg-red-ink px-6 py-3.5 transition-colors hover:bg-red-deep"
                  >
                    {t.common.requestOffer}
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Long description ─────────────────────────────────── */}
      {p.content && (
        <section className="wrap py-20 lg:py-24">
          <SectionHead index={idx()} eyebrow={t.products.description} title={t.products.details} />
          <div className="mt-14">
            <ProductArticle blocks={p.content} />
          </div>
        </section>
      )}
      {!p.content && p.intro && (
        <section className="wrap py-20 lg:py-24">
          <SectionHead index={idx()} eyebrow={t.products.description} title={t.products.details} />
          <div className="mt-12 grid gap-x-16 gap-y-10 md:grid-cols-2">
            {p.intro.map((b, i) => (
              <Reveal key={i} delay={(i % 2) * 80}>
                {b.h && <h3 className="display-ge mb-3 text-lg text-ink">{b.h}</h3>}
                {b.p && <p className="leading-relaxed text-slate">{b.p}</p>}
                {b.list && (
                  <ul className="mt-4 grid gap-2 text-slate sm:grid-cols-2">
                    {b.list.map((li) => (
                      <li key={li} className="flex gap-3">
                        <span className="mt-2.5 h-1 w-1 shrink-0 bg-red" />
                        {li}
                      </li>
                    ))}
                  </ul>
                )}
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* ── Sub-categories ───────────────────────────────────── */}
      {kids.length > 0 && (
        <section className="border-t border-line bg-white py-20 lg:py-24">
          <div className="wrap">
            <SectionHead
              index={idx()}
              eyebrow={t.products.subCategories}
              title={t.products.pickDirection}
              lead={t.products.subLead(kids.length)}
            />
            <ul className={`mt-12 grid gap-4 lg:gap-6 ${cols[kids.length] ?? cols[4]}`}>
              {kids.map((k, i) => (
                <ProductCard key={k.slug} item={k} catalog={c} delay={(i % 4) * 80} />
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ── Range ────────────────────────────────────────────── */}
      {p.gallery.length > 0 && (
        <section id="gallery" className="border-t border-line py-20 lg:py-24">
          <div className="wrap">
            <SectionHead
              index={idx()}
              eyebrow={t.products.range}
              title={p.gallery.some((g) => g.caption) ? t.products.models : t.products.allPhotos}
              lead={t.products.rangeLead(p.gallery.length, p.gallery.some((g) => g.caption))}
            />
            <div className="mt-12">
              <GalleryGrid images={p.gallery} fit={p.fit} />
            </div>
          </div>
        </section>
      )}

      {p.video && (
        <section className="border-t border-line bg-white py-20 lg:py-24">
          <div className="wrap">
            <SectionHead index={idx()} eyebrow={t.products.video} title={p.t} />
            <Reveal className="mt-12 max-w-4xl bg-ink">
              <video src={p.video} controls preload="metadata" className="block w-full" />
            </Reveal>
          </div>
        </section>
      )}

      {/* ── Related ──────────────────────────────────────────── */}
      {related.length > 0 && (
        <section className="border-t border-line py-20 lg:py-24">
          <div className="wrap">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionHead
                index={idx()}
                eyebrow={parent ? parent.t : t.products.catalog}
                title={parent ? t.products.sameCategory : c.copy.others}
              />
              <Link
                href={parent ? c.href(parent) : c.base}
                className="tag group flex items-center gap-3 border border-ink px-6 py-3.5 transition-colors hover:bg-ink hover:text-white"
              >
                {parent ? t.products.backToCategory : c.copy.all}
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
            <ul className={`mt-12 grid gap-4 lg:gap-6 ${cols[related.length]}`}>
              {related.map((r, i) => (
                <ProductCard key={r.slug} item={r} catalog={c} delay={i * 80} />
              ))}
            </ul>
          </div>
        </section>
      )}

      <ProductCta title={c.copy.cta} />
    </>
  );
}
