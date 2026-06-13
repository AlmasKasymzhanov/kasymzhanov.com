import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Инструкция — WB Niche Analyzer",
  description:
    "Как анализировать ниши Wildberries: пошаговый гайд, стратегии для новичков, средних и крупных продавцов.",
};

export default function GuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
