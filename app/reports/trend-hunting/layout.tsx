import { PersonalDocument } from "@/components/personal-document";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Поиск трендовых товаров — Enterprise-гайд 2026",
  description:
    "Полный гайд по поиску трендовых товаров и новинок: Amazon, Kaspi, Wildberries, TikTok, Shopify. Инструменты, методы, воронка валидации.",
};

export default function TrendHuntingLayout({ children }: { children: React.ReactNode }) {
  return <PersonalDocument report>{children}</PersonalDocument>;
}
