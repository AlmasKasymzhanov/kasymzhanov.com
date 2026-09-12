import type { Metadata } from "next";
import { SectionFront } from "@/components/section-front";
import { ARTICLES, localizeArticle } from "@/components/articles";

export const metadata: Metadata = {
  title: "Kasymzhanov Data — дата-журналистика и аналитика",
  description:
    "Расследования, аналитика и дата-журналистика, которую можно проверить по цифрам. Данные вместо мнений.",
  alternates: {
    canonical: "/data",
    languages: { "ru-RU": "/data", "en-US": "/en/data", "x-default": "/data" },
  },
};

export const revalidate = 120;

// Editorial stories: everything in ARTICLES except the tool guide.
const DATA_SLUGS = new Set(["wildberries-kazakhstan", "wb-dual-use", "freedom-market", "russia-fuel-jerrycan", "nvidia-kazakhstan", "why-blogger-brands-fail"]);

export default function DataPage() {
  const items = ARTICLES.filter(a => DATA_SLUGS.has(a.slug)).map(a => localizeArticle(a, "ru"));
  return <SectionFront locale="ru" eyebrow="Исследования" title="Данные и аналитика" description="Исследования о маркетплейсах, технологиях и экономике." articles={items} />;
}
