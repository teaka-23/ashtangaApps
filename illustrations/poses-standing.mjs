/**
 * Стоячие позы первой серии.
 * Профиль лицом вправо; широкие стойки (триконасана, прасарита, паршваконасана,
 * вирабхадрасана 2, уттхита хаста B) — фронтально, как на плакате.
 * Падангустхасана: локти наружу, захват больших пальцев. Пада хастасана: ладони под стопы.
 * Прасарита: голова висит макушкой к полу. Паршвоттанасана: намасте за спиной, складка к ноге.
 */
import { draw, svgDocument } from './figure.mjs';

const { leg, arm, torso, shortsFrame, head, headFront, shadow, groundLine } = draw;

function doc(parts) {
  return svgDocument([groundLine(), ...parts].join('\n'));
}

/** Падангустхасана: складка, локти наружу-назад, пальцы на больших пальцах ног, нос вниз. */
export function padangusthasana() {
  return doc([
    shadow(108, 42),
    leg([96, 78], [98, 118], [100, 158], { far: true, foot: 'flat', toe: 1 }),
    leg([106, 80], [108, 120], [108, 158], { foot: 'flat', toe: 1 }),
    arm([118, 118], [106, 138], [106, 154], { far: true, hand: 'hold' }),
    torso([
      [92, 70],
      [108, 74],
      [124, 108],
      [128, 124],
      [116, 128],
      [100, 96],
      [88, 82],
    ]),
    shortsFrame([100, 82], [0.75, 0.66], [0.05, 1], { rise: 11, hem: 14, half: 12, cheek: 14 }),
    arm([126, 120], [114, 142], [114, 156], { hand: 'hold' }),
    head([132, 136], [0.15, 0.99], [0.35, -0.25], [124, 124]),
  ]);
}

/** Пада хастасана: складка глубже, ладони под стопами, пальцы вперёд из-под пяток. */
export function padaHastasana() {
  return doc([
    shadow(108, 42),
    leg([96, 78], [98, 118], [100, 158], { far: true, foot: 'flat', toe: 1 }),
    leg([106, 80], [108, 120], [108, 158], { foot: 'flat', toe: 1 }),
    arm([118, 114], [104, 138], [100, 156], { far: true, hand: 'hang' }),
    torso([
      [92, 68],
      [108, 72],
      [124, 106],
      [128, 122],
      [116, 126],
      [100, 94],
      [88, 80],
    ]),
    shortsFrame([100, 80], [0.75, 0.66], [0.05, 1], { rise: 11, hem: 14, half: 12, cheek: 14 }),
    arm([126, 116], [110, 140], [106, 156], { hand: 'hang' }),
    head([130, 134], [0.15, 0.99], [0.35, -0.25], [122, 122]),
  ]);
}

/** Уттхита триконасана А: правая рука к правой стопе, левая вверх, взгляд вверх. */
export function utthitaTrikonasanaA() {
  return doc([
    shadow(102, 54),
    leg([94, 96], [74, 128], [56, 158], { far: true, foot: 'flat', toe: -1 }),
    leg([106, 96], [126, 128], [144, 158], { foot: 'flat', toe: 1 }),
    arm([104, 62], [98, 36], [96, 14], { far: true, hand: 'up' }),
    torso([
      [102, 58],
      [116, 62],
      [120, 78],
      [114, 96],
      [102, 100],
      [94, 96],
      [96, 74],
    ]),
    shortsFrame([102, 96], [0.2, -1], [1, 0.15], { rise: 12, hem: 14, half: 12, cheek: 14 }),
    arm([116, 66], [128, 110], [140, 152], { hand: 'hang' }),
    head([112, 46], [0.3, -0.95], [-0.1, -1], [108, 60]),
  ]);
}

/** Уттхита триконасана B (революция): левая рука через корпус к правой стопе, правая вверх. */
export function utthitaTrikonasanaB() {
  return doc([
    shadow(102, 54),
    leg([94, 96], [74, 128], [56, 158], { far: true, foot: 'flat', toe: -1 }),
    leg([106, 96], [126, 128], [144, 158], { foot: 'flat', toe: 1 }),
    arm([112, 62], [116, 34], [118, 12], { far: true, hand: 'up' }),
    torso([
      [102, 58],
      [116, 62],
      [120, 78],
      [114, 96],
      [102, 100],
      [94, 96],
      [96, 74],
    ]),
    shortsFrame([102, 96], [0.2, -1], [1, 0.15], { rise: 12, hem: 14, half: 12, cheek: 14 }),
    arm([102, 66], [120, 110], [138, 152], { hand: 'hang' }),
    head([112, 46], [0.3, -0.95], [-0.1, -1], [108, 60]),
  ]);
}

/**
 * Паривритта триконасана, профиль. Ноги в линию, обе стопы носками вперёд.
 * Нижняя ладонь снаружи передней стопы, пальцы вперёд, верхняя рука вверх, взгляд вверх.
 */
