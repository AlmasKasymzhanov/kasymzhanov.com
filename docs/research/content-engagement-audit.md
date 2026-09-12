# Reader participation — 12 September 2026

One shared bottom action row and comments section is now mounted on all 48 reading routes in the existing typography inventory: articles in Russian and English, standalone reports, tools and nested guides. Top metadata shows views, without a second reaction row. `PersonalDocument`, `ArticleLayout`, and the standalone top-30 report cover the three layout paths.

Published storage keys are preserved. Nested guides have distinct keys; the two existing WB guide URLs share one discussion. Sign-in returns to the current material and comments anchor, including English routes. Share URLs discard tracking parameters and avoid inherited homepage canonicals; English links retain their language. No database migration is needed for the existing slug-based likes, comments and shares tables.

Heart, Chat and Share paths were inspected in the signed-in Iconly Pro Light catalogue. Copy uses the existing Iconly geometry in the chart toolbar. WhatsApp, Facebook, Threads and VK were subsequently inspected and imported from the same catalogue; the other channel glyphs reuse the site's existing Iconly components. Every menu glyph now belongs to Iconly. Directional arrows move 2px on hover/focus, with reduced-motion support. Reaction controls have no visible border, pill or hover background; their 44px touch area is transparent. Hover and liked states use neutral text tokens.

Owner's latest follow-up: decorative horizontal rules are removed from reading sections, headers, comments, footers, and home/tools/article lists. Methodology and sources have no background or inset padding. Only offers and comment sign-in hints use low-chroma surfaces, with separate light/dark values documented in DESIGN.md. Inputs and submit buttons are rounded and have neutral interaction states. Table row rules retain their data-alignment function. Share-menu items use Geist 14/400, neutral hover/focus, and no internal separator.

Validation:

- `node scripts/check-content-engagement.cjs --routes`: all 48 pages returned 200 and exactly one correctly keyed discussion. Results: `.cache/content-engagement-routes.json`.
- Identity tests cover existing catalogue keys, guide separation, aliases, localized login returns, clean URLs and root/cross-language canonical fallback.
- `npx tsc --noEmit`, chart rendering checks and `git diff --check` passed.
- Latest full public-route smoke check: 78/78 passed, including RU/EN hubs, articles, reports, tools, public informational pages and legacy redirects; KZ redirects to RU. This is route coverage, not a claim of individual screenshot inspection for all 78 pages.
- Freedom Market source/comment sections inspected in light and dark screenshots after the latest correction: sources transparent; comment surfaces #f6f7f9 / #15181c. All 11 share-menu items were inspected in the browser and use Iconly, Geist 14px, and no separator borders.
- Browser checks: camping report, top-30 report, MPStats guide and English MCP article. Guest controls use Iconly, comments receive keyboard focus, and menu ArrowDown/Escape navigation works.
- At 390px, controls remain inside the page and the share menu fits the viewport. At 1440px, the updated unbordered action row and rounded supporting blocks were inspected in a dark-theme screenshot; light-theme/mobile layout was checked through the browser DOM. Screenshot capture was intermittent.

No production deployment. Authenticated likes/comment writes and external share submissions were not exercised against the live backend. Existing authenticated operations are reused; guest navigation and share-menu interaction were checked without creating public activity.

Latest visual follow-up: top-30 methodology remained transparent in both themes; offer backgrounds measured #f5f7fa / #101419. MPStats guide retained 400-weight H1 and unbordered reaction controls. The viewport override did not apply reliably in this follow-up (reported 2686px), so the fresh checks establish desktop behavior; earlier 390px coverage is recorded above, not presented as a new mobile screenshot audit. Temporary override reset.
