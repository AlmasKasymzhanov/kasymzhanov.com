import { PersonalSidebar } from "@/components/personal-sidebar";
import type { PersonalLocale } from "@/lib/personal-locale";

const SKIP_LABEL: Record<PersonalLocale, string> = {
  ru: "К содержанию",
  kz: "Мазмұнға өту",
  en: "Skip to content",
};

export function PersonalShell({
  locale,
  children,
  mainClassName = "px-5 pb-10 pt-10 sm:px-9 md:px-12 md:pb-14 md:pt-14 xl:px-20 xl:pt-16",
}: {
  locale: PersonalLocale;
  children: React.ReactNode;
  mainClassName?: string;
}) {
  return (
    <div className="personal-site min-h-screen overflow-x-clip bg-[var(--personal-paper)] text-[var(--personal-text)]">
      <a href="#main-content" className="skip-link">
        {SKIP_LABEL[locale]}
      </a>
      <div className="mx-auto grid min-h-screen min-w-0 w-full max-w-[1440px] lg:grid-cols-[228px_minmax(0,1fr)]">
        <PersonalSidebar locale={locale} />
        <main id="main-content" className={`min-w-0 w-full bg-[var(--personal-paper)] ${mainClassName}`}>
          {children}
        </main>
      </div>
    </div>
  );
}
