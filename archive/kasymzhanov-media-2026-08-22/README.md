# Kasymzhanov Media homepage snapshot

Снимок медийной версии главной страницы kasymzhanov.com до перехода к личному блогу.

- Дата: 2026-08-22
- Базовый commit: `2c6fb41d6bfd68e69b54a91ff191e2b04a1241b1`
- Ветка на момент снимка: `main`
- Статус: локальный архив, не подключён к Next.js и не создаёт публичный маршрут

## Что сохранено

- `publication-home.snapshot.tsx`: полный исходник медийной главной на момент снимка.
- `media-home.patch`: точные локальные изменения её зависимостей относительно базового commit.
- `app-page.ru.snapshot.tsx` и `app-page.en.snapshot.tsx`: входные страницы RU/EN с медийными metadata.
- `manifest.json`: контрольные суммы исходных файлов.

Основные зависимости:

- `components/articles.tsx`: каталог материалов и карточки;
- `components/canon/site-chrome.tsx`: общий header и footer;
- `components/canon/mobile-menu.tsx`: мобильная навигация;
- `app/globals.css`: общие токены, типографика и темы;
- `lib/i18n.ts`: локализация.

Изображения статей и отчётов остаются в `public/blog` и `public/reports`. Сам snapshot сохраняет дизайн и код, но не дублирует тяжёлые ассеты.

## Как восстановить в этом репозитории

Безопаснее всего работать в отдельном worktree:

```powershell
git worktree add C:\Projects\akasymzhanov-media-template 2c6fb41d6bfd68e69b54a91ff191e2b04a1241b1
Set-Location C:\Projects\akasymzhanov-media-template
git apply C:\Projects\akasymzhanov.com\archive\kasymzhanov-media-2026-08-22\media-home.patch
```

После этого:

1. Скопировать `publication-home.snapshot.tsx` в `components/publication-home.tsx`.
2. Использовать нужный `app-page.*.snapshot.tsx` как `app/page.tsx` или `app/en/page.tsx`.
3. Заменить каталог статей, тексты, изображения и брендинг на клиентские.
4. Запустить TypeScript-проверку и production build.

## Что можно переиспользовать в клиентском проекте

- трёхколоночную редакционную сетку;
- левый тематический rail;
- главный материал и боковую подборку;
- блок подписки;
- категории после первого экрана;
- RU/EN;
- desktop/mobile header;
- карточки материалов и общую типографику.

Этот архив нельзя автоматически смешивать с будущей личной главной. Его нужно разворачивать отдельно как самостоятельный медийный шаблон.

