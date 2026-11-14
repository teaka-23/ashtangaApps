/**
 * Мультяшный манекен по плакату: профиль, чёрные шорты, кожа.
 * Направление задаётся точками сустава, а не «догадкой» рендера.
 * y вниз. Лицо в +x: грудь справа, ягодицы слева, носки вправо.
 * Пол — одна линия GROUND; подошва и ладонь лежат на ней.
 */

export const GROUND = 168;

const SKIN = '#f3c7a4';
const SKIN_FAR = '#d7a888';
const SKIN_LIT = '#fbe3cf';
const SKIN_LIT_FAR = '#f3d4bc';
const LINE = '#c19670';
const LINE_FAR = '#c9aa90';
const SHORTS = '#3e3942';

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
function footPath(ankle, toe, mode, knee, far = false) {
  const s = toe >= 0 ? 1 : -1;
  const ax = ankle[0];
  const sole = GROUND;
  const k = far ? 0.92 : 1;
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
    // сидя: пятка на полу, носки вверх, большой палец отдельно — видно, какая стопа впереди
    const heel = ax - s * 5 * k;
    const ball = ax + s * 4 * k;
    const tip = ax + s * 2.2 * k;
    const top = ankle[1] - 16 * k;
    return [
      `M ${heel},${sole}`,
      `L ${ball},${sole}`,
      `Q ${ball + s * 2 * k},${sole - 1} ${ball},${sole - 6 * k}`,
      `L ${tip + s * 1.4 * k},${top + 6 * k}`,
      `Q ${tip + s * 2.4 * k},${top} ${tip},${top + 1.5 * k}`,
      `L ${tip - s * 2.2 * k},${top + 3 * k}`,
      `L ${ax - s * 1.5 * k},${sole - 7 * k}`,
      `Q ${heel - s * 2 * k},${sole - 1} ${heel},${sole} Z`,
    ].join(' ');
  }
  if (mode === 'free' || mode === 'lotus') {
    // стопа вдоль голени с округлой пяткой и мягким носком (без шипа-клинa).
    let dir = [s, 0];
    if (knee) {
      const d = sub(ankle, knee);
      if (len(d) > 4) dir = norm(d);
    }
    const side = [-dir[1], dir[0]];
    const isLotus = mode === 'lotus';
    const reach = isLotus ? (far ? 6.4 : 7.6) : far ? 7.5 : 9.2;
    const w = isLotus ? (far ? 3.9 : 4.5) : far ? 4.4 : 5.0;
    const heel = add(ankle, mul(dir, -1.6));
    const mid = add(ankle, mul(dir, reach * 0.5));
    const tip = add(ankle, mul(dir, reach));
    const hA = add(heel, mul(side, w * 0.56));
    const hB = add(heel, mul(side, -w * 0.62));
    const hCap = add(heel, mul(dir, -2.1));
    const mA = add(mid, mul(side, w * 0.62));
    const mB = add(mid, mul(side, -w * 0.52));
    const tA = add(tip, mul(side, w * 0.34));
    const tB = add(tip, mul(side, -w * 0.28));
    const tCap = add(tip, mul(dir, 1.5));
    return [
      `M ${pt(hA)}`,
      `Q ${pt(hCap)} ${pt(hB)}`,
      `L ${pt(mB)}`,
      `L ${pt(tB)}`,
      `Q ${pt(tCap)} ${pt(tA)}`,
      `L ${pt(mA)}`,
      `Z`,
    ].join(' ');
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
  if (mode === 'spread') {
    // одна стопа в воздухе: круглая пятка снизу, носок одним блоком вверх.
    const ay = ankle[1];
    return [
      `M ${ax - 7},${ay + 2}`,
      `Q ${ax - 10},${ay + 10} ${ax},${ay + 11}`,
      `Q ${ax + 10},${ay + 10} ${ax + 8},${ay + 2}`,
      `L ${ax + 6},${ay - 8}`,
      `Q ${ax + 5},${ay - 18} ${ax + 1},${ay - 19}`,
      `Q ${ax - 4},${ay - 18} ${ax - 5},${ay - 8}`,
      `L ${ax - 6},${ay + 1}`,
      `Q ${ax - 9},${ay + 1} ${ax - 7},${ay + 2} Z`,
    ].join(' ');
  }
  // flat: круглая пятка, подъём, подушечка и отдельный большой палец. Носок смотрит в toe.
  const heel = ax - s * 8 * k;
  const ball = ax + s * 8 * k;
  const toeX = ax + s * 17 * k;
  const instep = Math.min(ankle[1] + 2, sole - 6 * k);
  return [
    `M ${heel},${sole - 6 * k}`,
    `Q ${heel - s * 3.2 * k},${sole - 1.2} ${heel + s * 2 * k},${sole}`,
    `L ${ball},${sole}`,
    `Q ${ball + s * 3 * k},${sole + 0.4} ${toeX - s * 3 * k},${sole}`,
    `Q ${toeX + s * 1.6 * k},${sole - 0.2} ${toeX},${sole - 3.4 * k}`,
    `Q ${toeX - s * 1.2 * k},${sole - 4.6 * k} ${toeX - s * 4.2 * k},${sole - 3.2 * k}`,
    `L ${ax + s * 4 * k},${instep}`,
    `Q ${ax - s * 1 * k},${ankle[1] - 1} ${heel + s * 3 * k},${ankle[1] + 1}`,
    `Q ${heel - s * 0.4 * k},${sole - 3 * k} ${heel},${sole - 6 * k} Z`,
  ].join(' ');
}

