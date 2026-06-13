import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import {
  buildRowsFromApi,
  parseCSV,
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
  source?: string;
  label?: string;
}

// Module-level cache survives between requests on a warm server instance.
let cache: CacheEntry | null = null;

// Snapshot shipped with the app: a real «Выбор ниши» export used while the
// live API is unavailable (e.g. daily request limit). Parsed with the exact
// same pipeline as a manual CSV upload. Remove/ignore once the API is primary.
const SNAPSHOT_FILE = path.join(process.cwd(), "app", "api", "web-analyzer", "snapshot.csv");
const SNAPSHOT_LABEL = "Снапшот MPStats · 06.03.2026";

async function loadSnapshot(): Promise<NicheRow[] | null> {
  try {
    const text = await fs.readFile(SNAPSHOT_FILE, "utf8");
    const rows = parseCSV(text);
    return rows.length ? rows : null;
  } catch {
    return null;
  }
}

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
  const url = new URL(req.url);
  const date = url.searchParams.get("date") ?? "";
  const fbs = url.searchParams.get("fbs") === "1";
  const refresh = url.searchParams.get("refresh") === "1";
  const key = `${date}|${fbs}`;

  if (!refresh && cache && cache.key === key && Date.now() - cache.at < CACHE_TTL_MS) {
    return NextResponse.json(
      { total: cache.total, date, cached: true, source: cache.source, label: cache.label, data: cache.rows },
      { headers: { "Cache-Control": "no-store" } }
    );
  }

  // Try the live MPStats API first (when a token is configured).
  const token = process.env.MPSTATS_TOKEN;
  if (token) {
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
      // Upstream failed (e.g. MPStats daily limit / 429). Serve a prior result
      // (even past TTL) if we have one, so the page never goes dark.
      console.error("web-analyzer: MPStats API failed, falling back:", err);
      if (cache && cache.key === key) {
        return NextResponse.json(
          { total: cache.total, date, cached: true, stale: true, source: cache.source, label: cache.label, data: cache.rows },
          { headers: { "Cache-Control": "no-store" } }
        );
      }
    }
  }

  // No token, or the API failed and we have no cache → bundled snapshot.
  const snap = await loadSnapshot();
  if (snap) {
    const label = `${SNAPSHOT_LABEL} · ${snap.length} ниш`;
    cache = { at: Date.now(), key, total: snap.length, rows: snap, source: "snapshot", label };
    return NextResponse.json(
      { total: snap.length, date, cached: false, source: "snapshot", label, data: snap },
      { headers: { "Cache-Control": "no-store" } }
    );
  }

  return NextResponse.json(
    { message: "Данные недоступны: живой API исчерпал лимит, а снапшот не найден." },
    { status: 502 }
  );
}
