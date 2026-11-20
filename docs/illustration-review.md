# Ревью иллюстраций (Primary Series)

**Процесс:** правим одну асану → даём ссылку на позу в приложении → владелец говорит ок / не ок.
- `✅` прошло ревью (явное подтверждение в чате)
- `❌` не прошло (замечания ниже; правим снова)
- `🔄` в работе
- `⬜` ещё не смотрели

Общие уроки → `.cursor/rules/figure-quality-bar.mdc` (не дублировать одни и те же ошибки).

Перед приёмкой: `npm run illustrations:audit` и `npm run illustrations:poses`
(0 ERR). Список `NOTE` из второго отчёта — кадры, которые стоит смотреть
первыми. Пакет для внешней модели с image input (PNG в `/tmp`, в репозиторий
не идёт): `npm run illustrations:pack`. Вердикт модели — предфильтр, `✅` всё
равно ставит владелец.

Образцы: `docs/references/ashtanga-primary-series-cheat-sheet.jpg`,
`docs/references/ashtanga-finishing-nadi-shodhana.png`.

---

## Сводка

| Статус | Кол-во |
|--------|--------|
| ✅     | 0      |
| ❌     | 0      |
| 🔄     | 0      |
| ⬜     | 98     |

Итого 98 позиций (61 первая серия + 37 вторая, кадры 70–106). 2026-11-19 все
статусы обнулены: приёмка будет сплошной и глазной, поэтому ни одна асана не
считается принятой заранее. Заметки в таблицах — история правок (что и когда
менялось), а не подтверждение. Обход второй серии — ниже, в разделе
«Вторая серия (кадры 70–106)», в нём каждая асана со ссылкой в приложение.

---

## Сурья А

| # | id | Асана | Статус | Заметки |
|---|-----|-------|--------|---------|
| 1 | `surya-a` | Surya Namaskara A — Приветствие Солнцу А | ⬜ | 2026-11-14 полный аудит Primary+2nd: новичок + колено-шарнир; ждём ок. |

## Сурья Б

| # | id | Асана | Статус | Заметки |
|---|-----|-------|--------|---------|
| 2 | `surya-b` | Surya Namaskara B — Приветствие Солнцу Б | ⬜ | 2026-11-14 аппрув отменён владельцем на переработку (наследует А; утката и воины I пр./лев. под `thighs`/`inline`, поля сверху). |

## Стоя

| # | id | Асана | Статус | Заметки |
|---|-----|-------|--------|---------|
| 3 | `padangusthasana` | Padangusthasana | ⬜ | 2026-11-15 новый тип руки `toe` в figure.mjs — захват большого пальца ноги (указательный+средний+большой), шорты: короткий подол. 2026-11-19 починено после поломки в `a4d3f28`: руки снова от плеч (шли от таза, как третья нога), голова вынесена из контура торса. 2026-11-19 захват `toe` (щипок за большой палец, не митенка вокруг голеностопа) и разведённые локти — в профиле разведение читается изломом плечо→локоть→предплечье — ждём ок |
| 4 | `padahastasana` | Padahastasana | ⬜ | 2026-11-15 ладони под подошвами (не рядом), пальцы к пяткам. 2026-11-19 починено: торс с головой уехали к полу, фигура стояла с телом у стоп — торс снова растёт из таза, голова на уровне голеней. 2026-11-19 ладони `palm` + `fingers: -1` ушли под подошвы (были перед стопами) — ждём ок |
| 5 | `utthita-trikonasana-a` | Utthita Trikonasana A | ⬜ | аудит: А ок (грудь открыта) |
| 6 | `utthita-trikonasana-b` | Utthita Trikonasana B | ⬜ | было = копия Паривритты; сделано зеркало А |
| 7 | `parivrtta-trikonasana` | Parivrtta Trikonasana | ⬜ | скрутка отдельно от B |
| 8 | `utthita-parsvakonasana-a` | Utthita Parsvakonasana A | ⬜ | аудит: А ок |
| 9 | `utthita-parsvakonasana-b` | Utthita Parsvakonasana B | ⬜ | было скрутка≈паривритта; сделано зеркало А |
| 10 | `parivrtta-parsvakonasana` | Parivrtta Parsvakonasana | ⬜ | намасте за коленом — отдельно |
| 11 | `prasarita-padottanasana-a` | Prasarita Padottanasana A | ⬜ | |
| 12 | `prasarita-padottanasana-b` | Prasarita Padottanasana B | ⬜ | |
| 13 | `prasarita-padottanasana-c` | Prasarita Padottanasana C | ⬜ | |
| 14 | `prasarita-padottanasana-d` | Prasarita Padottanasana D | ⬜ | |
| 15 | `parsvottanasana` | Parsvottanasana | ⬜ | 2026-11-15 намасте за спиной (не у груди), локти назад. 2026-11-19 пересобрана по отчёту: узкий шаг, голова у передней голени, обе руки `prayer` за спиной — намасте читается бугром переднего локтя над линией спины — ждём ок |
| 16 | `utthita-hasta-padangusthasana` | Utthita Hasta Padangusthasana | ⬜ | 2026-11-15 добавлен третий кадр C (баланс на весу без рук); 2026-11-19 кадр C подключён в приложении (`cartoons.ts`) |
| 17 | `ardha-baddha-padmottanasana` | Ardha Baddha Padmottanasana | ⬜ | 2026-11-19 голова висит от плеча (шея крепилась к тазу и голова тонула в голени), полулотос вынесен вперёд за контур торса (колено `[132,110]` при кромке `x≈126`) — ждём ок |
| 18 | `utkatasana` | Utkatasana | ⬜ | |
| 19 | `virabhadrasana-a` | Virabhadrasana A | ⬜ | |
| 20 | `virabhadrasana-b` | Virabhadrasana B | ⬜ | |