/** Перпендикуляр, который смотрит вперёд (+x) или вверх: большой палец не прячется в торс. */
function outerSide(dir) {
  const side = [-dir[1], dir[0]];
  const flip = mul(side, -1);
  const score = (v) => v[0] * 1.4 - v[1] * 0.35;
  return score(side) >= score(flip) ? side : flip;
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
  if (kind === 'palm') {
    // ладонь лежит на полу: пальцы вдоль пола, большой палец в сторону. Низкий силуэт.
    const s = fingers >= 0 ? 1 : -1;
    const y = GROUND;
    const x = wrist[0];
    return [
      `M ${x},${Math.min(wrist[1] + 1, y - 7)}`,
      `L ${x - s * 1},${y - 3}`,
      `Q ${x - s * 6},${y - 5} ${x - s * 5},${y}`,
      `Q ${x - s * 2},${y + 0.4} ${x + s * 2},${y}`,
      `L ${x + s * 14},${y}`,
      `Q ${x + s * 17},${y - 0.6} ${x + s * 14},${y - 3}`,
      `L ${x + s * 3},${y - 3.2}`,
      `L ${x},${Math.min(wrist[1] + 1, y - 7)} Z`,
    ].join(' ');
  }
  if (kind === 'prayer') {
    // Сложенные ладони (намасте): узкий силуэт вдоль предплечья без крюка.
    const side = outerSide(dir);
    const tip = add(wrist, mul(dir, 9.5));
    const mid = add(wrist, mul(dir, 4.5));
    return [
      `M ${pt(add(wrist, mul(side, -2.5)))}`,
      `L ${pt(add(mid, mul(side, -2.8)))}`,
      `L ${pt(tip)}`,
      `L ${pt(add(mid, mul(side, 2.8)))}`,
      `L ${pt(add(wrist, mul(side, 2.5)))}`,
      `Z`,
    ].join(' ');
  }
  if (kind === 'hold') {
    // Захват: контур проходит через крюк, не через управляющую точку.
    const side = outerSide(dir);
    const knuckle = add(wrist, add(mul(dir, 7.2), mul(side, 3.6)));
    const curl = add(wrist, add(mul(dir, 4.2), mul(side, 6.4)));
    const palm = add(wrist, add(mul(dir, 5.5), mul(side, -2.8)));
    return [
      `M ${pt(add(wrist, mul(side, 2.2)))}`,
      `L ${pt(knuckle)}`,
      `L ${pt(curl)}`,
      `L ${pt(add(wrist, add(mul(dir, 2.4), mul(side, 3.4))))}`,
      `L ${pt(palm)}`,
      `L ${pt(add(wrist, mul(side, -2.4)))}`,
      `Z`,
    ].join(' ');
  }
  // hang | reach | up — ладонь, большой палец углом, пальцы одним блоком
  const side = outerSide(dir);
  const reach = kind === 'up' ? 11 : 9.5;
  const tip = add(wrist, mul(dir, reach));
  const palmW = 3.6;
  const fingerW = 2.3;
  const thumbBase = add(wrist, add(mul(dir, 2.4), mul(side, palmW * 0.2)));
  const thumbTip = add(wrist, add(mul(dir, 4.6), mul(side, palmW + 3.4)));
  const thumbBack = add(wrist, add(mul(dir, 6.6), mul(side, palmW * 0.85)));
  return [
    `M ${pt(add(wrist, mul(side, -palmW * 0.8)))}`,
    `L ${pt(add(tip, mul(side, -fingerW)))}`,
    `L ${pt(add(tip, mul(dir, 2.1)))}`,
    `L ${pt(add(tip, mul(side, fingerW)))}`,
    `L ${pt(thumbBack)}`,
    `L ${pt(thumbTip)}`,
    `L ${pt(thumbBase)}`,
    `Z`,
  ].join(' ');
}

