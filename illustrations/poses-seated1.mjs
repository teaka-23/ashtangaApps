/**
 * Сидячие позы первой серии, часть 1: от Пасчимоттанасаны до Навасаны.
 * Профиль лицом вправо, седалишные кости на полу (y≈152), пятки на линии пола.
 * Пасчимоттанасана A–D: наклон глубже от A к D, захват: стопа → подошва → замок → запястье.
 * Джану А/Б/С: согнутая нога сбоку / сидя на пятке / стопа вертикально.
 * Маричи А/Б: наклон со связкой вокруг колена; C/D: скрутка; B/D: полулотос.
 */
import { draw, svgDocument } from './figure.mjs';

const { leg, arm, torso, shortsFrame, head, shadow, groundLine } = draw;

function doc(parts) {
  return svgDocument([groundLine(), ...parts].join('\n'));
}

/** Общий каркас наклона к прямым ногам: reach — насколько руки за стопы. */
function paschi(armWristX, headC, arms) {
  return doc([
    shadow(112, 56),
    leg([90, 150], [122, 154], [150, 158], { far: true, foot: 'flex', toe: 1 }),
    leg([96, 152], [128, 156], [156, 158], { foot: 'flex', toe: 1 }),
    ...arms,
    torso([
      [82, 136],
      [98, 128],
      [124, 138],
      [134, 148],
      [124, 158],
      [94, 150],
      [80, 146],
    ]),
    shortsFrame([92, 150], [0.85, 0.35], [0.35, 0.94], { rise: 12, hem: 15, half: 12, cheek: 13 }),
    head(headC, [0.3, 0.95], [0.9, 0.35], [126, 142]),
  ]);
}

/** Дандасана: седалище на полу, ноги прямые, носки вверх, ладони у таза, пальцы к стопам, взгляд вперёд. */
export function dandasana() {
  return doc([
    shadow(112, 52),
    leg([90, 150], [120, 154], [148, 158], { far: true, foot: 'flex', toe: 1 }),
    leg([98, 152], [128, 156], [156, 158], { foot: 'flex', toe: 1 }),
    arm([88, 100], [80, 130], [76, 158], { far: true, hand: 'flat', fingers: 1 }),
    torso([
      [86, 68],
      [106, 70],
      [108, 112],
      [104, 148],
      [92, 154],
      [82, 140],
      [82, 96],
    ]),
    shortsFrame([96, 150], [0, -1], [1, 0], { rise: 13, hem: 15, half: 14, cheek: 15 }),
    arm([102, 94], [94, 128], [88, 158], { hand: 'flat', fingers: 1 }),
    head([98, 48], [1, 0.04], [0, -1], [98, 66]),
  ]);
}

/** A: пальцы на внешних рёбрах стоп. */
export function paschimattanasanaA() {
  return paschi(150, [136, 146], [
    arm([116, 140], [130, 146], [148, 152], { far: true, hand: 'hold' }),
    arm([124, 140], [138, 148], [154, 152], { hand: 'hold' }),
  ]);
}

/** B: ладони на подошвах. */
export function paschimattanasanaB() {
  return paschi(158, [138, 148], [
    arm([116, 140], [132, 146], [156, 150], { far: true, hand: 'hold' }),
    arm([124, 140], [140, 148], [160, 150], { hand: 'hold' }),
  ]);
}

/** C: замок за стопами. */
export function paschimattanasanaC() {
  return paschi(166, [140, 150], [
    arm([116, 142], [134, 148], [164, 148], { far: true, hand: 'hold' }),
    arm([124, 142], [142, 150], [168, 148], { hand: 'hold' }),
  ]);
}

/** D: захват запястья за стопами, самая глубокая. */
export function paschimattanasanaD() {
  return paschi(168, [140, 152], [
    arm([116, 144], [136, 150], [166, 150], { far: true, hand: 'hold' }),
    arm([124, 144], [144, 152], [170, 150], { hand: 'hold' }),
  ]);
}

