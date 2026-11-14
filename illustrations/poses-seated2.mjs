/**
 * Сидячие первой серии, часть 2: от Бхуджапидасаны до Сету Бандхасаны.
 * Профиль лицом в +x, если жест читается сбоку; широкие и лотос — фронтально.
 * Стопы: плоско на полу / flex вверх / free в воздухе. Ладони — по опоре или захвату.
 */
import { draw, svgDocument } from './figure.mjs';

const { leg, thigh, shin, arm, torso, shortsFrame, head, headFront, shadow, groundLine } = draw;

function doc(parts) {
  return svgDocument([groundLine(), ...parts].join('\n'));
}

/** Бхуджапидасана: бёдра на плечах, стопы скрещены впереди, ладони на полу, пальцы вперёд. */
/** Бхуджапидасана: ¾, бёдра на плечах, стопы скрещены впереди, ладони на полу. */
export function bhujapidasana() {
  return doc([
    shadow(96, 44),
    arm([84, 112], [78, 136], [74, 158], { far: true, hand: 'flat', fingers: 1 }),
    leg([92, 102], [124, 96], [108, 118], { far: true, foot: 'lotus', toe: -1 }),
    torso([
      [70, 108],
      [86, 92],
      [108, 96],
      [122, 108],
      [116, 122],
      [98, 126],
      [78, 116],
    ]),
    arm([108, 108], [114, 134], [118, 158], { hand: 'flat', fingers: 1 }),
    leg([104, 108], [140, 112], [116, 134], { foot: 'lotus', toe: 1 }),
    shortsFrame([98, 112], [0.35, -0.94], [0.95, 0.1], {
      rise: 8,
      half: 9,
      thighs: [[[104, 108], [140, 112]], [[92, 102], [124, 96]]],
      legLen: 18,
      inline: true,
    }),
    head([128, 100], [0.92, 0.35], [0.35, -0.94], [114, 98]),
  ]);
}

/** Курмасана: ноги врозь, руки под коленями, подбородок к полу, носки вверх. */
export function kurmasana() {
  return doc([
    shadow(100, 72),
    arm([82, 146], [48, 154], [24, 158], { far: true, hand: 'flat', fingers: -1 }),
    arm([118, 146], [152, 154], [176, 158], { hand: 'flat', fingers: 1 }),
    leg([92, 134], [52, 144], [18, 158], { far: true, foot: 'flex', toe: -1 }),
    leg([108, 134], [148, 144], [182, 158], { foot: 'flex', toe: 1 }),
    torso([
      [82, 124],
      [118, 124],
      [120, 144],
      [112, 156],
      [88, 156],
      [80, 144],
    ]),
    shortsFrame([100, 130], [0, -1], [1, 0], {
      rise: 7,
      half: 10,
      sym: true,
      crotch: 5,
      thighs: [[[108, 134], [148, 144]], [[92, 134], [52, 144]]],
      legLen: 18,
      inline: true,
    }),
    headFront([100, 160], [100, 148], [0, 1]),
  ]);
}

/**
 * Супта Курмасана, профиль. Лоб к полу.
 * Ноги через плечи, стопы одна за другой у головы.
 * Замок рук на пояснице, отдельно от стоп.
 */
export function suptaKurmasana() {
  return doc([
    shadow(118, 46),
    arm([78, 134], [68, 130], [88, 128], { far: true, hand: 'hold' }),
    torso([
      [68, 144],
      [86, 128],
      [112, 132],
      [132, 146],
      [124, 160],
      [100, 164],
      [76, 154],
    ]),
    leg([92, 140], [112, 108], [130, 126], { far: true, foot: 'lotus', toe: 1 }),
    leg([102, 146], [122, 118], [140, 136], { foot: 'lotus', toe: 1 }),
    shortsFrame([96, 150], [0.95, -0.15], [0.15, 1], {
      rise: 8,
      half: 9,
      thighs: [[[102, 146], [122, 118]], [[92, 140], [112, 108]]],
      legLen: 16,
      inline: true,
    }),
    arm([94, 136], [78, 136], [88, 132], { hand: 'hold' }),
    head([150, 150], [0.45, 0.89], [0.9, 0.35], [134, 142]),
  ]);
}

