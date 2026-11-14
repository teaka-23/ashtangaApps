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

/** Пада хастасана: складка глубже, ладони полностью под стопами, пальцы назад под пятки. */
export function padaHastasana() {
  return doc([
    shadow(108, 42),
    arm([118, 114], [102, 138], [94, 159], { far: true, hand: 'palm', fingers: -1 }),
    leg([96, 78], [90, 120], [86, 158], { far: true, foot: 'flat', toe: 1 }),
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
    arm([126, 116], [122, 140], [128, 159], { hand: 'palm', fingers: -1 }),
    leg([106, 80], [116, 122], [120, 158], { foot: 'flat', toe: 1 }),
    head([130, 136], [0.15, 0.99], [0.35, -0.25], [122, 122]),
  ]);
}

/** Уттхита триконасана А: грудь раскрыта к зрителю, нижняя рука к большому пальцу стопы, верхняя вертикально вверх. */
export function utthitaTrikonasanaA() {
  return doc([
    shadow(100, 58),
    leg([82, 102], [54, 130], [28, 158], { far: true, foot: 'flat', toe: -1 }),
    arm([130, 82], [130, 48], [130, 14], { far: true, hand: 'up' }),
    torso([
      [78, 92],
      [98, 84],
      [130, 80],
      [142, 104],
      [126, 114],
      [98, 110],
      [80, 106],
    ]),
    leg([100, 104], [134, 132], [168, 158], { foot: 'flat', toe: 1 }),
    shortsFrame([90, 100], [0.98, 0.16], [-0.16, 0.98], {
      rise: 7.5,
      half: 9.5,
      backW: 0.9,
      thighs: [[[100, 104], [134, 132]], [[82, 102], [54, 130]]],
      legLen: 19,
      inline: true,
    }),
    arm([140, 106], [154, 132], [166, 156], { hand: 'hold' }),
    headFront([150, 92], [134, 94], [-0.4, -0.92]),
  ]);
}

/** Уттхита триконасана B: скрутка к передней ноге, ладонь снаружи передней стопы, верхняя рука вертикально вверх. */
export function utthitaTrikonasanaB() {
  return doc([
    shadow(100, 58),
    leg([82, 102], [56, 130], [32, 158], { far: true, foot: 'flat', toe: 1 }),
    arm([138, 88], [138, 50], [138, 14], { far: true, hand: 'up' }),
    torso([
      [78, 94],
      [98, 88],
      [138, 86],
      [146, 102],
      [100, 110],
      [80, 106],
    ]),
    leg([100, 104], [130, 132], [160, 158], { foot: 'flat', toe: 1 }),
    shortsFrame([90, 100], [0.98, 0.14], [-0.14, 0.98], {
      rise: 7.5,
      half: 9.5,
      backW: 0.9,
      thighs: [[[100, 104], [130, 132]], [[82, 102], [56, 130]]],
      legLen: 19,
      inline: true,
    }),
    arm([142, 102], [154, 130], [164, 158], { hand: 'flat', fingers: 1 }),
    head([148, 90], [0.05, -1], [0.92, -0.38], [138, 94]),
  ]);
}

/**
 * Паривритта триконасана, профиль. Ноги прямые, корпус сложен горизонтально к передней ноге в скрутке,
 * нижняя ладонь на полу снаружи передней стопы, верхняя рука вертикально вверх, взгляд вверх.
 */
