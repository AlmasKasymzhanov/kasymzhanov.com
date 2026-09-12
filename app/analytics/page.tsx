import { getPublishedArticles } from "@/components/articles";
import { SectionFront } from "@/components/section-front";
export const metadata = {
  title: "Аналитика — Алмас Касымжанов",
  description: "Исследования ниш, рынков и категорий маркетплейсов.",
};
export default function AnalyticsPage() {
  return <SectionFront locale="ru" eyebrow="Исследования" title="Аналитика"
    description="Исследования ниш, рынков и категорий маркетплейсов."
    articles={getPublishedArticles("ru").filter((article) => article.href.startsWith("/reports/"))} />;
}
