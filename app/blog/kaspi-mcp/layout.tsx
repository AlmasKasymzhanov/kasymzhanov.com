import type { Metadata } from "next";
import { ArticleJsonLd } from "@/components/articles";

const title = "Арифметика лени: как AI добывает золото из Kaspi | Алмас Касымжанов";
const description =
  "Без таблиц и дашбордов. Как развернуть AI-аналитика Kaspi через MCP-коннектор и находить прибыльные ниши, пока вы пьёте кофе. Пошагово, со скриншотами, бесплатно.";
const image = "/blog/kaspi-mcp/mcp.webp";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "https://kasymzhanov.com/blog/kaspi-mcp",
    languages: {
      "ru-RU": "https://kasymzhanov.com/blog/kaspi-mcp",
      "en-US": "https://kasymzhanov.com/en/blog/kaspi-mcp",
    },
  },
  openGraph: {
    title,
    description,
    url: "https://kasymzhanov.com/blog/kaspi-mcp",
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
      <ArticleJsonLd slug="kaspi-mcp" description={description} />
    </>
  );
}
