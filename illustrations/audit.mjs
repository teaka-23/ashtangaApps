/**
 * Текстовый аудит готовых SVG-иллюстраций.
 *
 * Зачем: просматривать PNG-превью в чате нельзя (модель без image input),
 * поэтому качество контролируем измеримо — по геометрии самих SVG.
 *
 * Запуск: `node illustrations/audit.mjs`
 * Код возврата 1, если есть ошибки (ERR); предупреждения (WARN) не валят прогон.
 */

import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { CANVAS, GROUND, inkBounds } from './mono.mjs';

const root = dirname(fileURLToPath(import.meta.url));
const DIRS = ['surya', 'standing', 'seated1', 'seated2', 'finishing', 'intermediate'];

/** Холст из mono.mjs: '-8 0 216 200' → границы. */
function canvasBox() {
  const [x, y, w, h] = CANVAS.split(/\s+/).map(Number);
  return { minX: x, minY: y, maxX: x + w, maxY: y + h };
}

const CANVAS_BOX = canvasBox();

function attr(tag, name) {
  const m = tag.match(new RegExp(`\\b${name}="([^"]*)"`));
  return m ? m[1] : '';
}

/** Границы одного элемента (для path — по всем точкам и управляющим точкам). */
function elementBounds(tag) {
  if (tag.startsWith('<circle')) {
    const cx = parseFloat(attr(tag, 'cx'));
    const cy = parseFloat(attr(tag, 'cy'));
    const r = parseFloat(attr(tag, 'r'));
    return { minX: cx - r, minY: cy - r, maxX: cx + r, maxY: cy + r };
  }
  if (tag.startsWith('<ellipse')) {
    const cx = parseFloat(attr(tag, 'cx'));
    const cy = parseFloat(attr(tag, 'cy'));
    const rx = parseFloat(attr(tag, 'rx'));
    const ry = parseFloat(attr(tag, 'ry'));
    return { minX: cx - rx, minY: cy - ry, maxX: cx + rx, maxY: cy + ry };
  }
  const d = attr(tag, 'd');
  if (!d) return null;
  const tokens = d.match(/[MLHVCSQTAZ]|-?\d*\.?\d+(?:e[-+]?\d+)?/gi) || [];
  let i = 0;
  let cmd = 'M';
  let x = 0;
  let y = 0;
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  const plot = (px, py) => {
    if (!Number.isFinite(px) || !Number.isFinite(py)) return;
    if (px < minX) minX = px;
    if (py < minY) minY = py;
    if (px > maxX) maxX = px;
    if (py > maxY) maxY = py;
  };
  const num = () => parseFloat(tokens[i++]);
  while (i < tokens.length) {
    if (/[A-Za-z]/.test(tokens[i])) cmd = tokens[i++];
    const u = cmd.toUpperCase();
    const rel = cmd !== u;
    if (u === 'Z') continue;
    if (u === 'H') {
      const v = num();
      x = rel ? x + v : v;
      plot(x, y);
      continue;
    }
    if (u === 'V') {
      const v = num();
      y = rel ? y + v : v;
      plot(x, y);
      continue;
    }
    const pairs = { M: 1, L: 1, T: 1, Q: 2, S: 2, C: 3, A: 1 }[u] || 1;
    for (let k = 0; k < pairs; k++) {
      if (u === 'A') {
        num();
        num();
        num();
        num();
        num();
      }
      const nx = num();
      const ny = num();
      x = rel ? x + nx : nx;
      y = rel ? y + ny : ny;
      plot(x, y);
    }
  }
  return { minX, minY, maxX, maxY };
}

/** Подпути вида `M ...` — чтобы ловить вырожденные «точки» и «волоски». */
function subpathBounds(tag) {
  const d = attr(tag, 'd');
  if (!d) return [];
  return d
    .split(/(?=\bM\b)/)
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .map((chunk) => elementBounds(`<path d="${chunk}"/>`))
    .filter((b) => b && Number.isFinite(b.minX));
}

const rows = [];
for (const dir of DIRS) {
  for (const file of readdirSync(join(root, dir)).filter((f) => f.endsWith('.svg')).sort()) {
    const rel = `${dir}/${file}`;
    const svg = readFileSync(join(root, dir, file), 'utf8');
    const tags = svg.match(/<(?:path|circle|ellipse)\b[^>]*>/g) || [];
    const flags = [];

    const bounds = inkBounds(svg);
    const w = bounds.maxX - bounds.minX;
    const h = bounds.maxY - bounds.minY;
    const cx = (bounds.minX + bounds.maxX) / 2;

    if (bounds.minX < CANVAS_BOX.minX - 0.5) flags.push(['ERR', 'клип слева', bounds.minX]);
    if (bounds.maxX > CANVAS_BOX.maxX + 0.5) flags.push(['ERR', 'клип справа', bounds.maxX]);
    if (bounds.minY < CANVAS_BOX.minY - 0.5) flags.push(['ERR', 'клип сверху', bounds.minY]);
    if (bounds.maxY > CANVAS_BOX.maxY + 0.5) flags.push(['ERR', 'клип снизу', bounds.maxY]);

    if (Math.abs(bounds.maxY - GROUND) > 1.5) {
      flags.push(['ERR', 'не на линии пола', Math.round((bounds.maxY - GROUND) * 10) / 10]);
    }
    // Голова в figure.mjs — заполненный path, а не circle, поэтому «голов не 1»
    // проверять нечем; вместо этого следим за общим габаритом фигуры.
    if (Math.max(w, h) < 90) flags.push(['WARN', 'мелкая фигура', Math.round(Math.max(w, h))]);
    if (w < 120 && (cx < 75 || cx > 125)) flags.push(['WARN', 'сдвиг по X', Math.round(cx)]);

    const faded = tags.filter((t) => /opacity="0\.45"/.test(t)).length;
    if (faded === 0) flags.push(['WARN', 'нет дымки', 0]);

    let tiny = 0;
    let hair = 0;
    for (const tag of tags) {
      for (const b of subpathBounds(tag)) {
        const sw = b.maxX - b.minX;
        const sh = b.maxY - b.minY;
        if (sw < 0.6 && sh < 0.6) tiny++;
        else if (Math.min(sw, sh) < 1.2 && Math.max(sw, sh) > 8) hair++;
      }
    }
    if (tiny) flags.push(['WARN', 'точки', tiny]);
    if (hair) flags.push(['WARN', 'волоски', hair]);

    rows.push({ rel, shapes: tags.length, faded, w: Math.round(w), h: Math.round(h), flags });
  }
}

const errs = rows.flatMap((r) => r.flags.filter((f) => f[0] === 'ERR').map((f) => ({ ...f, rel: r.rel })));
const warns = rows.flatMap((r) => r.flags.filter((f) => f[0] === 'WARN').map((f) => ({ ...f, rel: r.rel })));

console.log(`SVG: ${rows.length}`);
console.log(`ERR: ${errs.length}, WARN: ${warns.length}\n`);

for (const r of rows) {
  if (!r.flags.length) continue;
  console.log(r.rel.padEnd(48), r.flags.map(([lvl, name, val]) => `${lvl} ${name}=${val}`).join('; '));
}

const byKind = {};
for (const w of warns) byKind[w[1]] = (byKind[w[1]] || 0) + 1;
console.log('\nWARN по видам:', byKind);
if (errs.length) {
  console.log('\nЕсть ERR — выход с кодом 1.');
  process.exit(1);
}
