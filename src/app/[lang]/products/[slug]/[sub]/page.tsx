import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetail from "@/components/ProductDetail";
import { getContent } from "@/lib/content";
import { pageMeta } from "@/lib/meta";
import { subProducts } from "@/lib/products";

export const dynamicParams = false;

export function generateStaticParams() {
  return subProducts.map((p) => ({ slug: p.parent!, sub: p.slug }));
}

async function load(slug: string, sub: string) {
  const { products } = await getContent();
  const item = products.sub.find((x) => x.parent === slug && x.slug === sub);
  return { catalog: products, item };
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/products/[slug]/[sub]">): Promise<Metadata> {
  const { slug, sub } = await params;
  const { item: p } = await load(slug, sub);
  if (!p) return {};
  return pageMeta(`/products/${slug}/${sub}`, p.t, p.d, {
    openGraph: { title: p.t, description: p.d, images: [p.img] },
  });
}

export default async function Page({ params }: PageProps<"/[lang]/products/[slug]/[sub]">) {
  const { slug, sub } = await params;
  const { item, catalog } = await load(slug, sub);
  if (!item) notFound();
  return <ProductDetail item={item} catalog={catalog} />;
}
