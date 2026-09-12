import Image from "next/image";
import Link from "next/link";
import { Masthead } from "@/components/canon/masthead";
import { HeaderSearch } from "@/components/canon/header-search";
import { HeaderNav } from "@/components/canon/header-nav";
import { LangToggle } from "@/components/lang-toggle";
import { ThemeToggle } from "@/components/theme-toggle";
import { SocialIcon } from "@/components/social-icons";
import { HeaderAuth } from "@/components/canon/header-auth";
import { MobileMenu, MobileTopicRail } from "@/components/canon/mobile-menu";
import { SOCIAL_PROFILES } from "@/lib/social";
import { type Locale, dict } from "@/lib/i18n";

const SOCIAL = SOCIAL_PROFILES;

const PROJECTS = [
  {
    name: "10b.kz",
    url: "https://10b.kz",
    logoBlack: "/logos/10b-black.svg",
    logoWhite: "/logos/10b-white.svg",
    logoH: "h-5",
    descKey: "tenb",
  },
  {
    name: "Redstat",
    url: "https://redstat.kz",
    logoBlack: "/logos/redstat-black.png",
    logoWhite: "/logos/redstat-white.png",
    logoH: "h-4",
    descKey: "redstat",
  },
  {
    name: "Brock UI",
    url: "https://brockui.com",
    logoBlack: "/logos/brockui-black.svg",
    logoWhite: "/logos/brockui-white.svg",
    logoH: "h-5",
    descKey: "brock",
  },
] as const;

// Inline brand link — turns to the accent on hover.
function SiteLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-[var(--color-text)] underline decoration-1  hover:text-[var(--color-brand)] transition-colors"
    >
      {children}
    </a>
  );
}

export function Socials({ className = "" }: { className?: string }) {
  return (
    <nav className={`flex items-center flex-wrap gap-4 ${className}`}>
      {SOCIAL.map((s) => (
        <a
          key={s.href}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.label}
          title={s.label}
          className="text-[var(--color-dim)] hover:text-[var(--color-brand)] transition-colors"
        >
          <SocialIcon name={s.icon} size={18} />
        </a>
      ))}
    </nav>
  );
}

function MailIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path fillRule="evenodd" clipRule="evenodd" d="M2.84707 6.40946C3.10706 6.08701 3.57923 6.03636 3.90168 6.29635L10.4238 11.5549C11.3677 12.3035 12.7045 12.3038 13.6488 11.5558L20.1145 6.29831C20.4359 6.03699 20.9082 6.08567 21.1696 6.40705C21.4309 6.72842 21.3822 7.20079 21.0608 7.46212L14.5851 12.7278C13.0936 13.9129 10.9801 13.9128 9.48863 12.7278L9.48445 12.7244L2.96018 7.46407C2.63773 7.20409 2.58708 6.73192 2.84707 6.40946Z" fill="currentColor" />
      <path d="M16.431 20.8499H7.56701C6.89159 20.8593 6.22114 20.733 5.59539 20.4787C4.96963 20.2243 4.40129 19.8469 3.92401 19.3689C3.37586 18.8018 2.94565 18.1316 2.65831 17.3971C2.37096 16.6626 2.23218 15.8784 2.25001 15.0899V8.9129C2.20606 8.18075 2.31067 7.44727 2.55756 6.7566C2.80445 6.06593 3.1885 5.43235 3.68662 4.89396C4.18474 4.35558 4.78662 3.92353 5.45606 3.62381C6.1255 3.32408 6.84865 3.16288 7.58201 3.1499H16.418C17.1514 3.16288 17.8745 3.32408 18.544 3.62381C19.2134 3.92353 19.8153 4.35558 20.3134 4.89396C20.8115 5.43235 21.1956 6.06593 21.4424 6.7566C21.6893 7.44727 21.794 8.18075 21.75 8.9129V15.0899C21.7673 15.8777 21.6283 16.6612 21.3409 17.395C21.0536 18.1287 20.6237 18.7983 20.076 19.3649C19.5988 19.8438 19.0303 20.222 18.4041 20.4771C17.778 20.7322 17.107 20.859 16.431 20.8499ZM7.58001 19.3499H16.429C16.9081 19.3582 17.384 19.2702 17.8284 19.091C18.2728 18.9119 18.6767 18.6452 19.016 18.3069C19.4241 17.8788 19.7432 17.3741 19.955 16.8219C20.1668 16.2697 20.2671 15.6811 20.25 15.0899V8.9129C20.25 6.4429 18.639 4.6499 16.418 4.6499H7.58201C5.36101 4.6499 3.75001 6.4429 3.75001 8.9129V15.0899C3.73345 15.6804 3.83396 16.2683 4.04575 16.8198C4.25755 17.3712 4.57643 17.8753 4.98401 18.3029C5.32308 18.641 5.72661 18.9076 6.17066 19.0867C6.61471 19.2659 7.09024 19.354 7.56901 19.3459L7.58001 19.3499Z" fill="currentColor" />
    </svg>
  );
}

