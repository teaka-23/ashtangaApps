/**
 * Третья серия (Advanced A, Sthira Bhaga).
 * Фронтальный ¾: тело по диагонали, опорная рука вниз, свободная рука и нога
 * тянутся вверх. Дришти — на поднятую кисть (как в описании школы).
 */
import { draw, svgDocument } from './figure.mjs';

const { leg, thigh, shin, arm, torso, shortsFrame, head, headFront, shadow, groundLine } = draw;

function doc(parts) {
  return svgDocument([groundLine(), ...parts].join('\n'));
}

export function vasisthasana() {
  return doc([
    shadow(100, 52),
    // Нижняя нога (дальняя, дымка): таз → колено → стопа плоско на настиле.
    leg([98, 132], [76, 124], [56, 160], { far: true, foot: 'flat', toe: -1, underShorts: true }),
    // Дальняя рука: плечо → локоть → кисть вверх (дымка).
    arm([132, 110], [144, 86], [150, 62], { far: true, hand: 'hold' }),
    // Торс по диагонали: таз внизу-слева, плечи вверху-справа.
    torso([
      [98, 138],
      [104, 126],
      [118, 112],
      [130, 108],
      [138, 118],
      [132, 128],
      [116, 140],
    ]),
    // Верхняя нога (ближняя): поднята вверх, стопа freeFlex.
    leg([104, 136], [80, 124], [60, 108], { foot: 'freeFlex', toe: -1, underShorts: true }),
    shortsFrame([102, 134], [0.72, -0.69], [0.69, 0.72], {
      rise: 10,
      half: 10.4,
      thighs: [
        [[104, 136], [80, 124]],
        [[98, 132], [76, 124]],
      ],
      legLen: 13,
      crotch: 5.6,
      inline: true,
    }),
    // Опорная рука: кисть на настиле под плечом.
    arm([132, 112], [138, 136], [140, 158], { hand: 'flat', fingers: -1 }),
    // Голова смотрит на поднятую кисть (дришти вверх).
    headFront([142, 96], [136, 112], [0.4, -0.92]),
  ]);
}

export function vishvamitrasana() {
  return doc([
    shadow(98, 50),
    // Нижняя нога (дальняя, дымка): стопа плоско на настиле.
    leg([102, 132], [78, 146], [56, 160], { far: true, foot: 'flat', toe: -1, underShorts: true }),
    // Верхняя нога (ближняя): поднята и вытянута вперёд-вверх, стопа в руке.
    leg([98, 128], [78, 106], [62, 84], { foot: 'freeFlex', toe: -1, underShorts: true }),
    torso([
      [96, 136],
      [102, 126],
      [118, 112],
      [132, 108],
      [140, 118],
      [132, 128],
      [114, 140],
    ]),
    shortsFrame([100, 132], [0.72, -0.69], [0.69, 0.72], {
      rise: 10,
      half: 10.4,
      thighs: [
        [[98, 128], [78, 106]],
        [[102, 132], [78, 146]],
      ],
      legLen: 13,
      crotch: 5.6,
      inline: true,
    }),
    // Верхняя рука (дальняя): тянется к поднятой стопе.
    arm([130, 108], [100, 94], [72, 86], { far: true, hand: 'hold' }),
    // Опорная рука: кисть на настиле под плечом.
    arm([132, 110], [138, 136], [140, 158], { hand: 'flat', fingers: -1 }),
    // Взгляд на поднятую стопу.
    headFront([144, 94], [134, 104], [-0.5, -0.86]),
  ]);
}

export function kasyapasana() {
  return doc([
    shadow(96, 52),
    // Нога за головой (дальняя, дымка): бедро вверх, голень уходит за макушку.
    leg([116, 150], [96, 112], [56, 146], { far: true, foot: 'lotus', toe: -1, underShorts: true }),
    // Торс лежит на спине: плечи у головы (слева), таз справа.
    torso([
      [62, 150],
      [76, 140],
      [96, 138],
      [114, 142],
      [126, 150],
      [122, 162],
      [94, 166],
      [72, 162],
      [58, 156],
    ]),
    // Поднятая нога (ближняя): вертикально вверх, стопа flex.
    leg([122, 148], [112, 104], [108, 62], { foot: 'freeFlex', toe: 1, underShorts: true }),
    shortsFrame([118, 150], [0.88, -0.47], [0.47, 0.88], {
      rise: 10,
      half: 10.2,
      thighs: [
        [[122, 148], [112, 104]],
        [[116, 150], [96, 112]],
      ],
      legLen: 13,
      crotch: 5.4,
      inline: true,
    }),
    // Руки держат поднятую ногу у щиколотки.
    arm([76, 146], [92, 118], [106, 78], { far: true, hand: 'hold' }),
    arm([86, 148], [100, 120], [110, 80], { hand: 'hold' }),
    head([44, 150], [-0.9, 0.2], [0.2, -0.98], [60, 150]),
  ]);
}

