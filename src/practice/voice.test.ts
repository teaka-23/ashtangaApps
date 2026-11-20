import { afterEach, describe, expect, it } from 'vitest';
import {
  VOICE_KEY,
  VOICE_LEAD_MS,
  cancelSpeech,
  loadVoiceEnabled,
  saveVoiceEnabled,
  speakAsana,
} from './voice';

describe('voice settings', () => {
  afterEach(() => {
    localStorage.removeItem(VOICE_KEY);
  });

  it('defaults to enabled and waits 2 s before the timer', () => {
    expect(loadVoiceEnabled()).toBe(true);
    expect(VOICE_LEAD_MS).toBe(2000);
  });

  it('persists the toggle', () => {
    saveVoiceEnabled(false);
    expect(loadVoiceEnabled()).toBe(false);
    saveVoiceEnabled(true);
    expect(loadVoiceEnabled()).toBe(true);
  });

  it('is a no-op without Speech API (Telegram WebView)', () => {
    expect(speakAsana('Падангустхасана', 'ru')).toBe(false);
    expect(() => cancelSpeech()).not.toThrow();
  });
});
