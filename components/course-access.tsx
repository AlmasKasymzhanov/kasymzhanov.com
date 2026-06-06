"use client";

import { useState } from "react";
import { createSupabaseBrowser } from "@/lib/supabase-browser";

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 18 18" aria-hidden>
      <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62z" />
      <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.8.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.33A9 9 0 0 0 9 18z" />
      <path fill="#FBBC05" d="M3.97 10.72a5.4 5.4 0 0 1 0-3.44V4.95H.96a9 9 0 0 0 0 8.1l3.01-2.33z" />
      <path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58C13.47.9 11.43 0 9 0A9 9 0 0 0 .96 4.95l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58z" />
    </svg>
  );
}

export function CourseAccess() {
  const [supabase] = useState(() => createSupabaseBrowser());
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const [msg, setMsg] = useState("");

  const redirectTo =
    typeof window !== "undefined"
      ? `${window.location.origin}/auth/callback?next=/courses`
      : undefined;

  function google() {
    setMsg("");
    supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo },
    });
  }

  async function emailLink(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    setMsg("");
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: { emailRedirectTo: redirectTo },
    });
    if (error) {
      setMsg(error.message);
      setState("error");
    } else {
      setState("sent");
    }
  }

  if (state === "sent") {
    return (
      <div className="border border-[var(--color-border)] p-6 md:p-8">
        <p className="text-[13px] uppercase tracking-[0.18em] text-[var(--color-dim)] mb-3">
          [ Письмо отправлено ]
        </p>
        <p className="text-[15px] text-[var(--color-text)] leading-relaxed">
          Отправили ссылку для входа на <span className="font-bold">{email.trim()}</span>.
          Откройте письмо и перейдите по ссылке — попадёте прямо в курс.
        </p>
        <button
          onClick={() => {
            setState("idle");
            setMsg("");
          }}
          className="mt-5 text-[12px] text-[var(--color-dim)] hover:text-[var(--color-text)] underline decoration-1 underline-offset-4"
        >
          Ввести другой email
        </button>
      </div>
    );
  }

  return (
    <div className="border border-[var(--color-border)] p-6 md:p-8 max-w-md">
      <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-dim)] mb-4">
        [ Вход для участников ]
      </p>

      {/* Google */}
      <button
        onClick={google}
        className="w-full h-11 flex items-center justify-center gap-2.5 border border-[var(--color-text)] text-[14px] font-bold text-[var(--color-text)] hover:bg-[var(--color-text)] hover:text-[var(--color-bg)] transition-colors"
      >
        <GoogleIcon />
        Войти через Google
      </button>

      {/* divider */}
      <div className="flex items-center gap-3 my-5">
        <span className="h-px flex-1 bg-[var(--color-border)]" />
        <span className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-dim)]">или</span>
        <span className="h-px flex-1 bg-[var(--color-border)]" />
      </div>

      {/* Email magic link */}
      <form onSubmit={emailLink} className="flex flex-col gap-2.5">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          autoComplete="email"
          className="h-11 w-full border border-[var(--color-border)] bg-transparent px-4 text-[14px] text-[var(--color-text)] placeholder:text-[var(--color-dim)] outline-none focus:border-[var(--color-text)] transition-colors"
        />
        <button
          type="submit"
          disabled={state === "loading"}
          className="h-11 w-full bg-[var(--color-text)] text-[var(--color-bg)] text-[14px] font-bold hover:opacity-90 disabled:opacity-50 transition-opacity"
        >
          {state === "loading" ? "Отправляем…" : "Войти по ссылке на почту"}
        </button>
      </form>

      {state === "error" && (
        <p className="text-[12px] text-red-500 mt-3">{msg || "Не удалось отправить ссылку"}</p>
      )}

      <p className="text-[11px] text-[var(--color-dim)] leading-relaxed mt-5">
        Вход = регистрация. Доступ к материалам остаётся открытым без ограничений по времени.
      </p>
    </div>
  );
}
