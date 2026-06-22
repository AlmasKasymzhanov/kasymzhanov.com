import { SiteHeader, SiteFooter } from "@/components/canon/site-chrome";
import { CourseAccess } from "@/components/course-access";
import { type Locale, dict } from "@/lib/i18n";

// Shared login screen for RU (/login) and EN (/en/login). The auth check +
// redirect live in each route's page; this is the presentation. CourseAccess
// derives its own locale from the path (so /en/login shows English controls
// and stamps the magic-link with locale=en).
export function LoginScreen({ locale, dest }: { locale: Locale; dest: string }) {
  const t = dict[locale].login;
  return (
    <div className="font-mono text-[var(--color-text)]">
      <div className="max-w-[1400px] mx-auto border-x border-[var(--color-border)] min-h-screen flex flex-col">
        <SiteHeader />

        <main className="flex-1 flex items-center justify-center px-6 py-16 md:py-24">
          <div className="w-full max-w-md">
            <div className="text-left mb-8">
              <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-dim)] mb-3">{t.kicker}</p>
              <h1 className="text-[26px] md:text-[32px] font-bold tracking-tight leading-[1.1] mb-3">
                {t.heading}
              </h1>
              <p className="text-[14px] md:text-[15px] text-[var(--color-dim)] leading-relaxed">
                {t.sub}
              </p>
            </div>
            <CourseAccess next={dest} label="" note={t.note} />
          </div>
        </main>

        <SiteFooter locale={locale} />
      </div>
    </div>
  );
}
