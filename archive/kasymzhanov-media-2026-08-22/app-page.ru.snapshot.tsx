import type { Metadata } from "next";
import { PublicationHome } from "@/components/publication-home";

export const metadata: Metadata = {
  title: "Kasymzhanov · дата-медиа о рынках, экономике и технологиях",
  description:
    "Расследования, аналитика и дата-журналистика, которую можно проверить по цифрам. Автор: Алмас Касымжанов.",
  alternates: {
    canonical: "/",
    languages: { "ru-RU": "/", "en-US": "/en", "x-default": "/" },
  },
};

export const revalidate = 120;

export default function Home() {
  return <PublicationHome locale="ru" />;
}