export function parivrttaTrikonasana() {
  return doc([
    shadow(100, 54),
    leg([88, 104], [66, 132], [46, 158], { far: true, foot: 'flat', toe: 1 }),
    leg([100, 106], [122, 132], [140, 158], { foot: 'flat', toe: 1 }),
    torso([
      [82, 90],
      [102, 70],
      [124, 84],
      [132, 100],
      [116, 114],
      [94, 116],
      [80, 104],
    ]),
    arm([106, 72], [102, 38], [100, 12], { hand: 'up' }),
    shortsFrame([94, 108], [0.4, -0.92], [0.22, 0.98], { rise: 12, hem: 14, half: 13, cheek: 14 }),
    arm([118, 96], [138, 128], [160, 158], { hand: 'flat', fingers: 1 }),
    head([114, 54], [0.02, -1], [-0.15, -0.99], [108, 70]),
  ]);
}

/** Уттхита паршваконасана А: передняя нога 90°, ладонь на полу у стопы, верхняя рука в линию ноги. */
export function utthitaParshvakonasanaA() {
  return doc([
    shadow(104, 56),
    leg([92, 100], [68, 132], [50, 158], { far: true, foot: 'flat', toe: -1 }),
    leg([104, 102], [140, 116], [140, 158], { foot: 'flat', toe: 1 }),
    arm([106, 70], [136, 44], [162, 26], { far: true, hand: 'up' }),
    torso([
      [106, 66],
      [120, 72],
      [122, 86],
      [112, 102],
      [98, 104],
      [92, 94],
      [96, 76],
    ]),
    shortsFrame([100, 102], [0.3, -1], [1, 0.2], { rise: 12, hem: 14, half: 12, cheek: 14 }),
    arm([118, 78], [134, 122], [148, 158], { hand: 'flat', fingers: 1 }),
    head([116, 58], [0.5, -0.87], [-0.2, -1], [114, 70]),
  ]);
}

/** Уттхита паршваконасана B (революция): левая ладонь у правой стопы, правая рука вверх-вперёд. */
export function utthitaParshvakonasanaB() {
  return doc([
    shadow(104, 56),
    leg([92, 100], [68, 132], [50, 158], { far: true, foot: 'flat', toe: -1 }),
    leg([104, 102], [140, 116], [140, 158], { foot: 'flat', toe: 1 }),
    arm([112, 68], [140, 40], [164, 22], { far: true, hand: 'up' }),
    torso([
      [104, 64],
      [118, 70],
      [120, 84],
      [110, 100],
      [96, 102],
      [90, 92],
      [94, 74],
    ]),
    shortsFrame([98, 100], [0.3, -1], [1, 0.2], { rise: 12, hem: 14, half: 12, cheek: 14 }),
    arm([102, 74], [124, 120], [142, 158], { hand: 'flat', fingers: 1 }),
    head([114, 56], [0.5, -0.87], [-0.2, -1], [112, 68]),
  ]);
}

/**
 * Паривритта паршваконасана, профиль. Переднее колено над стопой, задняя нога прямая.
 * Нижняя ладонь снаружи передней стопы, локоть назад, верхняя рука вперёд-вверх, взгляд вверх.
 */
export function parivrttaParshvakonasana() {
  return doc([
    shadow(104, 56),
    leg([88, 108], [62, 134], [40, 158], { far: true, foot: 'flat', toe: 1 }),
    leg([100, 110], [136, 116], [136, 158], { foot: 'flat', toe: 1 }),
    torso([
      [90, 72],
      [108, 66],
      [122, 82],
      [118, 104],
      [104, 114],
      [88, 112],
      [84, 90],
    ]),
    arm([108, 68], [128, 34], [146, 10], { hand: 'up' }),
    shortsFrame([96, 110], [0.15, -0.99], [0.85, 0.35], { rise: 12, hem: 14, half: 12, cheek: 14 }),
    arm([112, 90], [128, 122], [152, 158], { hand: 'flat', fingers: 1 }),
    head([116, 56], [0.45, -0.89], [-0.15, -0.99], [106, 70]),
  ]);
}

/** Общий каркас Прасариты: широкие ноги фронтально, складка, голова макушкой к полу. */
function prasaritaBase(arms) {
  return doc([
    shadow(102, 56),
    leg([94, 92], [74, 126], [56, 158], { far: true, foot: 'flat', toe: -1 }),
    leg([106, 92], [126, 126], [144, 158], { foot: 'flat', toe: 1 }),
    torso([
      [90, 84],
      [110, 84],
      [112, 118],
      [104, 134],
      [96, 134],
      [88, 118],
    ]),
    shortsFrame([100, 90], [0, -1], [1, 0], { rise: 12, hem: 14, half: 12, cheek: 14 }),
    ...arms,
    headFront([100, 148], [100, 132], [0, -1]),
  ]);
}

