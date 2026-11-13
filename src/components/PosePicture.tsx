import { AsanaFigure } from './AsanaFigure';
import { cartoonFrames } from '../data/cartoons';
import { POSES } from '../data/poses';

type Props = {
  pose: string;
  className?: string;
  thumbnail?: boolean;
  numbered?: boolean;
  compact?: boolean;
  label?: string;
  description?: string;
};

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

export function PosePicture({
  pose,
  className,
  thumbnail = false,
  numbered = false,
  compact = false,
  label,
  description,
}: Props) {
  const frames = cartoonFrames(pose);
  if (!frames) {
    return (
      <AsanaFigure
        pose={pose}
        className={className}
        thumbnail={thumbnail}
        numbered={numbered}
        compact={compact}
        label={label}
        description={description}
      />
    );
  }

  const main = POSES[pose]?.mainFrame ?? 0;
  const shown =
    thumbnail && frames.length > 1
      ? [frames[Math.max(0, Math.min(main, frames.length - 1))]]
      : frames;

  if (shown.length === 1) {
    return <img className={className} src={shown[0]} alt={label ?? ''} />;
  }

  const cols = autoColumns(shown.length, compact);
  const showNumbers = numbered;
  return (
    <div
      className={`${className ?? ''} ${compact ? 'asana-figure--compact-grid' : 'pose-picture-grid'}`.trim()}
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
      role="img"
      aria-label={label}
    >
      {shown.map((src, i) => (
        <div key={`${src}-${i}`} className="asana-figure__cell pose-picture__cell">
          {showNumbers && <span className="pose-picture__num">{i + 1}</span>}
          <img className="pose-picture__img" src={src} alt="" />
        </div>
      ))}
      {description ? <span className="visually-hidden">{description}</span> : null}
    </div>
  );
}
