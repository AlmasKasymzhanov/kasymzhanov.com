import type { Metadata } from "next";
import { PersonalHome } from "@/components/personal-home";

export const metadata: Metadata = {
  title: "Алмас Касымжанов · личный сайт",
  description:
    "Я строю продукты и пишу о маркетплейсах, технологиях, бизнесе и исследованиях рынков.",
  alternates: {
    canonical: "/",
    languages: { "ru-RU": "/", "en-US": "/en", "x-default": "/" },
  },
};

export const revalidate = 120;

export default function Home() {
  return <PersonalHome locale="ru" />;
}
