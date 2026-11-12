import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { playBreathCue } from './breathAudio';

type Phase = 'inhale' | 'exhale';

interface Props {
  breaths: number;
  paused: boolean;
  /** Duration of one inhale or exhale phase in ms */
  phaseMs: number;
  soundEnabled: boolean;
  inhaleLabel: string;
  exhaleLabel: string;
  pauseLabel: string;
  /** Fires once when the last exhale of the last breath completes */
  onComplete: () => void;
  /** Fires when breath index advances (1-based) */
  onBreath?: (current: number) => void;
}

export function BreathTimer({
  breaths,
  paused,
  phaseMs,
  soundEnabled,
  inhaleLabel,
  exhaleLabel,
  pauseLabel,
  onComplete,
  onBreath,
}: Props) {
  const [current, setCurrent] = useState(1);
  const [phase, setPhase] = useState<Phase>('inhale');
  const doneRef = useRef(false);
  const onCompleteRef = useRef(onComplete);
  const onBreathRef = useRef(onBreath);
  const soundRef = useRef(soundEnabled);

  useEffect(() => {
    onCompleteRef.current = onComplete;
    onBreathRef.current = onBreath;
  }, [onComplete, onBreath]);

  useEffect(() => {
    soundRef.current = soundEnabled;
  }, [soundEnabled]);

  useEffect(() => {
    if (paused || doneRef.current) return;
    if (soundRef.current) playBreathCue('inhale');
  }, [paused]);

  useEffect(() => {
    if (paused || doneRef.current) return;

    const id = window.setInterval(() => {
      setPhase((prev) => {
        if (prev === 'inhale') {
          if (soundRef.current) playBreathCue('exhale');
          return 'exhale';
        }

        setCurrent((c) => {
          if (c >= breaths) {
            if (!doneRef.current) {
              doneRef.current = true;
              onCompleteRef.current();
            }
            return c;
          }
          const next = c + 1;
          onBreathRef.current?.(next);
          if (soundRef.current) playBreathCue('inhale');
          return next;
        });
        return 'inhale';
      });
    }, phaseMs);

    return () => window.clearInterval(id);
  }, [paused, breaths, phaseMs]);

  const label = phase === 'inhale' ? inhaleLabel : exhaleLabel;
  const progress = ((current - 1) * 2 + (phase === 'exhale' ? 1 : 0)) / (breaths * 2);

  return (
    <div className="breath-timer" aria-live="polite">
      <div
        className={`breath-timer__ring breath-timer__ring--${phase}${paused ? ' breath-timer__ring--paused' : ''}`}
        style={
          {
            '--breath-progress': String(progress),
            '--breath-phase-ms': `${phaseMs}ms`,
          } as CSSProperties
        }
      >
        <span className="breath-timer__count">
          {current}
          <span className="breath-timer__of">/{breaths}</span>
        </span>
      </div>
      <p className="breath-timer__phase">{paused ? pauseLabel : label}</p>
    </div>
  );
}
