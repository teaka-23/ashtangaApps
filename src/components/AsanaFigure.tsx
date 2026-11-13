import { useId } from 'react';
import { POSES, type Figure, type FootMode } from '../data/poses';

type Pt = [number, number];
type Limb = [Pt, Pt, Pt];

interface Props {
  pose: string;
  className?: string;
  /** Максимум фигур в ряд; 0 = подобрать автоматически */
  columns?: number;
  /** Только основной кадр (для превью в списке / практике) */
  thumbnail?: boolean;
  /** Конкретный кадр (шторка); имеет приоритет над thumbnail */
  frameIndex?: number;
  /** Номера виньяс на общем плане */
  numbered?: boolean;
  /**
   * Практика: сетка ячеек на весь слот (Сурьи и др. последовательности),
   * без покадрового клика.
   */
  compact?: boolean;
  /** Accessible name for the figure */
  label?: string;
  /** Longer description for screen readers */
  description?: string;
}

/** Сколько фигур в ряд, чтобы общий план оставался читаемым на телефоне */
function autoColumns(count: number, compact: boolean): number {
  if (count <= 1) return 1;
  if (compact) {
    if (count <= 4) return count;
    if (count <= 12) return 3;
    if (count <= 20) return 4;
    return 5;
  }
  if (count <= 3) return count;
  if (count <= 12) return 3;
  return 4;
}

const lerp = (a: Pt, b: Pt, t: number): Pt => [
  a[0] + (b[0] - a[0]) * t,
  a[1] + (b[1] - a[1]) * t,
];

const dist = (a: Pt, b: Pt) => Math.hypot(b[0] - a[0], b[1] - a[1]);

/** Единичный вектор a→b */
function dirOf(a: Pt, b: Pt): Pt {
  const len = dist(a, b) || 1;
  return [(b[0] - a[0]) / len, (b[1] - a[1]) / len];
}

const pStr = (p: Pt) => `${p[0].toFixed(2)},${p[1].toFixed(2)}`;

/**
 * Замкнутый сплайн Катмулла-Рома через точки → гладкий органический контур
 * (кубические Безье, касательные из соседних точек).
 * tension: 1/6 — тело; меньше — острее (пояс/подол шорт).
 */
function smoothClosed(pts: Pt[], tension = 1 / 6): string {
  const n = pts.length;
  let d = `M ${pStr(pts[0])}`;
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n];
    const p1 = pts[i];
    const p2 = pts[(i + 1) % n];
    const p3 = pts[(i + 2) % n];
    const c1: Pt = [
      p1[0] + (p2[0] - p0[0]) * tension,
      p1[1] + (p2[1] - p0[1]) * tension,
    ];
    const c2: Pt = [
      p2[0] - (p3[0] - p1[0]) * tension,
      p2[1] - (p3[1] - p1[1]) * tension,
    ];
    d += ` C ${pStr(c1)} ${pStr(c2)} ${pStr(p2)}`;
  }
  return `${d} Z`;
}

/** Ширина профиля в t по ключевым точкам, плавная (smoothstep) интерполяция */
function profileAt(keys: [number, number][], t: number): number {
  if (t <= keys[0][0]) return keys[0][1];
  for (let i = 1; i < keys.length; i++) {
    if (t <= keys[i][0]) {
      const [t0, w0] = keys[i - 1];
      const [t1, w1] = keys[i];
      const u = (t - t0) / (t1 - t0);
      const s = u * u * (3 - 2 * u);
      return w0 + (w1 - w0) * s;
    }
  }
  return keys[keys.length - 1][1];
}

/**
 * Гладкая «труба» вдоль ломаной с переменной шириной:
 * офсеты по нормали в равномерных станциях + замкнутый сплайн.
 * Концы получаются скруглёнными автоматически.
 */
function tubePath(poly: Pt[], widthAt: (t: number) => number, samples = 16): string {
  const segLens = poly.slice(1).map((p, i) => dist(poly[i], p));
  const total = segLens.reduce((a, b) => a + b, 0) || 1;
  const at = (t: number): { p: Pt; d: Pt } => {
    let target = t * total;
    let i = 0;
    while (i < segLens.length - 1 && target > segLens[i]) {
      target -= segLens[i];
      i++;
    }
    const a = poly[i];
    const b = poly[i + 1];
    const u = segLens[i] ? target / segLens[i] : 0;
    return { p: lerp(a, b, u), d: dirOf(a, b) };
  };
  const left: Pt[] = [];
  const right: Pt[] = [];
  for (let i = 0; i <= samples; i++) {
    const t = i / samples;
    const { p, d } = at(t);
    const w = widthAt(t) / 2;
    left.push([p[0] - d[1] * w, p[1] + d[0] * w]);
    right.push([p[0] + d[1] * w, p[1] - d[0] * w]);
  }
  return smoothClosed([...left, ...right.reverse()]);
}

/**
 * Направление «вперёд» по X для плоской стопы: дришти, иначе голова от таза,
 * иначе наружу от центра кадра (анфас).
 * Выпад (воин): обе стопы в сторону передней ноги — не 180° назад у задней.
 */
