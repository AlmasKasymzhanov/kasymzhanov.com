"use client";

import { useState } from "react";

export function SubscribeForm({
  source = "site",
  variant = "default",
}: {
  source?: string;
  variant?: "default" | "header";
}) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [msg, setMsg] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    setMsg("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Не удалось подписаться");
      setState("done");
    } catch (err) {
      setMsg(err instanceof Error ? err.message : "Ошибка");
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <p className="font-mono text-[14px] text-[var(--color-text)] font-medium">
        Готово — вы подписаны. ✦ Скоро напишу.
      </p>
    );
  }

  const header = variant === "header";

  return (
    <form
      onSubmit={submit}
      className={
        header
          ? "flex items-stretch gap-2 w-full font-mono"
          : "flex flex-col sm:flex-row gap-2 w-full max-w-md font-mono"
      }
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        autoComplete="email"
        className={
          header
            ? "flex-1 px-4 py-3 rounded-[3px] border border-[var(--color-border)] bg-[var(--color-surface)] text-[14px] text-[var(--color-text)] placeholder:text-[var(--color-dim)] outline-none focus:border-[var(--color-text)] transition-colors"
            : "flex-1 px-4 py-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[14px] text-[var(--color-text)] placeholder:text-[var(--color-dim)] outline-none focus:border-[var(--color-text)] transition-colors"
        }
      />
      <button
        type="submit"
        disabled={state === "loading"}
        aria-label="Подписаться"
        className={
          header
            ? "shrink-0 w-12 grid place-items-center rounded-[3px] border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] text-[18px] text-[var(--color-text)] disabled:opacity-60 transition-colors"
            : "px-5 py-2.5 rounded-lg bg-[var(--color-text)] text-[var(--color-bg)] text-[14px] font-semibold hover:opacity-90 disabled:opacity-60 transition-opacity whitespace-nowrap"
        }
      >
        {header ? (state === "loading" ? "…" : "↳") : state === "loading" ? "…" : "Подписаться"}
      </button>
      {state === "error" && (
        <p className="sm:hidden text-[12px] text-red-400 mt-1">{msg}</p>
      )}
    </form>
  );
}