function limbSide(pts, i) {
  const cur = pts[i];
  const a = i === 0 ? sub(pts[1], pts[0]) : sub(cur, pts[i - 1]);
  const b = i === pts.length - 1 ? a : sub(pts[i + 1], cur);
  const na = [-norm(a)[1], norm(a)[0]];
  const nb = [-norm(b)[1], norm(b)[0]];
  let side = add(na, nb);
  side = len(side) < 0.25 ? na : norm(side);
  return side;
}

/** Длинные рёбра прямые, углы мягкие. Сплайн не выносит контур за кость. */
function polySmooth(points, round = 4.2) {
  const nPts = points.length;
  const cuts = points.map((p, i) => {
    const prev = points[(i + nPts - 1) % nPts];
    const next = points[(i + 1) % nPts];
    const dp = sub(prev, p);
    const dn = sub(next, p);
    const k = Math.min(len(dp) * 0.45, len(dn) * 0.45, round);
    return [
      len(dp) < 0.01 ? p : add(p, mul(norm(dp), k)),
      len(dn) < 0.01 ? p : add(p, mul(norm(dn), k)),
    ];
  });
  let d = `M ${pt(cuts[0][1])}`;
  for (let i = 1; i <= nPts; i++) {
    const idx = i % nPts;
    d += ` L ${pt(cuts[idx][0])} Q ${pt(points[idx])} ${pt(cuts[idx][1])}`;
  }
  return `${d} Z`;
}

/** Одна лента: сужение к кисти и стопе, круглая шапочка, без кружка сустава. */
function ribbon(pts, radii) {
  const sides = pts.map((_, i) => limbSide(pts, i));
  const left = pts.map((p, i) => add(p, mul(sides[i], radii[i])));
  const right = pts.map((p, i) => add(p, mul(sides[i], -radii[i])));
  const startDir = norm(sub(pts[0], pts[1]));
  const endDir = norm(sub(pts[pts.length - 1], pts[pts.length - 2]));
  const end = pts.length - 1;
  return polySmooth(
    [
      ...left,
      add(pts[end], mul(endDir, radii[end] * 1.05)),
      ...right.reverse(),
      add(pts[0], mul(startDir, radii[0] * 0.72)),
    ],
    3.6,
  );
}

