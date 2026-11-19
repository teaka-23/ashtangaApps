/**
 * Монохромный силуэт для иллюстраций асан.
 *
 * Причина: SVG грузятся в приложение через <img src>, поэтому `currentColor`
 * внутри них не наследуется (разрешается в чёрный). Тема не переключается —
 * значит цвет задаём один раз, чернилами, а карточка под фигурой всегда
 * светлая (#faf8f5, см. .pose-picture__img в App.css).
 *
 * Конвейер: pose-модули рисуют анатомию в системе 200×200, затем
 * `toSilhouette` выкидывает пол, тень, блики и пунктир взгляда, а все
 * контуры заливает одним цветом. Заливка + тонкая обводка того же цвета
 * убирает светлые швы между соседними фигурами (antialiasing).
 * Последний шаг — `snapToGround`: линия пола в силуэте не рисуется, поэтому
 * нижнюю точку фигуры прижимаем к y=GROUND, иначе часть поз «висит».
 */

import { GROUND } from './figure.mjs';

export { GROUND };

/** Тёплые чернила: на светлой карточке читаются как графит, не как «чёрный». */
export const INK = '#2b2320';

/**
 * Общий холст для всех 108 поз. Шире 200, потому что три фигуры
 * (supta-konasana, setu-bandhasana, mayurasana) выходят за 0..200 на 2–6 px.
 * Один холст = один масштаб во всей серии.
 */
export const CANVAS = '-8 0 216 200';

/** Темнее кожи — дальние конечности, в силуэте уходят в дымку. */
const FAR = new Set(['#d7a888', '#c9aa90']);

/** Толщина «шва»: 1px хватает, чтобы соседние заливки не светились. */
const SEAM = 1;

function isShadow(tag) {
  return /fill="rgba\(/.test(tag);
}

function isHighlight(tag) {
  return /\bopacity="0?\.[0-9]+"/.test(tag);
}

function isDrishti(tag) {
  return /stroke="#2481cc"/.test(tag);
}

function isDetailLine(tag) {
  return /fill="none"/.test(tag);
}

function attr(tag, name) {
  const m = tag.match(new RegExp(`\\b${name}="([^"]*)"`));
  return m ? m[1] : '';
}

/**
 * Переводит готовый SVG (200×200) в монохромный силуэт.
 * @param {string} svg полный документ из pose-модуля
 * @param {{ink?: string, seam?: number, depth?: boolean, farOpacity?: number}} [opts]
 */