## Сидя

| # | id | Асана | Статус | Заметки |
|---|-----|-------|--------|---------|
| 21 | `dandasana` | Dandasana | ⬜ | 2026-11-15: ок — шорты единый контур, underShorts, щека к полу |
| 22 | `paschimottanasana-a` | Paschimottanasana A | ⬜ | 2026-11-15: ок — торс до пояса, без лоскутов. 2026-11-19 захват `toe` на больших пальцах, локти согнуты, грудь приподнята — ждём ок |
| 23 | `paschimottanasana-b` | Paschimottanasana B | ⬜ | 2026-11-15 ладони `palm` обхватывают подошвы (не `hold`). 2026-11-19 `hold` ложится поверх подошв, лоб на голенях — ждём ок |
| 24 | `paschimottanasana-c` | Paschimottanasana C | ⬜ | 2026-11-15 руки сходятся в замок за стопами. 2026-11-19 замок — сдвоенная митенка за стопами, вытяжка до x≈188 — ждём ок |
| 24a | `paschimottanasana-d` | Paschimottanasana D | ⬜ | 2026-11-19: иллюстрация `29-paschimattanasana-d.svg` была нарисована, но асаны не было в серии — добавлена и подключена. 2026-11-19 кисть на дальнем запястье читается ступенькой (169→184), складка самая глубокая — ждём ок |
| 25 | `purvottanasana` | Purvottanasana | ⬜ | 2026-11-19 ладони `flat` за тазом (пальцы к себе, `fingers: 1`), корпус и ноги одной прямой ~30°, голова ниже линии плеч без длинной шеи — ждём ок |
| 26 | `ardha-baddha-padma-paschimottanasana` | Ardha Baddha Padma Paschimottanasana | ⬜ | |
| 27 | `trianga-mukhaikapada-paschimottanasana` | Trianga Mukhaikapada Paschimottanasana | ⬜ | |
| 28 | `janu-sirsasana-a` | Janu Sirsasana A | ⬜ | |
| 29 | `janu-sirsasana-b` | Janu Sirsasana B | ⬜ | 2026-11-15 ¾ как А; таз выше; пятка `tucked` под седалищем — ждём ок |
| 30 | `janu-sirsasana-c` | Janu Sirsasana C | ⬜ | |
| 31 | `marichyasana-a` | Marichyasana A | ⬜ | 2026-11-15 замок рук за спиной (сцепление). 2026-11-19 замок вынесен на кромку спины: кисти у `x≈80–86` при контуре `x≈84`, митенки выступают за силуэт на 6–8 px — ждём ок |
| 32 | `marichyasana-b` | Marichyasana B | ⬜ | то же + полулотос. 2026-11-19 связка та же (`[68,140] → [86,150]` и `[140,132] → [88,150]`), замок на кромке спины — ждём ок |
| 33 | `marichyasana-c` | Marichyasana C | ⬜ | 2026-11-15 рука за спиной сцеплена с передней на бедре. 2026-11-19 дальний локоть уходит за спину (`[56,122]` при контуре `x≈74`), кисти сводятся у таза (`[122,142]`), передний локоть снаружи бедра (`[148,108]`) — ждём ок |
| 34 | `marichyasana-d` | Marichyasana D | ⬜ | 2026-11-15 как C + полулотос. 2026-11-19 та же сцепка (локоть за спиной `[56,122]`, кисти у таза `[122,142]`), полулотос `lotus` на коврике — ждём ок |
| 35 | `navasana` | Navasana | ⬜ | 2026-11-19 подключён второй кадр B (`41-navasana-b` — подъём между подходами); ждём ок |
| 36 | `bhujapidasana` | Bhujapidasana | ⬜ | 2026-11-19 перерисована в ракурсе плаката (фронт сверху): спина куполом, голова свешена, крест голеней по центру, стопы в воздухе над ладонями — ждём ок |
| 37 | `kurmasana` | Kurmasana | ⬜ | 2026-11-15 руки под коленями, lean-торс+thigh/shin |
| 38 | `supta-kurmasana` | Supta Kurmasana | ⬜ | 2026-11-19 перерисована в ракурсе сверху («черепаха»): панцирь-спина, макушка из-за кромки, стопы крестом над теменем, руки в замке под крестцом — ждём ок |
| 39 | `garbha-pindasana` | Garbha Pindasana | ⬜ | 2026-11-15 колени врозь, руки к ушам |
| 40 | `kukkutasana` | Kukkutasana | ⬜ | 2026-11-15 лотос на руках, flat у пола |
| 41 | `baddha-konasana-a` | Baddha Konasana A | ⬜ | |
| 42 | `baddha-konasana-b` | Baddha Konasana B | ⬜ | |
| 43 | `upavishta-konasana` | Upavishta Konasana | ⬜ | |
| 44 | `supta-konasana` | Supta Konasana | ⬜ | 2026-11-15 профиль: спина на полу, ноги широко за головой, захват стоп — ждём ок |
| 45 | `supta-padangusthasana` | Supta Padangusthasana | ⬜ | |
| 46 | `ubhaya-padangusthasana` | Ubhaya Padangusthasana | ⬜ | 2026-11-15 седалище на полу (не лодка), V вверх, захват — ждём ок |
| 47 | `urdhva-mukha-paschimottanasana` | Urdhva Mukha Paschimottanasana | ⬜ | |
| 48 | `setu-bandhasana` | Setu Bandhasana | ⬜ | 2026-11-19 макушка на полу, короткая шея, крест рук на груди читается четырьмя концами — ждём ок |

