import { PersonalDocument } from "@/components/personal-document";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Одежда на Kaspi.kz — Аналитический отчёт",
  description:
    "Рынок одежды на Kaspi.kz: 73.5 млрд ₸/год, 14M заказов, рост ×2.2. Данные агрегированные данные Kaspi.kz, 2025–2026.",
};

export default function ClothingLayout({ children }: { children: React.ReactNode }) {
  return <PersonalDocument report>{children}</PersonalDocument>;
}
