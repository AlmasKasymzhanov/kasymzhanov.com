import type { Metadata } from "next";
import { SectionFront } from "@/components/section-front";
import { getPublishedArticles } from "@/components/articles";

export const metadata: Metadata = {
  title: "Статьи | Алмас Касымжанов",
  description: "Мои статьи и исследования о маркетплейсах, продуктах, технологиях и экономике.",
  alternates: { canonical: "/latest", languages: { "ru-RU": "/latest", "en-US": "/en/latest", "x-default": "/latest" } },
};

export default function LatestPage() {
  return <SectionFront locale="ru" eyebrow="Архив" title="Статьи" description="Здесь я собираю статьи и исследования о маркетплейсах, продуктах, технологиях и экономике. Новые материалы находятся сверху." articles={getPublishedArticles()} />;
}
