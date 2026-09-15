import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceDetail from "@/components/ServiceDetail";
import { getContent } from "@/lib/content";
import { pageMeta } from "@/lib/meta";
import { subServices } from "@/lib/services";

export const dynamicParams = false;

export function generateStaticParams() {
  return subServices.map((p) => ({ slug: p.parent!, sub: p.slug }));
}

async function load(slug: string, sub: string) {
  const { services } = await getContent();
  const item = services.sub.find((x) => x.parent === slug && x.slug === sub);
  return { catalog: services, item };
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/services/[slug]/[sub]">): Promise<Metadata> {
  const { slug, sub } = await params;
  const { item: p } = await load(slug, sub);
  if (!p) return {};
  return pageMeta(`/services/${slug}/${sub}`, p.t, p.d, {
    openGraph: { title: p.t, description: p.d, images: [p.img] },
  });
}

export default async function Page({ params }: PageProps<"/[lang]/services/[slug]/[sub]">) {
  const { slug, sub } = await params;
  const { item, catalog } = await load(slug, sub);
  if (!item) notFound();
  return <ServiceDetail item={item} catalog={catalog} />;
}
