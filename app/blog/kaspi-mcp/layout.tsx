import type { Metadata } from "next";

const title = "Арифметика лени: как AI добывает золото из Kaspi | Almas Kasymzhanov";
const description =
  "Без таблиц и дашбордов. Как развернуть AI-аналитика Kaspi через MCP-коннектор и находить прибыльные ниши, пока вы пьёте кофе. Пошагово, со скриншотами, бесплатно.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: "https://akasymzhanov.com/blog/kaspi-mcp",
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
