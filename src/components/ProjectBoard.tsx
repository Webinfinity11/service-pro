"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";
import { useI18n } from "./LangProvider";
import type { Project } from "@/lib/projects";

const pad = (n: number) => String(n).padStart(2, "0");

/** Client blocks; clicking one opens a popup with the scope of works —
 *  the same behaviour as the old site's /icons/ page. */
export default function ProjectBoard({ projects }: { projects: Project[] }) {
  const { t } = useI18n();
  const [active, setActive] = useState<number | null>(null);
  const close = useCallback(() => setActive(null), []);
  const step = useCallback(
    (d: number) =>
      setActive((i) => (i === null ? i : (i + d + projects.length) % projects.length)),
    [projects.length]
  );

  return (
    <>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {projects.map((p, i) => (
          <Reveal as="li" key={i} delay={(i % 4) * 60} className="h-full">
            <button
              type="button"
              onClick={() => setActive(i)}
              aria-haspopup="dialog"
              className="group relative flex h-full w-full flex-col overflow-hidden rounded-cta border border-line bg-white p-6 text-left transition-colors duration-300 hover:border-steel"
            >
              <span className="flex items-center justify-between gap-3">
                <span className="display text-2xl leading-none text-red-ink">{pad(i + 1)}</span>
                {p.form && (
                  <span className="tag rounded-full bg-paper px-3 py-1 text-slate">{p.form}</span>
                )}
              </span>
              <span className="display-ge mt-5 text-[1.0625rem] leading-snug text-ink">
                {t.projects.quote(p.name)}
              </span>
              <span className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate">
                {p.scope[0]}
              </span>
              <span className="tag mt-auto flex items-center gap-2 pt-5 text-ink transition-colors group-hover:text-red-ink">
                {p.scope.length > 1 ? t.projects.kinds(p.scope.length) : t.common.more}
                <span className="transition-transform duration-300 group-hover:translate-x-1.5">
                  →
                </span>
              </span>
              <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-red transition-all duration-500 group-hover:w-full" />
            </button>
          </Reveal>
        ))}
      </ul>

      {active !== null && (
        <ProjectModal
          project={projects[active]}
          index={active}
          total={projects.length}
          onClose={close}
          onStep={step}
        />
      )}
    </>
  );
}

function ProjectModal({
  project: p,
  index,
  total,
  onClose,
  onStep,
}: {
  project: Project;
  index: number;
  total: number;
  onClose: () => void;
  onStep: (d: number) => void;
}) {
  const { t, L } = useI18n();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
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
      opener?.focus();
    };
  }, [onClose, onStep]);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-ink/80 p-0 backdrop-blur-sm animate-[fade_.2s_ease-out] sm:items-center sm:p-6"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-title"
        onClick={(e) => e.stopPropagation()}
        className="relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-cta bg-white shadow-2xl animate-[pop_.25s_ease-out] sm:rounded-cta"
      >
        <span className="absolute left-0 top-0 h-1 w-full bg-red" />

        <div className="flex items-start justify-between gap-6 border-b border-line px-6 pb-6 pt-8 sm:px-8">
          <div className="min-w-0">
            <p className="tag flex items-center gap-3 text-slate">
              <span className="h-px w-6 bg-red" />
              {t.projects.project} <span className="text-red-ink">{pad(index + 1)}</span> / {total}
            </p>
            <h2 id="project-title" className="display-ge mt-4 text-[clamp(1.25rem,3vw,1.6rem)] leading-snug text-ink">
              {t.projects.fullName(p.form, p.name)}
            </h2>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label={t.common.close}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line text-ink transition-colors hover:border-red-ink hover:bg-red-ink hover:text-white"
          >
            ✕
          </button>
        </div>

        <div className="overflow-y-auto px-6 py-6 sm:px-8">
          <p className="tag text-slate">{t.projects.works}</p>
          <ul className="mt-4 space-y-3">
            {p.scope.map((s, i) => (
              <li key={i} className="flex gap-3 leading-relaxed text-ink">
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 bg-red" />
                {s}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line bg-paper px-6 py-4 sm:px-8">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => onStep(-1)}
              className="tag rounded-full border border-line bg-white px-4 py-2.5 text-ink transition-colors hover:border-steel"
            >
              ← {t.common.prev}
            </button>
            <button
              type="button"
              onClick={() => onStep(1)}
              className="tag rounded-full border border-line bg-white px-4 py-2.5 text-ink transition-colors hover:border-steel"
            >
              {t.common.next} →
            </button>
          </div>
          <Link
            href={L("/contact")}
            className="tag rounded-full bg-red-ink px-5 py-2.5 text-white transition-colors hover:bg-steel"
          >
            {t.projects.similar}
          </Link>
        </div>
      </div>
    </div>
  );
}
