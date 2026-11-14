/**
 * Сидячие позы первой серии, часть 1: от Пасчимоттанасаны до Навасаны.
 * Профиль лицом вправо, седалишные кости на полу (y≈152), пятки на линии пола.
 * Пасчимоттанасана A–D: наклон глубже от A к D, захват: стопа → подошва → замок → запястье.
 * Джану А/Б/С: согнутая нога сбоку / сидя на пятке / стопа вертикально.
 * Маричи А/Б: наклон со связкой вокруг колена; C/D: скрутка; B/D: полулотос.
 */
import { draw, svgDocument } from './figure.mjs';

const { leg, thigh, shin, arm, torso, shortsFrame, head, shadow, groundLine } = draw;

function doc(parts) {
  return svgDocument([groundLine(), ...parts].join('\n'));
}

/** Наклон к прямым ногам. Руки рисуются после шорт, иначе ладони прячутся. */
function paschi(torsoPts, hip, arms, headC, neck) {
  return doc([
    shadow(112, 56),
    leg([92, 158], [124, 160], [154, 160], { far: true, foot: 'flex', toe: 1 }),
    leg([98, 160], [130, 161], [160, 160], { foot: 'flex', toe: 1 }),
    torso(torsoPts),
    shortsFrame(hip, [0.95, -0.31], [0.31, 0.95], {
      rise: 7,
      half: 8.8,
      backW: 0.85,
      frontW: 0.65,
      wTop: 6.7,
      wBot: 6.0,
      thighs: [[[98, 160], [130, 161]], [[92, 158], [124, 160]]],
      legLen: 18,
      inline: true,
    }),
    ...arms,
    head(headC, [0.55, 0.84], [0.8, 0.45], neck),
  ]);
}

/** Дандасана: седалище на полу, ноги прямые, носки вверх, ладони у таза, пальцы к стопам, взгляд вперёд. */
export function dandasana() {
  return doc([
    shadow(112, 52),
    leg([92, 154], [124, 157], [156, 158], { far: true, foot: 'flex', toe: 1 }),
    leg([100, 155], [130, 157], [162, 158], { foot: 'flex', toe: 1 }),
    arm([86, 84], [68, 124], [60, 158], { far: true, hand: 'flat', fingers: 1 }),
    torso([
      [84, 64],
      [96, 60],
      [108, 66],
      [108, 112],
      [104, 148],
      [92, 154],
      [82, 140],
      [82, 94],
    ]),
    shortsFrame([94, 148], [0, -1], [1, 0], {
      rise: 9,
      half: 9.5,
      backW: 0.9,
      thighs: [[[100, 155], [130, 157]], [[92, 154], [124, 157]]],
      legLen: 20,
      inline: true,
    }),
    arm([106, 84], [116, 124], [122, 158], { hand: 'flat', fingers: 1 }),
    head([98, 46], [1, 0.04], [0, -1], [96, 64]),
  ]);
}

const FOLD_DEEP = [
  [90, 153],
  [102, 146],
  [120, 140],
  [134, 146],
  [138, 156],
  [120, 164],
  [96, 162],
  [90, 158],
];

/** A: грудь приподнята, локти согнуты, пальцы на больших пальцах. */
export function paschimattanasanaA() {
  return paschi(
    [
      [88, 153],
      [98, 140],
      [116, 128],
      [132, 132],
      [140, 144],
      [126, 160],
      [100, 162],
      [89, 158],
    ],
    [92, 154],
    [
      arm([112, 136], [134, 148], [154, 158], { far: true, hand: 'hold' }),
      arm([120, 134], [144, 150], [162, 158], { hand: 'hold' }),
    ],
    [136, 140],
    [124, 136],
  );
}

/** B: грудь на бёдрах, ладони на подошвах. */
export function paschimattanasanaB() {
  return paschi(
    FOLD_DEEP,
    [93, 155],
    [
      arm([114, 144], [136, 154], [158, 158], { far: true, hand: 'hold' }),
      arm([122, 144], [146, 156], [166, 158], { hand: 'hold' }),
    ],
    [140, 152],
    [126, 146],
  );
}

/** C: руки прямые за стопы, кисти сходятся в замок. */
export function paschimattanasanaC() {
  return paschi(
    FOLD_DEEP,
    [93, 155],
    [
      arm([114, 148], [150, 156], [180, 152], { far: true, hand: 'hold' }),
      arm([122, 150], [158, 158], [184, 152], { hand: 'hold' }),
    ],
    [146, 156],
    [130, 150],
  );
}

/** D: тот же замок, складка ещё ниже. */
export function paschimattanasanaD() {
  return paschi(
    FOLD_DEEP,
    [93, 156],
    [
      arm([114, 150], [152, 158], [182, 154], { far: true, hand: 'hold' }),
      arm([122, 152], [160, 160], [186, 154], { hand: 'hold' }),
    ],
    [150, 158],
    [134, 152],
  );
}

