"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { contentSlug } from "@/lib/content-identity";
import { ArticleViewTracker } from "@/components/article-view-tracker";
import { IconlyArrowLeft } from "@/components/iconly-icons";
import { EngagementProvider } from "./engagement-provider";
import { EngagementBar } from "./engagement-bar";
import { Comments } from "./comments";

export function ContentEngagement({ slug, backHref, backLabel, trackViews = true }: {
  slug?: string; backHref?: string; backLabel?: string; trackViews?: boolean;
}) {
  const pathname = usePathname() ?? "/";
  const key = slug ?? contentSlug(pathname);
  const en = pathname.startsWith("/en/");
  const tools = /^\/(?:en\/)?(?:tools|web-analyzer)(?:\/|$)/.test(pathname);
  const href = backHref ?? (tools ? "/tools" : en ? "/en/latest" : "/latest");
  const label = backLabel ?? (tools ? (en ? "All tools" : "Все инструменты") : (en ? "All articles and research" : "Все статьи и исследования"));
  return <section className="content-engagement" data-content-engagement={key} aria-label={en ? "Discussion and sharing" : "Обсуждение и публикация ссылки"}>
    {trackViews && <ArticleViewTracker slug={key} />}
    <EngagementProvider key={key} slug={key}>
      <div className="content-engagement-actions">
        <Link href={href} className="reading-text-action"><IconlyArrowLeft size={17} /><span>{label}</span></Link>
        <EngagementBar />
      </div>
      <Comments />
    </EngagementProvider>
  </section>;
}
