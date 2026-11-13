/**
 * Сидячие первой серии, часть 2: от Бхуджапидасаны до Сету Бандхасаны.
 * Профиль лицом в +x, если жест читается сбоку; широкие и лотос — фронтально.
 * Стопы: плоско на полу / flex вверх / free в воздухе. Ладони — по опоре или захвату.
 */
import { draw, svgDocument } from './figure.mjs';

const { leg, arm, torso, shortsFrame, head, headFront, shadow, groundLine } = draw;

function doc(parts) {
  return svgDocument([groundLine(), ...parts].join('\n'));
}

/** Бхуджапидасана: бёдра на плечах, стопы скрещены впереди, ладони на полу, пальцы вперёд. */
export function bhujapidasana() {
  return doc([
    shadow(104, 46),
    arm([86, 112], [76, 138], [72, 158], { far: true, hand: 'flat', fingers: 1 }),
    leg([98, 108], [140, 92], [112, 118], { far: true, foot: 'free', toe: -1 }),
    leg([106, 112], [152, 116], [124, 132], { foot: 'free', toe: 1 }),
    torso([
      [74, 104],
      [96, 92],
      [118, 100],
      [124, 116],
      [110, 128],
      [88, 124],
      [72, 114],
    ]),
    shortsFrame([102, 114], [0.25, -0.97], [0.7, 0.72], { rise: 11, hem: 12, half: 12, cheek: 13 }),
    arm([114, 110], [124, 136], [120, 158], { hand: 'flat', fingers: 1 }),
    head([132, 96], [0.72, 0.7], [0.45, -0.89], [118, 102]),
  ]);
}

/** Курмасана: ноги врозь, руки под коленями, подбородок к полу, носки вверх. */
export function kurmasana() {
  return doc([
    shadow(100, 72),
    leg([92, 148], [54, 154], [26, 158], { far: true, foot: 'flex', toe: -1 }),
    leg([108, 148], [146, 154], [174, 158], { foot: 'flex', toe: 1 }),
    arm([88, 134], [50, 148], [34, 158], { far: true, hand: 'flat', fingers: -1 }),
    torso([
      [76, 126],
      [124, 126],
      [118, 144],
      [108, 156],
      [92, 156],
      [82, 144],
    ]),
    shortsFrame([100, 152], [0, -1], [1, 0], { rise: 11, hem: 12, half: 13, cheek: 12 }),
    arm([112, 134], [150, 148], [166, 158], { hand: 'flat', fingers: 1 }),
    headFront([100, 146], [100, 128], [0, 1]),
  ]);
}

/** Супта Курмасана: стопы скрещены за головой, замок рук на спине отдельно от стоп, лоб к полу. */
export function suptaKurmasana() {
  return doc([
    shadow(100, 58),
    arm([86, 118], [64, 108], [98, 114], { far: true, hand: 'hold' }),
    torso([
      [78, 112],
      [122, 112],
      [116, 136],
      [108, 154],
      [92, 154],
      [84, 136],
    ]),
    shortsFrame([100, 128], [0, -1], [1, 0], { rise: 6, hem: 5, half: 10, cheek: 6 }),
    arm([114, 118], [136, 108], [104, 114], { hand: 'hold' }),
    headFront([100, 156], [100, 142], [0, 1]),
    leg([92, 136], [36, 78], [86, 124], { far: true, foot: 'free', toe: 1 }),
    leg([108, 136], [164, 78], [114, 120], { foot: 'free', toe: -1 }),
  ]);
}

/** Гарбха Пиндасана: лотос, руки продеты, ладони в замке, круглый баланс на седалищных. */
export function garbhaPindasana() {
  return doc([
    shadow(100, 36),
    leg([94, 146], [68, 118], [100, 108], { far: true, foot: 'free', toe: -1 }),
    leg([104, 148], [132, 122], [98, 114], { foot: 'free', toe: 1 }),
    arm([88, 114], [70, 128], [98, 138], { far: true, hand: 'hold' }),
    torso([
      [76, 106],
      [96, 98],
      [110, 116],
      [112, 142],
      [98, 154],
      [80, 148],
      [72, 124],
    ]),
    shortsFrame([98, 148], [-0.15, -0.99], [0.85, -0.2], { rise: 12, hem: 13, half: 12, cheek: 13 }),
    arm([106, 112], [128, 124], [106, 140], { hand: 'hold' }),
    head([78, 88], [0.86, 0.51], [-0.15, -0.99], [86, 104]),
  ]);
}