/** Прасарита падоттанасана А: ладони на полу в линии стоп, локти наружу. */
export function prasaritaA() {
  return prasaritaBase([
    arm([92, 104], [76, 128], [72, 158], { far: true, hand: 'flat', fingers: -1 }),
    arm([108, 104], [124, 128], [128, 158], { hand: 'flat', fingers: 1 }),
  ]);
}

/** Прасарита падоттанасана B: ладони на талии, локти наружу. */
export function prasaritaB() {
  return prasaritaBase([
    arm([92, 102], [74, 114], [86, 94], { far: true, hand: 'hang' }),
    arm([108, 102], [126, 114], [114, 94], { hand: 'hang' }),
  ]);
}

/** Прасарита падоттанасана C: замок за спиной, руки через голову к полу. */
export function prasaritaC() {
  return prasaritaBase([
    arm([92, 102], [84, 76], [96, 60], { far: true, hand: 'up' }),
    arm([108, 102], [116, 76], [104, 60], { hand: 'up' }),
  ]);
}

/** Прасарита падоттанасана D: захват больших пальцев ног, локти наружу. */
export function prasaritaD() {
  return prasaritaBase([
    arm([92, 104], [68, 130], [56, 150], { far: true, hand: 'hold' }),
    arm([108, 104], [132, 130], [144, 150], { hand: 'hold' }),
  ]);
}

/** Паршвоттанасана: пирамида, намасте за спиной, складка к передней ноге. */
export function parshvottanasana() {
  return doc([
    shadow(104, 50),
    leg([96, 98], [80, 128], [62, 158], { far: true, foot: 'flat', toe: 1 }),
    leg([106, 100], [122, 130], [136, 158], { foot: 'flat', toe: 1 }),
    arm([110, 104], [104, 88], [110, 76], { far: true, hand: 'up' }),
    torso([
      [92, 88],
      [106, 86],
      [128, 110],
      [136, 124],
      [126, 130],
      [102, 108],
      [88, 98],
    ]),
    shortsFrame([100, 94], [0.3, 1], [0.9, 0.3], { rise: 11, hem: 14, half: 12, cheek: 13 }),
    arm([118, 106], [112, 90], [118, 78], { hand: 'up' }),
    head([134, 132], [0.2, 0.98], [0.4, -0.2], [126, 122]),
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
    shortsFrame([98, 98], [0, -1], [1, 0], { rise: 12, hem: 14, half: 12, cheek: 14 }),
    arm([106, 64], [128, 80], [150, 88], { hand: 'hold' }),
    head([99, 44], [1, 0.05], [0, -1], [99, 58]),
  ]);
}

/** Уттхита хаста падангустхасана B: нога в сторону (фронтально), левая рука в сторону, взгляд влево. */
export function utthitaHastaPadangusthasanaB() {
  return doc([
    shadow(106, 54),
    leg([98, 98], [99, 130], [98, 158], { far: true, foot: 'flat', toe: 1 }),
    leg([104, 98], [132, 92], [160, 88], { foot: 'freeFlex', toe: 1 }),
    arm([94, 62], [70, 58], [48, 56], { far: true, hand: 'reach' }),
    torso([
      [92, 58],
      [108, 58],
      [110, 78],
      [106, 98],
      [94, 98],
      [90, 78],
    ]),
    shortsFrame([100, 96], [0, -1], [1, 0], { rise: 12, hem: 14, half: 12, cheek: 14 }),
    arm([106, 62], [130, 74], [158, 84], { hand: 'hold' }),
    head([100, 42], [-1, 0.05], [0, -1], [100, 56]),
  ]);
}

/** Ардха баддха падмоттанасана: полулотос стоя, связанная рука за спиной, складка, ладонь на полу. */
export function ardhaBaddhaPadmottanasana() {
  return doc([
    shadow(108, 42),
    leg([100, 82], [102, 122], [104, 158], { far: true, foot: 'flat', toe: 1 }),
    arm([122, 112], [108, 104], [100, 94], { far: true, hand: 'hold' }),
    torso([
      [92, 70],
      [108, 74],
      [124, 108],
      [128, 124],
      [116, 128],
      [100, 96],
      [88, 82],
    ]),
    shortsFrame([100, 82], [0.75, 0.66], [0.05, 1], { rise: 11, hem: 14, half: 12, cheek: 14 }),
    leg([100, 82], [134, 108], [110, 98], { foot: 'free', toe: -1 }),
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
    arm([94, 66], [72, 64], [52, 64], { far: true, hand: 'reach' }),
    torso([
      [92, 60],
      [108, 60],
      [110, 80],
      [106, 100],
      [94, 100],
      [90, 80],
    ]),
    shortsFrame([100, 98], [0, -1], [1, 0], { rise: 12, hem: 14, half: 12, cheek: 14 }),
    arm([106, 66], [128, 64], [148, 64], { hand: 'reach' }),
    head([100, 44], [1, 0.05], [0, -1], [100, 58]),
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
