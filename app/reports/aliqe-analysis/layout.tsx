import { PersonalDocument } from "@/components/personal-document";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "A-LIQE на Kaspi.kz — Enterprise анализ портфеля 13 SKU",
  description:
    "Полный продуктовый разбор бренда A-LIQE: все 13 позиций, конкуренты, сегменты, отзывы, YoY динамика, рекомендации KEEP/FIX/DROP и план действий.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <PersonalDocument report>{children}</PersonalDocument>;
}