export function chakorasana() {
  return doc([
    shadow(104, 44),
    // Нога за головой (дальняя): бедро вверх, стопа у шеи.
    leg([112, 112], [94, 92], [86, 120], { far: true, foot: 'lotus', toe: -1, underShorts: true }),
    // Торс в воздухе между руками.
    torso([
      [92, 124],
      [102, 112],
      [118, 110],
      [128, 120],
      [124, 132],
      [108, 134],
      [94, 132],
    ]),
    // Поднятая нога: вертикально вверх.
    leg([118, 112], [124, 78], [126, 44], { foot: 'freeFlex', toe: 1, underShorts: true }),
    shortsFrame([112, 116], [0.86, -0.5], [0.5, 0.86], {
      rise: 10,
      half: 10,
      thighs: [
        [[118, 112], [124, 78]],
        [[112, 112], [94, 92]],
      ],
      legLen: 12,
      crotch: 5.2,
      inline: true,
    }),
    // Руки-опоры: ладони на настиле под плечами.
    arm([100, 122], [96, 140], [98, 158], { far: true, hand: 'flat', fingers: 1 }),
    arm([118, 122], [122, 140], [122, 158], { hand: 'flat', fingers: 1 }),
    head([128, 104], [0.4, -0.92], [0.92, 0.4], [118, 116]),
  ]);
}

export function urdhvaKukkutasanaA() {
  return doc([
    shadow(114, 40),
    // Лотос: дальнее бедро в сторону, голень складывается к центру.
    thigh([116, 112], [94, 118], { far: true, underShorts: true }),
    shin([94, 118], [114, 126], { far: true, foot: 'lotus', toe: 1 }),
    // Торс компактно между руками.
    torso([
      [104, 126],
      [110, 108],
      [124, 106],
      [132, 120],
      [128, 132],
      [112, 134],
      [104, 132],
    ]),
    // Ближнее бедро лотоса и голень.
    thigh([118, 114], [138, 120], { underShorts: true }),
    shortsFrame([116, 114], [0, -1], [1, 0], {
      rise: 9,
      half: 9.6,
      thighs: [
        [[118, 114], [138, 120]],
        [[116, 112], [94, 118]],
      ],
      legLen: 12,
      crotch: 5,
      inline: true,
    }),
    shin([138, 120], [118, 128], { foot: 'lotus', toe: -1 }),
    // Руки-опоры: предплечья вертикально, ладони на настиле.
    arm([104, 126], [102, 142], [104, 158], { far: true, hand: 'flat', fingers: 1 }),
    arm([128, 126], [130, 142], [130, 158], { hand: 'flat', fingers: 1 }),
    head([116, 94], [0.1, -0.99], [0.99, 0.1], [116, 108]),
  ]);
}

export function durvasana() {
  return doc([
    shadow(104, 42),
    // Нога за головой: бедро вверх, стопа у шеи сзади.
    leg([104, 126], [124, 108], [132, 88], { far: true, foot: 'lotus', toe: -1, underShorts: true }),
    // Торс вертикально, голова над плечами.
    torso([
      [96, 130],
      [104, 118],
      [110, 96],
      [120, 94],
      [124, 114],
      [120, 130],
    ]),
    // Опорная нога: прямая, стопа на настиле.
    leg([100, 130], [100, 148], [100, 162], { foot: 'flat', toe: 1, underShorts: true }),
    shortsFrame([102, 128], [0.05, -1], [1, 0.05], {
      rise: 10,
      half: 10.2,
      thighs: [
        [[100, 130], [100, 148]],
        [[104, 126], [124, 108]],
      ],
      legLen: 12,
      crotch: 5.4,
      inline: true,
    }),
    // Руки в намасте у груди.
    arm([104, 98], [96, 112], [112, 108], { far: true, hand: 'prayer' }),
    arm([122, 98], [128, 112], [116, 108], { hand: 'prayer' }),
    head([112, 82], [0.15, -0.99], [0.99, 0.15], [110, 96]),
  ]);
}