function toeSideX(fig: Figure | undefined, end: Pt, dEnd: Pt): number {
  if (fig?.legs) {
    const L = fig.legs.left;
    const R = fig.legs.right;
    const footL = L[L.length - 1]!;
    const footR = R[R.length - 1]!;
    const span = Math.abs(footL[0] - footR[0]);
    if (span > 28) {
      const kneeL = L[1]!;
      const kneeR = R[1]!;
      /* Выпад: передняя — согнутая (колено ниже), не «более вертикальная» задняя */
      if (Math.abs(kneeL[1] - kneeR[1]) > 8) {
        const front = kneeL[1] > kneeR[1] ? footL : footR;
        const back = kneeL[1] > kneeR[1] ? footR : footL;
        return front[0] >= back[0] ? 1 : -1;
      }
    }
  }
  if (fig?.drishti) {
    const face = dirOf(fig.head, fig.drishti);
    if (Math.abs(face[0]) > 0.28) return face[0] > 0 ? 1 : -1;
  }
  if (fig?.torso && fig.torso.length >= 4) {
    const midH = lerp(fig.torso[2]!, fig.torso[3]!, 0.5);
    const toHead = dirOf(midH, fig.head);
    if (Math.abs(toHead[0]) > 0.28) return toHead[0] > 0 ? 1 : -1;
  }
  if (Math.abs(dEnd[0]) >= 0.35) return dEnd[0] > 0 ? 1 : -1;
  /* Анфас, стопы рядом (самастхити / утката): 0 = носки «вперёд», не вбок */
  if (fig?.legs) {
    const footL = fig.legs.left[fig.legs.left.length - 1]!;
    const footR = fig.legs.right[fig.legs.right.length - 1]!;
    if (Math.abs(footL[0] - footR[0]) < 18) return 0;
  }
  /* Шире анфас: слегка наружу */
  return end[0] < 50 ? -1 : 1;
}

/**
 * Конечность с мышечным рельефом и кистью/стопой как частью силуэта.
 * Профиль ширины: корень → бугор мышцы → сустав → бугор → запястье/лодыжка
 * → ладонь/пятка → кончик.
 */
function limbOutline(
  kind: 'arm' | 'leg',
  points: Limb,
  ground?: number,
  feet?: FootMode,
  fig?: Figure,
): string {
  const [root, mid, end] = points;
  const dEnd = dirOf(mid, end);
  let tip: Pt;
  let tipW: number;
  let footOnFloor = false;
  if (kind === 'arm') {
    /* Ладонь на полу — не протыкает линию; иначе продолжает предплечье */
    if (ground !== undefined && end[1] >= ground - 14 && dEnd[1] > 0.2) {
      const palmx = Math.abs(dEnd[0]) > 0.18 ? (dEnd[0] > 0 ? 1 : -1) : 0;
      tip = [end[0] + palmx * 6.2, ground - 0.3];
      tipW = 1.7;
    } else {
      tip = [end[0] + dEnd[0] * 9, end[1] + dEnd[1] * 9];
      tipW = 0.9;
    }
  } else {
    const nearGround =
      ground !== undefined && Math.abs(end[1] - ground) < 14;
    const shinVertical = Math.abs(dEnd[1]) >= 0.55;
    /* Горизонтальная голень = сидя (стопы могут быть выше линии пола) */
    const shinHorizontal = Math.abs(dEnd[0]) > Math.abs(dEnd[1]) * 1.15;
    const mode: FootMode | undefined =
      feet ??
      (nearGround && shinVertical
        ? 'flat'
        : shinHorizontal
          ? 'flex'
          : 'along');
    if (mode === 'flat' && ground !== undefined) {
      /* Стоя / наклон: стопа плоско, носки «вперёд» */
      footOnFloor = true;
      const side = toeSideX(fig, end, dEnd);
      const faceX =
        fig?.drishti != null
          ? Math.abs(dirOf(fig.head, fig.drishti)[0])
          : 1;
      if (side === 0) {
        /* Анфас узкая стойка: оба носка в одну сторону (параллельно вперёд), не уткой врозь */
        tip = [end[0] + 2.4, ground - 0.3];
        tipW = 3.0;
      } else {
        const len = faceX < 0.28 ? 5.5 : 8.8;
        tip = [end[0] + side * len, ground - 0.3];
        tipW = faceX < 0.28 ? 2.6 : 2.2;
      }
    } else if (mode === 'tucked' && ground !== undefined) {
      /* Планка: носки к голове = против направления голени по X */
      footOnFloor = true;
      const heelAway = dEnd[0] >= 0 ? 1 : -1;
      tip = [end[0] - heelAway * 9.5, ground - 0.3];
      tipW = 2.2;
    } else if (mode === 'tops' && ground !== undefined) {
      /* Урдхва: тыл стопы на полу, носки к голове (как на 7–9) */
      footOnFloor = true;
      const toHead = (fig?.head[0] ?? end[0]) <= end[0] ? -1 : 1;
      tip = [end[0] + toHead * 9.5, ground - 0.3];
      tipW = 2.4;
    } else if (mode === 'flex') {
      /* Сидя: носки вверх (flex), не продолжение голени */
      footOnFloor = false;
      const ahead = dEnd[0] >= 0 ? 1 : -1;
      tip = [end[0] + ahead * 2.2, end[1] - 9.5];
      tipW = 2.8;
    } else {
      /* Адхо / перевёрнутые: носок вдоль голени, не сквозь пол */
      tip = [end[0] + dEnd[0] * 8, end[1] + dEnd[1] * 8];
      tipW = 1.3;
      if (ground !== undefined && tip[1] > ground - 0.3) {
        footOnFloor = true;
        if (dEnd[1] > 0.08) {
          const t = Math.max(0.8, Math.min(8, (ground - 0.3 - end[1]) / dEnd[1]));
          tip = [end[0] + dEnd[0] * t, ground - 0.3];
        } else {
          tip = [tip[0], ground - 0.3];
        }
      }
    }
  }
  const ySole = ground !== undefined ? ground - 0.35 : tip[1];
  const poly: Pt[] =
    kind === 'leg' && footOnFloor && ground !== undefined
      ? [
          root,
          mid,
          /* короткий подход, чтобы касательная у подошвы не уводила носок под пол */
          [
            end[0] - dirOf(mid, [end[0], ySole])[0] * 2.4,
            ySole - dirOf(mid, [end[0], ySole])[1] * 2.4,
          ],
          [end[0], ySole],
          [end[0] + (tip[0] - end[0]) * 0.55, ySole],
          [tip[0], ySole],
        ]
      : [root, mid, end, tip];
  const lens = poly.slice(1).map((p, i) => dist(poly[i]!, p));
  const total = lens.reduce((a, b) => a + b, 0) || 1;
  const at = (idx: number) => lens.slice(0, idx).reduce((a, b) => a + b, 0) / total;
  const tm = at(1);
  const te = at(kind === 'leg' && footOnFloor && ground !== undefined ? 3 : 2);
  const keys: [number, number][] =
    kind === 'arm'
      ? [
          [0, 6.1], // плечо
          [tm * 0.2, 6.6], // дельта
          [tm * 0.55, 6.2], // бицепс
          [tm, 4.0], // локоть
          [tm + (te - tm) * 0.32, 4.6], // предплечье
          [te, 2.4], // запястье
          [te + (1 - te) * 0.38, 4.8], // ладонь
          [te + (1 - te) * 0.7, 2.4], // пальцы
          [1, tipW],
        ]
      : [
          [0, 8.5], // бедро у таза
          [tm * 0.42, 9.1], // квадрицепс
          [tm, 5.5], // колено
          [tm + (te - tm) * 0.35, 6.3], // икра
          [te, 3.5], // лодыжка
          ...(footOnFloor
            ? ([[te + (1 - te) * 0.55, 3.3]] as [number, number][]) // свод стопы
            : ([[te + (1 - te) * 0.45, 2.7]] as [number, number][])),
          [1, tipW],
        ];
  return tubePath(poly, (t) => profileAt(keys, t));
}

