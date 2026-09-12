import { PersonalDocument } from "@/components/personal-document";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BG Optic — Аналитический отчёт: Выход на Kaspi.kz с оптикой",
  description:
    "Enterprise-отчёт для BG Optic: анализ 3 сегментов оптики на Kaspi.kz — солнцезащитные, для зрения, смарт-очки. Данные агрегированные данные Kaspi.kz, январь 2026.",
};

export default function BgOpticLayout({ children }: { children: React.ReactNode }) {
  return <PersonalDocument report>{children}</PersonalDocument>;
}
