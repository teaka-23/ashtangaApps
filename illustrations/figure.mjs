/**
 * Мультяшный манекен по плакату: профиль, чёрные шорты, кожа.
 * Направление задаётся точками сустава, а не «догадкой» рендера.
 * y вниз. Лицо в +x: грудь справа, ягодицы слева, носки вправо.
 * Пол — одна линия GROUND; подошва и ладонь лежат на ней.
 */

export const GROUND = 168;

const SKIN = '#f2c29b';
const SKIN_FAR = '#e4b48f';
const LINE = '#b98a5e';
const LINE_FAR = '#c4a184';
const SHORTS = '#2e2a33';

const add = (a, b) => [a[0] + b[0], a[1] + b[1]];
const mul = (a, s) => [a[0] * s, a[1] * s];
const sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
const len = (a) => Math.hypot(a[0], a[1]);
const norm = (a) => {
  const l = len(a) || 1;
  return [a[0] / l, a[1] / l];
};
const n = (v) => v.map((x) => Math.round(x * 10) / 10);
const pt = (p) => `${n(p)[0]},${n(p)[1]}`;

function capsule(a, b, r) {
  const d = sub(b, a);
  const l = len(d) || 1;
  const px = (-d[1] / l) * r;
  const py = (d[0] / l) * r;
  return `M ${pt(add(a, [px, py]))} L ${pt(add(b, [px, py]))} A ${r} ${r} 0 0 1 ${pt(add(b, [-px, -py]))} L ${pt(add(a, [-px, -py]))} A ${r} ${r} 0 0 1 ${pt(add(a, [px, py]))} Z`;
}

/** Сумма единичных «к концам» смотрит в сгиб. Противоположность — наколенник / олекранон. */
function pointOuter(a, b, c) {
  const u = norm(sub(a, b));
  const v = norm(sub(c, b));
  const bis = add(u, v);
  if (len(bis) < 0.35) return [0, 0];
  return mul(norm(bis), -1);
}

function smoothClosed(pts) {
  const m = pts.length;
  let d = `M ${pt(pts[0])}`;
  for (let i = 0; i < m; i++) {
    const p0 = pts[(i - 1 + m) % m];
    const p1 = pts[i];
    const p2 = pts[(i + 1) % m];
    const p3 = pts[(i + 2) % m];
    const c1 = add(p1, mul(sub(p2, p0), 1 / 6));
    const c2 = sub(p2, mul(sub(p3, p1), 1 / 6));
    d += ` C ${pt(c1)} ${pt(c2)} ${pt(p2)}`;
  }
  return `${d} Z`;
}

function skin(far) {
  return far
    ? `fill="${SKIN_FAR}" stroke="${LINE_FAR}"`
    : `fill="${SKIN}" stroke="${LINE}"`;
}

/** Стопа. toe +1 — носки вправо. mode: flat | tucked | tops | flex | free | freeFlex.
 *  free смотрит вдоль голени (колено → лодыжка), не по горизонтали. */
