/**
 * Прогиб и завершающая последовательность первой серии.
 * Перевороты: макушка или плечи на полу, ноги вверх. Лотос — скрещенные стопы.
 * Баддха Падмасана — йога-мудра (наклон в захвате). Шавасана — лёжа лицом вверх.
 */
import { draw, svgDocument } from './figure.mjs';

const { leg, arm, torso, shortsFrame, head, headFront, shadow, groundLine } = draw;

function doc(parts) {
  return svgDocument([groundLine(), ...parts].join('\n'));
}

/** Урдхва Дханурасана: колесо, ладони и стопы на полу, живот вверх, взгляд к полу. */
export function urdhvaDhanurasana() {
  return doc([
    shadow(104, 56),
    arm([78, 98], [58, 128], [50, 158], { far: true, hand: 'flat', fingers: 1 }),
    arm([86, 102], [66, 132], [58, 158], { hand: 'flat', fingers: 1 }),
    leg([120, 90], [148, 122], [150, 158], { far: true, foot: 'flat', toe: 1 }),
    leg([128, 94], [156, 126], [158, 158], { foot: 'flat', toe: 1 }),
    torso([
      [70, 118],
      [96, 78],
      [122, 62],
      [140, 84],
      [126, 108],
      [98, 114],
      [74, 124],
    ]),
    shortsFrame([128, 88], [-0.8, 0.45], [0.2, -0.98], { rise: 12, hem: 13, half: 12, cheek: 13 }),
    head([60, 136], [-0.1, 0.99], [-0.95, -0.2], [76, 112]),
  ]);
}

/** Саламба Сарвангасана: плечи на полу, руки в поясницу, ноги вверх. */
export function salambaSarvangasana() {
  return doc([
    shadow(100, 34),
    arm([90, 142], [72, 158], [98, 146], { far: true, hand: 'hold' }),
    arm([110, 142], [128, 158], [104, 146], { hand: 'hold' }),
    leg([98, 58], [98, 34], [98, 16], { far: true, foot: 'freeFlex', toe: 1 }),
    leg([106, 60], [106, 36], [106, 18], { foot: 'freeFlex', toe: 1 }),
    torso([
      [86, 152],
      [114, 152],
      [112, 88],
      [108, 58],
      [96, 58],
      [88, 88],
    ]),
    shortsFrame([102, 62], [0, 1], [1, 0], { rise: 12, hem: 13, half: 11, cheek: 12 }),
    head([100, 158], [0, -1], [0, 1], [100, 146]),
  ]);
}

/** Халасана: пальцы ног на полу за головой, руки в поясницу. */
export function halasana() {
  return doc([
    shadow(80, 48),
    arm([96, 128], [82, 150], [108, 140], { far: true, hand: 'hold' }),
    arm([104, 124], [90, 148], [116, 136], { hand: 'hold' }),
    leg([124, 68], [78, 100], [32, 158], { far: true, foot: 'flat', toe: -1 }),
    leg([130, 72], [84, 104], [42, 158], { foot: 'flat', toe: -1 }),
    torso([
      [86, 136],
      [104, 128],
      [118, 96],
      [122, 76],
      [108, 72],
      [94, 100],
      [82, 128],
    ]),
    shortsFrame([116, 78], [-0.35, 0.94], [0.95, 0.2], { rise: 12, hem: 13, half: 11, cheek: 12 }),
    head([78, 152], [0.2, -0.98], [-0.7, 0.7], [90, 140]),
  ]);
}

/** Карнапидасана: колени у ушей, голени на полу. */
export function karnapidasana() {
  return doc([
    shadow(86, 46),
    arm([100, 124], [86, 148], [112, 138], { far: true, hand: 'hold' }),
    arm([108, 120], [94, 146], [120, 134], { hand: 'hold' }),
    leg([120, 86], [62, 140], [36, 158], { far: true, foot: 'tops', toe: -1 }),
    leg([126, 90], [74, 144], [48, 158], { foot: 'tops', toe: -1 }),
    torso([
      [90, 138],
      [108, 130],
      [120, 110],
      [124, 96],
      [110, 92],
      [96, 112],
      [86, 132],
    ]),
    shortsFrame([118, 98], [-0.2, 0.98], [0.98, 0.15], { rise: 12, hem: 13, half: 11, cheek: 12 }),
    head([92, 150], [0.15, -0.99], [-0.45, 0.89], [100, 138]),
  ]);
}

