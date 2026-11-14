/**
 * Стоячие позы первой серии.
 * Профиль лицом вправо; широкие стойки (триконасана, прасарита, паршваконасана,
 * вирабхадрасана 2, уттхита хаста B) — фронтально, как на плакате.
 * Падангустхасана: локти наружу, захват больших пальцев. Пада хастасана: ладони под стопы.
 * Прасарита: голова висит макушкой к полу. Паршвоттанасана: намасте за спиной, складка к ноге.
 */
import { draw, svgDocument } from './figure.mjs';

const { leg, thigh, shin, arm, torso, shortsFrame, head, headFront, shadow, groundLine } = draw;

function doc(parts) {
  return svgDocument([groundLine(), ...parts].join('\n'));
}

/** Падангустхасана: складка, локти наружу-назад, пальцы на больших пальцах ног, нос вниз. */
export function padangusthasana() {
  return doc([
    shadow(108, 42),
    leg([96, 78], [90, 120], [86, 158], { far: true, foot: 'flat', toe: 1 }),
    leg([106, 80], [116, 122], [120, 158], { foot: 'flat', toe: 1 }),
    arm([118, 118], [88, 128], [90, 156], { far: true, hand: 'hold' }),
    torso([
      [94, 78],
      [108, 76],
      [124, 108],
      [128, 124],
      [116, 128],
      [100, 96],
      [94, 86],
    ]),
    shortsFrame([100, 79], [0.45, 0.89], [-0.89, 0.45], {
      rise: 9,
      half: 9.5,
      backW: 0.95,
      thighs: [[[106, 80], [116, 122]], [[96, 78], [90, 120]]],
      legLen: 19,
      inline: true,
    }),
    arm([126, 120], [108, 132], [122, 156], { hand: 'hold' }),
    head([132, 136], [0.15, 0.99], [0.35, -0.25], [124, 124]),
  ]);
}

/** Пада хастасана: складка глубже, ладони под стопами, пальцы вперёд из-под пяток. */
export function padaHastasana() {
  return doc([
    shadow(108, 42),
    leg([96, 78], [90, 120], [86, 158], { far: true, foot: 'flat', toe: 1 }),
    leg([106, 80], [116, 122], [120, 158], { foot: 'flat', toe: 1 }),
    arm([118, 114], [92, 136], [84, 158], { far: true, hand: 'flat', fingers: 1 }),
    torso([
      [94, 76],
      [108, 74],
      [124, 106],
      [128, 122],
      [116, 126],
      [100, 94],
      [94, 84],
    ]),
    shortsFrame([100, 78], [0.45, 0.89], [-0.89, 0.45], {
      rise: 9,
      half: 9.5,
      backW: 0.95,
      thighs: [[[106, 80], [116, 122]], [[96, 78], [90, 120]]],
      legLen: 19,
      inline: true,
    }),
    arm([126, 116], [112, 140], [118, 158], { hand: 'flat', fingers: 1 }),
    head([130, 134], [0.15, 0.99], [0.35, -0.25], [122, 122]),
  ]);
}

/** Уттхита триконасана А: корпус вдоль пола к передней ноге, нижняя рука к голени, верхняя вертикально. */
export function utthitaTrikonasanaA() {
  return doc([
    shadow(100, 58),
    leg([86, 98], [58, 130], [32, 158], { far: true, foot: 'flat', toe: -1 }),
    arm([128, 90], [132, 50], [134, 16], { far: true, hand: 'up' }),
    torso([
      [78, 88],
      [98, 78],
      [136, 96],
      [148, 112],
      [124, 118],
      [96, 108],
      [80, 100],
    ]),
    leg([104, 102], [136, 132], [168, 158], { foot: 'flat', toe: 1 }),
    shortsFrame([90, 96], [0.92, 0.38], [-0.38, 0.92], {
      rise: 7.5,
      half: 9.5,
      backW: 0.9,
      thighs: [[[104, 102], [136, 132]], [[86, 98], [58, 130]]],
      legLen: 19,
      inline: true,
    }),
    arm([142, 110], [156, 136], [162, 156], { hand: 'hang' }),
    head([150, 102], [0.12, -0.99], [0.5, -0.87], [138, 104]),
  ]);
}

