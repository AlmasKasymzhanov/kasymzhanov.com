import type { Metadata } from "next";
import { ArticleJsonLd } from "@/components/articles";

const title = "Государство закрыло статистику. Рынок открыл канистру | Almas Kasymzhanov";
const description =
  "Дефицит топлива в России нельзя объявить — но его можно посчитать. Дата-разбор: как продажи пустых канистр на Wildberries стали честным барометром кризиса, когда официальная статистика погасла.";
const image = "/blog/russia-fuel-jerrycan/cover.webp";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "https://kasymzhanov.com/blog/russia-fuel-jerrycan",
    languages: {
      "ru-RU": "https://kasymzhanov.com/blog/russia-fuel-jerrycan",
      "en-US": "https://kasymzhanov.com/en/blog/russia-fuel-jerrycan",
    },
  },
  openGraph: {
    title,
    description,
    url: "https://kasymzhanov.com/blog/russia-fuel-jerrycan",
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
      <ArticleJsonLd slug="russia-fuel-jerrycan" description={description} />
    </>
  );
}
