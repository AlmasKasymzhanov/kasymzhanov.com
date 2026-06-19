import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getSupabase } from "@/lib/supabase";
import { SiteHeader, SiteFooter, AuthorBlock } from "@/components/canon/site-chrome";

export const metadata: Metadata = {
  title: "A. Kasymzhanov — дата-журнал о маркетплейсах",
  description:
    "Разборы ниш маркетплейсов Казахстана, юнит-экономика и ошибки брендов. Данные вместо мнений.",
};

// Refresh view counts periodically (ISR) without per-request cost.
export const revalidate = 120;

type Article = {
  href: string;
  slug: string; // page_views slug
  img: string;
  rubric: string;
  title: string;
  subtitle: string;
  date: string;
  readMin: number;
  // Engagement counts — placeholder until the backend (likes/comments/shares tables) is wired.
  likes: number;
  comments: number;
  shares: number;
  // Hero image credit — flagship only.
  credit?: string;
};

const LEAD: Article = {
  href: "/blog/nvidia-kazakhstan",
  slug: "nvidia-kazakhstan",
  img: "",
  rubric: "Аналитика",
  title: "NVIDIA и Казахстан: что стоит за сделкой на чипы",
  subtitle:
    "Зачем стране ускорители NVIDIA, кто за этим стоит и что это меняет для дата-центров и экономики — разбираем по данным.",
  date: "Июнь 2026",
  readMin: 6,
  likes: 0,
  comments: 0,
  shares: 0,
  credit: "Иллюстрация: Алмас Касымжанов · Higgsfield AI",
};

const LICK: Article = {
  href: "/blog/why-blogger-brands-fail",
  slug: "why-blogger-brands-fail",
  img: "/blog/why-blogger-brands-fail/likbeauty.webp",
  rubric: "Рынок",
  title: "Блеск и тени Lick Beauty",
  subtitle: "Как бренд с 7 млн подписчиков проиграл реплике за 420 тенге.",
  date: "25 Мар 2026",
  readMin: 7,
  likes: 142,
  comments: 18,
  shares: 9,
};

const MCP: Article = {
  href: "/blog/kaspi-mcp",
  slug: "kaspi-mcp",
  img: "/blog/kaspi-mcp/mcp.webp",
  rubric: "Инструменты",
  title: "Арифметика лени: как AI добывает золото из Kaspi",
  subtitle: "MCP-коннектор: Claude сам достаёт ниши, цены и долю «без бренда».",
  date: "29 Май 2026",
  readMin: 5,
  likes: 86,
  comments: 7,
  shares: 5,
};

function ClockIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path fillRule="evenodd" clipRule="evenodd" d="M11.9998 3.50009C7.30592 3.50009 3.49976 7.30536 3.49976 12.0001C3.49976 16.6939 7.30597 20.5001 11.9998 20.5001C16.6945 20.5001 20.4998 16.6939 20.4998 12.0001C20.4998 7.30531 16.6945 3.50009 11.9998 3.50009ZM1.99976 12.0001C1.99976 6.47682 6.4776 2.00009 11.9998 2.00009C17.523 2.00009 21.9998 6.47688 21.9998 12.0001C21.9998 17.5223 17.523 22.0001 11.9998 22.0001C6.47754 22.0001 1.99976 17.5223 1.99976 12.0001Z" />
      <path fillRule="evenodd" clipRule="evenodd" d="M11.6606 7.09619C12.0749 7.09619 12.4106 7.43198 12.4106 7.84619V11.9553L16.2029 12.0173C16.6171 12.0241 16.9473 12.3653 16.9405 12.7794C16.9338 13.1936 16.5926 13.5239 16.1784 13.5171L11.6484 13.4431C11.239 13.4364 10.9106 13.1026 10.9106 12.6932V7.84619C10.9106 7.43198 11.2464 7.09619 11.6606 7.09619Z" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        transform="translate(2 4)"
        d="M10.0029,0.0005 C14.1389,0.0035 17.8529,2.9025 19.9389,7.7565 C20.0209,7.9455 20.0209,8.1595 19.9389,8.3485 C17.8539,13.2035 14.1389,16.1025 10.0029,16.1055 L9.9969,16.1055 C5.8609,16.1025 2.1469,13.2035 0.0609,8.3485 C-0.0201,8.1595 -0.0201,7.9455 0.0609,7.7565 C2.1469,2.9025 5.8619,0.0035 9.9969,0.0005 L10.0029,0.0005 Z M9.9999,1.5005 C6.5639,1.5015 3.4299,3.9445 1.5699,8.0525 C3.4299,12.1615 6.5629,14.6045 9.9999,14.6055 C13.4369,14.6045 16.5699,12.1615 18.4299,8.0525 C16.5699,3.9445 13.4369,1.5015 9.9999,1.5005 Z M9.9996,4.1413 C12.1566,4.1413 13.9116,5.8963 13.9116,8.0533 C13.9116,10.2093 12.1566,11.9633 9.9996,11.9633 C7.8426,11.9633 6.0886,10.2093 6.0886,8.0533 C6.0886,5.8963 7.8426,4.1413 9.9996,4.1413 Z M9.9996,5.6413 C8.6696,5.6413 7.5886,6.7233 7.5886,8.0533 C7.5886,9.3823 8.6696,10.4633 9.9996,10.4633 C11.3296,10.4633 12.4116,9.3823 12.4116,8.0533 C12.4116,6.7233 11.3296,5.6413 9.9996,5.6413 Z"
      />
    </svg>
  );
}

