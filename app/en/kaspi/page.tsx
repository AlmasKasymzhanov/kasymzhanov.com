import type { Metadata } from "next";
import { KaspiMarketPage } from "@/components/kaspi-market-page";

export const metadata: Metadata = {
  title: "Kaspi Market — independent analytics",
  description: "Category, product, demand, and competition analytics for current sellers and those preparing to enter Kaspi.",
  alternates: { canonical: "/en/kaspi", languages: { "ru-RU": "/kaspi", "en-US": "/en/kaspi", "x-default": "/kaspi" } },
};

export default function KaspiPageEn() {
  return <KaspiMarketPage locale="en" />;
}
