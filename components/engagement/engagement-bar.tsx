"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEngagement } from "./engagement-provider";
import { ShareMenu } from "@/components/share-menu";
import { IconlyHeart, IconlyChat } from "@/components/iconly-icons";
import { contentLoginHref } from "@/lib/content-identity";
import { localeFromPathname, dict } from "@/lib/i18n";




const control = "engagement-control";

// One action row at the end of each material.
export function EngagementBar({ className = "" }: { className?: string }) {
  const pathname = usePathname() ?? "/";
  const router = useRouter();
  const t = dict[localeFromPathname(pathname)].engage;
  const { slug, user, liked, likeCount, shareCount, comments, toggleLike, share } = useEngagement();

  function goToComments() {
    const el = document.getElementById("comments");
    if (el) {
      el.focus({ preventScroll: true });
      el.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "start" });
    }
  }

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      <button
        onClick={() => user ? toggleLike() : router.push(contentLoginHref(pathname))}
        aria-label={user ? (liked ? t.unlike : t.like) : t.likePrompt}
        aria-pressed={liked}
        title={user ? (liked ? t.unlike : t.like) : t.likePrompt}
        className={`${control} ${liked ? "border-[var(--color-brand)] text-[var(--color-brand)]" : "text-[var(--color-dim)] hover:text-[var(--color-text)]"} cursor-pointer`}
      >
        <IconlyHeart size={18} filled={liked} /> {likeCount}
      </button>
      <button
        onClick={goToComments}
        title={t.toComments}
        aria-label={t.toComments}
        className={`${control} text-[var(--color-dim)] hover:text-[var(--color-text)] cursor-pointer`}
      >
        <IconlyChat size={18} /> {comments.length}
      </button>
      <ShareMenu count={shareCount} onShare={share} slug={slug} />
    </div>
  );
}
