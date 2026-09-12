import type { Metadata } from "next";
import { KaspiMarketPage } from "@/components/kaspi-market-page";

export const metadata: Metadata = {
  title: "Kaspi Market — аналитика рынка Kaspi",
  description: "Аналитика категорий, товаров, спроса и конкуренции для действующих продавцов и тех, кто планирует выходить на Kaspi.",
  alternates: { canonical: "/kaspi", languages: { "ru-RU": "/kaspi", "en-US": "/en/kaspi", "x-default": "/kaspi" } },
};

export default function KaspiPage() {
  return <KaspiMarketPage locale="ru" />;
}