function limb(pts, radii, far, extra) {
  const stroke = far ? LINE_FAR : LINE;
  const fill = far ? SKIN_FAR : SKIN;
  const hi = far ? SKIN_LIT_FAR : SKIN_LIT;
  const light = [-0.18, -0.98];
  const shifted = pts.map((p, i) => {
    const side = limbSide(pts, i);
    const toward = side[0] * light[0] + side[1] * light[1] >= 0 ? side : mul(side, -1);
    return add(p, mul(toward, radii[i] * 0.2));
  });
  return [
    `<path d="${ribbon(pts, radii)}" fill="${fill}" stroke="${stroke}" stroke-width="1.15" stroke-linejoin="round"/>`,
    `<path d="${ribbon(shifted, radii.map((r) => r * 0.28))}" fill="${hi}" opacity="0.22"/>`,
    extra || '',
  ].join('\n');
}

function leg(hip, knee, ankle, opt) {
  const { far = false, foot = 'flat', toe = 1 } = opt;
  const radii = far ? [6.2, 5.3, 4.2] : [6.9, 5.9, 4.6];
  let sole = '';
  if (foot === 'free' && knee) {
    const d = sub(ankle, knee);
    if (len(d) > 4) {
      const dir = norm(d);
      const side = [-dir[1], dir[0]];
      const reach = far ? 7.5 : 9.2;
      const w = far ? 4.4 : 5.0;
      const heel = add(ankle, add(mul(dir, -1.4), mul(side, -w * 0.52)));
      const ball = add(ankle, add(mul(dir, reach * 0.68), mul(side, -w * 0.26)));
      sole = `<path d="M ${pt(heel)} L ${pt(ball)}" fill="none" stroke="${far ? LINE_FAR : LINE}" stroke-width="1.15" stroke-linecap="round"/>`;
    }
  }
  const footSvg = `<path d="${footPath(ankle, toe, foot, knee, far)}" ${skin(far)} stroke-width="1.2" stroke-linejoin="round"/>${sole}`;
  return limb([hip, knee, ankle], radii, far, footSvg);
}

function thigh(hip, knee, opt = {}) {
  const { far = false } = opt;
  const radii = far ? [6.2, 5.3] : [6.9, 5.9];
  return limb([hip, knee], radii, far);
}

function shin(knee, ankle, opt = {}) {
  const { far = false, foot = 'lotus', toe = 1 } = opt;
  const radii = far ? [5.3, 4.2] : [5.9, 4.6];
  const footSvg = `<path d="${footPath(ankle, toe, foot, knee, far)}" ${skin(far)} stroke-width="1.2" stroke-linejoin="round"/>`;
  return limb([knee, ankle], radii, far, footSvg);
}

function arm(shoulder, elbow, wrist, opt) {
  const { far = false, hand = 'hang', fingers = 1 } = opt;
  const radii = far ? [4.0, 3.3, 2.8] : [4.4, 3.6, 3.0];
  const handSvg = `<path d="${handPath(wrist, elbow, hand, fingers)}" ${skin(far)} stroke-width="1.15" stroke-linejoin="round"/>`;
  return limb([shoulder, elbow, wrist], radii, far, handSvg);
}

/** Ось «плечи — таз» по самим точкам. */
function trunkAxis(pts) {
  const c = [0, 0];
  for (const p of pts) {
    c[0] += p[0];
    c[1] += p[1];
  }
  c[0] /= pts.length;
  c[1] /= pts.length;
  let xx = 0;
  let xy = 0;
  let yy = 0;
  for (const p of pts) {
    const dx = p[0] - c[0];
    const dy = p[1] - c[1];
    xx += dx * dx;
    xy += dx * dy;
    yy += dy * dy;
  }
  const disc = Math.sqrt(Math.max(0, (xx - yy) ** 2 + 4 * xy * xy));
  const l1 = (xx + yy + disc) / 2;
  const axis = norm(Math.abs(xy) < 1e-4 ? (xx >= yy ? [1, 0] : [0, 1]) : [xy, l1 - xx]);
  return { c, axis, side: [-axis[1], axis[0]] };
}

/**
 * Плечи и таз остаются, середина уходит в талию.
 * Если талия уже нарисована точками, почти не трогаем.
 */