/** Урдхва Падмасана: лотос в стойке на плечах, руки поддерживают колени. */
export function urdhvaPadmasana() {
  return doc([
    shadow(90, 40),
    leg([96, 78], [68, 62], [100, 48], { far: true, foot: 'free', toe: 1 }),
    leg([106, 80], [134, 64], [104, 52], { foot: 'free', toe: -1 }),
    arm([84, 124], [70, 92], [72, 66], { far: true, hand: 'hold' }),
    torso([
      [78, 142],
      [96, 134],
      [108, 104],
      [112, 78],
      [100, 74],
      [88, 104],
      [76, 134],
    ]),
    shortsFrame([102, 80], [0.05, 1], [1, 0], { rise: 12, hem: 13, half: 11, cheek: 12 }),
    arm([108, 120], [128, 90], [130, 66], { hand: 'hold' }),
    head([60, 152], [0.3, -0.95], [-0.5, 0.87], [74, 142]),
  ]);
}

/** Пиндасана: лотос сложен к лицу в стойке на плечах. */
export function pindasana() {
  return doc([
    shadow(92, 40),
    leg([98, 108], [74, 124], [96, 96], { far: true, foot: 'free', toe: 1 }),
    leg([108, 110], [132, 122], [108, 98], { foot: 'free', toe: -1 }),
    arm([86, 128], [74, 112], [78, 128], { far: true, hand: 'hold' }),
    torso([
      [80, 146],
      [98, 138],
      [112, 120],
      [114, 104],
      [100, 100],
      [88, 118],
      [78, 138],
    ]),
    shortsFrame([104, 108], [0.1, 1], [1, 0], { rise: 11, hem: 12, half: 11, cheek: 12 }),
    arm([110, 124], [128, 112], [124, 128], { hand: 'hold' }),
    head([70, 152], [0.25, -0.97], [-0.4, 0.92], [82, 142]),
  ]);
}

/** Матсьясана: лотос, макушка на полу, грудь вверх, руки держат стопы. */
export function matsyasana() {
  return doc([
    shadow(110, 48),
    leg([118, 128], [84, 146], [122, 112], { far: true, foot: 'free', toe: 1 }),
    leg([126, 132], [156, 144], [120, 118], { foot: 'free', toe: -1 }),
    arm([76, 104], [98, 116], [118, 114], { far: true, hand: 'hold' }),
    torso([
      [56, 142],
      [82, 100],
      [114, 96],
      [132, 118],
      [122, 146],
      [92, 152],
      [58, 152],
    ]),
    shortsFrame([122, 134], [-0.9, 0.2], [0.15, -0.99], { rise: 12, hem: 13, half: 12, cheek: 13 }),
    arm([92, 102], [114, 116], [128, 120], { hand: 'hold' }),
    head([44, 156], [0.45, -0.89], [-0.96, 0.28], [60, 140]),
  ]);
}

/** Уттана Падасана: макушка на полу, грудь вверх, руки и ноги около 45°. */
export function uttanaPadasana() {
  return doc([
    shadow(108, 52),
    arm([82, 118], [58, 96], [38, 74], { far: true, hand: 'reach' }),
    arm([90, 116], [66, 94], [46, 72], { hand: 'reach' }),
    leg([118, 136], [142, 110], [164, 84], { far: true, foot: 'free', toe: 1 }),
    leg([124, 140], [148, 114], [170, 88], { foot: 'free', toe: 1 }),
    torso([
      [70, 132],
      [92, 108],
      [118, 116],
      [128, 132],
      [118, 148],
      [92, 150],
      [72, 142],
    ]),
    shortsFrame([120, 140], [-0.7, 0.35], [0.35, -0.94], { rise: 12, hem: 13, half: 12, cheek: 13 }),
    head([58, 150], [0.2, -0.98], [-0.95, 0.3], [72, 136]),
  ]);
}

/** Ширшасана, фронтально: локти на полу, ладони в замке, тело одной линией вверх, носки вдоль голеней. */
export function sirsasana() {
  return doc([
    shadow(100, 42),
    arm([76, 152], [56, 166], [86, 166], { far: true, hand: 'hold' }),
    arm([124, 152], [144, 166], [114, 166], { hand: 'hold' }),
    leg([96, 78], [96, 44], [96, 16], { far: true, foot: 'free', toe: 1 }),
    leg([104, 78], [104, 44], [104, 16], { foot: 'free', toe: 1 }),
    torso([
      [88, 138],
      [112, 138],
      [110, 100],
      [106, 76],
      [94, 76],
      [90, 100],
    ]),
    shortsFrame([100, 80], [0, 1], [1, 0], { rise: 12, hem: 14, half: 12, cheek: 13 }),
    headFront([100, 156], [100, 140], [0, -1]),
  ]);
}

