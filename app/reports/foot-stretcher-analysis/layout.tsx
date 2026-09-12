import { PersonalDocument } from "@/components/personal-document";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enterprise-анализ: Тренажёр для растяжки подъёма стопы — WB + Kaspi",
  description:
    "Полный разбор микро-ниши «тренажёр для растяжки подъёма стопы» на Wildberries и Kaspi.kz: юнит-экономика, сезонность, стратегия дифференциации, сравнение каналов, рекомендации по входу.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <PersonalDocument report>{children}</PersonalDocument>;
}
