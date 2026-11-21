/**
 * Третья серия (Advanced A, Sthira Bhaga).
 *
 * Единая анатомия для всех кадров: плечо 26, предплечье 23, бедро 33,
 * голень 31, шея 14–16. Это убирает «короткие руки», «стебель-шею» и
 * висящие в воздухе стопы, из-за которых позы читались неверно.
 *
 * Ракурсы:
 * - профиль (`head`): лицо в +x; боковые упоры, скрутки, прогибы;
 * - фронт (`headFront`): лотос на руках, симметричные балансы;
 * - лёжа/инверсия: голова и таз на одной линии, стопы на полу.
 */
import { draw, svgDocument } from './figure.mjs';

const { thigh, shin, arm, torso, shortsFrame, head, headFront, groundLine } = draw;

const add = (a, b) => [a[0] + b[0], a[1] + b[1]];
const sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
const mul = (a, s) => [a[0] * s, a[1] * s];
const norm = (a) => {
  const l = Math.hypot(a[0], a[1]) || 1;
  return [a[0] / l, a[1] / l];
};
function doc(parts) {
  return svgDocument([groundLine(), ...parts].join('\n'));
}

/**
 * Торс как замкнутый контур вокруг оси «таз → плечи».
 * 8 точек: таз, талия, грудь, плечи с двух сторон.
 */
function trunk(hip, shoulder, opt = {}) {
  const { hipW = 10, waistW = 9, chestW = 11, shoulderW = 12, arch = false } = opt;
  const u = sub(shoulder, hip);
  const s = [-norm(u)[1], norm(u)[0]];
  const pt = (t, w) => [hip[0] + u[0] * t + s[0] * w, hip[1] + u[1] * t + s[1] * w];
  return torso(
    [
      pt(0, hipW),
      pt(0.3, waistW),
      pt(0.7, chestW),
      pt(1, shoulderW),
      pt(1, -shoulderW),
      pt(0.7, -chestW),
      pt(0.3, -waistW),
      pt(0, -hipW),
    ],
    { arch },
  );
}

/** Шорты по оси торса; front — куда смотрит живот. */
function shortsOn(hip, shoulder, front, thighs, opt = {}) {
  const up = norm(sub(shoulder, hip));
  return shortsFrame(hip, up, norm(front), {
    rise: 9,
    half: 10,
    legLen: 12,
    crotch: 5,
    inline: true,
    thighs,
    ...opt,
  });
}

/**
 * Профильная голова: короткая толстая шея начинается ВНУТРИ торса и уходит
 * внутрь головы. Тонкая капсула от кромки плеча давала белый просвет и
 * читалась как оторванная голова.
 */
function headP(shoulder, dir, gaze, crown = dir, opt = {}) {
  const d = norm(dir);
  const c = add(shoulder, mul(d, opt.dist ?? 13));
  return head(c, gaze, crown, shoulder, { r: opt.r ?? 11, neckW: opt.neckW ?? 5 });
}

/** Фронтальная голова: толстая шея изнутри торса, без просвета. */
function headF(shoulder, dir, nose, opt = {}) {
  const d = norm(dir);
  const c = add(shoulder, mul(d, opt.dist ?? 15));
  return headFront(c, shoulder, nose, opt.r ?? 11, { neckW: opt.neckW ?? 5 });
}

const angleAt = (a, b, c) => {
  const ux = a[0] - b[0];
  const uy = a[1] - b[1];
  const vx = c[0] - b[0];
  const vy = c[1] - b[1];
  const lu = Math.hypot(ux, uy);
  const lv = Math.hypot(vx, vy);
  if (!lu || !lv) return Math.PI;
  return Math.acos(Math.min(1, Math.max(-1, (ux * vx + uy * vy) / (lu * lv))));
};

/**
 * Нога с автоматическим скруглением острого колена. Одна лента на сгибе
 * < ~58° даёт митер-спицу; здесь включается `softKnee` (бедро + голень +
 * диск-мыщелок). Для прямых ног рендер не меняется.
 */
function aLeg(hip, knee, ankle, opt = {}) {
  const sharp = angleAt(hip, knee, ankle) < 1.02;
  return draw.leg(hip, knee, ankle, { ...opt, softKnee: opt.softKnee ?? sharp });
}


/* ------------------------------------------------------------------ */
/* 01. Васиштхасана — боковой упор, нижняя нога прямая, верхняя вверх. */
export function vasisthasana() {
  const hip = [82, 124];
  const shoulder = [112, 102];
  return doc([
    // Нижняя нога: прямая, стопа на полу.
    aLeg(hip, [62, 142], [42, 160], { far: true, foot: 'flat', toe: -1, underShorts: true }),
    // Верхняя нога: прямая, поднята вверх.
    aLeg(hip, [68, 94], [58, 64], { foot: 'free', toe: -1, underShorts: true }),
    trunk(hip, shoulder, { hipW: 10, waistW: 9, chestW: 10, shoulderW: 11 }),
    shortsOn(hip, shoulder, [1, 0], [
      [[82, 124], [68, 94]],
      [[82, 124], [62, 142]],
    ]),
    // Опорная рука под плечом.
    arm(shoulder, [116, 130], [118, 158], { hand: 'flat', fingers: 1 }),
    // Верхняя рука тянется к дришти.
    arm([114, 104], [128, 82], [142, 60], { far: true, hand: 'up' }),
    headP([112, 102], [0.55, -0.84], [142, 60], [0.3, -0.95]),
  ]);
}

