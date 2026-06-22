"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { localeFromPathname, dict } from "@/lib/i18n";

function SearchIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.6324 3C16.2814 3 20.0499 6.76847 20.0499 11.4175C20.0499 16.0666 16.2814 19.836 11.6324 19.836C6.98331 19.836 3.21484 16.0666 3.21484 11.4175C3.21484 6.76847 6.98331 3 11.6324 3Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.3613 17.584L20.7863 21.0002"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Header search — Rest of World style: the magnifier expands into an inline
// bar spanning the header width, with a thin underline and an × to close.
// The parent <header> must be `relative` for the overlay to anchor correctly.
export function HeaderSearch() {
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const t = dict[localeFromPathname(usePathname() ?? "/")].nav;

  useEffect(() => {
    if (open) inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label={t.search}
        className="grid place-items-center h-8 w-8 md:h-9 md:w-9 text-[var(--color-text)] hover:opacity-60 transition-opacity"
      >
        <SearchIcon size={18} />
      </button>

      {open && (
        <div className="absolute inset-0 z-30 bg-[var(--color-bg)] flex items-center gap-4 px-4 sm:px-6 md:px-7">
          <span className="text-[var(--color-dim)] shrink-0">
            <SearchIcon size={18} />
          </span>
          <form
            className="flex-1"
            onSubmit={(e) => {
              e.preventDefault();
              // TODO: route to the search results page once it exists.
            }}
          >
            <input
              ref={inputRef}
              type="search"
              placeholder={t.search}
              className="w-full bg-transparent border-b border-[var(--color-border)] focus:border-[var(--color-text)] py-1.5 text-[14px] font-mono text-[var(--color-text)] placeholder:text-[var(--color-dim)] outline-none transition-colors"
            />
          </form>
          <button
            onClick={() => setOpen(false)}
            aria-label="Закрыть поиск"
            className="shrink-0 grid place-items-center h-9 w-9 text-[var(--color-text)] hover:opacity-60 transition-opacity"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
              <path d="M3 3l12 12M15 3L3 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}
