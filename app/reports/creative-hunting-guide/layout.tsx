import { PersonalDocument } from "@/components/personal-document";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Гайд: поиск трендовых креативов для внешнего трафика на Kaspi",
  description:
    "Пошаговая инструкция: как найти залетевшие видео через библиотеки рекламных креативов, TikTok Creative Center, Facebook Ads Library, ShopHunter. Адаптация под свой бренд + deeplink через Mobs.io на Kaspi.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <PersonalDocument report>{children}</PersonalDocument>;
}