/* 02. Вишвамитрасана — боковой упор, нижняя нога согнута, верхняя в руке. */
export function vishvamitrasana() {
  const hip = [85, 125];
  const shoulder = [111, 104];
  return doc([
    // Нижняя нога согнута, стопа на полу перед опорной рукой.
    aLeg(hip, [60, 140], [52, 164], { far: true, foot: 'flat', toe: -1, underShorts: true }),
    // Верхняя нога вытянута вперёд-вверх, стопа в захвате.
    aLeg(hip, [72, 96], [58, 68], { foot: 'free', toe: -1, underShorts: true }),
    trunk(hip, shoulder, { hipW: 10, waistW: 9, chestW: 10, shoulderW: 11 }),
    shortsOn(hip, shoulder, [1, 0], [
      [[85, 125], [72, 96]],
      [[85, 125], [60, 140]],
    ]),
    // Верхняя рука держит поднятую стопу.
    arm([110, 104], [88, 90], [60, 74], { far: true, hand: 'wrap' }),
    // Опорная рука.
    arm([112, 106], [116, 132], [118, 158], { hand: 'flat', fingers: 1 }),
    headP([111, 104], [0.5, -0.87], [58, 68], [0.3, -0.95]),
  ]);
}

/* 03. Кашьяпасана — лёжа, одна стопа за головой, вторая вверх. */
export function kasyapasana() {
  const hip = [118, 152];
  const shoulder = [78, 152];
  return doc([
    // Нога за головой: бедро вверх, голень огибает макушку, стопа уходит
    // за голову (x стопы меньше x головы), а не остаётся перед лицом.
    thigh([118, 152], [90, 134], { far: true, underShorts: true }),
    shin([90, 134], [60, 140], { far: true, foot: 'lotus', toe: -1 }),
    // Поднятая нога вертикально вверх.
    aLeg([118, 152], [120, 118], [120, 86], { foot: 'free', toe: 1, underShorts: true }),
    trunk(hip, shoulder, { hipW: 11, waistW: 10, chestW: 12, shoulderW: 12 }),
    shortsOn(hip, shoulder, [0, -1], [
      [[118, 152], [120, 118]],
      [[118, 152], [90, 134]],
    ]),
    // Обе кисти на поднятой стопе.
    arm([82, 150], [105, 132], [120, 110], { far: true, hand: 'wrap' }),
    arm([86, 150], [107, 132], [122, 112], { hand: 'wrap' }),
    headP([78, 152], [-1, 0.05], [120, 86], [0.2, -0.98]),
  ]);
}

/* 04. Чакорасана — баланс на руках, стопа за головой, вторая вверх. */
export function chakorasana() {
  const hip = [92, 138];
  const shoulder = [112, 118];
  return doc([
    // Стопа за головой (дальняя): голень выходит за шею, стопа у затылка.
    thigh([92, 138], [89, 105], { far: true, underShorts: true }),
    shin([89, 105], [120, 100], { far: true, foot: 'lotus', toe: -1 }),
    // Вторая нога вертикально вверх.
    aLeg([92, 138], [94, 104], [96, 72], { foot: 'free', toe: 1, underShorts: true }),
    trunk(hip, shoulder, { hipW: 10, waistW: 9, chestW: 11, shoulderW: 11 }),
    shortsOn(hip, shoulder, [1, 0], [
      [[92, 138], [94, 104]],
      [[92, 138], [89, 105]],
    ]),
    // Две опоры: ладони под плечами; правое плечо уведено внутрь контура.
    arm([112, 118], [110, 140], [108, 158], { far: true, hand: 'flat', fingers: 1 }),
    arm([118, 122], [124, 142], [128, 158], { hand: 'flat', fingers: 1 }),
    headP([112, 118], [0.4, -0.92], [96, 72], [0.5, -0.86]),
  ]);
}

/* 05. Бхайравасана — боковой упор на предплечье, стопа за головой. */
export function bhairavasana() {
  const hip = [85, 128];
  const shoulder = [112, 108];
  return doc([
    // Нижняя нога на полу.
    aLeg(hip, [65, 145], [45, 162], { far: true, foot: 'flat', toe: -1, underShorts: true }),
    // Стопа за головой: голень огибает затылок, стопа уходит за макушку.
    thigh([85, 128], [87, 95], { far: true, underShorts: true }),
    shin([87, 95], [118, 90], { far: true, foot: 'lotus', toe: -1 }),
    trunk(hip, shoulder, { hipW: 10, waistW: 9, chestW: 10, shoulderW: 11 }),
    shortsOn(hip, shoulder, [1, 0], [
      [[85, 128], [87, 95]],
      [[85, 128], [65, 145]],
    ]),
    // Опорная рука: предплечье на полу.
    arm([112, 108], [118, 136], [112, 158], { hand: 'flat', fingers: 1 }),
    // Свободная рука держит стопу за головой.
    arm([110, 106], [124, 104], [118, 90], { far: true, hand: 'wrap' }),
    headP([112, 108], [0.55, -0.84], [118, 90], [0.4, -0.92]),
  ]);
}


export const FILES = [
  ['01-vasisthasana', vasisthasana],
  ['02-vishvamitrasana', vishvamitrasana],
  ['03-kasyapasana', kasyapasana],
  ['04-chakorasana', chakorasana],
  ['05-bhairavasana', bhairavasana],
  ['06-skandasana', skandasana],
  ['07-durvasana', durvasana],
  ['08-urdhva-kukkutasana-a', urdhvaKukkutasanaA],
  ['09-urdhva-kukkutasana-b', urdhvaKukkutasanaB],
  ['10-urdhva-kukkutasana-c', urdhvaKukkutasanaC],
  ['11-galavasana', galavasana],
  ['12-eka-pada-bakasana-a', ekaPadaBakasanaA],
  ['13-eka-pada-bakasana-b', ekaPadaBakasanaB],
  ['14-koundinyasana-a', koundinyasanaA],
  ['15-koundinyasana-b', koundinyasanaB],
  ['16-astavakrasana-a', astavakrasanaA],
  ['17-astavakrasana-b', astavakrasanaB],
  ['18-purna-matsyendrasana', purnaMatsyendrasana],
  ['19-viranchyasana-a1', viranchyasanaA1],
  ['20-viranchyasana-a2', viranchyasanaA2],
  ['21-viranchyasana-a3', viranchyasanaA3],
  ['22-viranchyasana-b1', viranchyasanaB1],
  ['23-viranchyasana-b2', viranchyasanaB2],
  ['24-viranchyasana-b3', viranchyasanaB3],
  ['25-dvi-pada-viparita-dandasana', dviPadaViparitaDandasana],
  ['26-eka-pada-viparita-dandasana', ekaPadaViparitaDandasana],
  ['27-viparita-salabhasana', viparitaSalabhasana],
  ['28-ganda-bherundasana', gandaBherundasana],
  ['29-hanumanasana', hanumanasana],
  ['30-supta-trivikramasana', suptaTrivikramasana],
  ['31-digasana-a', digasanaA],
  ['32-digasana-b', digasanaB],
  ['33-utthita-trivikramasana', utthitaTrivikramasana],
  ['34-nata-rajasana', nataRajasana],
  ['35-raja-kapotasana', rajaKapotasana],
  ['36-eka-pada-raja-kapotasana', ekaPadaRajaKapotasana],
];

