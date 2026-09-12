import type { Metadata } from "next";
import { PersonalHome } from "@/components/personal-home";

export const metadata: Metadata = {
  title: "Almas Kasymzhanov · personal website",
  description: "I build products and write about marketplaces, technology, business, and market research.",
  alternates: {
    canonical: "/en",
    languages: { "ru-RU": "/", "en-US": "/en", "x-default": "/" },
  },
  openGraph: {
    title: "Almas Kasymzhanov · personal website",
    description: "Products, writing, and research by Almas Kasymzhanov.",
    url: "https://kasymzhanov.com/en",
    locale: "en_US",
  },
};

export const revalidate = 120;

export default function HomeEn() {
  return <PersonalHome locale="en" />;
}