/** Гарбха Пиндасана: лотос, руки продеты к лицу, круглый баланс на седалищных. */
export function garbhaPindasana() {
  return doc([
    shadow(100, 36),
    torso([
      [80, 86],
      [100, 82],
      [120, 86],
      [114, 118],
      [110, 140],
      [90, 140],
      [86, 118],
    ]),
    thigh([90, 140], [64, 126], { far: true }),
    thigh([110, 140], [136, 126]),
    shortsFrame([100, 139], [0, -1], [1, 0], {
      rise: 9,
      half: 12,
      sym: true,
      crotch: 5.5,
      thighs: [[[110, 140], [136, 126]], [[90, 140], [64, 126]]],
      legLen: 16,
      inline: true,
    }),
    arm([80, 92], [74, 122], [90, 84], { far: true, hand: 'prayer' }),
    arm([120, 92], [126, 122], [110, 84], { hand: 'prayer' }),
    shin([64, 126], [114, 132], { far: true, foot: 'lotus', toe: 1 }),
    shin([136, 126], [86, 132], { foot: 'lotus', toe: -1 }),
    headFront([100, 70], [100, 86], [0, 1]),
  ]);
}

/** Куккутасана: лотос поднят на руках, руки продеты между бёдрами и голенями, ладони на полу. */
export function kukkutasana() {
  return doc([
    shadow(100, 42),
    torso([
      [80, 58],
      [100, 52],
      [120, 58],
      [114, 90],
      [108, 108],
      [92, 108],
      [86, 90],
    ]),
    thigh([92, 106], [62, 122], { far: true }),
    thigh([108, 106], [138, 122]),
    shortsFrame([100, 104], [0, -1], [1, 0], {
      rise: 9,
      half: 10.5,
      sym: true,
      thighs: [[[108, 106], [138, 122]], [[92, 106], [62, 122]]],
      legLen: 15,
      inline: true,
    }),
    arm([80, 64], [78, 112], [78, 158], { hand: 'flat', fingers: -1 }),
    arm([120, 64], [122, 112], [122, 158], { hand: 'flat', fingers: 1 }),
    shin([62, 122], [114, 114], { far: true, foot: 'lotus', toe: 1 }),
    shin([138, 122], [86, 114], { foot: 'lotus', toe: -1 }),
    headFront([100, 38], [100, 54], [0, 1]),
  ]);
}

/** Баддха Конасана А: стопы вместе, колени врозь, прямая спина, захват стоп. */
export function baddhaKonasanaA() {
  return doc([
    shadow(100, 54),
    leg([92, 142], [48, 154], [90, 158], { far: true, foot: 'flex', toe: -1 }),
    leg([108, 142], [152, 154], [114, 158], { foot: 'flex', toe: 1 }),
    torso([
      [82, 80],
      [100, 74],
      [118, 80],
      [114, 112],
      [110, 142],
      [90, 142],
      [86, 112],
    ]),
    shortsFrame([100, 140], [0, -1], [1, 0], {
      rise: 9,
      half: 11,
      sym: true,
      crotch: 6,
      thighs: [[[108, 142], [152, 154]], [[92, 142], [48, 154]]],
      legLen: 18,
      inline: true,
    }),
    arm([82, 86], [76, 122], [90, 152], { far: true, hand: 'hold' }),
    arm([118, 86], [124, 122], [110, 152], { hand: 'hold' }),
    headFront([100, 56], [100, 80], [0, 1]),
  ]);
}

/** Баддха Конасана Б: те же ноги, глубокий наклон, подбородок к полу. */
export function baddhaKonasanaB() {
  return doc([
    shadow(100, 54),
    leg([92, 146], [48, 154], [90, 158], { far: true, foot: 'flex', toe: -1 }),
    leg([108, 146], [152, 154], [114, 158], { foot: 'flex', toe: 1 }),
    torso([
      [82, 112],
      [100, 108],
      [118, 112],
      [114, 134],
      [110, 150],
      [90, 150],
      [86, 134],
    ]),
    shortsFrame([100, 146], [0, -1], [1, 0], {
      rise: 9,
      half: 11,
      sym: true,
      crotch: 6,
      thighs: [[[108, 146], [152, 154]], [[92, 146], [48, 154]]],
      legLen: 18,
      inline: true,
    }),
    arm([84, 118], [64, 132], [90, 152], { far: true, hand: 'hold' }),
    arm([116, 118], [136, 132], [110, 152], { hand: 'hold' }),
    headFront([100, 134], [100, 124], [0, 1]),
  ]);
}