## Прогибы

| # | id | Асана | Статус | Заметки |
|---|-----|-------|--------|---------|
| 49 | `urdhva-dhanurasana` | Urdhva Dhanurasana | ⬜ | 2026-11-15 шея: голова ближе к плечам, короткий толстый стык — ждём ок |

## Финиш

| # | id | Асана | Статус | Заметки |
|---|-----|-------|--------|---------|
| 50 | `salamba-sarvangasana` | Salamba Sarvangasana | ⬜ | 2026-11-19 ракурс сзади: локти — две опоры на полу, кисти под лопатками, макушка на полу — ждём ок |
| 51 | `halasana` | Halasana | ⬜ | |
| 52 | `karnapidasana` | Karnapidasana | ⬜ | |
| 53 | `urdhva-padmasana` | Urdhva Padmasana | ⬜ | |
| 54 | `pindasana` | Pindasana | ⬜ | 2026-11-15 голова с пола на уровень плеч (баланс на плечах). 2026-11-19 голова опущена к лотосу (эллипс `cy 146`, `ry 11.2` → низ 157.2, ~11 px до настила), низ фигуры — плечи на полу (контур торса доходит до y=168), руки `hold` на кромках колен — ждём ок |
| 55 | `matsyasana` | Matsyasana | ⬜ | 2026-11-19 шея короткая (ось 8.5 px, толщина 5.4), пришита к арке без щели, макушка на полу — ждём ок |
| 56 | `uttana-padasana` | Uttana Padasana | ⬜ | |
| 57 | `sirsasana` | Sirsasana | ⬜ | 2026-11-19 предплечья лежат на полу от локтей-опор к голове, кисти прижаты к кромкам головы (пальцы за затылок), макушка между кистями — ждём ок |
| 58 | `baddha-padmasana` | Baddha Padmasana | ⬜ | |
| 59 | `padmasana` | Padmasana | ⬜ | 2026-11-15 кисти на коленях (не по бокам). 2026-11-19 руки `hold` обрываются на верхней кромке колен (`[52,148]`/`[148,148]` при капах `[54,156]`/`[146,156]`) — ждём ок |
| 60 | `utpluthih` | Utpluthih (Tolasana) | ⬜ | |
| 61 | `savasana` | Savasana | ⬜ | |

