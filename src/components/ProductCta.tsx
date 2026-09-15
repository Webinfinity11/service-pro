import Link from "next/link";
import Reveal from "./Reveal";
import { getContent } from "@/lib/content";

export default async function ProductCta({
  title,
  text,
}: {
  title?: string;
  text?: string;
}) {
  const { t, L, contact } = await getContent();
  return (
    <section className="bg-steel py-20 lg:py-24">
      <div className="wrap flex flex-wrap items-center justify-between gap-10">
        <Reveal>
          <h2 className="display-ge max-w-xl text-[clamp(1.6rem,3.4vw,2.6rem)] text-white">
            {title ?? t.cta.productTitle}
          </h2>
          <p className="mt-5 max-w-lg text-white/60">{text ?? t.cta.productText}</p>
        </Reveal>
        <Reveal delay={100} className="flex flex-wrap gap-3">
          <a
            href={contact.phoneHref}
            className="tag rounded-cta bg-red-ink px-7 py-4 text-white transition-colors hover:bg-red-deep"
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
  );
}
