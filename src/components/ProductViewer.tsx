"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import Lightbox from "./Lightbox";
import { useI18n } from "./LangProvider";
import type { Shot } from "@/lib/catalog";

/** Product-page photo block: big active shot, thumbnail strip, full-screen on click. */
export default function ProductViewer({
  images,
  title,
  contain = false,
}: {
  images: Shot[];
  title: string;
  contain?: boolean;
}) {
  const { t } = useI18n();
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const strip = useRef<HTMLUListElement>(null);
  const many = images.length > 1;

  const step = useCallback(
    (d: number) => setActive((i) => (i + d + images.length) % images.length),
    [images.length]
  );
  const close = useCallback(() => setOpen(false), []);

  // Keep the active thumbnail in view as the main photo changes.
  // Scrolls the strip only — scrollIntoView would also move the page.
  useEffect(() => {
    const box = strip.current;
    const el = box?.children[active] as HTMLElement | undefined;
    if (!box || !el) return;
    const left = el.offsetLeft - box.offsetLeft;
    if (left < box.scrollLeft || left + el.offsetWidth > box.scrollLeft + box.clientWidth) {
      box.scrollTo({ left: left - (box.clientWidth - el.offsetWidth) / 2, behavior: "smooth" });
    }
  }, [active]);

  const shot = images[active];
  const bg = contain ? "bg-white" : "bg-ink";
  const fit = contain ? "object-contain p-6" : "object-cover";

  return (
    // min-w-0: a long thumbnail strip must scroll, not widen the grid column.
    <div className="min-w-0">
      <div className={`group relative aspect-4/3 overflow-hidden rounded-cta border border-line ${bg}`}>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="absolute inset-0 cursor-zoom-in"
          aria-label={t.common.enlargePhoto}
        >
          <Image
            key={shot.src}
            src={shot.src}
            alt={shot.caption ?? title}
            fill
            priority={active === 0}
            sizes="(min-width: 1024px) 52vw, 92vw"
            className={`animate-[fade_.35s_ease-out] ${fit}`}
          />
        </button>

        <span className="tag pointer-events-none absolute left-4 top-4 rounded-cta bg-steel/80 px-3 py-2 text-white backdrop-blur-md">
          {many ? `${active + 1} / ${images.length}` : t.common.photo}
        </span>
        <span className="tag pointer-events-none absolute right-4 top-4 flex items-center gap-2 rounded-cta bg-white/90 px-3 py-2 text-ink opacity-0 backdrop-blur-md transition-opacity group-hover:opacity-100">
          ⤢ {t.common.enlarge}
        </span>

        {shot.caption && (
          <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-steel/90 to-transparent px-5 pb-4 pt-10 text-sm font-semibold text-white">
            {shot.caption}
          </span>
        )}

        {many && (
          <>
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label={t.common.prevPhoto}
              className="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-ink shadow-md transition hover:bg-red-ink hover:text-white"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label={t.common.nextPhoto}
              className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-ink shadow-md transition hover:bg-red-ink hover:text-white"
            >
              →
            </button>
          </>
        )}
      </div>

      {many && (
        <ul
          ref={strip}
          className="mt-3 flex snap-x gap-2 overflow-x-auto pb-2 [scrollbar-width:thin]"
          aria-label={t.common.photoGallery}
        >
          {images.map((img, i) => (
            <li key={img.src} className="shrink-0 snap-start">
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={img.caption ?? t.common.photoN(i + 1)}
                aria-current={i === active}
                className={`relative block h-16 w-20 overflow-hidden rounded-cta border-2 transition sm:h-[4.5rem] sm:w-24 ${bg} ${
                  i === active ? "border-red-ink" : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <Image
                  src={img.src}
                  alt=""
                  fill
                  sizes="96px"
                  className={contain ? "object-contain p-1" : "object-cover"}
                />
              </button>
            </li>
          ))}
        </ul>
      )}

      {open && (
        <Lightbox images={images} index={active} onClose={close} onStep={step} contain={contain} />
      )}
    </div>
  );
}