export function toSilhouette(
  svg,
  { ink = INK, seam = SEAM, depth = true, farOpacity = 0.45 } = {},
) {
  const body = svg
    .replace(/<\?xml[^>]*\?>/g, '')
    .replace(/<svg\b[^>]*>/, '')
    .replace(/<\/svg>/g, '')
    .replace(/<g\b[^>]*>/g, '')
    .replace(/<\/g>/g, '');

  const out = [];
  const shape = /<(path|ellipse|circle|line)\b[^>]*\/?>/g;
  let m;
  while ((m = shape.exec(body))) {
    const tag = m[0];
    const kind = m[1];

    // Пол, тень, блики, пунктир взгляда и линии пальцев в силуэте не нужны.
    if (kind === 'line') continue;
    if (isShadow(tag) || isHighlight(tag) || isDrishti(tag) || isDetailLine(tag)) continue;

    // Дальние конечности в исходнике темнее кожи — в силуэте это лёгкая дымка.
    const far = FAR.has(attr(tag, 'fill')) || FAR.has(attr(tag, 'stroke'));
    const fade = depth && far ? ` fill-opacity="${farOpacity}" stroke-opacity="${farOpacity}"` : '';
    const paint = `fill="${ink}" stroke="${ink}" stroke-width="${seam}" stroke-linejoin="round"` + fade;

    if (kind === 'path') {
      const d = attr(tag, 'd');
      if (d) out.push(`<path d="${d}" ${paint}/>`);
    } else if (kind === 'circle') {
      const cx = attr(tag, 'cx');
      const cy = attr(tag, 'cy');
      const r = attr(tag, 'r');
      if (cx && cy && r) out.push(`<circle cx="${cx}" cy="${cy}" r="${r}" ${paint}/>`);
    } else if (kind === 'ellipse') {
      const cx = attr(tag, 'cx');
      const cy = attr(tag, 'cy');
      const rx = attr(tag, 'rx');
      const ry = attr(tag, 'ry');
      if (cx && cy && rx && ry) {
        out.push(`<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" ${paint}/>`);
      }
    }
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${CANVAS}">${out.join('')}</svg>`;
}

/**
 * Сдвиг одного элемента по Y. Голова/эллипсы — через `cy`, пути — по
 * координатам `d` (в исходниках figure.mjs только абсолютные команды).
 */
function shiftShapeY(tag, dy) {
  const shift = (v) => (Math.round((v + dy) * 100) / 100).toString();
  if (tag.startsWith('<circle') || tag.startsWith('<ellipse')) {
    return tag.replace(/\bcy="([^"]+)"/, (_, v) => `cy="${shift(parseFloat(v))}"`);
  }
  const m = tag.match(/\bd="([^"]*)"/);
  if (!m) return tag;
  const tokens = m[1].match(/[MLQAZ]|-?\d*\.?\d+(?:e[-+]?\d+)?/gi) || [];
  const out = [];
  let i = 0;
  while (i < tokens.length) {
    const cmd = tokens[i++];
    out.push(cmd);
    if (cmd === 'Z' || cmd === 'z') continue;
    const arity = { A: 7, Q: 4 }[/[A-Z]/.exec(cmd)?.[0]] || 2;
    while (i < tokens.length && !/[A-Za-z]/.test(tokens[i])) {
      const set = [];
      for (let k = 0; k < arity && i < tokens.length; k++) set.push(parseFloat(tokens[i++]));
      // A: rx ry rot large-arc sweep x y — двигаем только конечную точку.
      if (cmd === 'A') set[6] = parseFloat(shift(set[6]));
      else for (let k = 1; k < set.length; k += 2) set[k] = parseFloat(shift(set[k]));
      out.push(set.join(' '));
    }
  }
  return tag.replace(/\bd="[^"]*"/, `d="${out.join(' ')}"`);
}

/**
 * Прижимает силуэт к линии пола: нижняя точка чернил встаёт на `ground`.
 * Пол и тень в силуэт не попадают, поэтому без этого шага позы с опорой
 * выше y=168 (Гарбха Пиндасана и др.) выглядят подвешенными.
 */
export function snapToGround(svg, ground = GROUND) {
  const b = inkBounds(svg);
  if (!Number.isFinite(b.maxY)) return svg;
  const dy = ground - b.maxY;
  if (Math.abs(dy) < 0.05) return svg;
  return svg.replace(/<(?:path|circle|ellipse)\b[^>]*\/>/g, (tag) => shiftShapeY(tag, dy));
}

/** Габариты всех точек путей — для проверки, что фигура не вылезает за 200×200. */
export function inkBounds(svg) {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  const plot = (x, y) => {
    if (!Number.isFinite(x) || !Number.isFinite(y)) return;
    if (x < minX) minX = x;
    if (y < minY) minY = y;
    if (x > maxX) maxX = x;
    if (y > maxY) maxY = y;
  };

  for (const tag of svg.match(/<(?:path|ellipse|circle)\b[^>]*>/g) || []) {
    if (tag.startsWith('<circle')) {
      const cx = parseFloat(attr(tag, 'cx'));
      const cy = parseFloat(attr(tag, 'cy'));
      const r = parseFloat(attr(tag, 'r'));
      plot(cx - r, cy - r);
      plot(cx + r, cy + r);
    } else if (tag.startsWith('<ellipse')) {
      const cx = parseFloat(attr(tag, 'cx'));
      const cy = parseFloat(attr(tag, 'cy'));
      plot(cx - parseFloat(attr(tag, 'rx')), cy - parseFloat(attr(tag, 'ry')));
      plot(cx + parseFloat(attr(tag, 'rx')), cy + parseFloat(attr(tag, 'ry')));
    } else {
      const d = attr(tag, 'd');
      const tokens = d.match(/[MLHVCSQTAZ]|-?\d*\.?\d+(?:e[-+]?\d+)?/gi) || [];
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
        let x = cx;
        let y = cy;
        for (let k = 0; k < pairs; k++) {
          x = num();
          y = num();
          plot(rel ? cx + x : x, rel ? cy + y : y);
        }
        cx = rel ? cx + x : x;
        cy = rel ? cy + y : y;
      }
    }
  }
  return { minX, minY, maxX, maxY };
}
