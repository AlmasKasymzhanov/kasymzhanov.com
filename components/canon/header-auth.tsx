"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createSupabaseBrowser } from "@/lib/supabase-browser";
import { localeFromPathname, dict } from "@/lib/i18n";
import type { User } from "@supabase/supabase-js";

// Auth-aware header control: "Войти" (→ /login) when logged out, the user's
// account chip with a sign-out menu when logged in.
export function HeaderAuth() {
  const locale = localeFromPathname(usePathname() ?? "/");
  const t = dict[locale].nav;
  const loginHref = locale === "en" ? "/en/login" : "/login";
  const [supabase] = useState(() => createSupabaseBrowser());
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setReady(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setUser(s?.user ?? null));
    return () => sub.subscription.unsubscribe();
  }, [supabase]);

  if (!ready) {
    return <div className="h-7 w-[54px] md:h-[30px] md:w-[64px] rounded-[5px] bg-[var(--color-text)]/5" aria-hidden />;
  }

  if (!user) {
    return (
      <Link
        href={loginHref}
        className="inline-flex items-center justify-center h-7 px-2 md:h-[30px] md:px-[10px] rounded-[5px] border border-[var(--color-brand)] bg-[var(--color-brand)] text-[var(--color-bg)] text-[11px] md:text-[12px] uppercase no-underline hover:bg-transparent hover:text-[var(--color-brand)] transition-colors duration-200"
      >
        {t.signIn}
      </Link>
    );
  }

  const meta = (user.user_metadata ?? {}) as Record<string, string>;
  const name = meta.full_name ?? meta.name ?? user.email ?? "Аккаунт";
  const avatar = meta.avatar_url ?? meta.picture;

  async function signOut() {
    await supabase.auth.signOut();
    setUser(null);
    setOpen(false);
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Аккаунт"
        className="flex items-center gap-2 pl-1 pr-2.5 h-[30px] rounded-full border border-[var(--color-border)] hover:border-[var(--color-brand)] transition-colors"
      >
        {avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={avatar} alt="" referrerPolicy="no-referrer" className="w-6 h-6 rounded-full object-cover" />
        ) : (
          <span className="w-6 h-6 rounded-full bg-[var(--color-surface-hover)] grid place-items-center text-[11px] text-[var(--color-text)]">
            {name.slice(0, 1).toUpperCase()}
          </span>
        )}
        <span className="hidden sm:block text-[12px] font-medium text-[var(--color-text)] max-w-[110px] truncate">
          {name}
        </span>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 mt-2 w-56 z-50 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] shadow-xl p-1">
            <p className="px-3 py-2 text-[12px] text-[var(--color-dim)] truncate border-b border-[var(--color-border)] mb-1">
              {user.email}
            </p>
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
