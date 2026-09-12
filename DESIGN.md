---
version: alpha
name: Kasymzhanov Personal Blog
description: A text-first personal blog for articles, projects, tools, and data research.
omitted:
  - section: spacing
    reason: Layout rhythm is implemented with Tailwind utilities and has no separate named spacing scale yet.
  - section: rounded
    reason: The interface is predominantly square; only avatars and small file-tree controls use local radii.
colors:
  primary: "#000000"
  personal-paper: "#000000"
  personal-text: "#D4D4D4"
  personal-muted: "#A1A1A1"
  personal-border: "#292929"
  personal-rail-hover: "#171717"
  personal-rail-active: "#222222"
  personal-red: "#D4D4D4"
  personal-teal: "#D4D4D4"
  chart-accent: "#2A82FF"
  chart-neutral: "#6E6E6E"
  chart-kaspi: "#2A82FF"
  chart-freedom: "#49B9AE"
  chart-wildberries: "#AD95EC"
  chart-ozon: "#D6A15D"
  chart-uzum: "#9DA8C7"
typography:
  page-title:
    fontFamily: Geist
    fontSize: 40px
    fontWeight: 400
    lineHeight: 1.08
    letterSpacing: -0.025em
  article-title:
    fontFamily: Geist
    fontSize: clamp(32px, 4vw, 48px)
    fontWeight: 400
    lineHeight: 1.13
    letterSpacing: -0.03em
  section-title:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.33
    letterSpacing: -0.012em
  body-lg:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.7
  body-md:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.65
  body-sm:
    fontFamily: Geist
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.5
  metadata:
    fontFamily: Menlo
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: 0.04em
components:
  theme-root:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.personal-text}"
    typography: "{typography.body-md}"
  personal-page:
    backgroundColor: "{colors.personal-paper}"
    textColor: "{colors.personal-text}"
    typography: "{typography.body-md}"
  personal-rail:
    backgroundColor: "{colors.personal-paper}"
    textColor: "{colors.personal-muted}"
    typography: "{typography.body-sm}"
  personal-rail-hover:
    backgroundColor: "{colors.personal-rail-hover}"
    textColor: "{colors.personal-text}"
  personal-rail-active:
    backgroundColor: "{colors.personal-rail-active}"
    textColor: "{colors.personal-text}"
  divider:
    backgroundColor: "{colors.personal-border}"
  accent-note-red:
    backgroundColor: "{colors.personal-red}"
  accent-note-teal:
    backgroundColor: "{colors.personal-teal}"
  article-body:
    backgroundColor: "{colors.personal-paper}"
    textColor: "{colors.personal-text}"
    typography: "{typography.body-lg}"
  article-list-row:
    backgroundColor: "{colors.personal-paper}"
    textColor: "{colors.personal-text}"
    typography: "{typography.body-md}"
  data-chart:
    backgroundColor: "{colors.personal-paper}"
    textColor: "{colors.personal-text}"
    typography: "{typography.metadata}"
  data-series-highlight:
    backgroundColor: "{colors.chart-accent}"
  data-series-context:
    backgroundColor: "{colors.chart-neutral}"
  data-series-kaspi:
    backgroundColor: "{colors.chart-kaspi}"
  data-series-freedom:
    backgroundColor: "{colors.chart-freedom}"
  data-series-wildberries:
    backgroundColor: "{colors.chart-wildberries}"
  data-series-ozon:
    backgroundColor: "{colors.chart-ozon}"
  data-series-uzum:
    backgroundColor: "{colors.chart-uzum}"
---

# Kasymzhanov Personal Blog

## Overview

Kasymzhanov.com is a personal blog, not a media publication. It should feel like a well-kept working notebook: direct, quiet, technically precise, and recognizably written by one person. The interface puts Almas, his projects, his writing, and his research in one coherent system.

The product is text-first. Hierarchy comes from typography, spacing, thin dividers, and careful alignment. Decorative cards, oversized editorial covers, news-site chrome, and generic landing-page patterns do not belong here.