/* 06. Скандасана — стоя в наклоне, стопа за головой, ладони на полу. */
export function skandasana() {
  const hip = [100, 104];
  const shoulder = [128, 96];
  return doc([
    // Опорная нога прямая.
    aLeg(hip, [100, 136], [100, 168], { foot: 'flat', toe: 1, underShorts: true }),
    // Стопа за головой: бедро вверх, голень спускается за шею, стопа у затылка.
    thigh([100, 104], [98, 71], { far: true, underShorts: true }),
    shin([98, 71], [124, 88], { far: true, foot: 'lotus', toe: -1 }),
    trunk(hip, shoulder, { hipW: 10, waistW: 9, chestW: 10, shoulderW: 11 }),
    shortsOn(hip, shoulder, [0, 1], [
      [[100, 104], [98, 71]],
      [[100, 104], [100, 136]],
    ]),
    arm([128, 96], [134, 126], [138, 158], { far: true, hand: 'flat', fingers: 1 }),
    arm([124, 100], [130, 130], [134, 160], { hand: 'flat', fingers: 1 }),
    headP([128, 96], [1, -0.1], [140, 110], [0.9, 0.3]),
  ]);
}

/* 07. Дурвасана — стоя, стопа за головой, руки в намасте. */
export function durvasana() {
  const hip = [100, 104];
  const shoulder = [100, 70];
  return doc([
    aLeg(hip, [100, 136], [100, 168], { foot: 'flat', toe: 1, underShorts: true }),
    // Стопа за головой: колено вверх-вправо, голень уходит влево за макушку.
    thigh([100, 104], [114, 74], { far: true, underShorts: true }),
    shin([114, 74], [84, 68], { far: true, foot: 'lotus', toe: -1 }),
    trunk(hip, shoulder, { hipW: 10, waistW: 9, chestW: 11, shoulderW: 12 }),
    shortsOn(hip, shoulder, [1, 0], [
      [[100, 104], [114, 74]],
      [[100, 104], [100, 136]],
    ]),
    arm([94, 72], [86, 88], [100, 90], { far: true, hand: 'prayer' }),
    arm([106, 72], [114, 88], [100, 90], { hand: 'prayer' }),
    headP([100, 70], [0.05, -1], [1, 0], [0.05, -1]),
  ]);
}

/* 08. Урдхва Куккутасана A — лотос на руках, локти согнуты. */
export function urdhvaKukkutasanaA() {
  const hip = [100, 132];
  const shoulder = [100, 108];
  return doc([
    thigh([94, 134], [66, 120], { far: true, underShorts: true }),
    shin([66, 120], [88, 130], { far: true, foot: 'lotus', toe: 1 }),
    thigh([106, 134], [134, 120], { underShorts: true }),
    shin([134, 120], [112, 130], { foot: 'lotus', toe: -1 }),
    trunk(hip, shoulder, { hipW: 10, waistW: 9, chestW: 11, shoulderW: 13 }),
    shortsOn(hip, shoulder, [1, 0], [
      [[106, 134], [134, 120]],
      [[94, 134], [66, 120]],
    ], { sym: true, half: 11 }),
    arm([86, 108], [84, 134], [82, 158], { far: true, hand: 'flat', fingers: 1 }),
    arm([114, 108], [116, 134], [118, 158], { hand: 'flat', fingers: 1 }),
    headF([100, 108], [0, -1], [0, -1], { dist: 18 }),
  ]);
}

/* 09. Урдхва Куккутасана B — руки выпрямлены, таз выше. */
export function urdhvaKukkutasanaB() {
  const hip = [100, 124];
  const shoulder = [100, 100];
  return doc([
    thigh([94, 126], [66, 112], { far: true, underShorts: true }),
    shin([66, 112], [88, 122], { far: true, foot: 'lotus', toe: 1 }),
    thigh([106, 126], [134, 112], { underShorts: true }),
    shin([134, 112], [112, 122], { foot: 'lotus', toe: -1 }),
    trunk(hip, shoulder, { hipW: 10, waistW: 9, chestW: 11, shoulderW: 13 }),
    shortsOn(hip, shoulder, [1, 0], [
      [[106, 126], [134, 112]],
      [[94, 126], [66, 112]],
    ], { sym: true, half: 11 }),
    arm([86, 100], [84, 128], [82, 158], { far: true, hand: 'flat', fingers: 1 }),
    arm([114, 100], [116, 128], [118, 158], { hand: 'flat', fingers: 1 }),
    headF([100, 100], [0, -1], [0, -1], { dist: 18 }),
  ]);
}

