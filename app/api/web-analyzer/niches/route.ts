import { NextResponse } from "next/server";
import {
  buildRowsFromApi,
  type MpSubject,
  type NicheRow,
} from "@/app/web-analyzer/niches";

/* ───────────────────────────────────────────────────────────────
   Server route: reproduces the MPStats «Выбор ниши» export via the
   Analytics API so users don't have to upload a CSV by hand.

   Source: POST https://mpstats.io/api/analytics/v1/wb/subject/list
   Auth:   X-Mpstats-TOKEN header (kept server-side via env, never
           shipped to the browser).

   The endpoint caps a page at 500 rows, and the full WB catalogue is
   ~7.5k subjects, so we paginate. Results are cached in memory so a
   public page doesn't burn the shared token's quota on every visit.
   ─────────────────────────────────────────────────────────────── */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const BASE = "https://mpstats.io/api/analytics/v1/wb/subject/list";
const PAGE_SIZE = 500; // MPStats hard limit: endRow - startRow <= 500
const CONCURRENCY = 4; // parallel page requests
const MAX_PAGES = 40; // safety backstop (~20k rows)
const CACHE_TTL_MS = 30 * 60 * 1000; // 30 min

interface ApiPage {
  total: number;
  data: MpSubject[];
}

interface CacheEntry {
  at: number;
  key: string;
  total: number;
  rows: NicheRow[];
}

// Module-level cache survives between requests on a warm server instance.
let cache: CacheEntry | null = null;

function buildUrl(startRow: number, endRow: number, date: string, fbs: boolean) {
  const u = new URL(BASE);
  u.searchParams.set("type", "json");
  u.searchParams.set("startRow", String(startRow));
  u.searchParams.set("endRow", String(endRow));
  if (date) u.searchParams.set("date", date);
  if (fbs) u.searchParams.set("fbs", "1");
  return u.toString();
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function fetchPage(
  startRow: number,
  token: string,
  date: string,
  fbs: boolean,
  attempt = 0
): Promise<ApiPage> {
  const res = await fetch(buildUrl(startRow, startRow + PAGE_SIZE, date, fbs), {
    method: "POST",
    headers: {
      "X-Mpstats-TOKEN": token,
      "Content-Type": "application/json",
    },
    body: "{}",
    cache: "no-store",
  });

  // 202 = отчёт ещё считается, 429 = лимит, 5xx = временная ошибка → ретрай.
  if ((res.status === 202 || res.status === 429 || res.status >= 500) && attempt < 3) {
    await sleep(800 * (attempt + 1));
    return fetchPage(startRow, token, date, fbs, attempt + 1);
  }
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`MPStats ${res.status}: ${text.slice(0, 300)}`);
  }
  const json = (await res.json()) as ApiPage;
  return { total: json.total ?? 0, data: json.data ?? [] };
}

export async function GET(req: Request) {
  const token = process.env.MPSTATS_TOKEN;
  if (!token) {
    return NextResponse.json(
      { message: "MPSTATS_TOKEN не задан на сервере (.env.local)." },
      { status: 500 }
    );
  }

  const url = new URL(req.url);
  const date = url.searchParams.get("date") ?? "";
  const fbs = url.searchParams.get("fbs") === "1";
  const refresh = url.searchParams.get("refresh") === "1";
  const key = `${date}|${fbs}`;

  if (!refresh && cache && cache.key === key && Date.now() - cache.at < CACHE_TTL_MS) {
    return NextResponse.json(
      { total: cache.total, date, cached: true, data: cache.rows },
      { headers: { "Cache-Control": "no-store" } }
    );
  }

  try {
    // First page tells us the total, then we fan out for the rest.
    const first = await fetchPage(0, token, date, fbs);
    const subjects: MpSubject[] = [...first.data];

    const pageCount = Math.min(Math.ceil(first.total / PAGE_SIZE), MAX_PAGES);
    const starts: number[] = [];
    for (let p = 1; p < pageCount; p++) starts.push(p * PAGE_SIZE);

    for (let i = 0; i < starts.length; i += CONCURRENCY) {
      const batch = starts.slice(i, i + CONCURRENCY);
      const pages = await Promise.all(
        batch.map((s) => fetchPage(s, token, date, fbs))
      );
      for (const pg of pages) subjects.push(...pg.data);
    }

    const rows = buildRowsFromApi(subjects);
    cache = { at: Date.now(), key, total: first.total, rows };

    return NextResponse.json(
      { total: first.total, date, cached: false, data: rows },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (err) {
    // Upstream failed (e.g. MPStats daily limit / 429). If we have any prior
    // result — even past its TTL — serve it stale so the public page keeps
    // working instead of going dark. Only error out if we've never loaded.
    if (cache && cache.key === key) {
      return NextResponse.json(
        { total: cache.total, date, cached: true, stale: true, data: cache.rows },
        { headers: { "Cache-Control": "no-store" } }
      );
    }
    const message = err instanceof Error ? err.message : "Не удалось загрузить данные из MPStats.";
    return NextResponse.json({ message }, { status: 502 });
  }
}
