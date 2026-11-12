import { POSES } from '../data/poses';

interface Props {
  pose: string;
  className?: string;
  /** Максимум фигур в ряд (для шторки) */
  columns?: number;
  /** Только основной кадр (для превью в списке) */
  thumbnail?: boolean;
}

function drawLimb(
  points: [[number, number], [number, number], [number, number]],
  className: string,
) {
  return (
    <polyline
      points={points.map(([x, y]) => `${x},${y}`).join(' ')}
      className={className}
    />
  );
}

function drawJoints(
  points: [[number, number], [number, number], [number, number]],
) {
  return points.map(([x, y], j) => (
    <circle
      key={j}
      cx={x}
      cy={y}
      r={j === 1 ? 2.5 : 2}
      className="asana-figure__joint"
    />
  ));
}

function drawStrokes(strokes: [number, number][][]) {
  return strokes.map((line, j) => (
    <polyline
      key={j}
      points={line.map(([x, y]) => `${x},${y}`).join(' ')}
      className="asana-figure__stroke"
    />
  ));
}

export function AsanaFigure({ pose, className, columns = 0, thumbnail = false }: Props) {
  const def = POSES[pose];
  if (!def) return null;

  const figures = thumbnail
    ? [def.figures[def.mainFrame ?? Math.floor(def.figures.length / 2)]]
    : def.figures;

  const cols = columns > 0 ? columns : figures.length;
  const rows = Math.ceil(figures.length / cols);
  const cellW = 100;
  const cellH = 100;
  const width = Math.min(figures.length, cols) * cellW;
  const height = rows * cellH;
  const viewBox = `0 0 ${width} ${height}`;

  return (
    <svg viewBox={viewBox} className={className} role="img" aria-hidden="true">
      {figures.map((fig, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const ox = col * cellW;
        const oy = row * cellH;
        return (
          <g key={i} transform={`translate(${ox}, ${oy})`}>
            {fig.ground !== undefined && (
              <line
                x1={6}
                y1={fig.ground}
                x2={94}
                y2={fig.ground}
                className="asana-figure__ground"
              />
            )}
            {i > 0 && col === 0 && row > 0 && (
              <path d="M 44 -12 L 50 -4 L 56 -12" className="asana-figure__arrow" />
            )}
            {i > 0 && col > 0 && (
              <path d="M -12 44 L -4 50 L -12 56" className="asana-figure__arrow" />
            )}
            {fig.torso && (
              <polygon
                points={fig.torso.map(([x, y]) => `${x},${y}`).join(' ')}
                className="asana-figure__torso"
              />
            )}
            {fig.arms && (
              <>
                {drawLimb(fig.arms.left, 'asana-figure__limb asana-figure__arm')}
                {drawLimb(fig.arms.right, 'asana-figure__limb asana-figure__arm')}
                {drawJoints(fig.arms.left)}
                {drawJoints(fig.arms.right)}
              </>
            )}
            {fig.legs && (
              <>
                {drawLimb(fig.legs.left, 'asana-figure__limb asana-figure__leg')}
                {drawLimb(fig.legs.right, 'asana-figure__limb asana-figure__leg')}
                {drawJoints(fig.legs.left)}
                {drawJoints(fig.legs.right)}
              </>
            )}
            {fig.strokes && drawStrokes(fig.strokes)}
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
              r={fig.headR ?? 5.5}
              className="asana-figure__stroke asana-figure__head"
            />
          </g>
        );
      })}
    </svg>
  );
}