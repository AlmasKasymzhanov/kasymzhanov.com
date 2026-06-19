import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Политика конфиденциальности — Almas Kasymzhanov",
  description:
    "Политика конфиденциальности kasymzhanov.com: какие данные собираются, Google Sign-In, cookies, права субъекта данных (RU/EN). Privacy Policy.",
};

export default function PrivacyPage() {
  const md = fs.readFileSync(
    path.join(process.cwd(), "legal", "privacy-policy.md"),
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