/** Пурваттанасана: обратная планка, ладони позади, пальцы назад, таз вверх, голова назад. */
export function purvattanasana() {
  return doc([
    shadow(104, 56),
    leg([102, 114], [124, 132], [146, 158], { far: true, foot: 'flat', toe: 1 }),
    leg([108, 118], [130, 136], [152, 158], { foot: 'flat', toe: 1 }),
    arm([80, 116], [68, 140], [56, 158], { far: true, hand: 'flat', fingers: -1 }),
    torso([
      [76, 110],
      [90, 104],
      [108, 102],
      [114, 112],
      [102, 120],
      [82, 122],
    ]),
    shortsFrame([106, 110], [0.9, -0.35], [0.4, 0.92], { rise: 12, hem: 14, half: 12, cheek: 13 }),
    arm([88, 112], [76, 138], [64, 158], { hand: 'flat', fingers: -1 }),
    head([70, 100], [-0.35, -0.94], [-0.92, 0.35], [78, 110]),
  ]);
}

/** Ардха Баддха Падма Пасчимоттанасана: полулотос, связанная рука за спиной, наклон. */
export function ardhaBaddhaPadmaPaschi() {
  return doc([
    shadow(112, 56),
    leg([94, 150], [126, 155], [156, 158], { foot: 'flex', toe: 1 }),
    leg([92, 148], [70, 140], [114, 150], { far: true, foot: 'free', toe: 1 }),
    arm([114, 138], [100, 138], [102, 132], { far: true, hand: 'hold' }),
    torso([
      [82, 134],
      [98, 126],
      [124, 136],
      [134, 146],
      [124, 156],
      [94, 148],
      [80, 144],
    ]),
    shortsFrame([92, 148], [0.85, 0.35], [0.35, 0.94], { rise: 12, hem: 15, half: 12, cheek: 13 }),
    arm([124, 138], [138, 146], [154, 150], { hand: 'hold' }),
    head([138, 144], [0.3, 0.95], [0.9, 0.35], [126, 140]),
  ]);
}

/** Трианг Мукхаикапада: правая нога сложена назад (пятка у таза), наклон к левой. */
export function triangMukha() {
  return doc([
    shadow(112, 56),
    leg([90, 150], [88, 158], [64, 160], { far: true, foot: 'tops', toe: -1 }),
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
    shortsFrame([92, 150], [0.85, 0.35], [0.35, 0.94], { rise: 12, hem: 15, half: 12, cheek: 13 }),
    arm([124, 140], [138, 148], [154, 152], { hand: 'hold' }),
    head([138, 146], [0.3, 0.95], [0.9, 0.35], [126, 142]),
  ]);
}

/** Общий каркас Джану: наклон к прямой ноге, вторая — вариации сгиба. */
function januBase(foldedLeg, headC) {
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
    shortsFrame([92, 148], [0.85, 0.35], [0.35, 0.94], { rise: 12, hem: 15, half: 12, cheek: 13 }),
    arm([124, 138], [138, 146], [154, 150], { hand: 'hold' }),
    head(headC, [0.3, 0.95], [0.9, 0.35], [126, 140]),
  ]);
}

/** Джану Ширшасана А: колено в сторону, стопа к внутренней стороне бедра. */
export function januA() {
  return januBase(
    leg([92, 148], [122, 124], [104, 138], { far: true, foot: 'free', toe: -1 }),
    [138, 146],
  );
}

/** Джану Ширшасана B: сидя на правой пятке. */
export function januB() {
  return januBase(
    leg([92, 146], [120, 150], [92, 158], { far: true, foot: 'tops', toe: -1 }),
    [138, 146],
  );
}

/** Джану Ширшасана C: стопа вертикально, пальцы на полу, пятка вверх. */
export function januC() {
  return januBase(
    leg([90, 148], [114, 124], [112, 154], { far: true, foot: 'tucked', toe: 1 }),
    [138, 146],
  );
}

