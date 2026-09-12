import { PersonalDocument } from "@/components/personal-document";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enterprise-анализ: Полотенцесушители на Wildberries — точка входа",
  description:
    "Полный разбор ниши электрических полотенцесушителей на Wildberries: 600М ₽/год, конкуренция, unit-экономика двух моделей, стратегия дифференциации, сезонность, рекомендации по входу.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <PersonalDocument report>{children}</PersonalDocument>;
}
