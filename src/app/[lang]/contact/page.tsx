import ContactForm from "@/components/ContactForm";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { getContent } from "@/lib/content";
import { pageMeta } from "@/lib/meta";

export async function generateMetadata() {
  const { t, contact } = await getContent();
  return pageMeta(
    "/contact",
    t.contact.title,
    `${t.meta.siteName} — ${contact.address}. ${t.common.phone} ${contact.phone}, ${t.common.email} ${contact.email}.`
  );
}

export default async function Contact() {
  const { t, lang, contact, cooperation } = await getContent();
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    contact.mapQuery
  )}&output=embed&hl=${lang}`;

  return (
    <>
      <PageHeader
        eyebrow={t.contact.title}
        title={t.contact.heading}
        lead={cooperation.lead}
        image="/img/gallery/041220121860.jpg"
      />

      <section className="wrap grid gap-12 py-20 lg:grid-cols-[1fr_1.15fr] lg:gap-16 lg:py-24">
        <div>
          <dl className="border-t border-line">
            <Row label={t.common.phone}>
              <a
                href={contact.phoneHref}
                className="display text-2xl transition-colors hover:text-red-ink sm:text-3xl"
              >
                {contact.phone}
              </a>
            </Row>
            <Row label="WhatsApp">
              <a
                href={contact.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 rounded-cta bg-[#25D366] px-5 py-3 font-semibold text-white transition-colors hover:bg-[#1ebe5b]"
              >
                <WhatsAppIcon className="h-5 w-5" />
                {t.contact.whatsapp}
              </a>
            </Row>
            <Row label={t.common.email}>
              <a
                href={`mailto:${contact.email}`}
                className="break-all transition-colors hover:text-red-ink"
              >
                {contact.email}
              </a>
            </Row>
            <Row label={t.common.address}>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  contact.mapQuery
                )}`}
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-red-ink"
              >
                {contact.address}
              </a>
            </Row>
            <Row label={t.common.company}>{contact.company}</Row>
          </dl>

          <Reveal delay={80} className="mt-10 border border-line">
            <iframe
              src={mapSrc}
              title={t.contact.mapTitle}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block h-80 w-full grayscale-[35%]"
            />
          </Reveal>
        </div>

        <Reveal delay={60}>
          <ContactForm />
        </Reveal>
      </section>
    </>
  );
}

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-2 border-b border-line py-6 sm:grid-cols-[9rem_1fr] sm:items-baseline sm:gap-6">
      <dt className="tag text-slate">{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}
