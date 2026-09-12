import { PersonalDocument } from "@/components/personal-document";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Рынок «Красота и здоровье» на Kaspi.kz — Enterprise-аналитика",
  description:
    "Полный аналитический отчёт рынка «Красота и здоровье» на Kaspi.kz. TAM 612B KZT, 73 000+ ниш, 16 месяцев данных. Структура, сегменты, бренды, сезонность, YoY, инсайты и рекомендации.",
};

export default function BeautyMarketLayout({ children }: { children: React.ReactNode }) {
  return <PersonalDocument report>{children}</PersonalDocument>;
}