/** Сужающийся мостик (стык конечности с торсом): скруглённый четырёхугольник */
function bridgePath(a: Pt, b: Pt, wa: number, wb: number): string {
  const [ux, uy] = dirOf(a, b);
  const px = -uy;
  const py = ux;
  return smoothClosed([
    [a[0] + (px * wa) / 2, a[1] + (py * wa) / 2],
    [b[0] + (px * wb) / 2, b[1] + (py * wb) / 2],
    [b[0] - (px * wb) / 2, b[1] - (py * wb) / 2],
    [a[0] - (px * wa) / 2, a[1] - (py * wa) / 2],
  ]);
}

function drawSide(
  limbKind: 'arm' | 'leg',
  points: Limb,
  depth: 'far' | 'near',
  fill: string,
  fig?: Figure,
) {
  const [root, mid, end] = points;
  const sideClass = `asana-figure__side asana-figure__side--${depth}`;
  const torso = fig?.torso;
  const ground = fig?.ground;

  /* Стык с торсом: мостик от ближайшей точки контура, но только если
     корень рядом. У скрещенных ног и замков корень далеко — мостик не нужен */
  let joint: Pt | undefined;
  if (torso) {
    const nearest = torso.reduce((best, p) =>
      Math.hypot(p[0] - root[0], p[1] - root[1]) <
      Math.hypot(best[0] - root[0], best[1] - root[1])
        ? p
        : best,
    ) as Pt;
    if (Math.hypot(nearest[0] - root[0], nearest[1] - root[1]) <= 12) {
      joint = nearest;
    }
  }

  const rootW = limbKind === 'arm' ? 6.1 : 8.5;
  /* Намёк на пальцы: две короткие поперечные линии на кисти */
  let fingers: { a: Pt; b: Pt }[] | undefined;
  if (limbKind === 'arm') {
    const d = dirOf(mid, end);
    const n: Pt = [-d[1], d[0]];
    fingers = [5.2, 7.2].map((off) => {
      const c: Pt = [end[0] + d[0] * off, end[1] + d[1] * off];
      const w = off < 6 ? 1.5 : 1.1;
      return {
        a: [c[0] + n[0] * w, c[1] + n[1] * w] as Pt,
        b: [c[0] - n[0] * w, c[1] - n[1] * w] as Pt,
      };
    });
  }
  return (
    <g className={sideClass}>
      {joint && <path d={bridgePath(joint, root, rootW, rootW)} fill={fill} />}
      {/* Шарнир в корне: нога/рука всегда срастается с туловищем */}
      <circle cx={root[0]} cy={root[1]} r={(rootW / 2) * 0.85} fill={fill} />
      <path
        d={limbOutline(limbKind, points, ground, fig?.feet, fig)}
        fill={fill}
      />
      {fingers?.map((ln, i) => (
        <line
          key={i}
          x1={ln.a[0]}
          y1={ln.a[1]}
          x2={ln.b[0]}
          y2={ln.b[1]}
          className="asana-figure__detail"
        />
      ))}
    </g>
  );
}

