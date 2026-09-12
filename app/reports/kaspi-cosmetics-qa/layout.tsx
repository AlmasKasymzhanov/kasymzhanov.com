import { PersonalDocument } from "@/components/personal-document";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ответы на вопросы — Аналитика рынка косметики Kaspi.kz",
  description: "Детальные ответы на вопросы по аналитическому отчёту: лидеры ниш, конкретные бренды, SKU, динамика.",
};

export default function QALayout({ children }: { children: React.ReactNode }) {
  return <PersonalDocument report>{children}</PersonalDocument>;
}
