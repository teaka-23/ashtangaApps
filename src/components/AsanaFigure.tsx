import { POSES } from '../data/poses';

interface Props {
  pose: string;
  className?: string;
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

export function AsanaFigure({ pose, className }: Props) {
  const def = POSES[pose];
  if (!def) return null;

  const width = def.figures.length * 100;
  const viewBox = `0 0 ${width} 100`;

  return (
    <svg viewBox={viewBox} className={className} role="img" aria-hidden="true">
      {def.figures.map((fig, i) => {
        const ox = i * 100;
        return (
          <g key={i} transform={`translate(${ox}, 0)`}>
            {fig.ground !== undefined && (
              <line
                x1={6}
                y1={fig.ground}
                x2={94}
                y2={fig.ground}
                className="asana-figure__ground"
              />
            )}
            {i > 0 && (
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