function shapeTorso(pts) {
  const { c, axis, side } = trunkAxis(pts);
  const proj = pts.map((p) => {
    const d = sub(p, c);
    return [d[0] * axis[0] + d[1] * axis[1], d[0] * side[0] + d[1] * side[1]];
  });
  let tMin = Infinity;
  let tMax = -Infinity;
  for (const [t] of proj) {
    tMin = Math.min(tMin, t);
    tMax = Math.max(tMax, t);
  }
  const span = tMax - tMin;
  if (span < 10) return pts;
  const bins = [0, 0, 0, 0, 0];
  for (const [t, s] of proj) {
    const b = Math.min(4, Math.floor(((t - tMin) / span) * 5));
    bins[b] = Math.max(bins[b], Math.abs(s));
  }
  const endW = Math.max(bins[0], bins[4], 1);
  const midW = Math.max(bins[1], bins[2], bins[3]);
  const sack = midW / endW;
  const pinchAmt = sack > 0.96 ? 0.38 : sack > 0.9 ? 0.26 : sack > 0.82 ? 0.14 : 0;
  return pts.map((p, i) => {
    const t = (proj[i][0] - tMin) / span;
    const along = Math.exp(-((t - 0.56) ** 2) / 0.05);
    const lateral = proj[i][1] * (1 - pinchAmt * along);
    return add(c, add(mul(axis, proj[i][0]), mul(side, lateral)));
  });
}

function torso(pts) {
  // Один силуэт: плечи, талия, таз. Без второго контура внутри.
  const shaped = shapeTorso(pts);
  return `<path d="${polySmooth(shaped, 4.6)}" fill="${SKIN}" stroke="${LINE}" stroke-width="1.15" stroke-linejoin="round"/>`;
}

function clamp(v, lo, hi) {
  return Math.min(hi, Math.max(lo, v));
}

/** Пояс к голове, живот в сторону front. Щека сзади, даже если векторы почти параллельны. */
function garmentAxes(up, front) {
  const u = norm(up);
  const raw = norm(front);
  const dot = u[0] * raw[0] + u[1] * raw[1];
  let f = [raw[0] - u[0] * dot, raw[1] - u[1] * dot];
  if (len(f) < 0.28) {
    const perp = [-u[1], u[0]];
    const sign = perp[0] * raw[0] + perp[1] * raw[1] >= 0 ? 1 : -1;
    f = mul(perp, sign);
  } else f = norm(f);
  return [u, f];
}

function shortsSleeve(hipLeg, kneeLeg, maxLen, wTop, wBot, fill) {
  const delta = sub(kneeLeg, hipLeg);
  const dLen = len(delta);
  if (dLen < 4) return { body: '', hem: '' };
  const d = mul(delta, 1 / dLen);
  const s = [-d[1], d[0]];
  const L = clamp(maxLen, 8, dLen * 0.58);
  const root = add(hipLeg, mul(d, -2.6));
  const end = add(hipLeg, mul(d, L));
  const hemMid = add(end, mul(d, 1.3));
  const a0 = add(root, mul(s, wTop));
  const b0 = add(root, mul(s, -wTop));
  const a1 = add(end, mul(s, wBot));
  const b1 = add(end, mul(s, -wBot));
  const dPath = [
    `M ${pt(a0)}`,
    `L ${pt(a1)}`,
    `Q ${pt(hemMid)} ${pt(b1)}`,
    `L ${pt(b0)}`,
    `Z`,
  ].join(' ');
  const hem = `<path d="M ${pt(a1)} Q ${pt(hemMid)} ${pt(b1)}" fill="none" stroke="#2a262e" stroke-width="0.9" stroke-linecap="round" opacity="0.5"/>`;
  return {
    body: `<path d="${dPath}" fill="${fill}"/>`,
    hem,
  };
}

