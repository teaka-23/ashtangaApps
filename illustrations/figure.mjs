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

/** Стадион a→b: дуги наружу (sweep 0). Sweep 1 даёт «кость» с шипами. */
function capsule(a, b, r) {
  const d = sub(b, a);
  const l = len(d) || 1;
  const px = (-d[1] / l) * r;
  const py = (d[0] / l) * r;
  return `M ${pt(add(a, [px, py]))} L ${pt(add(b, [px, py]))} A ${r} ${r} 0 0 0 ${pt(add(b, [-px, -py]))} L ${pt(add(a, [-px, -py]))} A ${r} ${r} 0 0 0 ${pt(add(a, [px, py]))} Z`;
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

/** Выпуклая оболочка — запасной непрерывный силуэт. */
function convexHull(points) {
  const pts = points
    .filter((p) => Number.isFinite(p[0]) && Number.isFinite(p[1]))
    .map((p) => [p[0], p[1]])
    .sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  if (pts.length <= 2) return pts;
  const cross = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const lower = [];
  for (const p of pts) {
    while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], p) <= 0) lower.pop();
    lower.push(p);
  }
  const upper = [];
  for (let i = pts.length - 1; i >= 0; i--) {
    const p = pts[i];
    while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], p) <= 0) upper.pop();
    upper.push(p);
  }
  upper.pop();
  lower.pop();
  return lower.concat(upper);
}

/** Самопересечение замкнутого многоугольника → лоскуты при fill. */
function polygonSelfIntersects(pts) {
  const m = pts.length;
  if (m < 4) return false;
  const orient = (a, b, c) => (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]);
  const onSeg = (a, b, c) =>
    Math.min(a[0], b[0]) - 1e-6 <= c[0] &&
    c[0] <= Math.max(a[0], b[0]) + 1e-6 &&
    Math.min(a[1], b[1]) - 1e-6 <= c[1] &&
    c[1] <= Math.max(a[1], b[1]) + 1e-6;
  const hits = (a, b, c, d) => {
    const o1 = orient(a, b, c);
    const o2 = orient(a, b, d);
    const o3 = orient(c, d, a);
    const o4 = orient(c, d, b);
    if (o1 === 0 && onSeg(a, b, c)) return true;
    if (o2 === 0 && onSeg(a, b, d)) return true;
    if (o3 === 0 && onSeg(c, d, a)) return true;
    if (o4 === 0 && onSeg(c, d, b)) return true;
    return o1 * o2 < 0 && o3 * o4 < 0;
  };
  for (let i = 0; i < m; i++) {
    const a = pts[i];
    const b = pts[(i + 1) % m];
    for (let j = i + 1; j < m; j++) {
      if ((i + 1) % m === j || (j + 1) % m === i) continue;
      const c = pts[j];
      const d = pts[(j + 1) % m];
      if (a === c || a === d || b === c || b === d) continue;
      if (hits(a, b, c, d)) return true;
    }
  }
  return false;
}

/**
 * Звездообразный контур: max радиус по бинам — запасной, если трубки самопересеклись.
 * Сохраняет выемку паха лучше, чем convexHull.
 */
