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

/** Бхуджапидасана: ¾, бёдра лежат на плечах рук, голени скрещены назад-вниз над полом, ладони на полу. */
export function bhujapidasana() {
  return doc([
    shadow(100, 44),
    arm([104, 114], [90, 138], [100, 158], { far: true, hand: 'flat', fingers: 1 }),
    torso([
      [74, 110],
      [92, 98],
      [114, 104],
      [122, 118],
      [100, 128],
      [78, 124],
    ]),
    thigh([80, 118], [114, 112], { far: true }),
    arm([112, 118], [98, 140], [110, 158], { hand: 'flat', fingers: 1 }),
    thigh([84, 122], [122, 118]),
    shortsFrame([82, 118], [0.92, -0.38], [0.38, 0.92], {
      rise: 8,
      half: 8.8,
      thighs: [[[84, 122], [122, 118]], [[80, 118], [114, 112]]],
      legLen: 18,
      inline: true,
    }),
    shin([114, 112], [86, 134], { far: true, foot: 'lotus', toe: -1 }),
    shin([122, 118], [94, 138], { foot: 'lotus', toe: -1 }),
    head([136, 122], [0.95, 0.3], [0.45, -0.89], [118, 116]),
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
 * Супта Курмасана, профиль. Корпус низко к полу, лоб на полу.
 * Ноги под плечами, стопы скрещены за шеей/головой. Замок рук на пояснице.
 */
export function suptaKurmasana() {
  return doc([
    shadow(114, 50),
    arm([92, 146], [74, 142], [86, 136], { far: true, hand: 'hold' }),
    torso([
      [68, 154],
      [90, 142],
      [118, 146],
      [136, 156],
      [128, 166],
      [98, 166],
      [72, 162],
    ]),
    leg([92, 152], [116, 128], [140, 142], { far: true, foot: 'lotus', toe: 1 }),
    leg([100, 156], [124, 134], [146, 146], { foot: 'lotus', toe: 1 }),
    shortsFrame([94, 156], [0.96, -0.15], [0.15, 0.96], {
      rise: 8,
      half: 9,
      thighs: [[[100, 156], [124, 134]], [[92, 152], [116, 128]]],
      legLen: 16,
      inline: true,
    }),
    arm([100, 148], [80, 144], [90, 138], { hand: 'hold' }),
    head([154, 157], [0.4, 0.92], [0.92, 0.3], [136, 154]),
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

/** Баддха Конасана А: стопы вместе, колени врозь, наклон вперёд с прямой спиной, захват стоп. */
export function baddhaKonasanaA() {
  return doc([
    shadow(100, 54),
    thigh([92, 146], [48, 158], { far: true }),
    thigh([108, 146], [152, 158]),
    shin([48, 158], [94, 158], { far: true, foot: 'lotus', toe: 1 }),
    shin([152, 158], [106, 158], { foot: 'lotus', toe: -1 }),
    torso([
      [84, 106],
      [100, 100],
      [116, 106],
      [113, 128],
      [110, 146],
      [90, 146],
      [87, 128],
    ]),
    shortsFrame([100, 144], [0, -1], [1, 0], {
      rise: 9,
      half: 11,
      sym: true,
      crotch: 6,
      thighs: [[[108, 146], [152, 158]], [[92, 146], [48, 158]]],
      legLen: 18,
      inline: true,
    }),
    arm([84, 110], [72, 130], [92, 154], { far: true, hand: 'hold' }),
    arm([116, 110], [128, 130], [108, 154], { hand: 'hold' }),
    headFront([100, 92], [100, 106], [0, 1]),
  ]);
}

/** Баддха Конасана Б: те же ноги, глубокий наклон с округлой спиной, голова к стопам. */
export function baddhaKonasanaB() {
  return doc([
    shadow(100, 54),
    thigh([92, 148], [48, 158], { far: true }),
    thigh([108, 148], [152, 158]),
    shin([48, 158], [94, 158], { far: true, foot: 'lotus', toe: 1 }),
    shin([152, 158], [106, 158], { foot: 'lotus', toe: -1 }),
    torso([
      [82, 120],
      [100, 116],
      [118, 120],
      [114, 138],
      [110, 150],
      [90, 150],
      [86, 138],
    ]),
    shortsFrame([100, 146], [0, -1], [1, 0], {
      rise: 9,
      half: 11,
      sym: true,
      crotch: 6,
      thighs: [[[108, 148], [152, 158]], [[92, 148], [48, 158]]],
      legLen: 18,
      inline: true,
    }),
    arm([84, 124], [64, 136], [92, 154], { far: true, hand: 'hold' }),
    arm([116, 124], [136, 136], [108, 154], { hand: 'hold' }),
    headFront([100, 140], [100, 128], [0, 1]),
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

/** Супта Падангуштхасана: лёжа на полу, одна нога вверх, захват большого пальца, вторая на полу. */
export function suptaPadangusthasana() {
  return doc([
    shadow(112, 56),
    leg([108, 158], [138, 161], [168, 162], { far: true, foot: 'flex', toe: 1 }),
    leg([104, 154], [112, 106], [116, 56], { foot: 'freeFlex', toe: 1 }),
    torso([
      [56, 150],
      [78, 146],
      [108, 150],
      [114, 160],
      [100, 167],
      [72, 167],
      [54, 162],
    ]),
    shortsFrame([104, 156], [-1, 0.05], [0.05, -1], {
      rise: 8,
      half: 9.5,
      thighs: [[[104, 154], [112, 106]], [[108, 158], [138, 161]]],
      legLen: 18,
      inline: true,
    }),
    arm([68, 152], [86, 154], [104, 156], { far: true, hand: 'hang' }),
    arm([74, 150], [96, 102], [114, 60], { hand: 'hold' }),
    head([42, 157], [0.2, -0.98], [-1, 0], [56, 156]),
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

/** Урдхва Мукха Пашчимоттанасана: грудь прижата к почти вертикальным ногам, лицо вверх, ладони на стопах. */
export function urdhvaMukhaPaschimottanasana() {
  return doc([
    shadow(100, 28),
    leg([102, 150], [108, 100], [114, 50], { far: true, foot: 'freeFlex', toe: 1 }),
    leg([108, 152], [114, 102], [120, 52], { foot: 'freeFlex', toe: 1 }),
    torso([
      [86, 88],
      [98, 86],
      [108, 124],
      [108, 154],
      [94, 158],
      [84, 134],
      [82, 100],
    ]),
    shortsFrame([100, 150], [-0.15, -0.99], [0.95, -0.1], {
      rise: 8,
      half: 9,
      thighs: [[[108, 152], [114, 102]], [[102, 150], [108, 100]]],
      legLen: 18,
      inline: true,
    }),
    arm([90, 92], [102, 68], [114, 50], { far: true, hand: 'hold' }),
    arm([96, 94], [108, 70], [120, 52], { hand: 'hold' }),
    head([86, 72], [0.45, -0.89], [-0.15, -0.99], [90, 88]),
  ]);
}

/** Сету Бандхасана: макушка на полу, таз вверх, колени согнуты, захват лодыжек. */
export function setuBandhasana() {
  return doc([
    shadow(110, 50),
    leg([122, 114], [146, 134], [150, 158], { far: true, foot: 'flat', toe: 1 }),
    leg([130, 118], [154, 138], [158, 158], { foot: 'flat', toe: 1 }),
    arm([84, 134], [112, 148], [144, 156], { far: true, hand: 'hold' }),
    torso([
      [76, 142],
      [100, 116],
      [124, 104],
      [138, 118],
      [122, 130],
      [96, 140],
      [74, 152],
    ]),
    shortsFrame([126, 116], [-0.85, 0.52], [0.52, 0.85], {
      rise: 8,
      half: 9,
      thighs: [[[130, 118], [154, 138]], [[122, 114], [146, 134]]],
      legLen: 17,
      inline: true,
    }),
    arm([92, 130], [120, 144], [150, 152], { hand: 'hold' }),
    head([60, 157], [-0.15, -0.99], [-0.9, 0.35], [76, 144]),
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
