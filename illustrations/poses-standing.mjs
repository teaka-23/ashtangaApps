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

/** Падангустхасана: стопы под тазом, глубокая складка, локти в стороны, захват больших пальцев. */
export function padangusthasana() {
  return doc([
    shadow(104, 36),
    leg([98, 76], [96, 118], [94, 158], { far: true, foot: 'flat', toe: 1, underShorts: true }),
    leg([106, 78], [110, 120], [112, 158], { foot: 'flat', toe: 1, underShorts: true }),
    arm([118, 112], [78, 120], [98, 156], { far: true, hand: 'hold' }),
    torso([
      [92, 74],
      [108, 72],
      [126, 104],
      [130, 128],
      [118, 134],
      [100, 98],
      [92, 84],
    ]),
    shortsFrame([103, 74], [0.35, 0.94], [1, 0.15], {
      rise: 9,
      hem: 12,
      along: [0.05, 0.999],
      inline: true,
    }),
    arm([128, 116], [158, 124], [118, 156], { hand: 'hold' }),
    head([136, 142], [0.2, 0.98], [0.4, -0.2], [126, 128]),
  ]);
}

/** Пада хастасана: складка, ладони полностью под подошвами (пальцы к пяткам). */
export function padaHastasana() {
  return doc([
    shadow(104, 36),
    arm([116, 110], [100, 136], [96, 159], { far: true, hand: 'palm', fingers: -1 }),
    leg([98, 76], [96, 118], [94, 158], { far: true, foot: 'flat', toe: 1, underShorts: true }),
    torso([
      [92, 72],
      [108, 70],
      [126, 102],
      [130, 126],
      [118, 132],
      [100, 96],
      [92, 82],
    ]),
    shortsFrame([103, 74], [0.35, 0.94], [1, 0.15], {
      rise: 9,
      hem: 12,
      along: [0.05, 0.999],
      inline: true,
    }),
    arm([128, 112], [124, 138], [120, 159], { hand: 'palm', fingers: -1 }),
    leg([106, 78], [110, 120], [112, 158], { foot: 'flat', toe: 1, underShorts: true }),
    head([134, 140], [0.2, 0.98], [0.4, -0.2], [124, 126]),
  ]);
}

/** Уттхита триконасана А: грудь раскрыта к зрителю, нижняя рука держит большой палец стопы, верхняя вертикально вверх. */
export function utthitaTrikonasanaA() {
  return doc([
    shadow(100, 58),
    leg([76, 104], [52, 130], [28, 158], { far: true, foot: 'flat', toe: -1, underShorts: true }),
    arm([124, 62], [126, 36], [126, 14], { far: true, hand: 'up' }),
    torso([
      [74, 92],
      [88, 108],
      [134, 102],
      [140, 82],
      [126, 62],
      [94, 80],
    ]),
    leg([96, 106], [132, 132], [168, 158], { foot: 'flat', toe: 1, underShorts: true }),
    shortsFrame([86, 100], [0.95, -0.32], [0.32, 0.95], {
      rise: 9,
      half: 11,
      backW: 0.95,
      frontW: 0.85,
      thighs: [[[96, 106], [132, 132]], [[76, 104], [52, 130]]],
      legLen: 18,
      crotch: 6.5,
      inline: true,
    }),
    arm([136, 98], [150, 128], [166, 154], { hand: 'hold' }),
    headFront([148, 72], [130, 80], [-0.45, -0.9]),
  ]);
}

/** Уттхита триконасана B: зеркало А — наклон к другой ноге, грудь раскрыта, не путать с паривриттой. */
export function utthitaTrikonasanaB() {
  return doc([
    shadow(100, 58),
    leg([124, 104], [148, 130], [172, 158], { far: true, foot: 'flat', toe: 1, underShorts: true }),
    arm([76, 62], [74, 36], [74, 14], { far: true, hand: 'up' }),
    torso([
      [126, 92],
      [112, 108],
      [66, 102],
      [60, 82],
      [74, 62],
      [106, 80],
    ]),
    leg([104, 106], [68, 132], [32, 158], { foot: 'flat', toe: -1, underShorts: true }),
    shortsFrame([114, 100], [-0.95, -0.32], [0.32, -0.95], {
      rise: 9,
      half: 11,
      backW: 0.95,
      frontW: 0.85,
      thighs: [[[104, 106], [68, 132]], [[124, 104], [148, 130]]],
      legLen: 18,
      crotch: 6.5,
      inline: true,
    }),
    arm([64, 98], [50, 128], [34, 154], { hand: 'hold' }),
    headFront([52, 72], [70, 80], [0.45, -0.9]),
  ]);
}

