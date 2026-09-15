import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetail from "@/components/ProductDetail";
import { getContent } from "@/lib/content";
import { pageMeta } from "@/lib/meta";
import { products } from "@/lib/products";

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

async function load(slug: string) {
  const { products } = await getContent();
  const item = products.top.find((x) => x.slug === slug);
  return { catalog: products, item };
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const { item: p } = await load(slug);
  if (!p) return {};
  return pageMeta(`/products/${p.slug}`, p.t, p.d, {
    openGraph: { title: p.t, description: p.d, images: [p.img] },
  });
}

export default async function Page({ params }: PageProps<"/[lang]/products/[slug]">) {
  const { slug } = await params;
  const { item, catalog } = await load(slug);
  if (!item) notFound();
  return <ProductDetail item={item} catalog={catalog} />;
}
