/**
 * Смысловой аудит поз: проверяет анатомию до перевода в силуэт.
 *
 * `audit.mjs` видит только готовый SVG — клип, базлайн, габарит, вырожденные
 * подпути. Он не знает, что кисть в захвате должна стоять на стопе, а плечо —
 * расти из торса. Здесь мы перехватываем `draw.leg/arm/torso/head` до импорта
 * pose-модулей и проверяем координаты суставов в системе 200×200.
 *
 * Запуск: `node illustrations/audit-poses.mjs`
 * Код возврата 1, если есть ошибки (ERR); предупреждения (WARN) не валят прогон.
 */

import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { draw, GROUND } from './figure.mjs';

const root = dirname(fileURLToPath(import.meta.url));

const MODULES = [
  ['poses-surya.mjs', 'surya'],
  ['poses-standing.mjs', 'standing'],
  ['poses-seated1.mjs', 'seated1'],
  ['poses-seated2.mjs', 'seated2'],
  ['poses-finishing.mjs', 'finishing'],
  ['poses-intermediate.mjs', 'intermediate'],
];

/** Перехватываем только вызовы, несущие координаты суставов. */
const TRACKED = ['leg', 'thigh', 'shin', 'arm', 'torso', 'head', 'headFront'];

/**
 * Пороги. Сняты с текущего корпуса (108 поз, замер 2026-11-19), а не выдуманы:
 * - голова ↔ торс: медиана 14, максимум 30 (шея-капсула);
 * - плечо ↔ торс: медиана 7, максимум 20;
 * - таз (бедро) ↔ контур торса: медиана 3.7, p90 8, максимум 17.9;
 * - диагональ торса: минимум 30.5, точек контура минимум 6;
 * - `toe`: запястье ↔ стопа 0–1 (палец ноги сжат), берём запас 12;
 * - `flat`/`palm`: запястье на 6–12 px выше пола (ладонь рисуется по y=GROUND).
 * NOTE-эвристики (не валят прогон): центр головы внутри полигона торса и рука,
 * натянутая от таза до стопы (плечо < 10 px к тазу, запястье < 10 px к стопе,
 * рука прямая) — так выглядят складки, где плечо случайно совпало с тазом.
 * Пропорции и асимметрия считаются от медиан корпуса на каждом прогоне.
 */
const LIMITS = {
  headGap: 34,
  shoulderGap: 26,
  hipGap: 24,
  torsoSpan: 26,
  torsoPts: 6,
  toeGrip: 12,
  palmDy: [-18, -3],
  longSeg: 1.9,
  shortSeg: 0.5,
  asym: 0.45,
};

const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);
const nearest = (p, pts) => Math.min(...pts.map((q) => dist(p, q)));
const r1 = (v) => Math.round(v * 10) / 10;

/** Расстояние до контура: таз обычно лежит на ребре полигона, а не в вершине. */
function polyDist(p, pts) {
  let m = Infinity;
  for (let i = 0; i < pts.length; i++) {
    const [a, b] = [pts[i], pts[(i + 1) % pts.length]];
    const vx = b[0] - a[0];
    const vy = b[1] - a[1];
    const len2 = vx * vx + vy * vy;
    const t = len2 ? Math.max(0, Math.min(1, ((p[0] - a[0]) * vx + (p[1] - a[1]) * vy) / len2)) : 0;
    m = Math.min(m, Math.hypot(p[0] - (a[0] + vx * t), p[1] - (a[1] + vy * t)));
  }
  return m;
}