function shorts(pts) {
  const waist = `M ${pt(pts[0])} L ${pt(pts[1])}`;
  const hemLine = pts.length > 5 ? `M ${pt(pts[3])} Q ${pt(pts[4])} ${pt(pts[5])}` : '';
  const hem = hemLine
    ? `<path d="${hemLine}" fill="none" stroke="#2a262e" stroke-width="0.85" stroke-linecap="round" opacity="0.45"/>`
    : '';
  return `<g data-shorts="1"><path d="${polySmooth(pts, 1.05)}" fill="${SHORTS}"/><path d="${waist}" fill="none" stroke="#d4ced6" stroke-width="1.45" stroke-linecap="round"/>${hem}</g>`;
}

/**
 * Шорты: пояс на тазу, ягодица и штанины по бёдрам.
 * thighs — массив пар [hipLeg, kneeLeg] (ближняя, затем опционально дальняя).
 * inline — остаётся в своём z-слое (под руками/голенями спереди).
 */
function shortsFrame(hip, up, front, opt = {}) {
  const [u, f] = garmentAxes(up, front);
  const rise = clamp(opt.rise ?? 9, opt.thighs ? 5 : 6, opt.along ? 11 : 12);
  const hem = clamp(opt.hem ?? 9, 6, opt.along ? 14 : 11);
  const half = clamp(opt.half ?? 8, 6.5, opt.thighs ? (opt.sym ? 13 : 11) : (opt.sym ? 10 : 10.5));
  const P = (uu, ff) => add(hip, add(mul(u, uu), mul(f, ff)));

  if (opt.thighs?.length) {
    const tag = opt.inline ? 'inline' : '1';
    const legLen = opt.legLen ?? 19;
    const farLegLen = opt.farLegLen ?? legLen - 2;
    const wTop = opt.wTop ?? (opt.sym ? 7.4 : 7.5);
    const wBot = opt.wBot ?? (opt.sym ? 6.4 : 6.6);
    const parts = [];
    const hems = [];
    if (opt.thighs.length >= 2) {
      const farS = shortsSleeve(opt.thighs[1][0], opt.thighs[1][1], farLegLen, wTop - 0.6, wBot - 0.6, opt.sym ? SHORTS : '#312d35');
      if (farS.body) { parts.push(farS.body); hems.push(farS.hem); }
    }
    let pelvisPts;
    let waistPath;
    if (opt.sym) {
      const crotch = opt.crotch ?? 5.5;
      const wL = P(rise, -half * 0.84);
      const wR = P(rise, half * 0.84);
      pelvisPts = [
        wL,
        wR,
        P(rise * 0.08, half * 0.95),
        P(-crotch, half * 0.35),
        P(-crotch * 0.72, 0),
        P(-crotch, -half * 0.35),
        P(rise * 0.08, -half * 0.95),
      ];
      waistPath = `M ${pt(wL)} L ${pt(wR)}`;
    } else {
      const backW = half * (opt.backW ?? 0.78);
      const frontW = half * (opt.frontW ?? 0.72);
      const wBack = P(rise, -backW);
      const wFront = P(rise, frontW);
      pelvisPts = [
        wBack,
        wFront,
        P(rise * 0.1, frontW * 1.04),
        P(-4.6, frontW * 0.65),
        P(-6.0, -backW * 0.15),
        P(-4.8, -backW * 1.15),
        P(rise * 0.25, -backW * 1.2),
      ];
      waistPath = `M ${pt(wBack)} L ${pt(wFront)}`;
    }
    parts.push(`<path d="${polySmooth(pelvisPts, 1.3)}" fill="${SHORTS}"/>`);
    parts.push(`<path d="${waistPath}" fill="none" stroke="#d4ced6" stroke-width="1.45" stroke-linecap="round"/>`);
    const nearS = shortsSleeve(opt.thighs[0][0], opt.thighs[0][1], legLen, wTop, wBot, SHORTS);
    if (nearS.body) { parts.push(nearS.body); hems.push(nearS.hem); }
    parts.push(...hems);
    return `<g data-shorts="${tag}">${parts.join('')}</g>`;
  }

  let pts;
  if (opt.along) {
    // Трубка по бедру: старт выше таза, щека — ширина задней кромки, без пятна.
    const a = norm(opt.along);
    const side = [-a[1], a[0]];
    const w = 7;
    const top = -rise * 0.45;
    const Q = (t, s) => add(hip, add(mul(a, t), mul(side, s)));
    pts = [
      Q(top, -w),
      Q(top, w),
      Q(hem * 0.55, w),
      Q(hem * 1.35, w * 0.72),
      Q(hem * 2.05, 0),
      Q(hem * 1.35, -w * 0.72),
      Q(hem * 0.45, -w),
      Q(top + 0.6, -w),
    ];
  } else if (opt.sym) {
    // Спереди: пояс и две штанины, пах выше подола.
    pts = [
      P(rise, -half * 0.78),
      P(rise, half * 0.78),
      P(rise * 0.08, half),
      P(-hem, half * 0.62),
      P(-hem * 0.22, 0),
      P(-hem, -half * 0.62),
      P(rise * 0.08, -half),
    ];
  } else {
    // Профиль: пояс короче щеки, подол у бедра, одна ягодица сзади.
    pts = [
      P(rise, -half * 0.28),
      P(rise, half * 0.58),
      P(rise * 0.12, half * 0.64),
      P(-hem * 0.12, half * 0.32),
      P(-hem * 0.78, half * 0.04),
      P(-hem * 0.42, -half * 0.38),
      P(-hem * 0.02, -half),
      P(rise * 0.42, -half * 0.62),
    ];
  }
  return shorts(pts);
}

