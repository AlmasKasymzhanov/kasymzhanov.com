"use client";

import { useId, useState } from "react";
import { usePathname } from "next/navigation";
import { createSupabaseBrowser } from "@/lib/supabase-browser";
import { localeFromPathname, dict } from "@/lib/i18n";

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

export function CourseAccess({
  next = "/courses",
  label = "Вход для участников",
  note = "Вход = регистрация. Доступ к материалам остаётся открытым без ограничений по времени.",
}: {
  next?: string;
  label?: string;
  note?: string;
}) {
  const emailId = useId();
  const [supabase] = useState(() => createSupabaseBrowser());
  const locale = localeFromPathname(usePathname() ?? "/");
  const t = dict[locale].auth;
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const [msg, setMsg] = useState("");

  const redirectTo =
    typeof window !== "undefined"
      ? `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`
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
      // `data` lands in the user's metadata → the magic-link email template can
      // branch on {{ .Data.locale }} to send RU or EN. See lib/i18n / email setup.
      options: { emailRedirectTo: redirectTo, data: { locale } },
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
      <div role="status" className="auth-panel rounded-[14px] bg-[var(--reading-comment-surface)] p-6">
        <p className="text-[13px] uppercase tracking-[0.18em] text-[var(--color-dim)] mb-3">
          {t.sentTitle}
        </p>
        <p className="text-[15px] text-[var(--color-text)] leading-relaxed">
          {t.sentBefore} <span className="font-medium">{email.trim()}</span>{t.sentAfter}
        </p>
        <button
          onClick={() => {
            setState("idle");
            setMsg("");
          }}
          className="mt-5 text-[12px] text-[var(--color-dim)] hover:text-[var(--color-text)] no-underline"
        >
          {t.otherEmail}
        </button>
      </div>
    );
  }

  return (
    <div className="auth-panel max-w-md font-sans">
      {label && (
        <p className="text-[13px] text-[var(--color-dim)] mb-4">
          [ {label} ]
        </p>
      )}

      {/* Google */}
      <button
        onClick={google}
        className="w-full h-11 flex items-center justify-center gap-2.5 rounded-[10px] border border-[var(--color-border)] text-[14px] font-medium text-[var(--color-text)] hover:bg-[var(--color-surface)] transition-colors"
      >
        <GoogleIcon />
        {t.google}
      </button>

      {/* divider */}
      <div className="text-center my-5">
        <span className="text-[13px] text-[var(--color-dim)]">{t.or}</span>
      </div>

      {/* Email magic link */}
      <form onSubmit={emailLink} className="flex flex-col gap-2.5">
        <label htmlFor={emailId} className="text-[14px] text-[var(--color-dim)]">Email</label>
        <input
          id={emailId}
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t.emailPlaceholder}
          autoComplete="email"
          className="h-11 w-full rounded-[10px] border border-[var(--color-border)] bg-transparent px-4 text-[16px] text-[var(--color-text)] placeholder:text-[var(--color-dim)] outline-none focus:border-[var(--color-text)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-text)] transition-colors"
        />
        <button
          type="submit"
          disabled={state === "loading"}
          className="h-11 w-full rounded-[10px] bg-[var(--color-text)] text-[var(--color-bg)] text-[14px] font-medium hover:opacity-90 disabled:opacity-50 transition-opacity"
        >
          {state === "loading" ? t.sending : t.send}
        </button>
      </form>

      {state === "error" && (
        <p role="alert" className="text-[13px] text-[var(--color-text)] mt-3">{msg || t.errFail}</p>
      )}

      <p className="text-[13px] text-[var(--color-dim)] leading-relaxed mt-5 text-left">
        {note}
      </p>
    </div>
  );
}
