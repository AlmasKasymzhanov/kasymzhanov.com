import Image from "next/image";
import Link from "next/link";
import { Masthead } from "@/components/canon/masthead";
import { HeaderSearch } from "@/components/canon/header-search";
import { LangToggle } from "@/components/lang-toggle";
import { ThemeToggle } from "@/components/theme-toggle";
import { SocialIcon } from "@/components/social-icons";
import { HeaderAuth } from "@/components/canon/header-auth";

const DESCRIPTION =
  "kasymzhanov.com — независимое издание дата-журналиста, аналитика и предпринимателя " +
  "Алмаса Касымжанова. Аналитика рынков, событий и экономики.";

const SOCIAL = [
  { icon: "github", href: "https://github.com/AlmasKasymzhanov" },
  { icon: "linkedin", href: "https://www.linkedin.com/in/akasymzhanov/" },
  { icon: "telegram", href: "https://t.me/akasymzhanov" },
  { icon: "instagram", href: "https://www.instagram.com/almas_kasymzhanov/" },
  { icon: "facebook", href: "https://www.facebook.com/almaskassymzhanov" },
  { icon: "threads", href: "https://www.threads.net/@almas_kasymzhanov" },
  { icon: "youtube", href: "https://www.youtube.com/@akasymzhanovv" },
];

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

function Socials({ className = "" }: { className?: string }) {
  return (
    <nav className={`flex items-center gap-4 ${className}`}>
      {SOCIAL.map((s) => (
        <a
          key={s.href}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.icon}
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
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
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
          Разработал <SiteLink href="https://10b.kz">10b.kz</SiteLink>,{" "}
          <SiteLink href="https://redstat.kz">redstat.kz</SiteLink>
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
      <section className="border-t border-[var(--color-border)] px-6 md:px-12 py-10 md:py-12">
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

// Main site header — centered masthead (links home), language · theme · search · login.
export function SiteHeader() {
  return (
    <header className="border-b border-[var(--color-border)]">
      <div className="relative grid grid-cols-3 items-center px-6 md:px-12 py-5">
        <div className="justify-self-start" aria-hidden />
        <div className="justify-self-center text-center">
          <Link href="/" aria-label="На главную" className="no-underline">
            <Masthead size="xl" surnameOnly />
          </Link>
        </div>
        <div className="justify-self-end flex items-center gap-3 md:gap-4">
          <div className="hidden sm:flex items-center gap-3 md:gap-4">
            <LangToggle />
            <ThemeToggle />
          </div>
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
      <div className="px-6 md:px-12 py-10 md:py-14">
        <Link href="/" aria-label="На главную" className="no-underline inline-block">
          <Masthead size="lg" surnameOnly />
        </Link>
        <p className="mt-5 text-[13px] md:text-[14px] text-[var(--color-dim)] leading-relaxed max-w-3xl">
          {DESCRIPTION}
        </p>
        <p className="mt-4 text-[12px] text-[var(--color-dim)]/70">
          Иллюстрации — Higgsfield AI · пайплайн Claude Code + MCP
        </p>
      </div>
      <div className="border-t border-[var(--color-border)] px-6 md:px-12 py-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between text-[12px] text-[var(--color-dim)]">
        <div className="flex flex-col gap-1 leading-relaxed">
          <span>© 2026 kasymzhanov.com · ИП «Касымжанов А.Ж.» · ИИН 930422350609</span>
          <span>
            <a href="tel:+77028290908" className="no-underline hover:text-[var(--color-brand)] transition-colors">
              +7 702 829 09 08
            </a>
            {" · "}
            <a href="mailto:almas@kasymzhanov.com" className="no-underline hover:text-[var(--color-brand)] transition-colors">
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