/** Пунктир дришти из центра головы. Овал закрывает начало, снаружи остаётся луч. */
function gazeLine(c, g) {
  const tip = add(c, mul(norm(g), 22));
  return `<line x1="${n(c)[0]}" y1="${n(c)[1]}" x2="${n(tip)[0]}" y2="${n(tip)[1]}" stroke="#2481cc" stroke-width="1.15" stroke-dasharray="2.6 2.1" stroke-linecap="round" opacity="0.85"/>`;
}

function head(c, gaze, crown, neckAt, r = 11.2) {
  const g = norm(gaze);
  const cr = norm(crown);
  const neckTop = add(c, mul(cr, -r * 0.78));
  return [
    gazeLine(c, g),
    `<path d="${capsule(neckAt, neckTop, 3.6)}" fill="${SKIN}" stroke="${LINE}" stroke-width="1.15"/>`,
    `<ellipse cx="${n(c)[0]}" cy="${n(c)[1]}" rx="${r * 0.9}" ry="${r}" fill="${SKIN}" stroke="${LINE}" stroke-width="1.35"/>`,
  ].join('\n');
}

/** Лицо на зрителя: гладкий овал, направление взгляда — пунктир. */
function headFront(c, neckAt, nose = [0, 1], r = 11.2) {
  const g = norm(nose);
  const neckTop = [c[0], c[1] + (neckAt[1] >= c[1] ? r * 0.72 : -r * 0.72)];
  return [
    gazeLine(c, g),
    `<path d="${capsule(neckAt, neckTop, 3.6)}" fill="${SKIN}" stroke="${LINE}" stroke-width="1.15"/>`,
    `<ellipse cx="${n(c)[0]}" cy="${n(c)[1]}" rx="${r * 0.94}" ry="${r}" fill="${SKIN}" stroke="${LINE}" stroke-width="1.35"/>`,
  ].join('\n');
}

function shadow(cx, rx = 36) {
  return `<ellipse cx="${cx}" cy="${GROUND + 3.5}" rx="${rx}" ry="3.2" fill="rgba(62,42,28,0.08)"/>`;
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
    if (line.includes('data-shorts="1"')) shorts.push(line);
    else rest.push(line);
  }
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
${[...rest, ...shorts].join('\n')}
</svg>
`;
}

function attr(tag, name) {
  const m = tag.match(new RegExp(`${name}="([^"]+)"`));
  return m ? parseFloat(m[1]) : NaN;
}