/**
 * Живот / спина на профиле.
 * Главное: лицо/ноги задают «вперёд» → ягодицы в противоположную сторону по X
 * (в наших данных профиль почти всегда смотрит в +x → спина слева).
 * Иначе дришти/бёдра вне оси позвоночника; иначе планка/стоя.
 */
function bellyBackSigns(
  fig: Figure,
  midS: Pt,
  midH: Pt,
  px: number,
  py: number,
): { belly: 1 | -1; back: 1 | -1 } {
  const [sx, sy] = dirOf(midS, midH);

  /* Ягодицы на −x если лицом в +x; на +x если лицом в −x (как Адхо) */
  const faceFromHead = () => {
    const toHead = dirOf(midH, fig.head);
    if (Math.abs(toHead[0]) <= 0.25) return null;
    const wantBackX: 1 | -1 = toHead[0] < 0 ? 1 : -1;
    const back: 1 | -1 = px * wantBackX > 0 ? 1 : -1;
    return { belly: (back === 1 ? -1 : 1) as 1 | -1, back };
  };
  if (fig.legs) {
    const aL = fig.legs.left[fig.legs.left.length - 1]!;
    const aR = fig.legs.right[fig.legs.right.length - 1]!;
    const toFeet = dirOf(midH, lerp(aL, aR, 0.5));
    if (Math.abs(toFeet[0]) > 0.35) {
      const wantBackX = toFeet[0] > 0 ? -1 : 1;
      const back: 1 | -1 = px * wantBackX > 0 ? 1 : -1;
      return { belly: back === 1 ? -1 : 1, back };
    }
  }
  /* Выпад: стопы под тазом → |toFeet.x| мал; берём голову (Адхо→воин, тот же −x) */
  {
    const fromHead = faceFromHead();
    if (fromHead) return fromHead;
  }

  type Cand = { score: number; belly: 1 | -1 };
  const cands: Cand[] = [];
  if (fig.legs) {
    const kL = fig.legs.left[Math.min(1, fig.legs.left.length - 1)]!;
    const kR = fig.legs.right[Math.min(1, fig.legs.right.length - 1)]!;
    const toK = dirOf(midH, lerp(kL, kR, 0.5));
    const onP = toK[0] * px + toK[1] * py;
    const onS = toK[0] * sx + toK[1] * sy;
    if (Math.abs(onP) > 0.4 && Math.abs(onP) > Math.abs(onS) * 0.55) {
      cands.push({ score: Math.abs(onP) * 2.2, belly: onP > 0 ? 1 : -1 });
    }
  }
  if (fig.drishti) {
    const face = dirOf(fig.head, fig.drishti);
    const onP = face[0] * px + face[1] * py;
    const onS = face[0] * sx + face[1] * sy;
    if (Math.abs(onP) > 0.22 && Math.abs(onP) > Math.abs(onS) * 0.45) {
      cands.push({ score: Math.abs(onP), belly: onP > 0 ? 1 : -1 });
    }
  }
  if (Math.abs(sx) > Math.abs(sy) * 0.85) {
    cands.push({ score: 0.12, belly: py >= 0 ? 1 : -1 });
  } else {
    cands.push({ score: 0.12, belly: px >= 0 ? 1 : -1 });
  }
  cands.sort((a, b) => b.score - a.score);
  const belly = cands[0]!.belly;
  return { belly, back: belly === 1 ? -1 : 1 };
}

/**
 * Торс по 4 точкам данных, контур сглаживается сплайном.
 * Узкий торс в данных — вид сбоку: грудь вперёд, талия, ягодицы назад.
 * Широкий — анфас: плечи → талия → бёдра.
 */
