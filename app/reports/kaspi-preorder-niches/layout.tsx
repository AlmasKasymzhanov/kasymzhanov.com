import { PersonalDocument } from "@/components/personal-document";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enterprise-анализ 28 SKU для запуска по Предзаказу на Kaspi.kz",
  description:
    "Детальный разбор 28 товаров с Kaspi.kz через линзу модели Предзаказа: анализ 6 ниш (степперы, беговые, стулья, подушки, аэрогрили, WAX-нагреватели), вердикт по каждому SKU, рекомендации на 1688, чек-лист запуска 2026.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <PersonalDocument report>{children}</PersonalDocument>;
}
