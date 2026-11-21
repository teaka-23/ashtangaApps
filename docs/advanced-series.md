# Третья серия (Advanced A, Sthira Bhaga)

Статус: **36/36 иллюстраций нарисованы (первый проход); 7 принято владельцем,
29 ждут приёмки**.

Источник состава и порядка: список школы в преемственности KPJAYI
(ashtangayoga.info, Dr. Ronald Steiner) — 36 позиций. Сверять с печатным
источником владельца (постер/книга) перед приёмкой.

## Состав (36 асан)

| № | id | Санскрит | Русское название |
|---|----|----------|------------------|
| 1 | `vasisthasana` | Vasiṣṭhāsana | Поза Васиштхи |
| 2 | `vishvamitrasana` | Viśvāmitrāsana | Поза Вишвамитры |
| 3 | `kasyapasana` | Kaśyapāsana | Поза Кашьяпы |
| 4 | `chakorasana` | Cakorāsana | Поза чакоры |
| 5 | `bhairavasana` | Bhairavāsana | Поза Бхайравы |
| 6 | `skandasana` | Skandāsana | Поза Сканды |
| 7 | `durvasana` | Durvāsana | Поза Дурвасы |
| 8–10 | `urdhva-kukkutasana-a/b/c` | Ūrdhva Kukkuṭāsana A–C | Поза петуха вверх A–C |
| 11 | `galavasana` | Gālavāsana | Поза Галавы |
| 12–13 | `eka-pada-bakasana-a/b` | Eka Pāda Bakāsana A–B | Журавль на одной ноге A–B |
| 14–15 | `koundinyasana-a/b` | Kauṇḍinyāsana A–B | Поза Кундины A–B |
| 16–17 | `astavakrasana-a/b` | Aṣṭāvakrāsana A–B | Поза Аштавакры A–B |
| 18 | `purna-matsyendrasana` | Pūrṇa Matsyendrāsana | Полная поза Матсьендры |
| 19–21 | `viranchyasana-a1/a2/a3` | Virañcyāsana A1–A3 | Поза Виранчи A1–A3 |
| 22–24 | `viranchyasana-b1/b2/b3` | Virañcyāsana B1–B3 | Поза Виранчи B1–B3 |
| 25 | `dvi-pada-viparita-dandasana` | Dvi Pāda Viparīta Daṇḍāsana | Перевёрнутый посох на двух ногах |
| 26 | `eka-pada-viparita-dandasana` | Eka Pāda Viparīta Daṇḍāsana | Перевёрнутый посох на одной ноге |
| 27 | `viparita-salabhasana` | Viparīta Śalabhāsana | Перевёрнутая саранча |
| 28 | `ganda-bherundasana` | Gaṇḍa Bheruṇḍāsana | Поза Ганды Бхерунды |
| 29 | `hanumanasana` | Hanumānāsana | Поза Ханумана |
| 30 | `supta-trivikramasana` | Supta Trivikramāsana | Поза Тривикрамы лёжа |
| 31–32 | `digasana-a/b` | Digāsana A–B | Поза направлений A–B |
| 33 | `utthita-trivikramasana` | Utthita Trivikramāsana | Поза Тривикрамы стоя |
| 34 | `nata-rajasana` | Naṭarājāsana | Поза царя танцев |
| 35 | `raja-kapotasana` | Rāja Kapotāsana | Королевский голубь |
| 36 | `eka-pada-raja-kapotasana` | Eka Pāda Rāja Kapotāsana | Королевский голубь на одной ноге |

Открытие (Сурья A/B, стоячие) и финиш переиспользуются из первой серии
(клоны `adv-*`), поэтому у них уже есть иллюстрации.

## Что сделано

- `src/data/advancedSeries.ts`: 36 асан (санскрит, транскрипция, русское
  название, деванагари, описание, 5 дыханий), разделы, сборка серии.
- `SeriesId` расширен до `'advanced'`; реестр, роутинг (`#/series/advanced/…`),
  i18n («Третья серия», «Стхира Бхага — устойчивость и сила»), карточка на
  home с зелёным акцентом и превью-медальоном (Маюрасана).
- Все 36 асан подключены к иллюстрациям: `pose` в `advancedSeries.ts` и
  кадр в `cartoons.ts` (`advanced/01…36`). Механизм плашки
  `illustrationPending: true` сохранён на случай перерисовки: пока флаг
  стоит, каталог/практика/шторка показывают «Иллюстрация готовится», а не
  чужую фигуру.

## Статус иллюстраций

| Всего | Первый проход | Принято владельцем |
|---|---|---|
| 36 | 36 | 7 (`vasisthasana`, `vishvamitrasana`, `kasyapasana`, `chakorasana`, `urdhva-kukkutasana-a`, `durvasana`, `bhairavasana`) |

Контактный лист всех 29 новых кадров — `docs/advanced-drafts.png`
(сетка 6×5, подписи = имя файла в `illustrations/advanced/`).

Что уже точно и требует приёмки/правки:

- `urdhva-kukkutasana-b/c`, `galavasana`, `eka-pada-bakasana-a/b`,
  `koundinyasana-a/b`, `astavakrasana-a/b` — балансы на руках, читаются
  как «тело на ладонях», но у части поз вес тела и линия плеч требуют
  уточнения по вашим пометкам.
- `viranchyasana-a1…b3` — сидячая стопа за головой; сейчас бедро идёт
  вдоль корпуса, стопа у плеча. Проверить наклон корпуса (A3/B3) и
  положение рук (в намасте, без замка за спиной).
- `dvi-pada-viparita-dandasana`, `eka-pada-viparita-dandasana` — стойка
  на предплечьях с прогибом, стопа у головы.
- `purna-matsyendrasana`, `skandasana` — скрутка и наклон со стопой за
  головой: силуэты самые «спорные», жду пометок.
- `viparita-salabhasana`, `ganda-bherundasana` — упор на груди/подбородке.
- `hanumanasana`, `supta-trivikramasana`, `digasana-a/b`,
  `utthita-trivikramasana`, `nata-rajasana`, `raja-kapotasana`,
  `eka-pada-raja-kapotasana` — шпагат, лёжа и стоя со стопой за головой,
  прогибы с захватом стоп.

Все 36 уже подключены в приложении (`src/data/cartoons.ts` +
`pose`/`drishti` в `src/data/advancedSeries.ts`), плашек «готовится»
больше нет. Правки идут по вашим замечаниям из
`docs/owner-remarks-inbox.md`.

## Что осталось

1. **Приёмка иллюстраций** — 29 кадров первого прохода: пометки в
   `docs/owner-remarks-inbox.md` (поза → что не так), правлю партиями.
2. **Виньясы** — в данных не проставлены (в источниках расходятся); у
   `urdhva-kukkutasana-b/c`, `galavasana`, `durvasana` и остальных новых
   асан нет числа виньяс, у первых семи оно есть не у всех. Нужен ваш
   печатный источник, чтобы заполнить `vinyasa` без выдумывания.
3. **Сверка состава** — сверить 36 позиций и порядок с вашим постером/книгой.

