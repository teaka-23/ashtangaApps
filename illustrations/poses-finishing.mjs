/**
 * Прогиб и завершающая последовательность первой серии.
 * Перевороты: макушка или плечи на полу, ноги вверх. Лотос — скрещенные стопы.
 * Баддха Падмасана — йога-мудра (наклон в захвате). Шавасана — лёжа лицом вверх.
 */
import { draw, svgDocument } from './figure.mjs';

const { leg, thigh, shin, arm, torso, shortsFrame, head, headFront, shadow, groundLine } = draw;

function doc(parts) {
  return svgDocument([groundLine(), ...parts].join('\n'));
}

/** Урдхва Дханурасана: колесо, ладони и стопы на полу, живот вверх, взгляд к полу. */
export function urdhvaDhanurasana() {
  return doc([
    shadow(104, 56),
    arm([78, 98], [58, 128], [50, 158], { far: true, hand: 'flat', fingers: 1 }),
    arm([86, 102], [66, 132], [58, 158], { hand: 'flat', fingers: 1 }),
    leg([120, 90], [148, 122], [150, 158], { far: true, foot: 'flat', toe: 1, underShorts: true }),
    leg([128, 94], [156, 126], [158, 158], { foot: 'flat', toe: 1, underShorts: true }),
    torso([
      [70, 118],
      [96, 78],
      [118, 70],
      [136, 90],
      [124, 108],
      [98, 114],
      [74, 124],
    ]),
    shortsFrame([123, 88], [-0.85, -0.52], [0.52, -0.85], {
      rise: 11,
      half: 11.5,
      backW: 1.05,
      frontW: 0.95,
      thighs: [[[128, 94], [156, 126]], [[120, 90], [148, 122]]],
      legLen: 18,
      inline: true,
    }),
    head([60, 136], [-0.1, 0.99], [-0.95, -0.2], [76, 112]),
  ]);
}

/** Саламба Сарвангасана, профиль: плечи и затылок на полу, локти сзади, ладони держат спину, ноги вертикально вверх. */
export function salambaSarvangasana() {
  return doc([
    shadow(108, 42),
    arm([106, 148], [84, 158], [94, 112], { far: true, hand: 'hold' }),
    leg([96, 76], [96, 46], [96, 16], { far: true, foot: 'free', toe: 1, underShorts: true }),
    torso([
      [96, 158],
      [114, 158],
      [112, 116],
      [108, 76],
      [94, 76],
      [92, 116],
    ]),
    leg([104, 78], [104, 48], [104, 18], { foot: 'free', toe: 1, underShorts: true }),
    shortsFrame([100, 78], [0, 1], [1, 0], {
      rise: 9,
      half: 10,
      thighs: [[[104, 78], [104, 48]], [[96, 76], [96, 46]]],
      legLen: 15,
      inline: true,
    }),
    arm([112, 148], [88, 160], [100, 116], { hand: 'hold' }),
    head([126, 157], [0.25, -0.97], [0.98, 0.15], [112, 154]),
  ]);
}

/** Халасана, профиль. Торс вертикально над плечами, прямые ноги опущены за голову, руки на полу за спиной. */
export function halasana() {
  return doc([
    shadow(112, 66),
    arm([104, 156], [78, 160], [52, 160], { far: true, hand: 'palm', fingers: -1 }),
    leg([94, 76], [130, 118], [166, 158], { far: true, foot: 'tops', toe: 1, underShorts: true }),
    torso([
      [98, 158],
      [114, 158],
      [110, 116],
      [106, 76],
      [92, 76],
      [90, 116],
    ]),
    leg([102, 78], [138, 120], [174, 158], { foot: 'tops', toe: 1, underShorts: true }),
    shortsFrame([98, 78], [0, 1], [1, 0], {
      rise: 11,
      half: 11.5,
      backW: 1.05,
      frontW: 0.9,
      thighs: [[[102, 78], [138, 120]], [[94, 76], [130, 118]]],
      legLen: 20,
      crotch: 6.2,
      inline: true,
    }),
    arm([110, 156], [82, 160], [56, 160], { hand: 'palm', fingers: -1 }),
    head([124, 157], [0.7, -0.7], [0.98, 0.15], [112, 154]),
  ]);
}

