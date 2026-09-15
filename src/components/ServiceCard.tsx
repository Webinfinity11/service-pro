import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";
import type { Catalog, Item } from "@/lib/catalog";
import { getContent } from "@/lib/content";

/**
 * Service row: photo on the left, number, name and one line of scope on the
 * right. On phones the photo sits on top at full width, so it is not cropped
 * to a sliver. Deliberately unlike the shop-style product tile.
 */
export default async function ServiceCard({
  item: s,
  catalog: c,
  index,
  delay = 0,
}: {
  item: Item;
  catalog: Catalog;
  index: number;
  delay?: number;
}) {
  const { t } = await getContent();
  const kids = c.childrenOf(s).length;

  return (
    <Reveal as="li" delay={delay} className="h-full">
      <Link
        href={c.href(s)}
        className="group relative grid h-full grid-cols-1 overflow-hidden rounded-cta border border-line bg-white transition-colors duration-300 hover:border-steel sm:grid-cols-[10.5rem_1fr]"
      >
        <div className="relative aspect-video overflow-hidden bg-ink sm:aspect-auto sm:min-h-36">
          <Image
            src={s.img}
            alt={s.t}
            fill
            sizes="(min-width: 640px) 168px, 92vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
          <span className="absolute inset-0 bg-steel/25 transition-colors duration-500 group-hover:bg-steel/0" />
        </div>

        <div className="flex min-w-0 flex-col p-5 sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <span className="display text-2xl leading-none text-red-ink">
              {String(index).padStart(2, "0")}
            </span>
            {kids > 0 && (
              <span className="tag rounded-full bg-paper px-3 py-1 text-slate">
                {t.services.subCount(kids)}
              </span>
            )}
          </div>
          <h3 className="display-ge mt-4 text-[1.0625rem] leading-snug text-ink">{s.t}</h3>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate">{s.d}</p>
          <span className="tag mt-auto flex items-center gap-2 pt-5 text-ink transition-colors group-hover:text-red-ink">
            {t.common.more}
            <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
          </span>
        </div>

        {/* Red rule sweeps along the foot on hover. */}
        <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-red transition-all duration-500 group-hover:w-full" />
      </Link>
    </Reveal>
  );
}