/** Точка внутри контура торса: голова, утонувшая в груди, не читается силуэтом. */
function inPoly(p, pts) {
  let inside = false;
  for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
    const [xi, yi] = pts[i];
    const [xj, yj] = pts[j];
    if (yi > p[1] !== yj > p[1] && p[0] < ((xj - xi) * (p[1] - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

/** Перехват: pose-модули деструктурируют `draw` на импорте, поэтому патчим до него. */
let sink = null;
for (const name of TRACKED) {
  const orig = draw[name];
  draw[name] = (...args) => {
    if (sink) sink.push({ kind: name, args });
    return orig(...args);
  };
}

const poses = [];
for (const [mod, dirName] of MODULES) {
  const { FILES } = await import(pathToFileURL(join(root, mod)).href);
  for (const [name, fn] of FILES) {
    const calls = [];
    sink = calls;
    fn();
    sink = null;
    poses.push({ rel: `${dirName}/${name}`, calls });
  }
}

/** Длины сегментов одной позы: плечо/предплечье/бедро/голень. */
function segsOf(calls) {
  const out = { upper: [], fore: [], thigh: [], shin: [] };
  for (const c of calls) {
    if (c.kind === 'arm') {
      out.upper.push(dist(c.args[0], c.args[1]));
      out.fore.push(dist(c.args[1], c.args[2]));
    } else if (c.kind === 'leg') {
      out.thigh.push(dist(c.args[0], c.args[1]));
      out.shin.push(dist(c.args[1], c.args[2]));
    } else if (c.kind === 'thigh') {
      out.thigh.push(dist(c.args[0], c.args[1]));
    } else if (c.kind === 'shin') {
      out.shin.push(dist(c.args[0], c.args[1]));
    }
  }
  return out;
}

const median = (xs) => {
  if (!xs.length) return 0;
  const s = [...xs].sort((a, b) => a - b);
  return s[Math.floor(s.length / 2)];
};

const corpus = { upper: [], fore: [], thigh: [], shin: [] };
for (const p of poses) {
  const s = segsOf(p.calls);
  for (const k of Object.keys(corpus)) corpus[k].push(...s[k]);
}
const MED = Object.fromEntries(Object.entries(corpus).map(([k, v]) => [k, median(v)]));

const SEG_LABEL = { upper: 'плечо', fore: 'предплечье', thigh: 'бедро', shin: 'голень' };

/** Угол в суставе: >2.2 рад — конечность почти прямая, хорда ≈ реальной длине. */
const angleAt = (a, b, c) => {
  const u = [a[0] - b[0], a[1] - b[1]];
  const v = [c[0] - b[0], c[1] - b[1]];
  const lu = Math.hypot(u[0], u[1]);
  const lv = Math.hypot(v[0], v[1]);
  if (!lu || !lv) return 0;
  const cos = (u[0] * v[0] + u[1] * v[1]) / (lu * lv);
  return Math.acos(Math.min(1, Math.max(-1, cos)));
};

/** Суммарные длины конечностей: у согнутой хорда короче реальной, сумма — нет. */
function totalsOf(calls) {
  const arms = calls.filter((c) => c.kind === 'arm');
  const legs = calls.filter((c) => c.kind === 'leg');
  const thighs = calls.filter((c) => c.kind === 'thigh');
  const shins = calls.filter((c) => c.kind === 'shin');
  return {
    arm: arms.map((a) => dist(a.args[0], a.args[1]) + dist(a.args[1], a.args[2])),
    leg: [
      ...legs.map((l) => dist(l.args[0], l.args[1]) + dist(l.args[1], l.args[2])),
      ...thighs.map(
        (t, i) => dist(t.args[0], t.args[1]) + (shins[i] ? dist(shins[i].args[0], shins[i].args[1]) : 0),
      ),
    ],
  };
}

const totals = { arm: [], leg: [] };
for (const p of poses) {
  const t = totalsOf(p.calls);
  totals.arm.push(...t.arm);
  totals.leg.push(...t.leg);
}
const MED_TOTAL = { arm: median(totals.arm), leg: median(totals.leg) };

const rows = [];
for (const p of poses) {
  const c = p.calls;
  const arms = c.filter((x) => x.kind === 'arm');
  const legs = c.filter((x) => x.kind === 'leg');
  const thighs = c.filter((x) => x.kind === 'thigh');
  const shins = c.filter((x) => x.kind === 'shin');
  const heads = c.filter((x) => x.kind === 'head' || x.kind === 'headFront');
  const torsos = c.filter((x) => x.kind === 'torso');
  const flags = [];

  // 1. Состав фигуры: две руки, две ноги (целиком или парой thigh+shin), голова.
  if (arms.length !== 2) flags.push(['ERR', 'рук не 2', arms.length]);
  if (heads.length !== 1) flags.push(['ERR', 'голов не 1', heads.length]);
  const legUnits = legs.length + Math.min(thighs.length, shins.length);
  if (legUnits !== 2) flags.push(['ERR', 'ног не 2', legUnits]);
  if (thighs.length !== shins.length) flags.push(['ERR', 'бедро без голени', `${thighs.length}/${shins.length}`]);
  if (torsos.length !== 1) flags.push(['ERR', 'торсов не 1', torsos.length]);

  // 2. Крепления: голова и плечи должны стоять на контуре торса.
  const tpts = torsos[0]?.args[0] ?? [];
  if (tpts.length) {
    if (tpts.length < LIMITS.torsoPts) flags.push(['ERR', 'торс из точек', tpts.length]);
    let span = 0;
    for (const a of tpts) for (const b of tpts) span = Math.max(span, dist(a, b));
    if (span < LIMITS.torsoSpan) flags.push(['ERR', 'торс схлопнут', r1(span)]);
    for (const h of heads) {
      const gap = nearest(h.args[0], tpts);
      if (gap > LIMITS.headGap) flags.push(['ERR', 'голова оторвана', r1(gap)]);
    }
    for (const a of arms) {
      const gap = nearest(a.args[0], tpts);
      if (gap > LIMITS.shoulderGap) flags.push(['ERR', 'плечо оторвано', r1(gap)]);
    }
    // Таз: бедро обязано расти из торса, иначе фигура «стоит» с телом у пола.
    for (const hip of [...legs.map((l) => l.args[0]), ...thighs.map((t) => t.args[0])]) {
      const gap = polyDist(hip, tpts);
      if (gap > LIMITS.hipGap) flags.push(['ERR', 'таз оторван от торса', r1(gap)]);
    }
    // Голова внутри контура торса: шея есть, а силуэт читается безголовым.
    for (const h of heads) {
      if (inPoly(h.args[0], tpts)) flags.push(['NOTE', 'голова внутри торса', `${r1(h.args[0][0])},${r1(h.args[0][1])}`]);
    }
  }

  // 3. Кисти: захват `toe` обязан стоять на стопе; `flat`/`palm` рисуются у пола.
  const footPts = [...legs.map((l) => l.args[2]), ...shins.map((s) => s.args[1])];
  for (const a of arms) {
    const wrist = a.args[2];
    const hand = a.args[3]?.hand;
    if (!Number.isFinite(wrist?.[0]) || !Number.isFinite(wrist?.[1])) {
      flags.push(['ERR', 'битые координаты', hand ?? '?']);
      continue;
    }
    if (hand === 'toe') {
      const d = footPts.length ? nearest(wrist, footPts) : Infinity;
      if (d > LIMITS.toeGrip) flags.push(['ERR', 'захват мимо стопы', r1(d)]);
    }
    if (hand === 'flat' || hand === 'palm') {
      const dy = wrist[1] - GROUND;
      if (dy < LIMITS.palmDy[0] || dy > LIMITS.palmDy[1]) flags.push(['ERR', 'ладонь не у пола', r1(dy)]);
    }
  }

  // 4. Рука, натянутая от таза до стопы, читается третьей ногой: так выглядели
  // сломанные складки, где плечо случайно совпало с тазом. NOTE, а не ERR: у
  // балансов на руках плечо действительно рядом с тазом.
  const hips = [...legs.map((l) => l.args[0]), ...thighs.map((t) => t.args[0])];
  for (const a of arms) {
    const [s, e, w] = a.args;
    if (!hips.length || !footPts.length) continue;
    const nearHip = nearest(s, hips);
    const nearFoot = nearest(w, footPts);
    if (nearHip < 10 && nearFoot < 10 && angleAt(s, e, w) > 2.9) {
      flags.push(['NOTE', 'рука от таза до стопы', `${r1(nearHip)} / ${r1(nearFoot)}`]);
    }
  }

  // 5. Пропорции. WARN — суммарная длина конечности вне 0.5–1.9 медианы корпуса
  // (регрессия координат). NOTE — одиночный сегмент вне коридора: у согнутой
  // конечности хорда короче реальной длины, поэтому такой кадр стоит посмотреть.
  const noteSeg = (key, v) => {
    if (v > MED[key] * LIMITS.longSeg || v < MED[key] * LIMITS.shortSeg) {
      flags.push(['NOTE', `сегмент ${SEG_LABEL[key]}`, `${r1(v)} (медиана ${r1(MED[key])})`]);
    }
  };
  for (const a of arms) {
    const [s, e, w] = a.args;
    noteSeg('upper', dist(s, e));
    if (angleAt(s, e, w) > 2.2) noteSeg('fore', dist(e, w));
  }
  for (const l of legs) {
    const [h, k, an] = l.args;
    noteSeg('thigh', dist(h, k));
    if (angleAt(h, k, an) > 2.2) noteSeg('shin', dist(k, an));
  }
  for (const t of thighs) noteSeg('thigh', dist(t.args[0], t.args[1]));
  for (const s of shins) noteSeg('shin', dist(s.args[0], s.args[1]));

  // 5. Длина конечности целиком и асимметрия near/far.
  const tot = totalsOf(c);
  for (const [label, key] of [['рука', 'arm'], ['нога', 'leg']]) {
    const values = tot[key];
    for (const v of values) {
      if (v > MED_TOTAL[key] * LIMITS.longSeg || v < MED_TOTAL[key] * LIMITS.shortSeg) {
        flags.push(['WARN', `длина ${label}`, `${r1(v)} (медиана ${r1(MED_TOTAL[key])})`]);
      }
    }
    if (values.length !== 2) continue;
    const [a, b] = values;
    const rel = Math.abs(a - b) / Math.max(a, b || 1);
    if (rel > LIMITS.asym) flags.push(['NOTE', `асимметрия ${label}`, `${r1(a)} vs ${r1(b)}`]);
  }

  if (flags.length) rows.push({ rel: p.rel, flags });
}

const errs = rows.flatMap((r) => r.flags.filter((f) => f[0] === 'ERR').map((f) => ({ ...f, rel: r.rel })));
const warns = rows.flatMap((r) => r.flags.filter((f) => f[0] === 'WARN').map((f) => ({ ...f, rel: r.rel })));
const notes = rows.flatMap((r) => r.flags.filter((f) => f[0] === 'NOTE').map((f) => ({ ...f, rel: r.rel })));
const fmt = (flags) => flags.map(([lvl, name, val]) => `${lvl} ${name}=${val}`).join('; ');
const tally = (xs) => {
  const out = {};
  for (const x of xs) out[x[1]] = (out[x[1]] || 0) + 1;
  return out;
};

console.log(`Позы: ${poses.length}`);
console.log(`ERR: ${errs.length}, WARN: ${warns.length}, NOTE: ${notes.length}`);
console.log(
  `Медианы корпуса: плечо ${r1(MED.upper)}, предплечье ${r1(MED.fore)}, бедро ${r1(MED.thigh)}, голень ${r1(MED.shin)}`,
);
console.log(`Длина конечности: рука ${r1(MED_TOTAL.arm)}, нога ${r1(MED_TOTAL.leg)}\n`);

for (const r of rows.filter((r) => r.flags.some((f) => f[0] !== 'NOTE'))) {
  console.log(r.rel.padEnd(46), fmt(r.flags.filter((f) => f[0] !== 'NOTE')));
}

if (notes.length) {
  console.log('\nNOTE — пропорции, которые стоит посмотреть глазами:');
  for (const r of rows.filter((r) => r.flags.some((f) => f[0] === 'NOTE'))) {
    console.log(' ', r.rel.padEnd(44), fmt(r.flags.filter((f) => f[0] === 'NOTE')));
  }
}

console.log('\nWARN по видам:', tally(warns));
if (notes.length) console.log('NOTE по видам:', tally(notes));
if (errs.length) {
  console.log('\nЕсть ERR — выход с кодом 1.');
  process.exit(1);
}
