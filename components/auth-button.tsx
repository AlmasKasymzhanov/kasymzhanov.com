"use client";

import { useEffect, useState } from "react";
import { createSupabaseBrowser } from "@/lib/supabase-browser";
import type { User } from "@supabase/supabase-js";

function GoogleIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 18 18" aria-hidden>
      <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62z" />
      <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.8.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.33A9 9 0 0 0 9 18z" />
      <path fill="#FBBC05" d="M3.97 10.72a5.4 5.4 0 0 1 0-3.44V4.95H.96a9 9 0 0 0 0 8.1l3.01-2.33z" />
      <path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58C13.47.9 11.43 0 9 0A9 9 0 0 0 .96 4.95l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58z" />
    </svg>
  );
}

export function AuthButton() {
  const [supabase] = useState(() => createSupabaseBrowser());
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => sub.subscription.unsubscribe();
  }, [supabase]);

  const signIn = () =>
    supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setMenuOpen(false);
  };

  if (loading) {
    return <div className="h-8 w-8 rounded-full bg-[var(--color-surface-hover)] animate-pulse" />;
  }

  if (!user) {
    return (
      <button
        onClick={signIn}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] text-[13px] font-medium text-[var(--color-text)] transition-colors"
      >
        <GoogleIcon />
        Войти
      </button>
    );
  }

  const meta = user.user_metadata ?? {};
  const name: string = meta.full_name ?? meta.name ?? user.email ?? "Аккаунт";
  const avatar: string | undefined = meta.avatar_url ?? meta.picture;

  return (
    <div className="relative">
      <button
        onClick={() => setMenuOpen((o) => !o)}
        className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] transition-colors"
      >
        {avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={avatar}
            alt=""
            referrerPolicy="no-referrer"
            className="h-6 w-6 rounded-full object-cover"
          />
        ) : (
          <span className="h-6 w-6 rounded-full bg-[var(--color-surface-hover)] flex items-center justify-center text-[11px] text-[var(--color-text)]">
            {name.slice(0, 1).toUpperCase()}
          </span>
        )}
        <span className="text-[13px] font-medium text-[var(--color-text)] max-w-[120px] truncate">
          {name}
        </span>
      </button>

      {menuOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
          <div className="absolute right-0 mt-2 w-52 z-50 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] shadow-xl p-1">
            <div className="px-3 py-2 text-[12px] text-dim truncate border-b border-[var(--color-border)] mb-1">
              {user.email}
            </div>
            <button
              onClick={signOut}
              className="w-full text-left px-3 py-2 rounded-md text-[13px] text-[var(--color-text)] hover:bg-[var(--color-surface-hover)] transition-colors"
            >
              Выйти
            </button>
          </div>
        </>
      )}
    </div>
  );
}