/* ───── Author block sections (reused on home aside + article bottom + about page) ───── */
export function AboutSection({ locale }: { locale: Locale }) {
  const t = dict[locale];
  const authorName = "Almas Kasymzhanov";
  return (
    <div>
      <p className="text-[11px] uppercase tracking-[0.16em] text-[var(--color-brand)] mb-5">{t.about.label}</p>
      <div className="relative w-20 h-20 rounded-full overflow-hidden border border-[var(--color-border)] mb-4">
        <Image src="/avatar/almas.webp" alt={authorName} fill sizes="80px" className="object-cover object-[center_24%]" />
      </div>
      <h2 className="text-[17px] font-medium tracking-tight mb-3">{authorName}</h2>
      <div className="space-y-2 text-[12.5px] text-[var(--color-dim)] leading-relaxed">
        <p>{t.about.role}</p>
        <p>{t.about.orders}</p>
        <p>
          {t.about.building} <SiteLink href="https://10b.kz">10b.kz</SiteLink>,{" "}
          <SiteLink href="https://redstat.kz">redstat.kz</SiteLink>,{" "}
          <SiteLink href="https://brockui.com">brockui.com</SiteLink>
        </p>
      </div>
    </div>
  );
}

export function ProjectsSection({ locale }: { locale: Locale }) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-[0.16em] text-[var(--color-brand)] mb-4">{dict[locale].projects.label}</p>
      <div className="space-y-4">
        {PROJECTS.map((p) => (
          <div key={p.name}>
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={p.name}
              className="group inline-flex items-center gap-2 no-underline hover:opacity-70 transition-opacity"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.logoWhite} alt={p.name} className={`${p.logoH} w-auto block [.light_&]:hidden`} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.logoBlack} alt="" className={`${p.logoH} w-auto hidden [.light_&]:block`} />
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
                className="shrink-0 text-[var(--color-dim)] group-hover:text-[var(--color-brand)] transition-colors"
              >
                <path d="M8 16L16 8M16 8H10M16 8V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <p className="text-[12px] text-[var(--color-dim)] leading-relaxed mt-1">{dict[locale].projects[p.descKey]}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ContactsSection({ locale }: { locale: Locale }) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-[0.16em] text-[var(--color-brand)] mb-3">{dict[locale].contact.label}</p>
      <p className="text-[12px] text-[var(--color-dim)] leading-relaxed mb-3">{dict[locale].contact.body}</p>
      <a
        href="mailto:almas@kasymzhanov.com"
        className="inline-flex items-center gap-2 text-[13px] text-[var(--color-text)] no-underline hover:text-[var(--color-brand)] transition-colors"
      >
        <MailIcon size={16} />
        almas@kasymzhanov.com
      </a>
    </div>
  );
}

export function SocialsSection({ locale }: { locale: Locale }) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-[0.16em] text-[var(--color-brand)] mb-3">{dict[locale].social.label}</p>
      <p className="text-[12px] text-[var(--color-dim)] mb-4">{dict[locale].social.body}</p>
      <Socials />
    </div>
  );
}

