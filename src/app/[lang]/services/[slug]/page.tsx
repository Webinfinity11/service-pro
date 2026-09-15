import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceDetail from "@/components/ServiceDetail";
import { getContent } from "@/lib/content";
import { pageMeta } from "@/lib/meta";
import { services } from "@/lib/services";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((p) => ({ slug: p.slug }));
}

async function load(slug: string) {
  const { services } = await getContent();
  const item = services.top.find((x) => x.slug === slug);
  return { catalog: services, item };
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const { item: p } = await load(slug);
  if (!p) return {};
  return pageMeta(`/services/${p.slug}`, p.t, p.d, {
    openGraph: { title: p.t, description: p.d, images: [p.img] },
  });
}

export default async function Page({ params }: PageProps<"/[lang]/services/[slug]">) {
  const { slug } = await params;
  const { item, catalog } = await load(slug);
  if (!item) notFound();
  return <ServiceDetail item={item} catalog={catalog} />;
}
