import Image from "next/image";
import Link from "next/link";
import { Masthead } from "@/components/canon/masthead";
import { HeaderSearch } from "@/components/canon/header-search";
import { LangToggle } from "@/components/lang-toggle";
import { ThemeToggle } from "@/components/theme-toggle";
import { SocialIcon } from "@/components/social-icons";
import { HeaderAuth } from "@/components/canon/header-auth";
import { SOCIAL_PROFILES } from "@/lib/social";

const DESCRIPTION =
  "kasymzhanov.com — независимое издание дата-журналиста, аналитика и предпринимателя " +
  "Алмаса Касымжанова. Аналитика рынков, событий и экономики.";

const SOCIAL = SOCIAL_PROFILES;

const PROJECTS = [
  {
    name: "10b.kz",
    url: "https://10b.kz",
    logoBlack: "/logos/10b-black.svg",
    logoWhite: "/logos/10b-white.svg",
    logoH: "h-5",
    desc: "Аналитика госзакупок Казахстана: тендеры, поставщики, суммы контрактов.",
  },
  {
    name: "Redstat",
    url: "https://redstat.kz",
    logoBlack: "/logos/redstat-black.png",
    logoWhite: "/logos/redstat-white.png",
    logoH: "h-4",
    desc: "Аналитика маркетплейса Kaspi: ниши, цены, продавцы и спрос.",
  },
  {
    name: "Brock UI",
    url: "https://brockui.com",
    logoBlack: "/logos/brockui-black.svg",
    logoWhite: "/logos/brockui-white.svg",
    logoH: "h-5",
    desc: "Дизайн-система графиков: редактируемые React-компоненты для дата-визуализации.",
  },
];

// Inline brand link — turns to the accent on hover.
function SiteLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-[var(--color-text)] underline decoration-1 underline-offset-2 hover:text-[var(--color-brand)] transition-colors"
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

/* ───── Author block sections (reused on home aside + article bottom) ───── */
function AboutSection() {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-[0.16em] text-[var(--color-brand)] mb-5">Обо мне</p>
      <div className="relative w-20 h-20 rounded-full overflow-hidden border border-[var(--color-border)] mb-4">
        <Image src="/avatar/almas.webp" alt="Алмас Касымжанов" fill sizes="80px" className="object-cover object-[center_24%]" />
      </div>
      <h2 className="text-[17px] font-bold tracking-tight mb-3">Алмас Касымжанов</h2>
      <div className="space-y-2 text-[12.5px] text-[var(--color-dim)] leading-relaxed">
        <p>Дата-журналист · аналитик · предприниматель</p>
        <p>1,6 млрд заказов прошли через мои алгоритмы.</p>
        <p>
          Строю <SiteLink href="https://10b.kz">10b.kz</SiteLink>,{" "}
          <SiteLink href="https://redstat.kz">redstat.kz</SiteLink>,{" "}
          <SiteLink href="https://brockui.com">brockui.com</SiteLink>
        </p>
      </div>
    </div>
  );
}

function ProjectsSection() {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-[0.16em] text-[var(--color-brand)] mb-4">Проекты</p>
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
            <p className="text-[12px] text-[var(--color-dim)] leading-relaxed mt-1">{p.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContactsSection() {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-[0.16em] text-[var(--color-brand)] mb-3">Контакты</p>
      <p className="text-[12px] text-[var(--color-dim)] leading-relaxed mb-3">Есть вопрос или идея? Напишите — отвечу.</p>
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

function SocialsSection() {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-[0.16em] text-[var(--color-brand)] mb-3">Социальные сети</p>
      <p className="text-[12px] text-[var(--color-dim)] mb-4">Подписывайтесь на мои соцсети</p>
      <Socials />
    </div>
  );
}

// Author block — vertical (home left aside) or horizontal band (article bottom). Same content.
export function AuthorBlock({ variant = "vertical" }: { variant?: "vertical" | "horizontal" }) {
  if (variant === "horizontal") {
    return (
      <section className="border-t border-[var(--color-border)] px-6 md:px-7 py-10 md:py-12">
        <div className="grid gap-10 md:gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <AboutSection />
          <ProjectsSection />
          <div className="space-y-8">
            <ContactsSection />
            <SocialsSection />
          </div>
        </div>
      </section>
    );
  }
  return (
    <>
      <AboutSection />
      <div className="mt-8 pt-6 border-t border-[var(--color-border)]">
        <ProjectsSection />
      </div>
      <div className="mt-8 pt-6 border-t border-[var(--color-border)]">
        <ContactsSection />
      </div>
      <div className="mt-8 pt-6 border-t border-[var(--color-border)]">
        <SocialsSection />
      </div>
    </>
  );
}

// Main site header — masthead left-aligned at every breakpoint (Bloomberg /
// Business Insider / Rest of World convention), controls on the right. Compact
// lang + theme on mobile, full segmented pills on tablet+. No hamburger.
export function SiteHeader() {
  return (
    <header className="border-b border-[var(--color-border)]">
      <div className="relative flex items-center justify-between gap-1.5 sm:gap-3 px-4 sm:px-6 md:px-7 py-4 md:py-5">
        <div className="min-w-0">
          <Masthead size="xl" surnameOnly />
        </div>
        <div className="shrink-0 flex items-center gap-0.5 sm:gap-3 md:gap-4">
          <LangToggle />
          <ThemeToggle />
          <HeaderSearch />
          <HeaderAuth />
        </div>
      </div>
    </header>
  );
}

// Main site footer — masthead, description, colophon, requisites + legal.
export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--color-border)]">
      <div className="px-6 md:px-7 py-10 md:py-14">
        <Masthead size="lg" surnameOnly />
        <p className="mt-5 text-[13px] md:text-[14px] text-[var(--color-dim)] leading-relaxed max-w-3xl">
          {DESCRIPTION}
        </p>
        <p className="mt-4 text-[12px] text-[var(--color-dim)]/70">
          Иллюстрации — Higgsfield AI · пайплайн Claude Code + MCP
        </p>
      </div>
      <div className="border-t border-[var(--color-border)] px-6 md:px-7 py-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between text-[12px] text-[var(--color-dim)]">
        <div className="flex flex-col gap-1 leading-relaxed">
          <span>© 2026 kasymzhanov.com · ИП «Касымжанов А.Ж.» · ИИН 930422350609</span>
          <span>
            <a href="tel:+77028290908" className="no-underline hover:text-[var(--color-brand)] transition-colors">
              +7 702 829 09 08
            </a>
            {" · "}
            <a href="mailto:almas@kasymzhanov.com" className="inline-flex items-center gap-1.5 align-middle no-underline hover:text-[var(--color-brand)] transition-colors">
              <MailIcon size={14} />
              almas@kasymzhanov.com
            </a>
          </span>
        </div>
        <nav className="flex items-center gap-5 shrink-0">
          <Link href="/privacy" className="no-underline hover:text-[var(--color-brand)] hover:underline underline-offset-4 decoration-1 transition-colors">
            Политика конфиденциальности
          </Link>
          <Link href="/terms" className="no-underline hover:text-[var(--color-brand)] hover:underline underline-offset-4 decoration-1 transition-colors">
            Оферта
          </Link>
        </nav>
      </div>
    </footer>
  );
}
