"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEngagement } from "./engagement-provider";
import { localeFromPathname, bcp47, dict } from "@/lib/i18n";
import { contentLoginHref } from "@/lib/content-identity";

function fmtDate(iso: string, tag: string) {
  const d = new Date(iso);
  return d.toLocaleDateString(tag, { day: "numeric", month: "long", year: "numeric" });
}

export function Comments() {
  const pathname = usePathname() ?? "/";
  const locale = localeFromPathname(pathname);
  const t = dict[locale].comments;
  const { user, comments, profiles, err, postComment, deleteComment } = useEngagement();
  const [body, setBody] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!body.trim()) return;
    setBusy(true);
    const ok = await postComment(body);
    setBusy(false);
    if (ok) setBody("");
  }

  return (
    <div id="comments" tabIndex={-1} className="mt-10 pt-4 scroll-mt-24">
      <h2 className="text-[18px] font-normal tracking-tight mb-6">
        {t.heading} <span className="text-[var(--color-dim)] font-normal">{comments.length}</span>
      </h2>

      {user ? (
        <form onSubmit={submit} className="mb-8">
          <textarea
            aria-label={t.placeholder}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            maxLength={4000}
            rows={3}
            placeholder={t.placeholder}
            className="w-full resize-y rounded-xl border border-[var(--color-border)] bg-transparent px-4 py-3 text-[14px] text-[var(--color-text)] placeholder:text-[var(--color-dim)] outline-none focus:border-[var(--personal-muted)] transition-colors"
          />
          <div className="mt-2 flex justify-end">
            <button
              type="submit"
              disabled={busy || !body.trim()}
              className="comment-submit min-h-11 px-5 rounded-xl text-[13px] font-normal disabled:opacity-50 transition-colors"
            >
              {busy ? t.submitting : t.submit}
            </button>
          </div>
        </form>
      ) : (
        <div className="comment-login mb-8 rounded-xl p-5 text-[14px] text-[var(--color-dim)] leading-relaxed">
          {t.loginPre}
          <Link
            href={contentLoginHref(pathname)}
            className="text-[var(--color-brand)] no-underline hover:text-[var(--personal-muted)]"
          >
            {t.loginLink}
          </Link>
          .
        </div>
      )}

      {err && <p className="mb-6 text-[12px] text-red-500 break-words">{t.errorPre}{err}</p>}

      {comments.length === 0 ? (
        <p className="text-[14px] text-[var(--color-dim)]">{t.empty}</p>
      ) : (
        <ul className="flex flex-col gap-7">
          {comments.map((c) => {
            const p = profiles[c.user_id];
            const name = p?.name ?? t.member;
            return (
              <li key={c.id} className="flex gap-3">
                {p?.avatar_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.avatar_url} alt="" referrerPolicy="no-referrer" className="w-8 h-8 rounded-full object-cover shrink-0 border border-[var(--color-border)]" />
                ) : (
                  <span className="w-8 h-8 rounded-full shrink-0 bg-[var(--color-surface-hover)] grid place-items-center text-[12px] text-[var(--color-text)]">
                    {name.slice(0, 1).toUpperCase()}
                  </span>
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[12px]">
                    <span className="font-medium text-[var(--color-text)]">{name}</span>
                    <span className="text-[var(--color-dim)]">{fmtDate(c.created_at, bcp47[locale])}</span>
                    {user?.id === c.user_id && c.id > 0 && (
                      <button
                        onClick={() => deleteComment(c.id)}
                        className="text-[var(--color-dim)] hover:text-[var(--color-brand)] transition-colors"
                      >
                        {t.delete}
                      </button>
                    )}
                  </div>
                  <p className="text-[14px] text-[var(--color-text)] leading-relaxed mt-1 whitespace-pre-wrap break-words">{c.body}</p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