/** Уттхита триконасана B: грудь к потолку, нижняя ладонь на полу снаружи передней стопы, верхняя рука вверх. */
export function utthitaTrikonasanaB() {
  return doc([
    shadow(100, 58),
    leg([86, 98], [58, 130], [32, 158], { far: true, foot: 'flat', toe: -1 }),
    arm([124, 76], [128, 40], [130, 12], { far: true, hand: 'up' }),
    torso([
      [80, 80],
      [110, 62],
      [142, 78],
      [154, 98],
      [128, 112],
      [98, 108],
      [82, 96],
    ]),
    leg([104, 102], [136, 132], [168, 158], { foot: 'flat', toe: 1 }),
    shortsFrame([90, 96], [0.92, 0.25], [-0.25, 0.92], {
      rise: 7.5,
      half: 9.5,
      backW: 0.9,
      thighs: [[[104, 102], [136, 132]], [[86, 98], [58, 130]]],
      legLen: 19,
      inline: true,
    }),
    arm([148, 96], [178, 128], [186, 158], { hand: 'flat', fingers: 1 }),
    head([146, 82], [0.05, -1], [0.25, -0.97], [134, 86]),
  ]);
}

/**
 * Паривритта триконасана, профиль. Ноги прямые, корпус сложен горизонтально к передней ноге в скрутке,
 * нижняя ладонь на полу снаружи передней стопы, верхняя рука вертикально вверх, взгляд вверх.
 */
export function parivrttaTrikonasana() {
  return doc([
    shadow(100, 58),
    leg([84, 104], [58, 132], [34, 158], { far: true, foot: 'flat', toe: 1 }),
    arm([136, 86], [138, 48], [140, 14], { far: true, hand: 'up' }),
    torso([
      [76, 94],
      [98, 82],
      [136, 84],
      [150, 98],
      [134, 114],
      [98, 112],
      [80, 104],
    ]),
    leg([100, 106], [130, 132], [160, 158], { foot: 'flat', toe: 1 }),
    shortsFrame([92, 102], [0.92, 0.2], [-0.2, 0.92], {
      rise: 8,
      half: 9.5,
      backW: 0.9,
      thighs: [[[100, 106], [130, 132]], [[84, 104], [58, 132]]],
      legLen: 19,
      inline: true,
    }),
    arm([144, 98], [156, 128], [168, 158], { hand: 'flat', fingers: 1 }),
    head([152, 82], [0.08, -1], [0.35, -0.94], [140, 88]),
  ]);
}

/** Уттхита паршваконасана А: колено 90°, корпус в линию задней ноги, ладонь снаружи стопы, верхняя рука над ухом. */
export function utthitaParshvakonasanaA() {
  return doc([
    shadow(108, 60),
    leg([78, 114], [48, 138], [22, 158], { far: true, foot: 'flat', toe: -1 }),
    arm([122, 76], [152, 44], [178, 16], { far: true, hand: 'up' }),
    torso([
      [68, 110],
      [90, 94],
      [128, 74],
      [146, 84],
      [120, 106],
      [96, 118],
      [76, 118],
    ]),
    leg([100, 116], [140, 116], [140, 158], { foot: 'flat', toe: 1 }),
    shortsFrame([88, 112], [0.85, -0.52], [0.52, 0.85], {
      rise: 8,
      half: 9.5,
      backW: 0.9,
      thighs: [[[100, 116], [140, 116]], [[78, 114], [48, 138]]],
      legLen: 19,
      inline: true,
    }),
    arm([114, 104], [148, 134], [156, 158], { hand: 'flat', fingers: 1 }),
    head([152, 62], [0.75, -0.66], [0.55, -0.84], [134, 76]),
  ]);
}

