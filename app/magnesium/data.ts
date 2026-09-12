import dataset from "@/lib/data/magnesium-market.json";

export const data = dataset;
export const SLUG = "rynok-magnievyh-preparatov-kaspi-2026";
export const TITLE = "Рынок магния на Kaspi: спрос есть. Сойдётся ли экономика?";
export const DESCRIPTION = "Исследование рынка магнийсодержащих препаратов и добавок на Kaspi: пять продуктовых линеек, конкуренты, упаковки, цены, сезонность и экономика пилотного запуска. Источник: Redstat.";
export const monthLabels: Record<string, string> = { "01": "Янв", "02": "Фев", "03": "Мар", "04": "Апр", "05": "Май", "06": "Июн", "07": "Июл", "08": "Авг", "09": "Сен", "10": "Окт", "11": "Ноя", "12": "Дек" };
export const monthLabel = (month: string) => monthLabels[month.slice(5, 7)];
export const number = (value: number) => value.toLocaleString("ru-RU", { maximumFractionDigits: 0 });
export const money = (value: number) => `${number(value)} ₸`;
export const ordersLabel = (value: number) => `${number(value)} ${{ one: "заказ", few: "заказа", many: "заказов", other: "заказа" }[new Intl.PluralRules("ru-RU").select(value) as "one" | "few" | "many" | "other"]}`;
export const compactMoney = (value: number) => value >= 1e9 ? `${(value / 1e9).toLocaleString("ru-RU", { maximumFractionDigits: 2 })} млрд ₸` : value >= 1e6 ? `${(value / 1e6).toLocaleString("ru-RU", { maximumFractionDigits: 2 })} млн ₸` : money(value);
export const percent = (value: number) => `${value.toLocaleString("ru-RU", { maximumFractionDigits: 1 })}%`;
export const colors: Record<string, string> = { "Magne B6": "var(--chart-accent)", "Magnerot": "var(--chart-secondary)", "Magnefar": "var(--chart-tertiary)", "Magnetab": "var(--chart-fourth)", "Magnicum": "var(--viz-uzum)" };
export const roles: Record<string, string> = { "Magne B6": "Основной объём пилота", "Magnerot": "Второй приоритет", "Magnefar": "Небольшая тестовая партия", "Magnetab": "Тест упаковки 50 шт", "Magnicum": "Минимальный остаток или под заказ" };
export const july = data.market.find(row => row.month === data.latestMonth)!;
export const julyTargets = data.targets.map(target => ({ ...target, latest: target.months.find(row => row.month === data.latestMonth)! })).sort((a, b) => b.latest.revenue! - a.latest.revenue!);
export const targetRevenue = julyTargets.reduce((sum, row) => sum + row.latest.revenue!, 0);
export const targetOrders = julyTargets.reduce((sum, row) => sum + row.latest.orders!, 0);
export const categoryNames = ["Витамины и БАД", "Витаминные препараты"];
export const categorySummary = categoryNames.map(name => {
  const rows = data.categories.filter(row => row.name === name);
  const sum = (year: string, key: "revenue" | "orders", firstFour = false) => rows.filter(r => r.month.startsWith(year) && (!firstFour || Number(r.month.slice(5)) <= 4)).reduce((total, r) => total + r[key]!, 0);
  return { name, revenue: sum("2025", "revenue"), orders: sum("2025", "orders"), revenueYoY: (sum("2026", "revenue", true) / sum("2025", "revenue", true) - 1) * 100, ordersYoY: (sum("2026", "orders", true) / sum("2025", "orders", true) - 1) * 100 };
});
