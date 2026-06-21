"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { track } from "@vercel/analytics";

/*
 * Canon share control. One pill (icon + count) that opens a menu:
 *  - "Поделиться…" via the native OS sheet on devices that support it (mobile) —
 *    the fastest path to ANY installed app (Viber, OK, Instagram, etc.);
 *  - explicit one-click targets tuned for CIS (Telegram, WhatsApp, VK) plus the
 *    global set (X, Facebook, LinkedIn, Threads, Email);
 *  - Instagram has no public web-share URL, so its item uses the native sheet on
 *    mobile and copy-link on desktop (paste into IG);
 *  - copy link with per-row feedback.
 * The shared URL is the page's <link rel="canonical"> (clean, no query params).
 * `onShare` registers the share (count + Supabase) once per action.
 */

const eu = encodeURIComponent;

type Channel = {
  id: string;
  label: string;
  icon: React.ReactNode;
  href?: (url: string, title: string) => string;
  native?: boolean; // no web URL — use native sheet (mobile) / copy (desktop)
};

function I({ children, stroke = false }: { children: React.ReactNode; stroke?: boolean }) {
  return (
    <svg
      className="w-[18px] h-[18px]"
      viewBox="0 0 24 24"
      fill={stroke ? "none" : "currentColor"}
      stroke={stroke ? "currentColor" : undefined}
      strokeWidth={stroke ? 1.7 : undefined}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {children}
    </svg>
  );
}

const CHANNELS: Channel[] = [
  {
    id: "telegram",
    label: "Telegram",
    icon: <I><path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0h-.056zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" /></I>,
    href: (u, t) => `https://t.me/share/url?url=${eu(u)}&text=${eu(t)}`,
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    icon: <I><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></I>,
    href: (u, t) => `https://wa.me/?text=${eu(`${t}\n${u}`)}`,
  },
  {
    id: "vk",
    label: "ВКонтакте",
    icon: <I><path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14c5.6 0 6.93-1.33 6.93-6.93V8.93C22 3.33 20.68 2 15.07 2zm3.15 14.27h-1.46c-.55 0-.72-.45-1.71-1.44-.87-.83-1.24-.94-1.45-.94-.3 0-.39.08-.39.49v1.31c0 .35-.11.56-1.04.56-1.53 0-3.22-.93-4.42-2.65C6.13 11.59 5.64 9.71 5.64 9.33c0-.21.08-.4.49-.4h1.46c.37 0 .51.17.65.56.72 2.08 1.92 3.9 2.42 3.9.19 0 .27-.08.27-.56V10.6c-.06-.98-.58-1.06-.58-1.41 0-.17.14-.34.37-.34h2.29c.31 0 .42.17.42.53v2.89c0 .31.14.42.23.42.19 0 .34-.11.68-.45 1.06-1.18 1.81-3 1.81-3 .1-.21.27-.4.64-.4h1.46c.44 0 .53.23.44.53-.18.85-1.97 3.37-1.97 3.37-.15.25-.21.36 0 .64.15.21.66.65 1 1.05.62.7 1.09 1.29 1.22 1.7.13.4-.07.61-.48.61z" /></I>,
    href: (u, t) => `https://vk.com/share.php?url=${eu(u)}&title=${eu(t)}`,
  },
  {
    id: "instagram",
    label: "Instagram",
    native: true,
    icon: <I><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></I>,
  },
  {
    id: "threads",
    label: "Threads",
    icon: <I stroke><path d="M19.558 8.68521C19.2432 7.49646 18.7479 6.4721 18.0738 5.62256C16.7077 3.90063 14.7097 3.0183 12.1354 3H12.1251C9.55598 3.01823 7.58038 3.90392 6.25317 5.63243C5.07213 7.1706 4.46292 9.31085 4.44245 11.9937L4.44238 12L4.44245 12.0063C4.46292 14.6891 5.07213 16.8294 6.25317 18.3676C7.58038 20.0961 9.55598 20.9818 12.1251 21H12.1354C14.4195 20.9838 16.0295 20.3711 17.3558 19.0135C19.0952 17.2332 19.2731 14.302 17.3558 12.5906C16.0557 11.4302 14.0875 11.1969 12.3235 11.3005C10.1437 11.4291 9.14937 12.6742 9.21078 13.8545C9.37002 16.9156 13.1018 17.1758 14.8092 14.9459C15.9191 13.4967 15.9343 11.5817 15.3683 9.84475C14.4163 6.92359 10.9467 6.95072 9.21077 9.10566" /></I>,
    href: (u, t) => `https://www.threads.net/intent/post?text=${eu(`${t}\n${u}`)}`,
  },
  {
    id: "x",
    label: "X (Twitter)",
    icon: <I><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" /></I>,
    href: (u, t) => `https://twitter.com/intent/tweet?url=${eu(u)}&text=${eu(t)}`,
  },
  {
    id: "facebook",
    label: "Facebook",
    icon: <I><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></I>,
    href: (u) => `https://www.facebook.com/sharer/sharer.php?u=${eu(u)}`,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    icon: <I><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></I>,
    href: (u) => `https://www.linkedin.com/sharing/share-offsite/?url=${eu(u)}`,
  },
  {
    id: "email",
    label: "Почта",
    icon: <I stroke><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3.5 7l8.5 6 8.5-6" /></I>,
    href: (u, t) => `mailto:?subject=${eu(t)}&body=${eu(`${t}\n\n${u}`)}`,
  },
];