/**
 * Паривритта триконасана, профиль. Ноги прямые, корпус сложен горизонтально к передней ноге в скрутке,
 * противоположная ладонь на полу снаружи передней стопы, верхняя рука вертикально вверх, взгляд вверх.
 */
export function parivrttaTrikonasana() {
  return doc([
    shadow(100, 58),
    leg([82, 102], [56, 130], [32, 158], { far: true, foot: 'flat', toe: 1, underShorts: true }),
    arm([136, 86], [136, 48], [136, 14], { far: true, hand: 'up' }),
    torso([
      [78, 94],
      [98, 88],
      [138, 86],
      [146, 102],
      [100, 110],
      [80, 106],
    ]),
    leg([100, 104], [130, 132], [160, 158], { foot: 'flat', toe: 1, underShorts: true }),
    shortsFrame([90, 100], [0.98, 0.14], [-0.14, 0.98], {
      rise: 8,
      half: 9.5,
      backW: 0.9,
      thighs: [[[100, 104], [130, 132]], [[82, 102], [56, 130]]],
      legLen: 15,
      inline: true,
    }),
    arm([136, 98], [148, 128], [162, 158], { hand: 'flat', fingers: 1 }),
    head([152, 92], [0.05, -1], [0.92, -0.38], [138, 94]),
  ]);
}

/** Уттхита паршваконасана А: грудь раскрыта вперёд, колено 90°, одноимённая ладонь за стопой, верхняя рука над ухом. */
export function utthitaParshvakonasanaA() {
  return doc([
    shadow(108, 60),
    leg([76, 114], [48, 138], [22, 158], { far: true, foot: 'flat', toe: -1, underShorts: true }),
    arm([122, 66], [150, 38], [178, 14], { far: true, hand: 'up' }),
    torso([
      [68, 110],
      [92, 90],
      [126, 62],
      [144, 80],
      [126, 108],
      [96, 118],
      [76, 118],
    ]),
    leg([100, 116], [140, 116], [140, 158], { foot: 'flat', toe: 1, underShorts: true }),
    shortsFrame([88, 112], [0.85, -0.52], [0.52, 0.85], {
      rise: 9,
      half: 11,
      backW: 0.95,
      frontW: 0.85,
      thighs: [[[100, 116], [140, 116]], [[76, 114], [48, 138]]],
      legLen: 18,
      crotch: 6.5,
      inline: true,
    }),
    arm([124, 102], [144, 130], [154, 158], { hand: 'flat', fingers: 1 }),
    headFront([150, 62], [134, 74], [0.55, -0.84]),
  ]);
}

/** Уттхита паршваконасана B: зеркало А — выпад на другую сторону, грудь раскрыта; скрутка — в Паривритте. */
export function utthitaParshvakonasanaB() {
  return doc([
    shadow(108, 60),
    leg([124, 114], [152, 138], [178, 158], { far: true, foot: 'flat', toe: 1, underShorts: true }),
    arm([78, 66], [50, 38], [22, 14], { far: true, hand: 'up' }),
    torso([
      [132, 110],
      [108, 90],
      [74, 62],
      [56, 80],
      [74, 108],
      [104, 118],
      [124, 118],
    ]),
    leg([100, 116], [60, 116], [60, 158], { foot: 'flat', toe: -1, underShorts: true }),
    shortsFrame([112, 112], [-0.85, -0.52], [0.52, -0.85], {
      rise: 9,
      half: 11,
      backW: 0.95,
      frontW: 0.85,
      thighs: [[[100, 116], [60, 116]], [[124, 114], [152, 138]]],
      legLen: 18,
      crotch: 6.5,
      inline: true,
    }),
    arm([76, 102], [56, 130], [46, 158], { hand: 'flat', fingers: 1 }),
    headFront([50, 62], [66, 74], [-0.55, -0.84]),
  ]);
}

/**
 * Паривритта паршваконасана, профиль. Переднее колено над стопой, задняя нога прямая.
 * Противоположный локоть за внешней стороной колена, ладони в намасте перед грудью, взгляд вверх.
 */
