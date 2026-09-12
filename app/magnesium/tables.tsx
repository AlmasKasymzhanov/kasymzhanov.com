"use client";

import { DataTable } from "@/components/charts/data-table";
import { IconlyChevronDown } from "@/components/iconly-icons";
import { categorySummary, compactMoney, data, july, julyTargets, money, monthLabel, number, percent, roles } from "./data";
import styles from "./research.module.css";

export function TargetTable() {
  return <DataTable source="Redstat" columns={[
    { header: "Линейка" }, { header: "Выручка, ₸", format: compactMoney, heatmap: { max: 13_000_000 } },
    { header: "Заказы", format: number }, { header: "Роль в пилоте", align: "left", mono: false },
  ]} rows={julyTargets.map(row => [row.name, row.latest.revenue, row.latest.orders, <span key="role" className={styles.wrapCell}>{roles[row.name]}</span>])} />;
}

export function MonthlyTargetsTable() {
  return <details className="reading-details"><summary><span>Все пять доступных месяцев: точные значения</span><IconlyChevronDown size={17} /></summary>
    <p className={styles.scrollHint}>В каждой ячейке: выручка в тенге / заказы. Широкая таблица прокручивается внутри страницы.</p>
    <DataTable source="Redstat" columns={[{ header: "2026 год" }, ...data.targets.map(t => ({ header: t.name }))]}
      rows={[
        ...data.market.map(row => [monthLabel(row.month), ...data.targets.map(t => {
          const point = t.months.find(p => p.month === row.month)!;
          return point.revenue === null ? "Нет данных" : `${money(point.revenue)} / ${number(point.orders!)}`;
        })]),
        ["Итого за 5 месяцев", ...data.targets.map(t => `${money(t.revenue)} / ${number(t.orders)}`)],
      ]} caption="Июль — отдельный актуальный срез. Итог относится к пяти доступным месяцам, а не к семи последовательным. Май и июнь исключены." />
  </details>;
}

export function MarketTable() {
  return <DataTable source="Redstat" columns={[
    { header: "2026 год" }, { header: "Выручка, ₸", format: compactMoney, heatmap: { max: 400_000_000 } },
    { header: "Заказы", format: number }, { header: "SKU", format: number }, { header: "Бренды", format: number },
    { header: "₸ / заказ", format: money }, { header: "Медиана цены, ₸", format: money },
  ]} rows={data.market.map(row => [monthLabel(row.month), row.revenue ?? "Нет данных", row.orders ?? "—", row.skus ?? "—", row.brands ?? "—", row.revenuePerOrder ?? "—", row.medianPrice ?? "—"])}
    caption="Общая шкала выручки: 0–400 млн ₸. Цвет показывает величину, а не сопоставимость периодов. Июль нельзя сравнивать с апрелем как изменение месяц к месяцу." />;
}

export function CompetitorsTable() {
  return <details className="reading-details"><summary><span>15 крупнейших брендов: заказы, ассортимент и доли</span><IconlyChevronDown size={17} /></summary>
    <DataTable source="Redstat" columns={[
      { header: "Бренд" }, { header: "Выручка, ₸", format: compactMoney }, { header: "Заказы", format: number },
      { header: "Доля выручки", format: percent, barMax: 100 }, { header: "SKU", format: number }, { header: "₸ / заказ", format: money },
    ]} rows={data.competitors.slice(0, 15).map(row => [row.name, row.revenue, row.orders, row.share, row.skus, row.revenuePerOrder])}
      caption={`Доля от ${money(july.revenue!)} выручки всего магниевого контура в июле. Показаны первые 15 из ${july.brands} брендов.`} />
  </details>;
}

export function SegmentsTable() {
  const order = ["Низкий", "Бюджетный", "Средний", "Дорогой", "Премиум"];
  const rows = [...data.segments].sort((a, b) => order.indexOf(a.name) - order.indexOf(b.name));
  return <DataTable source="Redstat" columns={[
    { header: "Сегмент" }, { header: "Выручка, ₸", format: compactMoney },
    { header: "Доля выручки", format: percent, barMax: 100 }, { header: "Заказы", format: number },
    { header: "Доля заказов", format: percent, barMax: 100 }, { header: "Медиана цены, ₸", format: money }, { header: "₸ / заказ", format: money },
  ]} rows={rows.map(row => [row.name, row.revenue, row.share, row.orders, row.orders / july.orders! * 100, row.medianPrice, row.revenuePerOrder])}
    caption="Медиана цены предложения и выручка на заказ — разные показатели. Они не заменяют друг друга." />;
}