/** Пурваттанасана: обратная планка, ладони позади, пальцы назад, таз вверх, голова назад. */
export function purvattanasana() {
  return doc([
    shadow(110, 48),
    leg([118, 106], [142, 134], [164, 158], { far: true, foot: 'flat', toe: 1 }),
    leg([126, 110], [148, 136], [170, 158], { foot: 'flat', toe: 1 }),
    arm([76, 112], [54, 136], [40, 158], { far: true, hand: 'flat', fingers: -1 }),
    torso([
      [68, 118],
      [98, 96],
      [130, 98],
      [136, 110],
      [112, 118],
      [80, 124],
    ]),
    shortsFrame([122, 106], [-0.94, 0.34], [0.34, 0.94], {
      rise: 8,
      half: 9,
      thighs: [[[126, 110], [148, 136]], [[118, 106], [142, 134]]],
      legLen: 18,
      inline: true,
    }),
    arm([84, 114], [62, 138], [48, 158], { hand: 'flat', fingers: -1 }),
    head([60, 108], [-0.42, -0.91], [-0.96, 0.22], [74, 114]),
  ]);
}

/**
 * Ардха Баддха Падма Пасчимоттанасана.
 * Прямая нога на полу, полулотос: колено у пола, стопа на бедре.
 * Рука за спиной держит стопу лотоса, вторая тянется к прямой стопе.
 */
export function ardhaBaddhaPadmaPaschi() {
  return doc([
    shadow(120, 52),
    leg([98, 160], [130, 162], [160, 160], { foot: 'flex', toe: 1 }),
    arm([88, 128], [84, 140], [106, 148], { far: true, hand: 'hold' }),
    torso([
      [76, 150],
      [96, 162],
      [114, 154],
      [134, 142],
      [146, 132],
      [134, 120],
      [112, 116],
      [90, 128],
    ]),
    thigh([96, 156], [76, 160], { far: true }),
    shortsFrame([96, 154], [0.75, -0.66], [0.66, 0.75], {
      rise: 8,
      half: 9,
      thighs: [[[98, 160], [130, 162]], [[96, 156], [76, 160]]],
      legLen: 18,
      inline: true,
    }),
    shin([76, 160], [110, 148], { far: true, foot: 'lotus', toe: 1 }),
    arm([130, 128], [148, 144], [162, 156], { hand: 'hold' }),
    head([148, 124], [0.6, 0.8], [0.9, 0.35], [134, 122]),
  ]);
}

/** Трианг Мукхаикапада: правая нога сложена назад (пятка у таза), наклон к левой. */
export function triangMukha() {
  return doc([
    shadow(112, 56),
    leg([92, 150], [72, 158], [50, 158], { far: true, foot: 'tops', toe: -1 }),
    leg([96, 152], [128, 156], [156, 158], { foot: 'flex', toe: 1 }),
    arm([116, 140], [130, 146], [148, 152], { far: true, hand: 'hold' }),
    torso([
      [82, 136],
      [98, 128],
      [124, 138],
      [134, 148],
      [124, 158],
      [94, 150],
      [80, 146],
    ]),
    shortsFrame([94, 150], [0.75, -0.66], [0.66, 0.75], {
      rise: 8,
      half: 9.5,
      thighs: [[[96, 152], [128, 156]], [[92, 150], [72, 158]]],
      legLen: 18,
      inline: true,
    }),
    arm([124, 140], [138, 148], [154, 152], { hand: 'hold' }),
    head([138, 146], [0.3, 0.95], [0.9, 0.35], [126, 142]),
  ]);
}

/** Общий каркас Джану: наклон к прямой ноге, вторая — вариации сгиба. */
function januBase(foldedLeg, foldedThigh, headC) {
  return doc([
    shadow(112, 56),
    foldedLeg,
    leg([96, 152], [128, 156], [156, 158], { foot: 'flex', toe: 1 }),
    arm([116, 138], [130, 144], [148, 150], { far: true, hand: 'hold' }),
    torso([
      [82, 134],
      [98, 126],
      [124, 136],
      [134, 146],
      [124, 156],
      [94, 148],
      [80, 144],
    ]),
    shortsFrame([90, 148], [0.94, -0.34], [0.34, 0.94], {
      rise: 8,
      half: 9.5,
      backW: 0.9,
      thighs: [[[96, 152], [128, 156]], foldedThigh],
      legLen: 18,
      inline: true,
    }),
    arm([124, 138], [138, 146], [154, 150], { hand: 'hold' }),
    head(headC, [0.3, 0.95], [0.9, 0.35], [126, 140]),
  ]);
}