/** Куккутасана: лотос поднят, руки продеты, ладони на полу. */
export function kukkutasana() {
  return doc([
    shadow(100, 40),
    arm([94, 92], [84, 126], [80, 158], { far: true, hand: 'flat', fingers: -1 }),
    arm([106, 92], [116, 126], [120, 158], { hand: 'flat', fingers: 1 }),
    torso([
      [86, 52],
      [114, 52],
      [112, 88],
      [106, 104],
      [94, 104],
      [88, 88],
    ]),
    shortsFrame([100, 100], [0, -1], [1, 0], { rise: 7, hem: 5, half: 10, cheek: 6 }),
    leg([98, 108], [62, 118], [114, 138], { far: true, foot: 'free', toe: 1 }),
    leg([106, 110], [138, 122], [88, 142], { foot: 'free', toe: -1 }),
    headFront([100, 36], [100, 50], [0, 1]),
  ]);
}

/** Баддха Конасана А: стопы вместе, колени врозь, наклон с прямой спиной, захват стоп. */
export function baddhaKonasanaA() {
  return doc([
    shadow(100, 52),
    leg([94, 142], [48, 154], [90, 158], { far: true, foot: 'flex', toe: -1 }),
    leg([106, 142], [152, 154], [114, 158], { foot: 'flex', toe: 1 }),
    arm([90, 86], [68, 122], [92, 152], { far: true, hand: 'hold' }),
    torso([
      [86, 68],
      [114, 68],
      [116, 108],
      [108, 144],
      [92, 144],
      [84, 108],
    ]),
    shortsFrame([100, 142], [0, -1], [1, 0], { rise: 12, hem: 13, half: 13, cheek: 13 }),
    arm([110, 86], [132, 122], [112, 152], { hand: 'hold' }),
    headFront([100, 50], [100, 66], [0, 1]),
  ]);
}

/** Баддха Конасана Б: те же ноги, глубокий наклон, подбородок к стопам. */
export function baddhaKonasanaB() {
  return doc([
    shadow(100, 52),
    leg([94, 146], [48, 154], [90, 158], { far: true, foot: 'flex', toe: -1 }),
    leg([106, 146], [152, 154], [114, 158], { foot: 'flex', toe: 1 }),
    arm([92, 112], [70, 132], [92, 152], { far: true, hand: 'hold' }),
    torso([
      [78, 108],
      [122, 108],
      [116, 136],
      [108, 152],
      [92, 152],
      [84, 136],
    ]),
    shortsFrame([100, 148], [0, -1], [1, 0], { rise: 11, hem: 12, half: 13, cheek: 12 }),
    arm([108, 112], [130, 132], [112, 152], { hand: 'hold' }),
    headFront([100, 128], [100, 114], [0, 1]),
  ]);
}

/** Упавишта Конасана: широкие прямые ноги, наклон, захват больших пальцев. */
export function upavishtaKonasana() {
  return doc([
    shadow(100, 70),
    leg([92, 148], [56, 154], [28, 158], { far: true, foot: 'flex', toe: -1 }),
    leg([108, 148], [144, 154], [172, 158], { foot: 'flex', toe: 1 }),
    arm([88, 108], [52, 130], [32, 150], { far: true, hand: 'hold' }),
    torso([
      [78, 100],
      [122, 100],
      [116, 132],
      [108, 150],
      [92, 150],
      [84, 132],
    ]),
    shortsFrame([100, 148], [0, -1], [1, 0], { rise: 11, hem: 12, half: 13, cheek: 12 }),
    arm([112, 108], [148, 130], [168, 150], { hand: 'hold' }),
    headFront([100, 118], [100, 104], [0, 1]),
  ]);
}

/** Супта Конасана: стойка на плечах, ноги врозь, пальцы ног на полу. */
export function suptaKonasana() {
  return doc([
    shadow(100, 68),
    leg([94, 64], [56, 112], [30, 158], { far: true, foot: 'flat', toe: -1 }),
    leg([106, 64], [144, 112], [170, 158], { foot: 'flat', toe: 1 }),
    arm([90, 118], [52, 138], [34, 154], { far: true, hand: 'hold' }),
    torso([
      [86, 128],
      [114, 128],
      [110, 78],
      [100, 56],
      [90, 78],
      [84, 128],
    ]),
    shortsFrame([100, 62], [0, 1], [1, 0], { rise: 12, hem: 13, half: 12, cheek: 12 }),
    arm([110, 118], [148, 138], [166, 154], { hand: 'hold' }),
    headFront([100, 148], [100, 132], [0, -1]),
  ]);
}

