import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const runtime = "nodejs";
export const alt = "Almas Kasymzhanov · personal website";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const mono = await readFile(join(process.cwd(), "public/fonts/Menlo-Regular.ttf"));

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
        <div style={{ display: "flex", fontFamily: "Mono", fontSize: 22, letterSpacing: 4, textTransform: "uppercase", color: "#888888" }}>
          kasymzhanov.com
        </div>
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 1000 }}>
          <div style={{ display: "flex", fontFamily: "Mono", fontWeight: 400, fontSize: 64, lineHeight: 1.05, letterSpacing: -2, color: "#ededed" }}>
            Almas Kasymzhanov
          </div>
          <div style={{ fontFamily: "Mono", fontWeight: 400, fontSize: 30, lineHeight: 1.4, color: "#888888", marginTop: 26 }}>
            Products, writing, and research.
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: "Mono", fontSize: 24 }}>
          <div style={{ display: "flex", color: "#ededed" }}>Redstat · 10b · ProofTotal</div>
          <div style={{ display: "flex", color: "#888888" }}>Personal blog</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Mono", data: mono, weight: 400, style: "normal" },
      ],
    }
  );
}
