import type { Metadata } from "next";
import { personalMetadata, PERSONAL_DESCRIPTION_EN } from "@/lib/site-metadata";
import { PersonalHome } from "@/components/personal-home";

export const metadata: Metadata = {
  ...personalMetadata("Almas Kasymzhanov · personal website", PERSONAL_DESCRIPTION_EN, "/en"),
  alternates: { canonical: "/en", languages: { "ru-RU": "/", "en-US": "/en", "x-default": "/" } },
};

export const revalidate = 120;

export default function HomeEn() {
  return <PersonalHome locale="en" />;
}
