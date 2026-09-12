import { PersonalDocument } from "@/components/personal-document";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "3 ниши Kaspi.kz: текстиль, мебель, вертикальные пылесосы — Enterprise-анализ",
  description:
    "Детальный enterprise-анализ трёх ниш Kaspi.kz за февраль 2026: домашний текстиль (2.84B ₸, +40% YoY), мебель (14.63B ₸, +32%), вертикальные пылесосы (0.70B ₸, DREAME 57%). Динамика, бренды, топ-SKU, отзывы, рекомендации входа.",
};

export default function ThreeNichesLayout({ children }: { children: React.ReactNode }) {
  return <PersonalDocument report>{children}</PersonalDocument>;
}
