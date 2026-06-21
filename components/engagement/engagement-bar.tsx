"use client";

import { useEngagement } from "./engagement-provider";
import { ShareMenu } from "@/components/share-menu";

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

const pill =
  "inline-flex items-center gap-1.5 rounded-full border border-[var(--color-text)]/20 px-3 py-1.5 text-[12px] tabular-nums transition-colors";

// Like / comment / share pills. Shared by the article header (top) and the
// bottom of the article — both read the same EngagementProvider state.
export function EngagementBar({ className = "" }: { className?: string }) {
  const { user, liked, likeCount, shareCount, comments, toggleLike, share } = useEngagement();

  function goToComments() {
    const el = document.getElementById("comments");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      <button
        onClick={toggleLike}
        disabled={!user}
        aria-pressed={liked}
        title={user ? (liked ? "Убрать лайк" : "Лайк") : "Войдите, чтобы лайкнуть"}
        className={`${pill} ${liked ? "border-[var(--color-brand)] text-[var(--color-brand)]" : "text-[var(--color-dim)] hover:text-[var(--color-text)]"} ${user ? "cursor-pointer" : "cursor-default opacity-80"}`}
      >
        <HeartIcon filled={liked} /> {likeCount}
      </button>
      <button
        onClick={goToComments}
        title="К комментариям"
        className={`${pill} text-[var(--color-dim)] hover:text-[var(--color-text)] cursor-pointer`}
      >
        <CommentIcon /> {comments.length}
      </button>
      <ShareMenu count={shareCount} onShare={share} />
    </div>
  );
}
