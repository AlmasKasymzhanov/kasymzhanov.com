import type { Metadata } from "next";
import { personalMetadata } from "@/lib/site-metadata";
import { EditorialStandardsPage } from "@/components/editorial-standards-page";

export const metadata: Metadata = { ...personalMetadata("Как я работаю с данными — Алмас Касымжанов", "Источники, методология, конфликты интересов, AI и исправления в личном блоге Алмаса Касымжанова.", "/standards"), alternates: { canonical: "/standards", languages: { "ru-RU": "/standards", "en-US": "/en/standards", "x-default": "/standards" } } };
export default function StandardsPage() { return <EditorialStandardsPage locale="ru" />; }
