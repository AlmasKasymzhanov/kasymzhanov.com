"use client";

/** Static comparison of the two revenue paths. The model caveat stays visible. */





type Step = { n: string; title: string; detail: string };

type Copy = {
  title: string;
  dek: string;
  kaspiName: string;
  freedomName: string;
  kaspiSteps: Step[];
  freedomSteps: Step[];
  depositTitle: string;
  depositNote: string;
  depositMark: string;
  plaque: string;
  caption: string;
  interactiveKicker: string;
};

const RU: Copy = {
  title: "Путешествие одного тенге",
  dek: "Что происходит с одним тенге выручки селлера после продажи. Скрольте - монета пройдёт оба пути: в Kaspi она доходит до расчётного счёта и останавливается, в модели Freedom - продолжает работать каждый день.",
  kaspiName: "Kaspi: путь тенге обрывается",
  freedomName: "Freedom (модель): путь замыкается в круг",
  /* Both lanes follow strictly the SELLER's tenge, cell for cell — the buyer's
   * cashback (points vs shares) is a different party's game and lives in the
   * article body, not here. */
  kaspiSteps: [
    { n: "1.", title: "Продажа", detail: "товар продан, деньги пока у площадки" },
    { n: "2.", title: "Выплата день в день", detail: "деньги приходят на расчётный счёт" },
    { n: "3.", title: "Счёт: доход 0%", detail: "это счёт, не депозит" },
    { n: "4.", title: "Монета гаснет", detail: "тенге лежит без дохода" },
  ],
  freedomSteps: [
    { n: "1.", title: "Продажа", detail: "товар продан, деньги пока у площадки" },
    { n: "2.", title: "Выплата", detail: "на счёт с ежедневным доходом" },
    { n: "3.", title: "Доход каждый день", detail: "инструменты денежного рынка" },
    { n: "4.", title: "Фондирует рассрочку", detail: "тенге остаётся в контуре" },
  ],
  depositTitle: "Депозит - если донести самому",
  depositNote: "ход в сторону, который селлер делает рукой: отдельный продукт и отдельное действие",
  depositMark: "вариант 4-го хода",
  plaque:
    "Партия «Freedom» - авторская модель на основе публичных прецедентов (Mercado Fondo, Shopify Balance), а не анонсированный продукт Freedom. Партия Kaspi упрощена до поведения по умолчанию: депозиты у Kaspi есть - включая Business Deposit для предпринимателей, - но требуют отдельного действия. Последний шаг иллюстрирует простой денег при нулевом доходе, а не изменение покупательной способности.",
  caption: "Прототип и расчёты: Алмас Касымжанов · прецеденты: Mercado Fondo, Shopify Balance",
  interactiveKicker: "Интерактив",
};

const EN: Copy = {
  title: "The Journey of One Tenge",
  dek: "What happens to one tenge of a seller's revenue after the sale. Scroll - the coin walks both paths: at Kaspi it reaches the settlement account and stops; in the Freedom model it keeps working every day.",
  kaspiName: "Kaspi: the tenge's path ends",
  freedomName: "Freedom (a model): the path closes into a loop",
  kaspiSteps: [
    { n: "1.", title: "Sale", detail: "the item is sold; the money sits with the platform" },
    { n: "2.", title: "Same-day payout", detail: "money lands on the settlement account" },
    { n: "3.", title: "Account: 0% yield", detail: "an account, not a deposit" },
    { n: "4.", title: "The coin goes dark", detail: "the tenge sits earning nothing" },
  ],
  freedomSteps: [
    { n: "1.", title: "Sale", detail: "the item is sold; the money sits with the platform" },
    { n: "2.", title: "Payout", detail: "onto a daily-yield account" },
    { n: "3.", title: "Yield every day", detail: "money-market instruments" },
    { n: "4.", title: "Funds the next installment", detail: "the tenge stays in the loop" },
  ],
  depositTitle: "A deposit - if you carry it yourself",
  depositNote: "a move aside the seller makes by hand: a separate product and a separate action",
  depositMark: "move 4, a sideline",
  plaque:
    "The “Freedom” game is the author's model built on public precedents (Mercado Fondo, Shopify Balance) - not an announced Freedom product. The Kaspi game is simplified to default behaviour: Kaspi does offer deposits - including a Business Deposit for merchants - but they require a separate action. The final step illustrates idle money at zero yield, not a purchasing-power calculation.",
  caption: "Prototype and analysis: Almas Kasymzhanov · precedents: Mercado Fondo, Shopify Balance",
  interactiveKicker: "Interactive",
};

/* The user-supplied gold tenge coin (lies flat on the board like a piece).
 * Exported for reuse in the social-card factory. */