## Вторая серия (кадры 70–106)

Обход по порядку кадров. Ссылка в колонке id открывает асану в приложении
(`http://localhost:5173`, dev-сервер должен быть запущен). Замеры и объяснения
правок — в `illustration-mismatch-report.md`; сверка без картинок —
`npm run illustrations:audit` и `npm run illustrations:poses` (0 ERR).

| № | кадр | id | Асана | Статус | Заметки |
|---|------|-----|-------|--------|---------|
| 62 | 70 | [pasasana](http://localhost:5173/#/series/intermediate/asana/pasasana) | Pasasana — Поза петли | ⬜ | 2026-11-19: присед компактнее, голени обхвачены в замок — смотреть присед и замок. |
| 63 | 71 | [krounchasana](http://localhost:5173/#/series/intermediate/asana/krounchasana) | Krounchasana — Поза журавля | ⬜ | 2026-11-19: стопа сложенной ноги у таза (была вытянута назад), захват стопы. |
| 64 | 72 | [salabhasana-a](http://localhost:5173/#/series/intermediate/asana/salabhasana-a) | Salabhasana A — Поза саранчи А | ⬜ | Прогиб лёжа, руки назад вдоль тела; правок не было. |
| 65 | 73 | [salabhasana-b](http://localhost:5173/#/series/intermediate/asana/salabhasana-b) | Salabhasana B — Поза саранчи Б | ⬜ | Прогиб лёжа, руки вперёд; правок не было. |
| 66 | 74 | [bhekasana](http://localhost:5173/#/series/intermediate/asana/bhekasana) | Bhekasana — Поза лягушки | ⬜ | Ладони на стопах у плеч, колени врозь. |
| 67 | 75 | [dhanurasana](http://localhost:5173/#/series/intermediate/asana/dhanurasana) | Dhanurasana — Поза лука | ⬜ | Захват стоп сзади, грудь вверх. |
| 68 | 76 | [parsva-dhanurasana](http://localhost:5173/#/series/intermediate/asana/parsva-dhanurasana) | Parsva Dhanurasana — Боковой лук | ⬜ | Разворот на бок, тот же захват стоп. |
| 69 | 77 | [ustrasana](http://localhost:5173/#/series/intermediate/asana/ustrasana) | Ustrasana — Поза верблюда | ⬜ | 2026-11-19: кадр опущен на 8 px, колени на настиле, ладони на пятках, руки одним конусом от плеча к пятке. |
| 70 | 78 | [laghu-vajrasana](http://localhost:5173/#/series/intermediate/asana/laghu-vajrasana) | Laghu Vajrasana — Малый громовой сиденье | ⬜ | Перекройка 2026-11-19: таз посажен к пяткам (137/140), колени на настиле (162/164), макушка `[62,166]` на полу позади стоп, дуга торса 55/49 px вместо 92 — флагов нет. |
| 71 | 79 | [kapotasana](http://localhost:5173/#/series/intermediate/asana/kapotasana) | Kapotasana — Поза голубя | ⬜ | 2026-11-19 перекрыта в ¾: локти и колени на полу, кисти на стопах, макушка у стоп; единственный флаг «мелкая фигура=82». |
| 72 | 80 | [supta-vajrasana](http://localhost:5173/#/series/intermediate/asana/supta-vajrasana) | Supta Vajrasana — Лежащий громовой сиденье | ⬜ | Спина дугой, макушка на полу, голени вдоль бёдер, руки на бёдрах. |
| 73 | 81 | [bakasana-a](http://localhost:5173/#/series/intermediate/asana/bakasana-a) | Bakasana A — Поза ворона А | ⬜ | Колени на руках, стопы в воздухе. |
| 74 | 82 | [bakasana-b](http://localhost:5173/#/series/intermediate/asana/bakasana-b) | Bakasana B — Поза ворона Б | ⬜ | Прямые руки, плечи над ладонями. |
| 75 | 83 | [bharadvajasana](http://localhost:5173/#/series/intermediate/asana/bharadvajasana) | Bharadvajasana — Поза мудреца Бхарадваджи | ⬜ | 2026-11-19: скрутка, кисть на стопе полулотоса. |
| 76 | 84 | [ardha-matsyendrasana](http://localhost:5173/#/series/intermediate/asana/ardha-matsyendrasana) | Ardha Matsyendrasana — Полуповёрнутый лорд рыб | ⬜ | Скрутка с захватом стопы (замок за спиной в профиле не читался). |
| 77 | 85 | [eka-pada-sirsasana](http://localhost:5173/#/series/intermediate/asana/eka-pada-sirsasana) | Eka Pada Sirsasana — Стойка с одной ногой за головой | ⬜ | Нога за головой, захват стопы. |
| 78 | 86 | [dwi-pada-sirsasana](http://localhost:5173/#/series/intermediate/asana/dwi-pada-sirsasana) | Dwi Pada Sirsasana — Обе ноги за головой сидя | ⬜ | Обе ноги за головой, кисти на полу. |
| 79 | 87 | [yoga-nidrasana](http://localhost:5173/#/series/intermediate/asana/yoga-nidrasana) | Yoga Nidrasana — Поза йогического сна | ⬜ | 2026-11-19: захват перенесён со стоп на бёдра; длина ноги 162 px — геометрия позы, принято. |
| 80 | 88 | [tittibhasana-a](http://localhost:5173/#/series/intermediate/asana/tittibhasana-a) | Tittibhasana A — Поза светлячка А | ⬜ | Бёдра на руках, ноги вперёд. |
| 81 | 89 | [tittibhasana-b](http://localhost:5173/#/series/intermediate/asana/tittibhasana-b) | Tittibhasana B — Поза светлячка Б | ⬜ | Бёдра на руках, ноги вверх. |
| 82 | 90 | [tittibhasana-c](http://localhost:5173/#/series/intermediate/asana/tittibhasana-c) | Tittibhasana C — Поза светлячка В | ⬜ | Бёдра на руках, ноги разведены в стороны. |
| 83 | 91 | [pincha-mayurasana](http://localhost:5173/#/series/intermediate/asana/pincha-mayurasana) | Pincha Mayurasana — Стойка на предплечьях | ⬜ | 2026-11-19: локти сведены под плечи (были на 16 px впереди). |
| 84 | 92 | [karandavasana](http://localhost:5173/#/series/intermediate/asana/karandavasana) | Karandavasana — Поза утёнка | ⬜ | Перекройка 2026-11-19: таз на 100, спина округлена, колени лотоса `[110,140]`/`[92,140]` лежат на руках (2.4/3.1 px от оси), стопы перед грудью; WARN «мелкая фигура=76» принят. |
| 85 | 93 | [mayurasana](http://localhost:5173/#/series/intermediate/asana/mayurasana) | Mayurasana — Поза павлина | ⬜ | Локти в живот, тело — балка. |
| 86 | 94 | [nakrasana](http://localhost:5173/#/series/intermediate/asana/nakrasana) | Nakrasana — Поза крокодила | ⬜ | Упор на предплечья, ноги назад. |
| 87 | 95 | [vatayanasana](http://localhost:5173/#/series/intermediate/asana/vatayanasana) | Vatayanasana — Поза лошади | ⬜ | 2026-11-19: присед на опорной ноге (таз ниже на 12 px, колено 109°, стопа на настиле), спина прямая, намасте перед грудью. |
| 88 | 96 | [parighasana](http://localhost:5173/#/series/intermediate/asana/parighasana) | Parighasana — Поза засова | ⬜ | 2026-11-19: колено на настиле, голень назад по полу, наклон к прямой ноге, рука над ухом. |
| 89 | 97 | [gomukhasana-a](http://localhost:5173/#/series/intermediate/asana/gomukhasana-a) | Gomukhasana A — Поза коровьей морды А | ⬜ | 2026-11-19: кисти сведены в замок за спиной; короткое видимое бедро — стопка коленей, это геометрия позы. |
| 90 | 98 | [gomukhasana-b](http://localhost:5173/#/series/intermediate/asana/gomukhasana-b) | Gomukhasana B — Поза коровьей морды Б | ⬜ | 2026-11-19: наклон вперёд, подбородок на верхнем колене, голова выведена из силуэта торса. |
| 91 | 99 | [supta-urdhva-pada-vajrasana](http://localhost:5173/#/series/intermediate/asana/supta-urdhva-pada-vajrasana) | Supta Urdhva Pada Vajrasana — Лежащий гром с поднятыми ногами | ⬜ | Макушка на полу, прямые ноги под углом вверх, кисти на стопах. |
| 92 | 100 | [mukta-hasta-sirsasana-a](http://localhost:5173/#/series/intermediate/asana/mukta-hasta-sirsasana-a) | Mukta Hasta Sirsasana A — Стойка на голове А | ⬜ | Ладони у головы, локти согнуты в стороны. |
| 93 | 101 | [mukta-hasta-sirsasana-b](http://localhost:5173/#/series/intermediate/asana/mukta-hasta-sirsasana-b) | Mukta Hasta Sirsasana B — Стойка на голове Б | ⬜ | Прямые руки вытянуты вперёд (кадр ¾); WARN «сдвиг по X=131» — следствие вытянутых рук. |
| 94 | 102 | [mukta-hasta-sirsasana-c](http://localhost:5173/#/series/intermediate/asana/mukta-hasta-sirsasana-c) | Mukta Hasta Sirsasana C — Стойка на голове В | ⬜ | Руки разведены в стороны на 140 px — максимальный размах серии. |
| 95 | 103 | [baddha-hasta-sirsasana-a](http://localhost:5173/#/series/intermediate/asana/baddha-hasta-sirsasana-a) | Baddha Hasta Sirsasana A — Связанная стойка А | ⬜ | 2026-11-19: кисти сведены на противоположные локти (были в 14 px). |
| 96 | 104 | [baddha-hasta-sirsasana-b](http://localhost:5173/#/series/intermediate/asana/baddha-hasta-sirsasana-b) | Baddha Hasta Sirsasana B — Связанная стойка Б | ⬜ | 2026-11-19: пальцы в замке за затылком (было 20 px между кистями). |
| 97 | 105 | [baddha-hasta-sirsasana-c](http://localhost:5173/#/series/intermediate/asana/baddha-hasta-sirsasana-c) | Baddha Hasta Sirsasana C — Связанная стойка В | ⬜ | Предплечья скрещены, кисти у противоположных плеч. |
| 98 | 106 | [baddha-hasta-sirsasana-d](http://localhost:5173/#/series/intermediate/asana/baddha-hasta-sirsasana-d) | Baddha Hasta Sirsasana D — Связанная стойка Г | ⬜ | Прямые руки вытянуты за головой, кисти на полу. |

---

## Журнал общих уроков (кратко → в rules)

| Дата | Урок |
|------|------|
| 2026-11-13 | Не объявлять иллюстрацию готовой без явного «ок» владельца. |
| 2026-11-13 | Сидя вправо: ягодицы на −x; не путать с «живот к полу» в складке. |
| 2026-11-13 | Шорты: не кирпич и не шар; талия → щека → складка у бедра. |
| 2026-11-13 | Вертикальный сидячий вход: плечи над тазом по x, не левее (иначе прогиб назад). |
| 2026-11-13 | Седалище на линии пола; поля ≥12; стопы по типу позы. |
| 2026-11-13 | Сурья А ок → общие `FIG_*` в Сурье Б; 2-я серия клонирует `pose: surya-a` / `surya-b`, не копировать фигуры. |
| 2026-11-14 | Колено = шарнир, не конус: `legRadii` / fuller knee; ревью с акцентом «понятно новичку». |
| 2026-11-14 | Шорты: баг складки — `front≈up` схлопывал таз → две гетры; `garmentAxes` + front к +x; штанины внахлёст без шайб. |
| 2026-11-14 | В наклоне круглая ягодичная щека — ок (не «шар-баг»); убрана светлая линия пояса. |
| 2026-11-14 | Шорты: `profileShortsPath` — один силуэт таз+штанина+щека; один цвет; чашка на корнях. |
| 2026-11-14 | Стоячая складка: щека против `up` (вверх); сидячие — назад; штанина выровнена по `+f`. |
| 2026-11-14 | Шорты профиль: `capsule` + `circle` щеки (один цвет, rTube≈0.88 rCheek) — без щелей гамаш. |
| 2026-11-14 | Баг лоскутов: `capsule` sweep 1 → «кость»; исправлено на sweep 0. Шорты поверх рук у таза. |
| 2026-11-14 | Шорты ужаты: тонкая capsule r≈6.5–7, L≤12 — не жирная наклейка. |
| 2026-11-14 | Таз+корни: «персиковые ягодицы» = торцы `leg()` у hip; `rootCovers` + `profileShortsPath`; сидячий торс до пояса. |
| 2026-11-14 | Естественность по cheat-sheet: один силуэт, ширина ≈ leg(), мягкая щека без рога, короткий подол. |
| 2026-11-13 | Шорты: одна цельная форма (толще/длиннее), без отдельных «мазков» и без свечения ягодиц. |
| 2026-11-13 | Сурья Б воины: оба корпусом −x как Адхо (не зеркало); 8 пр./12 лев. вперёд; носки к передней; sideOn + ягодицы по голове если |toFeet.x| мал. |
| 2026-11-13 | Near/far: правая = far (темнее) как на всей схеме; не крутить камеру за передней ногой (иначе 8/12 ломают конвенцию). |
| 2026-11-13 | Стоячая складка: «выглядывает» = кожа таза; шорты-трубка к стопам, щека от головы; без овала/блина; уголь неброско. |
| 2026-11-13 | Складка: не тянуть peak вверх (кирпич). Прятать шарнир бедра; hem длиннее по бедру. |
| 2026-11-13 | Складка: шорты = одна трубка пояс→подол; щека шириной, не изломом оси (иначе «рвутся»). |
| 2026-11-13 | Складка: tubePath smooth=false; band у таза; без линии пояса; standingFold только стопы под тазом (не Адхо). |
| 2026-11-13 | Всегда: ягодицы + основания ног под шортами; в складке старт выше hip, без шарнира бедра. |
| 2026-11-15 | Шорты: профиль `thighs` = **один** path (не multi-fill); складка = `along`; `underShorts` на ногах **и** `thigh()`; сидячий торс до пояса. |
| 2026-11-15 | Сидячие шорты: щека в сторону −front по X; пояс сзади не дальше щеки; подол без острого tip; bluntStart ужимает торец. danda + paschi A — ок. |
| 2026-11-15 | Ноги врозь (`sym`/`spread`): один контур через глубокий пах; LN до 0.72 бедра; crotch ≥ ~7–8. Прокатка по всем сериям — по SVG и `npm run illustrations:audit`. |
| 2026-11-15 | Лоскуты: `sym` и стоячие/`!onSeat` `thighs` → `convexHull` покрытия; сидячие на полу без самопересечения — упорядоченный контур. Gate: 0 фрагментов. |
| 2026-11-15 | Шорты-одежда: узкий шаг → `tubeShortsOutline`; широкий/sym → hull покрытия с мостом пояса через hipSep + трубки бёдер (не зубчатый radial). danda/paschi без регресса. |
| 2026-11-15 | Пах: `dentBetweenHems` на широком шаге (ребро у подолов → к mid); bluntStart 1.55 + rise+1 для стыка торс↔шорты; объём прогибов/sava. |
| 2026-11-15 | Сложные асаны — 4 слоя: lean-торс (не плита), читаемый жест (far/near), flat/hold ладони, стык плечо/таз. Прогибы: параллельная lean-дуга `arch:true` (как `wheelTorso`); auto-дуга ок если жест сверяют с плакатом. Crow: стопы `free` высоко у таза, не на полу. |
| 2026-11-19 | Силуэт: пол и тень не рисуются, поэтому фигуру прижимаем к y=168 (`snapToGround`), иначе поза «висит». Контроль без картинок — `npm run illustrations:audit` (должно быть 0 ERR). |
