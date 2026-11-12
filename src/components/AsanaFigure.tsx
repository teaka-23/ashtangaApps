import { POSES, type Figure } from '../data/poses';

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

const ptsAttr = (pts: Pt[]) =>
  pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ');

/** Сужающийся сегмент конечности: трапеция поперёк оси a→b, ширина wa→wb */
function taperedSeg(a: Pt, b: Pt, wa: number, wb: number): string {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const len = Math.hypot(dx, dy) || 1;
  const px = -dy / len;
  const py = dx / len;
  return ptsAttr([
    [a[0] + (px * wa) / 2, a[1] + (py * wa) / 2],
    [b[0] + (px * wb) / 2, b[1] + (py * wb) / 2],
    [b[0] - (px * wb) / 2, b[1] - (py * wb) / 2],
    [a[0] - (px * wa) / 2, a[1] - (py * wa) / 2],
  ]);
}

/** Ширины сегментов: [у тела, сустав, конец] */
const LIMB_W = {
  arm: [5.4, 4.2, 3.2],
  leg: [7.6, 5.8, 4.2],
} as const;

/** Единичный вектор a→b */
function dirOf(a: Pt, b: Pt): Pt {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const len = Math.hypot(dx, dy) || 1;
  return [dx / len, dy / len];
}

/** Кисть: ладонь вдоль предплечья (как на mannequin cheat-sheet, не шарик) */
function drawHand(mid: Pt, end: Pt) {
  const [ux, uy] = dirOf(mid, end);
  const wrist: Pt = [end[0] - ux * 1.2, end[1] - uy * 1.2];
  const tip: Pt = [end[0] + ux * 7.0, end[1] + uy * 7.0];
  /* Шире у запястья → уже к пальцам */
  return <polygon points={taperedSeg(wrist, tip, 7.2, 2.4)} />;
}

/**
 * Стопа: на полу — плоско вдоль горизонта; иначе — носок вдоль голени
 * (Адхо, перевёрнутые — как на mannequin cheat-sheet).
 */
function drawFoot(mid: Pt, end: Pt, ground?: number) {
  const [ux, uy] = dirOf(mid, end);
  const onFloor =
    ground !== undefined && Math.abs(end[1] - ground) < 14;
  let toe: Pt;
  if (onFloor) {
    const side = ux >= 0 ? 1 : -1;
    toe = [end[0] + side * 8.0, ground - 0.4];
    return <polygon points={taperedSeg(end, toe, 5.0, 2.6)} />;
  }
  /* Носок / подошва вдоль оси голени */
  toe = [end[0] + ux * 7.5, end[1] + uy * 7.5];
  return <polygon points={taperedSeg(end, toe, 4.6, 2.2)} />;
}

function drawSide(
  limbKind: 'arm' | 'leg',
  points: Limb,
  depth: 'far' | 'near',
  torso?: [number, number][],
  ground?: number,
) {
  const [root, mid, end] = points;
  const [w0, w1, w2] = LIMB_W[limbKind];
  const sideClass = `asana-figure__side asana-figure__side--${depth}`;

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
    if (Math.hypot(nearest[0] - root[0], nearest[1] - root[1]) <= 8) {
      joint = nearest;
    }
  }

  return (
    <g className={sideClass}>
      {joint && <polygon points={taperedSeg(joint, root, w0, w0)} />}
      <polygon points={taperedSeg(root, mid, w0, w1)} />
      <polygon points={taperedSeg(mid, end, w1, w2)} />
      {/* Сглаживание суставов без «шариков» на концах */}
      <circle cx={root[0]} cy={root[1]} r={w0 / 2.4} />
      <circle cx={mid[0]} cy={mid[1]} r={w1 / 2.4} />
      {limbKind === 'arm' ? drawHand(mid, end) : drawFoot(mid, end, ground)}
    </g>
  );
}

/**
 * Торс по 4 точкам данных.
 * Анфас — песочные часы с талией; только совсем узкий контур (<8)
 * дополняем толщиной (иначе Самастхити/Сурья ломаются как «профиль»).
 */
