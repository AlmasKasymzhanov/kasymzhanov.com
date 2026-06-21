"use client";

import { useEffect, useState } from "react";

// EN / RU language switch — segmented pill, both languages visible on every
// breakpoint (compact on mobile). Visual for now (full i18n comes later);
// stored in localStorage.
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

  return (
    <div
      role="radiogroup"
      aria-label="Язык интерфейса"
      className="inline-flex items-center gap-0.5 rounded-full border border-[var(--color-border)] p-0.5 bg-[var(--color-text)]/5"
    >
      {LANGS.map((l) => {
        const active = mounted && lang === l;
        return (
          <button
            key={l}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={l === "RU" ? "Русский" : "English"}
            onClick={() => choose(l)}
            className={`flex h-5 md:h-7 items-center justify-center rounded-full px-1.5 md:px-2.5 text-[10.5px] md:text-[11px] font-bold transition-colors duration-150 ease-out cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--color-brand)]/60 ${
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