/** Баддха Падмасана: йога-мудра, наклон вперёд, руки сзади держат стопы. */
export function baddhaPadmasana() {
  return doc([
    shadow(100, 46),
    leg([92, 148], [60, 156], [104, 132], { far: true, foot: 'free', toe: 1 }),
    leg([108, 148], [140, 156], [100, 136], { foot: 'free', toe: -1 }),
    arm([84, 112], [62, 126], [84, 142], { far: true, hand: 'hold' }),
    torso([
      [76, 104],
      [124, 104],
      [118, 134],
      [108, 152],
      [92, 152],
      [82, 134],
    ]),
    shortsFrame([100, 150], [0, -1], [1, 0], { rise: 11, hem: 12, half: 13, cheek: 12 }),
    arm([116, 112], [138, 126], [116, 142], { hand: 'hold' }),
    headFront([100, 122], [100, 108], [0, 1]),
  ]);
}

/** Падмасана: лотос, корпус вертикально, ладони на коленях. */
export function padmasana() {
  return doc([
    shadow(100, 42),
    leg([92, 140], [62, 152], [100, 124], { far: true, foot: 'free', toe: 1 }),
    leg([108, 142], [140, 152], [104, 128], { foot: 'free', toe: -1 }),
    arm([88, 96], [72, 122], [66, 146], { far: true, hand: 'hang' }),
    torso([
      [84, 64],
      [116, 64],
      [114, 108],
      [108, 142],
      [92, 142],
      [86, 108],
    ]),
    shortsFrame([100, 140], [0, -1], [1, 0], { rise: 12, hem: 13, half: 12, cheek: 13 }),
    arm([112, 96], [128, 122], [134, 146], { hand: 'hang' }),
    headFront([100, 46], [100, 62], [0, 1]),
  ]);
}

/** Утплутих: лотос поднят на прямых руках, ладони по бокам таза. */
export function utpluthih() {
  return doc([
    shadow(100, 40),
    arm([82, 104], [64, 132], [54, 158], { far: true, hand: 'flat', fingers: -1 }),
    arm([118, 104], [136, 132], [146, 158], { hand: 'flat', fingers: 1 }),
    torso([
      [84, 72],
      [116, 72],
      [114, 108],
      [106, 122],
      [94, 122],
      [86, 108],
    ]),
    shortsFrame([100, 114], [0, -1], [1, 0], { rise: 12, hem: 12, half: 12, cheek: 12 }),
    leg([96, 112], [70, 120], [104, 104], { far: true, foot: 'free', toe: 1 }),
    leg([104, 114], [130, 122], [100, 106], { foot: 'free', toe: -1 }),
    headFront([100, 54], [100, 70], [0, 1]),
  ]);
}

/** Шавасана: лёжа на спине, руки вдоль тела, лицо вверх. */
export function savasana() {
  return doc([
    shadow(108, 62),
    leg([108, 146], [136, 152], [166, 158], { far: true, foot: 'flex', toe: 1 }),
    leg([112, 142], [140, 148], [170, 154], { foot: 'flex', toe: 1 }),
    arm([70, 140], [86, 150], [104, 156], { far: true, hand: 'hang' }),
    torso([
      [52, 132],
      [78, 128],
      [110, 132],
      [116, 144],
      [104, 152],
      [70, 150],
      [50, 140],
    ]),
    shortsFrame([110, 144], [-1, 0.08], [0.05, -1], { rise: 12, hem: 13, half: 12, cheek: 13 }),
    arm([78, 136], [94, 146], [112, 152], { hand: 'hang' }),
    head([38, 136], [0.15, -0.99], [-1, 0.05], [52, 136]),
  ]);
}

export const FILES = [
  ['55-urdhva-dhanurasana', urdhvaDhanurasana],
  ['56-salamba-sarvangasana', salambaSarvangasana],
  ['57-halasana', halasana],
  ['58-karnapidasana', karnapidasana],
  ['59-urdhva-padmasana', urdhvaPadmasana],
  ['60-pindasana', pindasana],
  ['61-matsyasana', matsyasana],
  ['62-uttana-padasana', uttanaPadasana],
  ['63-sirsasana', sirsasana],
  ['64-baddha-padmasana', baddhaPadmasana],
  ['65-padmasana', padmasana],
  ['66-utpluthih', utpluthih],
  ['67-savasana', savasana],
];