Copy is written in the first person in plain language. Sentences should be easy to read aloud. Avoid long dashes, inflated claims, institutional language, and phrases that sound generated. Explain technical terms when a general reader may not know them.

## Colors

Page and sidebar backgrounds match https://maxleiter.com/: pure black in dark mode and pure white in light mode (verified from computed page styles on 2026-09-11). Text is soft off-white, secondary information is neutral gray, and borders remain quiet. UI surfaces stay neutral; quantitative graphics use the documented data palette, labels and redundant marks.

| Role | Dark | Light |
| --- | --- | --- |
| Paper | `#000000` | `#FFFFFF` |
| Text | `#D4D4D4` | `#242422` |
| Muted text | `#A1A1A1` | `#737373` |
| Border | `#292929` | `#E5E5E5` |
| Rail hover | `#171717` | `#E8E5DE` |
| Rail active | `#222222` | `#DEDAD1` |
| Red accent | `#D4D4D4` | `#242424` |
| Teal accent | `#D4D4D4` | `#242424` |

Keep prose and navigation calm. In data figures, distinguish series through purposeful color, labels and stroke patterns; use explicit quantitative scales for heatmaps.

## Typography

Geist carries all interface and reading text. Use the locally hosted `Geist-Variable.woff2` (font version 1.800 from the official `geist@1.7.2` package), with the redesigned Cyrillic and verified Russian and Kazakh glyph coverage. Its license is stored alongside the font in `public/fonts/Geist-LICENSE.txt`. It gives the site a contemporary product-engineering character without making the writing feel like documentation. Menlo is limited to dates, reading time, file names, units, axis labels, and compact metadata.

The homepage greeting, article and section titles, list titles, project names, and body copy use weight 400. Base heading rules belong in the CSS base layer so they do not override component typography. Both homepage introduction paragraphs use the same muted text color and a 1.65 line height. Do not create hierarchy by stacking many font weights or uppercase labels. Uppercase is acceptable only for very short metadata.

Article paragraphs use 18px text with a line height around 1.7 on desktop and 17px on small screens. The reading column stays narrow enough for roughly 60 to 75 characters per line. Use tabular numerals for comparable values, dates, percentages, and chart labels.

## Layout

Desktop pages use the same two-column shell as the homepage: a 228px file-tree rail and a flexible content area. The rail remains sticky. Main content sits on one continuous paper surface with no card behind the page.

The homepage and indexes use a 640px content column. Long-form articles use a reading column no wider than 720px. Data figures may expand to about 1040px when the comparison genuinely needs space, then return to the reading column.

At widths below 1024px, the rail becomes a compact top section and content uses the full available width. Page padding is 20px on narrow phones, increases gradually, and never creates horizontal scrolling. Important controls have at least a 44px interactive target even when their visible icon is smaller.

Article indexes are text lists with dates, rubrics, titles, short descriptions, and reading time. They do not use preview images. A page cover is not rendered by default inside an article. Keep an image for social metadata, and place an image in the article only when it explains something the text cannot.

## Elevation & Depth

The system is flat. Use thin borders, tonal hover states, and whitespace to show grouping. Avoid floating cards, deep shadows, glass effects, gradients, and stacked surfaces. A one-pixel image outline is acceptable when an image would otherwise disappear into the paper.

## Shapes

Rectangular controls and figures stay square or use a restrained 3px radius. Avatars are circular. Do not mix large soft cards with sharp analytical figures. Charts, tables, code blocks, and callouts follow the same restrained geometry.

## Components

