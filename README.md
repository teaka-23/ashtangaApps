# Аштанга-йога — Mini App

Mini App для практикующих аштанга-йогу: выбор серии, справочник асан
и режим практики с таймером дыхания. Работает в **Telegram** и **VK**.
Источник контента: **Yoga Mala**.

- **Первая серия** — Йога Чикитса (61 асана)
- **Вторая серия** — Нади Шодхана (opening + промежуточные + finishing)

## Стек

React 19 + Vite + TypeScript. Полностью статическое приложение, без бэкенда.
Платформа: `src/platform` (Telegram WebApp / `@vkontakte/vk-bridge` / web).

## Деплой

GitHub Actions (`.github/workflows/deploy.yml`) собирает и публикует на
GitHub Pages при пуше в `main`: https://teaka-23.github.io/ashtangaApps/

Один URL используется и для Telegram, и для VK.

## Telegram Mini App

https://t.me/ashtanga_yoga_by_teaka_bot/ashtaga_by_teaka

## VK Mini App

https://vk.com/app54892947

App ID: `54892947`. URL приложения в кабинете: `https://teaka-23.github.io/ashtangaApps/`

Прогресс практики в VK и Telegram **не синхронизируется** (нет бэкенда).

### Чеклист / отладка

1. В [кабинете VK](https://dev.vk.com/ru/mini-apps/getting-started) указан GitHub Pages URL выше.
2. Включены нужные платформы (мобильный клиент / m.vk / vk.com).
3. Открытие из VK даёт `vk_app_id` / `vk_platform` → `platform` делает `VKWebAppInit`.
4. Локально: `@vkontakte/vk-tunnel` или запуск с launch params.

## Разработка

```bash
npm install
npm run dev          # http://localhost:5173  (host = web)
npm run build        # прод-сборка в dist/
npm test             # Vitest (unit)
npm run test:e2e:install   # один раз: Chromium для Playwright
npm run test:e2e     # e2e smoke
```

## Возможности

- Выбор серии; каталог по секциям, шторка асаны (UI на русском)
- Практика: прогресс на серию, BreathTimer, темп и звук дыхания
- В практике — общий план позы (без кликов по кадрам), один экран без скролла
- Hash-роуты: `#/`, `#/series/:id`, `#/series/:id/asana/:id`, `#/series/:id/practice…`

## Структура

- `src/data/series.ts` — реестр серий
- `src/data/primarySeries.ts` / `intermediateSeries.ts` — состав серий
- `src/data/poses.ts` — SVG-фигурки (сегменты рук/ног, торс, дришти; мультикадр)
- `src/components/AsanaFigure.tsx` — рендер (превью / кадр / общий план)
- `src/practice/` — PracticeView, BreathTimer, прогресс, звук/темп
- `src/routing.ts` — hash-роутинг
- `src/i18n/` — ru/en
- `src/platform/` — Telegram / VK / web адаптеры
- `e2e/` — Playwright smoke

## Документация

- [Требования](docs/requirements.md)
- [Changelog](docs/changelog.md)
- [ADR](docs/adr/) — архитектурные решения (см. ADR-0006 dual-platform)
- [Технический долг](docs/tech-debt.md)
