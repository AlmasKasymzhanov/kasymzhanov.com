import type { Metadata } from "next";
import { personalMetadata } from "@/lib/site-metadata";
import { EditorialStandardsPage } from "@/components/editorial-standards-page";

export const metadata: Metadata = { ...personalMetadata("How I work with data — Almas Kasymzhanov", "Sources, methodology, conflicts, AI use, and corrections on my personal blog.", "/en/standards"), alternates: { canonical: "/en/standards", languages: { "ru-RU": "/standards", "en-US": "/en/standards", "x-default": "/standards" } } };
export default function StandardsPageEn() { return <EditorialStandardsPage locale="en" />; }
