"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { PersonalNavTree } from "@/components/personal-nav-tree";
import { ThemeToggle } from "@/components/theme-toggle";
import type { PersonalLocale } from "@/lib/personal-locale";

const LANGUAGES: { locale: PersonalLocale; label: string; href: string; hrefLang: string }[] = [
  { locale: "ru", label: "RU", href: "/", hrefLang: "ru" },
  { locale: "en", label: "EN", href: "/en", hrefLang: "en" },
];

function PersonalLanguageSwitcher({ locale }: { locale: PersonalLocale }) {
  const label = locale === "en" ? "Language" : locale === "kz" ? "Тіл" : "Язык";

  return (
    <nav aria-label={label}>
      <ul className="inline-flex items-center gap-1">
        {LANGUAGES.map((language) => {
          const active = language.locale === locale;
          return (
            <li key={language.locale} className="shrink-0">
              <Link
                href={language.href}
                hrefLang={language.hrefLang}
                aria-current={active ? "page" : undefined}
                className={`grid size-7 place-items-center rounded-[3px] font-mono text-[10px] leading-none no-underline transition-colors duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--personal-rail-focus)] ${
                  active
                    ? "font-medium text-[var(--personal-rail-text)]"
                    : "font-normal text-[var(--personal-rail-muted)] hover:bg-[var(--personal-rail-hover)] hover:text-[var(--personal-rail-text)]"
                }`}
              >
                {language.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function PersonalSidebar({ locale }: { locale: PersonalLocale }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const homeHref = locale === "en" ? "/en" : locale === "kz" ? "/kz" : "/";
  const menuLabel = locale === "en" ? "Menu" : locale === "kz" ? "Мәзір" : "Меню";
  const menuAction = mobileOpen
    ? locale === "en" ? "close" : locale === "kz" ? "жабу" : "закрыть"
    : locale === "en" ? "open" : locale === "kz" ? "ашу" : "открыть";

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <aside className="personal-rail relative z-40 min-w-0 bg-[var(--personal-rail)] lg:sticky lg:top-0 lg:h-dvh lg:self-start">
      <div className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-[var(--personal-rail-border)] bg-[var(--personal-rail)] px-5 lg:hidden">
        <Link
          href={homeHref}
          className="font-mono text-[12px] font-medium text-[var(--personal-rail-text)] no-underline"
        >
          kasymzhanov.com
        </Link>
        <button
          type="button"
          aria-expanded={mobileOpen}
          aria-controls="personal-mobile-menu"
          aria-label={`${menuLabel}: ${menuAction}`}
          onClick={() => setMobileOpen((value) => !value)}
          className="grid size-11 place-items-center text-[var(--personal-rail-text)] focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[var(--personal-rail-focus)]"
        >
          <span aria-hidden className="relative block h-3.5 w-5">
            <span className={`absolute left-0 top-0 h-px w-5 bg-current transition-transform duration-150 motion-reduce:transition-none ${mobileOpen ? "translate-y-[6px] rotate-45" : ""}`} />
            <span className={`absolute left-0 top-[6px] h-px w-5 bg-current transition-opacity duration-150 motion-reduce:transition-none ${mobileOpen ? "opacity-0" : "opacity-100"}`} />
            <span className={`absolute bottom-0 left-0 h-px w-5 bg-current transition-transform duration-150 motion-reduce:transition-none ${mobileOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
          </span>
        </button>
      </div>

      <div
        id="personal-mobile-menu"
        className={`${mobileOpen ? "flex" : "hidden"} absolute left-0 right-0 top-14 max-h-[calc(100dvh-3.5rem)] min-w-0 flex-col overflow-y-auto border-b border-[var(--personal-rail-border)] bg-[var(--personal-rail)] px-5 py-6 sm:px-7 lg:static lg:flex lg:h-dvh lg:max-h-none lg:overflow-visible lg:border-b-0 lg:px-7 lg:py-10`}
      >
        <div className="personal-nav-rail min-w-0 lg:min-h-0 lg:flex-1 lg:overflow-y-auto lg:overscroll-y-contain">
          <PersonalNavTree locale={locale} />
        </div>

        <div className="mt-8 flex shrink-0 flex-col items-start gap-2 lg:mt-6">
          <PersonalLanguageSwitcher locale={locale} />
          <ThemeToggle tone="neutral" locale={locale} />
        </div>
      </div>
    </aside>
  );
}