/**
 * Уттхита паршваконасана B, профиль. Переднее колено над стопой, корпус наклонён в линию задней ноги.
 * Ближняя рука уходит под переднее бедро, дальняя за спину; кисти в замке на пояснице, взгляд вверх.
 */
export function utthitaParshvakonasanaB() {
  return doc([
    shadow(102, 56),
    leg([86, 108], [62, 134], [40, 158], { far: true, foot: 'flat', toe: 1 }),
    arm([124, 66], [86, 66], [82, 92], { far: true, hand: 'hold' }),
    torso([
      [124, 62],
      [140, 72],
      [134, 90],
      [118, 104],
      [100, 114],
      [88, 108],
      [94, 86],
      [108, 72],
    ]),
    arm([130, 82], [122, 128], [86, 96], { hand: 'hold' }),
    leg([102, 112], [140, 118], [140, 158], { foot: 'flat', toe: 1 }),
    shortsFrame([95, 108], [0.65, -0.76], [0.76, 0.65], {
      rise: 9,
      half: 9,
      thighs: [[[102, 112], [140, 118]], [[86, 108], [62, 134]]],
      legLen: 19,
      inline: true,
    }),
    head([138, 52], [0.35, -0.94], [0.42, -0.91], [126, 70]),
  ]);
}

/**
 * Паривритта паршваконасана, профиль. Переднее колено над стопой, задняя нога прямая.
 * Противоположный локоть снаружи колена, ладони соединены у груди, взгляд вверх.
 */
export function parivrttaParshvakonasana() {
  return doc([
    shadow(104, 56),
    leg([84, 110], [52, 136], [28, 158], { far: true, foot: 'flat', toe: 1 }),
    torso([
      [86, 70],
      [108, 62],
      [124, 78],
      [118, 104],
      [104, 116],
      [86, 112],
      [78, 90],
    ]),
    leg([102, 114], [142, 118], [142, 158], { foot: 'flat', toe: 1 }),
    shortsFrame([94, 110], [0.2, -0.98], [0.9, 0.3], {
      rise: 9,
      half: 9.5,
      thighs: [[[102, 114], [142, 118]], [[84, 110], [52, 136]]],
      legLen: 19,
      inline: true,
    }),
    arm([104, 82], [128, 112], [116, 88], { far: true, hand: 'hold' }),
    arm([112, 72], [104, 88], [116, 88], { hand: 'hang' }),
    head([112, 50], [0.22, -0.98], [0.08, -1], [106, 66]),
  ]);
}

/** Общий каркас Прасариты: широкие прямые ноги, таз высоко, макушка у пола. */
function prasaritaBase(arms) {
  return doc([
    shadow(102, 70),
    leg([94, 70], [60, 116], [32, 158], { far: true, foot: 'flat', toe: -1 }),
    leg([106, 70], [140, 116], [168, 158], { foot: 'flat', toe: 1 }),
    torso([
      [86, 62],
      [114, 62],
      [112, 108],
      [104, 142],
      [96, 142],
      [88, 108],
    ]),
    shortsFrame([100, 72], [0, 1], [1, 0], {
      rise: 8,
      half: 10.5,
      sym: true,
      crotch: 4.5,
      thighs: [[[106, 70], [140, 116]], [[94, 70], [60, 116]]],
      legLen: 20,
      inline: true,
    }),
    headFront([100, 160], [100, 142], [0, -1]),
    ...arms,
  ]);
}

/** Прасарита падоттанасана А: ладони на полу между стоп, локти назад. */
export function prasaritaA() {
  return prasaritaBase([
    arm([92, 96], [68, 130], [76, 158], { far: true, hand: 'flat', fingers: -1 }),
    arm([108, 96], [132, 130], [124, 158], { hand: 'flat', fingers: 1 }),
  ]);
}