export function bhairavasana() {
  return doc([
    shadow(98, 48),
    // Нижняя нога (дальняя): стопа плоско на настиле.
    leg([102, 138], [80, 150], [58, 160], { far: true, foot: 'flat', toe: -1, underShorts: true }),
    // Нога за головой (ближняя): бедро вверх, голень уходит за макушку.
    leg([98, 134], [104, 104], [136, 96], { foot: 'lotus', toe: -1, underShorts: true }),
    torso([
      [94, 142],
      [100, 130],
      [120, 118],
      [138, 116],
      [146, 128],
      [136, 138],
      [114, 146],
    ]),
    shortsFrame([100, 136], [0.78, -0.63], [0.63, 0.78], {
      rise: 10,
      half: 10.2,
      thighs: [
        [[98, 134], [104, 104]],
        [[102, 138], [80, 150]],
      ],
      legLen: 12,
      crotch: 5.4,
      inline: true,
    }),
    // Опорная рука на предплечье: локоть и предплечье на настиле.
    arm([140, 122], [144, 148], [124, 158], { hand: 'flat', fingers: -1 }),
    // Верхняя рука держит стопу за головой.
    arm([146, 122], [142, 106], [134, 98], { far: true, hand: 'hold' }),
    head([152, 108], [0.9, -0.42], [0.4, -0.92], [140, 118]),
  ]);
}

/**
 * Общий каркас для балансов на руках: ноги, торс, шорты, дополнительные руки
 * и опорные ладони на настиле. Позы задаются данными.
 */
function airBase({ torsoPts, shorts, far = [], near = [], headSpec, extraArms = [] }) {
  return doc([
    shadow(110, 40),
    ...far.map(([a, b, c, o]) => leg(a, b, c, o)),
    torso(torsoPts),
    ...near.map(([a, b, c, o]) => leg(a, b, c, o)),
    shortsFrame(shorts[0], shorts[1], shorts[2], shorts[3]),
    ...extraArms,
    arm([104, 126], [100, 142], [102, 158], { far: true, hand: 'flat', fingers: 1 }),
    arm([126, 126], [130, 142], [130, 158], { hand: 'flat', fingers: 1 }),
    head(...headSpec),
  ]);
}

const lotusFar = (hip, knee, ankle, toe = 1) => [hip, knee, ankle, { far: true, foot: 'lotus', toe, underShorts: true }];

export function urdhvaKukkutasanaB() {
  return doc([
    shadow(110, 32),
    // Лотос: колени в стороны на уровне локтей, стопы скрещены.
    leg([96, 134], [84, 146], [104, 138], { far: true, foot: 'lotus', toe: 1, underShorts: true }),
    // Корпус компактно над ладонями.
    torso([96, 132], [102, 118], [116, 112], [126, 118], [124, 132], [112, 136], [98, 138]),
    leg([114, 134], [140, 142], [118, 140], { foot: 'lotus', toe: -1, underShorts: true }),
    shortsFrame([106, 132], [0, -1], [1, 0], {
      rise: 10,
      half: 10.2,
      thighs: [
        [[114, 134], [140, 142]],
        [[96, 134], [84, 146]],
      ],
      legLen: 12,
      crotch: 5.4,
      inline: true,
    }),
    // Прямые руки: ладони на настиле, плечи над кистями.
    arm([102, 124], [102, 142], [102, 158], { far: true, hand: 'flat', fingers: 1 }),
    arm([122, 124], [122, 142], [122, 158], { hand: 'flat', fingers: 1 }),
    head([120, 100], [0.1, -0.99], [0.99, 0.1], [114, 112]),
  ]);
}

export function urdhvaKukkutasanaC() {
  return doc([
    shadow(112, 32),
    leg([98, 132], [86, 144], [106, 136], { far: true, foot: 'lotus', toe: 1, underShorts: true }),
    // Корпус наклонён вперёд: плечи уходят за кисти.
    torso([104, 130], [114, 118], [128, 114], [138, 120], [132, 132], [118, 136], [104, 138]),
    leg([118, 132], [142, 140], [122, 138], { foot: 'lotus', toe: -1, underShorts: true }),
    shortsFrame([110, 130], [0.35, -0.94], [0.94, 0.35], {
      rise: 10,
      half: 10.2,
      thighs: [
        [[118, 132], [142, 140]],
        [[98, 132], [86, 144]],
      ],
      legLen: 12,
      crotch: 5.4,
      inline: true,
    }),
    arm([108, 126], [106, 142], [104, 158], { far: true, hand: 'flat', fingers: 1 }),
    arm([128, 124], [126, 142], [124, 158], { hand: 'flat', fingers: 1 }),
    head([130, 102], [0.35, -0.94], [0.94, 0.35], [122, 112]),
  ]);
}

