# Magnesium research: unlisted client report

Route: `/magnesium` (direct client link, unlisted).

The user approved committing and pushing this unlisted report on 13 September 2026 after local review. Publication date: 13 September 2026. Research date: 11 September 2026. Russian material; no English translation is claimed. Keep the report out of all public catalogues and feeds.

## Presentation

The page uses the existing PersonalShell, ArticleHeader, ResearchSummary, ResearchSection, ResearchFigure, DataTable, LineChart, BarChart, ChartTooltipScope, ContentEngagement and PersonalFooter. It has twelve navigation anchors, an editorial conclusion, grouped July facts, five interactive charts, detailed tables, methodology, two existing-style offers and reader participation at the bottom. Interface hovers are neutral; quantitative color uses the shared 10b-derived palette. Reading time is approximately 20 minutes, including the visible tables (about 3,470 whitespace-delimited tokens on the rendered page).

No discovery links: removed from the homepage, sidebar, public catalogue, latest/search, Kaspi section, sitemap and RSS. Metadata sets noindex, nofollow; canonical and share preview use /magnesium. The former unpublished blog route returns 404. This is an unlisted link, not access control: anyone with the URL can read it.

## Data mapping

The adapter is `scripts/import-magnesium-market.mjs`. It accepts the prepared research directory as an argument, validates its supplied SHA256 checksums and generates the explicitly allowlisted `lib/data/magnesium-market.json`. The source directory is not a runtime dependency. No source documents, JSONL, audits, internal database names or service fields are copied into the client bundle.

| Publication element | Prepared source |
| --- | --- |
| July summary, market dynamics and market table | `magnesium_market_monthly.csv`, checked against `ENTERPRISE_SUMMARY.json` |
| Five line series and monthly totals | `target_monthly_wide.csv`; detail and total cross-checks from `target_monthly.csv` and summary |
| Competitor ranking, top-15 table | `magnesium_competitors_latest.csv` |
| Revenue/orders by price segment | July rows of `magnesium_price_segments_monthly.csv` |
| Full-2025 category chart, annual totals and Jan–Apr YoY | Two vitamin categories from `category_context_2025_2026.csv` |
| Eleven July packages and pilot order scenarios | July rows of `target_variant_monthly.csv` |
| Ten preliminary purchase-cost ceilings and expenses | `pl_screen_latest_target_variants.csv` |
| Editorial interpretation, assumptions and pilot rules | Main supplied research Markdown, rewritten for public reading |

Only Redstat is credited on the material. May and June are null, never zero. July is a separate point with a custom tooltip and explanatory captions, not a continuation from April. Totals cover five available months. An observed March zero for Magnicum is preserved. The complete 2025 category history is not represented as product-specific seasonality. Brand and product-line groupings are explicitly distinguished.

The package table distinguishes median offer price and revenue per order. A simple average offer price was not supplied and is not invented. Orders are not described as confirmed package quantities. Proposed seller shares of 0.5%, 1% and 2% are explicitly scenarios, not forecasts or confirmed purchase volumes.

The P&L display reproduces the prepared model, including its delivery/VAT assumption. Contribution is not net profit. Supplier price, seller taxation and actual account terms remain necessary inputs. The supplied commission/delivery references were checked against [Kaspi commissions](https://guide.kaspi.kz/partner/ru/shop/conditions/commissions) and [Kaspi delivery](https://guide.kaspi.kz/partner/ru/shop/delivery/shipping/q2288); the public data attribution remains Redstat.

## Files

- New route directory: `page.tsx`, `layout.tsx`, `data.ts`, `charts.tsx`, `tables.tsx`, `research.module.css`, `opengraph-image.tsx`.
- New static data: `lib/data/magnesium-market.json`.
- The earlier additions to the public catalogue, homepage and sidebar have been removed.
- New import/verification scripts: `scripts/import-magnesium-market.mjs`, `scripts/check-magnesium-research.cjs`.
- Shared line chart: `components/charts/line-chart.tsx` and `line-chart-export.ts` now skip missing observations during keyboard navigation and clear a previously pinned tooltip when focus moves. This was reproduced at the April–July gap and checked in both directions.
- This implementation note.

## Verification

`node scripts/check-magnesium-research.cjs --http` verifies exact July KPIs, all five line totals, observed zero versus missing months, package/market/segment reconciliations, full-year category totals, cost-ceiling rounding, data privacy, actual disconnected SVG paths, direct route/reload, metadata, engagement, absence from public discovery surfaces, noindex, the former route returning 404 and the generated PNG preview.

The existing `scripts/check-content-engagement.cjs` checks stable material identity and share/login returns. Production build uses `NEXT_DIST_DIR=.next-production` to preserve the local development server. There is no separate configured lint script in this repository; TypeScript and the Next build are the available compile checks.

Browser review covers both themes, representative figures and summaries, tooltip values, series/metric/category controls and 320/768/1024/1440-pixel rendering in same-origin frames. This is responsive browser testing, not a physical touchscreen-device test. Wide tables retain their own scroll container. The temporary responsive test route is removed after review.

Pre-existing Recharts static-render size warnings occur on other routes in the production build. This research uses the site's native chart components and does not introduce Recharts size warnings.
