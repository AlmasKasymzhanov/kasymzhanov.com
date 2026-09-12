import type { Metadata } from "next";
import { personalMetadata } from "@/lib/site-metadata";
import { NewsletterLanding } from "@/components/newsletter-landing";

export const metadata: Metadata = { ...personalMetadata("Newsletter — Almas Kasymzhanov", "New posts about technology, marketplaces, and the products I am building.", "/en/newsletter"), alternates: { canonical: "/en/newsletter", languages: { "ru-RU": "/newsletter", "en-US": "/en/newsletter", "x-default": "/newsletter" } } };
export default function NewsletterPageEn() { return <NewsletterLanding locale="en" />; }
