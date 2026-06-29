import type { Metadata } from "next";
import { ArticleJsonLd } from "@/components/articles";

const title = "The State Closed the Statistics. The Market Opened a Jerrycan | Almas Kasymzhanov";
const description =
  "Russia's fuel shortage can't be announced — but it can be counted. A data breakdown: how sales of empty jerrycans on Wildberries became an honest barometer of the crisis once the official statistics went dark.";
const image = "/blog/russia-fuel-jerrycan/cover-en.webp";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "https://kasymzhanov.com/en/blog/russia-fuel-jerrycan",
    languages: {
      "ru-RU": "https://kasymzhanov.com/blog/russia-fuel-jerrycan",
      "en-US": "https://kasymzhanov.com/en/blog/russia-fuel-jerrycan",
    },
  },
  openGraph: {
    title,
    description,
    url: "https://kasymzhanov.com/en/blog/russia-fuel-jerrycan",
    type: "article",
    locale: "en_US",
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
      <ArticleJsonLd slug="russia-fuel-jerrycan" description={description} locale="en" />
    </>
  );
}