/** Точки path. Дуги: радиусы пропускаем, берём конец дуги. */
function walkPath(d, plot) {
  const tokens = d.match(/[MLHVCSQTAZ]|-?\d*\.?\d+(?:e[-+]?\d+)?/gi);
  if (!tokens) return;
  let i = 0;
  let cmd = 'M';
  let cx = 0;
  let cy = 0;
  const num = () => parseFloat(tokens[i++]);
  while (i < tokens.length) {
    if (/[A-Za-z]/.test(tokens[i])) cmd = tokens[i++];
    const upper = cmd.toUpperCase();
    const rel = cmd !== upper;
    if (upper === 'Z') continue;
    if (upper === 'H') {
      const x = num();
      cx = rel ? cx + x : x;
      plot(cx, cy);
      continue;
    }
    if (upper === 'V') {
      const y = num();
      cy = rel ? cy + y : y;
      plot(cx, cy);
      continue;
    }
    if (upper === 'A') {
      num();
      num();
      num();
      num();
      num();
      const x = num();
      const y = num();
      cx = rel ? cx + x : x;
      cy = rel ? cy + y : y;
      plot(cx, cy);
      continue;
    }
    const pairs = { M: 1, L: 1, T: 1, Q: 2, S: 2, C: 3 }[upper] || 1;
    if (i + pairs * 2 > tokens.length) break;
    let x = 0;
    let y = 0;
    for (let k = 0; k < pairs; k++) {
      x = num();
      y = num();
      plot(rel ? cx + x : x, rel ? cy + y : y);
    }
    if (rel) {
      cx += x;
      cy += y;
    } else {
      cx = x;
      cy = y;
    }
  }
}

/**
 * Обрезает пустое поле вокруг фигуры. Пол и тень в расчёт не входят,
 * иначе широкая линия пола не даёт приблизить складку.
 * Сурьи не кадрировать: в схеме виньяс масштаб и пол должны совпадать.
 */
export function frameToContent(svg, pad = 18) {
  const tags = svg.match(/<(?:path|circle|ellipse|line)\b[^>]*>/g) || [];
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  const plot = (x, y) => {
    if (!Number.isFinite(x) || !Number.isFinite(y)) return;
    minX = Math.min(minX, x);
    minY = Math.min(minY, y);
    maxX = Math.max(maxX, x);
    maxY = Math.max(maxY, y);
  };
  for (const tag of tags) {
    if (tag.includes('rgba') || tag.includes('#e4d3c0')) continue;
    if (tag.startsWith('<circle')) {
      const cx = attr(tag, 'cx');
      const cy = attr(tag, 'cy');
      const r = attr(tag, 'r');
      plot(cx - r, cy - r);
      plot(cx + r, cy + r);
    } else if (tag.startsWith('<ellipse')) {
      const cx = attr(tag, 'cx');
      const cy = attr(tag, 'cy');
      plot(cx - attr(tag, 'rx'), cy - attr(tag, 'ry'));
      plot(cx + attr(tag, 'rx'), cy + attr(tag, 'ry'));
    } else if (tag.startsWith('<path')) {
      const d = tag.match(/\bd="([^"]+)"/)?.[1];
      if (d) walkPath(d, plot);
    }
  }
  if (!Number.isFinite(minX)) return svg;
  minX -= pad;
  minY -= pad;
  maxX += pad;
  maxY += pad;
  const vb = `${n([minX])[0]} ${n([minY])[0]} ${n([maxX - minX])[0]} ${n([maxY - minY])[0]}`;
  return svg
    .replace(/viewBox="[^"]+"/, `viewBox="${vb}"`)
    .replace(
      /<line x1="[\d.-]+" y1="([\d.-]+)" x2="[\d.-]+" y2="([\d.-]+)"/,
      `<line x1="${n([minX + 8])[0]}" y1="$1" x2="${n([maxX - 8])[0]}" y2="$2"`,
    );
}

export const draw = {
  leg,
  thigh,
  shin,
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