/* 10. Урдхва Куккутасана C — корпус вперёд, вес на ладонях. */
export function urdhvaKukkutasanaC() {
  const hip = [96, 130];
  const shoulder = [116, 112];
  return doc([
    thigh([96, 130], [128, 120], { far: true, underShorts: true }),
    shin([128, 120], [96, 124], { far: true, foot: 'lotus', toe: -1 }),
    thigh([100, 132], [126, 132], { underShorts: true }),
    shin([126, 132], [94, 132], { foot: 'lotus', toe: -1 }),
    trunk(hip, shoulder, { hipW: 10, waistW: 9, chestW: 10, shoulderW: 11 }),
    shortsOn(hip, shoulder, [1, 0], [
      [[100, 132], [126, 132]],
      [[96, 130], [128, 120]],
    ]),
    arm([116, 112], [118, 140], [120, 158], { far: true, hand: 'flat', fingers: 1 }),
    arm([98, 116], [100, 142], [102, 158], { hand: 'flat', fingers: 1 }),
    headP([116, 112], [0.75, -0.66], [1, 0], [0.4, -0.92]),
  ]);
}

/* 11. Галавасана — голень на плечах, вторая нога диагонально вверх. */
export function galavasana() {
  const hip = [92, 130];
  const shoulder = [110, 112];
  return doc([
    // Голень правой ноги лежит на плечах/предплечьях.
    aLeg([92, 130], [124, 112], [86, 108], { foot: 'lotus', toe: -1, underShorts: true }),
    // Левая нога вытянута диагонально вверх.
    aLeg([92, 130], [70, 110], [48, 88], { far: true, foot: 'free', toe: -1, underShorts: true }),
    trunk(hip, shoulder, { hipW: 10, waistW: 9, chestW: 10, shoulderW: 11 }),
    shortsOn(hip, shoulder, [1, 0], [
      [[92, 130], [124, 112]],
      [[92, 130], [70, 110]],
    ]),
    arm([110, 112], [112, 140], [114, 158], { hand: 'flat', fingers: 1 }),
    arm([96, 116], [98, 142], [100, 158], { far: true, hand: 'flat', fingers: 1 }),
    headP([110, 112], [0.6, -0.8], [1, 0], [0.4, -0.92]),
  ]);
}

/* 12. Эка Пада Бакасана A — колено на локте, вторая нога вверх. */
export function ekaPadaBakasanaA() {
  const hip = [86, 128];
  const shoulder = [116, 112];
  return doc([
    // Согнутая нога: колено лежит на верхней части опорного плеча.
    aLeg([86, 128], [117, 132], [88, 120], { foot: 'lotus', toe: -1, underShorts: true }),
    // Свободная нога вытянута вверх.
    aLeg([86, 128], [66, 104], [46, 80], { far: true, foot: 'free', toe: -1, underShorts: true }),
    trunk(hip, shoulder, { hipW: 10, waistW: 9, chestW: 10, shoulderW: 11 }),
    shortsOn(hip, shoulder, [1, 0], [
      [[86, 128], [117, 132]],
      [[86, 128], [66, 104]],
    ]),
    arm([116, 112], [118, 140], [120, 158], { hand: 'flat', fingers: 1 }),
    arm([98, 116], [100, 142], [102, 158], { far: true, hand: 'flat', fingers: 1 }),
    headP([116, 112], [0.55, -0.84], [46, 80], [0.5, -0.86]),
  ]);
}

/* 13. Эка Пада Бакасана B — колено на локте, вторая нога вперёд. */
export function ekaPadaBakasanaB() {
  const hip = [86, 128];
  const shoulder = [116, 112];
  return doc([
    aLeg([86, 128], [117, 132], [88, 120], { foot: 'lotus', toe: -1, underShorts: true }),
    // Свободная нога вытянута вперёд.
    aLeg([86, 128], [58, 130], [34, 142], { far: true, foot: 'free', toe: -1, underShorts: true }),
    trunk(hip, shoulder, { hipW: 10, waistW: 9, chestW: 10, shoulderW: 11 }),
    shortsOn(hip, shoulder, [1, 0], [
      [[86, 128], [117, 132]],
      [[86, 128], [58, 130]],
    ]),
    arm([116, 112], [118, 140], [120, 158], { hand: 'flat', fingers: 1 }),
    arm([98, 116], [100, 142], [102, 158], { far: true, hand: 'flat', fingers: 1 }),
    headP([116, 112], [0.55, -0.84], [1, 0], [0.5, -0.86]),
  ]);
}

/* 14. Кундиньясана A — обе ноги вытянуты в одну сторону. */
export function koundinyasanaA() {
  const hip = [100, 128];
  const shoulder = [118, 112];
  return doc([
    aLeg([100, 128], [70, 136], [44, 142], { foot: 'free', toe: -1, underShorts: true }),
    aLeg([104, 130], [74, 142], [48, 150], { far: true, foot: 'free', toe: -1, underShorts: true }),
    trunk(hip, shoulder, { hipW: 10, waistW: 9, chestW: 10, shoulderW: 11 }),
    shortsOn(hip, shoulder, [1, 0], [
      [[100, 128], [70, 136]],
      [[104, 130], [74, 142]],
    ]),
    arm([118, 112], [120, 140], [122, 158], { hand: 'flat', fingers: 1 }),
    arm([100, 116], [102, 142], [104, 158], { far: true, hand: 'flat', fingers: 1 }),
    headP([118, 112], [0.5, -0.87], [44, 142], [0.4, -0.92]),
  ]);
}

/* 15. Кундиньясана B — одна нога вперёд, вторая назад-вверх. */
export function koundinyasanaB() {
  const hip = [100, 128];
  const shoulder = [118, 112];
  return doc([
    aLeg([100, 128], [72, 140], [48, 150], { foot: 'free', toe: -1, underShorts: true }),
    aLeg([104, 130], [128, 114], [152, 100], { far: true, foot: 'free', toe: 1, underShorts: true }),
    trunk(hip, shoulder, { hipW: 10, waistW: 9, chestW: 10, shoulderW: 11 }),
    shortsOn(hip, shoulder, [1, 0], [
      [[100, 128], [72, 140]],
      [[104, 130], [128, 114]],
    ]),
    arm([118, 112], [120, 140], [122, 158], { hand: 'flat', fingers: 1 }),
    arm([100, 116], [102, 142], [104, 158], { far: true, hand: 'flat', fingers: 1 }),
    headP([118, 112], [0.5, -0.87], [152, 100], [0.4, -0.92]),
  ]);
}