function footPath(ankle, toe, mode, knee) {
  const ax = ankle[0];
  const sole = GROUND;
  const s = toe >= 0 ? 1 : -1;
  if (mode === 'tucked') {
    // подушечка на полу, пятка вверх к голени, пальцы подогнуты вперёд
    const ball = ax + s * 2;
    return [
      `M ${n([ball - s * 5, sole - 11])[0]},${n([ball, sole - 11])[1]}`,
      `Q ${ball - s * 2},${sole - 14} ${ball + s * 1},${sole - 8}`,
      `L ${ball + s * 4},${sole - 1}`,
      `Q ${ball + s * 7},${sole} ${ball + s * 3},${sole}`,
      `L ${ball - s * 4},${sole}`,
      `Q ${ball - s * 7},${sole - 2} ${ball - s * 6},${sole - 8} Z`,
    ].join(' ');
  }
  if (mode === 'tops') {
    // тыл стопы на полу, пальцы назад (от головы)
    const toeX = ax + s * 14;
    const heel = ax - s * 2;
    return [
      `M ${heel},${sole - 5}`,
      `Q ${heel - s * 2},${sole} ${heel + s * 2},${sole}`,
      `L ${toeX},${sole}`,
      `Q ${toeX + s * 4},${sole - 1} ${toeX + s * 2},${sole - 5}`,
      `L ${ax + s * 1},${ankle[1] + 1}`,
      `Q ${heel},${ankle[1]} ${heel},${sole - 5} Z`,
    ].join(' ');
  }
  if (mode === 'flex') {
    // сидя: пятка на полу, носки вверх
    return [
      `M ${ax - 4},${sole}`,
      `L ${ax + 5},${sole}`,
      `Q ${ax + 7},${sole - 2} ${ax + 5},${sole - 8}`,
      `L ${ax + 3},${ankle[1] - 12}`,
      `Q ${ax + 2},${ankle[1] - 16} ${ax - 1},${ankle[1] - 14}`,
      `L ${ax - 2},${sole - 6}`,
      `Q ${ax - 6},${sole - 1} ${ax - 4},${sole} Z`,
    ].join(' ');
  }
  if (mode === 'free') {
    // носок вытянут вдоль голени, от колена через лодыжку
    let dir = [s, 0];
    if (knee) {
      const d = sub(ankle, knee);
      if (len(d) > 4) dir = norm(d);
    }
    const side = [-dir[1], dir[0]];
    const heel = add(ankle, mul(dir, -1.5));
    const tip = add(ankle, mul(dir, 15));
    const w = 4.6;
    return `M ${pt(add(heel, mul(side, w)))} L ${pt(add(tip, mul(side, w * 0.42)))} Q ${pt(add(tip, mul(dir, 3)))} ${pt(add(tip, mul(side, -w * 0.42)))} L ${pt(add(heel, mul(side, -w * 0.85)))} Z`;
  }
  if (mode === 'freeFlex') {
    // нога в воздухе: пятка от себя в сторону toe, носки вверх (стопа вертикально)
    const ay = ankle[1];
    return [
      `M ${ax - 4},${ay + 5}`,
      `L ${ax + 5},${ay + 5}`,
      `Q ${ax + 7},${ay + 3} ${ax + 5},${ay - 2}`,
      `L ${ax + 3},${ay - 12}`,
      `Q ${ax + 2},${ay - 16} ${ax - 1},${ay - 14}`,
      `L ${ax - 2},${ay - 4}`,
      `Q ${ax - 6},${ay + 1} ${ax - 4},${ay + 5} Z`,
    ].join(' ');
  }
  // flat: пятка сзади, носки вперёд, подошва на линии пола
  const heel = ax - s * 6;
  const toeX = ax + s * 16;
  return [
    `M ${heel},${sole - 6}`,
    `Q ${heel - s * 3},${sole - 1} ${heel + s * 1},${sole}`,
    `L ${toeX - s * 2},${sole}`,
    `Q ${toeX + s * 3},${sole} ${toeX + s * 1},${sole - 4}`,
    `L ${ax + s * 4},${ankle[1] + 2}`,
    `Q ${ax},${ankle[1] - 1} ${heel + s * 2},${ankle[1] + 1}`,
    `Q ${heel},${sole - 3} ${heel},${sole - 6} Z`,
  ].join(' ');
}

/** Ладонь. hang/reach — кисть в продолжении предплечья. flat — на полу, пальцы в fingers. */
function handPath(wrist, from, kind, fingers = 1) {
  const dir = norm(sub(wrist, from));
  if (kind === 'flat') {
    // короткая ладонь с большим пальцем — не путать со стопой
    const s = fingers >= 0 ? 1 : -1;
    const sole = GROUND;
    const hx = wrist[0];
    const thumb = hx - s * 4;
    return [
      `M ${hx - s * 1},${sole - 7}`,
      `L ${thumb},${sole - 3}`,
      `Q ${thumb - s * 1},${sole} ${hx - s * 1},${sole}`,
      `L ${hx + s * 10},${sole}`,
      `Q ${hx + s * 13},${sole - 0.5} ${hx + s * 10},${sole - 3.5}`,
      `L ${hx + s * 1},${Math.min(wrist[1] + 1, sole - 6)} Z`,
    ].join(' ');
  }
  if (kind === 'hold') {
    // захват большого пальца ноги: кисть смотрит вниз, пальцы загнуты
    const tip = add(wrist, mul(dir, 9));
    const side = [-dir[1], dir[0]];
    return `M ${pt(add(wrist, mul(side, 4)))} Q ${pt(add(tip, mul(side, 5)))} ${pt(add(tip, mul(dir, 2)))} Q ${pt(add(tip, mul(side, -4)))} ${pt(add(wrist, mul(side, -3.5)))} Z`;
  }
  // hang | reach | up — варежка по оси предплечья, короче стопы
  const tip = add(wrist, mul(dir, kind === 'up' ? 10 : 9));
  const side = [-dir[1], dir[0]];
  const w = 3.6;
  const thumb = add(wrist, add(mul(dir, 3.2), mul(side, w + 2.2)));
  return `M ${pt(add(wrist, mul(side, w)))} Q ${pt(thumb)} ${pt(add(tip, mul(side, w * 0.55)))} Q ${pt(add(tip, mul(dir, 2.2)))} ${pt(add(tip, mul(side, -w * 0.55)))} L ${pt(add(wrist, mul(side, -w)))} Z`;
}

