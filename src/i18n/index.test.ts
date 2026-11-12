import { describe, expect, it } from 'vitest';
import { PRIMARY_SERIES } from '../data/primarySeries';
import {
  asanaDescription,
  asanaDisplayName,
  asanaDrishti,
  pluralizeAsana,
  t,
} from './index';
import { ENGLISH_NAME } from './content';

describe('i18n', () => {
  it('translates UI strings', () => {
    expect(t('ru', 'startPractice')).toBe('Начать практику');
    expect(t('en', 'startPractice')).toBe('Start practice');
  });

  it('pluralizes asana', () => {
    expect(pluralizeAsana('ru', 1)).toBe('асана');
    expect(pluralizeAsana('ru', 3)).toBe('асаны');
    expect(pluralizeAsana('ru', 11)).toBe('асан');
    expect(pluralizeAsana('en', 1)).toBe('asana');
    expect(pluralizeAsana('en', 2)).toBe('asanas');
  });

  it('has english names for all asanas', () => {
    for (const asana of PRIMARY_SERIES) {
      expect(ENGLISH_NAME[asana.id], asana.id).toBeTruthy();
      expect(asanaDisplayName(asana, 'en')).toBe(ENGLISH_NAME[asana.id]);
      expect(asanaDisplayName(asana, 'ru')).toBe(asana.russian);
    }
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
