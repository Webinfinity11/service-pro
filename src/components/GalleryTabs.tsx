"use client";

import { useState } from "react";
import GalleryGrid from "./GalleryGrid";
import { useI18n } from "./LangProvider";

type Group = { label: string; images: string[] };

/** Gallery split into the old site's tabs, with an "all" tab first. */
export default function GalleryTabs({ groups }: { groups: Group[] }) {
  const { t } = useI18n();
  const all: Group = { label: t.gallery.all, images: groups.flatMap((g) => g.images) };
  const tabs = [all, ...groups];
  const [active, setActive] = useState(0);
  const current = tabs[active];

  return (
    <>
      <div
        role="tablist"
        aria-label={t.gallery.categories}
        className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:thin] sm:mx-0 sm:flex-wrap sm:px-0"
      >
        {tabs.map((t, i) => {
          const on = i === active;
          return (
            <button
              key={t.label}
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => setActive(i)}
              className={`tag flex shrink-0 items-center gap-2.5 rounded-cta border px-5 py-3.5 transition-colors ${
                on
                  ? "border-steel bg-steel text-white"
                  : "border-line bg-white text-ink hover:border-steel"
              }`}
            >
              {t.label}
              <span
                className={`rounded-full px-2 py-0.5 text-[0.65rem] ${
                  on ? "bg-white/15 text-white" : "bg-paper text-slate"
                }`}
              >
                {t.images.length}
              </span>
            </button>
          );
        })}
      </div>

      <div role="tabpanel" aria-label={current.label} className="mt-10">
        {/* Keyed so paging and the open photo reset when the tab changes. */}
        <GalleryGrid key={current.label} images={current.images} />
      </div>
    </>
  );
}