export function galavasana() {
  return airBase({
    far: [lotusFar([108, 92], [126, 78], [144, 66], 1)],
    torsoPts: [[92, 128], [100, 114], [112, 104], [122, 108], [120, 122], [108, 132], [94, 134]],
    near: [[[106, 116], [118, 128], [98, 128], { foot: 'lotus', toe: -1, underShorts: true }]],
    shorts: [
      [106, 118],
      [0.6, -0.8],
      [0.8, 0.6],
      { rise: 9, half: 9.4, legLen: 11, crotch: 5, inline: true, thighs: [[[106, 116], [118, 128]], [[108, 92], [126, 78]]] },
    ],
    headSpec: [[130, 92], [0.2, -0.98], [0.98, 0.2], [120, 104]],
  });
}

function otherBalance({ farLeg, nearLeg, torsoPts, hip, up, front, thighs, headSpec }) {
  return airBase({
    far: [[...farLeg, { far: true, foot: 'freeFlex', toe: -1, underShorts: true }]],
    torsoPts,
    near: [[...nearLeg, { foot: 'lotus', toe: -1, underShorts: true }]],
    shorts: [hip, up, front, { rise: 9, half: 9.4, legLen: 11, crotch: 5, inline: true, thighs }],
    headSpec,
  });
}

export function ekaPadaBakasanaA() {
  return otherBalance({
    farLeg: [[96, 112], [74, 104], [56, 96]],
    nearLeg: [[108, 118], [96, 136], [78, 140]],
    torsoPts: [[94, 132], [100, 116], [114, 106], [126, 112], [124, 126], [110, 132], [96, 136]],
    hip: [104, 120],
    up: [0.6, -0.8],
    front: [0.8, 0.6],
    thighs: [[[108, 118], [96, 136]], [[96, 112], [74, 104]]],
    headSpec: [[128, 94], [0.3, -0.95], [0.95, 0.3], [118, 106]],
  });
}

export function ekaPadaBakasanaB() {
  return otherBalance({
    farLeg: [[96, 114], [76, 128], [58, 138]],
    nearLeg: [[108, 118], [96, 136], [78, 140]],
    torsoPts: [[94, 132], [100, 116], [114, 106], [126, 112], [124, 126], [110, 132], [96, 136]],
    hip: [104, 120],
    up: [0.6, -0.8],
    front: [0.8, 0.6],
    thighs: [[[108, 118], [96, 136]], [[96, 114], [76, 128]]],
    headSpec: [[128, 94], [0.3, -0.95], [0.95, 0.3], [118, 106]],
  });
}

export function koundinyasanaA() {
  return otherBalance({
    farLeg: [[100, 116], [78, 128], [58, 138]],
    nearLeg: [[104, 118], [84, 128], [64, 136]],
    torsoPts: [[96, 132], [102, 116], [118, 106], [130, 112], [126, 126], [110, 132], [98, 136]],
    hip: [102, 120],
    up: [0.6, -0.8],
    front: [0.8, 0.6],
    thighs: [[[104, 118], [84, 128]], [[100, 116], [78, 128]]],
    headSpec: [[132, 96], [0.4, -0.92], [0.92, 0.4], [122, 108]],
  });
}

export function koundinyasanaB() {
  return otherBalance({
    farLeg: [[100, 116], [76, 108], [56, 100]],
    nearLeg: [[104, 118], [108, 140], [112, 158]],
    torsoPts: [[96, 132], [102, 116], [118, 106], [130, 112], [126, 126], [110, 132], [98, 136]],
    hip: [102, 120],
    up: [0.6, -0.8],
    front: [0.8, 0.6],
    thighs: [[[104, 118], [108, 140]], [[100, 116], [76, 108]]],
    headSpec: [[132, 96], [0.4, -0.92], [0.92, 0.4], [122, 108]],
  });
}

export function astavakrasanaA() {
  return otherBalance({
    farLeg: [[100, 118], [78, 124], [60, 130]],
    nearLeg: [[104, 120], [86, 136], [70, 120]],
    torsoPts: [[98, 134], [104, 118], [120, 108], [132, 114], [128, 128], [112, 134], [100, 138]],
    hip: [102, 122],
    up: [0.6, -0.8],
    front: [0.8, 0.6],
    thighs: [[[104, 120], [86, 136]], [[100, 118], [78, 124]]],
    headSpec: [[132, 98], [0.4, -0.92], [0.92, 0.4], [122, 110]],
  });
}

export function astavakrasanaB() {
  return otherBalance({
    farLeg: [[100, 118], [76, 126], [56, 134]],
    nearLeg: [[104, 120], [124, 130], [142, 138]],
    torsoPts: [[98, 134], [104, 118], [120, 108], [132, 114], [128, 128], [112, 134], [100, 138]],
    hip: [102, 122],
    up: [0.6, -0.8],
    front: [0.8, 0.6],
    thighs: [[[104, 120], [124, 130]], [[100, 118], [76, 126]]],
    headSpec: [[132, 98], [0.4, -0.92], [0.92, 0.4], [122, 110]],
  });
}

