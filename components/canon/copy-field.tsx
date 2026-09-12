"use client";
import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/i18n";

export function CopyField({ value, locale = "ru" }: { value: string; locale?: Locale }) {
  const [state, setState] = useState<"idle" | "copied" | "error">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  const label = locale === "en" ? "Copy" : "Копировать";
  const copied = locale === "en" ? "Copied" : "Скопировано";
  const error = locale === "en" ? "Could not copy. Select the link and copy it manually." : "Не удалось скопировать. Выделите ссылку и скопируйте вручную.";
  async function copy() {
    clearTimeout(timer.current);
    try { await navigator.clipboard.writeText(value); setState("copied"); timer.current = setTimeout(() => setState("idle"), 5000); }
    catch { setState("error"); }
  }
  return <div className="reading-copy-field">
    <div className="flex min-w-0 flex-wrap items-center gap-x-4 gap-y-2">
      <code className="min-w-0 flex-1 select-all break-all text-[13px]">{value}</code>
      <button type="button" onClick={copy} className="reading-text-action min-h-11 shrink-0">{state === "copied" ? copied : label}</button>
    </div>
    <span role="status" className={state === "error" ? "mt-2 block text-[13px]" : "sr-only"}>{state === "copied" ? copied : state === "error" ? error : ""}</span>
  </div>;
}
