import { describe, expect, it } from 'vitest';
import { POSES } from './poses';
import { INTERMEDIATE_SERIES, INTERMEDIATE_UNIQUE } from './intermediateSeries';
import { PRIMARY_SERIES } from './primarySeries';
import { SERIES, SERIES_ORDER, contentKeyForAsana, getSeries } from './series';

describe('series registry', () => {
  it('lists primary and intermediate', () => {
    expect(SERIES_ORDER).toEqual(['primary', 'intermediate']);
    expect(getSeries('primary').asanas).toBe(PRIMARY_SERIES);
    expect(getSeries('intermediate').asanas).toBe(INTERMEDIATE_SERIES);
  });

  it('keeps unique asana ids within each series', () => {
    for (const id of SERIES_ORDER) {
      const ids = SERIES[id].asanas.map((a) => a.id);
      expect(new Set(ids).size, id).toBe(ids.length);
    }
  });

  it('has a pose and beginner note for every asana', () => {
    for (const id of SERIES_ORDER) {
      for (const asana of SERIES[id].asanas) {
        expect(POSES[asana.pose], `${id}:${asana.id}`).toBeTruthy();
        expect(asana.note?.trim(), `${id}:${asana.id} note`).toBeTruthy();
      }
    }
  });

  it('builds intermediate from opening + unique + finishing', () => {
    expect(INTERMEDIATE_UNIQUE.length).toBe(37);
    expect(INTERMEDIATE_SERIES.length).toBeGreaterThan(50);
    expect(INTERMEDIATE_SERIES[0].id).toBe('int-surya-a');
    expect(INTERMEDIATE_SERIES.some((a) => a.id === 'pasasana')).toBe(true);
    expect(INTERMEDIATE_SERIES.at(-1)?.id).toMatch(/^int-/);
  });

  it('strips int- content keys', () => {
    expect(contentKeyForAsana('int-surya-a')).toBe('surya-a');
    expect(contentKeyForAsana('pasasana')).toBe('pasasana');
  });
});