function drawTorso(fig: Figure, skinFill: string, shortsFill: string) {
  const torso = fig.torso!;
  const [s0, s1, h1, h0] = torso as [Pt, Pt, Pt, Pt];
  const midS = lerp(s0, s1, 0.5);
  const midH = lerp(h0, h1, 0.5);
  const shoulderSpan = dist(s0, s1);
  const torsoLen = dist(midS, midH) || 1;
  const [sx, sy] = dirOf(midS, midH);
  const px = -sy;
  const py = sx;
  /* Строго: только реально тонкий контур в данных (<8 и <40% длины).
     Слабее порог снова ломает анфас Сурьи (Самастхити → «профиль»). */
  const sideOn = shoulderSpan < 8 && shoulderSpan < torsoLen * 0.4;

  let body: Pt[];
  let band: Pt;
  let shoulderPts: [Pt, Pt];

  if (sideOn) {
    const { belly, back } = bellyBackSigns(fig, midS, midH, px, py);
    const depth = 10;
    const side = (p: Pt, bellyW: number, backW: number): [Pt, Pt] => [
      [
        p[0] + px * belly * (bellyW / 2),
        p[1] + py * belly * (bellyW / 2),
      ],
      [
        p[0] + px * back * (backW / 2),
        p[1] + py * back * (backW / 2),
      ],
    ];
    const chest = lerp(midS, midH, 0.16);
    const waist = lerp(midS, midH, 0.48);
    const hip = lerp(midS, midH, 0.72);
    const glute = lerp(midS, midH, 0.88);
    /* Сидя / складка: стопы не сильно ниже таза */
    let seated = false;
    if (fig.legs) {
      const aL = fig.legs.left[fig.legs.left.length - 1]!;
      const aR = fig.legs.right[fig.legs.right.length - 1]!;
      const footY = (aL[1] + aR[1]) / 2;
      seated = Math.abs(footY - midH[1]) < Math.max(16, torsoLen * 0.45);
    }
    /* Складка: торс почти вдоль ног — ягодицы читаются сверху */
    const folded = seated && Math.abs(sx) > Math.abs(sy) * 0.55;
    /* Грудь вперёд, талия уже, ягодицы сзади — S-профиль как на cheat-sheet */
    const cBelly = depth * 1.08;
    const cBack = depth * 0.68;
    const wBelly = depth * 0.58;
    const wBack = depth * 0.52;
    const hBelly = depth * 0.7;
    const hBack = depth * 1.35;
    const gBelly = depth * 0.55;
    const pelBelly = depth * 0.55;

    const [sBelly, sBack] = side(midS, depth * 0.88, depth * 0.76);
    const [cBellyP, cBackP] = side(chest, cBelly, cBack);
    const [wBellyP, wBackP] = side(waist, wBelly, wBack);
    const [hBellyP] = side(hip, hBelly, hBack);
    const [gBellyP] = side(glute, gBelly, gBelly);
    const [pBelly] = side(midH, pelBelly, pelBelly);

    /* Ягодицы: короткая дуга сзади (не шар) — поясница → пик → складка у бедра */
    const gC: Pt = [
      midH[0] + px * back * (depth * 0.18) - sx * (folded ? 0.3 : seated ? 0.8 : 1.4),
      midH[1] +
        py * back * (depth * 0.18) -
        sy * (folded ? 0.3 : seated ? 0.8 : 1.4) -
        (folded ? 1.6 : seated ? 0.8 : 0),
    ];
    const gR = depth * (folded ? 0.58 : seated ? 0.62 : 0.55);
    const gluteArc: Pt[] = [];
    /* Угол ~35°…145°: только задняя «щека», без полного полукруга */
    const a0 = Math.PI * 0.22;
    const a1 = Math.PI * 0.78;
    for (let i = 0; i <= 5; i++) {
      const ang = a0 + (i / 5) * (a1 - a0);
      gluteArc.push([
        gC[0] - sx * Math.cos(ang) * gR + px * back * Math.sin(ang) * gR,
        gC[1] - sy * Math.cos(ang) * gR + py * back * Math.sin(ang) * gR,
      ]);
    }
    /* Поясница уже — чтобы читался переход талия → ягодицы */
    const lumbar: Pt = [
      lerp(waist, midH, 0.58)[0] + px * back * (depth * 0.36),
      lerp(waist, midH, 0.58)[1] + py * back * (depth * 0.36),
    ];
    const crease: Pt = [
      midH[0] + px * back * (depth * 0.42) + sx * 2.8,
      midH[1] + py * back * (depth * 0.42) + sy * 2.8,
    ];

    body = [
      sBack,
      sBelly,
      cBellyP,
      wBellyP,
      hBellyP,
      gBellyP,
      pBelly,
      crease,
      ...[...gluteArc].reverse(),
      lumbar,
      wBackP,
      cBackP,
    ];
    /* Пояс выше — больше ткани, ягодицы под шортами, не «светят» */
    band = lerp(midS, midH, 0.42);
    shoulderPts = [
      [
        midS[0] + px * belly * (depth * 0.35),
        midS[1] + py * belly * (depth * 0.35),
      ],
      [
        midS[0] + px * back * (depth * 0.32),
        midS[1] + py * back * (depth * 0.32),
      ],
    ];
  } else {
    const midW = lerp(midS, midH, 0.42);
    const leftW = lerp(lerp(s0, h0, 0.4), midW, 0.3);
    const rightW = lerp(lerp(s1, h1, 0.4), midW, 0.3);
    /* Бёдра шире талии — читаемый таз анфас */
    const hipOut = 1.12;
    const h0w: Pt = [
      midH[0] + (h0[0] - midH[0]) * hipOut,
      midH[1] + (h0[1] - midH[1]) * hipOut,
    ];
    const h1w: Pt = [
      midH[0] + (h1[0] - midH[0]) * hipOut,
      midH[1] + (h1[1] - midH[1]) * hipOut,
    ];
    body = [s0, s1, rightW, h1w, h0w, leftW];
    band = lerp(midW, midH, 0.12);
    shoulderPts = [s0, s1];
  }

  const bodyD = smoothClosed(body);
  /* Шорты — одна цельная форма: пояс → ягодицы → подол на бедре.
     Длиннее и шире, чтобы седалище не «светило». */
  const hipJ: Pt = fig.legs
    ? lerp(fig.legs.left[0]!, fig.legs.right[0]!, 0.5)
    : midH;
  const knee: Pt = fig.legs
    ? lerp(
        fig.legs.left[1] ?? fig.legs.left[0]!,
        fig.legs.right[1] ?? fig.legs.right[0]!,
        0.5,
      )
    : [midH[0] + sx * 12, midH[1] + sy * 12];
  const along = dist(hipJ, knee) < 4 ? ([sx, sy] as Pt) : dirOf(hipJ, knee);

  let shortsD: string;
  let bandEdge: [Pt, Pt];
  if (sideOn) {
    const { back } = bellyBackSigns(fig, midS, midH, px, py);
    /* Толстая трубка со смещением к спине — ягодицы под тканью, подол ниже */
    const axis: Pt[] = [
      band,
      [
        midH[0] + px * back * 3.2,
        midH[1] + py * back * 3.2,
      ],
      [
        hipJ[0] + along[0] * 9.5 + px * back * 2.2,
        hipJ[1] + along[1] * 9.5 + py * back * 2.2,
      ],
    ];
    shortsD = tubePath(
      axis,
      (t) =>
        profileAt(
          [
            [0, 13.5],
            [0.3, 15.5],
            [0.6, 14.5],
            [1, 11.5],
          ],
          t,
        ),
      24,
    );
    bandEdge = [
      [band[0] + px * 6.5, band[1] + py * 6.5],
      [band[0] - px * 6.5, band[1] - py * 6.5],
    ];
  } else {
    const hipW = Math.max(18, shoulderSpan * 1.05);
    const hem: Pt = [midH[0] + sx * 10.5, midH[1] + sy * 10.5];
    shortsD = tubePath(
      [band, midH, hem],
      (t) =>
        profileAt(
          [
            [0, hipW * 0.92],
            [0.35, hipW * 1.12],
            [0.7, hipW * 0.95],
            [1, hipW * 0.72],
          ],
          t,
        ),
      22,
    );
    bandEdge = [
      [band[0] + px * (hipW * 0.44), band[1] + py * (hipW * 0.44)],
      [band[0] - px * (hipW * 0.44), band[1] - py * (hipW * 0.44)],
    ];
  }

  const shoulderR = Math.max(2.4, Math.min(shoulderSpan, 14) * 0.12);
  return {
    torso: (
      <>
        <path d={bodyD} fill={skinFill} className="asana-figure__torso" />
        <circle
          cx={shoulderPts[0][0]}
          cy={shoulderPts[0][1]}
          r={shoulderR}
          fill={skinFill}
          className="asana-figure__torso"
        />
        <circle
          cx={shoulderPts[1][0]}
          cy={shoulderPts[1][1]}
          r={shoulderR}
          fill={skinFill}
          className="asana-figure__torso"
        />
      </>
    ),
    shorts: (
      <>
        <path d={shortsD} fill={shortsFill} className="asana-figure__shorts" />
        <line
          x1={bandEdge[0][0]}
          y1={bandEdge[0][1]}
          x2={bandEdge[1][0]}
          y2={bandEdge[1][1]}
          className="asana-figure__shorts-band"
        />
      </>
    ),
  };
}

