"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { bcp47, localeFromPathname } from "@/lib/i18n";

/*
 * Keeps <html lang> in sync with the route locale on the client. The root
 * layout SSR-renders lang="ru"; on an /en route (or after a RU↔EN toggle) this
 * corrects it to "en". The authoritative SEO signals are the per-page hreflang
 * `alternates` + og:locale; this is the a11y/UX complement.
 */
export function HtmlLang() {
  const pathname = usePathname() ?? "/";
  useEffect(() => {
    document.documentElement.lang = bcp47[localeFromPathname(pathname)];
  }, [pathname]);
  return null;
}