**Projects.** Follow the compact Featured Work rows at https://www.otherplace.studio/andres#featured-work: a 32px logo badge, project name, and small muted founder pill on the left, with work disciplines aligned right on a roughly 52px desktop row. The pill uses 11px regular text and a subtle rounded background. On mobile, disciplines move below the name. Redstat and 10b: Product / Development / Data / AI; ProofTotal: Product / Development / Data / AI / Integrations. Localize the labels with the page. A separate 44px button immediately after the founder pill uses the Iconly Pro Light Chevron Down SVG from web.iconly.pro to expand each description inline, identically on desktop and mobile. The button has no hover background: only the arrow changes color on hover and stays brighter when expanded. Rotate the chevron when expanded; expose aria-expanded and aria-controls. Keep the description open until toggled again. Do not use hover tooltips or make founder pills interactive. Details use regular body typography, with dates, metrics, notes, and client names below the description. Redstat and 10b names and logos link to their public sites. Repeat an explicit domain link at the bottom of each expanded description with the Iconly external arrow, a color hover on desktop, and a visible underline on mobile. ProofTotal has no public destination. Its clients include L'Oréal Paris Kazakhstan, Mechta Market, Halyk Market, and others, as supplied by the site owner. Keep these client names in English in every locale. ProofTotal uses the updated pt-badge.svg from prooftotal-hq/.worktrees/quanu-expense-v1-20260909/public/brand/prooftotal/, copied as public/logos/prooftotal-badge.svg. Preserve its supplied monochrome artwork in both themes. Do not invent a product-status badge or public destination for it.

**Profile.** Start with the avatar and greeting; omit the update-date eyebrow. Keep the existing circular portrait, using object-position: 50% 16.5% to preserve space above the hairline.

**Resources and footer.** Tools and research share the same title/date/reading-time/views row component as homepage writing, with faint dividers and a full-row color hover. Metadata comes from the article catalogue and saved view counts. Preserve the RU marker for destinations without a translation. Footer links have no underline and use a quiet color hover, visible keyboard focus, and 44px mobile touch targets.

**File-tree rail.** The rail is the primary navigation and should appear across the homepage, article index, article pages, and public research. Folder state may animate briefly, but motion must respect reduced-motion settings. Current location is communicated with text weight and color, not a bright pill.

**Article header.** Show a compact text eyebrow, title, short introduction, date, and reading time. The author context is personal and concise. Do not repeat a newsroom byline, editorial rubric system, engagement counter, or mandatory hero image above every article.

**Article body.** Keep paragraphs short enough to scan. Use subheadings only when they help the argument. Links have no underline; distinguish them through text color, a quiet hover, and visible keyboard focus. Quotes, notes, and methodology blocks use spacing and typographic hierarchy without tinted boxes.

**Article lists.** Homepage, section archives, author pages, search and published tools use `PersonalContentRow` via `PersonalArticleList`: 17px regular titles, 12px date/reading-time/views metadata below, faint dividers and a full-row color hover without an underline. Metadata wraps naturally on phones. No cover, arrow or excerpt is needed in the list.

**Public page consistency.** Informational pages use `PersonalDocument` and the shared sidebar/footer. Page titles are 32–40px at weight 400; article and research titles can reach 48px. Reading text is 17px on phones and 18px on desktop, with 1.75 line height. H2 is 24–28px, H3 is 20px, all weight 400. Retain weight 500 for meaningful emphasis and data labels. Research uses the same font and shared data palette; its tables and captions retain smaller sizes. Reports have a single reading column while wide tables scroll inside their containers. Preserve content, data, route visibility and functional forms.

**Languages.** Only RU and EN are offered. The Russian file tree uses Russian labels; product names and file extensions retain their spelling. The old `/kz` URL temporarily redirects to `/`; Kazakh is absent from the sitemap and language alternates. Dormant translation copy can remain for a future return.

**Homepage writing.** Follow the writing list at https://maxleiter.com/: three popular articles ranked by saved lifetime page views, followed by three recent articles excluding those already shown. Limit both groups to published blog articles available in the selected language; specialist reports remain in their own section. Use small lowercase monospaced group labels, 17px regular-weight titles, and one 12px metadata line below each title with the localized publication date, reading time, and views. Metadata wraps naturally on phones. The full row is a link; hover changes title color. Use faint dividers and no per-article arrows, covers, rubrics, excerpts, or share controls. Finish with an All articles link. Unknown counts are omitted, and unavailable ranking data leaves only the recent group. Homepages revalidate every 120 seconds. Count visible article visits through the shared article layout, once per mounted article; development and localhost visits do not increment public views. Views count visits, not unique readers.

