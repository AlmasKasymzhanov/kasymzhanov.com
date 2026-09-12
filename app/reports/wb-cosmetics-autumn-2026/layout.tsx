import { PersonalDocument } from "@/components/personal-document";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Какие ниши косметики запускать на Wildberries осенью 2026",
  description: "Проверка 154 подкатегорий косметики: спрос, осенний тайминг, конкуренция, остатки, отзывы и план запуска.",
  alternates: {
    canonical: "https://kasymzhanov.com/reports/wb-cosmetics-autumn-2026",
  },
  robots: { index: false, follow: false },
  openGraph: {
    title: "Что запускать осенью в косметике",
    description: "154 подкатегории Wildberries, 0 готовых ниш и 2 направления для теста.",
    url: "https://kasymzhanov.com/reports/wb-cosmetics-autumn-2026",
    siteName: "kasymzhanov.com",
    locale: "ru_RU",
    type: "article",
    publishedTime: "2026-07-24T00:00:00+05:00",
    images: [{
      url: "https://kasymzhanov.com/reports/wb-cosmetics-autumn-2026/og.png",
      width: 1734,
      height: 907,
      alt: "Что запускать осенью в косметике — анализ 154 подкатегорий Wildberries",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Что запускать осенью в косметике",
    description: "154 подкатегории Wildberries, 0 готовых ниш и 2 направления для теста.",
    images: ["https://kasymzhanov.com/reports/wb-cosmetics-autumn-2026/og.png"],
  },
};

export default function WBCosmeticsAutumnLayout({ children }: { children: React.ReactNode }) {
  return <PersonalDocument report>{children}</PersonalDocument>;
}
