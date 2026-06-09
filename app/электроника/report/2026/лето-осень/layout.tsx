import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Электроника на Kaspi: лето-осень 2026 — что запускать",
  description:
    "Enterprise-отчёт по электронике, бытовой и кухонной технике на Kaspi.kz для запуска в июле-сентябре 2026. Сезонные паттерны, прогноз, топ-30 ниш, разбор отзывов, рекомендации по улучшениям.",
};

export default function ElectronicaReportLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
