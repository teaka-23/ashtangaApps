import { describe, expect, it } from 'vitest';
import { cartoonFrames } from './cartoons';
import { POSES } from './poses';
import { ADVANCED_SERIES, ADVANCED_UNIQUE } from './advancedSeries';
import { INTERMEDIATE_SERIES, INTERMEDIATE_UNIQUE } from './intermediateSeries';
import { PRIMARY_SERIES } from './primarySeries';
import { SERIES, SERIES_ORDER, contentKeyForAsana, getSeries } from './series';

describe('series registry', () => {
  it('lists primary, intermediate and advanced', () => {
    expect(SERIES_ORDER).toEqual(['primary', 'intermediate', 'advanced']);
    expect(getSeries('primary').asanas).toBe(PRIMARY_SERIES);
    expect(getSeries('intermediate').asanas).toBe(INTERMEDIATE_SERIES);
    expect(getSeries('advanced').asanas).toBe(ADVANCED_SERIES);
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
        if (!asana.illustrationPending) {
          const hasFigure = Boolean(POSES[asana.pose] || cartoonFrames(asana.pose));
          expect(hasFigure, `${id}:${asana.id}`).toBeTruthy();
        }
        expect(asana.note?.trim(), `${id}:${asana.id} note`).toBeTruthy();
      }
    }
  });

  it('collects advanced series from opening + unique + finishing', () => {
    expect(ADVANCED_UNIQUE.length).toBe(36);
    expect(ADVANCED_SERIES[0].id).toBe('adv-surya-a');
    expect(ADVANCED_SERIES.some((a) => a.id === 'vasisthasana')).toBe(true);
    expect(ADVANCED_SERIES.at(-1)?.id).toMatch(/^adv-/);
    // 36 новых асан пока без иллюстраций — плашка «иллюстрация готовится».
    expect(ADVANCED_UNIQUE.filter((a) => a.illustrationPending).length).toBe(35);
  });

  it('builds intermediate from opening + unique + finishing', () => {
    expect(INTERMEDIATE_UNIQUE.length).toBe(37);
    expect(INTERMEDIATE_SERIES.length).toBeGreaterThan(50);
    expect(INTERMEDIATE_SERIES[0].id).toBe('int-surya-a');
    expect(INTERMEDIATE_SERIES.some((a) => a.id === 'pasasana')).toBe(true);
    expect(INTERMEDIATE_SERIES.at(-1)?.id).toMatch(/^int-/);
  });

  it('orders paschimottanasana variants A–D', () => {
    const ids = PRIMARY_SERIES.map((a) => a.id);
    const start = ids.indexOf('paschimottanasana-a');
    expect(start).toBeGreaterThan(-1);
    expect(ids.slice(start, start + 4)).toEqual([
      'paschimottanasana-a',
      'paschimottanasana-b',
      'paschimottanasana-c',
      'paschimottanasana-d',
    ]);
  });

  it('strips int- content keys', () => {
    expect(contentKeyForAsana('int-surya-a')).toBe('surya-a');
    expect(contentKeyForAsana('pasasana')).toBe('pasasana');
  });
});
