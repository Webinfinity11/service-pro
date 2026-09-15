import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/Hero";
import Partners from "@/components/Partners";
import Reveal from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";
import Stats from "@/components/Stats";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import ServiceCard from "@/components/ServiceCard";
import { FOUNDED, gallery, getContent } from "@/lib/content";
import { pageMeta } from "@/lib/meta";

export async function generateMetadata() {
  const { t } = await getContent();
  return pageMeta("/", t.meta.title, t.meta.description, { title: { absolute: t.meta.title } });
}

/** Six tiles, deliberately uneven so the grid has a rhythm rather than a beat. */
const showcase = [
  { src: gallery[0], span: "sm:col-span-2 sm:row-span-2", drift: "7%" },
  { src: gallery[3], span: "", drift: "-5%" },
  { src: gallery[12], span: "", drift: "9%" },
  { src: gallery[27], span: "", drift: "-7%" },
  { src: gallery[40], span: "", drift: "5%" },
];

/** Six services picked to cover the main directions; the rest live on /services. */
const featuredSlugs = [
  "hvac",
  "water-sewage",
  "insulation",
  "suspended-ceilings",
  "floor-preparation",
  "concrete-drilling",
];

export default async function Home() {
  const { t, L, contact, cooperation, stats, services: catalog, aboutParagraphs } =
    await getContent();
  const featured = featuredSlugs.map((slug) => catalog.find(slug)!);
  const count = catalog.top.length;

  return (
    <>
      <Hero />

      {/* ── 01 · What we do ────────────────────────────────────── */}
      <section className="border-b border-line bg-white py-24 lg:py-32">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <SectionHead
              index="01"
              eyebrow={t.home.whatWeDo}
              title={t.home.ourServices}
              lead={t.home.servicesLead(count)}
            />
            <Reveal delay={100}>
              <Link
                href={L("/services")}
                className="tag group flex items-center gap-3 rounded-cta border border-ink px-6 py-4 transition-colors hover:bg-ink hover:text-white"
              >
                {t.home.allServices(count)}
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </Reveal>
          </div>

          <ul className="mt-14 grid gap-4 lg:grid-cols-2">
            {featured.map((s, i) => (
              <ServiceCard
                key={s.slug}
                item={s}
                catalog={catalog}
                index={i + 1}
                delay={(i % 2) * 80}
              />
            ))}
          </ul>
        </div>
      </section>

      {/* ── 02 · About, on the hero's own ground ───────────────── */}
      <section className="overflow-hidden bg-steel py-24 lg:py-32">
        <div className="wrap grid gap-16 lg:grid-cols-[1fr_0.95fr] lg:items-center lg:gap-20">
          <div>
            <SectionHead
              light
              index="02"
              eyebrow={t.home.about}
              title={t.home.aboutTitle}
            />
            <Reveal delay={100}>
              <p className="mt-7 max-w-xl leading-relaxed text-white/60">
                {aboutParagraphs[0]}
              </p>
              <dl className="mt-10 grid gap-px border border-white/12 bg-white/12 sm:grid-cols-2">
                {t.home.aboutFacts(count).map((x) => (
                  <div key={x.k} className="bg-steel px-6 py-5">
                    <dt className="tag text-white/45">{x.k}</dt>
                    <dd className="display-ge mt-2 text-base text-white">{x.v}</dd>
                  </div>
                ))}
              </dl>
              <Link
                href={L("/about")}
                className="tag group mt-10 inline-flex items-center gap-3 border-b-2 border-red pb-2 text-white"
              >
                {t.home.fullStory}
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </Reveal>
          </div>

          {/* Two frames on different parallax speeds give the column depth. */}
          <Reveal delay={80} className="relative lg:pl-10">
            <div
              className="sd-drift relative aspect-4/3 overflow-hidden bg-ink"
              style={{ "--drift": "5%" } as React.CSSProperties}
            >
              <Image
                src="/img/gallery/IMG_5290.jpg"
                alt={t.home.deckAlt}
                fill
                sizes="(min-width: 1024px) 46vw, 92vw"
                className="sd-settle object-cover"
              />
            </div>
            <div
              className="sd-drift relative -mt-16 ml-auto aspect-square w-1/2 overflow-hidden border-8 border-steel bg-ink"
              style={{ "--drift": "-9%" } as React.CSSProperties}
            >
              <Image
                src="/img/gallery/27122011271.jpg"
                alt={t.home.clinicAlt}
                fill
                sizes="(min-width: 1024px) 24vw, 46vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>

        <div className="wrap mt-20 lg:mt-28">
          <Stats stats={stats} />
        </div>
      </section>

      {/* ── 03 · Gallery ───────────────────────────────────────── */}
      <section className="border-b border-line py-24 lg:py-32">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <SectionHead
              index="03"
              eyebrow={t.home.gallery}
              title={t.home.galleryTitle}
            />
            <Reveal delay={100}>
              <Link
                href={L("/gallery")}
                className="tag group flex items-center gap-3 rounded-cta border border-ink px-6 py-4 transition-colors hover:bg-ink hover:text-white"
              >
                {t.home.allPhotos(gallery.length)}
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </Reveal>
          </div>

          <div className="mt-16 grid auto-rows-[10rem] grid-cols-2 gap-4 sm:auto-rows-[13rem] sm:grid-cols-4">
            {showcase.map(({ src, span, drift }, i) => (
              <Reveal key={src} delay={(i % 4) * 80} className={span}>
                <Link
                  href={L("/gallery")}
                  className="group relative block h-full overflow-hidden bg-ink"
                >
                  <span
                    className="sd-drift absolute inset-0 block"
                    style={{ "--drift": drift } as React.CSSProperties}
                  >
                    <Image
                      src={src}
                      alt=""
                      fill
                      sizes={
                        i === 0
                          ? "(min-width: 640px) 50vw, 92vw"
                          : "(min-width: 640px) 25vw, 46vw"
                      }
                      className="scale-110 object-cover transition-transform duration-700 group-hover:scale-125"
                    />
                  </span>
                  <span className="absolute inset-0 bg-steel/0 transition-colors duration-500 group-hover:bg-steel/35" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 04 · Partners ──────────────────────────────────────── */}
      <section className="overflow-hidden py-24 lg:py-28">
        <div className="wrap">
          <h2 className="display-ge text-center text-[clamp(1.65rem,3.6vw,2.9rem)] text-ink">
            {t.common.partners}
          </h2>
        </div>
        <div className="mt-16">
          <Partners />
        </div>
      </section>

      {/* ── 05 · CTA ───────────────────────────────────────────── */}
      {/* Inset card on the page ground, so it never runs into the footer. */}
      <section className="pb-20 lg:pb-28">
        <div className="wrap">
          <div className="grid gap-14 rounded-cta bg-ink px-6 py-14 sm:px-10 lg:grid-cols-2 lg:items-center lg:px-16 lg:py-20">
            <Reveal>
              <p className="tag flex items-center gap-3 text-red-soft">
                <span className="sd-rule h-px w-9 bg-red" />
                {t.home.cooperation}
              </p>
              <h2 className="display-ge mt-6 max-w-xl text-[clamp(1.7rem,3vw,2.5rem)] leading-tight text-white">
                {t.home.ctaTitle(FOUNDED)}
              </h2>
              <p className="mt-7 max-w-lg leading-relaxed text-white/60">
                {cooperation.lead}
              </p>
            </Reveal>

            <Reveal delay={100} className="lg:justify-self-end lg:w-full lg:max-w-md">
              <div className="rounded-cta border border-white/15 bg-steel/70 p-8 backdrop-blur-md sm:p-10">
                <dl className="space-y-7">
                  <div>
                    <dt className="tag text-white/45">{t.common.phone}</dt>
                    <dd className="mt-2">
                      <a
                        href={contact.phoneHref}
                        className="display text-2xl text-white transition-colors hover:text-red-soft sm:text-3xl"
                      >
                        {contact.phone}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="tag text-white/45">WhatsApp</dt>
                    <dd className="mt-2">
                      <a
                        href={contact.whatsapp}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-white transition-colors hover:text-[#25D366]"
                      >
                        <WhatsAppIcon className="h-5 w-5 text-[#25D366]" />
                        {t.contact.whatsapp}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="tag text-white/45">{t.common.email}</dt>
                    <dd className="mt-2">
                      <a
                        href={`mailto:${contact.email}`}
                        className="text-white transition-colors hover:text-red-soft"
                      >
                        {contact.email}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="tag text-white/45">{t.common.address}</dt>
                    <dd className="mt-2 text-white/80">{contact.address}</dd>
                  </div>
                </dl>
                <Link
                  href={L("/contact")}
                  className="tag group mt-9 flex items-center justify-between gap-3 rounded-cta bg-red-ink px-6 py-4 text-white transition-colors hover:bg-red-deep"
                >
                  {t.common.writeUs}
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