// Flat metric (no pill) — passive metadata: reading time, views. Sits above the headline.
function MetaItem({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 text-[var(--color-dim)] tabular-nums">{children}</span>
  );
}

// Pill (bordered chip) — engagement actions: likes, comments, shares. Sits below the byline.
function ActionPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-text)]/20 px-2.5 py-1 text-[11px] text-[var(--color-dim)] tabular-nums">
      {children}
    </span>
  );
}

// ── Engagement icons ──
function HeartIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12.0033 21.0205C11.8939 21.0202 11.7858 20.9964 11.6863 20.9505C11.3863 20.8095 4.29335 17.4455 2.63735 12.1375C1.55935 8.77853 2.75835 4.54453 6.63735 3.28453C7.61677 2.97869 8.65442 2.90778 9.66634 3.07753C10.5181 3.27148 11.3163 3.65195 12.0033 4.19153C12.6897 3.64609 13.4902 3.26256 14.3453 3.06953C15.357 2.89992 16.3946 2.97327 17.3723 3.28353C21.2453 4.53153 22.4414 8.76753 21.3594 12.1425C19.6033 17.5055 12.6173 20.8115 12.3213 20.9495C12.2217 20.9958 12.1132 21.02 12.0033 21.0205ZM8.58434 4.48753C8.07879 4.48726 7.57611 4.56346 7.09334 4.71353C4.00334 5.71853 3.22834 9.05553 4.07134 11.6855C5.35034 15.7855 10.6493 18.7345 12.0073 19.4325C13.3533 18.7395 18.5804 15.8185 19.9354 11.6805C20.7794 9.04953 20.0083 5.70953 16.9163 4.71253C16.167 4.47419 15.3717 4.41797 14.5963 4.54853C13.8072 4.78105 13.0776 5.18116 12.4573 5.72153C12.3275 5.81889 12.1696 5.87153 12.0073 5.87153C11.8451 5.87153 11.6872 5.81889 11.5573 5.72153C10.9347 5.18246 10.203 4.78407 9.41234 4.55353C9.13862 4.50882 8.86168 4.48675 8.58434 4.48753Z" />
    </svg>
  );
}

function CommentIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M10.3343 18.8279L11.7558 20.2494C12.3338 20.8273 13.2688 20.8273 13.8458 20.2494L15.2682 18.8279C15.673 18.4231 16.2218 18.1964 16.7939 18.1964H17.8622C20.0378 18.1964 21.8008 16.4324 21.8008 14.2568V7.34094C21.8008 5.16537 20.0378 3.40234 17.8622 3.40234H7.74035C5.56478 3.40234 3.80078 5.16537 3.80078 7.34094V14.2568C3.80078 16.4324 5.56478 18.1964 7.74035 18.1964" />
      <path d="M16.8076 10.8066V10.8764M17.0905 10.8216C17.0905 10.9787 16.963 11.1061 16.8059 11.1061C16.6488 11.1061 16.5215 10.9787 16.5215 10.8216C16.5215 10.6645 16.6488 10.5371 16.8059 10.5371C16.963 10.5371 17.0905 10.6645 17.0905 10.8216Z" />
      <path d="M12.8018 10.8066V10.8764M13.0846 10.8216C13.0846 10.9787 12.9572 11.1061 12.8 11.1061C12.6429 11.1061 12.5156 10.9787 12.5156 10.8216C12.5156 10.6645 12.6429 10.5371 12.8 10.5371C12.9572 10.5371 13.0846 10.6645 13.0846 10.8216Z" />
      <path d="M8.79593 10.8066V10.8764M9.07879 10.8216C9.07879 10.9787 8.95131 11.1061 8.79419 11.1061C8.63707 11.1061 8.50977 10.9787 8.50977 10.8216C8.50977 10.6645 8.63707 10.5371 8.79419 10.5371C8.95131 10.5371 9.07879 10.6645 9.07879 10.8216Z" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M10.1206 3.5H8.01633C5.24061 3.5 3.5 5.46539 3.5 8.24678V15.7532C3.5 18.5346 5.23211 20.5 8.01633 20.5H15.9818C18.7669 20.5 20.5 18.5346 20.5 15.7532V14.1089" />
      <path d="M20.4997 8.07394V3.5M20.4997 3.5H15.9258M20.4997 3.5L13.3691 10.6306" />
    </svg>
  );
}

// Code glyph (</>) — rubric marker for "Инструменты", BI-style.
function CodeIcon({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path fillRule="evenodd" clipRule="evenodd" d="M7.43313 8.305C7.69829 8.62322 7.65527 9.09614 7.33705 9.3613L4.1715 11.999L7.33713 14.6375C7.65532 14.9027 7.69826 15.3757 7.43306 15.6939C7.16785 16.012 6.69492 16.055 6.37674 15.7898L2.5198 12.575C2.34883 12.4325 2.24998 12.2214 2.25 11.9988C2.25002 11.7763 2.34889 11.5652 2.51989 11.4227L6.37683 8.20892C6.69505 7.94376 7.16797 7.98678 7.43313 8.305Z" />
      <path fillRule="evenodd" clipRule="evenodd" d="M16.5669 8.30505C16.8321 7.98683 17.305 7.94381 17.6232 8.20897L21.4801 11.4228C21.6511 11.5652 21.75 11.7763 21.75 11.9989C21.75 12.2215 21.6512 12.4326 21.4802 12.5751L17.6233 15.7898C17.3051 16.055 16.8322 16.0121 16.567 15.6939C16.3018 15.3757 16.3447 14.9028 16.6629 14.6376L19.8285 11.999L16.663 9.36135C16.3448 9.09619 16.3017 8.62327 16.5669 8.30505Z" />
      <path fillRule="evenodd" clipRule="evenodd" d="M14.8277 4.22338C15.217 4.36494 15.4178 4.79526 15.2763 5.18454L10.133 19.3279C9.99147 19.7172 9.56114 19.918 9.17187 19.7765C8.78259 19.6349 8.58178 19.2046 8.72334 18.8153L13.8666 4.67191C14.0081 4.28263 14.4385 4.08182 14.8277 4.22338Z" />
    </svg>
  );
}

// Per-rubric marker icons (BI-style glyph before the section label).
const RUBRIC_ICONS: Record<string, ({ size }: { size?: number }) => React.ReactElement> = {
  Инструменты: CodeIcon,
};

// Kicker (rubric / category) — above the headline, kept clean.
function Rubric({ a, size = "sm" }: { a: Article; size?: "sm" | "md" }) {
  const Icon = RUBRIC_ICONS[a.rubric];
  return (
    <p className={`inline-flex items-center gap-1.5 font-bold uppercase tracking-[0.1em] text-[var(--color-brand)] mb-2 ${size === "md" ? "text-[12px]" : "text-[11px]"}`}>
      {Icon && <Icon size={size === "md" ? 19 : 18} />}
      {a.rubric}
    </p>
  );
}

