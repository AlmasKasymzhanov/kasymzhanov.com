import { PersonalDocument } from "@/components/personal-document";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Анализ портфеля 21 бренда на Kaspi.kz — Enterprise-аналитика",
  description:
    "Детальный разбор 21 бренда: позиции на рынке, выручка, SKU, отзывы покупателей, динамика 16 месяцев, конкуренты, ценовая стратегия, рекомендации по продвижению.",
};

export default function BrandPortfolioLayout({ children }: { children: React.ReactNode }) {
  return <PersonalDocument report>{children}</PersonalDocument>;
}
