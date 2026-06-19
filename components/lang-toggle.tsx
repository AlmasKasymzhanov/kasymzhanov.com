"use client";

import { useEffect, useState } from "react";

// EN / RU language switch — segmented pill styled after 10b.kz.
// Visual for now (full i18n comes later); stored in localStorage.
const LANGS = ["RU", "EN"] as const;
type Lang = (typeof LANGS)[number];

export function LangToggle() {
  const [lang, setLang] = useState<Lang>("RU");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("lang") as Lang | null;
    if (saved && LANGS.includes(saved)) setLang(saved);
    setMounted(true);
  }, []);

  const choose = (l: Lang) => {
    setLang(l);
    localStorage.setItem("lang", l);
  };

  if (!mounted) {
    return (
      <div
        className="h-[34px] w-[78px] rounded-full border border-[var(--color-border)] bg-[var(--color-text)]/5"
        aria-hidden
      />
    );
  }

  return (
    <div
      role="radiogroup"
      aria-label="Язык"
      className="inline-flex items-center gap-0.5 rounded-full border border-[var(--color-border)] p-0.5 bg-[var(--color-text)]/5"
    >
      {LANGS.map((l) => {
        const active = lang === l;
        return (
          <button
            key={l}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => choose(l)}
            className={`flex h-7 items-center justify-center rounded-full px-2.5 text-[11px] font-bold transition-colors duration-150 ease-out cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--color-brand)]/60 ${
              active
                ? "bg-[var(--color-bg)] text-[var(--color-text)] shadow-sm"
                : "text-[var(--color-dim)] hover:text-[var(--color-text)] hover:bg-[var(--color-text)]/8"
            }`}
          >
            {l}
          </button>
        );
      })}
    </div>
  );
}
