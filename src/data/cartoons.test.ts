import { describe, expect, it } from 'vitest';
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

  it('leaves second-series-only poses on the old renderer', () => {
    expect(cartoonFrames('pasasana')).toBeUndefined();
  });
});
