import Image from "next/image";
import { ViewCounter } from "@/components/view-counter";

// Canonical article header: kicker → headline → dek → author byline → engagement pills → hero + credit.
// Used by every article page so the layout stays consistent.

function ArticleAvatar({ size = 44 }: { size?: number }) {
  return (
    <span
      className="relative block rounded-full overflow-hidden border border-[var(--color-border)] shrink-0"
      style={{ width: size, height: size }}
    >
      <Image src="/avatar/almas.webp" alt="Алмас Касымжанов" fill sizes={`${size}px`} className="object-cover object-[center_25%]" />
    </span>
  );
}

function ClockIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path fillRule="evenodd" clipRule="evenodd" d="M11.9998 3.50009C7.30592 3.50009 3.49976 7.30536 3.49976 12.0001C3.49976 16.6939 7.30597 20.5001 11.9998 20.5001C16.6945 20.5001 20.4998 16.6939 20.4998 12.0001C20.4998 7.30531 16.6945 3.50009 11.9998 3.50009ZM1.99976 12.0001C1.99976 6.47682 6.4776 2.00009 11.9998 2.00009C17.523 2.00009 21.9998 6.47688 21.9998 12.0001C21.9998 17.5223 17.523 22.0001 11.9998 22.0001C6.47754 22.0001 1.99976 17.5223 1.99976 12.0001Z" />
      <path fillRule="evenodd" clipRule="evenodd" d="M11.6606 7.09619C12.0749 7.09619 12.4106 7.43198 12.4106 7.84619V11.9553L16.2029 12.0173C16.6171 12.0241 16.9473 12.3653 16.9405 12.7794C16.9338 13.1936 16.5926 13.5239 16.1784 13.5171L11.6484 13.4431C11.239 13.4364 10.9106 13.1026 10.9106 12.6932V7.84619C10.9106 7.43198 11.2464 7.09619 11.6606 7.09619Z" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12.0033 21.0205C11.8939 21.0202 11.7858 20.9964 11.6863 20.9505C11.3863 20.8095 4.29335 17.4455 2.63735 12.1375C1.55935 8.77853 2.75835 4.54453 6.63735 3.28453C7.61677 2.97869 8.65442 2.90778 9.66634 3.07753C10.5181 3.27148 11.3163 3.65195 12.0033 4.19153C12.6897 3.64609 13.4902 3.26256 14.3453 3.06953C15.357 2.89992 16.3946 2.97327 17.3723 3.28353C21.2453 4.53153 22.4414 8.76753 21.3594 12.1425C19.6033 17.5055 12.6173 20.8115 12.3213 20.9495C12.2217 20.9958 12.1132 21.02 12.0033 21.0205ZM8.58434 4.48753C8.07879 4.48726 7.57611 4.56346 7.09334 4.71353C4.00334 5.71853 3.22834 9.05553 4.07134 11.6855C5.35034 15.7855 10.6493 18.7345 12.0073 19.4325C13.3533 18.7395 18.5804 15.8185 19.9354 11.6805C20.7794 9.04953 20.0083 5.70953 16.9163 4.71253C16.167 4.47419 15.3717 4.41797 14.5963 4.54853C13.8072 4.78105 13.0776 5.18116 12.4573 5.72153C12.3275 5.81889 12.1696 5.87153 12.0073 5.87153C11.8451 5.87153 11.6872 5.81889 11.5573 5.72153C10.9347 5.18246 10.203 4.78407 9.41234 4.55353C9.13862 4.50882 8.86168 4.48675 8.58434 4.48753Z" />
    </svg>
  );
}

function CommentIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M10.3343 18.8279L11.7558 20.2494C12.3338 20.8273 13.2688 20.8273 13.8458 20.2494L15.2682 18.8279C15.673 18.4231 16.2218 18.1964 16.7939 18.1964H17.8622C20.0378 18.1964 21.8008 16.4324 21.8008 14.2568V7.34094C21.8008 5.16537 20.0378 3.40234 17.8622 3.40234H7.74035C5.56478 3.40234 3.80078 5.16537 3.80078 7.34094V14.2568C3.80078 16.4324 5.56478 18.1964 7.74035 18.1964" />
      <path d="M16.8076 10.8066V10.8764M17.0905 10.8216C17.0905 10.9787 16.963 11.1061 16.8059 11.1061C16.6488 11.1061 16.5215 10.9787 16.5215 10.8216C16.5215 10.6645 16.6488 10.5371 16.8059 10.5371C16.963 10.5371 17.0905 10.6645 17.0905 10.8216Z" />
      <path d="M12.8018 10.8066V10.8764M13.0846 10.8216C13.0846 10.9787 12.9572 11.1061 12.8 11.1061C12.6429 11.1061 12.5156 10.9787 12.5156 10.8216C12.5156 10.6645 12.6429 10.5371 12.8 10.5371C12.9572 10.5371 13.0846 10.6645 13.0846 10.8216Z" />
      <path d="M8.79593 10.8066V10.8764M9.07879 10.8216C9.07879 10.9787 8.95131 11.1061 8.79419 11.1061C8.63707 11.1061 8.50977 10.9787 8.50977 10.8216C8.50977 10.6645 8.63707 10.5371 8.79419 10.5371C8.95131 10.5371 9.07879 10.6645 9.07879 10.8216Z" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M10.1206 3.5H8.01633C5.24061 3.5 3.5 5.46539 3.5 8.24678V15.7532C3.5 18.5346 5.23211 20.5 8.01633 20.5H15.9818C18.7669 20.5 20.5 18.5346 20.5 15.7532V14.1089" />
      <path d="M20.4997 8.07394V3.5M20.4997 3.5H15.9258M20.4997 3.5L13.3691 10.6306" />
    </svg>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-text)]/20 px-2.5 py-1 text-[11px] text-[var(--color-dim)] tabular-nums">
      {children}
    </span>
  );
}

export type ArticleHeaderProps = {
  kicker: string;
  title: React.ReactNode;
  subtitle: React.ReactNode;
  slug: string;
  date: string;
  readMin: number;
  likes: number;
  comments: number;
  shares: number;
  hero: { src: string; alt: string; credit: string; width?: number; height?: number };
};

export function ArticleHeader({
  kicker,
  title,
  subtitle,
  slug,
  date,
  readMin,
  likes,
  comments,
  shares,
  hero,
}: ArticleHeaderProps) {
  return (
    <>
      <header className="mb-10">
        <p className="font-mono text-[11px] uppercase tracking-widest text-[var(--color-brand)] mb-4">{kicker}</p>
        <h1 className="text-[28px] md:text-[36px] font-bold tracking-tight text-[var(--color-text)] leading-[1.15] mb-5">{title}</h1>
        <p className="text-[15px] md:text-[17px] text-[var(--color-dim)] leading-relaxed mb-7">{subtitle}</p>

        {/* Author */}
        <div className="flex items-center gap-3">
          <ArticleAvatar size={44} />
          <div className="min-w-0">
            <p className="text-[13px] font-medium text-[var(--color-text)] leading-tight">Алмас Касымжанов</p>
            <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 mt-1 text-[11px] text-[var(--color-dim)]">
              <span>{date}</span>
              <span aria-hidden>·</span>
              <span className="inline-flex items-center gap-1">
                <ClockIcon /> {readMin} мин
              </span>
              <span aria-hidden>·</span>
              <ViewCounter slug={slug} />
            </div>
          </div>
        </div>

        {/* Engagement */}
        <div className="flex flex-wrap items-center gap-2 mt-5">
          <Pill>
            <HeartIcon /> {likes}
          </Pill>
          <Pill>
            <CommentIcon /> {comments}
          </Pill>
          <Pill>
            <ShareIcon /> {shares}
          </Pill>
        </div>
      </header>

      {/* Hero illustration */}
      <figure className="mb-12">
        <div className="border border-[var(--color-border)] overflow-hidden">
          <Image
            src={hero.src}
            alt={hero.alt}
            width={hero.width ?? 1200}
            height={hero.height ?? 800}
            priority
            className="w-full h-auto"
          />
        </div>
        <figcaption className="text-right text-[11px] text-[var(--color-dim)] mt-2">{hero.credit}</figcaption>
      </figure>
    </>
  );
}
