// Single source of truth for the publication's public profiles (identity links).
// Used by the social icon row (site-chrome) and by structured-data `sameAs`
// (root Person JSON-LD + per-article author). GitHub points to the PROFILE
// (identity), not a repo — canonical for social/sameAs.

export const SOCIAL_PROFILES = [
  { icon: "github", label: "GitHub", href: "https://github.com/AlmasKasymzhanov" },
  { icon: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/akasymzhanov/" },
  { icon: "telegram", label: "Telegram", href: "https://t.me/akasymzhanov" },
  { icon: "instagram", label: "Instagram", href: "https://www.instagram.com/akasymzhanovv/" },
  { icon: "x", label: "X (Twitter)", href: "https://x.com/akasymzhanov" },
  { icon: "youtube", label: "YouTube", href: "https://www.youtube.com/@akasymzhanovv" },
  { icon: "threads", label: "Threads", href: "https://www.threads.com/@akasymzhanovv" },
  { icon: "facebook", label: "Facebook", href: "https://www.facebook.com/almaskassymzhanov" },
] as const;

export const SOCIAL_SAMEAS: string[] = SOCIAL_PROFILES.map((s) => s.href);
