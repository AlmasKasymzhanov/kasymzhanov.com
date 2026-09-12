import type { ReactNode } from "react";
import { PersonalShell } from "@/components/personal-shell";
import { PersonalFooter } from "@/components/personal-footer";
import type { Locale } from "@/lib/i18n";
import { ChartTooltipScope } from "@/components/charts/chart-tooltip";
import { ContentEngagement } from "@/components/engagement/content-engagement";

/** Shared reading surface for public informational pages. */
export function PersonalDocument({ children, locale = "ru", report = false }: {
  children: ReactNode; locale?: Locale; report?: boolean;
}) {
  return <PersonalShell locale={locale}>
    <div className={`${report ? "max-w-[800px]" : "max-w-[720px]"} min-w-0 xl:ml-16`}>
      <div className={report ? "personal-report reading-body" : "personal-document"}>{report ? <ChartTooltipScope>{children}</ChartTooltipScope> : children}</div>
      {report && <ContentEngagement />}
      <div className="mt-20 max-w-[720px]"><PersonalFooter locale={locale} /></div>
    </div>
  </PersonalShell>;
}
