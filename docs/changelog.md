# Changelog

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