/* 16. Аштавакрасана A — ноги переплетены и вынесены в сторону. */
export function astavakrasanaA() {
  const hip = [100, 128];
  const shoulder = [118, 112];
  return doc([
    aLeg([100, 128], [70, 120], [86, 146], { foot: 'lotus', toe: -1, underShorts: true }),
    aLeg([104, 130], [74, 134], [92, 158], { far: true, foot: 'lotus', toe: -1, underShorts: true }),
    trunk(hip, shoulder, { hipW: 10, waistW: 9, chestW: 10, shoulderW: 11 }),
    shortsOn(hip, shoulder, [1, 0], [
      [[100, 128], [70, 120]],
      [[104, 130], [74, 134]],
    ]),
    arm([118, 112], [120, 140], [122, 158], { hand: 'flat', fingers: 1 }),
    arm([100, 116], [102, 142], [104, 158], { far: true, hand: 'flat', fingers: 1 }),
    headP([118, 112], [0.5, -0.87], [86, 146], [0.4, -0.92]),
  ]);
}

/* 17. Аштавакрасана B — ноги разгибаются в сторону. */
export function astavakrasanaB() {
  const hip = [100, 128];
  const shoulder = [118, 112];
  return doc([
    aLeg([100, 128], [70, 134], [44, 142], { foot: 'free', toe: -1, underShorts: true }),
    aLeg([104, 130], [130, 142], [154, 150], { far: true, foot: 'free', toe: 1, underShorts: true }),
    trunk(hip, shoulder, { hipW: 10, waistW: 9, chestW: 10, shoulderW: 11 }),
    shortsOn(hip, shoulder, [1, 0], [
      [[100, 128], [70, 134]],
      [[104, 130], [130, 142]],
    ]),
    arm([118, 112], [120, 140], [122, 158], { hand: 'flat', fingers: 1 }),
    arm([100, 116], [102, 142], [104, 158], { far: true, hand: 'flat', fingers: 1 }),
    headP([118, 112], [0.5, -0.87], [44, 142], [0.4, -0.92]),
  ]);
}


/* 18. Пурна Матсьендрасана — скрутка сидя, одна нога в лотосе. */
export function purnaMatsyendrasana() {
  const hip = [100, 146];
  const shoulder = [100, 112];
  return doc([
    // Левая нога в лотосе на полу.
    thigh([96, 146], [66, 152], { far: true, underShorts: true }),
    shin([66, 152], [88, 144], { far: true, foot: 'lotus', toe: 1 }),
    // Правая стопа переставлена через левое бедро, стоит на полу снаружи.
    aLeg([104, 146], [75, 131], [64, 160], { foot: 'flat', toe: -1, underShorts: true }),
    trunk(hip, shoulder, { hipW: 11, waistW: 10, chestW: 11, shoulderW: 12 }),
    shortsOn(hip, shoulder, [0, 1], [
      [[104, 146], [75, 131]],
      [[96, 146], [66, 152]],
    ]),
    // Левая рука держит правую стопу, правая — за спиной.
    arm([96, 114], [110, 130], [64, 156], { far: true, hand: 'wrap' }),
    arm([104, 114], [86, 128], [108, 140], { hand: 'hold' }),
    headP([100, 112], [-1, -0.2], [-1, 0], [0.1, -1]),
  ]);
}

/* 19. Виранчьясана A1 — полулотос, стопа за головой, руки в намасте. */
export function viranchyasanaA1() {
  const hip = [100, 146];
  const shoulder = [100, 112];
  return doc([
    thigh([96, 146], [66, 152], { far: true, underShorts: true }),
    shin([66, 152], [88, 144], { far: true, foot: 'lotus', toe: 1 }),
    thigh([104, 146], [117, 115], { underShorts: true }),
    shin([117, 115], [88, 104], { foot: 'lotus', toe: -1 }),
    trunk(hip, shoulder, { hipW: 11, waistW: 10, chestW: 11, shoulderW: 12 }),
    shortsOn(hip, shoulder, [0, 1], [
      [[104, 146], [117, 115]],
      [[96, 146], [66, 152]],
    ]),
    arm([94, 114], [88, 130], [100, 124], { far: true, hand: 'prayer' }),
    arm([106, 114], [112, 130], [100, 124], { hand: 'prayer' }),
    headP([100, 112], [0.15, -0.99], [1, 0], [0.2, -0.98]),
  ]);
}

/* 20. Виранчьясана A2 — тот же лотос, руки связаны за спиной. */
export function viranchyasanaA2() {
  const hip = [100, 146];
  const shoulder = [100, 112];
  return doc([
    thigh([96, 146], [66, 152], { far: true, underShorts: true }),
    shin([66, 152], [88, 144], { far: true, foot: 'lotus', toe: 1 }),
    thigh([104, 146], [117, 115], { underShorts: true }),
    shin([117, 115], [88, 104], { foot: 'lotus', toe: -1 }),
    trunk(hip, shoulder, { hipW: 11, waistW: 10, chestW: 11, shoulderW: 12 }),
    shortsOn(hip, shoulder, [0, 1], [
      [[104, 146], [117, 115]],
      [[96, 146], [66, 152]],
    ]),
    // Замок за спиной: нижняя кисть идёт снизу, верхняя сверху.
    arm([94, 114], [80, 130], [98, 140], { far: true, hand: 'hold' }),
    arm([106, 114], [120, 130], [100, 138], { hand: 'hold' }),
    headP([100, 112], [0.2, -0.98], [0.1, -1], [0.1, -1]),
  ]);
}


