import Link from "next/link";
import { getContent } from "@/lib/content";

export default async function NotFound() {
  const { t, nav } = await getContent();
  return (
    <section className="wrap flex min-h-[70vh] flex-col justify-center py-24">
      <p className="tag flex items-center gap-3 text-red-ink">
        <span className="h-px w-9 bg-red" />
        {t.notFound.error}
      </p>
      <h1 className="display-ge mt-6 text-[clamp(1.9rem,5vw,3.2rem)]">
        {t.notFound.title}
      </h1>
      <p className="mt-5 max-w-lg leading-relaxed text-slate">
        {t.notFound.lead}
      </p>
      <ul className="mt-10 grid max-w-2xl gap-px bg-line sm:grid-cols-2">
        {nav.map((item, i) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="flex items-baseline gap-4 bg-paper px-6 py-5 transition-colors hover:bg-white"
            >
              <span className="tag text-red-ink">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-medium">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
