import type { Metadata } from "next";

const C = {
  bg: "#0a0a0f",
  surface: "#111119",
  border: "#1e1e30",
  accent: "#6c5ce7",
  green: "#00d2a0",
  text: "#e8e8f0",
  dim: "#999",
  kaspi: "#f14635",
};

export const metadata: Metadata = {
  title: "Карманный аналитик Kaspi — материалы с форума | Алмас Касымжанов",
  description:
    "Слайды, пошаговый гайд установки и MCP-архив с форума селлеров. Своя аналитика Kaspi-магазина через Claude — без дашборда и без кода.",
};

const sCard: React.CSSProperties = {
  background: C.surface,
  border: `1px solid ${C.border}`,
  borderRadius: 14,
  padding: "28px",
  marginBottom: 16,
  textDecoration: "none",
  display: "block",
  transition: "border-color .15s",
};

const sBadge = (color: string): React.CSSProperties => ({
  display: "inline-block",
  padding: "3px 10px",
  borderRadius: 20,
  background: `${color}18`,
  color,
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: "0.03em",
});

function LinkCard({
  href,
  emoji,
  title,
  desc,
  cta,
  external,
}: {
  href: string;
  emoji: string;
  title: string;
  desc: string;
  cta: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      style={sCard}
    >
      <div style={{ display: "flex", gap: 18, alignItems: "flex-start" }}>
        <div style={{ fontSize: 30, lineHeight: 1, flexShrink: 0 }}>{emoji}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h2
            style={{
              fontSize: 19,
              fontWeight: 700,
              color: C.text,
              margin: "0 0 6px",
            }}
          >
            {title}
          </h2>
          <p
            style={{
              fontSize: 14,
              lineHeight: 1.6,
              color: C.dim,
              margin: "0 0 14px",
            }}
          >
            {desc}
          </p>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontSize: 13,
              fontWeight: 600,
              color: C.accent,
            }}
          >
            {cta} →
          </span>
        </div>
      </div>
    </a>
  );
}

export default function SellersForumPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: C.bg,
        color: C.text,
        fontFamily: "'Inter', -apple-system, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: 760,
          margin: "0 auto",
          padding: "56px 24px 96px",
        }}
      >
        {/* HEADER */}
        <div
          style={{
            borderBottom: `2px solid ${C.border}`,
            paddingBottom: 32,
            marginBottom: 40,
          }}
        >
          <div style={{ display: "flex", gap: 8, marginBottom: 18, flexWrap: "wrap" }}>
            <span style={sBadge(C.kaspi)}>Kaspi</span>
            <span style={sBadge(C.accent)}>Claude / MCP</span>
            <span style={sBadge(C.green)}>Форум селлеров</span>
          </div>
          <h1
            style={{
              fontSize: "clamp(28px, 5vw, 44px)",
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
              fontWeight: 700,
              margin: 0,
            }}
          >
            Карманный аналитик Kaspi
          </h1>
          <p
            style={{
              fontSize: 17,
              color: C.dim,
              marginTop: 18,
              lineHeight: 1.6,
              maxWidth: "60ch",
            }}
          >
            Материалы с форума: слайды доклада, пошаговый гайд установки и
            готовый MCP-архив. Подключаешь свой Kaspi-токен — и разговариваешь
            со своими продажами прямо в чате Claude. Без дашборда, без кода.
          </p>
        </div>

        {/* LINKS */}
        <LinkCard
          href="/sellers-forum/slides.html"
          emoji="📊"
          title="Слайды доклада"
          desc="15 слайдов с форума: как селлеру собрать свою аналитику и общаться с данными через Claude. Листай стрелками или свайпом."
          cta="Открыть слайды"
          external
        />

        <LinkCard
          href="/sellers-forum/guide.html"
          emoji="📖"
          title="Пошаговый гайд установки"
          desc="Установка от нуля до рабочего «карманного аналитика»: VS Code, Node.js, MCP-коннектор, подключение Kaspi-токена. Каждый шаг расписан."
          cta="Открыть гайд"
          external
        />

        <LinkCard
          href="https://drive.google.com/file/d/1vCVd3Ehu9vfyF8RTfQMQzRMdxtmH9hta/view?usp=sharing"
          emoji="⬇️"
          title="Скачать MCP-архив"
          desc="Готовый коннектор для Claude. Скачиваешь, распаковываешь, подключаешь по гайду выше — и Claude видит твои данные Kaspi."
          cta="Скачать с Google Drive"
          external
        />

        {/* WHAT IT IS */}
        <div
          style={{
            ...sCard,
            marginTop: 32,
            cursor: "default",
            borderLeft: `4px solid ${C.accent}`,
          }}
        >
          <h3
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: C.text,
              margin: "0 0 10px",
            }}
          >
            Что это даёт
          </h3>
          <p
            style={{
              fontSize: 14,
              lineHeight: 1.7,
              color: "#bbb",
              margin: 0,
            }}
          >
            Обычно аналитику магазина смотрят в дашборде — «прийти и
            посмотреть». MCP-коннектор переворачивает это: ты открываешь Claude
            и просто спрашиваешь словами — «топ-10 товаров за март», «где
            затоварка», «какой месяц просел и почему». Ответ — по твоим реальным
            цифрам из Kaspi, за секунды, с телефона или ноутбука.
          </p>
        </div>

        {/* FOOTER */}
        <div
          style={{
            marginTop: 48,
            paddingTop: 24,
            borderTop: `1px solid ${C.border}`,
            fontSize: 13,
            color: C.dim,
          }}
        >
          Вопросы и обратная связь —{" "}
          <a
            href="https://www.instagram.com/almas_kasymzhanov/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: C.accent, textDecoration: "none" }}
          >
            @almas_kasymzhanov
          </a>
        </div>
      </div>
    </div>
  );
}
