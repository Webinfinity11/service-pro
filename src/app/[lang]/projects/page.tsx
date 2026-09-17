import PageHeader from "@/components/PageHeader";
import ProductCta from "@/components/ProductCta";
import ProjectBoard from "@/components/ProjectBoard";
import SectionHead from "@/components/SectionHead";
import { getContent } from "@/lib/content";
import { pageMeta } from "@/lib/meta";

export async function generateMetadata() {
  const { t } = await getContent();
  return pageMeta("/projects", t.projects.title, t.meta.projects);
}

export default async function Projects() {
  const { t, projects } = await getContent();
  return (
    <>
      <PageHeader
        eyebrow={t.projects.title}
        title={t.projects.title}
        lead={t.projects.lead}
        image="/img/hero/hero-2.jpg"
      />

      <section className="wrap py-20 lg:py-24">
        <SectionHead
          index="01"
          eyebrow={t.projects.eyebrow}
          title={t.projects.heading}
          lead={t.projects.hint}
        />
        <div className="mt-14">
          <ProjectBoard completed={projects.completed} ongoing={projects.ongoing} />
        </div>
      </section>

      <ProductCta title={t.projects.ctaTitle} text={t.projects.ctaText} />
    </>
  );
}