/** Сидячая поза со стопой за головой: вариации — зеркальная, наклон. */
function seatedLbh({ mirror = false, fold = false }) {
  const m = (p) => (mirror ? [200 - p[0], p[1]] : p);
  const dir = mirror ? -1 : 1;
  const head = fold ? [128, 118] : [104, 90];
  const torsoPts = fold
    ? [m([92, 150]), m([100, 138]), m([116, 126]), m([134, 122]), m([138, 134]), m([120, 148]), m([100, 156])]
    : [m([92, 152]), m([98, 138]), m([102, 112]), m([116, 108]), m([124, 130]), m([116, 152]), m([100, 158])];
  return doc([
    shadow(m([100, 50])[0], 44),
    // Стопа за головой: бедро вверх вдоль корпуса, голень за шею, стопа у плеча.
    leg(m([104, 148]), m([118, 124]), m([102, 102]), { far: true, foot: 'lotus', toe: -1, underShorts: true }),
    torso(torsoPts),
    // Полулотос на полу (ближняя нога).
    leg(m([96, 152]), m([122, 154]), m([106, 146]), { foot: 'lotus', toe: -1, underShorts: true }),
    shortsFrame(m([102, 150]), [0, -1], [dir, 0], {
      rise: 10,
      half: 10.4,
      thighs: [
        [m([96, 152]), m([122, 154])],
        [m([104, 148]), m([118, 124])],
      ],
      legLen: 12,
      crotch: 5.4,
      inline: true,
    }),
    arm(m([100, 116]), m([94, 132]), m([108, 128]), { far: true, hand: 'prayer' }),
    arm(m([118, 112]), m([126, 130]), m([112, 128]), { hand: 'prayer' }),
    head(m(head), [0.2 * dir, -0.98], [0.98 * dir, 0.2], m([108, head[1] + 14])),
  ]);
}

export function viranchyasanaA1() {
  return seatedLbh({});
}
export function viranchyasanaA2() {
  return seatedLbh({});
}
export function viranchyasanaA3() {
  return seatedLbh({ fold: true });
}
export function viranchyasanaB1() {
  return seatedLbh({ mirror: true });
}
export function viranchyasanaB2() {
  return seatedLbh({ mirror: true });
}
export function viranchyasanaB3() {
  return seatedLbh({ mirror: true, fold: true });
}

export function purnaMatsyendrasana() {
  return doc([
    shadow(100, 46),
    // Нижняя нога в лотосе (дальняя).
    thigh([104, 150], [76, 156], { far: true, underShorts: true }),
    shin([76, 156], [108, 150], { far: true, foot: 'lotus', toe: 1 }),
    torso([92, 152], [98, 138], [108, 100], [122, 98], [130, 134], [118, 152], [100, 156]),
    // Верхняя нога: стопа у противоположного бедра.
    leg([108, 148], [130, 140], [96, 138], { foot: 'lotus', toe: -1, underShorts: true }),
    shortsFrame([106, 148], [0, -1], [1, 0], {
      rise: 10,
      half: 10.4,
      thighs: [
        [[108, 148], [130, 140]],
        [[104, 150], [76, 156]],
      ],
      legLen: 12,
      crotch: 5.4,
      inline: true,
    }),
    // Рука обхватывает колено, вторая упирается сзади.
    arm([104, 104], [128, 120], [96, 138], { hand: 'hold' }),
    arm([124, 102], [140, 130], [140, 152], { far: true, hand: 'flat', fingers: 1 }),
    head([100, 82], [-0.4, -0.92], [0.92, 0.4], [104, 98]),
  ]);
}

export function skandasana() {
  return doc([
    shadow(104, 44),
    // Стопа за головой (дальняя): бедро вверх, голень за шею.
    leg([104, 122], [120, 100], [140, 128], { far: true, foot: 'lotus', toe: -1, underShorts: true }),
    // Торс в наклоне вперёд, голова низко.
    torso([94, 128], [102, 118], [120, 134], [136, 140], [140, 150], [120, 156], [100, 152]),
    // Опорная нога: прямая, стопа на настиле.
    leg([100, 124], [100, 146], [100, 162], { foot: 'flat', toe: 1, underShorts: true }),
    shortsFrame([102, 124], [0.05, -1], [1, 0.05], {
      rise: 10,
      half: 10.2,
      thighs: [
        [[100, 124], [100, 146]],
        [[104, 122], [120, 100]],
      ],
      legLen: 12,
      crotch: 5.4,
      inline: true,
    }),
    arm([112, 132], [118, 150], [120, 160], { far: true, hand: 'flat', fingers: 1 }),
    arm([126, 138], [132, 152], [134, 160], { hand: 'flat', fingers: 1 }),
    head([146, 142], [0.9, 0.3], [0.3, -0.95], [134, 138]),
  ]);
}