function radialEnvelope(points, center, bins = 56) {
  const best = new Array(bins).fill(null);
  for (const p of points) {
    if (!Number.isFinite(p[0]) || !Number.isFinite(p[1])) continue;
    const dx = p[0] - center[0];
    const dy = p[1] - center[1];
    const r = Math.hypot(dx, dy);
    if (r < 0.4) continue;
    let ang = Math.atan2(dy, dx);
    if (ang < 0) ang += Math.PI * 2;
    const i = Math.min(bins - 1, Math.floor((ang / (Math.PI * 2)) * bins));
    if (!best[i] || r > best[i].r) best[i] = { r, p: [p[0], p[1]] };
  }
  const filled = [];
  for (let i = 0; i < bins; i++) {
    if (best[i]) {
      filled.push(best[i].p);
      continue;
    }
    let lo = -1;
    let hi = -1;
    for (let k = 1; k < bins; k++) {
      if (best[(i - k + bins) % bins]) {
        lo = (i - k + bins) % bins;
        break;
      }
    }
    for (let k = 1; k < bins; k++) {
      if (best[(i + k) % bins]) {
        hi = (i + k) % bins;
        break;
      }
    }
    if (lo < 0 || hi < 0) continue;
    const a = best[lo];
    const b = best[hi];
    const span = (hi - lo + bins) % bins || 1;
    const t = ((i - lo + bins) % bins) / span;
    filled.push([a.p[0] + (b.p[0] - a.p[0]) * t, a.p[1] + (b.p[1] - a.p[1]) * t]);
  }
  if (filled.length < 3) return convexHull(points);
  const out = [];
  for (let i = 0; i < filled.length; i++) {
    const prev = filled[(i - 1 + filled.length) % filled.length];
    const cur = filled[i];
    const next = filled[(i + 1) % filled.length];
    const ax = cur[0] - prev[0];
    const ay = cur[1] - prev[1];
    const bx = next[0] - cur[0];
    const by = next[1] - cur[1];
    if (Math.abs(ax * by - ay * bx) < 0.4 && ax * bx + ay * by > 0 && out.length) continue;
    out.push(cur);
  }
  return out.length >= 3 ? out : convexHull(points);
}

/** Наружная нормаль бедра: от середины таза наружу. */
function thighOuter(hipPt, kneePt, mid) {
  const d = norm(sub(kneePt, hipPt));
  let s = [-d[1], d[0]];
  const toMid = sub(hipPt, mid);
  if (toMid[0] * s[0] + toMid[1] * s[1] < 0) s = mul(s, -1);
  return { d, s };
}

/**
 * Контур «трубки»: пояс через ОБА корня бёдер → штанина → пах → штанина → щека.
 * Пояс обязан перекрывать hipSep (иначе prasarita/trikona = две кляксы).
 */
