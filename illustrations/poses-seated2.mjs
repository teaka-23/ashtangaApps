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

/**
 * Бхуджапидасана (профиль¾): ладони на полу; бёдра на верхних руках;
 * колени впереди плеч; стопы скрещены впереди — в воздухе (не crow).
 */
export function bhujapidasana() {
  return doc([
    shadow(114, 42),
    // Дальняя рука под дальним бедром.
    arm([98, 106], [86, 136], [98, 160], { far: true, hand: 'flat', fingers: 1 }),
    thigh([92, 110], [132, 84], { far: true, underShorts: true }),
    shin([132, 84], [156, 96], { far: true, foot: 'free', toe: 1 }),
    // Ближняя рука под ближним бедром.
    arm([120, 104], [134, 134], [122, 160], { hand: 'flat', fingers: 1 }),
    torso([
      [88, 94],
      [110, 80],
      [130, 90],
      [126, 110],
      [106, 116],
      [88, 110],
      [82, 100],
    ]),
    thigh([100, 112], [142, 88], { underShorts: true }),
    shortsFrame([98, 112], [0.35, -0.94], [0.94, 0.35], {
      rise: 10,
      half: 10.4,
      thighs: [[[100, 112], [142, 88]], [[92, 110], [132, 84]]],
      legLen: 14,
      crotch: 5.2,
      inline: true,
    }),
    // Крест стоп впереди груди, высоко; `free` — вдоль голени, не «вторая пара ладоней».
    shin([142, 88], [150, 110], { foot: 'free', toe: -1 }),
    head([152, 82], [0.9, 0.44], [0.25, -0.97], [130, 88]),
  ]);
}

/**
 * Курмасана: ноги врозь, руки под коленями, подбородок к полу, носки вверх.
 */
export function kurmasana() {
  return doc([
    shadow(100, 72),
    arm([84, 146], [48, 154], [22, 158], { far: true, hand: 'flat', fingers: -1 }),
    arm([116, 146], [152, 154], [178, 158], { hand: 'flat', fingers: 1 }),
    thigh([92, 134], [52, 144], { far: true, underShorts: true }),
    thigh([108, 134], [148, 144], { underShorts: true }),
    torso([
      [84, 126],
      [116, 126],
      [118, 144],
      [110, 156],
      [90, 156],
      [82, 144],
    ]),
    shortsFrame([100, 132], [0, -1], [1, 0], {
      rise: 10,
      half: 11.5,
      sym: true,
      crotch: 6.6,
      thighs: [[[108, 134], [148, 144]], [[92, 134], [52, 144]]],
      legLen: 18,
      inline: true,
    }),
    shin([52, 144], [18, 158], { far: true, foot: 'flex', toe: -1 }),
    shin([148, 144], [182, 158], { foot: 'flex', toe: 1 }),
    headFront([100, 160], [100, 148], [0, 1]),
  ]);
}

/**
 * Супта Курмасана (профиль +x): три жеста с первого взгляда —
 * грудь у пола, стопы крестом на затылке, замок рук на пояснице.
 */
export function suptaKurmasana() {
  return doc([
    shadow(120, 58),
    // Замок сзади (far) — кисти у крестца.
    arm([112, 150], [84, 158], [102, 144], { far: true, hand: 'hold' }),
    // Дальняя нога: бедро от таза вверх, голень к затылку.
    thigh([90, 152], [108, 88], { far: true, underShorts: true }),
    // Компактный торс у пола (не мешок).
    torso([
      [68, 146],
      [92, 134],
      [122, 130],
      [148, 138],
      [158, 152],
      [148, 162],
      [116, 166],
      [84, 164],
      [64, 154],
    ]),
    thigh([100, 154], [120, 92], { underShorts: true }),
    shortsFrame([96, 154], [0.95, -0.3], [0.3, 0.95], {
      rise: 11,
      half: 10.4,
      thighs: [[[100, 154], [120, 92]], [[90, 152], [108, 88]]],
      legLen: 15,
      crotch: 5.2,
      inline: true,
    }),
    // Стопы НА затылке (крест) — главный жест, поверх торса.
    shin([108, 88], [142, 128], { far: true, foot: 'lotus', toe: 1 }),
    shin([120, 92], [136, 138], { foot: 'lotus', toe: -1 }),
    arm([120, 152], [92, 160], [110, 146], { hand: 'hold' }),
    // Лицо к полу; затылок под скрещенными стопами.
    head([158, 156], [0.25, 0.97], [0.98, 0.1], [146, 146]),
  ]);
}

