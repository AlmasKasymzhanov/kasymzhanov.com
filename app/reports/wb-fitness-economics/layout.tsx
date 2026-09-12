import { PersonalDocument } from "@/components/personal-document";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Юнит-экономика — Фитнес-товары для Wildberries",
  description:
    "Расчёт себестоимости и маржи фитнес-набора (йога-ролик, массажный мяч, резинки) для продажи на Wildberries. Закупка 1688, FBO Россия.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <PersonalDocument report>{children}</PersonalDocument>;
}
