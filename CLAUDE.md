# CLAUDE.md — kasymzhanov.com

## Project Overview

**kasymzhanov.com** — личный сайт Алмаса Касымжанова. Лендинг + блог + набор аналитических инструментов и reports для первого потока курса по аналитике маркетплейсов (Stream 1, 2025–2026).

**Контент:**
- 17 опубликованных reports (`/reports/<slug>`): ниши Kaspi/WB, unit economics, trend hunting, creative hunting, brand analysis
- 3 интерактивных tools (`/tools/`): **WB Niche Analyzer** (CSV → анализ), **MPStats API Гайд**, **AI для селлеров (Занятие 5)**
- Блог (Velite) + deep-dive `liqbeauty-likbez` (косметика)

**Stack:** Next.js 15 (App Router) + Velite (mdx blog) + Supabase + Vercel.

**Primary language of UI content: Russian.**

## Quick Reference Commands

```bash
npm run dev          # Start dev server (localhost:3000)
npm run build        # Production build
npm run lint         # ESLint
```

## Project Structure

- `app/` — Next.js App Router pages (landing, reports, tools, blog, analytics, api, contacts)
- `app/reports/<slug>/page.tsx` — 17 аналитических отчётов (hardcoded JSX content)
- `app/tools/<slug>/page.tsx` — 3 интерактивных инструмента
- `content/blog/` — mdx-блог через Velite
- `components/` — общие React-компоненты
- `lib/` — утилиты
- `data/` — вспомогательные данные (CSV etc.)
- `supabase/` — миграции Supabase
- `ZBODY-Enterprise-Report-Final.md` — развёрнутый enterprise-отчёт по бренду ZBODY

## Связь с Stream 2 курса

Stream 1 материалы импортируются в AlmasHQ vault как outputs/reports/akasymzhanov/ для переиспользования в Stream 2 ([[wiki/teaching/courses/stream-2-program]]).

Инструменты Stream 1 эволюционируют в модули Stream 2:
- `/tools/mpstats-api` → **Модуль 2** (расширенный: MPStats API → Claude Code → AI-агенты)
- `/tools/ai-seller-guide` (Занятие 5) → **Модуль 4** (Своя AI-база)

## AlmasHQ integration

This project is linked to [AlmasHQ](C:/Users/Almas/Documents/AlmasHQ/) — Almas's LLM Wiki / second brain following Karpathy's pattern. When the user says **«сохрани в AlmasHQ»** / **«save chat»** / **«сохраняй»**, save the full session transcript there.

### How to save

Write a single file to `C:/Users/Almas/Documents/AlmasHQ/raw/chats/YYYY-MM-DD-akasymzhanov-<topic-slug>.md` with:

```yaml
---
date: YYYY-MM-DD
platform: claude-code
project: kasymzhanov.com
domain: teaching
topic: "Одна фраза о чём был диалог"
tags: [akasymzhanov-com, inbox, <other-relevant: report, tool, blog, stream-1, stream-2>]
status: inbox
---

# <Topic>

## Context
2-3 предложения: что делали и зачем.

## Key Decisions
Ключевые решения.

## Artifacts
Файлы, API endpoints, git commits.

## Open Questions
Нерешённое.

## Action Items
- [ ] TODO

## Full Transcript
<полный диалог>
```

### Domain routing

First tag always `#akasymzhanov-com`. Primary `domain:`:
- `teaching` — если работа связана с курсом Stream 1/Stream 2 (dominant случай для этого проекта)
- `marketplace-analytics` — если работа про новый analytical report / контент блога про ниши
- `seo-content` — если про SEO, контент-стратегию, Instagram/Reels планирование
- `design-engineering` — если про редизайн сайта, UI-компоненты
- `tools` — если глубокое техническое исследование нового инструмента для сайта

### Security — MANDATORY redaction

Replace with `[REDACTED]`:
- Supabase keys (anon, service_role)
- Anthropic / OpenAI API keys
- Vercel tokens
- Sanity tokens если появятся
- Client contact info клиентов курса (емейлы, телефоны)

### What NOT to do

- **Do not** `git commit` in AlmasHQ vault — that's done by Claude running in AlmasHQ
- **Do not** edit files in AlmasHQ other than creating in `raw/chats/`
- **Do not** run INGEST — that's an AlmasHQ-side operation
- **Do not** read `AlmasHQ/.env` or plugin data.json files
