import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { LegalDoc } from "@/components/canon/legal-doc";

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

  return <LegalDoc md={md} kicker="Правовые документы" enAnchor="privacy-policy-english" />;
}
