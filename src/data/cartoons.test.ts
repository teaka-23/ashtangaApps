import { describe, expect, it } from 'vitest';
import { INTERMEDIATE_SERIES } from './intermediateSeries';
import { PRIMARY_SERIES } from './primarySeries';
import { cartoonFrames, poseFrameCount } from './cartoons';

describe('cartoon illustrations', () => {
  it('covers every primary pose', () => {
    for (const asana of PRIMARY_SERIES) {
      expect(cartoonFrames(asana.pose)?.length, asana.pose).toBeGreaterThan(0);
    }
  });

  it('keeps the surya vinyasa counts', () => {
    expect(cartoonFrames('surya-a')).toHaveLength(11);
    expect(cartoonFrames('surya-b')).toHaveLength(19);
    expect(poseFrameCount('surya-a')).toBe(11);
  });

  it('shows all three utthita hasta frames', () => {
    // Третий кадр (баланс без рук) был нарисован, но не подключён к показу.
    expect(cartoonFrames('utthita-hasta')).toHaveLength(3);
  });

  it('shows both navasana frames', () => {
    // Кадр B (подъём между подходами) был нарисован, но не подключён к показу.
    expect(cartoonFrames('navasana')).toHaveLength(2);
  });

  it('wires paschimottanasana D illustration', () => {
    // Файл 29-paschimattanasana-d.svg был нарисован, но асаны D не было в серии.
    expect(PRIMARY_SERIES.some((a) => a.pose === 'paschimottanasana-d')).toBe(true);
    expect(cartoonFrames('paschimottanasana-d')).toHaveLength(1);
  });

  it('covers every intermediate pose', () => {
    for (const asana of INTERMEDIATE_SERIES) {
      expect(cartoonFrames(asana.pose)?.length, asana.pose).toBeGreaterThan(0);
    }
  });
});