**Charts.** Every chart begins with the question or conclusion it helps answer. State the metric, unit, time period, and comparison basis. Use a zero baseline for bars unless a clearly disclosed analytical reason requires otherwise. Sort categorical bars by the value being compared. Prefer horizontal bars for long category names and direct labels when they remove the need for a legend.

Tooltips are supplementary. A reader must understand the main result without hovering. On desktop, the tooltip must activate over the complete mark and label hit area. On touch devices, it must open by tap, remain within the viewport, and be dismissible. Keyboard users must be able to reach the same values. Never encode a crucial distinction by color alone.

Use one highlighted series and neutral context by default. Avoid 3D effects, decorative gradients, truncated units, unexplained dual axes, and dense dashboard chrome. Add a short source and methodology note below the figure. For percentages, state the denominator. For calculated metrics, explain the formula in ordinary language.

**Tables.** Align text left and comparable numbers right. Use tabular numerals. Keep units in column headings or values, not in an unexplained footnote. On mobile, preserve the important identifier and metric; allow deliberate horizontal scrolling only when a compact alternative would hide meaning.

## Do's and Don'ts

- Do make every public page feel like it belongs to one personal site.
- Do write labels and explanations in the first person when they represent Almas's voice.
- Do retain social preview images in metadata even when the article itself is text-first.
- Do explain what a chart shows before asking the reader to interpret it.
- Do test public pages at 320, 768, 1024, and 1440 pixels.
- Do keep focus, contrast, touch, reduced-motion, and keyboard behavior intact.
- Don't reproduce media-site mastheads, category rails, membership banners, or newsroom language.
- Don't add a preview image merely to fill space.
- Don't place important values only inside a tooltip.
- Don't use long dashes as a default punctuation habit in public copy.
- Don't expose internal data systems, table names, endpoints, or collection infrastructure.
- Don't turn research into a wall of dashboard widgets. Each figure should advance the story.

**Reading surfaces, September 2026.** Article headers use the shared catalogue for publication dates and reading times; an existing English page keeps its English title when its catalogue translation is unavailable. Standalone research headers preserve original dates and data periods, include a lead, and estimate reading time from visible text (180 words/minute, explicitly approximate). Keep the main reading column left-aligned. Dense datasets can use the wider research column. Remove redundant nested padding on phones. Promotional notes use softly rounded, lightly tinted surfaces and a text action.

**Chart interaction.** Bar, column, line, Recharts and custom diagram tooltips share `ChartTooltipPortal`: Geist 13px/400, 12px muted title, tabular values, visible units, 6px corners, subtle theme-aware border/shadow, viewport clamping and Escape dismissal. Carry scoped chart palette variables through the portal. Preserve custom tooltip facts, series distinctions and source notes. Hover remains open while moving onto the tooltip. Support keyboard focus and touch selection. Column series need 24px hit areas and deliberate horizontal scrolling when they cannot fit. Custom diagrams explicitly opt into `ChartTooltipScope` with data attributes; never infer unseen numbers. The tenge comparison is an immediate two-path diagram, without scroll trapping.


## Reading surfaces and data — September 2026

The reading surface follows Max Leiter and Rauch: neutral paper, regular Geist, spacing between editorial sections. This does not imply achromatic data. The owner's correction explicitly rejects blanket removal of color, bars and heatmaps.

Use ResearchSection, ResearchNote, ResearchFact and ResearchFigure for editorial hierarchy. Findings remain prose, without emoji decoration or invented traffic-light verdicts. Choose metrics and charts for the question they answer; bars and progress indicators are not inherently undesirable. Task progress requires a real task and denominator; quantitative shares use data bars.

The primary data hue comes from 10b: #005ed9 in light mode and #2a82ff in dark mode. Use separate categorical colors for multiple series; teal/violet around a meaningful reference value for divergence. Label every scale. Preserve signs, direct numbers, sources, units, forecast dashes, zero baselines for bars and gaps for missing observations.