/**
 * Гарбха Пиндасана: лотос, колени врозь, руки продеты сквозь бёдра к ушам.
 */
export function garbhaPindasana() {
  return doc([
    shadow(100, 42),
    torso([
      [84, 88],
      [100, 84],
      [116, 88],
      [114, 118],
      [108, 142],
      [92, 142],
      [86, 118],
    ]),
    thigh([92, 140], [42, 112], { far: true, underShorts: true }),
    thigh([108, 140], [158, 112], { underShorts: true }),
    shortsFrame([100, 138], [0, -1], [1, 0], {
      rise: 10,
      half: 12.0,
      sym: true,
      crotch: 6.4,
      thighs: [[[108, 140], [158, 112]], [[92, 140], [42, 112]]],
      legLen: 18,
      inline: true,
    }),
    // Руки сквозь бёдра → пальцы к ушам (жест читается).
    arm([82, 96], [48, 124], [86, 68], { far: true, hand: 'hang' }),
    arm([118, 96], [152, 124], [114, 68], { hand: 'hang' }),
    shin([42, 112], [118, 128], { far: true, foot: 'lotus', toe: 1 }),
    shin([158, 112], [82, 128], { foot: 'lotus', toe: -1 }),
    headFront([100, 56], [100, 86], [0, 1]),
  ]);
}

/**
 * Куккутасана: лотос на руках, руки продеты внутри колен, ладони на полу.
 */
