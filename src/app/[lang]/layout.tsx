import type { Metadata } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import localFont from "next/font/local";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LangProvider from "@/components/LangProvider";
import { FOUNDED, contentFor, getLang } from "@/lib/content";
import { locales } from "@/lib/i18n";
import "../globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
});

/** TBC Contractica — Georgian and Latin, for body copy and headlines. */
const contractica = localFont({
  variable: "--font-ge",
  display: "swap",
  src: [
    { path: "../../fonts/TBCContractica-Light.ttf", weight: "300", style: "normal" },
    { path: "../../fonts/TBCContractica-Regular.ttf", weight: "400", style: "normal" },
    { path: "../../fonts/TBCContractica-Medium.ttf", weight: "500", style: "normal" },
    { path: "../../fonts/TBCContractica-Bold.ttf", weight: "700", style: "normal" },
    { path: "../../fonts/TBCContractica-Black.ttf", weight: "900", style: "normal" },
  ],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://service-pro.ge";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata(): Promise<Metadata> {
  const { t } = contentFor(await getLang());
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: t.meta.title, template: `%s | ${t.meta.siteName}` },
    description: t.meta.description,
    keywords: [
      "სერვის პრო",
      "service pro",
      "HVAC",
      "გათბობა",
      "ვენტილაცია",
      "ჰაერის კონდიცირება",
      "თბოიზოლაცია",
      "სენდვიჩ პანელები",
      "დეკის იატაკები",
    ],
    openGraph: {
      title: t.meta.title,
      description: t.meta.ogDescription,
      locale: t.meta.locale,
      type: "website",
    },
  };
}

export default async function RootLayout({ children }: LayoutProps<"/[lang]">) {
  const lang = await getLang();
  const c = contentFor(lang);

  return (
    <html lang={lang} data-scroll-behavior="smooth">
      <body
        className={`${archivo.variable} ${contractica.variable} ${plexMono.variable} antialiased`}
      >
        <LangProvider lang={lang}>
          <Header nav={c.nav} />
          <main id="sp-main">{children}</main>
          <Footer />
        </LangProvider>
        <script
          type="application/ld+json"
          // Local business data for search results; values come from src/lib/site.ts
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "GeneralContractor",
              name: c.t.meta.siteName,
              alternateName: lang === "en" ? "სერვის პრო" : "Service Pro",
              url: SITE_URL,
              telephone: c.contact.phone,
              email: c.contact.email,
              foundingDate: String(FOUNDED),
              address: {
                "@type": "PostalAddress",
                streetAddress: lang === "en" ? "Besarion Zhgenti Street" : "ბესარიონ ჟღენტის ქუჩა",
                addressLocality: lang === "en" ? "Tbilisi" : "თბილისი",
                addressCountry: "GE",
              },
              areaServed: "GE",
              knowsAbout: c.homeServices.map((s) => s.title),
            }),
          }}
        />
      </body>
    </html>
  );
}
