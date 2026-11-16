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

/** Параллельная дуга lean-торса (y↓; верх = −sin). Между руками и тазом. */
function wheelTorso() {
  const cx = 106;
  const cy = 162;
  const ro = 80;
  const ri = 62;
  // Конец дуги = плечи (куда крепятся руки), не длинная «шея-торс».
  const a0 = (-132 * Math.PI) / 180;
  const a1 = (-52 * Math.PI) / 180;
  const n = 7;
  const outer = [];
  const inner = [];
  for (let i = 0; i <= n; i++) {
    const a = a0 + ((a1 - a0) * i) / n;
    const neckBoost = i === 0 ? 1.8 : i === 1 ? 0.8 : 0;
    outer.push([cx + (ro + neckBoost) * Math.cos(a), cy + (ro + neckBoost) * Math.sin(a)]);
  }
  for (let i = n; i >= 0; i--) {
    const a = a0 + ((a1 - a0) * i) / n;
    const widen = i === n ? 2.5 : i === n - 1 ? 1.2 : i === 0 ? 1.8 : 0;
    inner.push([cx + (ri - widen) * Math.cos(a), cy + (ri - widen) * Math.sin(a)]);
  }
  return [...outer, ...inner.slice(1, -1)];
}

/**
 * Урдхва Дханурасана: колесо — ладони и стопы на полу, голова свисает.
 * Торс = параллельная lean-дуга (~18px), без pinch-горы.
 */
export function urdhvaDhanurasana() {
  const trunk = wheelTorso();
  const shoulder = trunk[0];
  const hip = trunk[7];
  // Короткая шея: голова сразу под плечами, внахлёст на дугу.
  const headC = [shoulder[0] - 4, shoulder[1] + 14];
  return doc([
    shadow(106, 58),
    arm([shoulder[0] + 6, shoulder[1] + 4], [58, 136], [50, 160], { far: true, hand: 'flat', fingers: 1 }),
    arm([shoulder[0] + 16, shoulder[1] + 6], [66, 138], [58, 160], { hand: 'flat', fingers: 1 }),
    leg([hip[0] - 10, hip[1] - 2], [152, 126], [154, 158], { far: true, foot: 'flat', toe: 1, underShorts: true }),
    leg([hip[0], hip[1] + 2], [160, 130], [162, 158], { foot: 'flat', toe: 1, underShorts: true }),
    torso(trunk, { arch: true }),
    shortsFrame([hip[0] - 4, hip[1] + 4], [-0.78, -0.62], [0.15, -0.99], {
      rise: 11,
      half: 10.4,
      thighs: [
        [[hip[0], hip[1] + 2], [160, 130]],
        [[hip[0] - 10, hip[1] - 2], [152, 126]],
      ],
      legLen: 16,
      crotch: 5.4,
      inline: true,
    }),
    head(headC, [0.4, 0.92], [-0.55, -0.83], [shoulder[0] + 8, shoulder[1] + 2], { neckW: 6.0 }),
  ]);
}

/** Саламба Сарвангасана, профиль: плечи и затылок на полу, локти сзади, ладони держат спину, ноги вертикально вверх. */
/**
 * Саламба Сарвангасана: плечи на полу, lean-торс вверх одной линией, ладони держат спину.
 */