/* 21. Виранчьясана A3 — баланс на руках, колено на плече. */
export function viranchyasanaA3() {
  const hip = [96, 122];
  const shoulder = [112, 108];
  return doc([
    // Левая нога: колено на левом плече.
    aLeg([96, 122], [80, 136], [102, 144], { foot: 'lotus', toe: -1, underShorts: true }),
    // Правая стопа за головой: голень уходит за шею, стопа у затылка.
    thigh([104, 122], [87, 94], { far: true, underShorts: true }),
    shin([87, 94], [118, 92], { far: true, foot: 'lotus', toe: -1 }),
    trunk(hip, shoulder, { hipW: 10, waistW: 9, chestW: 10, shoulderW: 11 }),
    shortsOn(hip, shoulder, [1, 0], [
      [[96, 122], [80, 136]],
      [[104, 122], [87, 94]],
    ]),
    arm([96, 112], [80, 136], [100, 150], { far: true, hand: 'flat', fingers: 1 }),
    arm([112, 108], [114, 136], [116, 158], { hand: 'flat', fingers: 1 }),
    headP([112, 108], [0.5, -0.87], [1, 0], [0.4, -0.92]),
  ]);
}

/* 22. Виранчьясана B1 — длинный сед, наклон к прямой ноге. */
export function viranchyasanaB1() {
  const hip = [100, 150];
  const shoulder = [126, 136];
  return doc([
    // Левая нога прямая, стопа в flex.
    aLeg([100, 150], [130, 156], [160, 160], { foot: 'flex', toe: -1, underShorts: true }),
    // Правая стопа в паху левого бедра.
    thigh([94, 150], [64, 154], { far: true, underShorts: true }),
    shin([64, 154], [90, 148], { far: true, foot: 'lotus', toe: 1 }),
    trunk(hip, shoulder, { hipW: 11, waistW: 10, chestW: 11, shoulderW: 12 }),
    shortsOn(hip, shoulder, [0, 1], [
      [[100, 150], [130, 156]],
      [[94, 150], [64, 154]],
    ]),
    arm([126, 136], [144, 144], [160, 154], { far: true, hand: 'wrap' }),
    arm([120, 138], [140, 148], [158, 156], { hand: 'wrap' }),
    headP([126, 136], [0.9, -0.2], [0.4, 0.9], [0.8, -0.6]),
  ]);
}

/* 23. Виранчьясана B2 — глубокий наклон, взгляд через макушку. */
export function viranchyasanaB2() {
  const hip = [100, 150];
  const shoulder = [132, 142];
  return doc([
    aLeg([100, 150], [130, 156], [160, 160], { foot: 'flex', toe: -1, underShorts: true }),
    thigh([94, 150], [64, 154], { far: true, underShorts: true }),
    shin([64, 154], [90, 148], { far: true, foot: 'lotus', toe: 1 }),
    trunk(hip, shoulder, { hipW: 11, waistW: 10, chestW: 11, shoulderW: 12 }),
    shortsOn(hip, shoulder, [0, 1], [
      [[100, 150], [130, 156]],
      [[94, 150], [64, 154]],
    ]),
    arm([132, 142], [146, 150], [160, 158], { far: true, hand: 'wrap' }),
    arm([126, 144], [142, 152], [158, 160], { hand: 'wrap' }),
    headP([132, 142], [0.7, 0.7], [0.3, 0.95], [0.6, -0.8]),
  ]);
}

/* 24. Виранчьясана B3 — скрутка, левая стопа в лотосе на правом бедре. */
export function viranchyasanaB3() {
  const hip = [100, 148];
  const shoulder = [100, 114];
  return doc([
    // Правая нога — база.
    thigh([104, 148], [132, 154], { far: true, underShorts: true }),
    shin([132, 154], [104, 146], { far: true, foot: 'lotus', toe: 1 }),
    // Левая стопа в лотосе на правом бедре.
    thigh([96, 148], [70, 140], { underShorts: true }),
    shin([70, 140], [104, 140], { foot: 'lotus', toe: -1 }),
    trunk(hip, shoulder, { hipW: 11, waistW: 10, chestW: 11, shoulderW: 12 }),
    shortsOn(hip, shoulder, [0, 1], [
      [[96, 148], [70, 140]],
      [[104, 148], [132, 154]],
    ]),
    // Правая рука под левым коленом, левая — за спиной к стопе.
    arm([104, 114], [80, 132], [72, 146], { hand: 'hold' }),
    arm([96, 114], [78, 110], [100, 140], { far: true, hand: 'hold' }),
    headP([100, 114], [-0.9, -0.4], [-1, 0], [0.2, -0.98]),
  ]);
}


/* 25. Дви Пада Випарита Дандасана — предплечья и обе стопы на полу. */
export function dviPadaViparitaDandasana() {
  const hip = [100, 110];
  const shoulder = [105, 142];
  return doc([
    // Обе стопы за головой, на полу.
    aLeg([98, 110], [80, 134], [64, 160], { far: true, foot: 'flat', toe: -1, underShorts: true }),
    aLeg([104, 110], [86, 136], [70, 162], { foot: 'flat', toe: -1, underShorts: true }),
    trunk(hip, shoulder, { hipW: 10, waistW: 9, chestW: 11, shoulderW: 12, arch: true }),
    shortsOn(hip, shoulder, [1, 0], [
      [[104, 110], [86, 136]],
      [[98, 110], [80, 134]],
    ]),
    // Предплечья на полу.
    arm([100, 140], [84, 154], [70, 160], { far: true, hand: 'flat', fingers: 1 }),
    arm([110, 140], [126, 154], [140, 160], { hand: 'flat', fingers: 1 }),
    headP([105, 142], [0.8, 0.6], [0.5, -0.86], [0.2, -0.98], { dist: 13 }),
  ]);
}

