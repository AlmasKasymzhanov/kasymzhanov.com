"use client";

import { useEffect, useState } from "react";
import { CornerTicks } from "@/components/canon/corner-ticks";

// EN / RU language switch — two tick-boxes. Visual for now (full i18n comes later);
// stores the choice in localStorage so it's ready to wire up to translations.
const LANGS = ["RU", "EN"] as const;
type Lang = (typeof LANGS)[number];

export function LangToggle() {
  const [lang, setLang] = useState<Lang>("RU");

  useEffect(() => {
    const saved = localStorage.getItem("lang") as Lang | null;
    if (saved && LANGS.includes(saved)) setLang(saved);
  }, []);

  const choose = (l: Lang) => {
    setLang(l);
    localStorage.setItem("lang", l);
  };

  return (
    <div className="flex items-center gap-2">
      {LANGS.map((l) => {
        const active = lang === l;
        return (
          <button
            key={l}
            onClick={() => choose(l)}
            aria-pressed={active}
            className={`relative h-10 w-10 grid place-items-center border border-[var(--color-text)] text-[11px] font-bold tracking-[0.06em] transition-colors ${
              active
                ? "bg-[var(--color-text)] text-[var(--color-bg)]"
                : "bg-transparent text-[var(--color-text)] hover:bg-[var(--color-text)] hover:text-[var(--color-bg)]"
            }`}
          >
            {!active && <CornerTicks size={5} />}
            {l}
          </button>
        );
      })}
    </div>
  );
}
