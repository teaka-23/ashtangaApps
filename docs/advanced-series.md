# Третья серия (Advanced A, Sthira Bhaga)

Статус: **каркас и данные готовы, иллюстрации — в работе (пакетами)**.

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
- Асаны без иллюстраций помечены `illustrationPending: true`: в каталоге,
  практике и шторке показывается нейтральная плашка «Иллюстрация готовится»,
  а не чужая фигура. Тесты это учитывают.

## Статус иллюстраций

| Готово | Осталось |
|---|---|
| 1 — `vasisthasana` (боковой упор, взгляд на поднятую кисть; `vinyasa 8`, дришти «Вверх») | 35 |

### Пакет 1 (в работе)

1. ✅ `vasisthasana`
2. ⬜ `vishvamitrasana`
3. ⬜ `kasyapasana`
4. ⬜ `chakorasana`
5. ⬜ `bhairavasana`

## Что осталось

1. **Иллюстрации** — 36 кадров, пакетами по 5 (порядок — как в таблице).
   После каждого пакета: `npm run illustrations`, `audit`/`poses`, визуальная
   проверка, снятие флага `illustrationPending` у готовых.
2. **Виньясы** — в данных не проставлены (в источниках расходятся); уточнить
   по печатному источнику владельца и внести `vinyasa` + `drishti`.
3. **Приёмка** — сверить состав и порядок с Poster/книгой владельца.

## Приоритет иллюстраций (первый пакет)

1. `vasisthasana` — боковой упор, базовая для серии.
2. `vishvamitrasana` — самый узнаваемый силуэт.
3. `kasyapasana` — стопа за головой, лёжа.
4. `chakorasana` — баланс на руках со стопой за головой.
5. `bhairavasana` — боковой упор на предплечье.
