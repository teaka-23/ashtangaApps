import { describe, expect, it } from 'vitest';
import { POSES } from './poses';

describe('POSES data', () => {
  it('uses arms/legs on every figure (no strokes)', () => {
    for (const [id, def] of Object.entries(POSES)) {
      expect(def.figures.length, id).toBeGreaterThan(0);
      for (const [i, fig] of def.figures.entries()) {
        expect(fig.arms, `${id}[${i}].arms`).toBeTruthy();
        expect(fig.legs, `${id}[${i}].legs`).toBeTruthy();
        expect(
          (fig as { strokes?: unknown }).strokes,
          `${id}[${i}].strokes`,
        ).toBeUndefined();
      }
    }
  });
});