function drawTorso(torso: [number, number][]) {
  const [s0, s1, h1, h0] = torso as [Pt, Pt, Pt, Pt];
  const midS = lerp(s0, s1, 0.5);
  const midH = lerp(h0, h1, 0.5);
  const shoulderSpan = Math.hypot(s1[0] - s0[0], s1[1] - s0[1]);
  const torsoLen = Math.hypot(midH[0] - midS[0], midH[1] - midS[1]) || 1;
  const [sx, sy] = dirOf(midS, midH);
  const px = -sy;
  const py = sx;
  /* Строго: только реально тонкий контур в данных, не любой длинный торс */
  const sideOn = shoulderSpan < 8 && shoulderSpan < torsoLen * 0.4;

  let body: Pt[];
  let shorts: Pt[];
  let shoulderPts: [Pt, Pt];

  if (sideOn) {
    const depth = 10;
    const half = (p: Pt, w: number, sign: 1 | -1): Pt => [
      p[0] + px * sign * (w / 2),
      p[1] + py * sign * (w / 2),
    ];
    const chest = lerp(midS, midH, 0.16);
    const waist = lerp(midS, midH, 0.48);
    const hip = lerp(midS, midH, 0.86);
    const cW = depth;
    const wW = depth * 0.68;
    const hW = depth * 0.9;
    body = [
      half(midS, cW * 0.88, -1),
      half(midS, cW * 0.88, 1),
      half(chest, cW, 1),
      half(waist, wW, 1),
      half(hip, hW, 1),
      half(midH, hW, 1),
      half(midH, hW, -1),
      half(hip, hW, -1),
      half(waist, wW, -1),
      half(chest, cW, -1),
    ];
    /* Шорты только у таза — иначе в планке весь торс синеет «плитой» */
    const st = lerp(waist, midH, 0.45);
    shorts = [
      half(st, wW * 0.95, -1),
      half(st, wW * 0.95, 1),
      half(midH, hW, 1),
      half(midH, hW, -1),
    ];
    shoulderPts = [half(midS, cW * 0.7, -1), half(midS, cW * 0.7, 1)];
  } else {
    const midW = lerp(midS, midH, 0.42);
    const leftW = lerp(lerp(s0, h0, 0.4), midW, 0.3);
    const rightW = lerp(lerp(s1, h1, 0.4), midW, 0.3);
    body = [s0, s1, rightW, h1, h0, leftW];
    shorts = [
      lerp(leftW, h0, 0.3),
      lerp(rightW, h1, 0.3),
      h1,
      h0,
    ];
    shoulderPts = [s0, s1];
  }

  const shoulderR = Math.max(2.4, Math.min(shoulderSpan, 14) * 0.12);
  return (
    <>
      <polygon points={ptsAttr(body)} className="asana-figure__torso" />
      <polygon points={ptsAttr(shorts)} className="asana-figure__shorts" />
      <circle
        cx={shoulderPts[0][0]}
        cy={shoulderPts[0][1]}
        r={shoulderR}
        className="asana-figure__torso"
      />
      <circle
        cx={shoulderPts[1][0]}
        cy={shoulderPts[1][1]}
        r={shoulderR}
        className="asana-figure__torso"
      />
    </>
  );
}

/** Шея: короткая, сужается к голове, расширяется к плечам */
function drawNeck(fig: Figure) {
  if (!fig.torso) return null;
  const [t0, t1] = fig.torso;
  const sx = (t0[0] + t1[0]) / 2;
  const sy = (t0[1] + t1[1]) / 2;
  const [hx, hy] = fig.head;
  const r = fig.headR ?? 5.6;
  const [ux, uy] = dirOf([hx, hy], [sx, sy]);
  const start: Pt = [hx + ux * r * 0.65, hy + uy * r * 0.65];
  const end: Pt = [sx - ux * 0.8, sy - uy * 0.8];
  const len = Math.hypot(end[0] - start[0], end[1] - start[1]);
  if (len < 2.5) return null;
  return (
    <polygon
      points={taperedSeg(start, end, r * 0.48, 5.6)}
      className="asana-figure__neck"
    />
  );
}

