import { PersonalDocument } from "@/components/personal-document";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "WB Niche Analyzer — Almas Kasymzhanov",
  description: "Анализ ниш Wildberries по данным MPStats. Скоринг, фильтры, экспорт.",
};

export default function WbAnalyzerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PersonalDocument report>{children}</PersonalDocument>;
}
