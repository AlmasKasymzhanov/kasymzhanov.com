import { PersonalDocument } from "@/components/personal-document";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MPStats API Гайд — Работа с данными Wildberries",
  description:
    "Пошаговый гайд по MPStats API: что такое API, как выгружать данные WB, готовые скрипты для Hoppscotch.",
};

export default function ApiGuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PersonalDocument report>{children}</PersonalDocument>;
}
