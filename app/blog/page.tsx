import type { Metadata } from "next";
import { SectionFront } from "@/components/section-front";
import { getPublishedArticles } from "@/components/articles";

export const metadata: Metadata = {
  title: "Статьи | Алмас Касымжанов",
  description: "Мои статьи и исследования о маркетплейсах, продуктах, технологиях и экономике.",
  alternates: { canonical: "https://kasymzhanov.com/blog" },
};

export default function BlogPage() {
  return (
    <SectionFront
      locale="ru"
      eyebrow="Архив"
      title="Статьи"
      description="Здесь я собираю статьи и исследования о маркетплейсах, продуктах, технологиях и экономике. Новые материалы находятся сверху."
      articles={getPublishedArticles()}
    />
  );
}
