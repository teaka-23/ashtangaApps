import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { poseFrameCount } from './data/cartoons';
import { getMantra, MANTRAS, type MantraId } from './data/mantras';
import { getSeries, SERIES_ORDER, type SeriesId } from './data/series';
import type { Asana } from './data/types';
import { FeedbackButton } from './components/FeedbackButton';
import { MantraAudioButton } from './components/MantraAudioButton';
import { PosePicture } from './components/PosePicture';
import { Sheet } from './components/Sheet';
import { SpeakerIcon } from './components/SpeakerIcon';
import { bindSessionLifecycle, startSession } from './analytics/session';
import { hideBackButton, initPlatform, showBackButton } from './platform';
import { clearProgress, loadProgress, type PracticeProgress } from './practice/progress';
import { loadVoiceEnabled, speakNow, voiceSupported } from './practice/voice';
import { PracticeView } from './practice/PracticeView';
import { navigate, parseHash, type Route } from './routing';
import {
  LocaleContext,
  asanaDisplayName,
  asanaDrishti,
  asanaNote,
  asanaSecondaryName,
  asanaSpeechName,
  pluralizeAsana,
  sectionNavLabel,
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

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  Boolean(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches);

/** Series-specific visual config */
const SERIES_VISUAL: Record<SeriesId, { accentBg: string; accentColor: string; watermarkPose: string }> = {
  primary: { accentBg: 'var(--primary-accent-bg)', accentColor: 'var(--primary-accent)', watermarkPose: 'urdhva-dhanurasana' },
  intermediate: { accentBg: 'var(--intermediate-accent-bg)', accentColor: 'var(--intermediate-accent)', watermarkPose: 'pincha-mayurasana' },
  advanced: { accentBg: 'var(--advanced-accent-bg)', accentColor: 'var(--advanced-accent)', watermarkPose: 'mayurasana' },
};

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
  const [mantraId, setMantraId] = useState<MantraId | null>(null);
  const [queryState, setQueryState] = useState<{
    seriesId: SeriesId | null;
    value: string;
  }>({ seriesId: null, value: '' });
  const [pendingStart, setPendingStart] = useState<{
    seriesId: SeriesId;
    fromId?: string;
  } | null>(null);
  const catalogScrollRef = useRef<number | null>(null);

  const activeSeriesId: SeriesId | null =
    route.name === 'home' ? null : route.seriesId;
  const series = activeSeriesId ? getSeries(activeSeriesId) : null;
  const progress = activeSeriesId ? (progressBySeries[activeSeriesId] ?? null) : null;
  // Запрос привязан к серии: при переходе в другую серию он не протекает.
  const query = queryState.seriesId === activeSeriesId ? queryState.value : '';
  const setQuery = (value: string) =>
    setQueryState({ seriesId: activeSeriesId, value });

  useEffect(() => {
    document.documentElement.lang = locale;
    void initPlatform().then(() => {
      bindSessionLifecycle();
      startSession('app');
    });
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
    if (route.name !== 'catalog') return;
    // Возврат из шторки: сохраняем точную позицию списка, а не прыгаем наверх.
    const saved = catalogScrollRef.current;
    if (saved !== null) {
      catalogScrollRef.current = null;
      window.scrollTo(0, saved);
      return;
    }
    if (!route.sectionId) return;
    const el = document.getElementById(`section-${route.sectionId}`);
    el?.scrollIntoView({
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
      block: 'start',
    });
  }, [route]);

  const goHome = useCallback(() => navigate({ name: 'home' }), []);

  const goCatalog = useCallback((seriesId: SeriesId, sectionId?: string) => {
    navigate({ name: 'catalog', seriesId, sectionId });
  }, []);

  const openAsana = useCallback(
    (seriesId: SeriesId, id: string, replace = false) => {
      if (route.name === 'catalog') catalogScrollRef.current = window.scrollY;
      navigate({ name: 'asana', seriesId, id }, replace);
    },
    [route.name],
  );

  const beginPractice = useCallback(
    (seriesId: SeriesId, fromId?: string, resume = false) => {
      const seriesDef = getSeries(seriesId);
      const seriesProgress = progressBySeries[seriesId];
      const startId = fromId ?? seriesDef.asanas[0].id;

      // Озвучка первой асаны запускается прямо из клика: так фраза попадает в
      // user gesture (Safari/iOS иначе может промолчать).
      const targetId = resume && seriesProgress ? seriesProgress.currentAsanaId : startId;
      const target = seriesDef.asanas.find((a) => a.id === targetId) ?? seriesDef.asanas[0];
      if (target && loadVoiceEnabled()) {
        speakNow(asanaSpeechName(target, LOCALE), LOCALE);
      }

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

  /**
   * «Начать практику» при наличии прогресса не стирает его молча:
   * сначала подтверждение. «Продолжить» идёт напрямую в beginPractice.
   */
  const requestPracticeStart = useCallback(
    (seriesId: SeriesId, fromId?: string) => {
      if (progressBySeries[seriesId]) {
        setPendingStart({ seriesId, fromId });
        return;
      }
      beginPractice(seriesId, fromId, false);
    },
    [beginPractice, progressBySeries],
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
    if (route.name !== 'practice' || !route.resume) return;
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
  }, [route]);

  const selectedId = route.name === 'asana' ? route.id : null;
  const selectedIndex =
    series && selectedId
      ? series.asanas.findIndex((a) => a.id === selectedId)
      : -1;
  const selected =
    series && selectedIndex >= 0 ? series.asanas[selectedIndex] : null;
  const sheetMultiFrame = selected
    ? poseFrameCount(selected.pose) > 1
    : false;

  useEffect(() => {
    if (route.name === 'practice') return;
    if (route.name === 'asana') {
      showBackButton(() => goCatalog(route.seriesId, selected?.section));
      return () => hideBackButton();
    }
    if (route.name === 'catalog') {
      showBackButton(goHome);
      return () => hideBackButton();
    }
    hideBackButton();
  }, [route, goHome, goCatalog, selected?.section]);

  const grouped = useMemo(() => {
    if (!activeSeriesId) return [];
    const activeSeries = getSeries(activeSeriesId);
    const needle = query.trim().toLocaleLowerCase('ru');
    const matches = (asana: Asana) => {
      if (!needle) return true;
      return [asana.sanskrit, asana.transcription, asanaDisplayName(asana, locale)]
        .join(' ')
        .toLocaleLowerCase('ru')
        .includes(needle);
    };
    const map = new Map<string, { asana: Asana; num: number }[]>();
    for (const section of activeSeries.sections) map.set(section.id, []);
    activeSeries.asanas.forEach((asana, idx) => {
      if (matches(asana)) map.get(asana.section)?.push({ asana, num: idx + 1 });
    });
    return activeSeries.sections
      .map((section) => ({ section, asanas: map.get(section.id) ?? [] }))
      .filter((group) => !needle || group.asanas.length > 0);
  }, [activeSeriesId, query, locale]);

  const completedIds = new Set(progress?.completedIds ?? []);
  const filteredCount = grouped.reduce((n, group) => n + group.asanas.length, 0);

  const go = (delta: number) => {
    if (!series || !activeSeriesId) return;
    const next = series.asanas[selectedIndex + delta];
    if (next) openAsana(activeSeriesId, next.id, true);
  };

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
          initialCompletedIds={route.resume ? practiceCompletedIds : []}
          onExit={exitPractice}
        />
      ) : route.name === 'home' ? (
        <div className="app">
          <header className="header">
            <h1>{t(locale, 'appTitle')}</h1>
            <p>{t(locale, 'appSubtitle')}</p>
          </header>

          <div className="mantra-picker">
            <div className="mantra-segmented" role="group" aria-label={t(locale, 'mantras')}>
              {MANTRAS.map((mantra) => (
                <button
                  key={mantra.id}
                  type="button"
                  className="mantra-segment"
                  onClick={() => setMantraId(mantra.id)}
                >
                  <svg className="mantra-segment__icon" viewBox="0 0 24 24" aria-hidden="true" width="18" height="18">
                    <text x="50%" y="58%" dominant-baseline="middle" text-anchor="middle" font-size="18">ॐ</text>
                  </svg>
                  <span>{mantra.buttonLabel}</span>
                </button>
              ))}
            </div>
          </div>

          <main className="series-picker" aria-label={t(locale, 'chooseSeries')}>
            {SERIES_ORDER.map((id) => {
              const def = getSeries(id);
              const p = progressBySeries[id];
              const visual = SERIES_VISUAL[id];
              const completedCount = p?.completedIds.length ?? 0;
              const totalCount = def.asanas.length;
              const progressPercent = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;
              return (
                <article
                  key={id}
                  className="series-card"
                  style={{ '--series-accent-bg': visual.accentBg, '--series-accent': visual.accentColor } as React.CSSProperties}
                  role="button"
                  tabIndex={0}
                  aria-label={`${seriesTitle(id, locale)}. ${t(locale, 'openCatalog')}`}
                  onClick={() => goCatalog(id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      goCatalog(id);
                    }
                  }}
                >
                  <div className="series-card__content">
                    <div className="series-card__text">
                      <h2>{seriesTitle(id, locale)}</h2>
                      <p className="series-card__sub">{seriesSubtitle(id, locale)}</p>
                      <span className="series-card__badge">
                        {totalCount} {pluralizeAsana(locale, totalCount)}
                      </span>
                    </div>
                    <div className="series-card__preview" aria-hidden="true">
                      <PosePicture
                        pose={visual.watermarkPose}
                        className="series-card__watermark"
                        thumbnail
                      />
                    </div>
                  </div>
                  {p && (
                    <div className="series-card__progress" role="progressbar" aria-valuenow={progressPercent} aria-valuemin={0} aria-valuemax={100} aria-label={t(locale, 'practiceProgress')}>
                      <div className="series-card__progress-bar" style={{ width: `${progressPercent}%` }} />
                    </div>
                  )}
                  <div
                    className="series-card__actions"
                    onClick={(e) => e.stopPropagation()}
                    onKeyDown={(e) => e.stopPropagation()}
                  >
                    <button
                      type="button"
                      className="header__practice"
                      onClick={() => requestPracticeStart(id)}
                    >
                      {t(locale, 'startPractice')}
                    </button>
                    {p && (
                      <button
                        type="button"
                        className="header__continue"
                        onClick={() => beginPractice(id, undefined, true)}
                      >
                        {t(locale, 'continuePractice')}
                      </button>
                    )}
                  </div>
                </article>
              );
            })}
          </main>

          <details className="about-ashtanga">
            <summary>Об Аштанга-виньяса-йоге</summary>
            <div className="about-ashtanga__body">
              <p>
                До XX века любые физические практики (выполнение асан,
                очистительных и дыхательных техник) относили к хатха-йоге. Все
                известные современные стили развивались уже в XX веке, особенно
                бурно — в последние два-три десятилетия. На сегодняшний день
                существует более сотни видов и стилей йоги. Аштанга-виньяса-йога —
                один из самых известных и устоявшихся современных стилей.
              </p>
              <p>
                Основателем этого направления стал индиец Паттабхи Джойс: в
                1948 году он открыл в Майсуре Аштанга-йога-нилаям — институт,
                где преподавал этот стиль. Он был учеником другого знаменитого
                учителя — Шри Кришнамачарьи, которого называют «отцом современной
                йоги», потому что именно Кришнамачарья в 1930-х годах разработал
                ту систему разнообразных и сложных асан, которую сейчас практикует
                весь мир.
              </p>
              <p>
                Слово «аштанга» позаимствовано из «Йога-сутр» Патанджали, где оно
                означает «восемь ступеней» йоги: яму, нияму, асану, пранаяму,
                пратьяхару, дхарану, дхьяну и самадхи (ашт — «восемь», анга —
                «часть, ступень»). Джойс считал, что сперва необходимо освоить
                третью ступень — асаны — и только после этого овладевать семью
                остальными. По другой версии, название могло быть позаимствовано
                у старой разминки из системы гимнастических упражнений данда —
                Аштанг-данды, включавшей позу Аштанга Намаскара (ныне её заменила
                Чатуранга Дандасана), в которой земли касаются восемь частей тела.
              </p>
              <p>
                Виньяса обозначает динамическую связку, последовательность поз,
                выполняемых в сочетании с дыханием. Виньясы — основа практики
                Аштанга-виньяса-йоги: на протяжении всего занятия переход от одной
                асаны к другой выполняется именно через виньясы.
              </p>
              <p>
                Адепты Аштанга-виньяса-йоги утверждают, что традиция не меняется
                с течением времени и последовательности поз неизменны с самого
                начала. Однако некоторые ученики Джойса, обучавшиеся у него на
                первом этапе, свидетельствуют, что нынешняя практика во многом
                отличается от ранней. Так, Нэнси Гилгофф рассказывает, что в
                начальной версии первой серии не было Уткатасаны,
                Вирабхадрасаны I и II, Паривритта Триконасаны и Паривритта
                Паршваконасаны — эти позы были добавлены позже.
              </p>
              <p>
                Аштанга-виньяса-йога — очень энергичная, динамичная практика.
                Преподают её в двух форматах: лед-класс, когда преподаватель
                показывает и называет позы, а практикующие повторяют за ним под
                счёт, и майсор-класс — основной формат, когда каждый занимающийся
                выполняет позы в своём темпе (даже в зал они могут приходить в
                разное время), а преподаватель работает с каждым по отдельности,
                помогает исправить ошибки и отстроить асану. Каждый практикующий
                должен запомнить последовательность поз серии и воспроизводить её
                по памяти.
              </p>
              <p>
                Аштанга-виньяса-йога включает в себя шесть серий асан, которые
                различаются по уровню сложности: первую серию (о ней много
                информации в интернете), промежуточную, или вторую серию, и
                продвинутую, состоящую из четырёх частей. К более сложной серии
                практикующий переходит только после того, как освоит начальные.
                Практика Аштанги обычно начинается с нескольких повторений Сурья
                Намаскар А и Сурья Намаскар B (классически — по пять).
              </p>
              <p>
                Во время практики занимающиеся дышат особым шипящим дыханием
                Уджайи, хотя для новичков часто делают исключение, и они дышат
                естественным образом. Аштангисты считают, что Уджайи помогает
                сосредоточиться на внутренних ощущениях, успокоиться, легче
                перенести нагрузку и при этом тренировать сердце и лёгкие.
                Внимание в позах концентрируется на специальных точках —
                определённых местах тела — дришти. Это могут быть кончик носа,
                точка между бровей, пупок, пальцы рук и т. д. Дришти тоже
                способствует сосредоточению. Так, в объединении последовательности
                поз, вдохов и выдохов и концентрации-дришти Аштанга-виньяса, по
                мнению аштангистов, превращается в настоящую медитацию в движении.
                До и после практики исполняется мантра.
              </p>
              <p>
                Аштанга-виньяса-йога — очень цельная и физически сложная
                практика, доступная далеко не всем. Её цель — развитие силы и
                гибкости. Основатель стиля Паттабхи Джойс утверждал, что не йога
                должна приспосабливаться под возможности человека, а наоборот —
                человек должен расти до возможностей, которые предоставляет ему
                йога. Однако те, кто вливается в практику и занимается регулярно,
                демонстрируют превосходную физическую силу по сравнению с
                последователями других стилей. Аштангисты занимаются шесть дней
                в неделю, как правило рано утром, а один день отдыхают. Воду во
                время практики не пьют. Аштангисты, надо сказать, очень привержены
                своей традиции; они верят в то, что эта практика возникла в
                глубокой древности и с тех пор оставалась без изменений, что это
                и есть классическая йога в прямом смысле.
              </p>
              <p>
                Основатель Аштанга-виньяса-йоги Паттабхи Джойс умер в 2009 году в
                возрасте 93 лет. После его смерти руководителем Аштанга-центра в
                Майсуре (KPJAYI, ныне Sharath Yoga Centre) стал его внук Шарат
                Джойс, который ушёл из жизни в ноябре 2024 года. Сертифицированным
                преподавателем Аштанга-виньяса-йоги может стать только тот, кто
                прошёл длительное, на протяжении многих лет, обучение в этом
                центре.
              </p>
            </div>
          </details>

          <FeedbackButton context={{ screen: '#/' }} />

          {mantraId && (
            <Sheet
              onClose={() => setMantraId(null)}
              labelledBy="mantra-title"
              closeLabel={t(locale, 'close')}
              className="mantra-sheet"
            >
                <div className="sheet__grip" />
                <h3 className="sheet__sanskrit" id="mantra-title">
                  {getMantra(mantraId).title}
                </h3>
                {getMantra(mantraId).note && (
                  <p className="sheet__note mantra-sheet__note">
                    {getMantra(mantraId).note}
                  </p>
                )}
                <MantraAudioButton id={mantraId} />
                <h4 className="mantra-sheet__heading">Произношение</h4>
                <p className="mantra-sheet__text">
                  {getMantra(mantraId).pronunciation.map((line, i) => (
                    <Fragment key={i}>
                      {line}
                      <br />
                    </Fragment>
                  ))}
                </p>
                <h4 className="mantra-sheet__heading">Дословный перевод</h4>
                <p className="mantra-sheet__text">
                  {getMantra(mantraId).translation.map((line, i) => (
                    <Fragment key={i}>
                      {line}
                      <br />
                    </Fragment>
                  ))}
                </p>
            </Sheet>
          )}
        </div>
      ) : (
        <div className="app">
          <header className="header">
            <button type="button" className="header__back-series" onClick={goHome}>
              {t(locale, 'backToSeries')}
            </button>
            <h1>{seriesTitle(route.seriesId, locale)}</h1>
            <p className="header__series-sub">{seriesSubtitle(route.seriesId, locale)}</p>
            <p className="header__series-count">
              {series!.asanas.length} {pluralizeAsana(locale, series!.asanas.length)}
            </p>
            <div className="header__actions">
              <button
                type="button"
                className="header__practice"
                onClick={() => requestPracticeStart(route.seriesId)}
              >
                {t(locale, 'startPractice')}
              </button>
              {progress && (
                <button
                  type="button"
                  className="header__continue"
                  onClick={() => beginPractice(route.seriesId, undefined, true)}
                >
                  {t(locale, 'continuePractice')}
                </button>
              )}
            </div>
          </header>

          <div className="catalog-search">
            <label htmlFor="asana-search" className="visually-hidden">
              {t(locale, 'searchAsana')}
            </label>
            <input
              id="asana-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t(locale, 'searchAsana')}
              autoComplete="off"
            />
            {query && (
              <button
                type="button"
                className="catalog-search__clear"
                aria-label={t(locale, 'clearSearch')}
                title={t(locale, 'clearSearch')}
                onClick={() => setQuery('')}
              >
                ×
              </button>
            )}
          </div>
          {query && (
            <p className="catalog-search__count">
              {t(locale, 'foundCount').replace(
                '{n}',
                `${filteredCount} ${pluralizeAsana(locale, filteredCount)}`,
              )}
            </p>
          )}

          {!query && (
            <nav className="section-nav" aria-label="Sections">
              {series!.sections.map((s) => (
                <a key={s.id} href={`#/series/${route.seriesId}/section/${s.id}`}>
                  {sectionNavLabel(s, locale)}
                </a>
              ))}
            </nav>
          )}

          <main>
            {query && filteredCount === 0 ? (
              <p className="catalog-empty">{t(locale, 'nothingFound')}</p>
            ) : (
              grouped.map(({ section, asanas }) => (
                <section key={section.id} id={`section-${section.id}`} className="section">
                  <div className="section__header">
                    <h2>{sectionTitle(section, locale)}</h2>
                    <span>{sectionSubtitle(section, locale)}</span>
                  </div>
                  <ul className="asana-list">
                    {asanas.map(({ asana, num }) => {
                      const label = asanaDisplayName(asana, locale);
                      const done = completedIds.has(asana.id);
                      return (
                        <li key={asana.id}>
                          <button
                            type="button"
                            className={`asana-card${asana.modernAddition ? ' asana-card--modern' : ''}${done ? ' asana-card--done' : ''}`}
                            onClick={() => openAsana(route.seriesId, asana.id)}
                            aria-label={`${num}. ${asana.sanskrit}, ${label}${done ? `, ${t(locale, 'completed')}` : ''}`}
                          >
                            <span className="asana-card__num" aria-hidden="true">
                              {num}
                            </span>
                            <PosePicture
                              pose={asana.pose}
                              className="asana-card__figure"
                              thumbnail
                              pending={asana.illustrationPending}
                              pendingLabel={t(locale, 'illustrationSoon')}
                            />
                            <span className="asana-card__text" aria-hidden="true">
                              <span className="asana-card__sanskrit">
                                {asana.modernAddition && (
                                  <span className="asana-card__modern-dot" title={t(locale, 'modernBadge')} />
                                )}
                                {asana.sanskrit}
                              </span>
                              <span className="asana-card__russian">{label}</span>
                            </span>
                            {done && (
                              <span
                                className="asana-card__done"
                                aria-hidden="true"
                                title={t(locale, 'completed')}
                              >
                                ✓
                              </span>
                            )}
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
              ))
            )}
          </main>

          {selected && !pendingStart && (
            <Sheet
              onClose={() => goCatalog(route.seriesId, selected.section)}
              labelledBy="sheet-title"
              closeLabel={t(locale, 'close')}
            >
                <div className="sheet__grip" />
                <PosePicture
                  pose={selected.pose}
                  className={`sheet__figure${sheetMultiFrame ? ' sheet__figure--overview' : ''}`}
                  numbered={sheetMultiFrame}
                  label={asanaDisplayName(selected, locale)}
                  pending={selected.illustrationPending}
                  pendingLabel={t(locale, 'illustrationSoon')}
                />
                <h3 className="sheet__sanskrit" id="sheet-title">
                  {voiceSupported() ? (
                    <button
                      type="button"
                      className="say-name"
                      title={t(locale, 'sayName')}
                      aria-label={`${selected.sanskrit}. ${t(locale, 'sayName')}`}
                      onClick={() => speakNow(asanaSpeechName(selected, locale), LOCALE)}
                    >
                      <span className="say-name__text">{selected.sanskrit}</span>
                      <SpeakerIcon className="say-name__icon" />
                    </button>
                  ) : (
                    selected.sanskrit
                  )}
                </h3>
                {selected.devanagari && (
                  <p className="sheet__devanagari" lang="sa">
                    {selected.devanagari}
                  </p>
                )}
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
                  onClick={() => requestPracticeStart(route.seriesId, selected.id)}
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
            </Sheet>
          )}

        </div>
      )}

      {pendingStart && (
        <Sheet
          onClose={() => setPendingStart(null)}
          labelledBy="reset-progress-title"
          closeLabel={t(locale, 'close')}
        >
          <div className="confirm">
            <h2 id="reset-progress-title">{t(locale, 'resetProgressTitle')}</h2>
            <p>{t(locale, 'resetProgressText')}</p>
            <div className="confirm__actions">
              <button type="button" onClick={() => setPendingStart(null)}>
                {t(locale, 'cancel')}
              </button>
              <button
                type="button"
                className="confirm__primary"
                onClick={() => {
                  const start = pendingStart;
                  setPendingStart(null);
                  beginPractice(start.seriesId, start.fromId, false);
                }}
              >
                {t(locale, 'startOver')}
              </button>
            </div>
          </div>
        </Sheet>
      )}
    </LocaleContext.Provider>
  );
}
