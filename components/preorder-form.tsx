"use client";

import { useState } from "react";

export function PreorderForm() {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [msg, setMsg] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    setMsg("");
    try {
      const res = await fetch("/api/preorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, email }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Не удалось отправить");
      setState("done");
    } catch (err) {
      setMsg(err instanceof Error ? err.message : "Ошибка");
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <div className="border border-[var(--color-text)] p-6 md:p-8 max-w-md">
        <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-dim)] mb-3">
          [ Готово ]
        </p>
        <p className="text-[16px] font-bold text-[var(--color-text)] leading-relaxed">
          Данные отправлены, вы в списке предзаписи на четвёртый поток.
        </p>
        <p className="text-[13px] text-[var(--color-dim)] leading-relaxed mt-3">
          Напишу вам, когда откроется набор. Спасибо!
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="border border-[var(--color-border)] p-6 md:p-8 max-w-md">
      <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-dim)] mb-5">
        [ Предзапись · 4 поток ]
      </p>

      <label className="block mb-4">
        <span className="block text-[12px] text-[var(--color-text)] mb-1.5">Телефон</span>
        <input
          type="tel"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+7 700 000 00 00"
          autoComplete="tel"
          inputMode="tel"
          className="h-11 w-full border border-[var(--color-border)] bg-transparent px-4 text-[14px] text-[var(--color-text)] placeholder:text-[var(--color-dim)] outline-none focus:border-[var(--color-text)] transition-colors"
        />
        <span className="block text-[11px] text-[var(--color-dim)] mt-1.5">
          Лучше тот, к которому привязан WhatsApp.
        </span>
      </label>

      <label className="block mb-5">
        <span className="block text-[12px] text-[var(--color-text)] mb-1.5">Email</span>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          autoComplete="email"
          className="h-11 w-full border border-[var(--color-border)] bg-transparent px-4 text-[14px] text-[var(--color-text)] placeholder:text-[var(--color-dim)] outline-none focus:border-[var(--color-text)] transition-colors"
        />
      </label>

      <button
        type="submit"
        disabled={state === "loading"}
        className="h-11 w-full bg-[var(--color-text)] text-[var(--color-bg)] text-[14px] font-bold hover:opacity-90 disabled:opacity-50 transition-opacity"
      >
        {state === "loading" ? "Отправляем…" : "Записаться в предзапись"}
      </button>

      {state === "error" && (
        <p className="text-[12px] text-red-500 mt-3">{msg || "Не удалось отправить"}</p>
      )}

      <p className="text-[11px] text-[var(--color-dim)] leading-relaxed mt-5">
        Оставляя данные, вы соглашаетесь, что я свяжусь с вами по поводу набора в 4 поток.
      </p>
    </form>
  );
}
