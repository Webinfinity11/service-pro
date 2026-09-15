"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import LanguageMenu from "./LanguageMenu";
import { useI18n } from "./LangProvider";
import { SpArrow, SpClose, SpMenu } from "./SpIcons";
import { stripLang } from "@/lib/i18n";

/** Header rebuilt from the approved `service-pro-hero` mockup — light gradient
 *  bar, full lockup, red underline on the active link. Styles live in
 *  `src/app/hero.css`, scoped under `.sp-site`. */
export default function Header({ nav }: { nav: { href: string; label: string }[] }) {
  const { t, L } = useI18n();
  // Locale-free path: the same on the server (/ka/about) and in the browser (/about).
  const path = stripLang(usePathname());
  const [open, setOpen] = useState(false);

  // The mobile nav is a dropdown inside the bar, so a route change must close it.
  // Adjusting state during render (not in an effect) avoids a cascading render.
  const [lastPath, setLastPath] = useState(path);
  if (path !== lastPath) {
    setLastPath(path);
    setOpen(false);
  }

  return (
    <div className="sp-site sp-site--header">
      <a className="sp-skip" href="#sp-main">
        {t.header.skip}
      </a>

      <header className="sp-header">
        <div className="sp-container sp-header__inner">
          <Link className="sp-brand" href={L("/")} aria-label={t.header.brand}>
            <Image
              src="/img/logo/lockup-light.png"
              alt="SERVICE PRO"
              width={760}
              height={324}
              priority
              sizes="214px"
            />
          </Link>

          <nav
            className={`sp-nav${open ? " is-open" : ""}`}
            aria-label={t.header.nav}
          >
            {nav.map((item) => {
              const href = stripLang(item.href);
              const active = href === "/" ? path === "/" : path.startsWith(href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`sp-nav__link${active ? " is-active" : ""}`}
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="sp-header__actions">
            <LanguageMenu path={path} />

            <Link className="sp-button sp-button--header" href={L("/contact")}>
              {t.header.cta}
              <SpArrow className="sp-icon" />
            </Link>

            <button
              className="sp-menu-toggle"
              type="button"
              aria-expanded={open}
              aria-label={open ? t.header.closeMenu : t.header.openMenu}
              onClick={() => setOpen((v) => !v)}
            >
              <SpMenu className="sp-icon sp-menu-toggle__open" />
              <SpClose className="sp-icon sp-menu-toggle__close" />
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}
