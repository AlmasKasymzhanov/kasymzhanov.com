# Проверка типографики — 12 сентября 2026

Проверены 48 публичных адресов статей, исследований и руководств в локальном Chrome при ширине 1440px. Это проверка вычисленных стилей всех заголовков и текстовых элементов в области чтения, семейства шрифта в абзацах/таблицах/SVG, насыщенности выше 500 и переполнения страницы. Проверены также 5 представительных страниц при ширине 390px.

## Исправленные причины

| Причина | Исправление |
| --- | --- |
| Markdown и локальные заголовки использовали 600–700 | Единый Geist 400; смысловые выделения 500 |
| Старые отчёты задавали Inter/system-ui и несуществующие переменные | Общие токены Geist и Menlo |
| Tailwind font-sans подменял Geist системным шрифтом | Общий токен --font-sans |
| Мелкие подписи HTML и локальные размеры таблиц | Подписи 12px, таблицы 13px, табличные цифры |
| Основной текст отчётов расходился по размеру | Адаптивный токен 17/18px для стилей основного текста |
| Подпись DataTable наследовала размер абзаца | Явная роль chart-caption, 12px |
| В девяти отчётах пропускался H2 | Заголовки разделов и вопросов приведены к последовательной иерархии |
| В RU/EN статье о брендах блогеров и Area фитнеса оставался цвет текста | Роли палитры данных: фиолетовый/бирюзовый и основной синий |

## Результат

На всех 48 адресах: вес заголовков 400, без пропусков уровней; в проверенной области нет текстовых выделений выше 500 и постороннего семейства шрифта. Переполнения страницы по горизонтали нет. Мобильные проверки также проходят. Широкие таблицы сохраняют внутреннюю прокрутку.

TypeScript, check-chart-encoding, check-reading-charts и git diff --check проходят. Исходные данные не менялись.

Визуальная проверка скриншотами проведена на представительных страницах, а не на каждом экране каждой статьи. DOM-проверка всех адресов не означает повторный ручной тест каждого интерактивного состояния каждого графика. Геометрия SVG, иллюстрации, скриншоты источников и OG-карточки не масштабировались общим правилом.

## Адреса

- /blog/freedom-market
- /blog/nvidia-kazakhstan
- /blog/russia-fuel-jerrycan
- /blog/wb-dual-use
- /blog/why-blogger-brands-fail
- /blog/wildberries-kazakhstan
- /en/blog/kaspi-mcp
- /en/blog/freedom-market
- /en/blog/russia-fuel-jerrycan
- /en/blog/nvidia-kazakhstan
- /en/blog/wb-dual-use
- /reports/aliqe-analysis
- /reports/beauty-strategy
- /reports/bg-optic
- /reports/cosmetics-autumn-2026
- /reports/creative-hunting-guide
- /reports/foot-stretcher-analysis
- /reports/hinoko-report
- /reports/kaspi-3-niches
- /reports/kaspi-camping
- /reports/kaspi-brand-portfolio
- /reports/kaspi-clothing
- /reports/kaspi-cosmetics
- /reports/kaspi-electronics-2026
- /reports/kaspi-cosmetics-qa
- /reports/kaspi-fitness
- /reports/kaspi-haircare
- /reports/kaspi-preorder-niches
- /reports/kaspi-preorder-guide
- /reports/kaspi-top-30-june-2026
- /reports/kaspi-product-selection
- /reports/optics-guide
- /reports/towel-warmer-analysis
- /reports/trend-hunting
- /reports/unit-economics
- /reports/wb-cosmetics-autumn-2026
- /reports/wb-cosmetics
- /reports/wb-fitness-economics
- /reports/zbody
- /web-analyzer/guide
- /tools/mpstats-api
- /tools/wb-analyzer
- /tools/wb-analyzer/guide
- /clients/elki
- /blog/kaspi-mcp
- /en/blog/why-blogger-brands-fail
- /tools/ai-seller-guide
- /web-analyzer

## Мобильные проверки

- /blog/wildberries-kazakhstan
- /reports/wb-cosmetics-autumn-2026
- /reports/kaspi-top-30-june-2026
- /reports/kaspi-fitness
- /blog/kaspi-mcp

Машиночитаемые результаты: .cache/typography-browser-audit.json. Правила цвета и шкал: [исследование визуализаций](data-visualization-system.md).