/**
 * Голова: овал (не шарик) + короткий нос по дришти.
 * Ось овала вдоль лица — как на mannequin cheat-sheet.
 */
function drawHead(fig: Figure) {
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
  /* Профиль: уже по лицу; анфас/вверх: чуть яйцо темя→подбородок */
  const rx = r * (axial ? 0.88 : 0.78);
  const ry = r * (axial ? 1.05 : 1.12);
  const noseLen = r * (axial ? 0.55 : 1.05);
  const noseW = r * 0.18;
  const noseRoot: Pt = [hx + fx * rx * 0.55, hy + fy * rx * 0.55];
  const noseTip: Pt = [hx + fx * noseLen, hy + fy * noseLen];
  const noseA: Pt = [noseRoot[0] + px * noseW, noseRoot[1] + py * noseW];
  const noseB: Pt = [noseRoot[0] - px * noseW, noseRoot[1] - py * noseW];
  const bun: Pt = [hx - fx * r * 0.55, hy - fy * r * 0.55 - r * 0.1];

  return (
    <g className="asana-figure__head-group">
      {!axial && (
        <ellipse
          cx={bun[0]}
          cy={bun[1]}
          rx={r * 0.28}
          ry={r * 0.2}
          transform={`rotate(${angle} ${bun[0]} ${bun[1]})`}
          className="asana-figure__hair"
        />
      )}
      <ellipse
        cx={hx}
        cy={hy}
        rx={rx}
        ry={ry}
        transform={`rotate(${angle} ${hx} ${hy})`}
        className="asana-figure__head"
      />
      <polygon
        points={ptsAttr([noseTip, noseA, noseB])}
        className="asana-figure__nose"
      />
    </g>
  );
}

function drawFigureBody(fig: Figure) {
  return (
    <>
      {fig.ground !== undefined && (
        <>
          <ellipse
            cx={50}
            cy={fig.ground + 2.5}
            rx={30}
            ry={3.2}
            className="asana-figure__shadow"
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
      {/* Дальняя сторона (левая) — ниже по z, темнее */}
      {fig.legs && drawSide('leg', fig.legs.left, 'far', fig.torso, fig.ground)}
      {fig.arms && drawSide('arm', fig.arms.left, 'far', fig.torso, fig.ground)}
      {fig.torso && drawTorso(fig.torso)}
      {drawNeck(fig)}
      {/* Ближняя сторона (правая) — поверх */}
      {fig.legs && drawSide('leg', fig.legs.right, 'near', fig.torso, fig.ground)}
      {fig.arms && drawSide('arm', fig.arms.right, 'near', fig.torso, fig.ground)}
      {fig.drishti && (
        <line
          x1={fig.head[0]}
          y1={fig.head[1]}
          x2={fig.drishti[0]}
          y2={fig.drishti[1]}
          className="asana-figure__drishti"
        />
      )}
      {drawHead(fig)}
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
        {figures.map((fig, i) => (
          <svg
            key={i}
            viewBox="0 0 100 100"
            /* slice: заполняет ячейку по высоте (иначе meet → пустые поля во VK) */
            preserveAspectRatio="xMidYMid slice"
            className="asana-figure__cell"
            aria-hidden="true"
          >
            {showNumbers && (
              <text
                x={4}
                y={11}
                className="asana-figure__frame-num asana-figure__frame-num--compact"
              >
                {i + 1}
              </text>
            )}
            <g transform="translate(50 50) scale(1.08) translate(-50 -50)">
              {drawFigureBody(fig)}
            </g>
          </svg>
        ))}
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
        return (
          <g key={i} transform={`translate(${ox}, ${oy})`}>
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
              {drawFigureBody(fig)}
            </g>
          </g>
        );
      })}
    </svg>
  );
}