function standingLbh({ mirror = false, high = false, turned = false }) {
  const m = (p) => (mirror ? [200 - p[0], p[1]] : p);
  const dir = mirror ? -1 : 1;
  const ankle = high ? [122, 74] : [126, 92];
  return doc([
    shadow(m([100, 44])[0], 42),
    leg(m([104, 122]), m([116, 98]), m(ankle), { far: true, foot: 'lotus', toe: -1, underShorts: true }),
    torso([
      m([94, 130]),
      m([100, 118]),
      m([108, 94]),
      m([120, 92]),
      m([126, 118]),
      m([120, 132]),
    ]),
    leg(m([100, 128]), m([100, 148]), m([100, 162]), { foot: 'flat', toe: 1, underShorts: true }),
    shortsFrame(m([102, 126]), [0.05, -1], [dir, 0.05], {
      rise: 10,
      half: 10.2,
      thighs: [
        [m([100, 128]), m([100, 148])],
        [m([104, 122]), m([116, 98])],
      ],
      legLen: 12,
      crotch: 5.4,
      inline: true,
    }),
    arm(m([110, 98]), m([turned ? 92 : 104, 112]), m([turned ? 94 : 108, 122]), { far: true, hand: 'prayer' }),
    arm(m([122, 96]), m([turned ? 138 : 130, 112]), m([turned ? 136 : 126, 122]), { hand: 'prayer' }),
    head(m([116, 80]), [0.2 * dir, -0.98], [0.98 * dir, 0.2], m([112, 94])),
  ]);
}

export function digasanaA() {
  return standingLbh({ turned: true });
}
export function digasanaB() {
  return standingLbh({ turned: true, mirror: true });
}
export function utthitaTrivikramasana() {
  return standingLbh({ high: true });
}

export function suptaTrivikramasana() {
  return doc([
    shadow(96, 54),
    // Стопа за головой (дальняя).
    leg([126, 150], [100, 112], [58, 144], { far: true, foot: 'lotus', toe: -1, underShorts: true }),
    torso([64, 152], [78, 142], [96, 140], [114, 144], [126, 152], [120, 164], [92, 166], [70, 160]),
    // Поднятая нога (ближняя).
    leg([122, 148], [112, 104], [108, 64], { foot: 'freeFlex', toe: 1, underShorts: true }),
    shortsFrame([118, 150], [0.88, -0.47], [0.47, 0.88], {
      rise: 10,
      half: 10.2,
      thighs: [
        [[122, 148], [112, 104]],
        [[126, 150], [100, 112]],
      ],
      legLen: 12,
      crotch: 5.4,
      inline: true,
    }),
    arm([80, 148], [94, 120], [108, 80], { far: true, hand: 'hold' }),
    head([48, 150], [-0.9, 0.2], [0.2, -0.98], [62, 150]),
  ]);
}

export function hanumanasana() {
  return doc([
    shadow(106, 50),
    // Задняя нога (дальняя): вытянута назад, тыл стопы на настиле.
    leg([104, 140], [132, 150], [160, 158], { far: true, foot: 'tops', toe: 1, underShorts: true }),
    torso([96, 148], [100, 132], [106, 98], [120, 96], [126, 132], [118, 148], [100, 154]),
    // Передняя нога (ближняя): вытянута вперёд, стопа на настиле.
    leg([100, 142], [80, 150], [58, 160], { foot: 'flat', toe: -1, underShorts: true }),
    shortsFrame([102, 140], [0, -1], [1, 0], {
      rise: 10,
      half: 10.4,
      thighs: [
        [[100, 142], [80, 150]],
        [[104, 140], [132, 150]],
      ],
      legLen: 12,
      crotch: 5.4,
      inline: true,
    }),
    arm([108, 100], [100, 76], [102, 52], { far: true, hand: 'up' }),
    arm([122, 98], [128, 74], [126, 50], { hand: 'up' }),
    head([114, 80], [0.1, -0.99], [0.99, 0.1], [112, 94]),
  ]);
}

