import { describe, expect, it } from 'vitest';
import { INTERMEDIATE_UNIQUE } from '../data/intermediateSeries';
import { PRIMARY_SERIES } from '../data/primarySeries';
import { contentKeyForAsana } from '../data/series';
import {
  asanaDescription,
  asanaDisplayName,
  asanaDrishti,
  pluralizeAsana,
  seriesTitle,
  t,
} from './index';
import { ENGLISH_NAME } from './content';

describe('i18n', () => {
  it('translates UI strings', () => {
    expect(t('ru', 'startPractice')).toBe('Начать практику');
    expect(t('en', 'startPractice')).toBe('Start practice');
    expect(seriesTitle('primary', 'ru')).toBe('Первая серия');
    expect(seriesTitle('intermediate', 'en')).toBe('Intermediate Series');
  });

  it('pluralizes asana', () => {
    expect(pluralizeAsana('ru', 1)).toBe('асана');
    expect(pluralizeAsana('ru', 3)).toBe('асаны');
    expect(pluralizeAsana('ru', 11)).toBe('асан');
    expect(pluralizeAsana('en', 1)).toBe('asana');
    expect(pluralizeAsana('en', 2)).toBe('asanas');
  });

  it('has english names for all primary asanas', () => {
    for (const asana of PRIMARY_SERIES) {
      expect(ENGLISH_NAME[asana.id], asana.id).toBeTruthy();
      expect(asanaDisplayName(asana, 'en')).toBe(ENGLISH_NAME[asana.id]);
      expect(asanaDisplayName(asana, 'ru')).toBe(asana.russian);
    }
  });

  it('has english names for intermediate unique asanas', () => {
    for (const asana of INTERMEDIATE_UNIQUE) {
      expect(ENGLISH_NAME[asana.id], asana.id).toBeTruthy();
      expect(asanaDisplayName(asana, 'en')).toBe(ENGLISH_NAME[asana.id]);
    }
  });

  it('resolves english names for int- clones via content key', () => {
    const clone = {
      ...PRIMARY_SERIES[0],
      id: `int-${PRIMARY_SERIES[0].id}`,
    };
    expect(contentKeyForAsana(clone.id)).toBe(PRIMARY_SERIES[0].id);
    expect(asanaDisplayName(clone, 'en')).toBe(ENGLISH_NAME[PRIMARY_SERIES[0].id]);
  });

  it('translates known drishti', () => {
    const asana = PRIMARY_SERIES.find((a) => a.drishti === 'Нос');
    expect(asana).toBeTruthy();
    expect(asanaDrishti(asana!, 'en')).toBe('Nose');
  });

  it('builds accessible description', () => {
    const asana = PRIMARY_SERIES.find((a) => a.id === 'padangusthasana')!;
    const desc = asanaDescription(asana, 'en');
    expect(desc).toContain('Padangusthasana');
    expect(desc).toContain('Big Toe Pose');
    expect(desc).toContain('Vinyasas');
  });
});
