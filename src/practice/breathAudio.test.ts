import { afterEach, describe, expect, it } from 'vitest';
import {
  BREATH_TEMPO_MS,
  loadBreathSound,
  loadBreathTempo,
  saveBreathSound,
  saveBreathTempo,
  SOUND_KEY,
  TEMPO_KEY,
} from './breathAudio';

describe('breathAudio settings', () => {
  afterEach(() => {
    localStorage.removeItem(TEMPO_KEY);
    localStorage.removeItem(SOUND_KEY);
  });

  it('defaults tempo to normal and sound on', () => {
    expect(loadBreathTempo()).toBe('normal');
    expect(loadBreathSound()).toBe(true);
    expect(BREATH_TEMPO_MS.normal).toBe(4000);
  });

  it('persists tempo and sound', () => {
    saveBreathTempo('fast');
    saveBreathSound(false);
    expect(loadBreathTempo()).toBe('fast');
    expect(loadBreathSound()).toBe(false);
    expect(BREATH_TEMPO_MS.fast).toBe(3000);
  });
});
