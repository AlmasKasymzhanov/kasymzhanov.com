import { PersonalDocument } from "@/components/personal-document";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Сезонные ниши Kaspi.kz: рынок, продавцы, план обзвона — RedStat",
  description:
    "Клиентский отчёт RedStat: рынок новогодних и сезонных товаров на Kaspi.kz, база продавцов и календарь обзвона под сезон 2026/27.",
  // Клиентская страница: доступна по прямой ссылке, в поиске не участвует.
  robots: { index: false, follow: false },
};

export default function ClientReportLayout({ children }: { children: React.ReactNode }) {
  return <PersonalDocument report>{children}</PersonalDocument>;
}
