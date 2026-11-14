# Аналитика → Google Sheets (одна строка на visitor)

Цель: без бэкенда и **без user id** платформы видеть уникальных пользователей
и агрегировать их время (приложение / практика, Telegram|VK|web).

## Модель

- `visitorId` — анонимный UUID в `localStorage` (стабилен, пока не очистят хранилище).
- TG и VK / разные устройства = **разные** visitor (хранилища не общие).
- Каждая завершённая сессия (≥1 с) шлёт дельту на Apps Script.
- Скрипт **не дописывает историю**: ищет строку по `visitorId` и **накапливает** счётчики.

Пока `VITE_ANALYTICS_WEBHOOK_URL` пуст — аналитика выключена.

## Разовая настройка

### 1. Таблица

Лист **`Users`**, заголовки в строке 1:

| A | B | C | D | E | F | G | H | I | J | K |
|---|---|---|---|---|---|---|---|---|---|---|
| visitorId | firstSeen | lastSeen | lastPlatform | platforms | appSec | practiceSec | appOpens | practiceOpens | lastScreen | lastSeries |

### 2. Apps Script

**Расширения → Apps Script** — вставьте код из
[`analytics-apps-script.js`](./analytics-apps-script.js)
(нужны и `doGet`, и `doPost` — браузерный POST у Google часто даёт 405).

**Deploy → New deployment → Web app**:

- Execute as: **Me**
- Who has access: **Anyone**
- URL `https://script.google.com/macros/s/…/exec`

После правки кода: **Deploy → Manage deployments → ✏️ → New version → Deploy**
(иначе живёт старая версия без `doGet`).

### 3. Подключить

Локально в `.env`:

```bash
VITE_ANALYTICS_WEBHOOK_URL=https://script.google.com/macros/s/XXXX/exec
```

Прод: GitHub → Settings → Secrets → Actions →
`VITE_ANALYTICS_WEBHOOK_URL` (уже пробрасывается в `deploy.yml`).

### 4. Проверка

1. Откройте приложение с заданным URL, ~30 с, сверните/закройте.
2. В `Users` — одна новая строка: `appSec` ≈ 30, `appOpens` ≥ 1, `lastPlatform`.
3. Практика → выход: та же строка, выросли `practiceSec` / `practiceOpens`.
4. Повторный заход — **та же** `visitorId`, счётчики только растут.

## Поля строки

| Поле | Смысл |
|------|--------|
| visitorId | анонимный ключ уникальности |
| firstSeen / lastSeen | первый и последний контакт |
| lastPlatform | telegram \| vk \| web в последний раз |
| platforms | уникальные платформы через запятую |
| appSec / practiceSec | накопленные секунды |
| appOpens / practiceOpens | число завершённых сегментов сессий |
| lastScreen / lastSeries | последний hash / серия практики |

`practiceSec` ⊆ времени в приложении по смыслу (практика внутри `app`), но
считается отдельно — удобно смотреть «сколько реально практиковали».

## Код

- `src/platform/identity.ts` — `getVisitorId()`
- `src/analytics/session.ts` — сессии + GET `?payload=`
- `src/App.tsx` / `PracticeView.tsx` — старт `app` / `practice`
