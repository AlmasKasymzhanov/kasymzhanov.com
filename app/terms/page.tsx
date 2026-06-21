import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { LegalDoc } from "@/components/canon/legal-doc";

export const metadata: Metadata = {
  title: "Публичная оферта — Almas Kasymzhanov",
  description:
    "Публичная оферта (Terms of Service) kasymzhanov.com: подписка, оплата через Kaspi, возвраты, права и реквизиты (RU/EN).",
};

export default function TermsPage() {
  const md = fs.readFileSync(
    path.join(process.cwd(), "legal", "terms-of-service.md"),
    "utf8",
  );

  return <LegalDoc md={md} kicker="Правовые документы" enAnchor="terms-english" />;
}