function limb(pts, widths, far, extra) {
  const stroke = far ? LINE_FAR : LINE;
  const fill = far ? SKIN_FAR : SKIN;
  const chunks = [];
  for (let i = 0; i < pts.length - 1; i++) {
    chunks.push(
      `<path d="${capsule(pts[i], pts[i + 1], widths[i])}" fill="${fill}" stroke="${stroke}" stroke-width="1.6" stroke-linejoin="round"/>`,
    );
  }
  if (pts.length === 3) {
    const outer = pointOuter(pts[0], pts[1], pts[2]);
    const c = add(pts[1], mul(outer, len(outer) ? 3.4 : 0));
    const jr = (widths[0] + widths[1]) * 0.42;
    chunks.push(
      `<circle cx="${n(c)[0]}" cy="${n(c)[1]}" r="${n([jr])[0]}" fill="${fill}" stroke="${stroke}" stroke-width="1.6"/>`,
    );
  }
  if (extra) chunks.push(extra);
  return chunks.join('\n');
}

function leg(hip, knee, ankle, opt) {
  const { far = false, foot = 'flat', toe = 1 } = opt;
  const w = far ? [7.2, 5.8] : [8.1, 6.5];
  const footSvg = `<path d="${footPath(ankle, toe, foot, knee)}" ${skin(far)} stroke-width="1.5" stroke-linejoin="round"/>`;
  return limb([hip, knee, ankle], w, far, footSvg);
}

function arm(shoulder, elbow, wrist, opt) {
  const { far = false, hand = 'hang', fingers = 1 } = opt;
  const w = far ? [4.6, 3.9] : [5.3, 4.5];
  const handSvg = `<path d="${handPath(wrist, elbow, hand, fingers)}" ${skin(far)} stroke-width="1.4" stroke-linejoin="round"/>`;
  return limb([shoulder, elbow, wrist], w, far, handSvg);
}

function torso(pts) {
  return `<path d="${smoothClosed(pts)}" fill="${SKIN}" stroke="${LINE}" stroke-width="1.7" stroke-linejoin="round"/>`;
}

function shorts(pts) {
  return `<g data-shorts="1"><path d="${smoothClosed(pts)}" fill="${SHORTS}"/></g>`;
}

/**
 * Шорты в осях таза.
 * up — от таза к голове вдоль позвоночника.
 * front — от спины к животу.
 * Ягодицы на −front.
 */
function shortsFrame(hip, up, front, opt = {}) {
  const u = norm(up);
  const f = norm(front);
  const rise = opt.rise ?? 14;
  const hem = opt.hem ?? 19;
  const half = opt.half ?? 12.5;
  const cheek = opt.cheek ?? 16;
  const P = (uu, ff) => add(hip, add(mul(u, uu), mul(f, ff)));
  // пояс поперёк таза, подол по бедру, щека сзади. Закрывает низ живота и корни ног.
  return shorts([
    P(rise, -half * 0.4),
    P(rise + 1.2, half * 0.25),
    P(rise * 0.55, half * 1.05),
    P(-3, half * 1.2),
    P(-hem * 0.7, half * 0.5),
    P(-hem * 0.88, half * 0.02),
    P(-hem * 0.5, -half * 0.12),
    P(0, -cheek * 0.95),
    P(rise * 0.55, -cheek * 0.5),
  ]);
}