function tubeShortsOutline(hip, u, f, thighs, opt) {
  const rise = opt.rise;
  const half = opt.half;
  const backW = half * (opt.backW ?? 0.95);
  const wTop = opt.wTop ?? 7.6;
  const wBot = opt.wBot ?? 6.4;
  const legLen = opt.legLen ?? 19;
  const crotch = opt.crotch ?? 6.2;
  const P = (uu, ff) => add(hip, add(mul(u, uu), mul(f, ff)));
  const mid = thighs[1]
    ? [(thighs[0][0][0] + thighs[1][0][0]) * 0.5, (thighs[0][0][1] + thighs[1][0][1]) * 0.5]
    : hip;

  const tube = (hipPt, kneePt) => {
    const { d, s } = thighOuter(hipPt, kneePt, mid);
    const L = clamp(Math.max(legLen, 15), 11, len(sub(kneePt, hipPt)) * 0.8);
    const along = (t) => add(hipPt, mul(d, t));
    const w = (t) => wTop * (1 - t) + wBot * t;
    return { d, s, L, along, w, hipPt };
  };

  const A = tube(thighs[0][0], thighs[0][1]);
  const pts = [];

  const waistAt = (hipPt, s, outward) =>
    add(hipPt, add(mul(u, rise), mul(s, outward * wTop * 0.95)));

  if (thighs[1]) {
    const B = tube(thighs[1][0], thighs[1][1]);
    // Пояс: наружный корень B → центр → наружный корень A (перекрывает шаг)
    pts.push(waistAt(B.hipPt, B.s, 1));
    pts.push(add(mid, mul(u, rise * 1.05)));
    pts.push(P(rise * 0.55, 0));
    pts.push(add(mid, mul(u, rise * 0.35)));
    pts.push(waistAt(A.hipPt, A.s, 1));

    // A: наружу → подол → внутрь
    pts.push(add(A.along(A.L * 0.35), mul(A.s, A.w(0.35))));
    pts.push(add(A.along(A.L * 0.75), mul(A.s, A.w(0.75))));
    pts.push(add(A.along(A.L + 0.5), mul(A.s, A.w(0.15))));
    pts.push(add(A.along(A.L + 0.9), [0, 0]));
    pts.push(add(A.along(A.L * 0.75), mul(A.s, -A.w(0.75) * 0.95)));
    pts.push(add(A.along(A.L * 0.28), mul(A.s, -A.w(0.28) * 0.85)));

    // Пах: высоко между корнями (не глубокая дыра)
    const crotchPt = add(mid, mul(u, -crotch * 0.55));
    pts.push(add(crotchPt, mul(A.s, -2)));
    pts.push(crotchPt);
    pts.push(add(crotchPt, mul(B.s, -2)));

    // B: внутрь → подол → наружу
    pts.push(add(B.along(B.L * 0.28), mul(B.s, -B.w(0.28) * 0.85)));
    pts.push(add(B.along(B.L * 0.75), mul(B.s, -B.w(0.75) * 0.95)));
    pts.push(add(B.along(B.L + 0.9), [0, 0]));
    pts.push(add(B.along(B.L + 0.5), mul(B.s, B.w(0.15))));
    pts.push(add(B.along(B.L * 0.75), mul(B.s, B.w(0.75))));
    pts.push(add(B.along(B.L * 0.35), mul(B.s, B.w(0.35))));

    // Щека сзади между корнями
    pts.push(add(B.hipPt, add(mul(u, -2.5), mul(B.s, wTop * 0.35))));
    pts.push(add(mid, mul(u, -5.8)));
    pts.push(add(A.hipPt, add(mul(u, -2.5), mul(A.s, wTop * 0.2))));
  } else {
    // Одна штанина / профиль
    pts.push(P(rise, -backW * 0.55));
    pts.push(P(rise, backW * 0.35));
    pts.push(waistAt(A.hipPt, A.s, 1));
    pts.push(add(A.along(A.L * 0.4), mul(A.s, A.w(0.4))));
    pts.push(add(A.along(A.L), mul(A.s, A.w(1))));
    pts.push(add(A.along(A.L + 0.85), [0, 0]));
    pts.push(add(A.along(A.L), mul(A.s, -A.w(1) * 0.9)));
    pts.push(add(A.along(3), mul(A.s, -A.w(0.1) * 0.7)));
    pts.push(P(-crotch * 0.65, -backW * 0.2));
    pts.push(P(-5.5, -backW * 1.05));
    pts.push(P(rise * 0.3, -backW * 0.95));
  }
  return pts;
}

