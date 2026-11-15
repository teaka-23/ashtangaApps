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

/** Бхуджапидасана: ¾, бёдра высоко на плечах, голени скрещены в воздухе под грудью, ладони на полу. */
export function bhujapidasana() {
  return doc([
    shadow(100, 44),
    arm([104, 108], [92, 134], [100, 158], { far: true, hand: 'flat', fingers: 1 }),
    torso([
      [78, 104],
      [94, 92],
      [114, 98],
      [122, 112],
      [100, 120],
      [80, 116],
    ]),
    thigh([80, 112], [114, 106], { far: true, underShorts: true }),
    arm([112, 112], [100, 136], [110, 158], { hand: 'flat', fingers: 1 }),
    thigh([84, 116], [122, 112], { underShorts: true }),
    shortsFrame([84, 111], [0.92, -0.38], [0.38, 0.92], {
      rise: 9,
      half: 10,
      thighs: [[[84, 116], [122, 112]], [[80, 112], [114, 106]]],
      legLen: 15,
      inline: true,
    }),
    shin([114, 106], [88, 126], { far: true, foot: 'lotus', toe: -1 }),
    shin([122, 112], [96, 130], { foot: 'lotus', toe: -1 }),
    head([136, 116], [0.95, 0.3], [0.45, -0.89], [118, 110]),
  ]);
}

/** Курмасана: ноги врозь, руки под коленями, подбородок к полу, носки вверх. */
export function kurmasana() {
  return doc([
    shadow(100, 72),
    arm([82, 146], [48, 154], [24, 158], { far: true, hand: 'flat', fingers: -1 }),
    arm([118, 146], [152, 154], [176, 158], { hand: 'flat', fingers: 1 }),
    leg([92, 134], [52, 144], [18, 158], { far: true, foot: 'flex', toe: -1, underShorts: true }),
    leg([108, 134], [148, 144], [182, 158], { foot: 'flex', toe: 1, underShorts: true }),
    torso([
      [82, 124],
      [118, 124],
      [120, 144],
      [112, 156],
      [88, 156],
      [80, 144],
    ]),
    shortsFrame([100, 130], [0, -1], [1, 0], {
      rise: 9,
      half: 11.5,
      sym: true,
      crotch: 6.5,
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
      [76, 154],
      [92, 142],
      [118, 146],
      [136, 156],
      [128, 166],
      [98, 164],
      [78, 160],
    ]),
    leg([92, 152], [116, 128], [140, 142], { far: true, foot: 'lotus', toe: 1, underShorts: true }),
    leg([100, 156], [124, 134], [146, 146], { foot: 'lotus', toe: 1, underShorts: true }),
    shortsFrame([93, 155], [0.96, -0.15], [0.15, 0.96], {
      rise: 9,
      half: 10,
      thighs: [[[100, 156], [124, 134]], [[92, 152], [116, 128]]],
      legLen: 15,
      inline: true,
    }),
    arm([100, 148], [80, 144], [90, 138], { hand: 'hold' }),
    head([154, 157], [0.4, 0.92], [0.92, 0.3], [136, 154]),
  ]);
}

/** Гарбха Пиндасана: лотос, руки продеты сквозь ноги к лицу, баланс на седалищных. */
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
    thigh([90, 138], [62, 116], { far: true, underShorts: true }),
    thigh([110, 138], [138, 116], { underShorts: true }),
    shortsFrame([100, 137], [0, -1], [1, 0], {
      rise: 9,
      half: 12,
      sym: true,
      crotch: 7.0,
      thighs: [[[110, 138], [138, 116]], [[90, 138], [62, 116]]],
      legLen: 15,
      inline: true,
    }),
    arm([82, 92], [72, 124], [88, 82], { far: true, hand: 'prayer' }),
    arm([118, 92], [128, 124], [112, 82], { hand: 'prayer' }),
    shin([62, 116], [114, 126], { far: true, foot: 'lotus', toe: 1 }),
    shin([138, 116], [86, 126], { foot: 'lotus', toe: -1 }),
    headFront([100, 68], [100, 86], [0, 1]),
  ]);
}

/** Куккутасана: лотос поднят на руках, руки продеты между бёдрами и голенями внутри колен, ладони на полу. */
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
    thigh([92, 106], [56, 116], { far: true, underShorts: true }),
    thigh([108, 106], [144, 116], { underShorts: true }),
    shortsFrame([100, 104], [0, -1], [1, 0], {
      rise: 9,
      half: 10.5,
      sym: true,
      thighs: [[[108, 106], [144, 116]], [[92, 106], [56, 116]]],
      legLen: 15,
      inline: true,
    }),
    arm([82, 64], [80, 112], [82, 158], { hand: 'flat', fingers: -1 }),
    arm([118, 64], [120, 112], [118, 158], { hand: 'flat', fingers: 1 }),
    shin([56, 116], [114, 110], { far: true, foot: 'lotus', toe: 1 }),
    shin([144, 116], [86, 110], { foot: 'lotus', toe: -1 }),
    headFront([100, 38], [100, 54], [0, 1]),
  ]);
}

