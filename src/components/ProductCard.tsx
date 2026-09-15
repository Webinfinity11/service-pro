import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";
import type { Catalog, Item } from "@/lib/catalog";
import { getContent } from "@/lib/content";

/** Shop-style catalogue tile: photo on a light plate, category, name, view button. */
export default async function ProductCard({
  item: p,
  catalog: c,
  index,
  delay = 0,
}: {
  item: Item;
  catalog: Catalog;
  index?: number;
  delay?: number;
}) {
  const { t } = await getContent();
  const kids = c.childrenOf(p).length;
  const photos = p.gallery.length;
  const badge = kids ? t.products.subCount(kids) : photos ? t.common.photos(photos) : null;
  const contain = p.fit === "contain" && !!p.parent;

  return (
    <Reveal as="li" delay={delay} className="h-full">
      <Link
        href={c.href(p)}
        className="group flex h-full flex-col overflow-hidden rounded-cta border border-line bg-white transition-all duration-500 hover:-translate-y-1 hover:border-ink/25 hover:shadow-[0_22px_44px_-24px_rgb(0_58_78/0.45)]"
      >
        <div className="p-2.5 pb-0">
          <div
            className={`relative aspect-4/3 overflow-hidden rounded-[3px] ${contain ? "bg-white" : "bg-paper"}`}
          >
            <Image
              src={p.img}
              alt={p.t}
              fill
              sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 92vw"
              className={`transition-transform duration-700 ease-out group-hover:scale-105 ${
                contain ? "object-contain p-5" : "object-cover"
              }`}
            />
            {badge && (
              <span className="tag absolute left-3 top-3 rounded-cta bg-white/95 px-2.5 py-1.5 text-ink shadow-sm">
                {badge}
              </span>
            )}
            {index !== undefined && (
              <span className="tag absolute right-3 top-3 rounded-cta bg-steel/85 px-2.5 py-1.5 text-white backdrop-blur-md">
                {String(index).padStart(2, "0")}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-1 flex-col px-5 pb-5 pt-5">
          <h3 className="display-ge mb-5 line-clamp-2 text-[1.0625rem] leading-snug text-ink transition-colors group-hover:text-red-ink">
            {p.t}
          </h3>

          <span className="mt-auto flex items-center justify-between gap-3 border-t border-line pt-4">
            <span className="tag text-slate transition-colors group-hover:text-ink">{t.common.view}</span>
            <span
              aria-hidden
              className="grid h-9 w-9 place-items-center rounded-full bg-paper text-ink transition-all duration-300 group-hover:bg-red-ink group-hover:text-white"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
          </span>
        </div>
      </Link>
    </Reveal>
  );
}
