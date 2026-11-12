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

function drawSide(
  limbKind: 'arm' | 'leg',
  points: Limb,
  depth: 'far' | 'near',
  torso?: [number, number][],
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
      <circle cx={root[0]} cy={root[1]} r={w0 / 2} />
      <circle cx={mid[0]} cy={mid[1]} r={w1 / 2} />
      {limbKind === 'arm' ? (
        <circle cx={end[0]} cy={end[1]} r={3} />
      ) : (
        /* Стопа: горизонтальная капсула от щиколотки «от колена» */
        (() => {
          const dir = end[0] - mid[0] >= 0 ? 1 : -1;
          const toe: Pt = [end[0] + dir * 7.5, end[1]];
          return (
            <>
              <polygon points={taperedSeg(end, toe, w2, 2.6)} />
              <circle cx={toe[0]} cy={toe[1]} r={1.4} />
            </>
          );
        })()
      )}
    </g>
  );
}

/** Торс: [плечо, плечо, бедро, бедро] по кругу; шорты — нижние ~55% */
function drawTorso(torso: [number, number][]) {
  const [s0, s1, h1, h0] = torso as [Pt, Pt, Pt, Pt];
  const shorts: Pt[] = [lerp(s0, h0, 0.55), lerp(s1, h1, 0.55), h1, h0];
  return (
    <>
      <polygon points={ptsAttr(torso as Pt[])} className="asana-figure__torso" />
      <polygon points={ptsAttr(shorts)} className="asana-figure__shorts" />
    </>
  );
}

/** Шея: сужающийся сегмент от края головы к середине плеч */
function drawNeck(fig: Figure) {
  if (!fig.torso) return null;
  const [t0, t1] = fig.torso;
  const sx = (t0[0] + t1[0]) / 2;
  const sy = (t0[1] + t1[1]) / 2;
  const [hx, hy] = fig.head;
  const r = fig.headR ?? 5.2;
  const dx = sx - hx;
  const dy = sy - hy;
  const len = Math.hypot(dx, dy) || 1;
  const start: Pt = [hx + (dx / len) * r * 0.55, hy + (dy / len) * r * 0.55];
  const end: Pt = [sx - (dx / len) * 2.5, sy - (dy / len) * 2.5];
  return (
    <polygon
      points={taperedSeg(start, end, r * 0.85, 7)}
      className="asana-figure__neck"
    />
  );
}

function drawHead(fig: Figure) {
  const [hx, hy] = fig.head;
  const r = fig.headR ?? 5.2;
  /* Пучок — на затылке: вверх и в сторону, противоположную взгляду (дришти) */
  let gx = 0;
  if (fig.drishti) {
    const dx = fig.drishti[0] - hx;
    const dy = fig.drishti[1] - hy;
    const len = Math.hypot(dx, dy) || 1;
    gx = dx / len;
  }
  const bx = hx - gx * r * 0.55;
  const by = hy - r * 0.72;
  return (
    <>
      <circle cx={bx} cy={by} r={r * 0.48} className="asana-figure__hair" />
      <circle cx={hx} cy={hy} r={r} className="asana-figure__head" />
    </>
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
      {fig.legs && drawSide('leg', fig.legs.left, 'far', fig.torso)}
      {fig.arms && drawSide('arm', fig.arms.left, 'far', fig.torso)}
      {fig.torso && drawTorso(fig.torso)}
      {drawNeck(fig)}
      {/* Ближняя сторона (правая) — поверх */}
      {fig.legs && drawSide('leg', fig.legs.right, 'near', fig.torso)}
      {fig.arms && drawSide('arm', fig.arms.right, 'near', fig.torso)}
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