/** Шея: короткая, сужается к голове, расширяется к плечам */
function drawNeck(fig: Figure, fill: string) {
  if (!fig.torso) return null;
  const [t0, t1] = fig.torso;
  const sx = (t0[0] + t1[0]) / 2;
  const sy = (t0[1] + t1[1]) / 2;
  const [hx, hy] = fig.head;
  const r = fig.headR ?? 5.6;
  const [ux, uy] = dirOf([hx, hy], [sx, sy]);
  const start: Pt = [hx + ux * r * 0.65, hy + uy * r * 0.65];
  const end: Pt = [sx - ux * 0.8, sy - uy * 0.8];
  if (dist(start, end) < 2.5) return null;
  return (
    <path
      d={bridgePath(start, end, r * 0.48, 5.6)}
      fill={fill}
      className="asana-figure__neck"
    />
  );
}

/**
 * Голова: овал по оси лица + нос по дришти, ухо, волосы (объём сзади + пучок).
 * Профиль уже по лицу; анфас/вверх — чуть яйцо темя→подбородок.
 */
function drawHead(fig: Figure, skinFill: string) {
  const [hx, hy] = fig.head;
  const r = fig.headR ?? 5.8;
  let fx = 0.2;
  let fy = -0.4;
  if (fig.drishti) {
    [fx, fy] = dirOf([hx, hy], fig.drishti);
  }
  const [px, py] = [-fy, fx];
  const axial = Math.abs(fy) > 0.8;
  const angle = (Math.atan2(fy, fx) * 180) / Math.PI;
  const rx = r * (axial ? 0.88 : 0.78);
  const ry = r * (axial ? 1.05 : 1.12);
  const noseLen = r * (axial ? 0.55 : 1.05);
  const noseW = r * 0.18;
  const noseRoot: Pt = [hx + fx * rx * 0.55, hy + fy * rx * 0.55];
  const noseTip: Pt = [hx + fx * noseLen, hy + fy * noseLen];
  const noseA: Pt = [noseRoot[0] + px * noseW, noseRoot[1] + py * noseW];
  const noseB: Pt = [noseRoot[0] - px * noseW, noseRoot[1] - py * noseW];
  const bun: Pt = [hx - fx * r * 0.55, hy - fy * r * 0.55 - r * 0.1];
  /* Волосы: чуть больший овал, сдвинутый назад — ровная полоса с затылка */
  const hairC: Pt = [hx - fx * r * 0.34, hy - fy * r * 0.34 - r * 0.1];
  const ear: Pt = [hx - fx * r * 0.3 + px * r * 0.1, hy - fy * r * 0.3 + py * r * 0.1];
  const eye: Pt = [hx + fx * rx * 0.42 + px * 0.4, hy + fy * rx * 0.42 + py * 0.4];

  return (
    <g className="asana-figure__head-group">
      {!axial && (
        <ellipse
          cx={hairC[0]}
          cy={hairC[1]}
          rx={rx * 1.06}
          ry={ry * 1.08}
          transform={`rotate(${angle} ${hairC[0]} ${hairC[1]})`}
          className="asana-figure__hair"
        />
      )}
      <ellipse
        cx={hx}
        cy={hy}
        rx={rx}
        ry={ry}
        transform={`rotate(${angle} ${hx} ${hy})`}
        fill={skinFill}
        className="asana-figure__head"
      />
      {!axial && (
        <>
          <circle cx={ear[0]} cy={ear[1]} r={r * 0.17} className="asana-figure__ear" />
          <circle cx={eye[0]} cy={eye[1]} r={r * 0.09} className="asana-figure__eye" />
          <ellipse
            cx={bun[0]}
            cy={bun[1]}
            rx={r * 0.3}
            ry={r * 0.22}
            transform={`rotate(${angle} ${bun[0]} ${bun[1]})`}
            className="asana-figure__hair"
          />
        </>
      )}
      <polygon
        points={`${pStr(noseTip)} ${pStr(noseA)} ${pStr(noseB)}`}
        className="asana-figure__nose"
      />
    </g>
  );
}