export function VariantsTable() {
  return <DataTable source="Redstat" columns={[
    { header: "Упаковка" }, { header: "Выручка, ₸", format: compactMoney },
    { header: "Заказы", format: number }, { header: "₸ / заказ", format: money }, { header: "Медиана цены, ₸", format: money },
  ]} rows={[...data.variants].sort((a, b) => b.revenue - a.revenue).map(row => [<span key={row.id} className={styles.wrapCell}>{row.name}</span>, row.revenue, row.orders, row.revenuePerOrder, row.medianPrice])}
    caption="Июль 2026. Названия описывают варианты товара, а не рекомендации по применению. Выручка на заказ не является простой средней ценой предложений." />;
}

export function CategoriesTable() {
  return <DataTable source="Redstat" columns={[
    { header: "Категория" }, { header: "Выручка 2025, ₸", format: compactMoney }, { header: "Заказы 2025", format: number },
    { header: "Выручка год к году", format: v => `+${percent(v)}` }, { header: "Заказы год к году", format: v => `+${percent(v)}` },
  ]} rows={categorySummary.map(row => [row.name, row.revenue, row.orders, row.revenueYoY, row.ordersYoY])}
    caption="Год к году: только январь–апрель 2026 против января–апреля 2025. Годовые суммы — за полный 2025 год." />;
}

export function EconomicsTable() {
  return <>
    <DataTable source="Redstat" columns={[
      { header: "Упаковка" }, { header: "Цена, ₸", format: money }, { header: "Доставка, ₸", format: money },
      { header: "Комиссия 10,9%, ₸", format: money }, { header: "Предел закупки, ₸", format: money, emphasis: true },
    ]} rows={data.economics.map(row => [<span key={row.id} className={styles.wrapCell}>{row.name}</span>, row.price, row.delivery, row.commissionHigh, row.costCeiling])}
      caption="Порог закупочной себестоимости на складе в Казахстане для 15% вклада. Включены 5% рекламы и 1% резерва на потери. Налоги продавца и постоянные расходы не включены; суммы округлены до тенге." />
    <details className="reading-details"><summary><span>Полная раскладка переменных расходов</span><IconlyChevronDown size={17} /></summary>
      <DataTable source="Redstat" columns={[
        { header: "Упаковка" }, { header: "Комиссия + доставка" }, { header: "Реклама 5%, ₸", format: money },
        { header: "Резерв 1%, ₸", format: money }, { header: "Целевой вклад 15%, ₸", format: money },
      ]} rows={data.economics.map(row => [<span key={row.id} className={styles.wrapCell}>{row.name}</span>, `${percent(row.logisticsShareLow)}–${percent(row.logisticsShareHigh)}`, Math.round(row.price * .05), Math.round(row.price * .01), Math.round(row.price * .15)])}
        caption="Диапазон платформы и логистики соответствует комиссиям 6,4–10,9%. Предельная закупка в основной таблице рассчитана по верхней ставке 10,9%." />
    </details>
  </>;
}

export function PilotTable() {
  const ids = ["101326865", "120965745", "100693873"];
  const candidates = ids.map(id => data.variants.find(v => v.id === id)).filter(v => v !== undefined);
  return <DataTable source="Redstat" columns={[
    { header: "Упаковка" }, { header: "Рынок, заказов", format: number },
    ...[.5, 1, 2].map(share => ({ header: `Доля ${percent(share)}`, format: (v: number) => v.toLocaleString("ru-RU", { maximumFractionDigits: 1 }) })),
  ]} rows={candidates.map(row => [<span key={row.id} className={styles.wrapCell}>{row.name}</span>, row.orders, row.orders * .005, row.orders * .01, row.orders * .02])}
    caption="Сценарное число заказов нового продавца за месяц при доле 0,5%, 1% и 2% от июльских заказов SKU. Это допущения для оценки масштаба, не прогноз и не размер партии. Дробные значения оставлены, чтобы не завышать слабый спрос." />;
}
