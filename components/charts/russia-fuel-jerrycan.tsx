"use client";

/**
 * Brock UI charts for "Государство закрыло статистику. Рынок открыл канистру"
 * (russia-fuel-jerrycan). FT / Bloomberg / Tufte canon: monochrome graphite
 * (--brock-neutral) for context + exactly ONE warm accent (--brock-accent) for
 * "the crisis signal". Every chart carries: a takeaway title (in the slot), a
 * colour LEGEND (orange vs grey, in plain words) and a one-line "what it means"
 * note (in the slot). YoY everywhere. Data: MPStats (Wildberries), Redstat (Kaspi),
 * Google Trends, Яндекс.Вордстат — verified against the raw CSV reports.
 */

import { ColumnChart } from "@/components/charts/column-chart";
import { BarChart } from "@/components/charts/bar-chart";
import { LineChart } from "@/components/charts/line-chart";
import { Term } from "@/components/canon/term";

const num = (v: number) => v.toLocaleString("ru-RU");
const ACCENT = "var(--brock-accent)";
const NEUTRAL = "var(--brock-neutral)";

/* Daily order labels: 01.03 … 27.06 (119 days), generated once. */
const DAY_LABELS: string[] = (() => {
  const out: string[] = [];
  const d = new Date(2026, 2, 1); // 1 March
  for (let i = 0; i < 119; i++) {
    out.push(
      `${String(d.getDate()).padStart(2, "0")}.${String(d.getMonth() + 1).padStart(2, "0")}`,
    );
    d.setDate(d.getDate() + 1);
  }
  return out;
})();

// Daily orders, топливные канистры, Wildberries (MPStats). 01.03–27.06.
const ORDERS_2026 = [
  297, 325, 248, 279, 269, 256, 279, 255, 245, 277, 272, 271, 322, 323, 302, 281, 334, 323, 389, 375, 354, 321, 275, 335, 348, 279, 293, 327, 327, 337, 366,
  373, 463, 536, 514, 557, 551, 615, 594, 594, 606, 604, 553, 580, 641, 697, 895, 813, 597, 725, 708, 582, 437, 453, 397, 491, 461, 369, 465, 409, 519,
  577, 681, 709, 656, 696, 840, 582, 604, 429, 463, 536, 557, 582, 532, 508, 449, 597, 623, 617, 625, 501, 585, 536, 689, 700, 576, 647, 629, 658, 721, 1104,
  1043, 973, 916, 884, 807, 622, 788, 894, 840, 752, 699, 685, 796, 978, 967, 1103, 807, 658, 676, 857, 1018, 1123, 1427, 1220, 1110, 1013, 830,
];
const ORDERS_2025 = [
  160, 144, 195, 205, 179, 176, 186, 147, 210, 242, 229, 256, 212, 230, 236, 255, 254, 204, 238, 241, 266, 242, 261, 321, 260, 254, 252, 273, 361, 323, 324,
  307, 316, 297, 251, 186, 226, 251, 238, 249, 274, 260, 251, 286, 325, 363, 328, 328, 310, 301, 316, 420, 403, 380, 348, 395, 409, 404, 385, 422, 445,
  448, 438, 476, 513, 498, 522, 386, 399, 289, 379, 372, 361, 425, 368, 350, 291, 283, 326, 349, 362, 373, 467, 475, 467, 465, 392, 396, 426, 455, 441, 522,
  564, 539, 485, 591, 553, 491, 470, 518, 419, 408, 514, 529, 501, 465, 543, 503, 569, 553, 550, 449, 444, 436, 435, 470, 503, 407, 424,
];

/* Label tooltips for chart-gutter labels (hover · tap). focusable=false because
 * the chart label column is aria-hidden (sr-only data table is the a11y path). */
const LABEL_TIPS: Record<string, string> = {
  // График 5
  "Британия · 2021": "Halfords: продажи канистр за уикенд 25–26 сентября 2021 +1 656% (≈ ×17); «jerry can» — 4-й запрос на сайте. Данные ретейлера через CNBC / City A.M.",
  "США · 2021": "Google Trends «gas can»: на 5-й день простоя трубопровода Colonial (май 2021) пик ×3,5 к базе. Это поиск, не продажи — прямых данных о продажах канистр нет.",
  "Россия · 2026": "Wildberries (MPStats): 23 июня 2026 — пик 1 427 канистр в день, +228% год к году. Продажи.",
};

