# Changelog

## 2026-11-12 (Telegram + VK)

- Практика/Сурьи во VK: плотнее сетка (`slice`), компактнее таймер, safe-area insets
- Слой `src/platform`: детект telegram | vk | web; единый init/storage/haptic/back
- `@vkontakte/vk-bridge`: Init, тема, Storage, Taptic, SetLocation/ChangeFragment
- Прогресс локален на платформе (без sync TG↔VK)
- ADR-0006 dual-platform; ADR-0001 → superseded
- VK Mini App: https://vk.com/app54892947 (app id 54892947)
- Docs: F-16 уточнён (заметка Сурий); tech-debt TD-5/TD-8 под dual-platform

## 2026-11-12 (UI/UX polish)

- Справочник: убрана покадровая навигация; в шторке — общая схема виньяс
- Правило: модель «схема виньяс» не менять без явного подтверждения
- Home: tap по карточке серии → каталог; одна CTA «Начать практику»
- Catalog: убран текстовый «← К сериям»; подзаголовок в 2 строки; короткие chips (Сурья А / Основная / Финиш)
- Секция intermediate → «Основная часть»
- Список асан: санскрит + русское имя; modern — точка вместо строки
- Practice: только «Выйти» (прогресс сохраняется); темп/звук в «Настройки»
- Practice мультикадр: общий план последовательности + BreathTimer; длинная заметка Сурий скрыта
- Сурьи A/B: `breaths: 5` + BreathTimer
- Перерисованы 10 intermediate-фигур (pasasana…gomukhasana)

## 2026-11-12 (вторая серия)

- Выбор серии на `#/`: Первая (Йога Чикитса) / Вторая (Нади Шодхана)
- Intermediate: opening (Сурьи + стоя) + 37 уникальных асан + finishing
- Роуты `#/series/:seriesId/...`; legacy primary `#/asana`, `#/practice` сохранены
- Прогресс практики отдельно на серию (`ashtanga.practice.progress.<seriesId>`)
- SVG-позы и i18n для промежуточных асан; `modernAddition` для A/B/C/D вариантов
- ADR-0005: multi-series (реестр, роутинг, прогресс, int-клоны)
- Переключатель RU/EN временно скрыт (UI только ru; en-строки сохранены)
- Пояснения серий: Йога Чикитса / Нади Шодхана

## 2026-11-12

### Практика

- Режим практики + BreathTimer + сохранение прогресса
- Иллюстрация: общий план асаны (не покадровый клик); для мультикадра — нумерованная сетка
- Один экран без вертикального скролла; заметка асаны на экране
- Темп дыхания (медленно / норма / быстро) и звук вдох/выдох; настройки в `localStorage`
- «Завершить» / «Выйти» в шапке практики

### Каталог / UX

- Шторка: один кадр + навигация кадров (вместо сетки 3 колонки)
- Короткие `aria-label` у карточек; декоративные части `aria-hidden`
- Бейдж виньяс не перекрывает текст
- Скрыта кнопка «Копировать ссылку»

### Иллюстрации

- Рендер: дальняя/ближняя сторона, цвет рук vs ног, маркеры кисти/стопы
- Перерисованы: Адхо / Чатуранга / Урдхва Мукха (Сурьи), Marichi A–D, Navasana,
  Bhujapidasana, Kurma / Supta Kurma, Garbha / Kukkuta, Setu, Urdhva Dhanurasana,
  Sarvangasana, Halasana, Karnapidasana, Sirsasana, Uttana Padasana, Supta Padangusthasana
- Общий план: авто-ряды (до 3–4 фигур в ряд)

### Контент / i18n / навигация

- Yoga Mala как источник; `modernAddition`; ru/en
- Hash-роутинг асан, секций, практики

### Тесты / инфра

- Vitest: routing, progress, i18n, poses, breath settings
- Playwright e2e smoke (`npm run test:e2e`)
- Реестр TD-1…TD-10 закрыт (`docs/tech-debt.md`)
