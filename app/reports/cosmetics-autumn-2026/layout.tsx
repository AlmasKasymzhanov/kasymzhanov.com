import { PersonalDocument } from "@/components/personal-document";
import type { Metadata } from "next";

const title = "Что запускать в косметике на Kaspi.kz осенью 2026";
const description =
  "Подробный разбор рынка косметики Kaspi.kz: категории, отзывы, цены, выбор первых продуктов, сроки запуска и экономика одной продажи.";

export const metadata: Metadata = {
  title: `${title} — Алмас Касымжанов`,
  description,
  alternates: {
    canonical: "https://kasymzhanov.com/reports/cosmetics-autumn-2026",
  },
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      noarchive: true,
      noimageindex: true,
    },
  },
  openGraph: {
    title,
    description,
    type: "article",
    locale: "ru_RU",
    url: "https://kasymzhanov.com/reports/cosmetics-autumn-2026",
    siteName: "Алмас Касымжанов",
  },
  twitter: {
    card: "summary",
    title,
    description,
  },
};

export default function CosmeticsAutumn2026Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <PersonalDocument report>{children}</PersonalDocument>;
}
