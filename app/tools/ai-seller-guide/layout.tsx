import { PersonalDocument } from "@/components/personal-document";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI для селлеров — NotebookLM + Claude: полный гайд",
  description:
    "Как связать NotebookLM и Claude для анализа маркетплейсов. База знаний + AI-аналитик: установка, настройка MCP, практические примеры.",
};

export default function AiSellerGuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PersonalDocument report>{children}</PersonalDocument>;
}