export function viparitaSalabhasana() {
  return doc([
    shadow(112, 46),
    // Ноги (дальняя/ближняя) подняты вверх-назад.
    leg([128, 142], [140, 110], [146, 74], { far: true, foot: 'freeFlex', toe: 1, underShorts: true }),
    torso([90, 150], [108, 140], [130, 138], [142, 148], [134, 160], [106, 164], [88, 158]),
    leg([120, 144], [132, 112], [138, 78], { foot: 'freeFlex', toe: 1, underShorts: true }),
    shortsFrame([124, 144], [0.9, -0.42], [0.42, 0.9], {
      rise: 9,
      half: 9.8,
      thighs: [
        [[120, 144], [132, 112]],
        [[128, 142], [140, 110]],
      ],
      legLen: 11,
      crotch: 5,
      inline: true,
    }),
    arm([96, 146], [84, 152], [74, 156], { far: true, hand: 'hold' }),
    arm([104, 146], [92, 152], [82, 156], { hand: 'hold' }),
    head([150, 144], [0.95, 0.2], [0.2, -0.98], [138, 144]),
  ]);
}

export function gandaBherundasana() {
  return doc([
    shadow(114, 40),
    // Ноги уходят над головой (дальняя/ближняя).
    leg([128, 120], [136, 88], [138, 54], { far: true, foot: 'freeFlex', toe: 1, underShorts: true }),
    torso([100, 130], [112, 120], [128, 118], [136, 128], [130, 140], [112, 144], [98, 138]),
    leg([120, 122], [128, 90], [130, 58], { foot: 'freeFlex', toe: 1, underShorts: true }),
    shortsFrame([124, 122], [0.9, -0.44], [0.44, 0.9], {
      rise: 9,
      half: 9.6,
      thighs: [
        [[120, 122], [128, 90]],
        [[128, 120], [136, 88]],
      ],
      legLen: 11,
      crotch: 5,
      inline: true,
    }),
    arm([104, 130], [100, 144], [102, 158], { far: true, hand: 'flat', fingers: 1 }),
    arm([126, 128], [130, 144], [130, 158], { hand: 'flat', fingers: 1 }),
    head([118, 112], [0.6, -0.8], [0.8, 0.6], [112, 124]),
  ]);
}

function forearmBackbend({ both = true }) {
  return doc([
    shadow(110, 40),
    // Стопа (или обе) спускается к голове: голень идёт от колена вниз-вперёд.
    leg([140, 116], [158, 94], [120, 94], { far: true, foot: 'freeFlex', toe: -1, underShorts: true }),
    torso([100, 134], [112, 128], [126, 120], [140, 116], [146, 126], [130, 136], [112, 140]),
    leg([136, 118], both ? [154, 98] : [160, 74], both ? [116, 100] : [172, 52], {
      foot: 'freeFlex',
      toe: -1,
      underShorts: true,
    }),
    shortsFrame([138, 118], [0.9, -0.44], [0.44, 0.9], {
      rise: 9,
      half: 9.8,
      thighs: [
        [[136, 118], both ? [154, 98] : [160, 74]],
        [[140, 116], [158, 94]],
      ],
      legLen: 11,
      crotch: 5,
      inline: true,
    }),
    // Предплечья на настиле, локти под плечами.
    arm([102, 130], [100, 146], [94, 158], { far: true, hand: 'flat', fingers: 1 }),
    arm([124, 130], [122, 146], [116, 158], { hand: 'flat', fingers: 1 }),
    head([112, 120], [0.5, -0.87], [0.87, 0.5], [116, 130]),
  ]);
}

export function dviPadaViparitaDandasana() {
  return forearmBackbend({ both: true });
}
export function ekaPadaViparitaDandasana() {
  return forearmBackbend({ both: false });
}

export function nataRajasana() {
  return doc([
    shadow(104, 44),
    // Опорная нога прямая.
    leg([100, 128], [100, 148], [100, 162], { foot: 'flat', toe: 1, underShorts: true }),
    torso([96, 134], [100, 118], [104, 94], [116, 92], [124, 120], [118, 138]),
    // Свободная нога заведена за голову, стопа в руке над головой.
    leg([108, 128], [124, 102], [126, 76], { far: true, foot: 'lotus', toe: -1, underShorts: true }),
    shortsFrame([102, 128], [0.05, -1], [1, 0.05], {
      rise: 10,
      half: 10.2,
      thighs: [
        [[100, 128], [100, 148]],
        [[108, 128], [124, 102]],
      ],
      legLen: 11,
      crotch: 5.4,
      inline: true,
    }),
    arm([112, 96], [128, 78], [128, 64], { hand: 'hold' }),
    arm([108, 100], [96, 84], [104, 68], { far: true, hand: 'hold' }),
    head([110, 80], [0.4, -0.92], [0.92, 0.4], [106, 94]),
  ]);
}