/** Прасарита падоттанасана B: ладони на талии, локти в стороны. */
export function prasaritaB() {
  return prasaritaBase([
    arm([90, 96], [66, 80], [88, 74], { far: true, hand: 'hold' }),
    arm([110, 96], [134, 80], [112, 74], { hand: 'hold' }),
  ]);
}

/** Прасарита падоттанасана C: замок за спиной, прямые руки уходят за голову к полу. */
export function prasaritaC() {
  return prasaritaBase([
    arm([94, 88], [76, 122], [94, 162], { far: true, hand: 'hold' }),
    arm([106, 88], [124, 122], [106, 162], { hand: 'hold' }),
  ]);
}

/** Прасарита падоттанасана D: захват больших пальцев, локти в стороны. */
export function prasaritaD() {
  return prasaritaBase([
    arm([92, 94], [50, 128], [36, 152], { far: true, hand: 'hold' }),
    arm([108, 94], [150, 128], [164, 152], { hand: 'hold' }),
  ]);
}

/** Паршвоттанасана: обе ноги прямые, намасте за спиной, лоб к передней голени. */
export function parshvottanasana() {
  return doc([
    shadow(108, 48),
    leg([90, 102], [66, 132], [44, 158], { far: true, foot: 'flat', toe: 1 }),
    arm([122, 118], [108, 100], [116, 106], { far: true, hand: 'prayer' }),
    torso([
      [82, 98],
      [102, 88],
      [134, 114],
      [150, 130],
      [136, 138],
      [108, 116],
      [84, 110],
    ]),
    leg([104, 104], [132, 132], [158, 158], { foot: 'flat', toe: 1 }),
    shortsFrame([96, 102], [0.7, 0.7], [-0.4, 0.92], {
      rise: 9,
      half: 9,
      thighs: [[[104, 104], [132, 132]], [[90, 102], [66, 132]]],
      legLen: 19,
      inline: true,
    }),
    arm([124, 120], [110, 100], [118, 108], { hand: 'prayer' }),
    head([154, 142], [0.3, 0.95], [0.72, -0.12], [140, 128]),
  ]);
}

/** Уттхита хаста падангустхасана А: нога вперёд, захват большого пальца, вторая рука на талии. */
export function utthitaHastaPadangusthasanaA() {
  return doc([
    shadow(108, 50),
    leg([96, 98], [97, 130], [96, 158], { far: true, foot: 'flat', toe: 1 }),
    leg([104, 100], [128, 96], [152, 92], { foot: 'freeFlex', toe: 1 }),
    arm([94, 64], [84, 84], [92, 100], { far: true, hand: 'hang' }),
    torso([
      [90, 60],
      [106, 60],
      [108, 80],
      [104, 100],
      [92, 100],
      [88, 80],
    ]),
    shortsFrame([98, 98], [0, -1], [1, 0], {
      rise: 10,
      half: 9.5,
      thighs: [[[104, 100], [128, 96]], [[96, 98], [97, 130]]],
      legLen: 19,
    }),
    arm([106, 64], [128, 80], [150, 88], { hand: 'hold' }),
    head([99, 44], [1, 0.05], [0, -1], [99, 58]),
  ]);
}

/** Уттхита хаста падангустхасана B: фронт, нога в сторону, захват пальца, свободная рука в другую сторону. */
export function utthitaHastaPadangusthasanaB() {
  return doc([
    shadow(106, 54),
    leg([96, 100], [98, 130], [100, 158], { far: true, foot: 'flat', toe: 1 }),
    leg([108, 96], [138, 86], [168, 80], { foot: 'freeFlex', toe: 1 }),
    arm([82, 68], [58, 70], [34, 68], { far: true, hand: 'reach' }),
    torso([
      [80, 62],
      [100, 56],
      [120, 62],
      [114, 82],
      [110, 100],
      [90, 100],
      [86, 82],
    ]),
    shortsFrame([100, 98], [0, -1], [1, 0], {
      rise: 10,
      half: 11,
      sym: true,
      thighs: [[[108, 96], [138, 86]], [[96, 100], [98, 130]]],
      legLen: 20,
    }),
    arm([118, 68], [142, 74], [164, 78], { hand: 'hold' }),
    headFront([100, 40], [100, 62], [1, 0]),
  ]);
}

