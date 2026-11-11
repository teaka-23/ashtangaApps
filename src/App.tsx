import { useEffect, useMemo, useState } from 'react';
import { PRIMARY_SERIES, SECTIONS, type Asana, type SectionId } from './data/primarySeries';
import { AsanaFigure } from './components/AsanaFigure';
import { initTelegram } from './telegram';
import './App.css';

function pluralizeAsana(count: number): string {
  const n = count % 100;
  if (n >= 5 && n <= 20) return 'асан';
  const n1 = count % 10;
  if (n1 === 1) return 'асана';
  if (n1 >= 2 && n1 <= 4) return 'асана';
  return 'асан';
}

export default function App() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    initTelegram();
  }, []);

  const grouped = useMemo(() => {
    const map = new Map<SectionId, Asana[]>();
    for (const section of SECTIONS) map.set(section.id, []);
    for (const asana of PRIMARY_SERIES) map.get(asana.section)?.push(asana);
    return SECTIONS.map((section) => ({ section, asanas: map.get(section.id) ?? [] }));
  }, []);

  const selectedIndex = PRIMARY_SERIES.findIndex((a) => a.id === selectedId);
  const selected = selectedIndex >= 0 ? PRIMARY_SERIES[selectedIndex] : null;

  const go = (delta: number) => {
    const next = PRIMARY_SERIES[selectedIndex + delta];
    if (next) setSelectedId(next.id);
  };

  let counter = 0;

  return (
    <div className="app">
      <header className="header">
        <h1>Аштанга-йога</h1>
        <p>Йога Чикитса (первая серия аштанга-виньяса-йоги) · {PRIMARY_SERIES.length} {pluralizeAsana(PRIMARY_SERIES.length)}</p>
      </header>

      <nav className="section-nav">
        {SECTIONS.map((s) => (
          <a key={s.id} href={`#section-${s.id}`}>
            {s.title}
          </a>
        ))}
      </nav>

      <main>
        {grouped.map(({ section, asanas }) => (
          <section key={section.id} id={`section-${section.id}`} className="section">
            <div className="section__header">
              <h2>{section.title}</h2>
              <span>{section.subtitle}</span>
            </div>
            <ul className="asana-list">
              {asanas.map((asana) => {
                counter += 1;
                return (
                  <li key={asana.id}>
                    <button className="asana-card" onClick={() => setSelectedId(asana.id)}>
                      <span className="asana-card__num">{counter}</span>
                      <AsanaFigure pose={asana.pose} className="asana-card__figure" />
                      <span className="asana-card__text">
                        <span className="asana-card__sanskrit">{asana.sanskrit}</span>
                        <span className="asana-card__transcription">{asana.transcription}</span>
                        <span className="asana-card__russian">{asana.russian}</span>
                      </span>
                      {asana.vinyasa !== undefined && (
                        <span className="asana-card__vinyasa">{asana.vinyasa}</span>
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
        <div className="sheet-backdrop" onClick={() => setSelectedId(null)}>
          <div className="sheet" onClick={(e) => e.stopPropagation()}>
            <div className="sheet__grip" />
            <AsanaFigure pose={selected.pose} className="sheet__figure" columns={3} />
            <h3 className="sheet__sanskrit">{selected.sanskrit}</h3>
            <p className="sheet__transcription">{selected.transcription}</p>
            <p className="sheet__russian">{selected.russian}</p>
            <dl className="sheet__meta">
              {selected.vinyasa !== undefined && (
                <>
                  <dt>Виньясы</dt>
                  <dd>{selected.vinyasa}</dd>
                </>
              )}
              {selected.drishti && (
                <>
                  <dt>Дришти</dt>
                  <dd>{selected.drishti}</dd>
                </>
              )}
            </dl>
            {selected.note && <p className="sheet__note">{selected.note}</p>}
            <div className="sheet__nav">
              <button disabled={selectedIndex <= 0} onClick={() => go(-1)}>
                ← Назад
              </button>
              <button disabled={selectedIndex >= PRIMARY_SERIES.length - 1} onClick={() => go(1)}>
                Далее →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
