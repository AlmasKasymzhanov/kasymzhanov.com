"use client";

import { useState } from "react";

// Corner arrow — elbow (up then right) with a right arrowhead.
function SubmitIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M15.5564 11.1401L18.9994 14.5832L15.5564 18.0262M18.5148 14.5827H5V5.97656"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
    </svg>
  );
}

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

  // ── Header variant: pixel-matched to the Spade newsletter widget ──
  if (variant === "header") {
    if (state === "done") {
      return (
        <p className="font-mono text-[14px] text-[var(--color-text)] font-medium h-12 flex items-center">
          Готово — вы подписаны ✦
        </p>
      );
    }
    return (
      <form onSubmit={submit} className="flex w-full gap-x-2 font-mono">
        <div className="relative h-10 flex-1 border border-[var(--color-text)]">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            autoComplete="email"
            className="w-full h-full bg-transparent px-[14px] text-[14px] tracking-[-0.02em] text-[var(--color-text)] placeholder:text-[var(--color-dim)] outline-none"
          />
        </div>
        <button
          type="submit"
          disabled={state === "loading"}
          aria-label="Подписаться"
          className="shrink-0 h-10 w-10 grid place-items-center border border-[var(--color-text)] text-[var(--color-text)] hover:bg-[var(--color-text)] hover:text-[var(--color-bg)] disabled:opacity-40 transition-colors"
        >
          <SubmitIcon />
        </button>
      </form>
    );
  }

  // ── Default variant ──
  if (state === "done") {
    return (
      <p className="font-mono text-[14px] text-[var(--color-text)] font-medium">
        Готово — вы подписаны. ✦ Скоро напишу.
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="flex flex-col sm:flex-row gap-2 w-full max-w-md font-mono">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        autoComplete="email"
        className="flex-1 px-4 py-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[14px] text-[var(--color-text)] placeholder:text-[var(--color-dim)] outline-none focus:border-[var(--color-text)] transition-colors"
      />
      <button
        type="submit"
        disabled={state === "loading"}
        className="px-5 py-2.5 rounded-lg bg-[var(--color-text)] text-[var(--color-bg)] text-[14px] font-semibold hover:opacity-90 disabled:opacity-60 transition-opacity whitespace-nowrap"
      >
        {state === "loading" ? "…" : "Подписаться"}
      </button>
      {state === "error" && <p className="sm:hidden text-[12px] text-red-400 mt-1">{msg}</p>}
    </form>
  );
}
