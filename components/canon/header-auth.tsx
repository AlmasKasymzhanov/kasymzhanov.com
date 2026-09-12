"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createSupabaseBrowser } from "@/lib/supabase-browser";
import { localeFromPathname, dict } from "@/lib/i18n";
import type { User } from "@supabase/supabase-js";

function AccountIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M4.8 20c.7-4 3.1-6 7.2-6s6.5 2 7.2 6" strokeLinecap="round" />
    </svg>
  );
}

// Auth-aware header control. Mobile variants keep the account useful without
// letting it compete with editorial navigation.
export function HeaderAuth({ variant = "default" }: { variant?: "default" | "icon" | "panel" }) {
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
    return (
      <div
        className={
          variant === "icon"
            ? "size-11 rounded-full bg-[var(--color-text)]/5"
            : variant === "panel"
              ? "h-11 w-full rounded-md bg-[var(--color-text)]/5"
              : "h-7 w-[54px] rounded-[5px] bg-[var(--color-text)]/5 md:h-[30px] md:w-[64px]"
        }
        aria-hidden
      />
    );
  }

  if (!user) {
    if (variant === "icon") {
      return (
        <Link
          href={loginHref}
          aria-label={t.signIn}
          title={t.signIn}
          className="grid size-11 place-items-center rounded-full text-[var(--color-text)] no-underline transition-colors hover:bg-[var(--color-surface-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--color-brand)]"
        >
          <AccountIcon />
        </Link>
      );
    }
    if (variant === "panel") {
      return (
        <Link
          href={loginHref}
          className="flex h-11 w-full items-center justify-center gap-2 rounded-md border border-[var(--color-brand)] bg-[var(--color-brand)] font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-[var(--color-bg)] no-underline transition-colors hover:bg-transparent hover:text-[var(--color-brand)]"
        >
          <AccountIcon size={17} />
          {t.signIn}
        </Link>
      );
    }
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
  const name = meta.full_name ?? meta.name ?? user.email ?? t.account;
  const avatar = meta.avatar_url ?? meta.picture;

  async function signOut() {
    await supabase.auth.signOut();
    setUser(null);
    setOpen(false);
  }

  if (variant === "panel") {
    return (
      <div className="flex items-center gap-3 rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] p-2">
        {avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={avatar} alt="" referrerPolicy="no-referrer" className="size-8 rounded-full object-cover" />
        ) : (
          <span className="grid size-8 place-items-center rounded-full bg-[var(--color-surface-hover)] text-[12px] font-medium">
            {name.slice(0, 1).toUpperCase()}
          </span>
        )}
        <span className="min-w-0 flex-1 truncate text-[12px] text-[var(--color-text)]">{user.email}</span>
        <button onClick={signOut} className="h-9 px-2 font-mono text-[10px] font-medium uppercase tracking-[0.06em] text-[var(--color-brand)]">
          {t.signOut}
        </button>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={t.account}
        className={
          variant === "icon"
            ? "grid size-11 place-items-center rounded-full transition-colors hover:bg-[var(--color-surface-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--color-brand)]"
            : "flex h-[30px] items-center gap-2 rounded-full border border-[var(--color-border)] pl-1 pr-2.5 transition-colors hover:border-[var(--color-brand)]"
        }
      >
        {avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={avatar} alt="" referrerPolicy="no-referrer" className={`${variant === "icon" ? "size-7" : "size-6"} rounded-full object-cover`} />
        ) : (
          variant === "icon" ? <AccountIcon /> : <span className="grid size-6 place-items-center rounded-full bg-[var(--color-surface-hover)] text-[11px] text-[var(--color-text)]">{name.slice(0, 1).toUpperCase()}</span>
        )}
        {variant !== "icon" && <span className="hidden max-w-[110px] truncate text-[12px] font-medium text-[var(--color-text)] sm:block">{name}</span>}
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
              {t.signOut}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
