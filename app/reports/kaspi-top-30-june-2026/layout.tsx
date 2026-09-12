import type { Metadata } from "next";

const title = "30 ниш Kaspi: что я бы проверял к осени | Алмас Касымжанов";
const description = "Рыночный срез 30 ниш Kaspi: выручка, рост, заказы, средний чек, конкуренция, отзывы, сезонность и практический вывод по каждой категории.";
const url = "https://kasymzhanov.com/reports/kaspi-top-30-june-2026";
const image = "https://kasymzhanov.com/reports/kaspi-top-30-june-2026/cover.png";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/reports/kaspi-top-30-june-2026" },
  openGraph: {
    type: "article",
    locale: "ru_RU",
    url,
    siteName: "Kasymzhanov",
    title,
    description,
    publishedTime: "2026-08-02T12:00:00+05:00",
    authors: ["Almas Kasymzhanov"],
    images: [{ url: image, width: 1200, height: 630, alt: "30 ниш Kaspi для осенней проверки" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [image],
  },
};

export default function KaspiTop30Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Report",
    name: title,
    headline: "30 ниш Kaspi: что я бы проверял к осени",
    description,
    url,
    image,
    datePublished: "2026-08-02",
    inLanguage: "ru-RU",
    isAccessibleForFree: true,
    author: { "@type": "Person", name: "Almas Kasymzhanov", url: "https://kasymzhanov.com/authors/almas-kasymzhanov" },
    publisher: { "@type": "Person", name: "Almas Kasymzhanov", url: "https://kasymzhanov.com" },
    about: { "@type": "Thing", name: "Аналитика рынка Kaspi" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