/* 26. Эка Пада Випарита Дандасана — одна стопа на полу, вторая вверх. */
export function ekaPadaViparitaDandasana() {
  const hip = [100, 110];
  const shoulder = [105, 142];
  return doc([
    aLeg([98, 110], [80, 134], [64, 160], { far: true, foot: 'flat', toe: -1, underShorts: true }),
    // Свободная нога вытянута вверх.
    aLeg([104, 110], [112, 80], [120, 50], { foot: 'free', toe: 1, underShorts: true }),
    trunk(hip, shoulder, { hipW: 10, waistW: 9, chestW: 11, shoulderW: 12, arch: true }),
    shortsOn(hip, shoulder, [1, 0], [
      [[104, 110], [112, 80]],
      [[98, 110], [80, 134]],
    ]),
    arm([100, 140], [84, 154], [70, 160], { far: true, hand: 'flat', fingers: 1 }),
    arm([110, 140], [126, 154], [140, 160], { hand: 'flat', fingers: 1 }),
    headP([105, 142], [0.8, 0.6], [0.5, -0.86], [0.2, -0.98], { dist: 13 }),
  ]);
}

/* 27. Випарита Шалабхасана — грудь и подбородок на полу, ноги вверх. */
export function viparitaSalabhasana() {
  const hip = [125, 152];
  const shoulder = [95, 152];
  return doc([
    aLeg([125, 152], [135, 122], [145, 92], { foot: 'free', toe: 1, underShorts: true }),
    aLeg([130, 152], [140, 120], [150, 90], { far: true, foot: 'free', toe: 1, underShorts: true }),
    trunk(hip, shoulder, { hipW: 11, waistW: 10, chestW: 12, shoulderW: 12 }),
    shortsOn(hip, shoulder, [0, -1], [
      [[125, 152], [135, 122]],
      [[130, 152], [140, 120]],
    ]),
    // Руки вытянуты под корпусом.
    arm([95, 150], [80, 156], [65, 160], { far: true, hand: 'flat', fingers: 1 }),
    arm([100, 150], [85, 156], [70, 160], { hand: 'flat', fingers: 1 }),
    headP([95, 152], [-1, -0.05], [1, 0], [-0.2, -0.98]),
  ]);
}

/* 28. Ганда Бхерундасана — стопы у головы, подбородок на полу. */
export function gandaBherundasana() {
  const hip = [112, 154];
  const shoulder = [90, 152];
  return doc([
    // Бедро вверх, голень складывается, стопа ложится рядом с головой.
    aLeg([112, 154], [85, 120], [85, 150], { foot: 'free', toe: 1, underShorts: true }),
    aLeg([116, 156], [92, 122], [92, 152], { far: true, foot: 'free', toe: 1, underShorts: true }),
    trunk(hip, shoulder, { hipW: 11, waistW: 10, chestW: 12, shoulderW: 12, arch: true }),
    shortsOn(hip, shoulder, [0, -1], [
      [[112, 154], [85, 120]],
      [[116, 156], [92, 122]],
    ]),
    arm([95, 150], [80, 156], [65, 160], { far: true, hand: 'flat', fingers: 1 }),
    arm([100, 150], [85, 156], [70, 160], { hand: 'flat', fingers: 1 }),
    headP([90, 152], [-1, -0.05], [1, 0], [-0.2, -0.98]),
  ]);
}

/* 29. Хануманасана — продольный шпагат, наклон к передней стопе. */
export function hanumanasana() {
  const hip = [100, 150];
  const shoulder = [80, 140];
  return doc([
    // Передняя нога вперёд, задняя назад; таз на полу.
    aLeg([100, 150], [72, 154], [44, 160], { foot: 'flex', toe: -1, underShorts: true }),
    aLeg([104, 150], [132, 154], [160, 158], { far: true, foot: 'tops', toe: 1, underShorts: true }),
    trunk(hip, shoulder, { hipW: 11, waistW: 10, chestW: 11, shoulderW: 12 }),
    shortsOn(hip, shoulder, [0, 1], [
      [[100, 150], [72, 154]],
      [[104, 150], [132, 154]],
    ]),
    // Наклон вперёд, кисти на передней стопе.
    arm([80, 140], [62, 146], [48, 156], { far: true, hand: 'wrap' }),
    arm([84, 142], [66, 150], [50, 158], { hand: 'wrap' }),
    headP([80, 140], [-0.9, 0.1], [0.4, 0.9], [0.8, -0.6]),
  ]);
}

/* 30. Супта Тривикрамасана — лёжа, нога за головой, вторая на полу. */
export function suptaTrivikramasana() {
  const hip = [125, 154];
  const shoulder = [80, 154];
  return doc([
    // Нога за головой.
    aLeg([125, 154], [102, 130], [78, 150], { foot: 'lotus', toe: -1, underShorts: true }),
    // Вторая нога вытянута на полу.
    aLeg([125, 154], [152, 158], [178, 160], { far: true, foot: 'flex', toe: 1, underShorts: true }),
    trunk(hip, shoulder, { hipW: 11, waistW: 10, chestW: 12, shoulderW: 12 }),
    shortsOn(hip, shoulder, [0, -1], [
      [[125, 154], [102, 130]],
      [[125, 154], [152, 158]],
    ]),
    // Обе кисти удерживают стопу за головой.
    arm([80, 154], [95, 138], [80, 148], { far: true, hand: 'wrap' }),
    arm([86, 154], [100, 140], [84, 150], { hand: 'wrap' }),
    headP([80, 154], [-1, 0], [0.4, 0.9], [0.2, -0.98]),
  ]);
}


