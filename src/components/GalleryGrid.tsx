"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import Lightbox from "./Lightbox";
import { useI18n } from "./LangProvider";
import type { Shot } from "@/lib/catalog";

const STEP = 36;

export default function GalleryGrid({
  images: input,
  fit = "cover",
  compact = false,
}: {
  images: (string | Shot)[];
  /** Three columns at most — for a grid sharing its row with a sidebar. */
  compact?: boolean;
  /** "contain" keeps cut-out product shots whole on a white ground. */
  fit?: "cover" | "contain";
}) {
  const { t } = useI18n();
  const images: Shot[] = input.map((i) => (typeof i === "string" ? { src: i } : i));
  const captioned = images.some((i) => i.caption);
  const contain = fit === "contain";
  const [shown, setShown] = useState(Math.min(STEP, images.length));
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (d: number) =>
      setOpen((cur) =>
        cur === null ? cur : (cur + d + images.length) % images.length
      ),
    [images.length]
  );

  return (
    <>
      <ul className={`grid grid-cols-2 gap-2 sm:grid-cols-3 lg:gap-3 ${compact ? "" : "lg:grid-cols-4"}`}>
        {images.slice(0, shown).map(({ src, caption }, i) => (
          <li key={src}>
            <button
              type="button"
              onClick={() => setOpen(i)}
              className={`group relative flex h-full w-full flex-col overflow-hidden text-left ${
                captioned ? "border border-line bg-white" : "bg-ink"
              }`}
              aria-label={`${caption ?? t.common.photoN(i + 1)} — ${t.common.enlarge}`}
            >
              <span
                className={`relative block aspect-4/3 overflow-hidden ${contain ? "bg-white" : "bg-ink"}`}
              >
                <Image
                  src={src}
                  alt={caption ?? ""}
                  fill
                  loading={i < 8 ? "eager" : "lazy"}
                  sizes="(min-width: 1024px) 24vw, (min-width: 640px) 32vw, 48vw"
                  className={`transition-all duration-500 group-hover:scale-105 ${
                    contain ? "object-contain p-4" : "object-cover group-hover:opacity-75"
                  }`}
                />
              </span>
              {caption && (
                <span className="flex flex-1 items-start gap-3 border-t border-line p-4 text-sm font-semibold leading-snug text-ink transition-colors group-hover:text-red-ink">
                  <span className="mt-2 h-1 w-1 shrink-0 bg-red" />
                  {caption}
                </span>
              )}
              <span className="tag absolute left-0 top-0 bg-red-ink px-2.5 py-1.5 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {String(i + 1).padStart(3, "0")}
              </span>
            </button>
          </li>
        ))}
      </ul>

      {shown < images.length && (
        <div className="mt-12 flex flex-col items-center gap-4">
          <p className="tag text-slate">
            {shown} / {images.length}
          </p>
          <button
            type="button"
            onClick={() => setShown((n) => Math.min(n + STEP, images.length))}
            className="tag rounded-cta border border-ink px-8 py-4 transition-colors hover:bg-ink hover:text-white"
          >
            {t.gallery.morePhotos(Math.min(STEP, images.length - shown))}
          </button>
        </div>
      )}

      {open !== null && (
        <Lightbox images={images} index={open} onClose={close} onStep={step} contain={contain} />
      )}
    </>
  );
}
