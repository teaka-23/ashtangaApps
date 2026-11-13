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

  it('covers every intermediate pose', () => {
    for (const asana of INTERMEDIATE_SERIES) {
      expect(cartoonFrames(asana.pose)?.length, asana.pose).toBeGreaterThan(0);
    }
  });
});
