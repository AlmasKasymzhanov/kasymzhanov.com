"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { track } from "@vercel/analytics";
import { IconlyShare, IconlyCopy, IconlyTelegram, IconlyX, IconlyInstagram, IconlyLinkedIn, IconlyEmail, IconlyWhatsApp, IconlyFacebook, IconlyThreads, IconlyVK } from "@/components/iconly-icons";
import { localeFromPathname, dict } from "@/lib/i18n";
import { contentSlug, contentShareUrl } from "@/lib/content-identity";

/*
 * Canon share control. One unbordered control (icon + count) that opens a menu:
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


const CHANNELS: Channel[] = [
  {
    id: "telegram",
    label: "Telegram",
    icon: <IconlyTelegram size={18} />,
    href: (u, t) => `https://t.me/share/url?url=${eu(u)}&text=${eu(t)}`,
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    icon: <IconlyWhatsApp size={18} />,
    href: (u, t) => `https://wa.me/?text=${eu(`${t}\n${u}`)}`,
  },
  {
    id: "vk",
    label: "ВКонтакте",
    icon: <IconlyVK size={18} />,
    href: (u, t) => `https://vk.com/share.php?url=${eu(u)}&title=${eu(t)}`,
  },
  {
    id: "instagram",
    label: "Instagram",
    native: true,
    icon: <IconlyInstagram size={18} />,
  },
  {
    id: "threads",
    label: "Threads",
    icon: <IconlyThreads size={18} />,
    href: (u, t) => `https://www.threads.net/intent/post?text=${eu(`${t}\n${u}`)}`,
  },
  {
    id: "x",
    label: "X (Twitter)",
    icon: <IconlyX size={18} />,
    href: (u, t) => `https://twitter.com/intent/tweet?url=${eu(u)}&text=${eu(t)}`,
  },
  {
    id: "facebook",
    label: "Facebook",
    icon: <IconlyFacebook size={18} />,
    href: (u) => `https://www.facebook.com/sharer/sharer.php?u=${eu(u)}`,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    icon: <IconlyLinkedIn size={18} />,
    href: (u) => `https://www.linkedin.com/sharing/share-offsite/?url=${eu(u)}`,
  },
  {
    id: "email",
    label: "Почта",
    icon: <IconlyEmail size={18} />,
    href: (u, t) => `mailto:?subject=${eu(t)}&body=${eu(`${t}\n\n${u}`)}`,
  },
];






const control = "engagement-control text-[var(--personal-muted)] hover:text-[var(--personal-text)]";

export function ShareMenu({ count = 0, onShare, slug }: { count?: number; onShare?: () => void; slug?: string }) {
  const t = dict[localeFromPathname(usePathname() ?? "/")].engage;
  const chLabel = (ch: Channel) => (ch.id === "vk" ? t.vk : ch.id === "email" ? t.email : ch.label);
  const [open, setOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [canNative, setCanNative] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ left: number; width: number; maxHeight: number; top?: number; bottom?: number } | null>(null);
  const positioned = pos !== null;

  useEffect(() => {
    if (open && positioned) popRef.current?.querySelector<HTMLButtonElement>('[role="menuitem"]')?.focus({ preventScroll: true });
  }, [open, positioned]);

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
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); triggerRef.current?.focus(); }
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const meta = useCallback(() => {
    const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute("href");
    const url = contentShareUrl(window.location.pathname, canonical);
    const title = document.title.replace(/\s*[|·—-]\s*(?:Almas Kasymzhanov|Алмас Касымжанов).*$/i, "").trim() || document.title;
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
        body: JSON.stringify({ slug: slug ?? contentSlug(window.location.pathname), event_type: "share", channel }),
      }).catch(() => {});
    },
    [onShare, slug],
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

  const item = "share-menu-item";

  return (
    <>
      <button
        ref={triggerRef}
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        title={t.share}
        aria-label={t.share}
        className={control}
      >
        <IconlyShare size={18} /> {count}
      </button>

      {open && pos && (
        <div
          ref={popRef}
          role="menu"
          aria-label={t.share}
          onKeyDown={(event) => {
            const items = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>('[role="menuitem"]'));
            const index = items.indexOf(document.activeElement as HTMLButtonElement);
            const next = event.key === "ArrowDown" ? (index + 1) % items.length
              : event.key === "ArrowUp" ? (index - 1 + items.length) % items.length
              : event.key === "Home" ? 0 : event.key === "End" ? items.length - 1 : -1;
            if (next >= 0) { event.preventDefault(); items[next]?.focus(); }
            if (event.key === "Tab") setOpen(false);
          }}
          style={{ position: "fixed", top: pos.top, bottom: pos.bottom, left: pos.left, width: pos.width, maxHeight: pos.maxHeight, overflowY: "auto", zIndex: 60 }}
          className="share-menu"
        >
          {canNative && (
            <button onClick={() => nativeShare("native")} className={item} role="menuitem">
              <span className="shrink-0 opacity-70"><IconlyShare size={18} /></span>
              <span className="flex-1">{t.shareNative}</span>
            </button>
          )}
          <button onClick={() => doCopy("copy")} className={item} role="menuitem">
            <span className="shrink-0 opacity-70">{copiedId === "copy" ? <IconlyCopy size={18} /> : <IconlyCopy size={18} />}</span>
            <span className="flex-1">{copiedId === "copy" ? t.copied : t.copyLink}</span>
          </button>
          {CHANNELS.map((ch) => (
            <button key={ch.id} onClick={() => activate(ch)} className={item} role="menuitem">
              <span className="shrink-0 opacity-70">{copiedId === ch.id ? <IconlyCopy size={18} /> : ch.icon}</span>
              <span className="flex-1">{copiedId === ch.id ? t.linkCopied : chLabel(ch)}</span>
            </button>
          ))}
        </div>
      )}
    </>
  );
}