/** Карнапидасана, профиль. Колени у ушей на полу, голени лежат горизонтально на полу, руки за спиной. */
export function karnapidasana() {
  return doc([
    shadow(110, 62),
    arm([104, 156], [78, 160], [50, 160], { far: true, hand: 'palm', fingers: -1 }),
    leg([92, 82], [130, 154], [166, 158], { far: true, foot: 'tops', toe: 1, underShorts: true }),
    torso([
      [96, 158],
      [112, 158],
      [108, 118],
      [104, 80],
      [90, 80],
      [88, 118],
    ]),
    leg([100, 84], [138, 154], [174, 158], { foot: 'tops', toe: 1, underShorts: true }),
    shortsFrame([96, 82], [0, 1], [1, 0], {
      rise: 9,
      half: 9.5,
      backW: 0.95,
      thighs: [[[100, 84], [138, 154]], [[92, 82], [130, 154]]],
      legLen: 15,
      inline: true,
    }),
    arm([108, 156], [82, 160], [54, 160], { hand: 'palm', fingers: -1 }),
    head([122, 157], [0.35, -0.94], [0.95, 0.2], [110, 154]),
  ]);
}

/** Урдхва падмасана, профиль по плакату: стойка на плечах, лотос наверху, ладони упираются в колени. */
export function urdhvaPadmasana() {
  return doc([
    shadow(108, 40),
    arm([106, 148], [122, 108], [118, 68], { far: true, hand: 'hold' }),
    torso([
      [96, 158],
      [114, 158],
      [112, 116],
      [106, 80],
      [92, 80],
      [90, 116],
    ]),
    thigh([94, 80], [116, 60], { far: true, underShorts: true }),
    thigh([102, 82], [126, 66], { underShorts: true }),
    shortsFrame([98, 80], [0, 1], [1, 0], {
      rise: 9,
      half: 9.5,
      thighs: [[[102, 82], [126, 66]], [[94, 80], [116, 60]]],
      legLen: 15,
      inline: true,
    }),
    shin([116, 60], [96, 72], { far: true, foot: 'lotus', toe: -1 }),
    shin([126, 66], [102, 76], { foot: 'lotus', toe: -1 }),
    arm([112, 148], [130, 110], [124, 70], { hand: 'hold' }),
    head([124, 157], [0.35, -0.94], [0.98, 0.15], [112, 154]),
  ]);
}

/** Пиндасана: компактный шар в стойке на плечах, лотос прижат к лицу, руки обхватывают колени. */
export function pindasana() {
  return doc([
    shadow(106, 38),
    arm([104, 142], [132, 134], [124, 112], { far: true, hand: 'hang' }),
    torso([
      [108, 152],
      [88, 146],
      [74, 126],
      [76, 100],
      [88, 82],
      [102, 78],
      [112, 92],
      [104, 116],
      [110, 144],
    ]),
    thigh([92, 84], [124, 108], { far: true, underShorts: true }),
    thigh([98, 86], [132, 116], { underShorts: true }),
    shortsFrame([93, 88], [-0.35, 0.94], [0.94, 0.35], {
      rise: 9,
      half: 10.5,
      backW: 1.0,
      thighs: [[[98, 86], [132, 116]], [[92, 84], [124, 108]]],
      legLen: 15,
      inline: true,
    }),
    shin([124, 108], [102, 106], { far: true, foot: 'lotus', toe: -1 }),
    shin([132, 116], [106, 114], { foot: 'lotus', toe: -1 }),
    arm([110, 142], [140, 136], [128, 118], { hand: 'hang' }),
    head([124, 156], [-0.45, -0.89], [0.85, 0.52], [110, 148]),
  ]);
}

