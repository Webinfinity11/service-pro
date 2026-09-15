import Link from "next/link";
import ProductCard from "./ProductCard";
import Reveal from "./Reveal";
import type { Catalog } from "@/lib/catalog";
import { getContent } from "@/lib/content";

/** Catalogue grid — each tile opens the item's own page. */
export default async function ProductGrid({ catalog: c }: { catalog: Catalog }) {
  const { t, L } = await getContent();
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
      {c.top.map((p, i) => (
        <ProductCard key={p.slug} item={p} catalog={c} index={i + 1} delay={(i % 3) * 90} />
      ))}

      {/* An enquiry tile closes the grid's last row. */}
      <Reveal as="li" delay={180} className="h-full">
        <Link
          href={L("/contact")}
          className="group flex h-full min-h-72 flex-col justify-between rounded-cta bg-steel p-7 text-white transition-colors duration-500 hover:bg-ink"
        >
          <span className="tag text-red-soft">{t.products.onRequest}</span>
          <span className="block">
            <span className="display-ge block text-[1.35rem] leading-snug">
              {c.copy.missing}
            </span>
            <span className="mt-3 block text-sm leading-relaxed text-white/60">
              {t.products.alternative}
            </span>
            <span className="tag mt-7 flex w-fit items-center gap-3 rounded-cta bg-red-ink px-6 py-3.5 transition-colors group-hover:bg-red-deep">
              {t.common.writeUs}
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </span>
          </span>
        </Link>
      </Reveal>
    </ul>
  );
}
