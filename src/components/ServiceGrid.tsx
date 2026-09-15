import Link from "next/link";
import Reveal from "./Reveal";
import ServiceCard from "./ServiceCard";
import type { Catalog } from "@/lib/catalog";
import { getContent } from "@/lib/content";

/** Two-column register of service rows, closed by an enquiry row. */
export default async function ServiceGrid({ catalog: c }: { catalog: Catalog }) {
  const { t, L, contact } = await getContent();
  return (
    <ul className="grid gap-4 lg:grid-cols-2">
      {c.top.map((s, i) => (
        <ServiceCard key={s.slug} item={s} catalog={c} index={i + 1} delay={(i % 2) * 80} />
      ))}

      <Reveal as="li" delay={80} className="h-full">
        <div className="flex h-full min-h-36 flex-col justify-between gap-6 rounded-cta bg-steel p-6 text-white sm:flex-row sm:items-center">
          <div>
            <p className="display-ge text-lg">{c.copy.missing}</p>
            <a
              href={contact.phoneHref}
              className="display mt-2 block text-xl text-white/80 transition-colors hover:text-red-soft"
            >
              {contact.phone}
            </a>
          </div>
          <Link
            href={L("/contact")}
            className="tag group flex w-fit shrink-0 items-center gap-3 rounded-cta bg-red-ink px-6 py-3.5 transition-colors hover:bg-red-deep"
          >
            {t.common.writeUs}
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </Reveal>
    </ul>
  );
}