/** Матсьясана: грудь высокой аркой (просвет под спиной), макушка на полу, ноги в лотосе на полу. */
export function matsyasana() {
  return doc([
    shadow(108, 60),
    arm([78, 124], [96, 152], [126, 152], { far: true, hand: 'hold' }),
    torso([
      [58, 130],
      [84, 114],
      [106, 124],
      [120, 142],
      [126, 158],
      [112, 162],
      [96, 148],
      [74, 142],
      [56, 144],
    ]),
    thigh([118, 152], [154, 146], { far: true, underShorts: true }),
    thigh([122, 156], [162, 158], { underShorts: true }),
    shortsFrame([120, 154], [-0.9, -0.44], [0.44, -0.9], {
      rise: 8,
      half: 8.5,
      thighs: [[[122, 156], [162, 158]], [[118, 152], [154, 146]]],
      legLen: 15,
      inline: true,
    }),
    shin([154, 146], [130, 154], { far: true, foot: 'lotus', toe: -1 }),
    shin([162, 158], [134, 146], { foot: 'lotus', toe: -1 }),
    arm([86, 126], [104, 154], [134, 148], { hand: 'hold' }),
    head([46, 156], [0.65, -0.76], [-0.75, 0.66], [62, 138]),
  ]);
}

/** Уттана Падасана: макушка на полу, грудь аркой вверх, руки и ноги вперёд-вверх под ~45°. */
export function uttanaPadasana() {
  return doc([
    shadow(108, 52),
    arm([88, 128], [112, 102], [136, 76], { far: true, hand: 'prayer' }),
    leg([118, 144], [142, 118], [164, 92], { far: true, foot: 'free', toe: 1, underShorts: true }),
    leg([124, 148], [148, 122], [170, 96], { foot: 'free', toe: 1, underShorts: true }),
    torso([
      [68, 140],
      [90, 118],
      [116, 126],
      [128, 142],
      [118, 158],
      [90, 158],
      [70, 150],
    ]),
    // Ноги почти параллельны — трубка along, не hull по двум близким thighs.
    shortsFrame([121, 146], [-0.85, -0.52], [0.52, -0.85], {
      rise: 10,
      hem: 16,
      along: [0.72, -0.7],
      inline: true,
    }),
    arm([94, 130], [118, 104], [142, 78], { hand: 'prayer' }),
    head([56, 157], [0.2, -0.98], [-0.95, 0.3], [70, 144]),
  ]);
}

/** Ширшасана, фронтально: локти на полу, ладони в замке, тело одной линией вверх, носки вдоль голеней. */
export function sirsasana() {
  return doc([
    shadow(100, 42),
    arm([76, 152], [56, 166], [86, 166], { far: true, hand: 'hold' }),
    arm([124, 152], [144, 166], [114, 166], { hand: 'hold' }),
    leg([96, 68], [96, 44], [96, 16], { far: true, foot: 'free', toe: 1, underShorts: true }),
    leg([104, 70], [104, 44], [104, 18], { foot: 'free', toe: 1, underShorts: true }),
    torso([
      [88, 138],
      [112, 138],
      [110, 100],
      [108, 76],
      [92, 76],
      [90, 100],
    ]),
    shortsFrame([100, 80], [0, 1], [1, 0], {
      rise: 9,
      half: 11.2,
      wTop: 6.6,
      wBot: 6.0,
      sym: true,
      crotch: 7.0,
      thighs: [[[104, 70], [104, 44]], [[96, 68], [96, 44]]],
      legLen: 15,
      inline: true,
    }),
    headFront([100, 156], [100, 140], [0, -1]),
  ]);
}

/** Баддха падмасана (Йога-мудра): наклон вперёд в лотосе, лоб на полу, руки за спиной в захвате. */
export function baddhaPadmasana() {
  return doc([
    shadow(104, 48),
    arm([114, 134], [98, 112], [86, 130], { far: true, hand: 'hold' }),
    torso([
      [78, 148],
      [84, 128],
      [104, 122],
      [126, 130],
      [134, 146],
      [118, 156],
      [90, 158],
      [78, 154],
    ]),
    thigh([84, 152], [118, 160], { far: true, underShorts: true }),
    thigh([88, 154], [126, 162], { underShorts: true }),
    shortsFrame([84, 150], [0.7, -0.7], [0.7, 0.7], {
      rise: 9,
      half: 10,
      thighs: [[[88, 154], [126, 162]], [[84, 152], [118, 160]]],
      legLen: 15,
      inline: true,
    }),
    shin([118, 160], [90, 148], { far: true, foot: 'lotus', toe: -1 }),
    shin([126, 162], [96, 152], { foot: 'lotus', toe: -1 }),
    arm([120, 138], [102, 116], [90, 134], { hand: 'hold' }),
    head([148, 157], [0.35, 0.94], [0.88, 0.42], [132, 146]),
  ]);
}

