import { ContentEngagement } from "@/components/engagement/content-engagement";
import { ReadTracker } from "@/components/read-tracker";
import { ArticleViewTracker } from "@/components/article-view-tracker";
import { PersonalFooter } from "@/components/personal-footer";
import { PersonalShell } from "@/components/personal-shell";
import { type Locale } from "@/lib/i18n";
import { ChartTooltipScope } from "@/components/charts/chart-tooltip";

export function ArticleLayout({
  header,
  children,
  slug,
  locale = "ru",
}: {
  header: React.ReactNode;
  children: React.ReactNode;
  slug: string;
  locale?: Locale;
  showAuthorBlock?: boolean;
}) {
  const personalLocale = locale === "en" ? "en" : "ru";
  const allArticlesHref = locale === "en" ? "/en/latest" : "/latest";

  return (
    <PersonalShell locale={personalLocale}>
      <ArticleViewTracker slug={slug} />
      <ReadTracker slug={slug} />


      <div className="mx-auto w-full max-w-[1040px] xl:ml-16">

          <article>
            {header}

            <div className="article-content w-full max-w-[720px]">
              <div className="article-story-body reading-body" data-article-body>
                <ChartTooltipScope>{children}</ChartTooltipScope>
              </div>

              <ContentEngagement slug={slug} trackViews={false} backHref={allArticlesHref} backLabel={locale === "en" ? "All articles" : "Все статьи"} />
            </div>
          </article>


        <div className="mt-20 max-w-[720px]">
          <PersonalFooter locale={personalLocale} />
        </div>
      </div>
    </PersonalShell>
  );
}
