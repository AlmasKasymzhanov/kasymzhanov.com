import { PersonalDocument } from "@/components/personal-document";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Стратегические рекомендации — Beauty-портфель на Kaspi и Wildberries",
  description:
    "Финальный стратегический отчёт: приоритизация 21 бренда, каналы продаж, сезонная стратегия, ценовая политика, план действий по кварталам. На основе агрегированных данных Kaspi и Wildberries.",
};

export default function StrategyLayout({ children }: { children: React.ReactNode }) {
  return <PersonalDocument report>{children}</PersonalDocument>;
}
