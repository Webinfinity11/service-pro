"use client";

import { createContext, useContext } from "react";
import { dicts } from "@/lib/dict";
import { defaultLang, localize, type Lang } from "@/lib/i18n";

const LangContext = createContext<Lang>(defaultLang);

/** Hands the page language to Client Components (root-params is server-only). */
export default function LangProvider({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  return <LangContext.Provider value={lang}>{children}</LangContext.Provider>;
}

export function useI18n() {
  const lang = useContext(LangContext);
  return { lang, t: dicts[lang], L: (href: string) => localize(lang, href) };
}
