import Image from "next/image";
import Link from "next/link";
import { getContent } from "@/lib/content";

/**
 * Brand lockup, rebuilt from the original artwork as mark + rule + wordmark
 * so the wordmark can be set larger than the full-width file allows.
 * "SERVICE" is white in the original, so the light-ground variants repaint it
 * petrol and the diamond is reversed for petrol grounds — see scripts/logo*.js.
 */
export default async function Logo({ light = false }: { light?: boolean }) {
  const { t, L } = await getContent();
  return (
    <Link
      href={L("/")}
      aria-label={t.header.brand}
      className="group flex shrink-0 items-center gap-3"
    >
      <Image
        src={light ? "/img/logo/mark-on-dark.png" : "/img/logo/mark.png"}
        alt=""
        width={547}
        height={547}
        priority
        sizes="48px"
        className="h-11 w-11 object-contain transition-transform duration-300 group-hover:scale-105"
      />
      <span
        className={`h-9 w-px ${light ? "bg-white/25" : "bg-slate/35"}`}
        aria-hidden="true"
      />
      <Image
        src={
          light
            ? "/img/logo/wordmark-on-dark.png"
            : "/img/logo/wordmark-on-light.png"
        }
        alt={t.meta.siteName}
        width={616}
        height={210}
        priority
        sizes="120px"
        className="h-[1.9rem] w-auto object-contain"
      />
    </Link>
  );
}