export function Coin({ dead, size = 56 }: { dead: boolean; size?: number }) {
  return (
    <svg
      viewBox="0 0 150 150"
      width={size}
      height={size}
      aria-hidden
      className="transition-[filter,opacity] duration-700"
      style={{ filter: dead ? "grayscale(1) brightness(0.65)" : "none", opacity: dead ? 0.8 : 1 }}
    >
      <path fill="#F8B916" d="M139.991 81.999c0 27.662-28.827 50.086-64.704 50.086-35.872 0-65.286-21.862-65.286-49.523V68.438L139.991 68v13.999z" />
      <path fill="#FFD113" d="M139.991 68c0 27.662-29.746 50.085-65.622 50.085-35.872 0-64.367-22.424-64.367-50.085s28.495-50.085 64.367-50.085c35.876 0 65.622 22.424 65.622 50.085z" />
      <path fill="#FFE16A" d="M76.371 116.087C40.497 116.087 12 93.661 12 66c0-11.19 4.668-21.521 12.597-29.858C15.457 44.799 10 55.897 10 68c0 27.661 28.497 50.086 64.371 50.086 21.71 0 41.163-8.222 53.151-20.836-12.089 11.478-30.611 18.837-51.151 18.837z" />
      <path fill="#E88824" d="M74.482 26.757c-29.542 0-53.007 18.466-53.007 41.244s23.465 41.243 53.007 41.243c29.539 0 54.036-18.465 54.036-41.243.001-22.778-24.497-41.244-54.036-41.244zm.515 82.485c-28.067 0-50.846-19.601-50.846-41.241s22.266-41.244 50.331-41.244c28.063 0 53.996 18.706 54.015 40.347.022 22.459-25.434 42.138-53.5 42.138z" />
      <path fill="#FFE16A" d="M75.51 109.244c29.543 0 53.009-18.465 53.009-41.245 0-22.777-23.466-41.242-53.009-41.242-29.54 0-54.035 18.465-54.035 41.242 0 22.78 24.495 41.245 54.035 41.245zm-.513-82.485c28.066 0 50.845 19.603 50.845 41.24 0 21.64-22.266 41.245-50.332 41.245-28.063 0-54.014-17.975-54.014-40.346 0-24.626 25.434-42.139 53.501-42.139z" />
      <path fill="#E88824" d="M101.994 113.292v14.267s37.997-11.563 37.997-45.558v-14s1.584 30.685-37.997 45.291z" />
      <path fill="#FFE16A" d="M49.999 128.25S39.407 125.11 32 119.678v-13.883s5.708 4.43 17.999 8.617v13.838z" />
      {/* ₸ embossed on the face */}
      <g fill="#B8860B" opacity="0.85">
        <rect x="52" y="47" width="46" height="7" rx="2" />
        <rect x="52" y="59" width="46" height="7" rx="2" />
        <rect x="71" y="59" width="8" height="34" rx="2" />
      </g>
    </svg>
  );
}

/* One board rank: alternating graphite squares with notation labels. */
function Rank({ steps }: { steps: Step[] }) {
 return <ol className="grid grid-cols-1 gap-0 sm:grid-cols-2">{steps.map(step => <li key={step.n} data-chart-inspect tabIndex={0} data-chart-title={step.title} data-chart-rows={JSON.stringify([{label: "", value: step.detail}])} className="border-t border-[var(--color-border)] py-4 sm:pr-5">
 <span className="font-mono text-[12px] text-[var(--color-dim)]">{step.n}</span>
 <div className="mt-1 text-[15px] text-[var(--color-text)]">{step.title}</div>
 <div className="mt-1 text-[13px] leading-relaxed text-[var(--color-dim)]">{step.detail}</div>
 </li>)}</ol>;
}

export function TengeJourney({ locale = "ru" }: { locale?: "ru" | "en" }) {
 const c = locale === "en" ? EN : RU;
 return <figure data-chart-type="process" className="my-10 border-y border-[var(--color-border)] py-6">
 <figcaption><h3>{c.title}</h3><p className="mt-3 text-[15px] leading-relaxed">{locale === "en" ? "Two paths for a seller’s revenue: a settlement account at Kaspi and a daily-yield account in the proposed Freedom model." : "Два пути выручки продавца: расчётный счёт Kaspi и счёт с ежедневным доходом в предлагаемой модели Freedom."}</p></figcaption>
 <div className="mt-6"><h4 className="mb-4 text-[16px]">{c.kaspiName}</h4><Rank steps={c.kaspiSteps} /></div>
 <aside className="reading-note"><div className="text-[15px]">{c.depositTitle}</div><p>{c.depositNote}</p></aside>
 <div className="mt-8"><h4 className="mb-4 text-[16px]">{c.freedomName}</h4><Rank steps={c.freedomSteps} /></div>
 <p className="mt-6 font-mono text-[12px] leading-relaxed text-[var(--color-dim)]">{c.plaque}</p>
 <p className="mt-3 font-mono text-[12px] text-[var(--color-dim)]">{c.caption}</p>
 </figure>;
}
