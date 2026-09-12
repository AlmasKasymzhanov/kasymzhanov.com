import type { Metadata } from "next";
import { DESCRIPTION, TITLE } from "./data";

const url = "https://kasymzhanov.com/magnesium";
const image = `${url}/opengraph-image`;
export const metadata: Metadata = {
  title: `${TITLE} | Алмас Касымжанов`, description: DESCRIPTION,
  alternates: { canonical: url },
  robots: { index: false, follow: false },
  openGraph: { type: "article", locale: "ru_RU", url, title: TITLE, description: DESCRIPTION,
    publishedTime: "2026-09-13T12:00:00+05:00", authors: ["Almas Kasymzhanov"], images: [{ url: image, width: 1200, height: 630, alt: TITLE }] },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: [image] },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org", "@type": "Report", headline: TITLE, description: DESCRIPTION, url, image,
    datePublished: "2026-09-13", dateCreated: "2026-09-11", inLanguage: "ru-RU", isAccessibleForFree: true,
    author: { "@type": "Person", name: "Almas Kasymzhanov", url: "https://kasymzhanov.com/#about" },
    publisher: { "@type": "Person", name: "Almas Kasymzhanov", url: "https://kasymzhanov.com" },
    isBasedOn: { "@type": "CreativeWork", name: "Исследование рынка магниевых препаратов и добавок на Kaspi", dateCreated: "2026-09-11", author: { "@type": "Organization", name: "Redstat", url: "https://redstat.kz" } },
  };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />{children}</>;
}