/** Баддха Конасана А: стопы вместе, колени врозь, наклон вперёд с прямой спиной, захват стоп. */
export function baddhaKonasanaA() {
  return doc([
    shadow(100, 54),
    thigh([92, 146], [48, 158], { far: true, underShorts: true }),
    thigh([108, 146], [152, 158], { underShorts: true }),
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
      rise: 10,
      half: 12,
      sym: true,
      crotch: 6.5,
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
    thigh([92, 148], [48, 158], { far: true, underShorts: true }),
    thigh([108, 148], [152, 158], { underShorts: true }),
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
      half: 11.5,
      sym: true,
      crotch: 7.0,
      thighs: [[[108, 148], [152, 158]], [[92, 148], [48, 158]]],
      legLen: 15,
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
    leg([92, 148], [56, 154], [28, 158], { far: true, foot: 'flex', toe: -1, underShorts: true }),
    leg([108, 148], [144, 154], [172, 158], { foot: 'flex', toe: 1, underShorts: true }),
    torso([
      [78, 124],
      [122, 124],
      [118, 140],
      [110, 150],
      [90, 150],
      [82, 140],
    ]),
    shortsFrame([100, 152], [0, -1], [1, 0], {
      rise: 11,
      half: 12.5,
      sym: true,
      crotch: 6.8,
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
    leg([94, 64], [56, 112], [30, 158], { far: true, foot: 'flat', toe: -1, underShorts: true }),
    leg([106, 64], [144, 112], [170, 158], { foot: 'flat', toe: 1, underShorts: true }),
    arm([88, 126], [50, 142], [34, 156], { far: true, hand: 'hold' }),
    torso([
      [82, 128],
      [86, 146],
      [88, 156],
      [112, 156],
      [114, 146],
      [118, 128],
      [112, 82],
      [108, 66],
      [92, 66],
      [88, 82],
    ]),
    shortsFrame([100, 66], [0, 1], [1, 0], {
      rise: 9,
      half: 11,
      sym: true,
      crotch: 7.0,
      thighs: [[[106, 64], [144, 112]], [[94, 64], [56, 112]]],
      legLen: 15,
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
    leg([108, 158], [138, 161], [168, 162], { far: true, foot: 'flex', toe: 1, underShorts: true }),
    leg([104, 154], [112, 106], [116, 56], { foot: 'freeFlex', toe: 1, underShorts: true }),
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
      legLen: 15,
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
    leg([94, 146], [118, 100], [140, 54], { far: true, foot: 'freeFlex', toe: 1, underShorts: true }),
    leg([100, 148], [124, 104], [146, 58], { foot: 'freeFlex', toe: 1, underShorts: true }),
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
      rise: 10,
      half: 11,
      backW: 1.0,
      frontW: 0.85,
      thighs: [[[100, 148], [124, 104]], [[94, 146], [118, 100]]],
      legLen: 20,
      crotch: 6.2,
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
    leg([102, 150], [108, 100], [114, 50], { far: true, foot: 'freeFlex', toe: 1, underShorts: true }),
    leg([108, 152], [114, 102], [120, 52], { foot: 'freeFlex', toe: 1, underShorts: true }),
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
      legLen: 15,
      inline: true,
    }),
    arm([90, 92], [102, 68], [114, 50], { far: true, hand: 'hold' }),
    arm([96, 94], [108, 70], [120, 52], { hand: 'hold' }),
    head([86, 72], [0.45, -0.89], [-0.15, -0.99], [90, 88]),
  ]);
}

/** Сету Бандхасана (по плакату аштанги): макушка на полу, таз поднят аркой, ноги прямые вместе (стопы на полу), руки на груди. */
export function setuBandhasana() {
  return doc([
    shadow(112, 58),
    leg([116, 122], [142, 140], [168, 158], { far: true, foot: 'flat', toe: 1, underShorts: true }),
    leg([122, 126], [148, 142], [174, 158], { foot: 'flat', toe: 1, underShorts: true }),
    torso([
      [68, 142],
      [94, 118],
      [118, 114],
      [126, 128],
      [108, 138],
      [82, 144],
      [68, 152],
    ]),
    shortsFrame([118, 122], [-0.92, -0.32], [0.32, -0.92], {
      rise: 9,
      half: 10,
      thighs: [[[122, 126], [148, 142]], [[116, 122], [142, 140]]],
      legLen: 15,
      inline: true,
    }),
    arm([82, 128], [94, 114], [104, 126], { far: true, hand: 'hold' }),
    arm([88, 130], [102, 116], [108, 130], { hand: 'hold' }),
    head([52, 157], [-0.15, -0.99], [-0.92, 0.35], [68, 146]),
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
