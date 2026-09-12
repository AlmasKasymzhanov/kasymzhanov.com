import type { Metadata } from "next";

export const PERSONAL_DESCRIPTION = "Личный блог Алмаса Касымжанова. Предприниматель и аналитик, основатель Redstat, 10b и ProofTotal. Пишу о технологиях, продуктах и маркетплейсах.";
export const PERSONAL_DESCRIPTION_EN = "Almas Kasymzhanov’s personal blog. Entrepreneur, analyst, and founder of Redstat, 10b and ProofTotal. Writing about technology, products and marketplaces.";

/** Keep search snippets and shared-link previews consistent on public entry pages. */
export function personalMetadata(title: string, description: string, pathname: string): Metadata {
  const en = pathname === "/en" || pathname.startsWith("/en/");
  return {
    title,
    description,
    alternates: { canonical: pathname },
    openGraph: { title, description, url: pathname, siteName: "kasymzhanov.com", locale: en ? "en_US" : "ru_RU", type: "website" },
    twitter: { card: "summary_large_image", title, description, creator: "@akasymzhanov" },
  };
}
