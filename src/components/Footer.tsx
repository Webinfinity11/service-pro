import Link from "next/link";
import Logo from "./Logo";
import { FOUNDED, getContent } from "@/lib/content";

export default async function Footer() {
  const { t, nav, contact, safety, tagline } = await getContent();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-white/65">
      <div className="wrap grid gap-12 py-16 lg:grid-cols-[1.3fr_1fr_1fr] lg:py-20">
        <div>
          <Logo light />
          <p className="mt-6 max-w-sm text-sm leading-relaxed">
            {safety.staff}
          </p>
          <div className="mt-7 flex gap-2">
            <Social href={contact.facebook} label="Facebook">
              <path d="M14 9h3V5.5h-3c-2.2 0-4 1.8-4 4V12H7.5v3.5H10V22h3.5v-6.5H16l.5-3.5h-3V9.5c0-.3.2-.5.5-.5Z" />
            </Social>
            <Social href={contact.youtube} label="YouTube">
              <path d="M21.6 7.2a2.6 2.6 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.6 2.6 0 0 0 2.4 7.2C2 8.8 2 12 2 12s0 3.2.4 4.8a2.6 2.6 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.6 2.6 0 0 0 1.8-1.8C22 15.2 22 12 22 12s0-3.2-.4-4.8ZM10 15.2V8.8L15.5 12 10 15.2Z" />
            </Social>
          </div>
        </div>

        <div>
          <h2 className="tag mb-6 text-red-soft">{t.footer.pages}</h2>
          <ul className="space-y-3 text-sm">
            {nav.slice(1).map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="tag mb-6 text-red-soft">{t.footer.contact}</h2>
          <dl className="space-y-5 text-sm">
            <div>
              <dt className="tag mb-1.5 text-white/60">{t.common.address}</dt>
              <dd>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    contact.mapQuery
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-white"
                >
                  {contact.address}
                </a>
              </dd>
            </div>
            <div>
              <dt className="tag mb-1.5 text-white/60">{t.common.phone}</dt>
              <dd>
                <a
                  href={contact.phoneHref}
                  className="display text-lg text-white"
                >
                  {contact.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="tag mb-1.5 text-white/60">{t.common.email}</dt>
              <dd>
                <a
                  href={`mailto:${contact.email}`}
                  className="transition-colors hover:text-white"
                >
                  {contact.email}
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="wrap flex flex-col gap-2 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="tag text-white/60">
            © {FOUNDED}–{year} SERVICE PRO — {t.footer.rights}
          </p>
          <p className="tag text-white/60">
            {tagline}
          </p>
        </div>
      </div>
    </footer>
  );
}

function Social({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center border border-white/15 text-white/70 transition-colors hover:border-red-ink hover:bg-red-ink hover:text-white"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        {children}
      </svg>
    </a>
  );
}