export function parivrttaParshvakonasana() {
  return doc([
    shadow(104, 56),
    leg([82, 110], [52, 136], [26, 158], { far: true, foot: 'flat', toe: 1, underShorts: true }),
    torso([
      [86, 102],
      [104, 70],
      [126, 80],
      [118, 106],
      [102, 116],
      [86, 112],
    ]),
    leg([102, 114], [142, 118], [142, 158], { foot: 'flat', toe: 1, underShorts: true }),
    shortsFrame([93, 110], [0.2, -0.98], [0.9, 0.3], {
      rise: 10,
      half: 10,
      thighs: [[[102, 114], [142, 118]], [[82, 110], [52, 136]]],
      legLen: 15,
      inline: true,
    }),
    arm([118, 80], [136, 110], [120, 88], { far: true, hand: 'prayer' }),
    arm([106, 78], [102, 100], [120, 88], { hand: 'prayer' }),
    head([124, 54], [0.3, -0.95], [0.25, -0.97], [116, 72]),
  ]);
}

/** Общий каркас Прасариты: широкие прямые ноги, таз высоко, плечи внизу у головы, макушка к полу. */
function prasaritaBase(arms) {
  return doc([
    shadow(102, 70),
    leg([94, 70], [60, 116], [32, 158], { far: true, foot: 'flat', toe: -1, underShorts: true }),
    leg([106, 70], [140, 116], [168, 158], { foot: 'flat', toe: 1, underShorts: true }),
    torso([
      [89, 70],
      [111, 70],
      [111, 96],
      [115, 126],
      [105, 136],
      [95, 136],
      [85, 126],
      [89, 96],
    ]),
    shortsFrame([100, 72], [0, 1], [1, 0], {
      rise: 10,
      half: 12,
      sym: true,
      crotch: 7.2,
      thighs: [[[106, 70], [140, 116]], [[94, 70], [60, 116]]],
      legLen: 22,
      inline: true,
    }),
    ...arms,
    headFront([100, 154], [100, 136], [0, -1]),
  ]);
}

/** Прасарита падоттанасана А: ладони на полу между стоп, локти назад. */
export function prasaritaA() {
  return prasaritaBase([
    arm([86, 124], [66, 136], [74, 158], { far: true, hand: 'flat', fingers: -1 }),
    arm([114, 124], [134, 136], [126, 158], { hand: 'flat', fingers: 1 }),
  ]);
}

/** Прасарита падоттанасана B: ладони на талии, локти вверх-назад. */
export function prasaritaB() {
  return prasaritaBase([
    arm([86, 124], [66, 92], [88, 76], { far: true, hand: 'hold' }),
    arm([114, 124], [134, 92], [112, 76], { hand: 'hold' }),
  ]);
}

/** Прасарита падоттанасана C: замок за спиной, прямые руки уходят за голову к полу. */
export function prasaritaC() {
  return doc([
    shadow(102, 70),
    leg([94, 70], [60, 116], [32, 158], { far: true, foot: 'flat', toe: -1, underShorts: true }),
    leg([106, 70], [140, 116], [168, 158], { foot: 'flat', toe: 1, underShorts: true }),
    torso([
      [89, 70],
      [111, 70],
      [111, 96],
      [115, 126],
      [105, 136],
      [95, 136],
      [85, 126],
      [89, 96],
    ]),
    shortsFrame([100, 72], [0, 1], [1, 0], {
      rise: 10,
      half: 12,
      sym: true,
      crotch: 7.2,
      thighs: [[[106, 70], [140, 116]], [[94, 70], [60, 116]]],
      legLen: 22,
      inline: true,
    }),
    headFront([100, 148], [100, 136], [0, -1]),
    arm([88, 122], [90, 144], [97, 158], { far: true, hand: 'hold' }),
    arm([112, 122], [110, 144], [103, 158], { hand: 'hold' }),
  ]);
}

/** Прасарита падоттанасана D: захват больших пальцев, локти в стороны. */
export function prasaritaD() {
  return prasaritaBase([
    arm([86, 124], [48, 138], [34, 156], { far: true, hand: 'hold' }),
    arm([114, 124], [152, 138], [166, 156], { hand: 'hold' }),
  ]);
}

/** Паршвоттанасана: обе ноги прямые, намасте за спиной, лоб к передней голени. */
export function parshvottanasana() {
  return doc([
    shadow(106, 46),
    leg([92, 100], [74, 130], [56, 158], { far: true, foot: 'flat', toe: 1, underShorts: true }),
    arm([118, 112], [96, 82], [112, 94], { far: true, hand: 'prayer' }),
    torso([
      [88, 96],
      [104, 86],
      [134, 112],
      [148, 128],
      [134, 136],
      [108, 114],
      [88, 106],
    ]),
    leg([104, 102], [126, 130], [148, 158], { foot: 'flat', toe: 1, underShorts: true }),
    shortsFrame([96, 101], [0.7, 0.7], [-0.4, 0.92], {
      rise: 10,
      half: 10,
      thighs: [[[104, 102], [126, 130]], [[92, 100], [74, 130]]],
      legLen: 15,
      inline: true,
    }),
    arm([122, 114], [100, 84], [116, 96], { hand: 'prayer' }),
    head([152, 140], [0.3, 0.95], [0.72, -0.12], [138, 126]),
  ]);
}

