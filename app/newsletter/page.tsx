import type { Metadata } from "next";
import { personalMetadata } from "@/lib/site-metadata";
import { NewsletterLanding } from "@/components/newsletter-landing";

export const metadata: Metadata = { ...personalMetadata("Рассылка — Алмас Касымжанов", "Новые статьи о технологиях, маркетплейсах и продуктах, которые я развиваю.", "/newsletter"), alternates: { canonical: "/newsletter", languages: { "ru-RU": "/newsletter", "en-US": "/en/newsletter", "x-default": "/newsletter" } } };
export default function NewsletterPage() { return <NewsletterLanding locale="ru" />; }
