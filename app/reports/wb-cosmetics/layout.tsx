import { PersonalDocument } from "@/components/personal-document";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Рынок «Красота» на Wildberries — Enterprise-аналитика",
  description:
    "Полный аналитический отчёт рынка «Красота» на Wildberries: 930K+ активных SKU, 64.7K брендов, тренды, ценовые сегменты, анализ клиентских брендов.",
};

export default function WBCosmeticsLayout({ children }: { children: React.ReactNode }) {
  return <PersonalDocument report>{children}</PersonalDocument>;
}
