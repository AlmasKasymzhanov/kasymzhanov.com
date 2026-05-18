import type { Metadata } from "next";
import { KaStyle, KaFoot } from "./_ka";

export const metadata: Metadata = {
  title: "Карманный аналитик Kaspi — материалы форума | Алмас Касымжанов",
  description:
    "Разбор концепта, пошаговое объяснение установки и архив MCP-коннектора. Своя аналитика Kaspi-магазина через Claude — без дашборда и без кода.",
};

const ITEMS = [
  {
    num: "01",
    title: "Разбор",
    desc: "Что такое карманный аналитик Kaspi: концепт, как устроено, что нужно для запуска.",
    href: "/sellers-forum/razbor",
    go: "Открыть разбор →",
    external: false,
  },
  {
    num: "02",
    title: "Пошаговое объяснение",
    desc: "Установка по шагам: 7 шагов плюс бонус, около 15 минут, программировать не нужно.",
    href: "/sellers-forum/guide",
    go: "Открыть объяснение →",
    external: false,
  },
  {
    num: "03",
    title: "Архив для установки",
    desc: "kaspi-mcp.zip — скачиваешь, распаковываешь, подключаешь по шагам из объяснения.",
    href: "https://drive.google.com/file/d/1vCVd3Ehu9vfyF8RTfQMQzRMdxtmH9hta/view?usp=sharing",
    go: "Скачать с Google Drive →",
    external: true,
  },
];

export default function SellersForumPage() {
  return (
    <div className="ka-root">
      <KaStyle />
      <div className="ka-wrap">
        <div className="ka-head">
          <div className="ka-eyebrow">Kaspi × Claude · Seller Forum</div>
          <h1>Карманный аналитик Kaspi</h1>
          <p className="ka-intro">
            Спрашиваешь магазин человеческим языком — получаешь ответ по своим
            реальным данным Kaspi. Без дашборда, без кода.
          </p>
        </div>

        {ITEMS.map((it) => (
          <a
            key={it.num}
            className="ka-row"
            href={it.href}
            target={it.external ? "_blank" : undefined}
            rel={it.external ? "noopener noreferrer" : undefined}
          >
            <div className="ka-num">{it.num}</div>
            <div className="ka-body">
              <h2>{it.title}</h2>
              <p>{it.desc}</p>
              <span className="ka-go">{it.go}</span>
            </div>
          </a>
        ))}

        <KaFoot />
      </div>
    </div>
  );
}