/** Покрытие для radial/hull: пояс через весь hipSep + трубки бёдер. */
function shortsCoverPoints(hip, u, f, thighs, opt) {
  const rise = opt.rise;
  const half = opt.half;
  const backW = half * (opt.backW ?? 0.95);
  const wTop = opt.wTop ?? 7.6;
  const wBot = opt.wBot ?? 6.4;
  const legLen = opt.legLen ?? 19;
  const crotch = opt.crotch ?? 6.2;
  const P = (uu, ff) => add(hip, add(mul(u, uu), mul(f, ff)));
  const cover = [];
  const mid = thighs[1]
    ? [(thighs[0][0][0] + thighs[1][0][0]) * 0.5, (thighs[0][0][1] + thighs[1][0][1]) * 0.5]
    : hip;

  // Пояс-лента между корнями бёдер (не диск только вокруг hip)
  const roots = thighs[1] ? [thighs[0][0], thighs[1][0], mid, hip] : [hip, thighs[0][0]];
  for (const r of roots) {
    for (let a = 0; a < Math.PI * 2; a += 0.45) {
      cover.push(add(r, [Math.cos(a) * wTop * 0.85, Math.sin(a) * wTop * 0.65]));
    }
    cover.push(add(r, mul(u, rise)));
    cover.push(add(r, mul(u, rise * 0.4)));
    cover.push(add(r, mul(u, -crotch * 0.35)));
  }
  // Сплошной мост пояса
  if (thighs[1]) {
    const a = thighs[0][0];
    const b = thighs[1][0];
    for (let t = 0; t <= 1.001; t += 0.12) {
      const p = [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
      cover.push(add(p, mul(u, rise * 0.95)));
      cover.push(add(p, mul(u, rise * 0.35)));
      cover.push(add(p, mul(u, -1.5)));
      cover.push(add(p, mul(u, -crotch * 0.45)));
    }
  }
  cover.push(P(-2, -backW * 0.7));
  cover.push(P(-5.5, -backW * 1.05));
  cover.push(P(-crotch, 0));

  const addTube = (hipPt, kneePt) => {
    const { d, s } = thighOuter(hipPt, kneePt, mid);
    const L = clamp(Math.max(legLen, 15), 11, len(sub(kneePt, hipPt)) * 0.8);
    const along = (t) => add(hipPt, mul(d, t));
    for (let t = 0; t <= 1.001; t += 0.16) {
      const tt = Math.min(t, 1);
      const p = along(L * tt);
      const w = wTop * (1 - tt) + wBot * tt;
      cover.push(add(p, mul(s, w)));
      cover.push(add(p, mul(s, w * 0.45)));
      cover.push(add(p, mul(s, -w * 0.8)));
      cover.push(add(p, mul(s, -w * 0.3)));
    }
    cover.push(along(L + 0.75));
    cover.push(add(along(L + 0.2), mul(s, wBot * 0.65)));
    cover.push(add(along(L + 0.2), mul(s, -wBot * 0.65)));
  };
  addTube(thighs[0][0], thighs[0][1]);
  if (thighs[1]) addTube(thighs[1][0], thighs[1][1]);
  return cover;
}

/**
 * Узкий шаг → трубки (читаемые штанины).
 * Широкий/sym → hull усиленного покрытия (сплошной пояс через hipSep + подолы).
 * Radial только если hull выродился — иначе зубчатый пояс (topRuns>1).
 */
function shortsOutlineGarment(hip, u, f, thighs, opt) {
  const hipSep = thighs[1] ? len(sub(thighs[1][0], thighs[0][0])) : 0;
  const wide = hipSep > 16 || opt.forceEnvelope;
  if (!wide) {
    const tube = tubeShortsOutline(hip, u, f, thighs, opt);
    if (tube.length >= 5 && !polygonSelfIntersects(tube)) return { pts: tube, mode: 'tube' };
  }
  const cover = shortsCoverPoints(hip, u, f, thighs, opt);
  const hull = convexHull(cover);
  if (hull.length >= 3) return { pts: hull, mode: 'hull' };
  const center = [hip[0] - u[0] * 0.8, hip[1] - u[1] * 0.8];
  return { pts: radialEnvelope(cover, center, 64), mode: 'envelope' };
}

/** Одна лента: сужение к кисти и стопе, круглая шапочка, без кружка сустава.
 * bluntStart — торец у таза ужат к колену: иначе polySmooth раздувает персиковый
 * полудиск в щели торс↔бедро, и он торчит из-под шорт. */
function ribbon(pts, radii, { bluntStart = false } = {}) {
  const sides = pts.map((_, i) => limbSide(pts, i));
  let left = pts.map((p, i) => add(p, mul(sides[i], radii[i])));
  let right = pts.map((p, i) => add(p, mul(sides[i], -radii[i])));
  const startDir = norm(sub(pts[0], pts[1]));
  const endDir = norm(sub(pts[pts.length - 1], pts[pts.length - 2]));
  const end = pts.length - 1;
  let startCap = [add(pts[0], mul(startDir, radii[0] * 0.72))];
  if (bluntStart) {
    const toKnee = norm(sub(pts[1], pts[0]));
    // Сильно ужать торец: персиковый корень должен целиком прятаться под шортами.
    left = left.slice();
    right = right.slice();
    left[0] = add(left[0], mul(toKnee, radii[0] * 1.35));
    right[0] = add(right[0], mul(toKnee, radii[0] * 1.35));
    startCap = [];
  }
  return polySmooth(
    [
      ...left,
      add(pts[end], mul(endDir, radii[end] * 1.05)),
      ...right.reverse(),
      ...startCap,
    ],
    bluntStart ? 1.6 : 3.6,
  );
}

function limb(pts, radii, far, extra, { bluntStart = false } = {}) {
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
    `<path d="${ribbon(pts, radii, { bluntStart })}" fill="${fill}" stroke="${stroke}" stroke-width="1.15" stroke-linejoin="round"/>`,
    `<path d="${ribbon(shifted, radii.map((r) => r * 0.28), { bluntStart })}" fill="${hi}" opacity="0.22"/>`,
    extra || '',
  ].join('\n');
}

