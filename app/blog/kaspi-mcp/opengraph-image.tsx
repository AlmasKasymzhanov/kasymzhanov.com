import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const runtime = "nodejs";
export const alt = "Арифметика лени: как AI добывает золото из Kaspi";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const [mono, monoBold] = await Promise.all([
    readFile(join(process.cwd(), "public/fonts/Menlo-Regular.ttf")),
    readFile(join(process.cwd(), "public/fonts/Menlo-Bold.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0a",
          padding: "72px 80px",
          fontFamily: "Mono",
        }}
      >
        {/* eyebrow */}
        <div
          style={{
            display: "flex",
            fontFamily: "Mono",
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#888888",
          }}
        >
          Аналитика без таблиц и сервисов
        </div>

        {/* title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: 940,
          }}
        >
          <div
            style={{
              fontFamily: "Mono",
              fontWeight: 700,
              fontSize: 92,
              lineHeight: 1.05,
              letterSpacing: -3,
              color: "#ededed",
            }}
          >
            Арифметика лени
          </div>
          <div
            style={{
              fontFamily: "Mono",
              fontWeight: 400,
              fontSize: 28,
              lineHeight: 1.4,
              color: "#888888",
              marginTop: 26,
            }}
          >
            Как заставить AI добывать золото из Kaspi, пока вы пьёте кофе
          </div>
        </div>

        {/* footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: "Mono",
            fontSize: 24,
          }}
        >
          <div style={{ display: "flex", color: "#ededed" }}>almas kasymzhanov</div>
          <div style={{ display: "flex", color: "#888888" }}>kasymzhanov.com</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Mono", data: mono, weight: 400, style: "normal" },
        { name: "Mono", data: monoBold, weight: 700, style: "normal" },
      ],
    }
  );
}
