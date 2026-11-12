import { useCallback, useEffect, useMemo, useState } from 'react';
import { POSES } from './data/poses';
import { getSeries, SERIES_ORDER, type SeriesId } from './data/series';
import type { Asana } from './data/types';
import { AsanaFigure } from './components/AsanaFigure';
import { hideBackButton, initTelegram, showBackButton } from './telegram';
import { clearProgress, loadProgress, type PracticeProgress } from './practice/progress';
import { PracticeView } from './practice/PracticeView';
import { navigate, parseHash, type Route } from './routing';
import {
  LocaleContext,
  asanaDisplayName,
  asanaDrishti,
  asanaNote,
  asanaSecondaryName,
  pluralizeAsana,
  sectionSubtitle,
  sectionTitle,
  seriesSubtitle,
  seriesTitle,
  t,
  type Locale,
} from './i18n';
import './App.css';

/** UI locale switcher hidden for now; i18n strings kept for later. */
const LOCALE: Locale = 'ru';

function defaultFrameIndex(poseKey: string): number {
  const def = POSES[poseKey];
  if (!def) return 0;
  return def.mainFrame ?? Math.floor(def.figures.length / 2);
}

function useRoute(): Route {
  const [route, setRoute] = useState<Route>(() => parseHash());

  useEffect(() => {
    const onHash = () => setRoute(parseHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  return route;
}

export default function App() {
  const route = useRoute();
  const locale = LOCALE;
  const [progressBySeries, setProgressBySeries] = useState<
    Partial<Record<SeriesId, PracticeProgress | null>>
  >({});
  const [practiceCompletedIds, setPracticeCompletedIds] = useState<string[]>([]);
  const [sheetFrame, setSheetFrame] = useState(0);

  const activeSeriesId: SeriesId | null =
    route.name === 'home' ? null : route.seriesId;
  const series = activeSeriesId ? getSeries(activeSeriesId) : null;
  const progress = activeSeriesId ? (progressBySeries[activeSeriesId] ?? null) : null;

  useEffect(() => {
    initTelegram();
    document.documentElement.lang = locale;
    void Promise.all(
      SERIES_ORDER.map(async (id) => [id, await loadProgress(id)] as const),
    ).then((entries) => {
      setProgressBySeries(Object.fromEntries(entries));
    });
    if (!window.location.hash || window.location.hash === '#') {
      navigate({ name: 'home' }, true);
    }
  }, [locale]);

  useEffect(() => {
    if (route.name !== 'catalog' || !route.sectionId) return;
    const el = document.getElementById(`section-${route.sectionId}`);
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [route]);

  const goHome = useCallback(() => navigate({ name: 'home' }), []);

  const goCatalog = useCallback((seriesId: SeriesId) => {
    navigate({ name: 'catalog', seriesId });
  }, []);

  const openAsana = useCallback((seriesId: SeriesId, id: string, replace = false) => {
    navigate({ name: 'asana', seriesId, id }, replace);
  }, []);

  const startPractice = useCallback(
    (seriesId: SeriesId, fromId?: string, resume = false) => {
      const seriesDef = getSeries(seriesId);
      const seriesProgress = progressBySeries[seriesId];
      const startId = fromId ?? seriesDef.asanas[0].id;
      if (resume && seriesProgress) {
        setPracticeCompletedIds(seriesProgress.completedIds);
        navigate({
          name: 'practice',
          seriesId,
          startId: seriesProgress.currentAsanaId,
          resume: true,
        });
        return;
      }
      setPracticeCompletedIds([]);
      void clearProgress(seriesId).then(() => {
        setProgressBySeries((prev) => ({ ...prev, [seriesId]: null }));
      });
      navigate({ name: 'practice', seriesId, startId });
    },
    [progressBySeries],
  );

  const exitPractice = useCallback(() => {
    if (route.name !== 'practice') {
      navigate({ name: 'home' });
      return;
    }
    const seriesId = route.seriesId;
    void loadProgress(seriesId).then((p) => {
      setProgressBySeries((prev) => ({ ...prev, [seriesId]: p }));
    });
    navigate({ name: 'catalog', seriesId });
  }, [route]);

  useEffect(() => {
    if (route.name !== 'practice') return;
    if (route.resume) {
      void loadProgress(route.seriesId).then((p) => {
        setProgressBySeries((prev) => ({ ...prev, [route.seriesId]: p }));
        setPracticeCompletedIds(p?.completedIds ?? []);
        if (p && p.currentAsanaId !== route.startId) {
          navigate(
            {
              name: 'practice',
              seriesId: route.seriesId,
              startId: p.currentAsanaId,
              resume: true,
            },
            true,
          );
        }
      });
    } else {
      setPracticeCompletedIds([]);
    }
  }, [route]);

  const selectedId = route.name === 'asana' ? route.id : null;
  const selectedIndex =
    series && selectedId
      ? series.asanas.findIndex((a) => a.id === selectedId)
      : -1;
  const selected =
    series && selectedIndex >= 0 ? series.asanas[selectedIndex] : null;
  const sheetFrameCount = selected ? (POSES[selected.pose]?.figures.length ?? 1) : 1;

  useEffect(() => {
    if (!selected) return;
    setSheetFrame(defaultFrameIndex(selected.pose));
  }, [selected?.id, selected?.pose]);

  useEffect(() => {
    if (route.name === 'practice') return;
    if (route.name === 'asana') {
      showBackButton(() => goCatalog(route.seriesId));
      return () => hideBackButton();
    }
    if (route.name === 'catalog') {
      showBackButton(goHome);
      return () => hideBackButton();
    }
    hideBackButton();
  }, [route, goHome, goCatalog]);

  const grouped = useMemo(() => {
    if (!series) return [];
    const map = new Map<string, Asana[]>();
    for (const section of series.sections) map.set(section.id, []);
    for (const asana of series.asanas) map.get(asana.section)?.push(asana);
    return series.sections.map((section) => ({
      section,
      asanas: map.get(section.id) ?? [],
    }));
  }, [series]);

  const go = (delta: number) => {
    if (!series || !activeSeriesId) return;
    const next = series.asanas[selectedIndex + delta];
    if (next) openAsana(activeSeriesId, next.id, true);
  };

  let counter = 0;

  return (
    <LocaleContext.Provider value={locale}>
      {route.name === 'practice' ? (
        <PracticeView
          key={`${route.seriesId}-${route.resume && progress?.currentAsanaId ? progress.currentAsanaId : route.startId}-${route.resume ? 'r' : 'n'}`}
          seriesId={route.seriesId}
          startId={
            route.resume && progress?.currentAsanaId
              ? progress.currentAsanaId
              : route.startId
          }
          initialCompletedIds={practiceCompletedIds}
          onExit={exitPractice}
        />
      ) : route.name === 'home' ? (
        <div className="app">
          <header className="header">
            <h1>{t(locale, 'appTitle')}</h1>
            <p>{t(locale, 'appSubtitle')}</p>
          </header>

          <main className="series-picker" aria-label={t(locale, 'chooseSeries')}>
            {SERIES_ORDER.map((id) => {
              const def = getSeries(id);
              const p = progressBySeries[id];
              return (
                <article key={id} className="series-card">
                  <h2>{seriesTitle(id, locale)}</h2>
                  <p className="series-card__sub">{seriesSubtitle(id, locale)}</p>
                  <p className="series-card__count">
                    {def.asanas.length} {pluralizeAsana(locale, def.asanas.length)}
                  </p>
                  <div className="series-card__actions">
                    <button
                      type="button"
                      className="header__practice"
                      onClick={() => goCatalog(id)}
                    >
                      {t(locale, 'openCatalog')}
                    </button>
                    <button
                      type="button"
                      className="header__continue"
                      onClick={() => startPractice(id)}
                    >
                      {t(locale, 'startPractice')}
                    </button>
                    {p && (
                      <button
                        type="button"
                        className="header__continue"
                        onClick={() => startPractice(id, undefined, true)}
                      >
                        {t(locale, 'continuePractice')}
                      </button>
                    )}
                  </div>
                </article>
              );
            })}
          </main>
        </div>
      ) : (
        <div className="app">
          <header className="header">
            <h1>{seriesTitle(route.seriesId, locale)}</h1>
            <p>
              {seriesSubtitle(route.seriesId, locale)} · {series!.asanas.length}{' '}
              {pluralizeAsana(locale, series!.asanas.length)}
            </p>
            <div className="header__actions">
              <button type="button" className="header__back-series" onClick={goHome}>
                {t(locale, 'backToSeries')}
              </button>
              <button
                type="button"
                className="header__practice"
                onClick={() => startPractice(route.seriesId)}
              >
                {t(locale, 'startPractice')}
              </button>
              {progress && (
                <button
                  type="button"
                  className="header__continue"
                  onClick={() => startPractice(route.seriesId, undefined, true)}
                >
                  {t(locale, 'continuePractice')}
                </button>
              )}
            </div>
          </header>

          <nav className="section-nav" aria-label="Sections">
            {series!.sections.map((s) => (
              <a key={s.id} href={`#/series/${route.seriesId}/section/${s.id}`}>
                {sectionTitle(s, locale)}
              </a>
            ))}
          </nav>

          <main>
            {grouped.map(({ section, asanas }) => (
              <section key={section.id} id={`section-${section.id}`} className="section">
                <div className="section__header">
                  <h2>{sectionTitle(section, locale)}</h2>
                  <span>{sectionSubtitle(section, locale)}</span>
                </div>
                <ul className="asana-list">
                  {asanas.map((asana) => {
                    counter += 1;
                    const label = asanaDisplayName(asana, locale);
                    return (
                      <li key={asana.id}>
                        <button
                          type="button"
                          className={`asana-card${asana.modernAddition ? ' asana-card--modern' : ''}`}
                          onClick={() => openAsana(route.seriesId, asana.id)}
                          aria-label={`${counter}. ${asana.sanskrit}, ${label}`}
                        >
                          <span className="asana-card__num" aria-hidden="true">
                            {counter}
                          </span>
                          <AsanaFigure
                            pose={asana.pose}
                            className="asana-card__figure"
                            thumbnail
                          />
                          <span className="asana-card__text" aria-hidden="true">
                            <span className="asana-card__sanskrit">{asana.sanskrit}</span>
                            <span className="asana-card__transcription">
                              {asanaSecondaryName(asana, locale)}
                            </span>
                            <span className="asana-card__russian">{label}</span>
                            {asana.modernAddition && (
                              <span className="asana-card__badge">
                                {t(locale, 'modernBadge')}
                              </span>
                            )}
                          </span>
                          {asana.vinyasa !== undefined && (
                            <span className="asana-card__vinyasa" aria-hidden="true">
                              {asana.vinyasa}
                            </span>
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </section>
            ))}
          </main>

          {selected && (
            <div className="sheet-backdrop" onClick={() => goCatalog(route.seriesId)}>
              <div
                className="sheet"
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-labelledby="sheet-title"
              >
                <div className="sheet__grip" />
                <AsanaFigure
                  pose={selected.pose}
                  className="sheet__figure"
                  frameIndex={sheetFrame}
                  label={asanaDisplayName(selected, locale)}
                />
                {sheetFrameCount > 1 && (
                  <div className="sheet__frames">
                    <button
                      type="button"
                      disabled={sheetFrame <= 0}
                      onClick={() => setSheetFrame((f) => f - 1)}
                      aria-label={`${t(locale, 'frame')} ←`}
                    >
                      ← {t(locale, 'frame')}
                    </button>
                    <span>
                      {sheetFrame + 1}/{sheetFrameCount}
                    </span>
                    <button
                      type="button"
                      disabled={sheetFrame >= sheetFrameCount - 1}
                      onClick={() => setSheetFrame((f) => f + 1)}
                      aria-label={`${t(locale, 'frame')} →`}
                    >
                      {t(locale, 'frame')} →
                    </button>
                  </div>
                )}
                <h3 className="sheet__sanskrit" id="sheet-title">
                  {selected.sanskrit}
                </h3>
                <p className="sheet__devanagari" lang="sa">
                  {selected.devanagari}
                </p>
                <p className="sheet__transcription">
                  {asanaSecondaryName(selected, locale)}
                </p>
                <p className="sheet__russian">{asanaDisplayName(selected, locale)}</p>
                {selected.modernAddition && (
                  <p className="sheet__modern-badge">{t(locale, 'modernSheet')}</p>
                )}
                <dl className="sheet__meta">
                  {selected.vinyasa !== undefined && (
                    <>
                      <dt>{t(locale, 'vinyasas')}</dt>
                      <dd>{selected.vinyasa}</dd>
                    </>
                  )}
                  {selected.breaths !== undefined && (
                    <>
                      <dt>{t(locale, 'breaths')}</dt>
                      <dd>{selected.breaths}</dd>
                    </>
                  )}
                  {asanaDrishti(selected, locale) && (
                    <>
                      <dt>{t(locale, 'drishti')}</dt>
                      <dd>{asanaDrishti(selected, locale)}</dd>
                    </>
                  )}
                </dl>
                {asanaNote(selected, locale) && (
                  <p className="sheet__note">{asanaNote(selected, locale)}</p>
                )}
                <button
                  type="button"
                  className="sheet__practice"
                  onClick={() => startPractice(route.seriesId, selected.id)}
                >
                  {t(locale, 'practiceFromHere')}
                </button>
                <div className="sheet__nav">
                  <button
                    type="button"
                    disabled={selectedIndex <= 0}
                    onClick={() => go(-1)}
                  >
                    {t(locale, 'back')}
                  </button>
                  <button
                    type="button"
                    disabled={selectedIndex >= series!.asanas.length - 1}
                    onClick={() => go(1)}
                  >
                    {t(locale, 'next')}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </LocaleContext.Provider>
  );
}