function leg(hip, knee, ankle, opt) {
  const { far = false, foot = 'flat', toe = 1, underShorts = false } = opt;
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
  return limb([hip, knee, ankle], radii, far, footSvg, { bluntStart: underShorts });
}

function thigh(hip, knee, opt = {}) {
  const { far = false, underShorts = false } = opt;
  const radii = far ? [6.2, 5.3] : [6.9, 5.9];
  return limb([hip, knee], radii, far, '', { bluntStart: underShorts });
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

function shorts(pts) {
  return `<g data-shorts="1"><path d="${polySmooth(pts, 1.05)}" fill="${SHORTS}"/></g>`;
}

/** Толщина бедра: стоя к груди (+f), сидя к голове (+u). */
function thighSide(d, u, f) {
  let s = [-d[1], d[0]];
  const alongSpine = Math.abs(d[0] * u[0] + d[1] * u[1]) > 0.65;
  const aim = alongSpine ? f : u;
  if (s[0] * aim[0] + s[1] * aim[1] < 0) s = mul(s, -1);
  return s;
}

/**
 * Один контур профиля: пояс → бедро → подол → щека/седалище → пояс.
 * Обход только по часовой, без зигзагов (иначе лоскуты от самопересечения).
 */
function profileShortsSilhouette(hip, u, f, thighs, opt) {
  const rise = opt.rise;
  const half = opt.half;
  const backW = half * (opt.backW ?? 0.9);
  const frontW = half * (opt.frontW ?? 0.7);
  const wTop = opt.wTop ?? 7.3;
  const wBot = opt.wBot ?? 6.4;
  const legLen = opt.legLen ?? 18;
  const onSeat = hip[1] > GROUND - 28;
  const P = (uu, ff) => add(hip, add(mul(u, uu), mul(f, ff)));

  const [nHip, nKnee] = thighs[0];
  const dN = norm(sub(nKnee, nHip));
  const sN = thighSide(dN, u, f);
  const LN = clamp(legLen, 8, len(sub(nKnee, nHip)) * 0.58);
  const aN = (t) => add(nHip, mul(dN, t));
  const farHip = thighs[1] ? thighs[1][0] : nHip;

  // Две штанины только при явном разведении; узкий hipSep у сидячих
  // параллельных ног (danda) не должен включать spread.
  let spread = false;
  if (thighs.length >= 2) {
    const dF = norm(sub(thighs[1][1], thighs[1][0]));
    const ang = Math.acos(clamp(dN[0] * dF[0] + dN[1] * dF[1], -1, 1));
    const hipSep = len(sub(thighs[1][0], nHip));
    spread = ang > 0.4 || (ang > 0.2 && hipSep > 14);
  }

  // На сидячих острый tip подола читается как лоскут — плоский обрез.
  const hemTip = onSeat ? 0.35 : 1.2;
  // Щека в сторону −front по X (не всегда −x). Если front почти вертикален — в −x.
  let backFlat = [-f[0], 0];
  if (Math.abs(backFlat[0]) < 0.25) backFlat = f[0] >= 0 ? [-1, 0] : [1, 0];
  else backFlat = norm(backFlat);
  const sitY = onSeat ? Math.min(GROUND - 4, Math.max(nHip[1], farHip[1]) + 4) : 0;
  const seatX = onSeat ? hip[0] + backFlat[0] * backW * 0.85 : 0;
  // Пояс сзади не дальше щеки — иначе «ухо» на стыке пояс↔щека.
  const waistBack = onSeat
    ? [seatX - backFlat[0] * 3, hip[1] - rise]
    : P(rise, -backW * 0.92);

  const pts = [
    waistBack,
    P(rise, frontW * (onSeat ? 1.0 : 0.88)),
    add(aN(onSeat ? 2.5 : 1), mul(sN, wTop * (onSeat ? 1.05 : 0.8))),
    add(aN(LN * 0.5), mul(sN, (wTop + wBot) * 0.48)),
    add(aN(LN), mul(sN, wBot * (onSeat ? 0.78 : 0.92))),
    add(aN(LN + hemTip), mul(sN, 0)),
    add(aN(LN), mul(sN, -wBot * (onSeat ? 0.78 : 0.92))),
    add(aN(LN * 0.35), mul(sN, -wTop * 0.95)),
  ];

  if (spread) {
    const [fHip, fKnee] = thighs[1];
    const dF = norm(sub(fKnee, fHip));
    const sF = thighSide(dF, u, f);
    const LF = clamp(opt.farLegLen ?? legLen - 1, 8, len(sub(fKnee, fHip)) * 0.7);
    const aF = (t) => add(fHip, mul(dF, t));
    // Широкий мост паха на уровне таза — без разрыва на два клина
    pts.push(add(aN(3), mul(sN, -wTop * 0.5)));
    pts.push(P(-2.5, -backW * 0.1));
    pts.push(P(-5.8, 0));
    pts.push(P(-2.5, backW * 0.1));
    pts.push(add(aF(3), mul(sF, -wTop * 0.5)));
    pts.push(add(aF(LF * 0.4), mul(sF, -wTop * 0.85)));
    pts.push(add(aF(LF), mul(sF, -wBot * 0.85)));
    pts.push(add(aF(LF + 0.45), mul(sF, 0)));
    pts.push(add(aF(LF), mul(sF, wBot * 0.85)));
    pts.push(add(aF(LF * 0.45), mul(sF, wTop * 0.8)));
    pts.push(add(fHip, add(mul(dF, -2), mul(f, -backW * 0.35))));
  } else {
    pts.push(add(aN(1.2), add(mul(sN, -wTop * 0.98), mul(f, -backW * 0.35))));
    if (thighs[1]) {
      // Параллельные бёдра: расширить щеку до дальнего корня
      pts.push(add(thighs[1][0], mul(f, -backW * 0.55)));
    }
  }

  if (onSeat && !spread) {
    pts.push([nHip[0] * 0.4 + seatX * 0.6, sitY]);
    pts.push([seatX, hip[1] * 0.45 + sitY * 0.55]);
    pts.push([seatX - backFlat[0] * 3, hip[1]]);
  } else {
    pts.push(P(-5.0, -backW * 0.55));
    pts.push(P(-6.8, -backW * 1.02));
    pts.push(P(-3.5, -backW * 1.12));
    pts.push(P(rise * 0.35, -backW * 1.0));
  }
  return { pts, onSeat };
}

/**
 * Шорты: один силуэт (профиль thighs / along / sym).
 * underShorts на ногах убирает персиковый торец; таз рисуют шорты.
 */
function shortsFrame(hip, up, front, opt = {}) {
  const [u, f] = garmentAxes(up, front);
  const rise = clamp(opt.rise ?? 9, opt.thighs ? 5 : 6, opt.along ? 11 : 16);
  const hem = clamp(opt.hem ?? 9, 6, opt.along ? 14 : 11);
  const half = clamp(opt.half ?? 8, 6.5, opt.thighs ? (opt.sym ? 13 : 12) : (opt.sym ? 10 : 10.5));
  const P = (uu, ff) => add(hip, add(mul(u, uu), mul(f, ff)));

  if (opt.thighs?.length) {
    const tag = opt.inline ? 'inline' : '1';
    const legLen = opt.legLen ?? 19;
    const wTop = opt.wTop ?? (opt.sym ? 7.4 : 7.5);
    const wBot = opt.wBot ?? (opt.sym ? 6.4 : 6.6);
    const crotch = opt.crotch ?? (opt.sym ? 7.2 : 6.5);
    const onSeat = hip[1] > GROUND - 28;

    // Сидячие параллельные ноги: упорядоченный L-контур (danda/paschi).
    if (onSeat && !opt.sym) {
      const { pts, onSeat: seat } = profileShortsSilhouette(hip, u, f, opt.thighs, {
        rise,
        half,
        backW: opt.backW,
        frontW: opt.frontW,
        wTop,
        wBot,
        legLen,
        farLegLen: opt.farLegLen,
      });
      // Без spread — L; со spread/самопересечением — трубки ниже.
      const dN = norm(sub(opt.thighs[0][1], opt.thighs[0][0]));
      let spread = false;
      if (opt.thighs[1]) {
        const dF = norm(sub(opt.thighs[1][1], opt.thighs[1][0]));
        const ang = Math.acos(clamp(dN[0] * dF[0] + dN[1] * dF[1], -1, 1));
        const hipSep = len(sub(opt.thighs[1][0], opt.thighs[0][0]));
        spread = ang > 0.4 || (ang > 0.2 && hipSep > 14);
      }
      if (!spread && !polygonSelfIntersects(pts)) {
        return `<g data-shorts="${tag}"><path d="${polySmooth(pts, seat ? 2.2 : 1.15)}" fill="${SHORTS}" fill-rule="nonzero"/></g>`;
      }
    }

    // Трубки по бёдрам (пах+подолы). Широкий шаг/sym → envelope с мостом пояса.
    const { pts: shape, mode } = shortsOutlineGarment(hip, u, f, opt.thighs, {
      rise,
      half,
      backW: opt.backW,
      frontW: opt.frontW,
      wTop,
      wBot,
      legLen,
      crotch,
      forceEnvelope: !!opt.sym || !!opt.forceEnvelope,
    });
    if (shape.length < 3) {
      return `<g data-shorts="${tag}"><path d="${polySmooth([P(rise, -half * 0.6), P(rise, half * 0.6), P(-crotch, half * 0.35), P(-crotch, -half * 0.35)], 1.2)}" fill="${SHORTS}"/></g>`;
    }
    // hull почти без скругления: polySmooth>1 вдавливает пояс и даёт topRuns>1.
    const d =
      mode === 'hull'
        ? `${shape.map((p, i) => `${i ? 'L' : 'M'} ${pt(p)}`).join(' ')} Z`
        : polySmooth(shape, mode === 'tube' ? 1.5 : 1.7);
    return `<g data-shorts="${tag}"><path d="${d}" fill="${SHORTS}" fill-rule="nonzero"/></g>`;
  }

  let pts;
  if (opt.along) {
    // Складка: одна трубка пояс → подол; щека шире сзади (−side).
    const a = norm(opt.along);
    let side = [-a[1], a[0]];
    if (side[0] * f[0] + side[1] * f[1] < 0) side = mul(side, -1);
    const wFront = 7.0;
    const wBack = 10.2;
    const top = -rise * 0.9;
    const Q = (t, s) => add(hip, add(mul(a, t), mul(side, s)));
    pts = [
      Q(top, -wBack * 0.92),
      Q(top, wFront * 0.88),
      Q(hem * 0.4, wFront * 1.02),
      Q(hem * 1.05, wFront * 0.85),
      Q(hem * 1.75, wFront * 0.15),
      Q(hem * 2.05, 0),
      Q(hem * 1.05, -wBack * 0.78),
      Q(hem * 0.3, -wBack * 1.08),
      Q(top + 1.0, -wBack * 1.02),
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

/** Шорты поверх бёдер. inline остаётся в своём слое (под ближней рукой). */
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
