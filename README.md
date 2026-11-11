# Аштанга-йога — Первая серия

Telegram Mini App для практикующих аштанга-йогу: последовательность асан
первой серии (Йога Чикитса) с названиями на санскрите и русском,
схематичными SVG-иллюстрациями, виньясами и дришти.

## Стек

React 19 + Vite + TypeScript. Полностью статическое приложение, без бэкенда.

## Деплой

GitHub Actions (`.github/workflows/deploy.yml`) собирает и публикует на
GitHub Pages при пуше в `main`: https://teaka-23.github.io/ashtangaApps/

## Разработка

```bash
npm install
npm run dev     # http://localhost:5173
npm run build   # прод-сборка в dist/
```

## Структура

- `src/data/primarySeries.ts` — последовательность первой серии (61 позиция)
- `src/data/poses.ts` — координаты SVG-фигурок для каждой асаны
- `src/components/AsanaFigure.tsx` — рендер иллюстраций
- `src/telegram.ts` — интеграция Telegram WebApp (тема, expand)

## Документация

- [ADR](docs/adr/) — архитектурные решения (платформа, стек, иллюстрации, данные)
- [Технический долг](docs/tech-debt.md) — реестр с приоритетами
