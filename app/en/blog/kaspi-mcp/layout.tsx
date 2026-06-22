import type { Metadata } from "next";
import { ArticleJsonLd } from "@/components/articles";

const title = "Lazy Arithmetic: How AI Mines Gold Out of Kaspi | Almas Kasymzhanov";
const description =
  "No spreadsheets, no dashboards. Stand up an AI analyst for Kaspi through an MCP connector and find profitable niches while you drink your coffee. Step by step, with screenshots, free.";
const image = "/blog/kaspi-mcp/mcp.webp";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "https://kasymzhanov.com/en/blog/kaspi-mcp",
    languages: {
      "ru-RU": "https://kasymzhanov.com/blog/kaspi-mcp",
      "en-US": "https://kasymzhanov.com/en/blog/kaspi-mcp",
    },
  },
  openGraph: {
    title,
    description,
    url: "https://kasymzhanov.com/en/blog/kaspi-mcp",
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
      <ArticleJsonLd slug="kaspi-mcp" description={description} locale="en" />
    </>
  );
}
