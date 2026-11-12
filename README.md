# Аштанга-йога — Первая серия

Telegram Mini App для практикующих аштанга-йогу: справочник первой серии
(Йога Чикитса, 61 асана) и режим практики с таймером дыхания.
Источник контента: **Yoga Mala**.

## Стек

React 19 + Vite + TypeScript. Полностью статическое приложение, без бэкенда.

## Деплой

GitHub Actions (`.github/workflows/deploy.yml`) собирает и публикует на
GitHub Pages при пуше в `main`: https://teaka-23.github.io/ashtangaApps/

## Telegram Mini App

https://t.me/ashtanga_yoga_by_teaka_bot/ashtaga_by_teaka

## Разработка

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # прод-сборка в dist/
npm test             # Vitest (unit)
npm run test:e2e:install   # один раз: Chromium для Playwright
npm run test:e2e     # e2e smoke
```

## Возможности

- Каталог по секциям, шторка асаны, локаль ru/en
- Практика: прогресс, BreathTimer, темп и звук дыхания
- В практике — общий план позы (без кликов по кадрам), один экран без скролла
- Hash-роуты: `#/asana/:id`, `#/practice`, `#/practice/:id`, `#/practice/continue`

## Структура

- `src/data/primarySeries.ts` — серия: имена, виньясы, дыхания, дришти, заметки
- `src/data/poses.ts` — SVG-фигурки (сегменты рук/ног, торс, дришти; мультикадр)
- `src/components/AsanaFigure.tsx` — рендер (превью / кадр / общий план)
- `src/practice/` — PracticeView, BreathTimer, прогресс, звук/темп
- `src/routing.ts` — hash-роутинг
- `src/i18n/` — ru/en
- `src/telegram.ts` — тема, BackButton, haptics, CloudStorage
- `e2e/` — Playwright smoke

## Документация

- [Требования](docs/requirements.md)
- [Changelog](docs/changelog.md)
- [ADR](docs/adr/) — архитектурные решения
- [Технический долг](docs/tech-debt.md)