function CopyIcon() {
  return <I stroke><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" /></I>;
}
function CheckIcon() {
  return <I stroke><polyline points="20 6 9 17 4 12" /></I>;
}
function NativeIcon() {
  return <I stroke><path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8" /><polyline points="16 6 12 2 8 6" /><line x1="12" y1="2" x2="12" y2="15" /></I>;
}
function ShareGlyph() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M10.12 3.5H8.02C5.24 3.5 3.5 5.47 3.5 8.25v7.5C3.5 18.53 5.23 20.5 8.02 20.5h7.96c2.79 0 4.52-1.97 4.52-4.75v-1.64" />
      <path d="M20.5 8.07V3.5M20.5 3.5h-4.57M20.5 3.5l-7.13 7.13" />
    </svg>
  );
}

const pill =
  "inline-flex items-center gap-1.5 rounded-full border border-[var(--color-text)]/20 px-3 py-1.5 text-[12px] tabular-nums transition-colors text-[var(--color-dim)] hover:text-[var(--color-text)] cursor-pointer";

export function ShareMenu({ count = 0, onShare }: { count?: number; onShare?: () => void }) {
  const [open, setOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [canNative, setCanNative] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ left: number; width: number; maxHeight: number; top?: number; bottom?: number } | null>(null);

  useEffect(() => {
    setCanNative(typeof navigator !== "undefined" && typeof navigator.share === "function");
  }, []);

  // Right-aligned to the trigger; opens downward, but flips upward when there's
  // more room above (near the page bottom). Always capped to the viewport with
  // internal scroll so no item is ever clipped off-screen.
  const place = useCallback(() => {
    const t = triggerRef.current;
    if (!t) return;
    const r = t.getBoundingClientRect();
    const margin = 12;
    const gap = 8;
    const width = Math.min(248, window.innerWidth - margin * 2);
    let left = r.right - width;
    left = Math.max(margin, Math.min(left, window.innerWidth - margin - width));
    const below = window.innerHeight - r.bottom - gap - margin;
    const above = r.top - gap - margin;
    if (below >= above) {
      setPos({ left, width, top: r.bottom + gap, maxHeight: Math.max(180, below) });
    } else {
      setPos({ left, width, bottom: window.innerHeight - r.top + gap, maxHeight: Math.max(180, above) });
    }
  }, []);

  useLayoutEffect(() => {
    if (!open) return;
    place();
    const onMove = () => place();
    window.addEventListener("scroll", onMove, true);
    window.addEventListener("resize", onMove);
    return () => {
      window.removeEventListener("scroll", onMove, true);
      window.removeEventListener("resize", onMove);
    };
  }, [open, place]);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (triggerRef.current?.contains(e.target as Node)) return;
      if (popRef.current?.contains(e.target as Node)) return;
      setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const meta = useCallback(() => {
    const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute("href");
    const url = canonical || window.location.href;
    const title = document.title.replace(/\s*[|·—-]\s*Almas Kasymzhanov.*$/i, "").trim() || document.title;
    return { url, title };
  }, []);

  const fire = useCallback(
    (channel: string) => {
      onShare?.();
      try {
        track("share", { channel });
      } catch {
        /* analytics best-effort */
      }
      fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: window.location.pathname.split("/").filter(Boolean).pop(), event_type: "share", channel }),
      }).catch(() => {});
    },
    [onShare],
  );

  const doCopy = useCallback(
    (id: string) => {
      const { url } = meta();
      navigator.clipboard?.writeText(url).then(() => {
        setCopiedId(id);
        fire(id);
        setTimeout(() => setCopiedId((c) => (c === id ? null : c)), 1800);
      });
    },
    [meta, fire],
  );

  async function nativeShare(channel: string) {
    const { url, title } = meta();
    try {
      await navigator.share({ title, text: title, url });
      fire(channel);
    } catch {
      /* cancelled */
    }
    setOpen(false);
  }

  function activate(ch: Channel) {
    // Instagram & friends: no web URL → native sheet on mobile, copy on desktop.
    if (ch.native) {
      if (canNative) nativeShare(ch.id);
      else doCopy(ch.id); // keep menu open to show "Скопировано!"
      return;
    }
    const { url, title } = meta();
    const href = ch.href!(url, title);
    if (href.startsWith("mailto:")) window.location.href = href;
    else window.open(href, "_blank", "noopener,noreferrer");
    fire(ch.id);
    setOpen(false);
  }

  const item =
    "flex items-center gap-3 w-full px-4 py-2.5 font-mono text-[12.5px] text-[var(--color-dim)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-hover)] transition-colors text-left cursor-pointer";

  return (
    <>
      <button
        ref={triggerRef}
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        title="Поделиться"
        className={pill}
      >
        <ShareGlyph /> {count}
      </button>

      {open && pos && (
        <div
          ref={popRef}
          role="menu"
          style={{ position: "fixed", top: pos.top, bottom: pos.bottom, left: pos.left, width: pos.width, maxHeight: pos.maxHeight, overflowY: "auto", zIndex: 60 }}
          className="rounded-[6px] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xl"
        >
          {canNative && (
            <button onClick={() => nativeShare("native")} className={`${item} border-b border-[var(--color-border)]`} role="menuitem">
              <span className="shrink-0 opacity-70"><NativeIcon /></span>
              <span className="flex-1">Поделиться…</span>
            </button>
          )}
          <button onClick={() => doCopy("copy")} className={item} role="menuitem">
            <span className="shrink-0 opacity-70">{copiedId === "copy" ? <CheckIcon /> : <CopyIcon />}</span>
            <span className="flex-1">{copiedId === "copy" ? "Скопировано!" : "Скопировать ссылку"}</span>
          </button>
          {CHANNELS.map((ch) => (
            <button key={ch.id} onClick={() => activate(ch)} className={item} role="menuitem">
              <span className="shrink-0 opacity-70">{copiedId === ch.id ? <CheckIcon /> : ch.icon}</span>
              <span className="flex-1">{copiedId === ch.id ? "Ссылка скопирована" : ch.label}</span>
            </button>
          ))}
        </div>
      )}
    </>
  );
}
