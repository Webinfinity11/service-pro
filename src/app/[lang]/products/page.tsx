import PageHeader from "@/components/PageHeader";
import Partners from "@/components/Partners";
import ProductCta from "@/components/ProductCta";
import SectionHead from "@/components/SectionHead";
import ProductGrid from "@/components/ProductGrid";
import { getContent } from "@/lib/content";
import { pageMeta } from "@/lib/meta";

export async function generateMetadata() {
  const { t, products } = await getContent();
  return pageMeta("/products", products.label, t.meta.products);
}

export default async function Products() {
  const { t, products } = await getContent();
  const count = products.top.length;

  return (
    <>
      <PageHeader
        eyebrow={t.products.eyebrow}
        title={t.products.title}
        lead={t.products.lead}
        image="/img/products/hvac.jpg"
        count={String(count)}
      />

      <section className="wrap py-20 lg:py-24">
        <SectionHead
          index="01"
          eyebrow={t.products.catalog}
          title={t.products.catalogTitle}
          lead={t.products.catalogLead(count)}
        />
        <div className="mt-14">
          <ProductGrid catalog={products} />
        </div>
      </section>

      <section className="border-t border-line bg-white py-20 lg:py-24">
        <div className="wrap">
          <h2 className="display-ge text-center text-[clamp(1.65rem,3.6vw,2.9rem)] text-ink">
            {t.common.partners}
          </h2>
        </div>
        <div className="mt-14">
          <Partners />
        </div>
      </section>

      <ProductCta />
    </>
  );
}