// Author block — vertical (home left aside) or horizontal band (article bottom). Same content.
export function AuthorBlock({ variant = "vertical", locale = "ru" }: { variant?: "vertical" | "horizontal"; locale?: Locale }) {
  if (variant === "horizontal") {
    return (
      <section className="border-t border-[var(--color-border)] px-6 md:px-7 py-10 md:py-12">
        <div className="grid gap-10 md:gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <AboutSection locale={locale} />
          <ProjectsSection locale={locale} />
          <div className="space-y-8">
            <ContactsSection locale={locale} />
            <SocialsSection locale={locale} />
          </div>
        </div>
      </section>
    );
  }
  return (
    <>
      <AboutSection locale={locale} />
      <div className="mt-8 pt-6 border-t border-[var(--color-border)]">
        <ProjectsSection locale={locale} />
      </div>
      <div className="mt-8 pt-6 border-t border-[var(--color-border)]">
        <ContactsSection locale={locale} />
      </div>
      <div className="mt-8 pt-6 border-t border-[var(--color-border)]">
        <SocialsSection locale={locale} />
      </div>
    </>
  );
}

function MobilePublicationHeader({ locale }: { locale: Locale }) {
  const homeHref = locale === "en" ? "/en" : "/";
  return (
    <div className="xl:hidden">
      <div className="flex h-16 items-center justify-between gap-3 px-4 sm:px-6">
        <div className="min-w-0 overflow-hidden">
          <Masthead size="xl" surnameOnly href={homeHref} />
        </div>
        <div className="-mr-1 flex shrink-0 items-center">
          <HeaderAuth variant="icon" />
          <MobileMenu />
        </div>
      </div>
      <MobileTopicRail />
    </div>
  );
}

// Main site header: one compact publication header below xl, with all
// interface settings inside the menu; full editorial chrome on desktop.
export function SiteHeader({ locale = "ru", variant = "compact" }: { locale?: Locale; variant?: "compact" | "masthead" }) {
  const t = dict[locale];
  const prefix = locale === "en" ? "/en" : "";
  const homeHref = locale === "en" ? "/en" : "/";

  if (variant === "masthead") {
    return (
      <header className="relative border-b border-[var(--color-border)]">
        <a href="#main-content" className="skip-link">{locale === "en" ? "Skip to content" : "Перейти к материалам"}</a>
        <MobilePublicationHeader locale={locale} />
        <div className="hidden xl:block">
          <div className="flex items-center justify-between gap-4 border-b border-[var(--color-border)] px-8 py-2.5">
            <nav className="flex items-center gap-5 font-body text-[12px] font-semibold" aria-label={locale === "en" ? "Publication" : "Издание"}>
              <Link href={`${prefix}/latest`} className="transition-colors hover:text-[var(--color-brand)]">{t.nav.latest}</Link>
              <Link href={`${prefix}/newsletter`} className="transition-colors hover:text-[var(--color-brand)]">{t.nav.newsletter}</Link>
              <Link href={`${prefix}/about`} className="transition-colors hover:text-[var(--color-brand)]">{t.nav.about}</Link>
              <Link href={`${prefix}/tools`} className="transition-colors hover:text-[var(--color-brand)]">{t.nav.practice}</Link>
            </nav>
            <div className="ml-auto flex items-center gap-3">
              <LangToggle />
              <ThemeToggle />
              <HeaderSearch />
              <HeaderAuth />
            </div>
          </div>
          <div className="flex flex-col items-center px-4 py-12 text-center">
            <Masthead size="hero" surnameOnly href={homeHref} />
            <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-dim)]">
              {locale === "en" ? "Independent data publication · Central Asia" : "Независимое дата-издание · Центральная Азия"}
            </p>
          </div>
          <div className="flex min-h-12 items-center justify-center border-t border-[var(--color-border)] px-4">
            <HeaderNav />
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="relative border-b border-[var(--color-border)]">
      <a href="#main-content" className="skip-link">{locale === "en" ? "Skip to content" : "Перейти к материалу"}</a>
      <MobilePublicationHeader locale={locale} />
      <div className="hidden items-center justify-between gap-3 px-7 py-5 xl:flex">
        <div className="min-w-0 flex items-center gap-4 md:gap-6">
          <Masthead size="xl" surnameOnly href={homeHref} />
          <HeaderNav />
        </div>
        <div className="flex shrink-0 items-center gap-4">
          <LangToggle />
          <ThemeToggle />
          <HeaderSearch />
          <HeaderAuth />
        </div>
      </div>
    </header>
  );
}

