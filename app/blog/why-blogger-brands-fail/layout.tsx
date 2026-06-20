import type { Metadata } from "next";

const title = "Lick Beauty: семь миллионов против четырёхсот двадцати | Almas Kasymzhanov";
const description =
  "7 млн подписчиков, блески для губ, 3.3 млн тенге выручки. Разбираем на данных, почему бренды блогеров умирают после запуска.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: "https://kasymzhanov.com/blog/why-blogger-brands-fail",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