/** Джану Ширшасана А: прямая нога на полу, колено второй в сторону, стопа к бедру. */
export function januA() {
  return doc([
    shadow(124, 52),
    leg([102, 160], [134, 162], [164, 160], { foot: 'flex', toe: 1 }),
    thigh([100, 156], [76, 160], { far: true }),
    torso([
      [80, 148],
      [100, 162],
      [118, 154],
      [138, 144],
      [150, 132],
      [138, 120],
      [116, 116],
      [94, 128],
    ]),
    shortsFrame([100, 154], [0.75, -0.66], [0.66, 0.75], {
      rise: 8,
      half: 9.5,
      thighs: [[[102, 160], [134, 162]], [[100, 156], [76, 160]]],
      legLen: 18,
      inline: true,
    }),
    shin([76, 160], [116, 156], { far: true, foot: 'lotus', toe: 1 }),
    arm([126, 128], [148, 144], [166, 156], { far: true, hand: 'hold' }),
    arm([134, 126], [154, 146], [170, 158], { hand: 'hold' }),
    head([152, 124], [0.55, 0.84], [0.85, 0.4], [138, 122]),
  ]);
}

/** Джану Ширшасана B: сидя на правой пятке. */
export function januB() {
  return januBase(
    leg([94, 146], [120, 158], [90, 158], { far: true, foot: 'tops', toe: -1 }),
    [[94, 146], [120, 158]],
    [138, 146],
  );
}

/** Джану Ширшасана C: стопа вертикально, пальцы на полу, пятка вверх. */
export function januC() {
  return januBase(
    leg([92, 150], [68, 154], [104, 158], { far: true, foot: 'tucked', toe: 1 }),
    [[92, 150], [68, 154]],
    [138, 146],
  );
}

/** Маричиасана А: прямая нога, колено вверх, рука вокруг голени, наклон к прямой. */
export function marichyasanaA() {
  return doc([
    shadow(112, 52),
    leg([84, 152], [124, 156], [162, 158], { far: true, foot: 'flex', toe: 1 }),
    arm([90, 124], [74, 134], [96, 144], { far: true, hand: 'hold' }),
    torso([
      [76, 130],
      [96, 114],
      [128, 124],
      [138, 136],
      [120, 150],
      [92, 154],
      [74, 142],
    ]),
    leg([96, 146], [116, 108], [122, 158], { foot: 'flat', toe: 1 }),
    shortsFrame([92, 148], [0.45, -0.89], [0.9, 0.35], {
      rise: 9,
      half: 9.5,
      thighs: [[[96, 146], [116, 108]], [[84, 152], [124, 156]]],
      legLen: 18,
      inline: true,
    }),
    arm([116, 120], [130, 128], [102, 136], { hand: 'hold' }),
    head([146, 138], [0.86, 0.51], [0.05, -1], [130, 128]),
  ]);
}

/** Маричиасана B: полулотос вместо прямой ноги, та же связка и наклон к полу. */
export function marichyasanaB() {
  return doc([
    shadow(108, 48),
    thigh([96, 148], [130, 156], { far: true }),
    shin([130, 156], [96, 154], { far: true, foot: 'lotus', toe: -1 }),
    arm([92, 128], [76, 138], [98, 148], { far: true, hand: 'hold' }),
    torso([
      [76, 132],
      [96, 118],
      [128, 126],
      [138, 138],
      [120, 150],
      [94, 152],
      [74, 142],
    ]),
    leg([100, 146], [116, 110], [122, 158], { foot: 'flat', toe: 1 }),
    shortsFrame([94, 148], [0.45, -0.89], [0.9, 0.35], {
      rise: 9,
      half: 9.5,
      thighs: [[[100, 146], [116, 110]], [[96, 148], [130, 156]]],
      legLen: 18,
      inline: true,
    }),
    arm([116, 124], [132, 130], [104, 140], { hand: 'hold' }),
    head([146, 140], [0.6, 0.8], [0.15, -0.99], [130, 130]),
  ]);
}

/** Маричиасана C: прямая нога, колено вверх, скрутка с замком за спиной, взгляд назад. */
export function marichyasanaC() {
  return doc([
    shadow(108, 52),
    leg([88, 150], [124, 155], [158, 158], { far: true, foot: 'flex', toe: 1 }),
    arm([84, 104], [64, 128], [94, 136], { far: true, hand: 'hold' }),
    torso([
      [82, 86],
      [96, 82],
      [108, 88],
      [112, 106],
      [108, 142],
      [94, 150],
      [80, 136],
      [78, 108],
    ]),
    leg([102, 144], [126, 106], [114, 158], { foot: 'flat', toe: 1 }),
    shortsFrame([96, 146], [0.05, -1], [0.98, 0.12], {
      rise: 9,
      half: 9.5,
      thighs: [[[102, 144], [126, 106]], [[88, 150], [124, 155]]],
      legLen: 18,
      inline: true,
    }),
    arm([108, 98], [138, 110], [98, 134], { hand: 'hold' }),
    head([96, 70], [-0.97, -0.24], [0.12, -0.99], [96, 86]),
  ]);
}