export function rajaKapotasana() {
  return doc([
    shadow(104, 46),
    // Колени на настиле, голени лежат назад.
    leg([108, 130], [132, 152], [96, 108], { far: true, foot: 'freeFlex', toe: -1, underShorts: true }),
    torso([92, 146], [98, 128], [100, 106], [112, 100], [122, 128], [116, 146]),
    leg([112, 132], [136, 154], [100, 112], { foot: 'freeFlex', toe: -1, underShorts: true }),
    shortsFrame([108, 132], [0, -1], [1, 0], {
      rise: 10,
      half: 10.2,
      thighs: [
        [[112, 132], [136, 154]],
        [[108, 130], [132, 152]],
      ],
      legLen: 11,
      crotch: 5.4,
      inline: true,
    }),
    // Руки подняты назад-вверх и держат стопы у головы.
    arm([100, 106], [104, 92], [100, 84], { far: true, hand: 'hold' }),
    arm([112, 102], [112, 88], [104, 84], { hand: 'hold' }),
    head([100, 88], [0.1, -0.99], [0.99, 0.1], [104, 102]),
  ]);
}

export function ekaPadaRajaKapotasana() {
  return doc([
    shadow(104, 46),
    // Опорная голень лежит на настиле.
    leg([108, 130], [132, 152], [150, 150], { far: true, foot: 'tops', toe: 1, underShorts: true }),
    torso([92, 146], [98, 128], [100, 106], [112, 100], [122, 128], [116, 146]),
    // Свободная стопа заведена за голову.
    leg([112, 132], [128, 106], [102, 98], { foot: 'lotus', toe: -1, underShorts: true }),
    shortsFrame([108, 132], [0, -1], [1, 0], {
      rise: 10,
      half: 10.2,
      thighs: [
        [[112, 132], [128, 106]],
        [[108, 130], [132, 152]],
      ],
      legLen: 11,
      crotch: 5.4,
      inline: true,
    }),
    arm([100, 106], [102, 94], [98, 88], { far: true, hand: 'hold' }),
    arm([112, 102], [110, 90], [100, 88], { hand: 'hold' }),
    head([100, 88], [0.1, -0.99], [0.99, 0.1], [104, 102]),
  ]);
}

export const FILES = [
  ['01-vasisthasana', vasisthasana],
  ['02-vishvamitrasana', vishvamitrasana],
  ['03-kasyapasana', kasyapasana],
  ['04-chakorasana', chakorasana],
  ['05-urdhva-kukkutasana-a', urdhvaKukkutasanaA],
  ['06-durvasana', durvasana],
  ['07-bhairavasana', bhairavasana],
  ['08-urdhva-kukkutasana-b', urdhvaKukkutasanaB],
  ['09-urdhva-kukkutasana-c', urdhvaKukkutasanaC],
  ['10-galavasana', galavasana],
  ['11-eka-pada-bakasana-a', ekaPadaBakasanaA],
  ['12-eka-pada-bakasana-b', ekaPadaBakasanaB],
  ['13-koundinyasana-a', koundinyasanaA],
  ['14-koundinyasana-b', koundinyasanaB],
  ['15-astavakrasana-a', astavakrasanaA],
  ['16-astavakrasana-b', astavakrasanaB],
  ['17-purna-matsyendrasana', purnaMatsyendrasana],
  ['18-viranchyasana-a1', viranchyasanaA1],
  ['19-viranchyasana-a2', viranchyasanaA2],
  ['20-viranchyasana-a3', viranchyasanaA3],
  ['21-viranchyasana-b1', viranchyasanaB1],
  ['22-viranchyasana-b2', viranchyasanaB2],
  ['23-viranchyasana-b3', viranchyasanaB3],
  ['24-dvi-pada-viparita-dandasana', dviPadaViparitaDandasana],
  ['25-eka-pada-viparita-dandasana', ekaPadaViparitaDandasana],
  ['26-viparita-salabhasana', viparitaSalabhasana],
  ['27-ganda-bherundasana', gandaBherundasana],
  ['28-hanumanasana', hanumanasana],
  ['29-supta-trivikramasana', suptaTrivikramasana],
  ['30-digasana-a', digasanaA],
  ['31-digasana-b', digasanaB],
  ['32-utthita-trivikramasana', utthitaTrivikramasana],
  ['33-nata-rajasana', nataRajasana],
  ['34-raja-kapotasana', rajaKapotasana],
  ['35-eka-pada-raja-kapotasana', ekaPadaRajaKapotasana],
  ['36-skandasana', skandasana],
];
