import type { Metadata } from "next";
import { personalMetadata, PERSONAL_DESCRIPTION } from "@/lib/site-metadata";
import { PersonalHome } from "@/components/personal-home";

export const metadata: Metadata = {
  ...personalMetadata("Алмас Касымжанов · личный сайт", PERSONAL_DESCRIPTION, "/"),
  alternates: { canonical: "/", languages: { "ru-RU": "/", "en-US": "/en", "x-default": "/" } },
};

export const revalidate = 120;

export default function Home() {
  return <PersonalHome locale="ru" />;
}
