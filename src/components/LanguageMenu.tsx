"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { useI18n } from "./LangProvider";
import { SpGlobe } from "./SpIcons";
import { locales, localize } from "@/lib/i18n";

const names = { ka: "ქართული", en: "English" } as const;

/** Header language dropdown: globe + current code, opens a list of languages
 *  linking to the same page in each. */
export default function LanguageMenu({ path }: { path: string }) {
  const { lang, t } = useI18n();
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!box.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="sp-language" ref={box}>
      <button
        ref={button}
        type="button"
        className="sp-language__toggle"
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={`${t.header.language}: ${names[lang]}`}
        onClick={() => setOpen((v) => !v)}
      >
        <SpGlobe className="sp-icon" />
        <span>{lang.toUpperCase()}</span>
        <svg className="sp-language__chevron" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path d="M2.5 4.5 6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <ul className="sp-language__menu" id={menuId}>
          {locales.map((l) => (
            <li key={l}>
              <Link
                href={localize(l, path)}
                hrefLang={l}
                lang={l}
                className="sp-language__item"
                aria-current={l === lang ? "true" : undefined}
                onClick={() => setOpen(false)}
              >
                {names[l]}
                <span className="sp-language__code">{l.toUpperCase()}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
