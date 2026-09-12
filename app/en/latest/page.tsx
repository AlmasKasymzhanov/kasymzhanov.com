import type { Metadata } from "next";
import { SectionFront } from "@/components/section-front";
import { getPublishedArticles } from "@/components/articles";

export const metadata: Metadata = {
  title: "Articles | Almas Kasymzhanov",
  description: "My articles and research on marketplaces, products, technology, and the economy.",
  alternates: { canonical: "/en/latest", languages: { "ru-RU": "/latest", "en-US": "/en/latest", "x-default": "/latest" } },
};

export default function LatestPageEn() {
  return <SectionFront locale="en" eyebrow="Archive" title="Articles" description="I collect my writing and research on marketplaces, products, technology, and the economy here. New work appears first." articles={getPublishedArticles("en")} />;
}
