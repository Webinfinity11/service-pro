import GalleryTabs from "@/components/GalleryTabs";
import PageHeader from "@/components/PageHeader";
import { getContent } from "@/lib/content";
import { pageMeta } from "@/lib/meta";

export async function generateMetadata() {
  const { t } = await getContent();
  return pageMeta("/gallery", t.gallery.title, t.meta.gallery);
}

export default async function Gallery() {
  const { t, galleryGroups } = await getContent();
  return (
    <>
      <PageHeader
        eyebrow={t.gallery.title}
        title={t.gallery.heading}
        lead={t.gallery.lead}
        image="/img/gallery/IMG_0332.jpg"
      />

      <section className="wrap py-16 lg:py-20">
        <GalleryTabs groups={galleryGroups} />
      </section>
    </>
  );
}