/** Падмасана: фронтально, полный лотос, прямая спина, кисти на коленях. */
export function padmasana() {
  return doc([
    shadow(100, 50),
    torso([
      [78, 86],
      [100, 80],
      [122, 86],
      [114, 112],
      [112, 130],
      [108, 144],
      [92, 144],
      [88, 130],
      [86, 112],
    ]),
    thigh([92, 142], [54, 156], { far: true, underShorts: true }),
    thigh([108, 142], [146, 156], { underShorts: true }),
    shortsFrame([100, 140], [0, -1], [1, 0], {
      rise: 9,
      half: 11.5,
      sym: true,
      thighs: [[[108, 142], [146, 156]], [[92, 142], [54, 156]]],
      legLen: 15,
      inline: true,
    }),
    shin([54, 156], [116, 142], { far: true, foot: 'lotus', toe: 1 }),
    shin([146, 156], [84, 142], { foot: 'lotus', toe: -1 }),
    arm([78, 92], [68, 122], [56, 148], { hand: 'hang' }),
    arm([122, 92], [132, 122], [144, 148], { hand: 'hang' }),
    headFront([100, 64], [100, 82], [0, 1]),
  ]);
}

/** Утплутих (Толасана): фронтально, полный лотос поднят на прямых руках, ладони на полу. */
export function utpluthih() {
  return doc([
    shadow(100, 46),
    arm([74, 82], [64, 120], [58, 158], { hand: 'flat', fingers: -1 }),
    arm([126, 82], [136, 120], [142, 158], { hand: 'flat', fingers: 1 }),
    torso([
      [76, 76],
      [100, 70],
      [124, 76],
      [114, 102],
      [112, 122],
      [108, 134],
      [92, 134],
      [88, 122],
      [86, 102],
    ]),
    thigh([92, 132], [64, 142], { far: true, underShorts: true }),
    thigh([108, 132], [136, 142], { underShorts: true }),
    shortsFrame([100, 130], [0, -1], [1, 0], {
      rise: 9,
      half: 11.5,
      sym: true,
      thighs: [[[108, 132], [136, 142]], [[92, 132], [64, 142]]],
      legLen: 15,
      inline: true,
    }),
    shin([64, 142], [116, 130], { far: true, foot: 'lotus', toe: 1 }),
    shin([136, 142], [84, 130], { foot: 'lotus', toe: -1 }),
    headFront([100, 54], [100, 72], [0, 1]),
  ]);
}

/** Шавасана: лёжа на полу на спине, руки вдоль тела, лицо вверх. */
export function savasana() {
  return doc([
    shadow(108, 62),
    leg([108, 158], [136, 160], [166, 162], { far: true, foot: 'flex', toe: 1, underShorts: true }),
    leg([112, 156], [140, 158], [170, 160], { foot: 'flex', toe: 1, underShorts: true }),
    arm([70, 156], [88, 162], [106, 165], { far: true, hand: 'hang' }),
    torso([
      [52, 148],
      [78, 146],
      [110, 148],
      [116, 160],
      [104, 167],
      [70, 167],
      [50, 160],
    ]),
    shortsFrame([106, 158], [-1, 0.08], [0.08, -1], {
      rise: 10,
      half: 12,
      backW: 1.1,
      frontW: 0.95,
      thighs: [[[112, 156], [148, 158]], [[108, 158], [144, 160]]],
      legLen: 22,
      crotch: 6.0,
      forceEnvelope: true,
      inline: true,
    }),
    arm([78, 154], [96, 162], [114, 165], { hand: 'hang' }),
    head([38, 157], [0.15, -0.99], [-1, 0.05], [52, 156]),
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