/** Маричиасана D: скрутка как C, прямая нога заменена полулотосом. */
export function marichyasanaD() {
  return doc([
    shadow(104, 46),
    thigh([96, 146], [70, 152], { far: true }),
    arm([84, 104], [64, 128], [94, 136], { far: true, hand: 'hold' }),
    torso([
      [82, 86],
      [96, 82],
      [108, 88],
      [112, 106],
      [108, 142],
      [94, 150],
      [80, 136],
      [78, 108],
    ]),
    leg([102, 146], [128, 104], [114, 158], { foot: 'flat', toe: 1 }),
    shortsFrame([96, 146], [0.05, -1], [0.98, 0.12], {
      rise: 9,
      half: 9.5,
      thighs: [[[102, 146], [128, 104]], [[96, 146], [70, 152]]],
      legLen: 18,
      inline: true,
    }),
    shin([70, 152], [110, 140], { far: true, foot: 'lotus', toe: 1 }),
    arm([108, 98], [138, 110], [98, 134], { hand: 'hold' }),
    head([96, 70], [-0.97, -0.24], [0.12, -0.99], [96, 86]),
  ]);
}

/** Навасана А: баланс на седалишных, ноги 45°, руки вперёд параллельно ногам. */
export function navasanaA() {
  return doc([
    shadow(104, 40),
    leg([94, 142], [124, 112], [150, 88], { far: true, foot: 'free', toe: 1 }),
    leg([98, 144], [128, 116], [154, 92], { foot: 'free', toe: 1 }),
    torso([
      [72, 100],
      [86, 96],
      [98, 132],
      [100, 146],
      [88, 150],
      [76, 134],
      [70, 112],
    ]),
    shortsFrame([94, 144], [-0.45, -0.89], [0.89, -0.45], {
      rise: 8,
      half: 9,
      thighs: [[[98, 144], [128, 116]], [[94, 142], [124, 112]]],
      legLen: 19,
      inline: true,
    }),
    arm([76, 102], [106, 100], [138, 96], { far: true, hand: 'reach' }),
    arm([84, 102], [114, 100], [146, 96], { hand: 'reach' }),
    head([72, 86], [0.35, -0.94], [-0.35, -0.94], [76, 98]),
  ]);
}

/** Навасана B: руки вверх вдоль ног. */
export function navasanaB() {
  return doc([
    shadow(104, 40),
    leg([94, 142], [124, 112], [150, 88], { far: true, foot: 'free', toe: 1 }),
    leg([98, 144], [128, 116], [154, 92], { foot: 'free', toe: 1 }),
    torso([
      [72, 100],
      [86, 96],
      [98, 132],
      [100, 146],
      [88, 150],
      [76, 134],
      [70, 112],
    ]),
    shortsFrame([94, 144], [-0.45, -0.89], [0.89, -0.45], {
      rise: 8,
      half: 9,
      thighs: [[[98, 144], [128, 116]], [[94, 142], [124, 112]]],
      legLen: 19,
      inline: true,
    }),
    arm([76, 102], [100, 76], [126, 52], { far: true, hand: 'up' }),
    arm([84, 102], [108, 78], [134, 56], { hand: 'up' }),
    head([72, 86], [0.35, -0.94], [-0.35, -0.94], [76, 98]),
  ]);
}

export const FILES = [
  ['25b-dandasana', dandasana],
  ['26-paschimattanasana-a', paschimattanasanaA],
  ['27-paschimattanasana-b', paschimattanasanaB],
  ['28-paschimattanasana-c', paschimattanasanaC],
  ['29-paschimattanasana-d', paschimattanasanaD],
  ['30-purvattanasana', purvattanasana],
  ['31-ardha-baddha-padma-paschimattanasana', ardhaBaddhaPadmaPaschi],
  ['32-triang-mukhaikapada-paschimattanasana', triangMukha],
  ['33-janu-sirshasana-a', januA],
  ['34-janu-sirshasana-b', januB],
  ['35-janu-sirshasana-c', januC],
  ['36-marichyasana-a', marichyasanaA],
  ['37-marichyasana-b', marichyasanaB],
  ['38-marichyasana-c', marichyasanaC],
  ['39-marichyasana-d', marichyasanaD],
  ['40-navasana-a', navasanaA],
  ['41-navasana-b', navasanaB],
];
