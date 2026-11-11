import { POSES } from '../data/poses';

interface Props {
  pose: string;
  className?: string;
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
            {fig.strokes.map((line, j) => (
              <polyline
                key={j}
                points={line.map(([x, y]) => `${x},${y}`).join(' ')}
                className="asana-figure__stroke"
              />
            ))}
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
