import Image from "next/image";
import Link from "next/link";
import GalleryGrid from "./GalleryGrid";
import ProductCta from "./ProductCta";
import Reveal from "./Reveal";
import { getContent } from "@/lib/content";
import type { Catalog, Item } from "@/lib/catalog";

/**
 * Service page — a photo banner, then an article with a sticky sidebar that
 * lists every service. Laid out unlike the product page on purpose.
 */
export default async function ServiceDetail({ item: s, catalog: c }: { item: Item; catalog: Catalog }) {
  const { t, L, contact } = await getContent();
  const parent = s.parent ? c.find(s.parent) : undefined;
  const kids = c.childrenOf(s);
  const current = parent ?? s;
  const siblings = parent ? c.childrenOf(parent) : [];

  const trail = [
    { href: L("/"), label: t.common.home },
    { href: c.base, label: c.label },
    ...(parent ? [{ href: c.href(parent), label: parent.t }] : []),
  ];

  return (
    <>
      {/* ── Banner ───────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-steel text-white">
        <Image src={s.img} alt="" fill priority sizes="100vw" className="-z-20 object-cover opacity-45" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-steel via-steel/85 to-steel/30" />

        <div className="wrap grid gap-10 py-14 lg:grid-cols-[1fr_22rem] lg:items-end lg:py-20">
          <div>
            <nav aria-label={t.common.breadcrumb} className="tag flex flex-wrap items-center gap-x-3 gap-y-2 text-white/55">
              {trail.map((t) => (
                <span key={t.href} className="flex items-center gap-3">
                  <Link href={t.href} className="transition-colors hover:text-red-soft">
                    {t.label}
                  </Link>
                  <span className="text-red-soft">/</span>
                </span>
              ))}
              <span className="text-white/80">{s.t}</span>
            </nav>

            <p className="tag mt-10 flex items-center gap-3 text-red-soft">
              <span className="h-px w-9 bg-red" />
              {parent ? parent.t : c.noun}
            </p>
            <h1 className="display-ge mt-5 max-w-3xl text-[clamp(1.8rem,4vw,3.2rem)] leading-tight">
              {s.t}
            </h1>
            <p className="mt-6 max-w-2xl text-[1.0625rem] leading-relaxed text-white/70">{s.d}</p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href={L("/contact")}
                className="tag group flex items-center gap-3 rounded-cta bg-red-ink px-7 py-4 transition-colors hover:bg-red-deep"
              >
                {t.common.requestOffer}
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
              <a
                href={contact.phoneHref}
                className="tag flex items-center gap-3 rounded-cta border border-white/30 px-7 py-4 transition-colors hover:border-white hover:bg-white/10"
              >
                {contact.phone}
              </a>
            </div>
          </div>

          <div className="rounded-cta border border-white/15 bg-white/10 p-6 backdrop-blur-md">
            <p className="tag text-white/55">{c.features.label}</p>
            <ul className="mt-4 space-y-3">
              {c.features.items.map((f) => (
                <li key={f} className="flex items-center gap-3 text-[1.0625rem]">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-red-ink text-sm">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            {(s.gallery.length > 0 || kids.length > 0) && (
              <p className="tag mt-6 border-t border-white/15 pt-5 text-white/55">
                {[
                  kids.length ? t.services.subServices(kids.length) : null,
                  s.gallery.length ? t.common.photos(s.gallery.length) : null,
                ]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ── Article + sidebar ────────────────────────────────── */}
      <section className="wrap grid gap-12 py-16 lg:grid-cols-[1fr_20rem] lg:gap-16 lg:py-24">
        <article className="min-w-0 space-y-16">
          {/* Description */}
          <div>
            <h2 className="display-ge text-[clamp(1.4rem,2.6vw,2rem)] text-ink">{t.services.description}</h2>
            <span className="mt-5 block h-0.5 w-12 bg-red" />
            {s.intro ? (
              <div className="mt-8 space-y-9">
                {s.intro.map((b, i) => (
                  <Reveal key={i}>
                    {b.h && <h3 className="display-ge mb-3 text-lg text-ink">{b.h}</h3>}
                    {b.p && <p className="text-[1.0625rem] leading-[1.85] text-slate">{b.p}</p>}
                    {b.list && (
                      <ul className="mt-2 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                        {b.list.map((li) => (
                          <li
                            key={li}
                            className="flex items-center gap-3 rounded-cta border border-line bg-white px-4 py-3 text-ink"
                          >
                            <span className="text-red-ink">✓</span>
                            {li}
                          </li>
                        ))}
                      </ul>
                    )}
                  </Reveal>
                ))}
              </div>
            ) : (
              <p className="mt-8 text-[1.0625rem] leading-[1.85] text-slate">{s.d}</p>
            )}
            {s.gallery.length === 0 && (
              <Reveal className="relative mt-10 aspect-video overflow-hidden rounded-cta bg-ink">
                <Image src={s.img} alt={s.t} fill sizes="(min-width: 1024px) 60vw, 92vw" className="object-cover" />
              </Reveal>
            )}
          </div>

          {/* Sub-services as numbered rows */}
          {kids.length > 0 && (
            <div>
              <h2 className="display-ge text-[clamp(1.4rem,2.6vw,2rem)] text-ink">{t.services.subTitle}</h2>
              <span className="mt-5 block h-0.5 w-12 bg-red" />
              <ol className="mt-8 border-t border-line">
                {kids.map((k, i) => (
                  <Reveal as="li" key={k.slug} delay={i * 60}>
                    <Link
                      href={c.href(k)}
                      className="group grid grid-cols-[3rem_4.5rem_1fr_auto] items-center gap-4 border-b border-line py-4 transition-colors hover:bg-white sm:gap-6 sm:px-3"
                    >
                      <span className="display text-xl text-red-ink">{String(i + 1).padStart(2, "0")}</span>
                      <span className="relative block aspect-square overflow-hidden rounded-cta bg-ink">
                        <Image src={k.img} alt="" fill sizes="72px" className="object-cover" />
                      </span>
                      <span className="display-ge text-base text-ink group-hover:text-red-ink">{k.t}</span>
                      <span className="grid h-9 w-9 place-items-center rounded-full border border-line transition-colors group-hover:border-red-ink group-hover:bg-red-ink group-hover:text-white">
                        →
                      </span>
                    </Link>
                  </Reveal>
                ))}
              </ol>
            </div>
          )}

          {/* Photos */}
          {s.gallery.length > 0 && (
            <div id="photos">
              <div className="flex flex-wrap items-baseline justify-between gap-4">
                <h2 className="display-ge text-[clamp(1.4rem,2.6vw,2rem)] text-ink">{t.services.photos}</h2>
                <p className="tag text-slate">{t.common.photos(s.gallery.length)}</p>
              </div>
              <span className="mt-5 block h-0.5 w-12 bg-red" />
              <div className="mt-8">
                <GalleryGrid images={s.gallery} fit={s.fit} compact />
              </div>
            </div>
          )}
        </article>

        {/* Sidebar */}
        <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
          <nav aria-label={c.copy.all} className="overflow-hidden rounded-cta border border-line bg-white">
            <p className="tag border-b border-line bg-paper px-5 py-4 text-ink">{c.copy.all}</p>
            <ul className="max-h-[26rem] overflow-y-auto py-2 [scrollbar-width:thin]">
              {c.top.map((x) => {
                const on = x.slug === current.slug;
                return (
                  <li key={x.slug}>
                    <Link
                      href={c.href(x)}
                      aria-current={on ? "page" : undefined}
                      className={`flex items-center justify-between gap-3 border-l-2 px-5 py-2.5 text-sm transition-colors ${
                        on
                          ? "border-red-ink bg-paper font-semibold text-ink"
                          : "border-transparent text-slate hover:bg-paper hover:text-ink"
                      }`}
                    >
                      {x.t}
                      <span aria-hidden className={on ? "text-red-ink" : "text-line"}>→</span>
                    </Link>
                    {on && siblings.length > 0 && (
                      <ul className="pb-2">
                        {siblings.map((k) => (
                          <li key={k.slug}>
                            <Link
                              href={c.href(k)}
                              aria-current={k.slug === s.slug ? "page" : undefined}
                              className={`block py-2 pl-9 pr-5 text-sm transition-colors ${
                                k.slug === s.slug ? "text-red-ink" : "text-slate hover:text-ink"
                              }`}
                            >
                              — {k.t}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="rounded-cta bg-steel p-6 text-white">
            <p className="tag text-white/55">{c.copy.order}</p>
            <a href={contact.phoneHref} className="display mt-3 block text-2xl transition-colors hover:text-red-soft">
              {contact.phone}
            </a>
            <a
              href={`mailto:${contact.email}`}
              className="mt-2 block break-all text-sm text-white/65 transition-colors hover:text-white"
            >
              {contact.email}
            </a>
            <Link
              href={L("/contact")}
              className="tag group mt-6 flex items-center justify-between gap-3 rounded-cta bg-red-ink px-5 py-3.5 transition-colors hover:bg-red-deep"
            >
              {t.common.writeUs}
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </aside>
      </section>

      <ProductCta title={c.copy.cta} />
    </>
  );
}
