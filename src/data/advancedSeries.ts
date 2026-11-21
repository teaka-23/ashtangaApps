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
 * Состав и порядок — по списку школы (KPJAYI-преемственность), 36 позиций:
 * Вашиштхасана … Эка Пада Раджа Капотасана.
 *
 * У всех 36 есть иллюстрация (`pose` + кадр в `cartoons.ts`). Первый проход
 * силуэтов: 7 кадров приняты владельцем, 29 ждут приёмки — правки идут по
 * `docs/owner-remarks-inbox.md`. Если кадр снимается на перерисовку, у асаны
 * ставится `illustrationPending: true` — UI покажет плашку вместо фигуры.
 */
/**
 * Запись асаны, для которой иллюстрация уже нарисована:
 * `pose` — имя SVG-ключа, `drishti` — направление взгляда из текста традиции.
 */
const drawn = (
  id: string,
  pose: string,
  drishti: string,
  sanskrit: string,
  transcription: string,
  russian: string,
  note: string,
  devanagari = '',
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
});


export const ADVANCED_UNIQUE: Asana[] = [
  {
    id: 'vasisthasana',
    sanskrit: 'Vasiṣṭhāsana',
    devanagari: 'वसिष्ठासन',
    transcription: 'Васи́штхасана',
    russian: 'Поза Васиштхи',
    pose: 'vasisthasana',
    vinyasa: 8,
    drishti: 'Вверх',
    breaths: 5,
    note: 'Боковой упор на одной руке: верхняя рука и нога вытянуты вверх, взгляд на поднятую кисть.',
    section: 'advanced',
  },
  {
    id: 'vishvamitrasana',
    sanskrit: 'Viśvāmitrāsana',
    devanagari: 'विश्वामित्रासन',
    transcription: 'Вишвамитра́сана',
    russian: 'Поза Вишвамитры',
    pose: 'vishvamitrasana',
    vinyasa: 7,
    drishti: 'Вверх',
    breaths: 5,
    note: 'Боковой упор: нижняя нога вытянута вперёд над опорной рукой, верхняя рука держит поднятую стопу, взгляд вверх.',
    section: 'advanced',
  },
  {
    id: 'kasyapasana',
    sanskrit: 'Kaśyapāsana',
    devanagari: 'कश्यपासन',
    transcription: 'Кашьяпа́сана',
    russian: 'Поза Кашьяпы',
    pose: 'kasyapasana',
    vinyasa: 8,
    drishti: 'В сторону',
    breaths: 5,
    note: 'Лёжа на спине: одна стопа заведена за голову, вторая нога вытянута вверх, кисти держат поднятую стопу.',
    section: 'advanced',
  },
  {
    id: 'chakorasana',
    sanskrit: 'Cakorāsana',
    devanagari: 'चकोरासन',
    transcription: 'Чакора́сана',
    russian: 'Поза чакоры',
    pose: 'chakorasana',
    vinyasa: 8,
    drishti: 'Вверх',
    breaths: 5,
    note: 'Баланс на руках: одна стопа за головой, вторая нога вертикально вверх, взгляд вверх.',
    section: 'advanced',
  },
  {
    id: 'bhairavasana',
    sanskrit: 'Bhairavāsana',
    devanagari: 'भैरवासन',
    transcription: 'Бхайрава́сана',
    russian: 'Поза Бхайравы',
    pose: 'bhairavasana',
    drishti: 'В сторону',
    breaths: 5,
    note: 'Боковой упор на предплечье: одна стопа за головой, вторая нога вытянута вверх, свободная рука держит стопу.',
    section: 'advanced',
  },
  drawn('skandasana', 'skandasana', 'В сторону', 'Skandāsana', 'Сканда́сана', 'Поза Сканды',
    'Стоя: одна стопа за головой, наклон вперёд с опорой на руки.', 'स्कन्दासन'),
  {
    id: 'durvasana',
    sanskrit: 'Durvāsana',
    devanagari: 'दुर्वासन',
    transcription: 'Дурва́сана',
    russian: 'Поза Дурвасы',
    pose: 'durvasana',
    drishti: 'Вперёд',
    breaths: 5,
    note: 'Стоя на одной ноге: вторая стопа заведена за голову, корпус вертикально, руки в намасте у груди.',
    section: 'advanced',
  },
  {
    id: 'urdhva-kukkutasana-a',
    sanskrit: 'Ūrdhva Kukkuṭāsana A',
    devanagari: 'ऊर्ध्व कुक्कुटासन',
    transcription: 'Урдхва Куккута́сана А',
    russian: 'Поза петуха вверх А',
    pose: 'urdhva-kukkutasana-a',
    drishti: 'Вперёд',
    breaths: 5,
    note: 'Лотос на руках: колени лежат на предплечьях, локти согнуты, баланс на ладонях, тело поднято.',
    section: 'advanced',
  },
  drawn('urdhva-kukkutasana-b', 'urdhva-kukkutasana-b', 'Вперёд', 'Ūrdhva Kukkuṭāsana B', 'Урдхва Куккута́сана Б', 'Поза петуха вверх Б',
    'Лотос на руках: руки выпрямляются, таз выше, баланс на ладонях.', 'ऊर्ध्व कुक्कुटासन'),
  drawn('urdhva-kukkutasana-c', 'urdhva-kukkutasana-c', 'Вперёд', 'Ūrdhva Kukkuṭāsana C', 'Урдхва Куккута́сана В', 'Поза петуха вверх В',
    'Лотос на руках: корпус наклоняется вперёд, вес переносится на ладони.', 'ऊर्ध्व कुक्कुटासन'),
  drawn('galavasana', 'galavasana', 'Вверх', 'Gālavāsana', 'Галава́сана', 'Поза Галавы',
    'Баланс на руках: голень одной ноги на предплечьях, вторая нога вытянута вверх.', 'गालवासन'),
  drawn('eka-pada-bakasana-a', 'eka-pada-bakasana-a', 'В сторону', 'Eka Pāda Bakāsana A', 'Эка Па́да Бака́сана А', 'Журавль на одной ноге А',
    'Баланс на руках: колено одной ноги на локте, вторая нога вытянута в сторону.', 'एक पाद बकासन'),
  drawn('eka-pada-bakasana-b', 'eka-pada-bakasana-b', 'Вперёд', 'Eka Pāda Bakāsana B', 'Эка Па́да Бака́сана Б', 'Журавль на одной ноге Б',
    'Баланс на руках: колено на локте, вторая нога вытянута назад-вверх.', 'एक पाद बकासन'),
  drawn('koundinyasana-a', 'koundinyasana-a', 'В сторону', 'Kauṇḍinyāsana A', 'Кундинья́сана А', 'Поза Кундины А',
    'Баланс на руках: обе ноги вытянуты в одну сторону, корпус скручен.', 'कौण्डिन्यासन'),
  drawn('koundinyasana-b', 'koundinyasana-b', 'Вперёд', 'Kauṇḍinyāsana B', 'Кундинья́сана Б', 'Поза Кундины Б',
    'Баланс на руках: одна нога вперёд, вторая назад, ноги раскрыты.', 'कौण्डिन्यासन'),
  drawn('astavakrasana-a', 'astavakrasana-a', 'В сторону', 'Aṣṭāvakrāsana A', 'Аштавакра́сана А', 'Поза Аштавакры А',
    'Баланс на руках: ноги переплетены и вынесены в сторону.', 'अष्टावक्रासन'),
  drawn('astavakrasana-b', 'astavakrasana-b', 'В сторону', 'Aṣṭāvakrāsana B', 'Аштавакра́сана Б', 'Поза Аштавакры Б',
    'То же переплетение ног, выход другой: ноги разгибаются в сторону.', 'अष्टावक्रासन'),
  drawn('purna-matsyendrasana', 'purna-matsyendrasana', 'В сторону', 'Pūrṇa Matsyendrāsana', 'Пу́рна Матсьендра́сана', 'Полная поза Матсьендры',
    'Скрутка сидя: одна нога в лотосе, вторая стопа у противоположного бедра, рука обхватывает колено.', 'पूर्ण मत्स्येन्द्रासन'),
  drawn('viranchyasana-a1', 'viranchyasana-a1', 'Вверх', 'Virañcyāsana A1', 'Виранчья́сана А1', 'Поза Виранчи А1',
    'Одна нога в полулотосе, вторая стопа за головой, корпус вертикально.', 'विरञ्च्यासन'),
  drawn('viranchyasana-a2', 'viranchyasana-a2', 'Вверх', 'Virañcyāsana A2', 'Виранчья́сана А2', 'Поза Виранчи А2',
    'То же положение ног, руки в замке за спиной, взгляд вверх.', 'विरञ्च्यासन'),
  drawn('viranchyasana-a3', 'viranchyasana-a3', 'Вперёд', 'Virañcyāsana A3', 'Виранчья́сана А3', 'Поза Виранчи А3',
    'То же положение ног с наклоном корпуса вперёд, руки в замке за спиной.', 'विरञ्च्यासन'),
  drawn('viranchyasana-b1', 'viranchyasana-b1', 'Вверх', 'Virañcyāsana B1', 'Виранчья́сана Б1', 'Поза Виранчи Б1',
    'Зеркальный вариант A1: другая нога в полулотосе, стопа за головой.', 'विरञ्च्यासन'),
  drawn('viranchyasana-b2', 'viranchyasana-b2', 'Вверх', 'Virañcyāsana B2', 'Виранчья́сана Б2', 'Поза Виранчи Б2',
    'Зеркальный вариант A2: руки в замке за спиной, взгляд вверх.', 'विरञ्च्यासन'),
  drawn('viranchyasana-b3', 'viranchyasana-b3', 'Вперёд', 'Virañcyāsana B3', 'Виранчья́сана Б3', 'Поза Виранчи Б3',
    'Зеркальный вариант A3: наклон вперёд с замком рук за спиной.', 'विरञ्च्यासन'),
  drawn('dvi-pada-viparita-dandasana', 'dvi-pada-viparita-dandasana', 'Вверх', 'Dvi Pāda Viparīta Daṇḍāsana', 'Дви Па́да Випарита Данда́сана', 'Перевёрнутый посох на двух ногах',
    'Стойка на предплечьях с прогибом: обе стопы опускаются к голове.', 'द्वि पाद विपरीत दण्डासन'),
  drawn('eka-pada-viparita-dandasana', 'eka-pada-viparita-dandasana', 'Вверх', 'Eka Pāda Viparīta Daṇḍāsana', 'Эка Па́да Випарита Данда́сана', 'Перевёрнутый посох на одной ноге',
    'Стойка на предплечьях с прогибом: одна стопа у головы, вторая нога вытянута.', 'एक पाद विपरीत दण्डासन'),
  drawn('viparita-salabhasana', 'viparita-salabhasana', 'Вперёд', 'Viparīta Śalabhāsana', 'Випарита Шалабха́сана', 'Перевёрнутая саранча',
    'Стойка на груди и подбородке: ноги вытянуты вверх, руки вдоль корпуса.', 'विपरीत शलभासन'),
  drawn('ganda-bherundasana', 'ganda-bherundasana', 'Вперёд', 'Gaṇḍa Bheruṇḍāsana', 'Ганда Бхерунда́сана', 'Поза Ганды Бхерунды',
    'Стойка на подбородке с прогибом: ноги заведены над головой, стопы вместе.', 'गण्ड भेरुण्डासन'),
  drawn('hanumanasana', 'hanumanasana', 'Вверх', 'Hanumānāsana', 'Ханумана́сана', 'Поза Ханумана',
    'Продольный шпагат: одна нога вперёд, вторая назад, таз на полу, руки вверх.', 'हनुमानासन'),
  drawn('supta-trivikramasana', 'supta-trivikramasana', 'Вверх', 'Supta Trivikramāsana', 'Су́пта Тривикрама́сана', 'Поза Тривикрамы лёжа',
    'Лёжа на спине: одна нога заведена за голову, вторая вытянута, руки держат опорную ногу.', 'सुप्त त्रिविक्रमासन'),
  drawn('digasana-a', 'digasana-a', 'В сторону', 'Digāsana A', 'Дига́сана А', 'Поза направлений А',
    'Стоя на одной ноге, вторая стопа за головой; корпус развёрнут в сторону опорной ноги.', 'दिगासन'),
  drawn('digasana-b', 'digasana-b', 'В сторону', 'Digāsana B', 'Дига́сана Б', 'Поза направлений Б',
    'То же положение ног с разворотом корпуса в другую сторону.', 'दिगासन'),
  drawn('utthita-trivikramasana', 'utthita-trivikramasana', 'Вверх', 'Utthita Trivikramāsana', 'Уттхита Тривикрама́сана', 'Поза Тривикрамы стоя',
    'Стоя: одна стопа за головой, вторая нога прямая, корпус вытянут вверх.', 'उत्थित त्रिविक्रमासन'),
  drawn('nata-rajasana', 'nata-rajasana', 'Вверх', 'Naṭarājāsana', 'Натараджа́сана', 'Поза царя танцев',
    'Стоя на одной ноге с прогибом: вторая стопа заведена за голову, рука держит стопу над головой.', 'नटराजासन'),
  drawn('raja-kapotasana', 'raja-kapotasana', 'Вверх', 'Rāja Kapotāsana', 'Ра́джа Капота́сана', 'Королевский голубь',
    'Стоя на колене с глубоким прогибом: стопы заводятся к голове, руки держат стопы.', 'राज कपोतासन'),
  drawn('eka-pada-raja-kapotasana', 'eka-pada-raja-kapotasana', 'Вверх', 'Eka Pāda Rāja Kapotāsana', 'Эка Па́да Ра́джа Капота́сана', 'Королевский голубь на одной ноге',
    'То же с одной ногой: вторая стопа за головой, корпус в глубоком прогибе.', 'एक पाद राज कपोतासन'),
];

const opening = PRIMARY_SERIES.filter((a) =>
  ['surya-a', 'surya-b', 'standing'].includes(a.section),
).map(cloneAsana);

const finishing = PRIMARY_SERIES.filter((a) => a.section === 'finishing').map(cloneAsana);

export const ADVANCED_SERIES: Asana[] = [...opening, ...ADVANCED_UNIQUE, ...finishing];
