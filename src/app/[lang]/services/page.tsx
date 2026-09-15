import { serviceIcons } from "@/components/Icons";
import PageHeader from "@/components/PageHeader";
import ProductCta from "@/components/ProductCta";
import ServiceGrid from "@/components/ServiceGrid";
import Reveal from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";
import { getContent } from "@/lib/content";
import { pageMeta } from "@/lib/meta";

export async function generateMetadata() {
  const { t } = await getContent();
  return pageMeta("/services", t.services.title, t.meta.services);
}

export default async function Services() {
  const { t, cooperation, homeServices, services: catalog } = await getContent();
  const count = catalog.top.length;

  return (
    <>
      <PageHeader
        eyebrow={t.services.title}
        title={t.services.title}
        lead={cooperation.title}
        image="/img/hero/hero-2.jpg"
        count={String(count)}
      />

      {/* ── Every service, one card each ─────────────────────── */}
      <section className="wrap py-20 lg:py-24">
        <SectionHead
          index="01"
          eyebrow={t.services.whatWeDo}
          title={t.services.ourServices}
          lead={t.services.lead(count)}
        />
        <div className="mt-14">
          <ServiceGrid catalog={catalog} />
        </div>
      </section>

      {/* ── Six directions ───────────────────────────────────── */}
      <section className="border-t border-line bg-white py-20 lg:py-24">
        <div className="wrap">
          <SectionHead index="02" eyebrow={t.services.directions} title={t.services.directionsTitle} />
          <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {homeServices.map((s, i) => {
              const Icon = serviceIcons[s.icon];
              return (
                <Reveal
                  as="li"
                  key={s.title}
                  delay={(i % 3) * 80}
                  className="group rounded-cta border border-line bg-paper p-8 transition-colors hover:bg-white"
                >
                  <Icon className="h-10 w-10 text-red-ink transition-transform duration-300 group-hover:-translate-y-1" />
                  <h3 className="display-ge mt-6 text-base">{s.title}</h3>
                  <ul className="mt-4 space-y-2 text-sm text-slate">
                    {s.items.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-2 h-1 w-1 shrink-0 bg-red" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>

      <ProductCta title={catalog.copy.cta} />
    </>
  );
}