/** Ардха баддха падмоттанасана: полулотос стоя, связанная рука за спиной, складка, ладонь на полу. */
export function ardhaBaddhaPadmottanasana() {
  return doc([
    shadow(108, 42),
    leg([98, 82], [102, 122], [104, 158], { far: true, foot: 'flat', toe: 1 }),
    arm([118, 110], [104, 94], [98, 86], { far: true, hand: 'hold' }),
    torso([
      [95, 78],
      [108, 76],
      [124, 108],
      [128, 124],
      [116, 128],
      [100, 96],
      [94, 86],
    ]),
    thigh([102, 82], [136, 110]),
    shortsFrame([99, 82], [0.5, 0.87], [-0.87, 0.5], {
      rise: 8,
      half: 9,
      thighs: [[[102, 82], [136, 110]], [[98, 82], [102, 122]]],
      legLen: 18,
      inline: true,
    }),
    shin([136, 110], [110, 96], { foot: 'lotus', toe: -1 }),
    arm([126, 118], [120, 142], [116, 158], { hand: 'flat', fingers: 1 }),
    head([132, 134], [0.15, 0.99], [0.35, -0.25], [124, 122]),
  ]);
}

/** Вирабхадрасана B (фронтально): руки горизонтально, переднее колено 90°, взгляд на переднюю руку. */
export function virabhadrasana2() {
  return doc([
    shadow(102, 56),
    leg([94, 100], [70, 132], [52, 158], { far: true, foot: 'flat', toe: -1 }),
    leg([106, 102], [142, 118], [142, 158], { foot: 'flat', toe: 1 }),
    arm([82, 66], [64, 64], [46, 64], { far: true, hand: 'reach' }),
    torso([
      [76, 58],
      [124, 58],
      [118, 80],
      [112, 100],
      [88, 100],
      [82, 80],
    ]),
    shortsFrame([100, 98], [0, -1], [1, 0], {
      rise: 10,
      half: 12,
      sym: true,
      thighs: [[[106, 102], [142, 118]], [[94, 100], [70, 132]]],
      legLen: 21,
    }),
    arm([118, 66], [136, 64], [156, 64], { hand: 'reach' }),
    headFront([100, 42], [100, 56], [1, 0]),
  ]);
}

export const FILES = [
  ['11-padangusthasana', padangusthasana],
  ['12-pada-hastasana', padaHastasana],
  ['13-utthita-trikonasana-a', utthitaTrikonasanaA],
  ['14-utthita-trikonasana-b', utthitaTrikonasanaB],
  ['14b-parivrtta-trikonasana', parivrttaTrikonasana],
  ['15-utthita-parshvakonasana-a', utthitaParshvakonasanaA],
  ['16-utthita-parshvakonasana-b', utthitaParshvakonasanaB],
  ['16b-parivrtta-parshvakonasana', parivrttaParshvakonasana],
  ['17-prasarita-padottanasana-a', prasaritaA],
  ['18-prasarita-padottanasana-b', prasaritaB],
  ['19-prasarita-padottanasana-c', prasaritaC],
  ['20-prasarita-padottanasana-d', prasaritaD],
  ['21-parshvottanasana', parshvottanasana],
  ['22-utthita-hasta-padangusthasana-a', utthitaHastaPadangusthasanaA],
  ['23-utthita-hasta-padangusthasana-b', utthitaHastaPadangusthasanaB],
  ['24-ardha-baddha-padmottanasana', ardhaBaddhaPadmottanasana],
  ['25-virabhadrasana-2', virabhadrasana2],
];