export function salambaSarvangasana() {
  return doc([
    shadow(110, 44),
    arm([104, 148], [80, 154], [94, 108], { far: true, hand: 'hold' }),
    thigh([96, 74], [96, 44], { far: true, underShorts: true }),
    torso([
      [90, 154],
      [112, 154],
      [110, 110],
      [106, 74],
      [96, 74],
      [90, 110],
    ]),
    thigh([104, 76], [104, 46], { underShorts: true }),
    shortsFrame([100, 76], [0, 1], [1, 0], {
      rise: 10,
      half: 10.0,
      thighs: [[[104, 76], [104, 46]], [[96, 74], [96, 44]]],
      legLen: 15,
      crotch: 5.2,
      inline: true,
    }),
    shin([96, 44], [96, 14], { far: true, foot: 'free', toe: 1 }),
    shin([104, 46], [104, 16], { foot: 'free', toe: 1 }),
    arm([110, 148], [84, 154], [100, 112], { hand: 'hold' }),
    head([88, 154], [0.22, -0.975], [0.98, 0.12], [96, 154]),
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
/**
 * Пиндасана в сарвангасане: компактный лотос у груди, руки обхватывают.
 */
/**
 * Пиндасана: плечи на полу, компактный лотос у груди, руки обхватывают ноги.
 */
export function pindasana() {
  return doc([
    shadow(108, 40),
    arm([102, 144], [130, 136], [118, 108], { far: true, hand: 'hold' }),
    torso([
      [104, 152],
      [86, 146],
      [72, 124],
      [74, 98],
      [88, 78],
      [104, 74],
      [112, 90],
      [106, 114],
      [108, 144],
    ]),
    thigh([92, 80], [124, 106], { far: true, underShorts: true }),
    thigh([98, 82], [132, 114], { underShorts: true }),
    shortsFrame([94, 84], [-0.35, 0.94], [0.94, 0.35], {
      rise: 10,
      half: 10.0,
      backW: 1.0,
      thighs: [[[98, 82], [132, 114]], [[92, 80], [124, 106]]],
      legLen: 14,
      crotch: 5.2,
      inline: true,
    }),
    shin([124, 106], [102, 104], { far: true, foot: 'lotus', toe: -1 }),
    shin([132, 114], [106, 112], { foot: 'lotus', toe: -1 }),
    arm([108, 144], [138, 138], [124, 114], { hand: 'hold' }),
    head([106, 148], [-0.4, -0.92], [0.86, 0.5], [108, 148]),
  ]);
}

/** Грудь-дуга матсьясаны: параллельная lean-лента с просветом, без горы. */
function matsyaTrunk() {
  const cx = 92;
  const cy = 168;
  const ro = 58;
  const ri = 42;
  const a0 = (-160 * Math.PI) / 180;
  const a1 = (-55 * Math.PI) / 180;
  const n = 6;
  const outer = [];
  const inner = [];
  for (let i = 0; i <= n; i++) {
    const a = a0 + ((a1 - a0) * i) / n;
    outer.push([cx + ro * Math.cos(a), cy + ro * Math.sin(a)]);
  }
  for (let i = n; i >= 0; i--) {
    const a = a0 + ((a1 - a0) * i) / n;
    const widen = i === n ? 2.4 : i === n - 1 ? 1.1 : 0;
    inner.push([cx + (ri - widen) * Math.cos(a), cy + (ri - widen) * Math.sin(a)]);
  }
  return [...outer, ...inner.slice(1, -1)];
}

/**
 * Матсьясана: lean-арка груди (просвет), макушка на полу, лотос, ладони под тазом.
 */
export function matsyasana() {
  const trunk = matsyaTrunk();
  const hip = trunk[6];
  const shoulder = trunk[0];
  return doc([
    shadow(112, 56),
    arm([shoulder[0] + 16, shoulder[1] - 10], [88, 152], [122, 152], { far: true, hand: 'hold' }),
    torso(trunk, { arch: true }),
    thigh([hip[0] - 4, hip[1] - 2], [166, 140], { far: true, underShorts: true }),
    thigh([hip[0] + 2, hip[1] + 2], [174, 154], { underShorts: true }),
    shortsFrame([hip[0], hip[1] + 2], [-0.92, -0.38], [0.4, -0.92], {
      rise: 10,
      half: 9.6,
      thighs: [
        [[hip[0] + 2, hip[1] + 2], [174, 154]],
        [[hip[0] - 4, hip[1] - 2], [166, 140]],
      ],
      legLen: 15,
      crotch: 5.2,
      inline: true,
    }),
    shin([166, 140], [140, 148], { far: true, foot: 'lotus', toe: -1 }),
    shin([174, 154], [144, 146], { foot: 'lotus', toe: -1 }),
    arm([shoulder[0] + 24, shoulder[1] - 8], [98, 154], [132, 148], { hand: 'hold' }),
    head([shoulder[0] - 6, 160], [0.65, -0.76], [-0.82, 0.55], [shoulder[0] + 14, shoulder[1] + 2]),
  ]);
}

/** Уттана Падасана: макушка на полу, грудь аркой вверх, руки и ноги вперёд-вверх под ~45°. */
export function uttanaPadasana() {
  return doc([
    shadow(108, 52),
    arm([68, 142], [100, 116], [130, 90], { far: true, hand: 'reach', fingers: 1 }),
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
    arm([74, 144], [106, 118], [136, 92], { hand: 'reach', fingers: 1 }),
    head([56, 157], [0.2, -0.98], [-0.95, 0.3], [70, 144]),
  ]);
}

/** Ширшасана, фронтально: локти на полу, ладони в замке, тело одной линией вверх, носки вдоль голеней. */
/**
 * Ширшасана: макушка и предплечья на полу, lean-торс вверх одной линией.
 */
export function sirsasana() {
  return doc([
    shadow(100, 44),
    arm([88, 134], [56, 166], [96, 144], { far: true, hand: 'hold' }),
    arm([112, 134], [144, 166], [104, 144], { hand: 'hold' }),
    thigh([96, 70], [96, 42], { far: true, underShorts: true }),
    thigh([104, 72], [104, 44], { underShorts: true }),
    torso([
      [88, 134],
      [112, 134],
      [110, 98],
      [106, 74],
      [94, 74],
      [90, 98],
    ]),
    shortsFrame([100, 78], [0, 1], [1, 0], {
      rise: 10,
      half: 10.4,
      wTop: 6.4,
      wBot: 5.8,
      sym: true,
      crotch: 6.6,
      thighs: [[[104, 72], [104, 44]], [[96, 70], [96, 42]]],
      legLen: 15,
      inline: true,
    }),
    shin([96, 42], [96, 14], { far: true, foot: 'free', toe: 1 }),
    shin([104, 44], [104, 16], { foot: 'free', toe: 1 }),
    headFront([100, 156], [100, 136], [0, -1]),
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
    arm([78, 92], [64, 130], [54, 156], { hand: 'hold' }),
    arm([122, 92], [136, 130], [146, 156], { hand: 'hold' }),
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
      rise: 11,
      half: 12.5,
      backW: 1.12,
      frontW: 0.98,
      thighs: [[[114, 156], [150, 158]], [[106, 158], [146, 160]]],
      legLen: 22,
      crotch: 5.5,
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
