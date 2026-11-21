import type { Asana, Section } from './types';
import { PRIMARY_SERIES } from './primarySeries';

const cloneAsana = (asana: Asana): Asana => ({ ...asana, id: `adv-${asana.id}` });

export const ADVANCED_SECTIONS: Section[] = [
  { id: 'surya-a', title: 'Сурья Намаскар А', subtitle: 'Приветствие Солнцу А · 9 виньяс' },
  { id: 'surya-b', title: 'Сурья Намаскар Б', subtitle: 'Приветствие Солнцу Б · 17 виньяс' },
  { id: 'standing', title: 'Стоя', subtitle: 'Фундаментальные асаны' },
  { id: 'advanced', title: 'Основная часть', subtitle: 'Стхира Бхага — устойчивость и сила' },
  { id: 'finishing', title: 'Завершающая последовательность', subtitle: 'Перевёрнутые и медитация' },
];

/**
 * Третья серия (Advanced A, Sthira Bhaga) по традиции Шри К. Паттабхи Джойса.
 * Состав и порядок — 36 позиций в редакции AYI / KPJAYI-преемственности:
 * Васиштхасана … Эка Пада Раджа Капотасана.
 *
 * Дришти выставлены по печатному листу Advanced A (kiselevav.ru): Foot, Hand,
 * 3rd Eye, Nose, Upward, Side, Face. Описания сверены с AYI (Dr. Ronald Steiner)
 * и с указаниями Ф. Эшер; цифровой счёт виньяс в открытых источниках
 * не публикуется полностью, поэтому `vinyasa` стоит только там, где он
 * подтверждён (первая четвёрка асан).
 */
type Extra = Partial<Pick<Asana, 'vinyasa' | 'speech' | 'modernAddition'>>;

const asana = (
  id: string,
  sanskrit: string,
  devanagari: string,
  transcription: string,
  russian: string,
  pose: string,
  drishti: string,
  note: string,
  extra: Extra | Record<string, never> = {},
): Asana => ({
  id,
  sanskrit,
  devanagari,
  transcription,
  russian,
  pose,
  drishti,
  breaths: 5,
  note,
  section: 'advanced',
  ...extra,
});

