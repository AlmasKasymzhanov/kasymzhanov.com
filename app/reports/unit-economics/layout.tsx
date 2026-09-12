import { PersonalDocument } from "@/components/personal-document";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Юнит-экономика — Чемоданы и степперы для Kaspi.kz",
  description:
    "Детальный расчёт себестоимости, маржи и прибыли на единицу по 4 товарным позициям (1688 → Kaspi). Карго, таможня, комиссии, целевые цены, сценарии бюджета.",
};

export default function UnitEconomicsLayout({ children }: { children: React.ReactNode }) {
  return <PersonalDocument report>{children}</PersonalDocument>;
}
