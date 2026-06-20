"use client";

import { useState } from "react";
import Link from "next/link";
import { useEngagement } from "./engagement-provider";

function fmtDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" });
}

export function Comments() {
  const { slug, user, comments, profiles, err, postComment, deleteComment } = useEngagement();
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
    <div id="comments" className="mt-10 pt-8 border-t border-[var(--color-border)] scroll-mt-24">
      <h2 className="text-[18px] font-bold tracking-tight mb-6">
        Комментарии <span className="text-[var(--color-dim)] font-normal">{comments.length}</span>
      </h2>

      {user ? (
        <form onSubmit={submit} className="mb-8">
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            maxLength={4000}
            rows={3}
            placeholder="Оставьте комментарий…"
            className="w-full resize-y border border-[var(--color-border)] bg-transparent px-3.5 py-3 text-[14px] text-[var(--color-text)] placeholder:text-[var(--color-dim)] outline-none focus:border-[var(--color-brand)] transition-colors"
          />
          <div className="mt-2 flex justify-end">
            <button
              type="submit"
              disabled={busy || !body.trim()}
              className="h-[36px] px-5 rounded-[5px] text-[12px] font-bold uppercase bg-[var(--color-brand)] text-[var(--color-bg)] hover:opacity-90 disabled:opacity-50 transition-opacity"
            >
              {busy ? "Отправляем…" : "Отправить"}
            </button>
          </div>
        </form>
      ) : (
        <div className="mb-8 border border-[var(--color-border)] p-5 text-[14px] text-[var(--color-dim)] leading-relaxed">
          Чтобы оставить комментарий и поставить лайк —{" "}
          <Link
            href={`/login?next=${encodeURIComponent(`/blog/${slug}`)}`}
            className="text-[var(--color-brand)] no-underline hover:underline"
          >
            войдите
          </Link>
          .
        </div>
      )}

      {err && <p className="mb-6 text-[12px] text-red-500 break-words">Ошибка: {err}</p>}

      {comments.length === 0 ? (
        <p className="text-[14px] text-[var(--color-dim)]">Пока нет комментариев. Будьте первым.</p>
      ) : (
        <ul className="flex flex-col gap-7">
          {comments.map((c) => {
            const p = profiles[c.user_id];
            const name = p?.name ?? "Участник";
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
                    <span className="text-[var(--color-dim)]">{fmtDate(c.created_at)}</span>
                    {user?.id === c.user_id && c.id > 0 && (
                      <button
                        onClick={() => deleteComment(c.id)}
                        className="text-[var(--color-dim)] hover:text-[var(--color-brand)] transition-colors"
                      >
                        удалить
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