function head(c, gaze, crown, neckAt, r = 11.2) {
  const g = norm(gaze);
  const cr = norm(crown);
  const neckTop = add(c, mul(cr, -r * 0.78));
  const side = [-g[1], g[0]];
  const noseTip = add(c, mul(g, r + 1.6));
  const noseBase = add(c, mul(g, r * 0.9));
  const ear = add(c, add(mul(g, -r * 0.25), mul(side, r * 0.15)));
  return [
    `<path d="${capsule(neckAt, neckTop, 4.2)}" fill="${SKIN}" stroke="${LINE}" stroke-width="1.4"/>`,
    `<ellipse cx="${n(c)[0]}" cy="${n(c)[1]}" rx="${r * 0.92}" ry="${r}" fill="${SKIN}" stroke="${LINE}" stroke-width="1.7"/>`,
    `<ellipse cx="${n(ear)[0]}" cy="${n(ear)[1]}" rx="2.3" ry="3.2" fill="${SKIN}" stroke="${LINE}" stroke-width="1.1"/>`,
    `<path d="M ${pt(add(noseBase, mul(side, 1.15)))} L ${pt(noseTip)} L ${pt(add(noseBase, mul(side, -1.35)))} Z" fill="${SKIN}" stroke="${LINE}" stroke-width="1.1" stroke-linejoin="round"/>`,
  ].join('\n');
}

/** Лицо на зрителя: уши по бокам, нос короткий по nose (не боковой клюв). */
function headFront(c, neckAt, nose = [0, 1], r = 11.2) {
  const g = norm(nose);
  const neckTop = [c[0], c[1] + (neckAt[1] >= c[1] ? r * 0.72 : -r * 0.72)];
  const noseTip = add(c, mul(g, r * 0.72));
  const noseBase = add(c, mul(g, r * 0.22));
  const side = [-g[1], g[0]];
  const earL = add(c, [-r * 0.92, 1]);
  const earR = add(c, [r * 0.92, 1]);
  return [
    `<path d="${capsule(neckAt, neckTop, 4.2)}" fill="${SKIN}" stroke="${LINE}" stroke-width="1.4"/>`,
    `<ellipse cx="${n(c)[0]}" cy="${n(c)[1]}" rx="${r * 0.96}" ry="${r}" fill="${SKIN}" stroke="${LINE}" stroke-width="1.7"/>`,
    `<ellipse cx="${n(earL)[0]}" cy="${n(earL)[1]}" rx="2.1" ry="3.1" fill="${SKIN}" stroke="${LINE}" stroke-width="1.1"/>`,
    `<ellipse cx="${n(earR)[0]}" cy="${n(earR)[1]}" rx="2.1" ry="3.1" fill="${SKIN}" stroke="${LINE}" stroke-width="1.1"/>`,
    `<path d="M ${pt(add(noseBase, mul(side, 1.3)))} L ${pt(noseTip)} L ${pt(add(noseBase, mul(side, -1.3)))} Z" fill="${SKIN}" stroke="${LINE}" stroke-width="1.05" stroke-linejoin="round"/>`,
  ].join('\n');
}

function shadow(cx, rx = 36) {
  return `<ellipse cx="${cx}" cy="${GROUND + 4}" rx="${rx}" ry="4.2" fill="rgba(70,48,28,0.10)"/>`;
}

function groundLine() {
  return `<line x1="18" y1="${GROUND}" x2="186" y2="${GROUND}" stroke="#e4d3c0" stroke-width="1.2"/>`;
}

/** Шорты поверх бёдер: закрывают таз, даже если рука проходит рядом. */
export function svgDocument(body) {
  const chunks = body.split('\n');
  const shorts = [];
  const rest = [];
  for (const line of chunks) {
    if (line.includes('data-shorts')) shorts.push(line);
    else rest.push(line);
  }
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
${[...rest, ...shorts].join('\n')}
</svg>
`;
}

export const draw = {
  leg,
  arm,
  torso,
  shorts,
  shortsFrame,
  head,
  headFront,
  shadow,
  groundLine,
  smoothClosed,
};