// Author avatar — round headshot; fixed square box → always a circle, never an oval.
function AuthorAvatar({ size }: { size: number }) {
  return (
    <span
      className="relative block rounded-full overflow-hidden border border-[var(--color-border)] shrink-0"
      style={{ width: size, height: size }}
    >
      <Image
        src="/avatar/almas.webp"
        alt="Алмас Касымжанов"
        fill
        sizes={`${size}px`}
        className="object-cover object-[center_25%]"
      />
    </span>
  );
}

// Byline — avatar + author name on top, date · reading time · views stacked underneath.
function BylineRow({ a, views, avatar = 26, className = "" }: { a: Article; views: number; avatar?: number; className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <AuthorAvatar size={avatar} />
      <div className="min-w-0">
        <p className="text-[12px] text-[var(--color-text)] leading-tight">Алмас Касымжанов</p>
        <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 mt-0.5 text-[11px] text-[var(--color-dim)]">
          <span>{a.date}</span>
          <span aria-hidden>·</span>
          <MetaItem>
            <ClockIcon /> {a.readMin} мин
          </MetaItem>
          <span aria-hidden>·</span>
          <MetaItem>
            <EyeIcon /> {views.toLocaleString("ru-RU")}
          </MetaItem>
        </div>
      </div>
    </div>
  );
}

// Bottom action row (likes · comments · shares) — pills, below the byline.
function ActionRow({ a, className = "" }: { a: Article; className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      <ActionPill>
        <HeartIcon /> {a.likes.toLocaleString("ru-RU")}
      </ActionPill>
      <ActionPill>
        <CommentIcon /> {a.comments.toLocaleString("ru-RU")}
      </ActionPill>
      <ActionPill>
        <ShareIcon /> {a.shares.toLocaleString("ru-RU")}
      </ActionPill>
    </div>
  );
}

// Unified article preview: cover → rubric → headline → subtitle → byline → badges.
function ArticleCard({ a, views, featured = false }: { a: Article; views: number; featured?: boolean }) {
  const Heading = featured ? "h1" : "h2";
  return (
    <Link href={a.href} className="group block">
      <div className="relative aspect-video border border-[var(--color-border)] overflow-hidden mb-5 bg-[var(--color-surface)]">
        {a.img ? (
          <Image
            src={a.img}
            alt={a.title}
            fill
            sizes={featured ? "(min-width:768px) 700px, 100vw" : "(min-width:768px) 360px, 100vw"}
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            priority={featured}
          />
        ) : (
          <span className="absolute inset-0 grid place-items-center text-[11px] uppercase tracking-[0.2em] text-[var(--color-dim)]">
            [ Обложка готовится ]
          </span>
        )}
      </div>

      {featured && a.credit && (
        <div className="-mt-4 mb-5 text-right text-[var(--color-dim)]">
          <p className="text-[11px]">{a.credit}</p>
        </div>
      )}

      <Rubric a={a} size={featured ? "md" : "sm"} />
      <Heading
        className={`font-bold tracking-tight group-hover:text-[var(--color-brand)] transition-colors ${
          featured ? "text-[26px] md:text-[36px] leading-[1.08] mb-3" : "text-[17px] md:text-[19px] leading-[1.15] mb-2"
        }`}
      >
        {a.title}
      </Heading>
      <p className={`text-[var(--color-dim)] leading-relaxed ${featured ? "text-[15px] md:text-[16px] mb-4" : "text-[13px] mb-3"}`}>
        {a.subtitle}
      </p>
      <BylineRow a={a} views={views} avatar={featured ? 34 : 30} className="mb-3" />
      <ActionRow a={a} />
    </Link>
  );
}

