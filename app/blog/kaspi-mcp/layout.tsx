import type { Metadata } from "next";

const title = "Прибыльная ниша на Kaspi за 5 минут | Almas Kasymzhanov";
const description =
  "Без таблиц, дашбордов и платных сервисов. Как развернуть AI-аналитика Kaspi.kz прямо в телефоне через MCP-коннектор — пошагово, со скриншотами, бесплатно.";

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