export function parivrttaTrikonasana() {
  return doc([
    shadow(100, 58),
    leg([82, 102], [56, 130], [32, 158], { far: true, foot: 'flat', toe: 1 }),
    arm([138, 88], [138, 50], [138, 14], { far: true, hand: 'up' }),
    torso([
      [78, 94],
      [98, 88],
      [138, 86],
      [146, 102],
      [100, 110],
      [80, 106],
    ]),
    leg([100, 104], [130, 132], [160, 158], { foot: 'flat', toe: 1 }),
    shortsFrame([90, 100], [0.98, 0.14], [-0.14, 0.98], {
      rise: 8,
      half: 9.5,
      backW: 0.9,
      thighs: [[[100, 104], [130, 132]], [[82, 102], [56, 130]]],
      legLen: 19,
      inline: true,
    }),
    arm([142, 102], [154, 130], [164, 158], { hand: 'flat', fingers: 1 }),
    head([148, 90], [0.05, -1], [0.92, -0.38], [138, 94]),
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
 * Уттхита паршваконасана B (по плакату): глубокий выпад со скруткой к переднему колену.
 * Противоположная ладонь на полу снаружи передней стопы, верхняя рука вытянута над ухом в линию с задней ногой.
 */
export function utthitaParshvakonasanaB() {
  return doc([
    shadow(108, 60),
    leg([78, 114], [48, 138], [22, 158], { far: true, foot: 'flat', toe: 1 }),
    arm([126, 76], [154, 46], [182, 18], { far: true, hand: 'up' }),
    torso([
      [68, 110],
      [90, 94],
      [128, 74],
      [144, 86],
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
    arm([134, 88], [148, 124], [154, 158], { hand: 'flat', fingers: 1 }),
    head([150, 64], [0.65, -0.76], [0.55, -0.84], [134, 76]),
  ]);
}

/**
 * Паривритта паршваконасана, профиль. Переднее колено над стопой, задняя нога прямая.
 * Противоположный локоть за внешней стороной колена, ладони в намасте перед грудью, взгляд вверх.
 */
export function parivrttaParshvakonasana() {
  return doc([
    shadow(104, 56),
    leg([82, 110], [52, 136], [26, 158], { far: true, foot: 'flat', toe: 1 }),
    torso([
      [84, 106],
      [104, 70],
      [126, 80],
      [118, 106],
      [102, 116],
      [84, 114],
    ]),
    leg([102, 114], [142, 118], [142, 158], { foot: 'flat', toe: 1 }),
    shortsFrame([94, 110], [0.2, -0.98], [0.9, 0.3], {
      rise: 9,
      half: 9.5,
      thighs: [[[102, 114], [142, 118]], [[82, 110], [52, 136]]],
      legLen: 19,
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
    leg([94, 70], [60, 116], [32, 158], { far: true, foot: 'flat', toe: -1 }),
    leg([106, 70], [140, 116], [168, 158], { foot: 'flat', toe: 1 }),
    torso([
      [86, 66],
      [114, 66],
      [111, 96],
      [115, 126],
      [105, 136],
      [95, 136],
      [85, 126],
      [89, 96],
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
    leg([94, 70], [60, 116], [32, 158], { far: true, foot: 'flat', toe: -1 }),
    leg([106, 70], [140, 116], [168, 158], { foot: 'flat', toe: 1 }),
    torso([
      [86, 66],
      [114, 66],
      [111, 96],
      [115, 126],
      [105, 136],
      [95, 136],
      [85, 126],
      [89, 96],
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
    leg([92, 100], [74, 130], [56, 158], { far: true, foot: 'flat', toe: 1 }),
    arm([118, 112], [96, 82], [112, 94], { far: true, hand: 'prayer' }),
    torso([
      [84, 96],
      [104, 86],
      [134, 112],
      [148, 128],
      [134, 136],
      [108, 114],
      [86, 108],
    ]),
    leg([104, 102], [126, 130], [148, 158], { foot: 'flat', toe: 1 }),
    shortsFrame([96, 100], [0.7, 0.7], [-0.4, 0.92], {
      rise: 9,
      half: 9,
      thighs: [[[104, 102], [126, 130]], [[92, 100], [74, 130]]],
      legLen: 19,
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
    leg([108, 96], [138, 80], [168, 68], { foot: 'freeFlex', toe: 1 }),
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
      legLen: 20,
    }),
    arm([114, 66], [140, 66], [164, 66], { hand: 'hold' }),
    headFront([100, 42], [100, 60], [1, 0]),
  ]);
}

/** Ардха баддха падмоттанасана: полулотос стоя, связанная рука за спиной, складка, ладонь на полу. */
export function ardhaBaddhaPadmottanasana() {
  return doc([
    shadow(108, 42),
    leg([96, 82], [98, 122], [100, 158], { far: true, foot: 'flat', toe: 1 }),
    arm([116, 114], [96, 94], [92, 92], { far: true, hand: 'hold' }),
    torso([
      [94, 78],
      [108, 76],
      [124, 108],
      [128, 124],
      [116, 128],
      [100, 96],
      [94, 86],
    ]),
    thigh([102, 82], [110, 124]),
    shortsFrame([99, 82], [0.5, 0.87], [-0.87, 0.5], {
      rise: 8,
      half: 9,
      thighs: [[[102, 82], [110, 124]], [[96, 82], [98, 122]]],
      legLen: 18,
      inline: true,
    }),
    shin([110, 124], [94, 94], { foot: 'lotus', toe: -1 }),
    arm([124, 120], [118, 142], [116, 158], { hand: 'flat', fingers: 1 }),
    head([132, 136], [0.15, 0.99], [0.35, -0.25], [124, 122]),
  ]);
}

/** Вирабхадрасана B (фронтально): руки горизонтально, переднее колено 90°, взгляд на переднюю руку. */
export function virabhadrasana2() {
  return doc([
    shadow(102, 56),
    leg([94, 100], [70, 132], [52, 158], { far: true, foot: 'flat', toe: -1 }),
    leg([106, 102], [142, 118], [142, 158], { foot: 'flat', toe: 1 }),
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
      rise: 10,
      half: 12,
      sym: true,
      thighs: [[[106, 102], [142, 118]], [[94, 100], [70, 132]]],
      legLen: 21,
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
