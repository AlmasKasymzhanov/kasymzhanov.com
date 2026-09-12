import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const runtime = "nodejs";
export const alt = "Рынок магния на Kaspi: спрос и экономика запуска";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default async function Image() {
  const font = await readFile(join(process.cwd(), "public/fonts/Menlo-Regular.ttf"));
  return new ImageResponse(<div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#101419", color: "#ededed", padding: "64px 72px", fontFamily: "Mono" }}>
    <div style={{ display: "flex", color: "#a1a1a1", fontSize: 20 }}>Исследование · Kaspi · Июль 2026</div>
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ fontSize: 54, letterSpacing: -2, lineHeight: 1.15 }}>Рынок магния на Kaspi</div>
      <div style={{ fontSize: 29, color: "#a1a1a1" }}>Спрос есть. Сойдётся ли экономика?</div>
    </div>
    <div style={{ display: "flex", gap: 52, fontSize: 24 }}><span>195 млн тенге</span><span>30 607 заказов</span><span>5 линеек</span></div>
    <div style={{ display: "flex", justifyContent: "space-between", color: "#a1a1a1", fontSize: 18 }}><span>kasymzhanov.com</span><span>Источник: Redstat</span></div>
  </div>, { ...size, fonts: [{ name: "Mono", data: font, style: "normal", weight: 400 }] });
}
