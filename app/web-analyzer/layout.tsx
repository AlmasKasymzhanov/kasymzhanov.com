import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "WB Niche Analyzer — Almas Kasymzhanov",
  description:
    "Анализ ниш Wildberries на актуальных данных MPStats: скоринг, фильтры, экспорт. Данные подгружаются автоматически.",
};

export default function WebAnalyzerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
