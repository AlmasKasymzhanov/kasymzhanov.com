import type { Metadata } from "next";
import { SectionFront } from "@/components/section-front";
import { ARTICLES, localizeArticle } from "@/components/articles";

export const metadata: Metadata = {
  title: "Kasymzhanov Data — data journalism and analysis",
  description:
    "Investigations, analytics, and data journalism you can verify against the numbers. Data, not opinions.",
  alternates: {
    canonical: "/en/data",
    languages: { "ru-RU": "/data", "en-US": "/en/data", "x-default": "/data" },
  },
};

export const revalidate = 120;

const DATA_SLUGS = new Set(["wildberries-kazakhstan", "wb-dual-use", "freedom-market", "russia-fuel-jerrycan", "nvidia-kazakhstan", "why-blogger-brands-fail"]);
const L = "en" as const;

export default function DataPageEn() {
  const items = ARTICLES.filter(a => DATA_SLUGS.has(a.slug)).map(a => localizeArticle(a, "en"));
  return <SectionFront locale="en" eyebrow="Research" title="Data and analysis" description="Research on marketplaces, technology and the economy." articles={items} />;
}
