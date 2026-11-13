import { useCallback, useEffect, useMemo, useState } from 'react';
import { getSeries } from '../data/series';
import type { SeriesId } from '../data/types';
import { PosePicture } from '../components/PosePicture';
import { poseFrameCount } from '../data/cartoons';
import { haptic, hideBackButton, keepScreenOn, showBackButton } from '../platform';
import {
  asanaDescription,
  asanaDisplayName,
  asanaDrishti,
  asanaNote,
  asanaSecondaryName,
  t,
  useLocale,
} from '../i18n';
import { clearProgress, saveProgress } from './progress';
import { BreathTimer } from './BreathTimer';
import {
  BREATH_TEMPO_MS,
  LOOK_HOLD_MS,
  loadBreathSound,
  loadBreathTempo,
  resumeBreathAudio,
  saveBreathSound,
  saveBreathTempo,
  type BreathTempo,
} from './breathAudio';

interface Props {
  seriesId: SeriesId;
  startId: string;
  initialCompletedIds?: string[];
  onExit: () => void;
}

export function PracticeView({
  seriesId,
  startId,
  initialCompletedIds = [],
  onExit,
}: Props) {
  const locale = useLocale();
  const series = getSeries(seriesId);
  const asanas = series.asanas;
  const startIndex = Math.max(
    0,
    asanas.findIndex((a) => a.id === startId),
  );
  const [index, setIndex] = useState(startIndex);
  const [completedIds, setCompletedIds] = useState<string[]>(initialCompletedIds);
  const [paused, setPaused] = useState(false);
  const [done, setDone] = useState(false);
  const [tempo, setTempo] = useState<BreathTempo>(() => loadBreathTempo());
  const [soundOn, setSoundOn] = useState(() => loadBreathSound());
  const [settingsOpen, setSettingsOpen] = useState(false);

  const asana = asanas[index];

  useEffect(() => {
    showBackButton(onExit);
    return () => hideBackButton();
  }, [onExit]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('practice-lock');
    keepScreenOn(true);
    return () => {
      root.classList.remove('practice-lock');
      keepScreenOn(false);
    };
  }, []);

  useEffect(() => {
    if (!asana || done) return;
    void saveProgress(seriesId, asana.id, completedIds);
  }, [asana, completedIds, done, seriesId]);

  const progressPct = useMemo(
    () => ((index + (done ? 1 : 0)) / asanas.length) * 100,
    [index, done, asanas.length],
  );

  const advanceTo = useCallback((nextIndex: number) => {
    setIndex(nextIndex);
    setPaused(false);
  }, []);

  const goNext = useCallback(() => {
    if (!asana) return;

    setCompletedIds((prev) => (prev.includes(asana.id) ? prev : [...prev, asana.id]));
    haptic('success');

    if (index >= asanas.length - 1) {
      setDone(true);
      void clearProgress(seriesId);
      return;
    }

    haptic('medium');
    advanceTo(index + 1);
  }, [asana, index, advanceTo, asanas.length, seriesId]);

  const goPrev = () => {
    if (index <= 0 || done) return;
    haptic('selection');
    advanceTo(index - 1);
  };

  const finish = () => {
    void clearProgress(seriesId);
    onExit();
  };

  if (!asana) return null;

  const n = asanas.length;
  const doneText = t(locale, 'doneCount').replaceAll('{n}', String(n));

  if (done) {
    return (
      <div className="practice">
        <div className="practice__done">
          <h2>{t(locale, 'practiceDone')}</h2>
          <p>{doneText}</p>
          <button type="button" className="practice__primary" onClick={finish}>
            {t(locale, 'backToCatalog')}
          </button>
        </div>
      </div>
    );
  }

  const label = asanaDisplayName(asana, locale);
  const drishti = asanaDrishti(asana, locale);
  const note = asanaNote(asana, locale);
  const frameCount = poseFrameCount(asana.pose);
  const multiFrame = frameCount > 1;
  const metaParts = [
    asana.vinyasa !== undefined ? `${t(locale, 'vinyasas')} ${asana.vinyasa}` : null,
    asana.breaths !== undefined ? `${t(locale, 'breaths')} ${asana.breaths}` : null,
    drishti ? `${t(locale, 'drishti')}: ${drishti}` : null,
  ].filter(Boolean);

  return (
    <div className={`practice${multiFrame ? ' practice--overview' : ''}`}>
      <div
        className="practice__progress"
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={asanas.length}
        aria-valuenow={index + 1}
        aria-label={`${index + 1} / ${asanas.length}`}
      >
        <div className="practice__progress-bar" style={{ width: `${progressPct}%` }} />
      </div>

      <header className="practice__header">
        <span className="practice__step">
          {index + 1} / {asanas.length}
        </span>
        <div className="practice__header-actions">
          <button type="button" className="practice__exit" onClick={onExit}>
            {t(locale, 'exit')}
          </button>
        </div>
      </header>

      <div className="practice__visual">
        <PosePicture
          pose={asana.pose}
          className="practice__figure"
          numbered={multiFrame}
          compact={multiFrame}
          label={label}
          description={asanaDescription(asana, locale)}
        />
      </div>

      <div className="practice__info">
        <h2 className="practice__sanskrit">{asana.sanskrit}</h2>
        <p className="practice__names">
          <span>{asanaSecondaryName(asana, locale)}</span>
          <span aria-hidden="true"> · </span>
          <span>{label}</span>
        </p>
        {metaParts.length > 0 && (
          <p className="practice__meta-line">{metaParts.join(' · ')}</p>
        )}
        {/* Длинная расшифровка виньяс у Сурий — в шторке; на экране мешает таймеру */}
        {note && !multiFrame && (
          <p className="practice__note" title={note}>
            {note}
          </p>
        )}
      </div>

      {asana.breaths !== undefined ? (
        <>
          <div className="practice__settings">
            <button
              type="button"
              className={`practice__settings-toggle${settingsOpen ? ' is-active' : ''}`}
              aria-expanded={settingsOpen}
              onClick={() => setSettingsOpen((v) => !v)}
            >
              {t(locale, 'practiceSettings')}
            </button>
            {settingsOpen && (
              <div className="practice__breath-opts" role="group" aria-label={t(locale, 'breaths')}>
                {(['slow', 'normal', 'fast'] as const).map((key) => (
                  <button
                    key={key}
                    type="button"
                    className={tempo === key ? 'is-active' : undefined}
                    onClick={() => {
                      setTempo(key);
                      saveBreathTempo(key);
                      void resumeBreathAudio();
                    }}
                  >
                    {t(
                      locale,
                      key === 'slow' ? 'tempoSlow' : key === 'fast' ? 'tempoFast' : 'tempoNormal',
                    )}
                  </button>
                ))}
                <button
                  type="button"
                  className={soundOn ? 'is-active' : undefined}
                  onClick={() => {
                    const next = !soundOn;
                    setSoundOn(next);
                    saveBreathSound(next);
                    if (next) void resumeBreathAudio();
                  }}
                >
                  {soundOn ? t(locale, 'soundOn') : t(locale, 'soundOff')}
                </button>
              </div>
            )}
          </div>
          <BreathTimer
            key={`${asana.id}-${tempo}`}
            breaths={asana.breaths}
            paused={paused}
            phaseMs={BREATH_TEMPO_MS[tempo]}
            lookMs={LOOK_HOLD_MS}
            soundEnabled={soundOn}
            inhaleLabel={t(locale, 'inhale')}
            exhaleLabel={t(locale, 'exhale')}
            pauseLabel={t(locale, 'pause')}
            onComplete={goNext}
            onBreath={() => haptic('light')}
          />
        </>
      ) : (
        <p className="practice__flow-hint">{t(locale, 'flowHint')}</p>
      )}

      <div className="practice__controls">
        <button type="button" disabled={index <= 0} onClick={goPrev}>
          ←
        </button>
        {asana.breaths !== undefined ? (
          <button
            type="button"
            onClick={() => {
              void resumeBreathAudio();
              setPaused((p) => !p);
            }}
          >
            {paused ? t(locale, 'resume') : t(locale, 'pause')}
          </button>
        ) : (
          <button type="button" className="practice__primary" onClick={goNext}>
            {t(locale, 'nextManual')}
          </button>
        )}
        <button type="button" onClick={goNext}>
          →
        </button>
      </div>
    </div>
  );
}