export const ADVANCED_UNIQUE: Asana[] = [
  asana('vasisthasana', 'Vasiṣṭhāsana', 'वसिष्ठासन', 'Васи́штхасана', 'Поза Васиштхи', 'vasisthasana', 'На стопу',
    'Боковой упор на одной руке: нижняя нога прямая на полу, верхняя нога и рука вытянуты вверх, взгляд на поднятую стопу.',
    { vinyasa: 8 }),
  asana('vishvamitrasana', 'Viśvāmitrāsana', 'विश्वामित्रासन', 'Вишвамитра́сана', 'Поза Вишвамитры', 'vishvamitrasana', 'На кисть',
    'Боковой упор: нижняя нога согнута и стоит на полу, верхняя нога вытянута вперёд-вверх, верхняя рука держит стопу, взгляд на кисть.',
    { vinyasa: 7 }),
  asana('kasyapasana', 'Kaśyapāsana', 'कश्यपासन', 'Кашьяпа́сана', 'Поза Кашьяпы', 'kasyapasana', 'Третий глаз',
    'Лёжа на спине: одна стопа заведена за голову, вторая нога вытянута вверх, обе кисти держат поднятую стопу.',
    { vinyasa: 8 }),
  asana('chakorasana', 'Cakorāsana', 'चकोरासन', 'Чакора́сана', 'Поза чакоры', 'chakorasana', 'На стопу',
    'Баланс на руках: одна стопа за головой, вторая нога вертикально вверх; взгляд на поднятую стопу.',
    { vinyasa: 8 }),
  asana('bhairavasana', 'Bhairavāsana', 'भैरवासन', 'Бхайрава́сана', 'Поза Бхайравы', 'bhairavasana', 'На кисть',
    'Боковой упор на предплечье: одна стопа за головой, вторая нога вытянута вверх, свободная рука держит стопу.'),
  asana('skandasana', 'Skandāsana', 'स्कन्दासन', 'Сканда́сана', 'Поза Сканды', 'skandasana', 'Нос',
    'Стоя в наклоне вперёд: одна стопа за головой, вторая нога прямая на полу, обе ладони на полу.'),
  asana('durvasana', 'Durvāsana', 'दुर्वासन', 'Дурва́сана', 'Поза Дурвасы', 'durvasana', 'Вверх',
    'Стоя на одной ноге: вторая стопа заведена за голову, корпус вертикально, руки в намасте у груди.'),
  asana('urdhva-kukkutasana-a', 'Ūrdhva Kukkuṭāsana A', 'ऊर्ध्व कुक्कुटासन', 'Урдхва Куккута́сана А', 'Поза петуха вверх А',
    'urdhva-kukkutasana-a', 'Нос',
    'Лотос на руках: колени лежат на плечах, локти согнуты, таз поднят, баланс на ладонях.'),
  asana('urdhva-kukkutasana-b', 'Ūrdhva Kukkuṭāsana B', 'ऊर्ध्व कुक्कुटासन', 'Урдхва Куккута́сана Б', 'Поза петуха вверх Б',
    'urdhva-kukkutasana-b', 'Нос',
    'Лотос на руках: руки выпрямлены, таз выше, баланс на ладонях.'),
  asana('urdhva-kukkutasana-c', 'Ūrdhva Kukkuṭāsana C', 'ऊर्ध्व कुक्कुटासन', 'Урдхва Куккута́сана В', 'Поза петуха вверх В',
    'urdhva-kukkutasana-c', 'Нос',
    'Лотос на руках: корпус наклонён вперёд, вес перенесён на ладони.'),
  asana('galavasana', 'Gālavāsana', 'गालवासन', 'Галава́сана', 'Поза Галавы', 'galavasana', 'Нос',
    'Баланс на руках: голень одной ноги лежит на плечах, вторая нога вытянута диагонально вверх; корпус и нога образуют одну линию.'),
  asana('eka-pada-bakasana-a', 'Eka Pāda Bakāsana A', 'एक पाद बकासन', 'Эка Па́да Бака́сана А', 'Журавль на одной ноге А',
    'eka-pada-bakasana-a', 'Нос',
    'Баланс на руках: колено одной ноги на локте, вторая нога вытянута вверх.'),
  asana('eka-pada-bakasana-b', 'Eka Pāda Bakāsana B', 'एक पाद बकासन', 'Эка Па́да Бака́сана Б', 'Журавль на одной ноге Б',
    'eka-pada-bakasana-b', 'Нос',
    'Баланс на руках: колено одной ноги на локте, вторая нога вытянута вперёд.'),
  asana('koundinyasana-a', 'Kauṇḍinyāsana A', 'कौण्डिन्यासन', 'Кундинья́сана А', 'Поза Кундины А', 'koundinyasana-a', 'Нос',
    'Баланс на руках: обе ноги вытянуты в одну сторону, корпус скручен.'),
  asana('koundinyasana-b', 'Kauṇḍinyāsana B', 'कौण्डिन्यासन', 'Кундинья́сана Б', 'Поза Кундины Б', 'koundinyasana-b', 'Нос',
    'Баланс на руках: одна нога вытянута вперёд, вторая назад-вверх, ноги раскрыты.'),
  asana('astavakrasana-a', 'Aṣṭāvakrāsana A', 'अष्टावक्रासन', 'Аштавакра́сана А', 'Поза Аштавакры А', 'astavakrasana-a', 'Нос',
    'Баланс на руках: ноги переплетены и вынесены в сторону.'),
  asana('astavakrasana-b', 'Aṣṭāvakrāsana B', 'अष्टावक्रासन', 'Аштавакра́сана Б', 'Поза Аштавакры Б', 'astavakrasana-b', 'Нос',
    'То же переплетение ног; выход с разгибанием ног в сторону.'),
  asana('purna-matsyendrasana', 'Pūrṇa Matsyendrāsana', 'पूर्ण मत्स्येन्द्रासन', 'Пу́рна Матсьендра́сана', 'Полная поза Матсьендры',
    'purna-matsyendrasana', 'В сторону',
    'Скрутка сидя: одна нога в лотосе, вторая стопа переставлена через бедро, рука держит стопу, вторая рука за спиной.'),
  asana('viranchyasana-a1', 'Virañcyāsana A1', 'विरञ्च्यासन', 'Виранчья́сана А1', 'Поза Виранчи А1', 'viranchyasana-a1', 'Нос',
    'Сидя: левая нога в полулотосе, правая стопа за головой, руки в намасте у груди.'),
  asana('viranchyasana-a2', 'Virañcyāsana A2', 'विरञ्च्यासन', 'Виранчья́сана А2', 'Поза Виранчи А2', 'viranchyasana-a2', 'Вверх',
    'То же положение ног; руки связаны за спиной, взгляд вверх.'),
  asana('viranchyasana-a3', 'Virañcyāsana A3', 'विरञ्च्यासन', 'Виранчья́сана А3', 'Поза Виранчи А3', 'viranchyasana-a3', 'Нос',
    'Баланс на руках: левое колено на левом плече, правая стопа за головой.'),
  asana('viranchyasana-b1', 'Virañcyāsana B1', 'विरञ्च्यासन', 'Виранчья́сана Б1', 'Поза Виранчи Б1', 'viranchyasana-b1', 'Нос',
    'Длинный сед: правая стопа в паху левого бедра, наклон к прямой левой ноге, кисти держат стопу.'),
  asana('viranchyasana-b2', 'Virañcyāsana B2', 'विरञ्च्यासन', 'Виранчья́сана Б2', 'Поза Виранчи Б2', 'viranchyasana-b2', 'Третий глаз',
    'То же, глубже наклон к прямой ноге; взгляд через макушку к большому пальцу.'),
  asana('viranchyasana-b3', 'Virañcyāsana B3', 'विरञ्च्यासन', 'Виранчья́сана Б3', 'Поза Виранчи Б3', 'viranchyasana-b3', 'В сторону',
    'Скрутка: левая стопа в лотосе на правом бедре, правая рука под левым коленом, левая рука держит большой палец за спиной.'),
  asana('dvi-pada-viparita-dandasana', 'Dvi Pāda Viparīta Daṇḍāsana', 'द्वि पाद विपरीत दण्डासन', 'Дви Па́да Випарита Данда́сана',
    'Перевёрнутый посох на двух ногах', 'dvi-pada-viparita-dandasana', 'Нос',
    'Стойка на предплечьях с прогибом: обе стопы опущены на пол за головой, колени стремятся выпрямиться.'),
  asana('eka-pada-viparita-dandasana', 'Eka Pāda Viparīta Daṇḍāsana', 'एक पाद विपरीत दण्डासन', 'Эка Па́да Випарита Данда́сана',
    'Перевёрнутый посох на одной ноге', 'eka-pada-viparita-dandasana', 'Нос',
    'То же, одна нога поднята вверх.'),
  asana('viparita-salabhasana', 'Viparīta Śalabhāsana', 'विपरीत शलभासन', 'Випарита Шалабха́сана', 'Перевёрнутая саранча',
    'viparita-salabhasana', 'Нос',
    'Лёжа на груди и подбородке: ноги вытянуты вверх, руки под корпусом.'),
  asana('ganda-bherundasana', 'Gaṇḍa Bheruṇḍāsana', 'गण्ड भेरुण्डासन', 'Га́нда Бхерунда́сана', 'Поза Ганды Бхерунды',
    'ganda-bherundasana', 'Нос',
    'Лёжа на груди и подбородке: ноги заведены над головой, стопы опускаются рядом с головой.'),
  asana('hanumanasana', 'Hanumānāsana', 'हनुमानासन', 'Ханумана́сана', 'Поза Ханумана', 'hanumanasana', 'Нос',
    'Продольный шпагат: передняя нога вперёд, задняя назад, таз на полу; наклон вперёд, кисти удерживают переднюю стопу.'),
  asana('supta-trivikramasana', 'Supta Trivikramāsana', 'सुप्त त्रिविक्रमासन', 'Су́пта Тривикрама́сана', 'Поза Тривикрамы лёжа',
    'supta-trivikramasana', 'Нос',
    'Лёжа на спине: одна нога заведена за голову, вторая вытянута на полу; обе кисти удерживают стопу за головой.'),
  asana('digasana-a', 'Digāsana A', 'दिगासन', 'Дига́сана А', 'Поза направлений А', 'digasana-a', 'На кисть',
    'Стоя на одной ноге: вторая нога вытянута далеко назад, обе руки горизонтально вперёд.'),
  asana('digasana-b', 'Digāsana B', 'दिगासन', 'Дига́сана Б', 'Поза направлений Б', 'digasana-b', 'Нос',
    'То же положение ног; руки раскрыты в стороны на уровне плеч.'),
  asana('utthita-trivikramasana', 'Utthita Trivikramāsana', 'उत्थित त्रिविक्रमासन', 'Уттхита Тривикрама́сана',
    'Поза Тривикрамы стоя', 'utthita-trivikramasana', 'Нос',
    'Стоя на одной ноге: вторая нога поднята высоко вверх и удерживается кистями; корпус вытянут.'),
  asana('nata-rajasana', 'Naṭarājāsana', 'नटराजासन', 'Натараджа́сана', 'Поза царя танцев', 'nata-rajasana', 'На кисть',
    'Стоя на одной ноге с прогибом: вторая нога поднята назад и удерживается рукой, вторая рука вытянута вперёд.'),
  asana('raja-kapotasana', 'Rāja Kapotāsana', 'राज कपोतासन', 'Ра́джа Капота́сана', 'Королевский голубь', 'raja-kapotasana', 'Нос',
    'Стоя на коленях с глубоким прогибом: стопы подведены к голове, кисти удерживают стопы.'),
  asana('eka-pada-raja-kapotasana', 'Eka Pāda Rāja Kapotāsana', 'एक पाद राज कपोतासन', 'Эка Па́да Ра́джа Капота́сана',
    'Королевский голубь на одной ноге', 'eka-pada-raja-kapotasana', 'Нос',
    'Поза голубя с прогибом: передняя нога сложена на полу, задняя стопа подведена к голове, кисти удерживают стопу.'),
];

/**
 * Стоячий блок третьей серии короче, чем в первой: он заканчивается
 * Паршвоттанасаной. Parivrtta-позы и Уттхита Хаста / Ардха Баддха Падма /
 * Уткатасана / Вирабхадрасана A–B относятся к первой серии и сюда не входят.
 */
const ADVANCED_STANDING_IDS = new Set([
  'padangusthasana',
  'padahastasana',
  'utthita-trikonasana-a',
  'utthita-trikonasana-b',
  'utthita-parsvakonasana-a',
  'utthita-parsvakonasana-b',
  'prasarita-padottanasana-a',
  'prasarita-padottanasana-b',
  'prasarita-padottanasana-c',
  'prasarita-padottanasana-d',
  'parsvottanasana',
]);

const opening = PRIMARY_SERIES.filter(
  (a) =>
    a.section === 'surya-a' ||
    a.section === 'surya-b' ||
    (a.section === 'standing' && ADVANCED_STANDING_IDS.has(a.id)),
).map(cloneAsana);

const finishing = PRIMARY_SERIES.filter((a) => a.section === 'finishing').map(cloneAsana);

export const ADVANCED_SERIES: Asana[] = [...opening, ...ADVANCED_UNIQUE, ...finishing];