Heatmaps use explicit, documented domains. Comparable months share one domain; different units do not share a scale. Filtering and sorting must not silently renormalize colors. If saturation is capped (season index 200+, growth ratio 2+), say so and retain exact numbers. Table sparklines state their time span and scale. Color supports reading; it must not replace values or semantics.

Source evidence, decisions and implementation mapping are in [Data visualization research](docs/research/data-visualization-system.md). Prefer this researched system over older local comments that prescribe gray-only charts or arbitrarily colored statuses.


**Typography verification, 12 September 2026.** `--font-sans` resolves to the shared Geist body token, including chart captions. Reading headings use weight 400 and a continuous H1 → H2 → H3 hierarchy. H2–H6 use 1.35 line height; body text uses the responsive `--reading-body-size` token (17/18px). Table headers and cells use 13px with tabular numerals; captions use 12px. Strong emphasis is 500. Code remains monospaced. Do not replace source-image or diagram-coordinate typography with blanket font-size overrides. The [typography audit](docs/research/typography-audit.md) records page coverage and limits.


**Supporting zones and directional icons.** Methodology and sources are unboxed, transparent and aligned with the reading column. Offers and explicitly grouped research summaries use 14px corners, 24px padding (20px × 18px on phones), and a low-chroma surface: #f5f7fa in light mode, #101419 in dark mode. Offers have 44px actions with 10px corners. Use spacing rather than decorative horizontal rules throughout reading pages, headers, offers, comments and the footer. Data-table rules still serve row alignment. Disclosure rows have no hover tiles; use Iconly Light chevrons with color and 180-degree rotation. Directional Iconly arrows translate 2px along their direction on hover and keyboard focus, respecting reduced motion. Mathematical/textual arrows retain their meaning.

**Reader participation.** A single bottom action row and comment section appears on every article, research report and text-based tool/guide. Only views appear in the top metadata. Reactions are bare Iconly Light icons and counts: no pill, circle, border or hover background, with neutral light/dark hover feedback and an invisible 44px touch target. The comment sign-in hint uses #f6f7f9 in light mode and #15181c in dark mode, with 12px corners; inputs and submit controls are also softly rounded. Likes and comments require sign-in with return to the same material and language. Sharing is available to guests. Preserve published storage keys; distinguish nested guides; share a clean public URL for the current material and language.

**Share menu.** Every glyph, including channel brands, comes from Iconly Light. Use Geist 14/400, 44px items, 8px item corners inside 6px padding and a 14px menu radius. Hover/focus use neutral site tokens; no blue action states or internal separator. Preserve chart data colors independently of interface hover colors.

**Research summaries.** Use ResearchSummary for an explicitly titled group of related facts, such as the study snapshot and first shortlist in the top-30 report. Reuse the muted light/dark offer surface, with 24px padding, 14px corners and a regular 18px heading. Within a group, fact rows have 10px vertical padding and no additional flow margin. Groups are separated by 24px; the next editorial section keeps the larger section interval. Sources and methodology remain transparent. Do not apply prose-flow spacing between consecutive fact rows.

The same treatment applies to all `.research-facts` groups and compact `.research-query-list` rankings across RU/EN reading pages. When a fact group sits inside ResearchSummary, its inner container is transparent with zero padding and margin: one surface per group. Legacy numerical summaries should use ResearchFact rows rather than independent label/value stacks. Keep chart canvases, tooltip details, source lists and article metadata outside this treatment.

**Authentication and footer.** Public sign-in uses PersonalShell in both languages, with a regular Geist heading, a return link to the material, labelled email input and 44px controls with 10px corners. No masthead, outer form frame or decorative divider. Confirmation uses the muted comment surface. The footer contains only copyright, legal identity, email and legal links: regular Geist 12px, aligned columns on desktop and stacked on phones. Language selection uses text contrast and aria-current, without underlines.

**Tooltip content.** Reading charts must not disable tooltip content with a null-rendering slot. Use the default formatted values or ChartTooltipContent for custom source notes. The shared portal stays hidden when its rendered content is empty, preventing empty floating squares. Custom slot content inherits the same Geist type and single surface; source caveats remain present.