const labelTip = (label: string): React.ReactNode => {
  const tip = LABEL_TIPS[label];
  return tip ? (
    <Term tip={tip}>{label}</Term>
  ) : (
    label
  );
};

/* Plain-words colour legend under each chart — the orange/grey decoder.
 * `faint` = a translucent swatch (for the shaded zone). */
function Legend({ items }: { items: { color: string; label: string; faint?: boolean }[] }) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-3.5 font-mono text-[11px] leading-snug text-[var(--color-dim)]">
      {items.map((it) => (
        <span key={it.label} className="inline-flex items-center gap-1.5">
          <span
            aria-hidden
            className="inline-block w-3 h-3 rounded-[2px] shrink-0"
            style={{ background: it.color, opacity: it.faint ? 0.3 : 1 }}
          />
          <span>{it.label}</span>
        </span>
      ))}
    </div>
  );
}

/* Small sub-caption for the composite (chart-on-top, bars-below) chart 3. */
function SubLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-dim)] mb-2">
      {children}
    </p>
  );
}

/* Ranked phrase list with mini progress bars — mobile-safe (the full phrase
 * sits on its own line and wraps; the bar scales to the largest value). Used
 * for the search-query "улики" inset where long labels would be clipped by a
 * fixed-gutter bar chart. */
function PhraseBars({
  items,
  valueFmt = num,
}: {
  items: { label: string; value: number; accent?: boolean }[];
  valueFmt?: (v: number) => string;
}) {
  const max = Math.max(...items.map((i) => i.value));
  return (
    <div className="space-y-3">
      {items.map((it) => (
        <div key={it.label}>
          <div className="flex items-baseline justify-between gap-3 mb-1.5">
            <span className="font-mono text-[12.5px] text-[var(--color-text)] leading-snug">{it.label}</span>
            <span className="font-mono text-[12px] text-[var(--color-dim)] tabular-nums shrink-0">{valueFmt(it.value)}</span>
          </div>
          <div className="h-1.5 rounded-full bg-[var(--color-border)]/50 overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{ width: `${(it.value / max) * 100}%`, background: it.accent ? ACCENT : NEUTRAL }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── График 1 (ГЕРОЙ). Канистры взлетели в день, когда запретили топливо ── */
export function Grafik1() {
  return (
    <>
      <LineChart
        height={300}
        lineWidth={2}
        markers="none"
        directLabels={false}
        xScale="point"
        x={DAY_LABELS}
        data={[
          { name: "2026", data: ORDERS_2026, emphasis: true },
          { name: "2025", data: ORDERS_2025, color: NEUTRAL, dashed: true },
        ]}
        bands={[{ from: "20.06", to: "22.06" }]}
        events={[{ x: "23.06", label: "23 июня" }]}
        xAxis={{ ticks: 8 }}
        yAxis={{ title: "заказов в день", max: 1700 }}
        formatValue={(v: number) => num(Math.round(v))}
      />
      <Legend
        items={[
          { color: ACCENT, label: "2026 — год дефицита" },
          { color: NEUTRAL, label: "2025 — обычный год (фон для сравнения)" },
          { color: ACCENT, faint: true, label: "светлая зона — дни запрета продажи топлива (20–22 июня)" },
        ]}
      />
    </>
  );
}

/* ── График 2A. Сезон или паника? — во сколько раз вырос спрос ── */
export function Grafik2a() {
  return (
    <>
      <BarChart
        barThickness={36}
        gap={16}
        barRadius={2}
        labelWidth={56}
        xAxis={{ max: 4, hideTicks: true }}
        slots={{ tooltip: () => null }}
        data={[
          { label: "2025", value: 1.88, color: NEUTRAL },
          { label: "2026", value: 3.51 },
        ]}
        dataLabels={{
          show: true,
          format: (v: number) => `в ${v.toLocaleString("ru-RU", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} раза`,
        }}
        formatValue={(v: number) => `в ${v.toLocaleString("ru-RU", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} раза`}
      />
      <Legend
        items={[
          { color: ACCENT, label: "2026 — рост ×3,5: почти вдвое выше обычного (аномалия)" },
          { color: NEUTRAL, label: "2025 — рост ×1,9: обычная летняя сезонность" },
        ]}
      />
    </>
  );
}

/* ── График 2B. Поиск говорит то же — интерес к запросу «канистра» ── */
export function Grafik2b() {
  return (
    <>
      <LineChart
        height={200}
        lineWidth={2}
        markers="always"
        directLabels={false}
        xScale="point"
        x={["Май·1", "Май·2", "Май·3", "Май·4", "Июнь·1", "Июнь·2", "Июнь·3", "Июнь·4"]}
        data={[
          { name: "2026", data: [7, 10, 11, 12, 19, 26, 35, 62], emphasis: true },
          { name: "2025", data: [46, 41, 53, 68, 61, 59, 67, 59], color: NEUTRAL, dashed: true },
        ]}
        yAxis={{ title: "интерес, 0–100", max: 100, ticks: 3 }}
        formatValue={(v: number) => num(Math.round(v))}
      />
      <Legend
        items={[
          { color: ACCENT, label: "2026 — взлетает к июню" },
          { color: NEUTRAL, label: "2025 — плоско, без всплеска" },
        ]}
      />
    </>
  );
}

/* ── График 3. Рынок переплатил — средний чек ── */
export function Grafik3() {
  return (
    <>
      <LineChart
        height={220}
        lineWidth={2}
        markers="always"
        directLabels={false}
        xScale="point"
        x={["Март", "Апрель", "Май", "Июнь"]}
        data={[
          { name: "2026", data: [1097, 925, 1137, 1766], emphasis: true },
          { name: "2025", data: [800, 871, 989, 908], color: NEUTRAL, dashed: true },
        ]}
        yAxis={{ title: "₽ за заказ", max: 1900 }}
        formatValue={(v: number) => `${num(Math.round(v))} ₽`}
      />
      <Legend
        items={[
          { color: ACCENT, label: "2026 — чек почти удвоился к июню" },
          { color: NEUTRAL, label: "2025 — чек ровный" },
        ]}
      />
    </>
  );
}

/* ── График 3-поиск. Рынок проговорился — анатомия 1,94 млн + улики ──
 * Сверху: топ формулировок запроса «канистра» за месяц (всего 1,94 млн; почти
 * треть — прямо «для бензина»). Снизу: фразы-улики — паника и дефицит прямым
 * текстом. Всё на полном разборе топ-2000 запросов Вордстата. */
export function Grafik3search() {
  return (
    <div className="space-y-6">
      <div>
        <SubLabel>Топ запросов «канистра» за месяц, показов (Вордстат)</SubLabel>
        <PhraseBars
          items={[
            { label: "«канистра» — всего", value: 1940545, accent: true },
            { label: "«канистра для бензина»", value: 575733 },
            { label: "«купить канистру»", value: 446730 },
            { label: "«канистра литров»", value: 358254 },
            { label: "«канистра 20»", value: 332259 },
            { label: "«купить канистру для бензина»", value: 227636 },
            { label: "«канистра 20 литров»", value: 224431 },
          ]}
        />
      </div>
      <div className="border-t border-[var(--color-border)] pt-5">
        <SubLabel>Фразы-улики: паника и дефицит прямым текстом, показов</SubLabel>
        <PhraseBars
          items={[
            { label: "«заправка в канистры»", value: 93139, accent: true },
            { label: "«можно ли бензин в канистру»", value: 75533 },
            { label: "«бензин в канистру на заправке»", value: 55012 },
            { label: "«канистра крымский мост»", value: 30155 },
            { label: "«канистры через мост»", value: 24620 },
            { label: "«запретили канистры»", value: 21569 },
          ]}
        />
      </div>
    </div>
  );
}

/* ── График 4. Продавцы сбежались за месяц. Привезти товар не успели ── */
export function Grafik4() {
  return (
    <>
      <ColumnChart
        height={240}
        barRadius={2}
        data={[
          { label: "Янв", value: 506, color: NEUTRAL },
          { label: "Фев", value: 1138, color: NEUTRAL },
          { label: "Мар", value: 1247, color: NEUTRAL },
          { label: "Апр", value: 755, color: NEUTRAL },
          { label: "Май", value: 766, color: NEUTRAL },
          { label: "Июнь", value: 4161 },
        ]}
        yAxis={{ max: 4600 }}
        slots={{ tooltip: () => null }}
        formatValue={(v: number) => num(v)}
      />
      <Legend
        items={[
          { color: ACCENT, label: "июнь — наплыв новых карточек (×6 к маю)" },
          { color: NEUTRAL, label: "обычные месяцы" },
        ]}
      />
    </>
  );
}

/* ── График 5. Канистра как индикатор кризиса: три страны, один сценарий ──
 * Три отдельные панели — РАЗНАЯ природа данных, поэтому каждая в своём масштабе. */
export function Grafik5() {
  const panel = (
    label: string,
    value: number,
    fmt: (v: number) => string,
    max: number,
    accent: boolean,
  ) => (
    <div>
      <SubLabel>{labelTip(label)}</SubLabel>
      <BarChart
        barThickness={28}
        gap={10}
        barRadius={2}
        labelWidth={1}
        xAxis={{ max, hideTicks: true }}
        slots={{ tooltip: () => null }}
        data={[{ label: "", value, ...(accent ? {} : { color: NEUTRAL }) }]}
        dataLabels={{ show: true, format: fmt }}
        formatValue={fmt}
      />
    </div>
  );
  return (
    <>
      <div className="space-y-5">
        {panel("Британия · 2021", 1656, (v) => `+${num(v)}% · продажи`, 1880, false)}
        {panel("США · 2021", 250, () => `поиск ×3,5`, 285, false)}
        {panel("Россия · 2026", 228, (v) => `+${num(v)}% · продажи`, 260, true)}
      </div>
      <Legend
        items={[
          { color: ACCENT, label: "Россия — наш случай" },
          { color: NEUTRAL, label: "Британия и США — для сравнения" },
        ]}
      />
    </>
  );
}

/* ── График 6. В Казахстане — ровная сезонная горка, без скачка ──
 * Только подтверждённые скрином данные Kaspi 2026 (дек 2025 → май 2026).
 * Все столбцы нейтральные: смысл графика — отсутствие аномалии (ни одного
 * дня-выброса, как в России 23 июня). Контраст с РФ — по форме кривой. */
export function Grafik6() {
  return (
    <>
      <ColumnChart
        height={240}
        barRadius={2}
        data={[
          { label: "Дек", value: 1452, color: NEUTRAL },
          { label: "Янв", value: 1432, color: NEUTRAL },
          { label: "Фев", value: 1145, color: NEUTRAL },
          { label: "Мар", value: 1671, color: NEUTRAL },
          { label: "Апр", value: 1868, color: NEUTRAL },
          { label: "Май", value: 1976, color: NEUTRAL },
        ]}
        yAxis={{ max: 2200 }}
        slots={{ tooltip: () => null }}
        formatValue={(v: number) => num(v)}
      />
      <Legend
        items={[
          { color: NEUTRAL, label: "Казахстан (Kaspi) — заказы по месяцам: ровная сезонность, без выброса" },
        ]}
      />
    </>
  );
}

/* ── График регионов. Где «канистру» искали активнее всего ──
 * Аффинити-индекс Вордстата: 100 = средний интерес по стране. Крым ×4,5–5,5 —
 * независимое подтверждение эпицентра дефицита (тот самый «крымский мост»). */
export function GrafikRegions() {
  return (
    <>
      <PhraseBars
        valueFmt={(v: number) => `×${(v / 100).toLocaleString("ru-RU", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}`}
        items={[
          { label: "Симферополь", value: 545, accent: true },
          { label: "Севастополь", value: 502, accent: true },
          { label: "Республика Крым", value: 456, accent: true },
          { label: "Ростов-на-Дону", value: 177 },
          { label: "Краснодар", value: 166 },
          { label: "Москва", value: 146 },
        ]}
      />
      <Legend
        items={[
          { color: ACCENT, label: "Крым — эпицентр: интерес в 4,5–5,5 раза выше среднего" },
          { color: NEUTRAL, label: "юг и Москва — выше среднего, но умереннее" },
        ]}
      />
    </>
  );
}

/* ── График артикулов. Кризис оплатил терпеливых — два «Демидовских» рванули ──
 * Помесячные продажи топ-карточек (MPStats, март→июнь). У кого был остаток — тот
 * снял всплеск; новички с пустыми витринами прошли мимо. Артикулы + тултипы со
 * ссылкой на карточку WB. */
export function GrafikArtikuly() {
  const cardTip = (sku: string, full: string, jun: number, growth: string) => (
    <>
      Артикул {sku}, бренд «Демидовский». {full}. Июнь: {num(jun)} продаж, {growth} к маю.{" "}
      <a
        href={`https://www.wildberries.ru/catalog/${sku}/detail.aspx`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[var(--color-brand)] hover:underline"
      >
        Карточка на WB →
      </a>
    </>
  );
  return (
    <>
      <LineChart
        height={240}
        lineWidth={2.5}
        markers="always"
        directLabels
        xScale="point"
        x={["Март", "Апрель", "Май", "Июнь"]}
        data={[
          { name: "10 л", data: [656, 1067, 1763, 3835], emphasis: true },
          { name: "20 л", data: [406, 328, 645, 2033], color: NEUTRAL },
        ]}
        yAxis={{ title: "продаж/мес", max: 4200 }}
        formatValue={(v: number) => num(Math.round(v))}
      />
      <div className="flex flex-col gap-1.5 mt-3.5 font-mono text-[11px] leading-snug text-[var(--color-dim)]">
        <span className="inline-flex items-start gap-1.5">
          <span aria-hidden className="inline-block w-3 h-3 rounded-[2px] shrink-0 mt-0.5" style={{ background: ACCENT }} />
          <span>
            Демидовский, 10 л алюм. —{" "}
            <Term tip={cardTip("292065586", "Канистра для бензина 10 л, алюминиевая", 3835, "+118%")}>арт. 292065586</Term>, +118% за июнь
          </span>
        </span>
        <span className="inline-flex items-start gap-1.5">
          <span aria-hidden className="inline-block w-3 h-3 rounded-[2px] shrink-0 mt-0.5" style={{ background: NEUTRAL }} />
          <span>
            Демидовский, 20 л алюм. —{" "}
            <Term tip={cardTip("292065587", "Канистра для ГСМ 20 л, алюминиевая", 2033, "+215%")}>арт. 292065587</Term>, +215% за июнь
          </span>
        </span>
      </div>
    </>
  );
}

/* ── График арбитража. Кризис развёл цены двух рынков ──
 * Та же 20-л пластиковая канистра: Россия (WB) дорожает с обычного времени к
 * кризису, Казахстан (Kaspi) стоит ровно — разрыв растёт с ×1,5 до ×3.
 * Курс 0,159 ₽/₸ (ЦБ РФ, 27.06.2026). Не инвестрекомендация. */
export function GrafikArbitrage() {
  return (
    <>
      <LineChart
        height={240}
        lineWidth={2.5}
        markers="always"
        directLabels
        xScale="point"
        x={["Обычное время", "Кризис (июнь)"]}
        data={[
          { name: "Россия", data: [1220, 2400], emphasis: true },
          { name: "Казахстан", data: [780, 780], color: NEUTRAL, dashed: true },
        ]}
        yAxis={{ title: "₽ за 20 л", max: 2700 }}
        formatValue={(v: number) => `${num(Math.round(v))} ₽`}
      />
      <Legend
        items={[
          { color: ACCENT, label: "Россия (Wildberries) — дорожает: ~1 200 → ~2 400 ₽" },
          { color: NEUTRAL, label: "Казахстан (Kaspi, арт. 109030553) — ровно ~780 ₽ (4 900 ₸)" },
        ]}
      />
    </>
  );
}
