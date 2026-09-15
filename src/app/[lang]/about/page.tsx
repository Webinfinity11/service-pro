import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Partners from "@/components/Partners";
import Reveal from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";
import Stats from "@/components/Stats";
import { FOUNDED, YEARS, getContent } from "@/lib/content";
import { pageMeta } from "@/lib/meta";

export async function generateMetadata() {
  const { t } = await getContent();
  return pageMeta("/about", t.about.title, t.meta.about);
}

export default async function About() {
  const { t, L, aboutParagraphs, contact, cooperation, tagline, stats } = await getContent();

  /* The old page told the story in two text blocks, each beside one photo. */
  const story = [
    {
      eyebrow: t.about.history,
      title: t.about.historyTitle,
      paragraphs: aboutParagraphs.slice(0, 3),
      photo: { src: "/img/about/object.jpg", alt: t.about.deckAlt },
    },
    {
      eyebrow: t.about.activity,
      title: cooperation.title,
      paragraphs: aboutParagraphs.slice(3),
      photo: { src: "/img/gallery/IMG_5245.jpg", alt: t.about.lobbyAlt },
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow={t.about.title}
        title={t.about.brand}
        lead={t.about.lead(tagline, FOUNDED)}
        image="/img/hero/hero-1.jpg"
        count={t.about.years(YEARS)}
      />

      {/* ── Story ─────────────────────────────────────────────── */}
      {story.map((block, b) => (
        <section
          key={block.eyebrow}
          className={b % 2 ? "border-y border-line bg-white" : ""}
        >
          <div className="wrap grid items-center gap-12 py-20 lg:grid-cols-2 lg:gap-20 lg:py-28">
            <div className={b % 2 ? "lg:order-2" : ""}>
              <SectionHead
                index={String(b + 1).padStart(2, "0")}
                eyebrow={block.eyebrow}
                title={block.title}
              />
              <div className="mt-9 space-y-6 border-t border-line pt-9 leading-relaxed text-slate">
                {block.paragraphs.map((p, i) => (
                  <Reveal key={i} delay={i * 60}>
                    <p>{p}</p>
                  </Reveal>
                ))}
              </div>
            </div>

            <Reveal delay={100} className="relative">
              <div className="relative aspect-4/5 overflow-hidden rounded-cta bg-ink">
                <Image
                  src={block.photo.src}
                  alt={block.photo.alt}
                  fill
                  sizes="(min-width: 1024px) 44vw, 92vw"
                  className="object-cover"
                />
              </div>
              {b === 0 && (
                <div className="absolute -bottom-6 left-6 rounded-cta bg-steel px-7 py-6 text-white shadow-xl sm:left-auto sm:right-6">
                  <p className="display text-[clamp(2.2rem,4vw,3rem)] leading-none">
                    {FOUNDED}
                  </p>
                  <p className="tag mt-2 text-white/60">{t.about.founded}</p>
                </div>
              )}
            </Reveal>
          </div>
        </section>
      ))}

      {/* ── Numbers ──────────────────────────────────────────── */}
      <section className="bg-ink">
        <div className="wrap py-20 lg:py-24">
          <SectionHead
            index="03"
            eyebrow={t.about.numbers}
            title={t.about.numbersTitle(YEARS)}
            light
          />
          <div className="mt-14">
            <Stats stats={stats} />
          </div>
        </div>
      </section>

      {/* ── Partners ─────────────────────────────────────────── */}
      <section className="py-20 lg:py-24">
        <div className="wrap">
          <h2 className="display-ge text-center text-[clamp(1.65rem,3.6vw,2.9rem)] text-ink">
            {t.common.partners}
          </h2>
        </div>
        <div className="mt-14">
          <Partners />
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="bg-steel py-20 lg:py-24">
        <div className="wrap flex flex-wrap items-center justify-between gap-10">
          <Reveal>
            <h2 className="display-ge max-w-xl text-[clamp(1.6rem,3.4vw,2.6rem)] text-white">
              {cooperation.title}
            </h2>
            <p className="mt-5 max-w-lg text-white/60">{cooperation.lead}</p>
          </Reveal>
          <Reveal delay={100} className="flex flex-wrap gap-3">
            <a
              href={contact.phoneHref}
              className="tag flex items-center gap-3 rounded-cta bg-red-ink px-7 py-4 text-white transition-colors hover:bg-red-deep"
            >
              {contact.phone}
            </a>
            <Link
              href={L("/contact")}
              className="tag group flex items-center gap-3 border border-white/25 px-7 py-4 text-white transition-colors hover:border-white hover:bg-white/10"
            >
              {t.common.writeUs}
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
