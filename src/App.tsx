import { useCallback, useEffect, useMemo, useState } from 'react';
import { PRIMARY_SERIES, SECTIONS, type Asana, type SectionId } from './data/primarySeries';
import { POSES } from './data/poses';
import { AsanaFigure } from './components/AsanaFigure';
import { hideBackButton, initTelegram, showBackButton, storageGet, storageSet } from './telegram';
import { clearProgress, loadProgress, type PracticeProgress } from './practice/progress';
import { PracticeView } from './practice/PracticeView';
import { navigate, parseHash, type Route } from './routing';
import {
  LOCALE_KEY,
  LocaleContext,
  asanaDisplayName,
  asanaDrishti,
  asanaNote,
  asanaSecondaryName,
  pluralizeAsana,
  sectionSubtitle,
  sectionTitle,
  t,
  type Locale,
} from './i18n';
import './App.css';

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
  const [locale, setLocale] = useState<Locale>('ru');
  const [progress, setProgress] = useState<PracticeProgress | null>(null);
  const [practiceCompletedIds, setPracticeCompletedIds] = useState<string[]>([]);
  const [sheetFrame, setSheetFrame] = useState(0);

  useEffect(() => {
    initTelegram();
    void loadProgress().then(setProgress);
    void storageGet(LOCALE_KEY).then((v) => {
      if (v === 'en' || v === 'ru') setLocale(v);
    });
    if (!window.location.hash || window.location.hash === '#') {
      navigate({ name: 'catalog' }, true);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  useEffect(() => {
    if (route.name !== 'catalog' || !route.sectionId) return;
    const el = document.getElementById(`section-${route.sectionId}`);
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [route]);

  const goCatalog = useCallback(() => navigate({ name: 'catalog' }), []);

  const openAsana = useCallback((id: string, replace = false) => {
    navigate({ name: 'asana', id }, replace);
  }, []);

  const toggleLocale = () => {
    const next: Locale = locale === 'ru' ? 'en' : 'ru';
    setLocale(next);
    void storageSet(LOCALE_KEY, next);
  };

  const startPractice = useCallback(
    (fromId?: string, resume = false) => {
      const startId = fromId ?? PRIMARY_SERIES[0].id;
      if (resume && progress) {
        setPracticeCompletedIds(progress.completedIds);
        navigate({
          name: 'practice',
          startId: progress.currentAsanaId,
          resume: true,
        });
        return;
      }
      setPracticeCompletedIds([]);
      void clearProgress();
      navigate({ name: 'practice', startId });
    },
    [progress],
  );

  const exitPractice = useCallback(() => {
    void loadProgress().then(setProgress);
    navigate({ name: 'catalog' });
  }, []);

  useEffect(() => {
    if (route.name !== 'practice') return;
    if (route.resume) {
      void loadProgress().then((p) => {
        setProgress(p);
        setPracticeCompletedIds(p?.completedIds ?? []);
        if (p && p.currentAsanaId !== route.startId) {
          navigate(
            { name: 'practice', startId: p.currentAsanaId, resume: true },
            true,
          );
        }
      });
    } else {
      setPracticeCompletedIds([]);
    }
  }, [route]);

  const selectedId = route.name === 'asana' ? route.id : null;
  const selectedIndex = PRIMARY_SERIES.findIndex((a) => a.id === selectedId);
  const selected = selectedIndex >= 0 ? PRIMARY_SERIES[selectedIndex] : null;
  const sheetFrameCount = selected ? (POSES[selected.pose]?.figures.length ?? 1) : 1;

  useEffect(() => {
    if (!selected) return;
    setSheetFrame(defaultFrameIndex(selected.pose));
  }, [selected?.id, selected?.pose]);

  useEffect(() => {
    if (route.name === 'practice') return;
    if (route.name === 'asana') {
      showBackButton(goCatalog);
      return () => hideBackButton();
    }
    hideBackButton();
  }, [route, goCatalog]);

  const grouped = useMemo(() => {
    const map = new Map<SectionId, Asana[]>();
    for (const section of SECTIONS) map.set(section.id, []);
    for (const asana of PRIMARY_SERIES) map.get(asana.section)?.push(asana);
    return SECTIONS.map((section) => ({ section, asanas: map.get(section.id) ?? [] }));
  }, []);

  const go = (delta: number) => {
    const next = PRIMARY_SERIES[selectedIndex + delta];
    if (next) openAsana(next.id, true);
  };

  let counter = 0;

  return (
    <LocaleContext.Provider value={locale}>
      {route.name === 'practice' ? (
        <PracticeView
          key={`${route.resume && progress?.currentAsanaId ? progress.currentAsanaId : route.startId}-${route.resume ? 'r' : 'n'}`}
          startId={
            route.resume && progress?.currentAsanaId
              ? progress.currentAsanaId
              : route.startId
          }
          initialCompletedIds={practiceCompletedIds}
          onExit={exitPractice}
        />
      ) : (
        <div className="app">
          <header className="header">
            <div className="header__top">
              <h1>{t(locale, 'appTitle')}</h1>
              <button type="button" className="header__lang" onClick={toggleLocale}>
                {t(locale, 'langSwitch')}
              </button>
            </div>
            <p>
              {t(locale, 'appSubtitle')} · {PRIMARY_SERIES.length}{' '}
              {pluralizeAsana(locale, PRIMARY_SERIES.length)}
            </p>
            <div className="header__actions">
              <button
                type="button"
                className="header__practice"
                onClick={() => startPractice()}
              >
                {t(locale, 'startPractice')}
              </button>
              {progress && (
                <button
                  type="button"
                  className="header__continue"
                  onClick={() => startPractice(undefined, true)}
                >
                  {t(locale, 'continuePractice')}
                </button>
              )}
            </div>
          </header>

          <nav className="section-nav" aria-label="Sections">
            {SECTIONS.map((s) => (
              <a key={s.id} href={`#/section/${s.id}`}>
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
                          onClick={() => openAsana(asana.id)}
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
            <div className="sheet-backdrop" onClick={goCatalog}>
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
                  onClick={() => startPractice(selected.id)}
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
                    disabled={selectedIndex >= PRIMARY_SERIES.length - 1}
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
