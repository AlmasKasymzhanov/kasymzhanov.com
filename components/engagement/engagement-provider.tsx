"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { createSupabaseBrowser } from "@/lib/supabase-browser";
import type { User } from "@supabase/supabase-js";

export type Comment = {
  id: number;
  user_id: string;
  body: string;
  created_at: string;
  parent_id: number | null;
};
export type Profile = { id: string; name: string | null; avatar_url: string | null };

type Ctx = {
  slug: string;
  user: User | null;
  liked: boolean;
  likeCount: number;
  shareCount: number;
  comments: Comment[];
  profiles: Record<string, Profile>;
  err: string | null;
  toggleLike: () => void;
  share: () => void;
  postComment: (body: string) => Promise<boolean>;
  deleteComment: (id: number) => void;
};

const EngagementContext = createContext<Ctx | null>(null);

export function useEngagement() {
  const c = useContext(EngagementContext);
  if (!c) throw new Error("useEngagement must be used inside <EngagementProvider>");
  return c;
}

// Single source of truth for an article's likes / shares / comments, shared by
// the top and bottom engagement bars + the comments section so they stay in sync.
export function EngagementProvider({ slug, children }: { slug: string; children: React.ReactNode }) {
  const [supabase] = useState(() => createSupabaseBrowser());
  const [user, setUser] = useState<User | null>(null);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [shareCount, setShareCount] = useState(0);
  const [comments, setComments] = useState<Comment[]>([]);
  const [profiles, setProfiles] = useState<Record<string, Profile>>({});
  const [err, setErr] = useState<string | null>(null);

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
      setProfiles((prev) => ({ ...prev, ...map }));
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

  const toggleLike = useCallback(async () => {
    if (!user) return;
    setErr(null);
    if (liked) {
      setLiked(false);
      setLikeCount((c) => Math.max(0, c - 1));
      const { error } = await supabase.from("likes").delete().eq("slug", slug).eq("user_id", user.id);
      if (error) {
        setLiked(true);
        setLikeCount((c) => c + 1);
        setErr(error.message);
      }
    } else {
      setLiked(true);
      setLikeCount((c) => c + 1);
      const { error } = await supabase.from("likes").insert({ slug, user_id: user.id });
      if (error) {
        setLiked(false);
        setLikeCount((c) => Math.max(0, c - 1));
        setErr(error.message);
      }
    }
  }, [user, liked, supabase, slug]);

  const share = useCallback(async () => {
    setShareCount((c) => c + 1);
    await supabase.rpc("increment_share", { page_slug: slug });
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ url });
      } catch {
        /* cancelled */
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
      } catch {
        /* ignore */
      }
    }
  }, [supabase, slug]);

  const postComment = useCallback(
    async (raw: string) => {
      const body = raw.trim();
      if (!user || !body) return false;
      setErr(null);
      const temp: Comment = {
        id: -Date.now(),
        user_id: user.id,
        body,
        created_at: new Date().toISOString(),
        parent_id: null,
      };
      // Show instantly + ensure the author's profile is available for display.
      setComments((cs) => [...cs, temp]);
      setProfiles((p) =>
        p[user.id]
          ? p
          : {
              ...p,
              [user.id]: {
                id: user.id,
                name:
                  (user.user_metadata?.full_name as string) ??
                  (user.user_metadata?.name as string) ??
                  user.email ??
                  "Участник",
                avatar_url: (user.user_metadata?.avatar_url as string) ?? null,
              },
            },
      );
      const { data, error } = await supabase
        .from("comments")
        .insert({ slug, user_id: user.id, body })
        .select("id,user_id,body,created_at,parent_id")
        .single();
      if (error) {
        setComments((cs) => cs.filter((c) => c.id !== temp.id));
        setErr(error.message);
        return false;
      }
      setComments((cs) => cs.map((c) => (c.id === temp.id ? (data as Comment) : c)));
      return true;
    },
    [user, supabase, slug],
  );

  const deleteComment = useCallback(
    async (id: number) => {
      setErr(null);
      const prev = comments;
      setComments((cs) => cs.filter((c) => c.id !== id));
      const { error } = await supabase.from("comments").delete().eq("id", id);
      if (error) {
        setComments(prev);
        setErr(error.message);
      }
    },
    [comments, supabase],
  );

  return (
    <EngagementContext.Provider
      value={{ slug, user, liked, likeCount, shareCount, comments, profiles, err, toggleLike, share, postComment, deleteComment }}
    >
      {children}
    </EngagementContext.Provider>
  );
}
