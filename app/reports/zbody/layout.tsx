import { PersonalDocument } from "@/components/personal-document";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ZBODY — Enterprise Phygital Brand Strategy",
  description:
    "Стратегия создания Phygital-бренда ZBody: HealthTech + E-commerce экосистема. ₸117M выручка Год 1, 25K загрузок, LTV/CAC 8.4.",
};

export default function ZBodyLayout({ children }: { children: React.ReactNode }) {
  return <PersonalDocument report>{children}</PersonalDocument>;
}
