import type { Metadata } from "next";
import { ArticleJsonLd } from "@/components/articles";

const title = "Lick Beauty: семь миллионов против четырёхсот двадцати | Almas Kasymzhanov";
const description =
  "7 млн подписчиков, блески для губ, 3.3 млн тенге выручки. Разбираем на данных, почему бренды блогеров умирают после запуска.";
const image = "/blog/why-blogger-brands-fail/likbeauty.webp";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "https://kasymzhanov.com/blog/why-blogger-brands-fail" },
  openGraph: {
    title,
    description,
    url: "https://kasymzhanov.com/blog/why-blogger-brands-fail",
    type: "article",
    images: [image],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [image],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <ArticleJsonLd slug="why-blogger-brands-fail" description={description} />
    </>
  );
}
