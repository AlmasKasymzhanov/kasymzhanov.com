import type { Metadata } from "next";
import { ArticleJsonLd } from "@/components/articles";

const title = "Маркетплейс умер. Он вам позвонит | Алмас Касымжанов";
const description =
  "Как Freedom Тимура Турлова покупает площадку, которая не платила людям, зачем холдингу воскрешать её под своим именем - и почему у Kaspi впервые за десять лет появился соперник, которому есть чем ответить.";
const image = "/blog/freedom-market/cover.webp";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "https://kasymzhanov.com/blog/freedom-market",
    languages: {
      "ru-RU": "https://kasymzhanov.com/blog/freedom-market",
      "en-US": "https://kasymzhanov.com/en/blog/freedom-market",
    },
  },
  openGraph: {
    title,
    description,
    url: "https://kasymzhanov.com/blog/freedom-market",
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
      {/* Renders nothing until the article is added to ARTICLES (front-page rollout). */}
      <ArticleJsonLd slug="freedom-market" description={description} />
    </>
  );
}