// Main site footer — author name, description, colophon, requisites + legal.
export function SiteFooter({ locale = "ru", hidePhone = false }: { locale?: Locale; hidePhone?: boolean }) {
  const t = dict[locale];
  const prefix = locale === "en" ? "/en" : "";
  return (
    <footer className="border-t border-[var(--color-border)]">
      <div className="px-6 md:px-7 py-10 md:py-14">
        <h2 className="text-[24px] md:text-[32px] font-medium tracking-tight text-[var(--color-text)]">Almas Kasymzhanov</h2>
        <p className="mt-2 text-[13px] text-[var(--color-brand)] font-medium">{t.about.role}</p>
        <p className="mt-5 text-[13px] md:text-[14px] text-[var(--color-dim)] leading-relaxed max-w-3xl">
          {t.footer.desc}
        </p>
        <div className="mt-7 grid gap-6 border-t border-[var(--color-border)] pt-7 sm:grid-cols-3">
          <nav className="flex flex-col items-start gap-2 text-[12px]" aria-label={locale === "en" ? "Explore" : "Разделы"}>
            <Link href={`${prefix}/latest`} className="hover:text-[var(--color-brand)]">{t.nav.latest}</Link>
            <Link href={`${prefix}/market`} className="hover:text-[var(--color-brand)]">{t.nav.market}</Link>
            <Link href={`${prefix}/kaspi`} className="hover:text-[var(--color-brand)]">{t.nav.kaspi}</Link>
            <Link href={`${prefix}/technology`} className="hover:text-[var(--color-brand)]">{t.nav.technology}</Link>
          </nav>
          <nav className="flex flex-col items-start gap-2 text-[12px]" aria-label={locale === "en" ? "Publication" : "Об издании"}>
            <Link href={`${prefix}/about`} className="hover:text-[var(--color-brand)]">{t.nav.about}</Link>
            <Link href={`${prefix}/standards`} className="hover:text-[var(--color-brand)]">{locale === "en" ? "Editorial standards" : "Редакционные стандарты"}</Link>
            <Link href={`${prefix}/newsletter`} className="hover:text-[var(--color-brand)]">{t.nav.newsletter}</Link>
            <a href={locale === "en" ? "/en/feed.xml" : "/feed.xml"} className="hover:text-[var(--color-brand)]">RSS</a>
          </nav>
          <p className="text-[12px] leading-relaxed text-[var(--color-dim)]">{t.footer.colophon}</p>
        </div>
      </div>
      <div className="border-t border-[var(--color-border)] px-6 md:px-7 py-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between text-[12px] text-[var(--color-dim)]">
        <div className="flex flex-col gap-1 leading-relaxed">
          <span>{t.footer.requisites}</span>
          <span>
            {!hidePhone && (
              <>
                <a href="tel:+77028290908" className="no-underline hover:text-[var(--color-brand)] transition-colors">
                  +7 702 829 09 08
                </a>
                {" · "}
              </>
            )}
            <a href="mailto:almas@kasymzhanov.com" className="inline-flex items-center gap-1.5 align-middle no-underline hover:text-[var(--color-brand)] transition-colors">
              <MailIcon size={14} />
              almas@kasymzhanov.com
            </a>
          </span>
        </div>
        <nav className="flex flex-wrap items-center gap-5 shrink-0">
          <Link href="/privacy" className="no-underline hover:text-[var(--color-brand)]   decoration-1 transition-colors">
            {t.footer.privacy}
          </Link>
          <Link href="/terms" className="no-underline hover:text-[var(--color-brand)]   decoration-1 transition-colors">
            {t.footer.terms}
          </Link>
        </nav>
      </div>
    </footer>
  );
}
