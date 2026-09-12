"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localeFromPathname, dict } from "@/lib/i18n";
import { PUBLICATION_NAV_ITEMS } from "@/lib/publication-nav";

export function HeaderNav() {
  const pathname = usePathname() ?? "/";
  const locale = localeFromPathname(pathname);
  const t = dict[locale].nav;
  const prefix = locale === "en" ? "/en" : "";

  return (
    <nav className="flex items-center gap-1" aria-label="Main navigation">
      {PUBLICATION_NAV_ITEMS.map((item) => {
        const href = `${prefix}${item.href}`;
        const isActive = pathname === href || pathname.startsWith(`${href}/`);
        return (
          <Link
            key={item.key}
            href={href}
            aria-current={isActive ? "page" : undefined}
            className={`relative px-3 py-2 text-[12px] font-medium uppercase tracking-[0.08em] no-underline transition-colors ${
              isActive ? "text-[var(--color-brand)]" : "text-[var(--color-dim)] hover:text-[var(--color-text)]"
            }`}
          >
            {t[item.key]}
            {isActive && <span className="absolute bottom-[-1px] left-3 right-3 h-px bg-[var(--color-brand)]" />}
          </Link>
        );
      })}
    </nav>
  );
}
