"use client";
import { IconlyArrowRight } from "@/components/iconly-icons";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { LangToggle } from "@/components/lang-toggle";
import { ThemeToggle } from "@/components/theme-toggle";
import { HeaderAuth } from "@/components/canon/header-auth";
import { localeFromPathname, dict } from "@/lib/i18n";
import { PUBLICATION_NAV_ITEMS } from "@/lib/publication-nav";

function MenuIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
      <path d="M3 6.5h18M3 12h18M3 17.5h18" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
      <path d="M5 5l14 14M19 5L5 19" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden>
      <circle cx="10.8" cy="10.8" r="6.8" />
      <path d="m16 16 4.5 4.5" />
    </svg>
  );
}

export function MobileTopicRail() {
  const pathname = usePathname() ?? "/";
  const locale = localeFromPathname(pathname);
  const prefix = locale === "en" ? "/en" : "";
  const t = dict[locale].nav;

  return (
    <nav className="publication-topic-rail border-t border-[var(--color-border)]" aria-label={locale === "en" ? "Topics" : "Рубрики"}>
      <div className="flex min-w-max items-center px-4">
        {PUBLICATION_NAV_ITEMS.map((item) => {
          const href = `${prefix}${item.href}`;
          const active = pathname === href || pathname.startsWith(`${href}/`);
          return (
            <Link
              key={item.key}
              href={href}
              aria-current={active ? "page" : undefined}
              className={`relative flex h-11 items-center whitespace-nowrap pr-6 font-mono text-[11px] font-medium uppercase tracking-[0.09em] no-underline last:pr-4 ${
                active ? "text-[var(--color-brand)]" : "text-[var(--color-text)]"
              }`}
            >
              {t[item.key]}
              {active && <span className="absolute inset-x-0 bottom-0 mr-6 h-0.5 bg-[var(--color-brand)] last:mr-4" />}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export function MobileMenu() {
  const pathname = usePathname() ?? "/";
  const locale = localeFromPathname(pathname);
  const prefix = locale === "en" ? "/en" : "";
  const t = dict[locale].nav;
  const titleId = useId();
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const closeMenu = useCallback((restoreFocus = true) => {
    setOpen(false);
    if (restoreFocus) requestAnimationFrame(() => triggerRef.current?.focus());
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => closeRef.current?.focus());

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;
      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => !element.hasAttribute("hidden"));
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [closeMenu, open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        className="grid size-11 shrink-0 place-items-center text-[var(--color-text)] transition-opacity hover:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--color-brand)]"
        aria-label={t.openMenu}
        aria-expanded={open}
        aria-controls={open ? `${titleId}-panel` : undefined}
      >
        <MenuIcon />
      </button>

      {open && (
        <div className="fixed inset-0 z-[100] xl:hidden">
          <button
            type="button"
            className="absolute inset-0 h-full w-full cursor-default bg-black/55"
            onClick={() => closeMenu()}
            aria-label={t.closeMenu}
            tabIndex={-1}
          />
          <div
            id={`${titleId}-panel`}
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="absolute inset-y-0 right-0 flex h-[100dvh] w-full flex-col overflow-hidden border-l border-[var(--color-border)] bg-[var(--color-bg)] shadow-2xl sm:w-[min(420px,92vw)]"
          >
            <div className="flex h-16 shrink-0 items-center justify-between border-b border-[var(--color-border)] px-4 sm:px-5">
              <p id={titleId} className="font-mono text-[13px] font-medium uppercase tracking-[0.14em]">
                {t.menu}
              </p>
              <button
                ref={closeRef}
                type="button"
                onClick={() => closeMenu()}
                className="grid size-11 place-items-center transition-opacity hover:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--color-brand)]"
                aria-label={t.closeMenu}
              >
                <CloseIcon />
              </button>
            </div>

            <form action={`${prefix}/search`} method="get" role="search" className="shrink-0 border-b border-[var(--color-border)] p-4 sm:p-5">
              <label className="flex h-12 items-center gap-3 border-b border-[var(--color-text)]" htmlFor={`${titleId}-search`}>
                <SearchIcon />
                <span className="sr-only">{t.search}</span>
                <input
                  id={`${titleId}-search`}
                  type="search"
                  name="q"
                  placeholder={t.search}
                  className="min-w-0 flex-1 bg-transparent font-body text-[16px] text-[var(--color-text)] outline-none placeholder:text-[var(--color-dim)]"
                />
                <button type="submit" className="h-11 px-2 font-mono text-[10px] font-medium uppercase tracking-[0.1em] text-[var(--color-brand)]">
                  {locale === "en" ? "Find" : "Найти"}
                </button>
              </label>
            </form>

            <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-5">
              <nav aria-label={locale === "en" ? "Mobile navigation" : "Мобильная навигация"}>
                <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--color-dim)]">
                  {locale === "en" ? "Topics" : "Темы"}
                </p>
                <div className="grid">
                  {PUBLICATION_NAV_ITEMS.map((item) => {
                    const href = `${prefix}${item.href}`;
                    const active = pathname === href || pathname.startsWith(`${href}/`);
                    return (
                      <Link
                        key={item.key}
                        href={href}
                        aria-current={active ? "page" : undefined}
                        className={`flex min-h-12 items-center justify-between border-b border-[var(--color-border)] py-3 text-[17px] font-medium no-underline ${
                          active ? "text-[var(--color-brand)]" : "text-[var(--color-text)]"
                        }`}
                      >
                        {t[item.key]}
                        <span aria-hidden className="font-mono text-[14px] font-normal text-[var(--color-dim)]"><IconlyArrowRight size={17} className="reading-inline-icon" /></span>
                      </Link>
                    );
                  })}
                </div>

                <p className="mb-2 mt-7 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--color-dim)]">
                  {locale === "en" ? "Publication" : "Издание"}
                </p>
                <div className="grid grid-cols-2 gap-x-5 gap-y-1">
                  <Link href={`${prefix}/newsletter`} className="flex min-h-11 items-center border-b border-[var(--color-border)] text-[13px] font-semibold no-underline">{t.newsletter}</Link>
                  <Link href={`${prefix || "/"}#about`} className="flex min-h-11 items-center border-b border-[var(--color-border)] text-[13px] font-semibold no-underline">{t.about}</Link>
                  <Link href={`${prefix}/tools`} className="flex min-h-11 items-center border-b border-[var(--color-border)] text-[13px] font-semibold no-underline">{t.practice}</Link>
                  <Link href={`${prefix}/standards`} className="flex min-h-11 items-center border-b border-[var(--color-border)] text-[13px] font-semibold no-underline">
                    {locale === "en" ? "Editorial standards" : "Редакционные стандарты"}
                  </Link>
                </div>
              </nav>
            </div>

            <div className="shrink-0 border-t border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-4 sm:px-5">
              <div className="grid gap-4">
                <div>
                  <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-dim)]">{t.lang}</p>
                  <LangToggle variant="panel" />
                </div>
                <div>
                  <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-dim)]">{t.theme}</p>
                  <ThemeToggle variant="panel" />
                </div>
                <HeaderAuth variant="panel" />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
