import Link from "next/link";
import { PersonalShell } from "@/components/personal-shell";
import { PersonalFooter } from "@/components/personal-footer";
import { IconlyArrowLeft } from "@/components/iconly-icons";
import { CourseAccess } from "@/components/course-access";
import { type Locale, dict } from "@/lib/i18n";

export function LoginScreen({ locale, dest }: { locale: Locale; dest: string }) {
  const t = dict[locale].login;
  return <PersonalShell locale={locale}>
    <div className="flex min-h-[calc(100dvh-8rem)] max-w-[720px] flex-col xl:ml-16">
      <div className="w-full max-w-[440px] flex-1 pb-16">
        <Link href={dest} className="reading-text-action mb-10">
          <IconlyArrowLeft size={18} />{locale === "en" ? "Back to reading" : "Вернуться к чтению"}
        </Link>
        <header className="mb-8">
          <h1 className="text-[32px] font-normal leading-[1.2] tracking-[-.025em] sm:text-[38px]">
            {locale === "en" ? "Sign in" : "Войти"}
          </h1>
          <p className="mt-4 text-[16px] leading-[1.7] text-[var(--personal-muted)]">
            {locale === "en" ? "Like articles and join the conversation." : "Ставьте лайки и участвуйте в обсуждении статей."}
          </p>
        </header>
        <CourseAccess next={dest} label="" note={t.note} />
      </div>
      <PersonalFooter locale={locale} />
    </div>
  </PersonalShell>;
}
