import { POSES, type Figure } from '../data/poses';

type Pt = [number, number];
type Limb = [Pt, Pt, Pt];

interface Props {
  pose: string;
  className?: string;
  /** Максимум фигур в ряд; 0 = подобрать автоматически */
  columns?: number;
  /** Только основной кадр (для превью в списке) */
  thumbnail?: boolean;
  /** Конкретный кадр (шторка); имеет приоритет над thumbnail */
  frameIndex?: number;
  /** Номера кадров на общем плане */
  numbered?: boolean;
  /** Accessible name for the figure */
  label?: string;
  /** Longer description for screen readers */
  description?: string;
}

/** Сколько фигур в ряд, чтобы общий план оставался читаемым на телефоне */
function autoColumns(count: number): number {
  if (count <= 3) return count;
  if (count <= 12) return 3;
  return 4;
}

function drawLimb(points: Limb, className: string) {
  return (
    <polyline
      points={points.map(([x, y]) => `${x},${y}`).join(' ')}
      className={className}
    />
  );
}

/** Только локоть/колено — плечо и бедро совпадают с торсом и шумят */
function drawMidJoint(points: Limb, className: string) {
  const [x, y] = points[1];
  return <circle cx={x} cy={y} r={2.1} className={className} />;
}

function handMarker(hand: Pt, className: string) {
  return <circle cx={hand[0]} cy={hand[1]} r={2.6} className={className} />;
}

/** Чёрточка стопы поперёк голени — чтобы нога не путалась с рукой */
function footMarker(points: Limb, className: string) {
  const [, knee, foot] = points;
  const dx = foot[0] - knee[0];
  const dy = foot[1] - knee[1];
  const len = Math.hypot(dx, dy) || 1;
  const px = (-dy / len) * 4.5;
  const py = (dx / len) * 4.5;
  const fx = (dx / len) * 1.5;
  const fy = (dy / len) * 1.5;
  return (
    <line
      x1={foot[0] - px + fx}
      y1={foot[1] - py + fy}
      x2={foot[0] + px + fx}
      y2={foot[1] + py + fy}
      className={className}
    />
  );
}

function drawSide(
  limbKind: 'arm' | 'leg',
  points: Limb,
  depth: 'far' | 'near',
) {
  const base =
    limbKind === 'arm'
      ? 'asana-figure__limb asana-figure__arm'
      : 'asana-figure__limb asana-figure__leg';
  const depthClass = `asana-figure__limb--${depth}`;
  const jointClass = `asana-figure__joint asana-figure__joint--${limbKind} asana-figure__joint--${depth}`;
  const endClass =
    limbKind === 'arm'
      ? `asana-figure__hand asana-figure__hand--${depth}`
      : `asana-figure__foot asana-figure__foot--${depth}`;

  return (
    <g>
      {drawLimb(points, `${base} ${depthClass}`)}
      {drawMidJoint(points, jointClass)}
      {limbKind === 'arm'
        ? handMarker(points[2], endClass)
        : footMarker(points, endClass)}
    </g>
  );
}

function drawFigureBody(fig: Figure) {
  return (
    <>
      {fig.ground !== undefined && (
        <line
          x1={6}
          y1={fig.ground}
          x2={94}
          y2={fig.ground}
          className="asana-figure__ground"
        />
      )}
      {/* Дальняя сторона (левая) — ниже по z, бледнее */}
      {fig.legs && drawSide('leg', fig.legs.left, 'far')}
      {fig.arms && drawSide('arm', fig.arms.left, 'far')}
      {fig.torso && (
        <polygon
          points={fig.torso.map(([x, y]) => `${x},${y}`).join(' ')}
          className="asana-figure__torso"
        />
      )}
      {/* Ближняя сторона (правая) — поверх */}
      {fig.legs && drawSide('leg', fig.legs.right, 'near')}
      {fig.arms && drawSide('arm', fig.arms.right, 'near')}
      {fig.drishti && (
        <line
          x1={fig.head[0]}
          y1={fig.head[1]}
          x2={fig.drishti[0]}
          y2={fig.drishti[1]}
          className="asana-figure__drishti"
        />
      )}
      <circle
        cx={fig.head[0]}
        cy={fig.head[1]}
        r={fig.headR ?? 5.2}
        className="asana-figure__head"
      />
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
  const cols = columns > 0 ? columns : autoColumns(figures.length);
  const rows = Math.ceil(figures.length / cols);
  const gapX = figures.length > 1 ? 10 : 0;
  const gapY = figures.length > 1 ? 14 : 0;
  const cellW = 100;
  const cellH = showNumbers ? 112 : 100;
  const width = Math.min(figures.length, cols) * cellW + Math.max(0, cols - 1) * gapX;
  const height = rows * cellH + Math.max(0, rows - 1) * gapY;
  const viewBox = `0 0 ${width} ${height}`;
  const descId = description ? `pose-desc-${pose}` : undefined;

  return (
    <svg
      viewBox={viewBox}
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
        const figY = showNumbers ? 12 : 0;
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
              {i > 0 && col === 0 && row > 0 && (
                <path
                  d={`M 44 ${-gapY / 2 - 6} L 50 ${-gapY / 2 + 2} L 56 ${-gapY / 2 - 6}`}
                  className="asana-figure__arrow"
                />
              )}
              {i > 0 && col > 0 && (
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
