import type { Metadata } from "next";
import { ArticleJsonLd } from "@/components/articles";

const title = "Кремний на угле | Almas Kasymzhanov";
const description =
  "Казахстан подписал с NVIDIA и Firebird соглашения на $10 млрд: дата-центр для ИИ в Экибастузе запитают углём. Разбор на данных — что подписали, чем заплатят и где этот фильм уже показывали.";
const image = "/blog/nvidia-kazakhstan/cover.webp";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "https://kasymzhanov.com/blog/nvidia-kazakhstan" },
  openGraph: {
    title,
    description,
    url: "https://kasymzhanov.com/blog/nvidia-kazakhstan",
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
      <ArticleJsonLd slug="nvidia-kazakhstan" description={description} />
    </>
  );
}