/* 31. Дигасана A — стоя на одной ноге, вторая назад, руки вперёд. */
export function digasanaA() {
  const hip = [100, 106];
  const shoulder = [100, 72];
  return doc([
    aLeg(hip, [100, 138], [100, 168], { foot: 'flat', toe: 1, underShorts: true }),
    // Вторая нога вытянута далеко назад.
    aLeg(hip, [70, 112], [40, 118], { far: true, foot: 'free', toe: -1, underShorts: true }),
    trunk(hip, shoulder, { hipW: 10, waistW: 9, chestW: 11, shoulderW: 12 }),
    shortsOn(hip, shoulder, [1, 0], [
      [[100, 106], [100, 138]],
      [[100, 106], [70, 112]],
    ]),
    arm([100, 72], [124, 72], [148, 72], { hand: 'up' }),
    arm([100, 78], [124, 78], [148, 78], { far: true, hand: 'up' }),
    headP([100, 72], [0, -1], [1, 0.2], [0, -1]),
  ]);
}

/* 32. Дигасана B — то же, руки раскрыты в стороны. */
export function digasanaB() {
  const hip = [100, 106];
  const shoulder = [100, 72];
  return doc([
    aLeg(hip, [100, 138], [100, 168], { foot: 'flat', toe: 1, underShorts: true }),
    aLeg(hip, [70, 112], [40, 118], { far: true, foot: 'free', toe: -1, underShorts: true }),
    trunk(hip, shoulder, { hipW: 10, waistW: 9, chestW: 11, shoulderW: 12 }),
    shortsOn(hip, shoulder, [1, 0], [
      [[100, 106], [100, 138]],
      [[100, 106], [70, 112]],
    ]),
    arm([100, 72], [124, 72], [148, 72], { hand: 'up' }),
    arm([100, 74], [76, 74], [52, 74], { far: true, hand: 'up' }),
    headP([100, 72], [0, -1], [1, 0], [0, -1]),
  ]);
}

/* 33. Уттхита Тривикрамасана — высокий подъём ноги с захватом. */
export function utthitaTrivikramasana() {
  const hip = [100, 106];
  const shoulder = [100, 72];
  return doc([
    aLeg(hip, [100, 138], [100, 168], { foot: 'flat', toe: 1, underShorts: true }),
    // Поднятая нога: прямая, высоко вверх.
    aLeg(hip, [80, 80], [60, 54], { far: true, foot: 'free', toe: -1, underShorts: true }),
    trunk(hip, shoulder, { hipW: 10, waistW: 9, chestW: 11, shoulderW: 12 }),
    shortsOn(hip, shoulder, [1, 0], [
      [[100, 106], [100, 138]],
      [[100, 106], [80, 80]],
    ]),
    arm([100, 72], [80, 76], [62, 56], { hand: 'wrap' }),
    arm([104, 72], [84, 78], [66, 58], { far: true, hand: 'wrap' }),
    headP([100, 72], [0.1, -0.99], [60, 54], [0.2, -0.98]),
  ]);
}

/* 34. Натараджасана — стоя, прогиб с захватом поднятой ноги. */
export function nataRajasana() {
  const hip = [100, 106];
  const shoulder = [108, 78];
  return doc([
    aLeg(hip, [100, 138], [100, 168], { foot: 'flat', toe: 1, underShorts: true }),
    // Свободная нога открывается назад и вверх.
    aLeg(hip, [76, 96], [58, 76], { far: true, foot: 'free', toe: -1, underShorts: true }),
    trunk(hip, shoulder, { hipW: 10, waistW: 9, chestW: 11, shoulderW: 12 }),
    shortsOn(hip, shoulder, [1, 0], [
      [[100, 106], [76, 96]],
      [[100, 106], [100, 138]],
    ]),
    // Рука держит стопу сзади.
    arm([108, 78], [90, 74], [60, 78], { hand: 'wrap' }),
    // Вторая рука вытянута вперёд.
    arm([104, 80], [128, 78], [152, 76], { far: true, hand: 'up' }),
    headP([108, 78], [0.3, -0.95], [1, -0.2], [0.3, -0.95]),
  ]);
}

/* 35. Раджа Капотасана — стоя на коленях, стопы к голове. */
export function rajaKapotasana() {
  const hip = [100, 140];
  const shoulder = [110, 110];
  return doc([
    // Колени на полу, голени поднимаются к голове.
    aLeg(hip, [125, 160], [120, 128], { foot: 'free', toe: -1, underShorts: true }),
    aLeg([104, 142], [130, 160], [124, 130], { far: true, foot: 'free', toe: -1, underShorts: true }),
    trunk(hip, shoulder, { hipW: 10, waistW: 9, chestW: 11, shoulderW: 12, arch: true }),
    shortsOn(hip, shoulder, [1, 0], [
      [[100, 140], [125, 160]],
      [[104, 142], [130, 160]],
    ]),
    // Руки удерживают стопы у головы.
    arm([105, 112], [118, 100], [120, 128], { hand: 'wrap' }),
    arm([115, 112], [128, 102], [124, 130], { far: true, hand: 'wrap' }),
    headP([110, 110], [0.5, -0.86], [0.4, -0.92], [0.6, -0.8]),
  ]);
}

/* 36. Эка Пада Раджа Капотасана — голубь с прогибом и захватом стопы. */
export function ekaPadaRajaKapotasana() {
  const hip = [100, 145];
  const shoulder = [108, 112];
  return doc([
    // Передняя нога сложена на полу.
    aLeg(hip, [70, 150], [92, 158], { foot: 'flex', toe: -1, underShorts: true }),
    // Задняя нога согнута, стопа подведена к голове.
    aLeg([104, 145], [132, 158], [122, 126], { far: true, foot: 'free', toe: -1, underShorts: true }),
    trunk(hip, shoulder, { hipW: 10, waistW: 9, chestW: 11, shoulderW: 12, arch: true }),
    shortsOn(hip, shoulder, [1, 0], [
      [[100, 145], [70, 150]],
      [[104, 145], [132, 158]],
    ]),
    // Правая рука держит стопу, левая помогает через голову.
    arm([108, 112], [130, 120], [122, 128], { hand: 'wrap' }),
    arm([100, 112], [112, 96], [122, 124], { far: true, hand: 'wrap' }),
    headP([108, 112], [0.5, -0.86], [0.4, -0.92], [0.6, -0.8]),
  ]);
}