/** Супта Падангуштхасана: лёжа, одна нога вверх, захват большого пальца, вторая на полу. */
export function suptaPadangusthasana() {
  return doc([
    shadow(112, 56),
    leg([108, 148], [138, 154], [168, 158], { far: true, foot: 'flex', toe: 1 }),
    leg([104, 140], [112, 96], [116, 50], { foot: 'freeFlex', toe: 1 }),
    arm([66, 140], [84, 148], [104, 154], { far: true, hand: 'hang' }),
    torso([
      [56, 132],
      [78, 128],
      [108, 132],
      [114, 146],
      [100, 154],
      [72, 152],
      [54, 142],
    ]),
    shortsFrame([108, 146], [-1, 0.05], [0.05, -1], { rise: 12, hem: 13, half: 12, cheek: 13 }),
    arm([72, 132], [94, 86], [114, 54], { hand: 'hold' }),
    head([42, 136], [0.2, -0.98], [-1, 0], [56, 136]),
  ]);
}

/** Убхая Падангуштхасана: баланс на седалищных, обе ноги вверх, захват больших пальцев. */
export function ubhayaPadangusthasana() {
  return doc([
    shadow(96, 32),
    leg([94, 146], [118, 100], [140, 54], { far: true, foot: 'freeFlex', toe: 1 }),
    leg([100, 148], [124, 104], [146, 58], { foot: 'freeFlex', toe: 1 }),
    torso([
      [62, 108],
      [80, 100],
      [100, 128],
      [104, 150],
      [90, 154],
      [72, 136],
      [60, 118],
    ]),
    shortsFrame([98, 150], [-0.5, -0.87], [0.75, -0.35], { rise: 12, hem: 13, half: 12, cheek: 13 }),
    arm([70, 110], [102, 80], [136, 56], { far: true, hand: 'hold' }),
    arm([78, 112], [110, 84], [142, 60], { hand: 'hold' }),
    head([56, 94], [0.72, -0.69], [-0.4, -0.92], [68, 106]),
  ]);
}

/** Урдхва Мукха Пашчимоттанасана: ноги и корпус вверх, грудь к бёдрам, ладони на стопах. */
export function urdhvaMukhaPaschimottanasana() {
  return doc([
    shadow(100, 30),
    leg([98, 146], [114, 96], [126, 46], { far: true, foot: 'freeFlex', toe: 1 }),
    leg([104, 148], [118, 100], [130, 50], { foot: 'freeFlex', toe: 1 }),
    torso([
      [72, 86],
      [88, 78],
      [104, 118],
      [106, 150],
      [92, 154],
      [78, 132],
      [70, 100],
    ]),
    shortsFrame([102, 150], [-0.25, -0.97], [0.9, -0.15], { rise: 12, hem: 13, half: 12, cheek: 13 }),
    arm([80, 88], [104, 64], [124, 48], { far: true, hand: 'hold' }),
    arm([88, 90], [110, 68], [128, 52], { hand: 'hold' }),
    head([68, 70], [0.55, -0.84], [-0.2, -0.98], [76, 86]),
  ]);
}

/** Сету Бандхасана: макушка на полу, таз вверх, колени согнуты, захват лодыжек. */
export function setuBandhasana() {
  return doc([
    shadow(110, 50),
    leg([122, 112], [146, 134], [150, 158], { far: true, foot: 'flat', toe: 1 }),
    leg([130, 116], [154, 136], [158, 158], { foot: 'flat', toe: 1 }),
    arm([84, 128], [112, 146], [144, 156], { far: true, hand: 'hold' }),
    torso([
      [76, 136],
      [100, 112],
      [124, 100],
      [138, 114],
      [122, 128],
      [96, 136],
      [74, 146],
    ]),
    shortsFrame([132, 108], [-0.45, 0.89], [0.1, -0.99], { rise: 8, hem: 8, half: 11, cheek: 10 }),
    arm([92, 124], [120, 142], [150, 152], { hand: 'hold' }),
    head([60, 150], [-0.15, -0.99], [-0.9, 0.35], [76, 138]),
  ]);
}

export const FILES = [
  ['42-bhujapidasana', bhujapidasana],
  ['43-kurmasana', kurmasana],
  ['44-supta-kurmasana', suptaKurmasana],
  ['45-garbha-pindasana', garbhaPindasana],
  ['46-kukkutasana', kukkutasana],
  ['47-baddha-konasana-a', baddhaKonasanaA],
  ['48-baddha-konasana-b', baddhaKonasanaB],
  ['49-upavishta-konasana', upavishtaKonasana],
  ['50-supta-konasana', suptaKonasana],
  ['51-supta-padangusthasana', suptaPadangusthasana],
  ['52-ubhaya-padangusthasana', ubhayaPadangusthasana],
  ['53-urdhva-mukha-paschimottanasana', urdhvaMukhaPaschimottanasana],
  ['54-setu-bandhasana', setuBandhasana],
];
