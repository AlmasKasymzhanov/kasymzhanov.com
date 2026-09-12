import { PersonalDocument } from "@/components/personal-document";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kaspi Product Selection — Enterprise-аналитика для входа на маркетплейс",
  description:
    "Полный аналитический отчёт: подбор товаров для Kaspi.kz. Анализ 73 000+ ниш, отзывы, ценовые сегменты, бренд-сплит, МКТУ, стратегия входа. Бюджет 5-7M KZT.",
};

export default function KaspiProductSelectionLayout({ children }: { children: React.ReactNode }) {
  return <PersonalDocument report>{children}</PersonalDocument>;
}
