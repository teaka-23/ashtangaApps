# Обратная связь

Цель: быстро собирать неудобства и вести реестр для улучшений — без бэкенда.

## Поток

1. Пользователь в приложении нажимает **«Обратная связь»** на home.
2. Копируется шаблон + открывается личный чат [`@d_teaka`](https://t.me/d_teaka).
3. Пользователь вставляет шаблон, дописывает суть и отправляет.
4. Владелец заносит запись в **GitHub Issues** по шаблону
   [Замечание пользователя](https://github.com/teaka-23/ashtangaApps/issues/new?template=feedback.yml)
   (labels: `feedback`, `needs-triage`).

## Как реально получать сообщения

Сейчас замечания идут в личку [`@d_teaka`](https://t.me/d_teaka)
(`FEEDBACK_CHAT_USERNAME` в `src/feedback.ts`).

Реестр для анализа и приоритетов — **GitHub Issues**, не чат.
Позже при необходимости: Google Form → таблица или forwarder на бота Mini App.

## Реестр и triage

| Статус label | Смысл |
|--------------|--------|
| `needs-triage` | Только что занесено |
| `feedback` | Из пользовательской обратной связи |
| убрать `needs-triage`, добавить область | `ux` / `bug` / `content` / `illustration` |

Раз в неделю: дубликаты → приоритет P0–P3 → в работу или закрыть `wontfix`.

Иллюстрации: пользовательский issue с `illustration` → править `poses.ts` только в текущем ревью; в `docs/illustration-review.md` переносить после «ок» владельца.

## Код

- `src/feedback.ts` — шаблон, clipboard, open bot
- `src/components/FeedbackButton.tsx` — UI