/** Уттхита хаста падангустхасана А: нога вперёд, захват большого пальца, вторая рука на талии. */
export function utthitaHastaPadangusthasanaA() {
  return doc([
    shadow(108, 50),
    leg([96, 98], [97, 130], [96, 158], { far: true, foot: 'flat', toe: 1, underShorts: true }),
    leg([104, 100], [128, 96], [152, 92], { foot: 'freeFlex', toe: 1, underShorts: true }),
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
      legLen: 15,
    }),
    arm([106, 64], [128, 80], [150, 88], { hand: 'hold' }),
    head([99, 44], [1, 0.05], [0, -1], [99, 58]),
  ]);
}

/** Уттхита хаста падангустхасана B: фронт, нога в сторону, захват пальца, свободная рука в другую сторону. */
export function utthitaHastaPadangusthasanaB() {
  return doc([
    shadow(106, 54),
    leg([96, 100], [98, 130], [100, 158], { far: true, foot: 'flat', toe: 1, underShorts: true }),
    leg([108, 96], [138, 80], [168, 68], { foot: 'freeFlex', toe: 1, underShorts: true }),
    arm([86, 66], [58, 68], [34, 66], { far: true, hand: 'reach' }),
    torso([
      [92, 58],
      [108, 58],
      [115, 68],
      [112, 84],
      [110, 100],
      [90, 100],
      [88, 84],
      [85, 68],
    ]),
    shortsFrame([100, 98], [0, -1], [1, 0], {
      rise: 10,
      half: 11,
      sym: true,
      thighs: [[[108, 96], [138, 80]], [[96, 100], [98, 130]]],
      legLen: 15,
    }),
    arm([114, 66], [140, 66], [164, 66], { hand: 'hold' }),
    headFront([100, 42], [100, 60], [1, 0]),
  ]);
}

/** Ардха баддха падмоттанасана: полулотос стоя (колено чётко впереди опорной ноги), захват за спиной, наклон, ладонь на полу. */
export function ardhaBaddhaPadmottanasana() {
  return doc([
    shadow(108, 44),
    leg([92, 82], [92, 122], [94, 158], { far: true, foot: 'flat', toe: 1, underShorts: true }),
    arm([114, 114], [92, 90], [92, 88], { far: true, hand: 'hold' }),
    torso([
      [90, 78],
      [104, 76],
      [122, 108],
      [126, 124],
      [114, 128],
      [96, 96],
      [90, 86],
    ]),
    thigh([102, 84], [124, 118], { underShorts: true }),
    shortsFrame([96, 82], [0.5, 0.87], [-0.87, 0.5], {
      rise: 8,
      half: 9.5,
      thighs: [[[102, 84], [124, 118]], [[92, 82], [92, 122]]],
      legLen: 15,
      inline: true,
    }),
    shin([124, 118], [94, 92], { foot: 'lotus', toe: -1 }),
    arm([122, 120], [116, 142], [114, 158], { hand: 'flat', fingers: 1 }),
    head([130, 138], [0.15, 0.99], [0.35, -0.25], [122, 124]),
  ]);
}

/** Вирабхадрасана B (фронтально): руки горизонтально, переднее колено 90°, взгляд на переднюю руку. */
export function virabhadrasana2() {
  return doc([
    shadow(102, 56),
    leg([94, 100], [70, 132], [52, 158], { far: true, foot: 'flat', toe: -1, underShorts: true }),
    leg([106, 102], [142, 118], [142, 158], { foot: 'flat', toe: 1, underShorts: true }),
    arm([84, 64], [62, 64], [42, 64], { far: true, hand: 'reach' }),
    torso([
      [92, 58],
      [108, 58],
      [117, 68],
      [113, 84],
      [110, 100],
      [90, 100],
      [87, 84],
      [83, 68],
    ]),
    shortsFrame([100, 98], [0, -1], [1, 0], {
      rise: 11,
      half: 12,
      sym: true,
      crotch: 8,
      thighs: [[[106, 102], [142, 118]], [[94, 100], [70, 132]]],
      legLen: 18,
      inline: true,
    }),
    arm([116, 64], [138, 64], [158, 64], { hand: 'reach' }),
    headFront([100, 42], [100, 58], [1, 0]),
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
