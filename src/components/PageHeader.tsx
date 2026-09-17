import Image from "next/image";
import Link from "next/link";
import { getContent } from "@/lib/content";

export default async function PageHeader({
  eyebrow,
  title,
  lead,
  image,
  trail = [],
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  image: string;
  /** Crumbs between "მთავარი" and the current page. */
  trail?: { href: string; label: string }[];
}) {
  const { t, L } = await getContent();
  return (
    <section className="relative overflow-hidden bg-ink">
      <Image
        src={image}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-35"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-steel via-steel/90 to-ink/45" />

      <div className="wrap relative py-16 lg:py-24">
        <nav
          aria-label={t.common.breadcrumb}
          className="tag flex flex-wrap items-center gap-x-3 gap-y-2 text-white/60"
        >
          {[{ href: L("/"), label: t.common.home }, ...trail].map((c) => (
            <span key={c.href} className="flex items-center gap-3">
              <Link href={c.href} className="transition-colors hover:text-red-soft">
                {c.label}
              </Link>
              <span className="text-red-soft">/</span>
            </span>
          ))}
          <span className="text-white/70">{eyebrow}</span>
        </nav>

        <div className="mt-8 max-w-2xl">
          <h1 className="display-ge text-[clamp(1.9rem,5vw,3.4rem)] text-white">
            {title}
          </h1>
          {lead && (
            <p className="mt-5 max-w-xl leading-relaxed text-white/60">{lead}</p>
          )}
        </div>
      </div>
    </section>
  );
}
