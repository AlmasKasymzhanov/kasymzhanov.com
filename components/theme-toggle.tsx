"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { localeFromPathname, dict } from "@/lib/i18n";
import type { PersonalLocale } from "@/lib/personal-locale";
import { IconlyMonitor, IconlyMoon, IconlySun } from "@/components/iconly-icons";

type Mode = "system" | "light" | "dark";

function systemDark() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches;
}

// Light theme = `.light` on <html>; dark = no class. "system" resolves live.
function applyMode(m: Mode) {
  const dark = m === "dark" || (m === "system" && systemDark());
  document.documentElement.classList.toggle("light", !dark);
}

const OPTIONS: { value: Mode; Icon: ({ size }: { size?: number }) => React.ReactElement; label: string }[] = [
  { value: "system", Icon: IconlyMonitor, label: "Системная тема" },
  { value: "light", Icon: IconlySun, label: "Светлая тема" },
  { value: "dark", Icon: IconlyMoon, label: "Тёмная тема" },
];

// Segmented theme switch — System · Light · Dark, all visible on every
// breakpoint (compact on mobile). System follows the OS and updates live.
export function ThemeToggle({
  variant = "compact",
  tone = "brand",
  locale: localeOverride,
}: {
  variant?: "compact" | "panel";
  tone?: "brand" | "neutral";
  locale?: PersonalLocale;
}) {
  const routeLocale = localeFromPathname(usePathname() ?? "/");
  const locale = localeOverride ?? routeLocale;
  const t =
    locale === "kz"
      ? {
          theme: "Түс режимі",
          themeSystem: "Жүйелік режим",
          themeLight: "Жарық режим",
          themeDark: "Қараңғы режим",
        }
      : dict[locale].nav;
  const labelFor = (v: Mode) => (v === "system" ? t.themeSystem : v === "light" ? t.themeLight : t.themeDark);
  const shortLabelFor = (v: Mode) => {
    if (locale === "en") return v === "system" ? "System" : v === "light" ? "Light" : "Dark";
    if (locale === "kz") return v === "system" ? "Жүйе" : v === "light" ? "Жарық" : "Қараңғы";
    return v === "system" ? "Система" : v === "light" ? "Светлая" : "Тёмная";
  };
  const [mode, setMode] = useState<Mode>("system");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const initial: Mode = saved === "light" || saved === "dark" ? saved : "system";
    setMode(initial);
    applyMode(initial);
    setMounted(true);
  }, []);

  // While in system mode, follow OS theme changes live.
  useEffect(() => {
    if (mode !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => applyMode("system");
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [mode]);

  const choose = (m: Mode) => {
    setMode(m);
    localStorage.setItem("theme", m);
    applyMode(m);
  };

  return (
    <div
      role="radiogroup"
      aria-label={t.theme}
      className={
        variant === "panel"
          ? "grid w-full grid-cols-3 rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] p-1"
          : tone === "neutral"
            ? "inline-flex items-center gap-0.5 rounded-full border border-[var(--personal-rail-border)] bg-[var(--personal-rail-hover)] p-0.5"
          : "inline-flex items-center gap-0.5 rounded-full border border-[var(--color-border)] bg-[var(--color-text)]/5 p-0.5"
      }
    >
      {OPTIONS.map(({ value, Icon }) => {
        const active = mounted && mode === value;
        const label = labelFor(value);
        const neutralCompact = variant === "compact" && tone === "neutral";
        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={label}
            title={label}
            onClick={() => choose(value)}
            className={`${variant === "panel" ? "flex h-12 min-w-0 flex-col items-center justify-center gap-1 rounded-[4px]" : "grid size-6 place-items-center rounded-full md:size-7"} cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset ${neutralCompact ? "transition-[background-color,color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] focus-visible:ring-[var(--personal-rail-focus)]/60" : "transition-colors duration-150 ease-out focus-visible:ring-[var(--color-brand)]/60"} ${
              active
                ? neutralCompact
                  ? "bg-[var(--personal-paper)] text-[var(--personal-rail-text)] ring-1 ring-inset ring-[var(--personal-rail-border)]"
                  : "bg-[var(--color-bg)] text-[var(--color-text)] shadow-sm"
                : neutralCompact
                  ? "text-[var(--personal-rail-muted)] hover:bg-[var(--personal-rail-active)] hover:text-[var(--personal-rail-text)]"
                  : "text-[var(--color-dim)] hover:text-[var(--color-text)] hover:bg-[var(--color-text)]/8"
            }`}
          >
            <Icon size={14} />
            {variant === "panel" && <span className="truncate text-[9px] font-bold uppercase tracking-[0.04em]">{shortLabelFor(value)}</span>}
          </button>
        );
      })}
    </div>
  );
}
