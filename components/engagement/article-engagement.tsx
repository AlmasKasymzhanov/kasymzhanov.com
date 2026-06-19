"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { createSupabaseBrowser } from "@/lib/supabase-browser";
import type { User } from "@supabase/supabase-js";

type Comment = {
  id: number;
  user_id: string;
  body: string;
  created_at: string;
  parent_id: number | null;
};
type Profile = { id: string; name: string | null; avatar_url: string | null };

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth={filled ? 0 : 1.6} aria-hidden>
      <path d="M12.0033 21.0205C11.8939 21.0202 11.7858 20.9964 11.6863 20.9505C11.3863 20.8095 4.29335 17.4455 2.63735 12.1375C1.55935 8.77853 2.75835 4.54453 6.63735 3.28453C8.65442 2.90778 10.5181 3.27148 12.0033 4.19153C13.4902 3.26256 15.357 2.89992 17.3723 3.28353C21.2453 4.53153 22.4414 8.76753 21.3594 12.1425C19.6033 17.5055 12.6173 20.8115 12.3213 20.9495C12.2217 20.9958 12.1132 21.02 12.0033 21.0205Z" />
    </svg>
  );
}
function CommentIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}
function ShareIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M10.12 3.5H8.02C5.24 3.5 3.5 5.47 3.5 8.25v7.5C3.5 18.53 5.23 20.5 8.02 20.5h7.96c2.79 0 4.52-1.97 4.52-4.75v-1.64" />
      <path d="M20.5 8.07V3.5M20.5 3.5h-4.57M20.5 3.5l-7.13 7.13" />
    </svg>
  );
}

const pill =
  "inline-flex items-center gap-1.5 rounded-full border border-[var(--color-text)]/20 px-3 py-1.5 text-[12px] tabular-nums transition-colors";

function fmtDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" });
}

export function ArticleEngagement({ slug }: { slug: string }) {
  const [supabase] = useState(() => createSupabaseBrowser());
  const [user, setUser] = useState<User | null>(null);
  const [likeCount, setLikeCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [shareCount, setShareCount] = useState(0);
  const [comments, setComments] = useState<Comment[]>([]);
  const [profiles, setProfiles] = useState<Record<string, Profile>>({});
  const [body, setBody] = useState("");
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    const [likeRes, shareRes, cmRes] = await Promise.all([
      supabase.from("likes").select("*", { count: "exact", head: true }).eq("slug", slug),
      supabase.from("shares").select("count").eq("slug", slug).maybeSingle(),
      supabase
        .from("comments")
        .select("id,user_id,body,created_at,parent_id")
        .eq("slug", slug)
        .eq("status", "visible")
        .order("created_at", { ascending: true }),
    ]);
    setLikeCount(likeRes.count ?? 0);
    setShareCount((shareRes.data as { count: number } | null)?.count ?? 0);
    const list = (cmRes.data as Comment[]) ?? [];
    setComments(list);
    const ids = [...new Set(list.map((c) => c.user_id))];
    if (ids.length) {
      const { data: ps } = await supabase.from("profiles").select("id,name,avatar_url").in("id", ids);
      const map: Record<string, Profile> = {};
      (ps as Profile[] | null)?.forEach((p) => (map[p.id] = p));
      setProfiles(map);
    }
  }, [supabase, slug]);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setUser(s?.user ?? null));
    load();
    return () => sub.subscription.unsubscribe();
  }, [supabase, load]);

  useEffect(() => {
    if (!user) return setLiked(false);
    supabase
      .from("likes")
      .select("id")
      .eq("slug", slug)
      .eq("user_id", user.id)
      .maybeSingle()
      .then(({ data }) => setLiked(!!data));
  }, [user, supabase, slug]);

  async function toggleLike() {
    if (!user) return;
    if (liked) {
      setLiked(false);
      setLikeCount((c) => Math.max(0, c - 1));
      await supabase.from("likes").delete().eq("slug", slug).eq("user_id", user.id);
    } else {
      setLiked(true);
      setLikeCount((c) => c + 1);
      await supabase.from("likes").insert({ slug, user_id: user.id });
    }
  }

  async function share() {
    setShareCount((c) => c + 1);
    await supabase.rpc("increment_share", { page_slug: slug });
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ url });
      } catch {
        /* user cancelled */
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
      } catch {
        /* ignore */
      }
    }
  }

  async function post(e: React.FormEvent) {
    e.preventDefault();
    if (!user || !body.trim()) return;
    setBusy(true);
    const { error } = await supabase.from("comments").insert({ slug, user_id: user.id, body: body.trim() });
    setBusy(false);
    if (!error) {
      setBody("");
      load();
    }
  }

  async function remove(id: number) {
    await supabase.from("comments").delete().eq("id", id);
    load();
  }

  return (
    <section className="mt-12">
      {/* Engagement bar */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={toggleLike}
          disabled={!user}
          aria-pressed={liked}
          title={user ? (liked ? "Убрать лайк" : "Лайк") : "Войдите, чтобы лайкнуть"}
          className={`${pill} ${liked ? "border-[var(--color-brand)] text-[var(--color-brand)]" : "text-[var(--color-dim)] hover:text-[var(--color-text)]"} ${user ? "cursor-pointer" : "cursor-default opacity-80"}`}
        >
          <HeartIcon filled={liked} /> {likeCount}
        </button>
        <a href="#comments" className={`${pill} text-[var(--color-dim)] hover:text-[var(--color-text)] no-underline`}>
          <CommentIcon /> {comments.length}
        </a>
        <button onClick={share} className={`${pill} text-[var(--color-dim)] hover:text-[var(--color-text)] cursor-pointer`}>
          <ShareIcon /> {shareCount}
        </button>
      </div>

      {/* Comments */}
      <div id="comments" className="mt-10 pt-8 border-t border-[var(--color-border)]">
        <h2 className="text-[18px] font-bold tracking-tight mb-6">
          Комментарии <span className="text-[var(--color-dim)] font-normal">{comments.length}</span>
        </h2>

        {user ? (
          <form onSubmit={post} className="mb-8">
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
            <Link href="/course-3" className="text-[var(--color-brand)] no-underline hover:underline">
              войдите
            </Link>
            .
          </div>
        )}

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
                      {user?.id === c.user_id && (
                        <button
                          onClick={() => remove(c.id)}
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
    </section>
  );
}
