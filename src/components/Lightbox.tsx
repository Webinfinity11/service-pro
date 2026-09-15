"use client";

import Image from "next/image";
import { useEffect } from "react";
import type { Shot } from "@/lib/catalog";
import { useI18n } from "./LangProvider";

/** Full-screen photo viewer. Arrow keys step, Escape closes. */
export default function Lightbox({
  images,
  index,
  onClose,
  onStep,
  contain = false,
}: {
  images: Shot[];
  index: number;
  onClose: () => void;
  onStep: (d: number) => void;
  contain?: boolean;
}) {
  const { t } = useI18n();
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onStep(1);
      if (e.key === "ArrowLeft") onStep(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onStep]);

  const shot = images[index];

  return (
    <div
      className="fixed inset-0 z-[60] flex flex-col bg-ink/97 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={t.common.enlargePhoto}
    >
      <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4 lg:px-8">
        <p className="tag text-white/60">
          <span className="text-red-soft">{String(index + 1).padStart(2, "0")}</span> /{" "}
          {images.length}
          {shot.caption && <span className="ml-4 normal-case text-white">{shot.caption}</span>}
        </p>
        <button
          type="button"
          onClick={onClose}
          className="tag flex shrink-0 items-center gap-2 border border-white/20 px-4 py-2.5 text-white transition-colors hover:border-red-ink hover:bg-red-ink"
        >
          {t.common.close} ✕
        </button>
      </div>

      <div className={`relative flex-1 ${contain ? "bg-white" : ""}`} onClick={onClose}>
        <Image
          src={shot.src}
          alt={shot.caption ?? ""}
          fill
          sizes="100vw"
          className="object-contain p-4 lg:p-10"
        />
      </div>

      {images.length > 1 && (
        <div className="flex items-stretch justify-center gap-px border-t border-white/10">
          <button
            type="button"
            onClick={() => onStep(-1)}
            className="tag flex-1 py-5 text-white/70 transition-colors hover:bg-white/10 hover:text-white sm:flex-none sm:px-16"
            aria-label={t.common.prevPhoto}
          >
            ← {t.common.prev}
          </button>
          <button
            type="button"
            onClick={() => onStep(1)}
            className="tag flex-1 py-5 text-white/70 transition-colors hover:bg-white/10 hover:text-white sm:flex-none sm:px-16"
            aria-label={t.common.nextPhoto}
          >
            {t.common.next} →
          </button>
        </div>
      )}
    </div>
  );
}