/** Упавишта Конасана: широкие прямые ноги, наклон, захват больших пальцев. */
export function upavishtaKonasana() {
  return doc([
    shadow(100, 70),
    leg([92, 148], [56, 154], [28, 158], { far: true, foot: 'flex', toe: -1 }),
    leg([108, 148], [144, 154], [172, 158], { foot: 'flex', toe: 1 }),
    torso([
      [76, 128],
      [124, 128],
      [116, 148],
      [108, 162],
      [92, 162],
      [84, 148],
    ]),
    shortsFrame([100, 152], [0, -1], [1, 0], {
      rise: 8,
      half: 11,
      sym: true,
      crotch: 5,
      thighs: [[[108, 148], [144, 154]], [[92, 148], [56, 154]]],
      legLen: 19,
      inline: true,
    }),
    arm([88, 132], [48, 146], [30, 156], { far: true, hand: 'hold' }),
    arm([112, 130], [150, 146], [170, 154], { hand: 'hold' }),
    headFront([100, 146], [100, 132], [0, 1]),
  ]);
}

/** Супта Конасана: стойка на плечах, ноги врозь, пальцы ног на полу. */
export function suptaKonasana() {
  return doc([
    shadow(100, 68),
    leg([94, 64], [56, 112], [30, 158], { far: true, foot: 'flat', toe: -1 }),
    leg([106, 64], [144, 112], [170, 158], { foot: 'flat', toe: 1 }),
    arm([88, 126], [50, 142], [34, 156], { far: true, hand: 'hold' }),
    torso([
      [82, 128],
      [86, 146],
      [88, 156],
      [112, 156],
      [114, 146],
      [118, 128],
      [114, 82],
      [100, 56],
      [86, 82],
    ]),
    shortsFrame([100, 66], [0, 1], [1, 0], {
      rise: 9,
      half: 11,
      sym: true,
      crotch: 5,
      thighs: [[[106, 64], [144, 112]], [[94, 64], [56, 112]]],
      legLen: 20,
      inline: true,
    }),
    arm([112, 126], [150, 142], [166, 156], { hand: 'hold' }),
    headFront([100, 158], [100, 146], [0, -1]),
  ]);
}

/** Супта Падангуштхасана: лёжа, одна нога вверх, захват большого пальца, вторая на полу. */
export function suptaPadangusthasana() {
  return doc([
    shadow(112, 56),
    leg([108, 148], [138, 154], [168, 158], { far: true, foot: 'flex', toe: 1 }),
    leg([104, 140], [112, 96], [116, 50], { foot: 'freeFlex', toe: 1 }),
    torso([
      [56, 132],
      [78, 128],
      [108, 132],
      [114, 146],
      [100, 154],
      [72, 152],
      [54, 142],
    ]),
    shortsFrame([104, 144], [-1, 0.05], [0.05, -1], {
      rise: 8,
      half: 9.5,
      thighs: [[[104, 140], [112, 96]], [[108, 148], [138, 154]]],
      legLen: 18,
      inline: true,
    }),
    arm([66, 134], [84, 138], [102, 142], { far: true, hand: 'hang' }),
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
    shortsFrame([96, 146], [-0.5, -0.87], [0.75, -0.35], {
      rise: 8,
      half: 9,
      thighs: [[[100, 148], [124, 104]], [[94, 146], [118, 100]]],
      legLen: 18,
      inline: true,
    }),
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
    shortsFrame([98, 148], [-0.25, -0.97], [0.9, -0.15], {
      rise: 8,
      half: 9,
      thighs: [[[104, 148], [118, 100]], [[98, 146], [114, 96]]],
      legLen: 18,
      inline: true,
    }),
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
    shortsFrame([126, 112], [-0.85, 0.52], [0.52, 0.85], {
      rise: 8,
      half: 9,
      thighs: [[[130, 116], [154, 136]], [[122, 112], [146, 134]]],
      legLen: 17,
      inline: true,
    }),
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
