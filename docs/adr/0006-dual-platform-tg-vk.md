# ADR-0006: Dual platform — Telegram + VK Mini Apps

- Статус: принято
- Дата: 2026-11-12
- Связано: supersedes частично [ADR-0001](0001-telegram-mini-app.md)

## Контекст

Приложение уже работает как Telegram Mini App. Telegram не всегда доступен
пользователям; нужна та же функциональность во **VK Mini Apps**, без дублирования
UI и без бэкенда (ADR-0004).

## Решение

Один статический SPA (GitHub Pages) подключается и к Telegram Bot, и к VK Mini App.

Слой `src/platform/`:

- детект хоста: `telegram` | `vk` | `web`;
- единый API: `initPlatform`, `storage*`, `haptic`, `showBackButton` / `hideBackButton`;
- адаптеры: Telegram WebApp, `@vkontakte/vk-bridge`, web (localStorage).

Тема по-прежнему через CSS-токены `--tg-*` (нейтральные имена; VK пишет в них
цвета из scheme/appearance).

Прогресс практики хранится **отдельно** на каждой платформе (TG CloudStorage /
VK Storage / localStorage). Синхронизация TG↔VK не делается.

## Последствия

Плюсы:

- Один деплой, один код продукта.
- Браузерный fallback сохранён для разработки и e2e.

Минусы:

- Прогресс не общий между Telegram и VK.
- VK BackButton ≠ Telegram; полагаемся на in-app «Выйти» / «←» + hash sync
  (`VKWebAppSetLocation` / `VKWebAppChangeFragment`).
- Регистрация Mini App в кабинете VK — ручной шаг владельца.
