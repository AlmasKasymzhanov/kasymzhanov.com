import { PersonalDocument } from "@/components/personal-document";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Разбор сезонного товара: Оптика на Kaspi.kz — аналитический отчёт",
  description:
    "Пример Enterprise-отчёта: анализ 3 сегментов оптики на Kaspi.kz — солнцезащитные, для зрения, смарт-очки. Данные агрегированные данные Kaspi.kz, январь 2026.",
};

export default function OpticsGuideLayout({ children }: { children: React.ReactNode }) {
  return <PersonalDocument report>{children}</PersonalDocument>;
}