/** Маричиасана А: прямая нога, колено вверх, рука вокруг голени, наклон к прямой. */
export function marichyasanaA() {
  return doc([
    shadow(112, 52),
    leg([84, 150], [120, 156], [158, 158], { far: true, foot: 'flex', toe: 1 }),
    leg([98, 142], [134, 98], [112, 158], { foot: 'flat', toe: 1 }),
    arm([90, 126], [72, 136], [94, 148], { far: true, hand: 'hold' }),
    torso([
      [72, 128],
      [94, 114],
      [124, 124],
      [136, 138],
      [118, 152],
      [92, 154],
      [70, 140],
    ]),
    shortsFrame([94, 150], [0.45, -0.89], [0.9, 0.35], { rise: 12, hem: 14, half: 12, cheek: 13 }),
    arm([118, 120], [150, 136], [122, 124], { hand: 'hold' }),
    head([142, 138], [0.86, 0.51], [0.05, -1], [126, 128]),
  ]);
}

/** Маричиасана B: полулотос вместо прямой ноги, та же связка и наклон. */
export function marichyasanaB() {
  return doc([
    shadow(108, 46),
    leg([102, 146], [132, 102], [116, 158], { foot: 'flat', toe: 1 }),
    leg([96, 146], [70, 136], [118, 124], { far: true, foot: 'free', toe: 1 }),
    arm([94, 120], [76, 130], [98, 144], { far: true, hand: 'hold' }),
    torso([
      [76, 120],
      [96, 108],
      [122, 118],
      [132, 132],
      [118, 148],
      [96, 150],
      [74, 136],
    ]),
    shortsFrame([96, 146], [0.35, -0.94], [0.9, 0.3], { rise: 12, hem: 14, half: 12, cheek: 13 }),
    arm([118, 116], [148, 122], [120, 140], { hand: 'hold' }),
    head([130, 122], [0.6, 0.8], [0.15, -0.99], [116, 116]),
  ]);
}

/** Маричиасана C: прямая нога, колено вверх, объятие колена, ладонь сзади, взгляд назад. */
export function marichyasanaC() {
  return doc([
    shadow(108, 52),
    leg([88, 150], [124, 155], [158, 158], { far: true, foot: 'flex', toe: 1 }),
    leg([102, 144], [126, 106], [114, 158], { foot: 'flat', toe: 1 }),
    arm([86, 100], [66, 128], [56, 158], { far: true, hand: 'flat', fingers: -1 }),
    torso([
      [82, 90],
      [102, 86],
      [112, 106],
      [108, 142],
      [94, 150],
      [80, 136],
      [78, 108],
    ]),
    shortsFrame([98, 146], [0.05, -1], [0.98, 0.12], { rise: 12, hem: 14, half: 12, cheek: 13 }),
    arm([108, 96], [140, 110], [118, 128], { hand: 'hold' }),
    head([96, 70], [-0.97, -0.24], [0.12, -0.99], [98, 88]),
  ]);
}

/** Маричиасана D: скрутка как C, прямая нога заменена полулотосом. */
export function marichyasanaD() {
  return doc([
    shadow(104, 46),
    leg([102, 146], [128, 104], [114, 158], { foot: 'flat', toe: 1 }),
    leg([98, 146], [68, 134], [116, 120], { far: true, foot: 'free', toe: 1 }),
    arm([86, 100], [66, 128], [56, 158], { far: true, hand: 'flat', fingers: -1 }),
    torso([
      [82, 90],
      [102, 86],
      [112, 106],
      [108, 142],
      [94, 150],
      [80, 136],
      [78, 108],
    ]),
    shortsFrame([98, 146], [0.05, -1], [0.98, 0.12], { rise: 12, hem: 14, half: 12, cheek: 13 }),
    arm([108, 96], [140, 110], [118, 128], { hand: 'hold' }),
    head([96, 70], [-0.97, -0.24], [0.12, -0.99], [98, 88]),
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
    shortsFrame([94, 146], [-0.4, -0.92], [0.92, -0.2], { rise: 12, hem: 14, half: 12, cheek: 13 }),
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
    shortsFrame([94, 146], [-0.4, -0.92], [0.92, -0.2], { rise: 12, hem: 14, half: 12, cheek: 13 }),
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