// Compact preview (Business Insider "Inside Business" style): text + small thumbnail.
function CompactCard({ a, views }: { a: Article; views: number }) {
  return (
    <Link href={a.href} className="group flex gap-4 items-start">
      <div className="flex-1 min-w-0">
        <Rubric a={a} />
        <h2 className="text-[15px] md:text-[16px] font-bold leading-[1.2] tracking-tight group-hover:text-[var(--color-brand)] transition-colors mb-2">
          {a.title}
        </h2>
        <BylineRow a={a} views={views} avatar={28} className="mb-2" />
        <ActionRow a={a} />
      </div>
      <div className="relative shrink-0 w-[120px] h-[104px] border border-[var(--color-border)] overflow-hidden">
        <Image
          src={a.img}
          alt={a.title}
          fill
          sizes="320px"
          className="object-cover object-center scale-[1.7] origin-[64%_52%] transition-transform duration-500 ease-out group-hover:scale-[1.8]"
        />
      </div>
    </Link>
  );
}

// Newsletter signup — Business Insider "BI Today" style. Brand-tinted panel flips per theme
// (dusty blue in light, muted mint in dark). UI-only for now; wired to Supabase later.
function NewsletterCard() {
  return (
    <div className="bg-[var(--color-brand)] text-[var(--color-bg)] p-6">
      <p className="text-[24px] md:text-[26px] font-bold tracking-tight leading-none mb-2.5">KASYMZHANOV.COM</p>
      <p className="text-[13px] leading-relaxed opacity-80 mb-5">
        Подписывайтесь, чтобы получать уведомления о новых материалах
      </p>
      <div className="flex">
        <input
          type="email"
          placeholder="Ваша почта"
          aria-label="Электронная почта"
          className="flex-1 min-w-0 h-[42px] px-3.5 text-[13px] bg-[var(--color-bg)] text-[var(--color-text)] placeholder:text-[var(--color-dim)] focus:outline-none"
        />
        <button
          type="button"
          className="shrink-0 h-[42px] px-5 text-[12px] font-bold uppercase tracking-[0.08em] bg-[var(--color-text)] text-[var(--color-bg)] hover:opacity-90 transition-opacity"
        >
          Подписаться
        </button>
      </div>
    </div>
  );
}

async function getViews(slugs: string[]): Promise<Record<string, number>> {
  const map: Record<string, number> = {};
  try {
    const { data } = await getSupabase().from("page_views").select("slug, count").in("slug", slugs);
    for (const r of (data as { slug: string; count: number }[] | null) ?? []) map[r.slug] = r.count;
  } catch {
    /* views are best-effort; render 0 on failure */
  }
  return map;
}

export default async function Home() {
  const views = await getViews([LEAD.slug, LICK.slug, MCP.slug]);
  const v = (slug: string) => views[slug] ?? 0;

  return (
    <div className="font-mono text-[var(--color-text)]">
      <div className="max-w-[1400px] mx-auto border-x border-[var(--color-border)] min-h-screen flex flex-col">
        {/* ── Header ── */}
        <SiteHeader />

        {/* ── Front page: about (left) · flagship (center) · market+tools (right) ── */}
        <section className="grid md:grid-cols-[2fr_5fr_3fr] border-b border-[var(--color-border)]">
          {/* LEFT — about the author */}
          <aside className="md:border-r border-[var(--color-border)] p-6 md:p-7 order-2 md:order-none border-t md:border-t-0">
            <AuthorBlock variant="vertical" />
          </aside>

          {/* CENTER — flagship */}
          <div className="p-6 md:p-10 order-1 md:order-none">
            <ArticleCard a={LEAD} views={v(LEAD.slug)} featured />
          </div>

          {/* RIGHT — market story + tools (same anatomy) */}
          <aside className="md:border-l border-[var(--color-border)] order-3 md:order-none border-t md:border-t-0 flex flex-col">
            <div className="p-6 md:p-7 border-b border-[var(--color-border)]">
              <ArticleCard a={LICK} views={v(LICK.slug)} />
            </div>
            <div className="p-6 md:p-7 border-b border-[var(--color-border)]">
              <CompactCard a={MCP} views={v(MCP.slug)} />
            </div>
            <div className="p-6 md:p-7">
              <NewsletterCard />
            </div>
          </aside>
        </section>

        <div className="flex-1" aria-hidden />

        {/* ── Footer ── */}
        <SiteFooter />
      </div>
    </div>
  );
}