/** Градиенты объёма: id уникальны на экземпляр компонента */
function FigDefs({ uid }: { uid: string }) {
  return (
    <defs>
      <linearGradient id={`${uid}-skin`} x1="0" y1="0" x2="0.5" y2="1">
        <stop offset="0" stopColor="#f7d2aa" />
        <stop offset="0.55" stopColor="#ecb484" />
        <stop offset="1" stopColor="#d8975f" />
      </linearGradient>
      <linearGradient id={`${uid}-skin-far`} x1="0" y1="0" x2="0.5" y2="1">
        <stop offset="0" stopColor="#e0a273" />
        <stop offset="1" stopColor="#ba7a46" />
      </linearGradient>
      <linearGradient id={`${uid}-shorts`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#34343e" />
        <stop offset="1" stopColor="#131318" />
      </linearGradient>
      <radialGradient id={`${uid}-shadow`} cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stopColor="rgba(24, 24, 28, 0.22)" />
        <stop offset="0.65" stopColor="rgba(24, 24, 28, 0.1)" />
        <stop offset="1" stopColor="rgba(24, 24, 28, 0)" />
      </radialGradient>
    </defs>
  );
}

function drawFigureBody(fig: Figure, uid: string) {
  const skin = `url(#${uid}-skin)`;
  const skinFar = `url(#${uid}-skin-far)`;
  const shorts = `url(#${uid}-shorts)`;
  const torsoParts = fig.torso ? drawTorso(fig, skin, shorts) : undefined;
  /*
   * Near/far — по лицу, не по передней ноге: иначе 8 и 12 (один −x,
   * разная нога) совпадают. Лицом в −x → правый бок к камере; в +x → левый.
   */
  const leftNear = (() => {
    if (fig.torso && fig.torso.length >= 4) {
      const midH = lerp(fig.torso[2]!, fig.torso[3]!, 0.5);
      const toHead = dirOf(midH, fig.head);
      if (Math.abs(toHead[0]) > 0.28) return toHead[0] > 0;
    }
    if (fig.drishti) {
      const face = dirOf(fig.head, fig.drishti);
      if (Math.abs(face[0]) > 0.28) return face[0] > 0;
    }
    return false;
  })();
  const farLeg = fig.legs
    ? leftNear
      ? fig.legs.right
      : fig.legs.left
    : undefined;
  const nearLeg = fig.legs
    ? leftNear
      ? fig.legs.left
      : fig.legs.right
    : undefined;
  const farArm = fig.arms
    ? leftNear
      ? fig.arms.right
      : fig.arms.left
    : undefined;
  const nearArm = fig.arms
    ? leftNear
      ? fig.arms.left
      : fig.arms.right
    : undefined;
  return (
    <>
      {fig.ground !== undefined && (
        <>
          <ellipse
            cx={50}
            cy={fig.ground + 2}
            rx={34}
            ry={4}
            fill={`url(#${uid}-shadow)`}
          />
          <line
            x1={6}
            y1={fig.ground}
            x2={94}
            y2={fig.ground}
            className="asana-figure__ground"
          />
        </>
      )}
      {farLeg && drawSide('leg', farLeg, 'far', skinFar, fig)}
      {farArm && drawSide('arm', farArm, 'far', skinFar, fig)}
      {torsoParts?.torso}
      {drawNeck(fig, skin)}
      {nearLeg && drawSide('leg', nearLeg, 'near', skin, fig)}
      {nearArm && drawSide('arm', nearArm, 'near', skin, fig)}
      {/* Шорты поверх бёдер: ноги «входят» в таз, а не висят отдельно */}
      {torsoParts?.shorts}
      {fig.drishti && (
        <line
          x1={fig.head[0]}
          y1={fig.head[1]}
          x2={fig.drishti[0]}
          y2={fig.drishti[1]}
          className="asana-figure__drishti"
        />
      )}
      {drawHead(fig, skin)}
    </>
  );
}

export function AsanaFigure({
  pose,
  className,
  columns = 0,
  thumbnail = false,
  frameIndex,
  numbered = false,
  compact = false,
  label,
  description,
}: Props) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const def = POSES[pose];
  if (!def) return null;

  const figures =
    frameIndex !== undefined
      ? [def.figures[Math.max(0, Math.min(frameIndex, def.figures.length - 1))]]
      : thumbnail
        ? [def.figures[def.mainFrame ?? Math.floor(def.figures.length / 2)]]
        : def.figures;

  const showNumbers = numbered && figures.length > 1;
  const cols = columns > 0 ? columns : autoColumns(figures.length, compact);
  const rows = Math.ceil(figures.length / cols);
  const gapX = figures.length > 1 ? 10 : 0;
  const gapY = figures.length > 1 ? 14 : 0;
  const cellW = 100;
  const numPad = showNumbers ? 12 : 0;
  const cellH = 100 + numPad;
  const width = Math.min(figures.length, cols) * cellW + Math.max(0, cols - 1) * gapX;
  const height = rows * cellH + Math.max(0, rows - 1) * gapY;
  const viewBox = `0 0 ${width} ${height}`;
  const descId = description ? `pose-desc-${pose}` : undefined;

  /* Практика: CSS-grid заполняет слот; каждая виньяса — отдельный SVG */
  if (compact && figures.length > 1) {
    return (
      <div
        className={`${className ?? ''} asana-figure--compact-grid`.trim()}
        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
        role="img"
        aria-label={label}
        aria-describedby={descId}
        aria-hidden={label ? undefined : true}
      >
        {description && (
          <span id={descId} className="visually-hidden">
            {description}
          </span>
        )}
        {figures.map((fig, i) => {
          const fid = `${uid}f${i}`;
          return (
          <svg
            key={i}
            viewBox="0 0 100 100"
            /* slice: заполняет ячейку по высоте (иначе meet → пустые поля во VK) */
            preserveAspectRatio="xMidYMid slice"
            className="asana-figure__cell"
            aria-hidden="true"
          >
            <FigDefs uid={fid} />
            {showNumbers && (
              <text
                x={4}
                y={11}
                className="asana-figure__frame-num asana-figure__frame-num--compact"
              >
                {i + 1}
              </text>
            )}
            {/* Без scale>1 — иначе сидячие/длинные ноги обрезаются у края viewBox */}
            <g transform="translate(50 50) scale(1.0) translate(-50 -50)">
              {drawFigureBody(fig, fid)}
            </g>
          </svg>
          );
        })}
      </div>
    );
  }

  return (
    <svg
      viewBox={viewBox}
      preserveAspectRatio="xMidYMid meet"
      className={className}
      role="img"
      aria-label={label}
      aria-describedby={descId}
      aria-hidden={label ? undefined : true}
    >
      {label && <title>{label}</title>}
      {description && <desc id={descId}>{description}</desc>}
      {figures.map((fig, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const ox = col * (cellW + gapX);
        const oy = row * (cellH + gapY);
        const figY = numPad;
        const fid = `${uid}f${i}`;
        return (
          <g key={i} transform={`translate(${ox}, ${oy})`}>
            <FigDefs uid={fid} />
            {showNumbers && (
              <text
                x={8}
                y={11}
                className="asana-figure__frame-num"
                aria-hidden="true"
              >
                {i + 1}
              </text>
            )}
            <g transform={`translate(0, ${figY})`}>
              {!compact && i > 0 && col === 0 && row > 0 && (
                <path
                  d={`M 44 ${-gapY / 2 - 6} L 50 ${-gapY / 2 + 2} L 56 ${-gapY / 2 - 6}`}
                  className="asana-figure__arrow"
                />
              )}
              {!compact && i > 0 && col > 0 && (
                <path
                  d={`M ${-gapX / 2 - 6} 44 L ${-gapX / 2 + 2} 50 L ${-gapX / 2 - 6} 56`}
                  className="asana-figure__arrow"
                />
              )}
              {drawFigureBody(fig, fid)}
            </g>
          </g>
        );
      })}
    </svg>
  );
}
