import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Публичная оферта — Almas Kasymzhanov",
  description:
    "Публичная оферта (Terms of Service) akasymzhanov.com: подписка, оплата через Kaspi, возвраты, права и реквизиты (RU/EN).",
};

export default function TermsPage() {
  const md = fs.readFileSync(
    path.join(process.cwd(), "legal", "terms-of-service.md"),
    "utf8",
  );

  return (
    <article className="max-w-3xl mx-auto px-6 py-16">
      <Link
        href="/"
        className="text-sm text-dim hover:text-accent transition-colors no-underline mb-8 inline-block"
      >
        ← На главную
      </Link>

      <div className="prose prose-invert max-w-none prose-table:text-sm prose-th:text-left">
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
          {md}
        </ReactMarkdown>
      </div>
    </article>
  );
}
