# Обратная связь

Цель: собирать замечания в одну таблицу и разбирать их без бэкенда.

## Поток

1. Пользователь на home нажимает **«Обратная связь»**.
2. Открывается **Google Form** (`FEEDBACK_FORM_URL` в `src/feedback.ts`).
3. Ответы падают в связанную **Google Sheet** (Ответы → таблица).
4. Раз в неделю triage: дубликаты → приоритет → при необходимости
   [GitHub Issue](https://github.com/teaka-23/ashtangaApps/issues/new?template=feedback.yml).

## Форма

Актуальная форма уже создана и прописана в `FEEDBACK_FORM_URL`.

Поля сейчас:

| Поле | Тип |
|------|-----|
| Тип | Один из списка |
| где | Один из списка |
| Что не так | Абзац |

Ответы смотрите во вкладке **«Ответы»** формы / в связанной таблице Sheets.

(Опционально позже) Добавьте вопрос «Технический контекст» (текст-строка) →
⋮ → «Получить ссылку для предзаполнения» → цифры `entry.XXXXXXXX`
в `FEEDBACK_FORM_ENTRY_CONTEXT` — приложение подставит platform / screen / asana.

## Реестр и triage

Источник истины для анализа — **таблица Forms**.  
GitHub Issues — только то, что уходит в работу (labels: `feedback`, `needs-triage`).

Иллюстрации: строка в таблице → issue с `illustration` → править `poses.ts`
только в текущем ревью; в `docs/illustration-review.md` — после «ок» владельца.

## Код

- `src/feedback.ts` — URL формы, предзаполнение контекста, openLink
- `src/components/FeedbackButton.tsx` — тихая кнопка на home