export function kukkutasana() {
  return doc([
    shadow(100, 44),
    torso([
      [82, 54],
      [100, 48],
      [118, 54],
      [112, 86],
      [106, 104],
      [94, 104],
      [88, 86],
    ]),
    thigh([94, 102], [50, 114], { far: true, underShorts: true }),
    thigh([106, 102], [150, 114], { underShorts: true }),
    shortsFrame([100, 100], [0, -1], [1, 0], {
      rise: 10,
      half: 10.4,
      sym: true,
      crotch: 6.0,
      thighs: [[[106, 102], [150, 114]], [[94, 102], [50, 114]]],
      legLen: 15,
      inline: true,
    }),
    arm([84, 60], [82, 110], [82, 160], { hand: 'flat', fingers: -1 }),
    arm([116, 60], [118, 110], [118, 160], { hand: 'flat', fingers: 1 }),
    shin([50, 114], [114, 106], { far: true, foot: 'lotus', toe: 1 }),
    shin([150, 114], [86, 106], { foot: 'lotus', toe: -1 }),
    headFront([100, 34], [100, 50], [0, 1]),
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

/**
 * Супта Конасана (профиль): спина/плечи на полу, таз вверх,
 * прямые ноги широко за головой, носки на полу, руки держат стопы.
 */
export function suptaKonasana() {
  return doc([
    shadow(118, 64),
    // Широкий угол: дальняя нога короче по X, ближняя дальше — читается «врозь».
    leg([84, 82], [118, 124], [148, 158], { far: true, foot: 'tops', toe: 1, underShorts: true }),
    leg([108, 70], [152, 116], [188, 158], { foot: 'tops', toe: 1, underShorts: true }),
    // Руки вдоль пола → захват стоп.
    arm([96, 148], [120, 152], [146, 156], { far: true, hand: 'hold' }),
    // Плечи/спина на полу, таз вверх — явно лёжа, не стойка на голове.
    torso([
      [88, 156],
      [114, 156],
      [110, 114],
      [106, 72],
      [88, 72],
      [84, 114],
    ]),
    shortsFrame([97, 74], [0, 1], [1, 0], {
      rise: 10,
      half: 11.4,
      thighs: [[[108, 70], [152, 116]], [[84, 82], [118, 124]]],
      legLen: 18,
      crotch: 7.2,
      inline: true,
    }),
    arm([110, 148], [148, 152], [184, 156], { hand: 'hold' }),
    head([128, 157], [0.55, -0.84], [0.98, 0.12], [110, 154]),
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

/**
 * Убхая Падангуштхасана (профиль): седалище на полу, спина ровная,
 * обе ноги вверх буквой V, захват больших пальцев.
 */
export function ubhayaPadangusthasana() {
  return doc([
    shadow(100, 44),
    // Седалище на полу; ноги V вверх; спина почти вертикальна (не лодка).
    leg([90, 164], [100, 108], [108, 52], { far: true, foot: 'freeFlex', toe: 1, underShorts: true }),
    leg([108, 164], [142, 106], [172, 48], { foot: 'freeFlex', toe: 1, underShorts: true }),
    torso([
      [92, 78],
      [108, 74],
      [112, 116],
      [110, 158],
      [96, 168],
      [88, 128],
      [86, 92],
    ]),
    shortsFrame([100, 164], [0, -1], [1, 0], {
      rise: 13,
      half: 11.6,
      backW: 1.1,
      frontW: 0.85,
      thighs: [[[108, 164], [142, 106]], [[90, 164], [100, 108]]],
      legLen: 18,
      crotch: 7.2,
      inline: true,
    }),
    arm([98, 90], [104, 68], [106, 50], { far: true, hand: 'hold' }),
    arm([106, 92], [138, 68], [168, 48], { hand: 'hold' }),
    head([96, 56], [0.25, -0.97], [0.05, -1], [100, 74]),
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
      rise: 10,
      hem: 15,
      along: [0.12, -0.99],
      inline: true,
    }),
    arm([90, 92], [102, 68], [114, 50], { far: true, hand: 'hold' }),
    arm([96, 94], [108, 70], [120, 52], { hand: 'hold' }),
    head([86, 72], [0.45, -0.89], [-0.15, -0.99], [90, 88]),
  ]);
}

/**
 * Сету Бандхасана (профиль по плакату):
 * макушка + стопы на полу, таз высоко, ноги прямые,
 * руки крест-накрест на груди; шея — толстый стык у пола, не стебель.
 */
function setuTrunk() {
  // Широкий шейный конец (≥24): иначе арка схлопывается в стебель у головы.
  return [
    [50, 138],
    [68, 118],
    [90, 102],
    [114, 96],
    [136, 106],
    [150, 124],
    [148, 138],
    [130, 130],
    [108, 116],
    [84, 122],
    [62, 146],
    [46, 160],
  ];
}

export function setuBandhasana() {
  const hipNear = [150, 126];
  const hipFar = [144, 122];
  const kneeNear = [168, 144];
  const kneeFar = [162, 142];
  const footNear = [184, 162];
  const footFar = [178, 162];
  return doc([
    shadow(118, 56),
    leg(hipFar, kneeFar, footFar, { far: true, foot: 'flat', toe: 1, underShorts: true }),
    leg(hipNear, kneeNear, footNear, { foot: 'flat', toe: 1, underShorts: true }),
    torso(setuTrunk(), { arch: true }),
    shortsFrame([147, 126], [-0.85, -0.52], [0.5, -0.87], {
      rise: 10,
      half: 10.2,
      thighs: [
        [hipNear, kneeNear],
        [hipFar, kneeFar],
      ],
      legLen: 16,
      crotch: 5.4,
      inline: true,
    }),
    // Крест на груди — кисти на верхней груди, не у таза.
    arm([62, 126], [90, 98], [110, 102], { far: true, hand: 'hold' }),
    arm([70, 132], [96, 102], [116, 106], { hand: 'hold' }),
    // Макушка на полу, голова внахлёст на широкий шейный конец торса.
    head([38, 158], [-0.2, -0.98], [-0.35, 0.94], [54, 148], { neckW: 0 }),
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
