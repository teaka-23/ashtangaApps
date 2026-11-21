import { afterEach, describe, expect, it } from 'vitest';
import {
  VOICE_KEY,
  VOICE_LEAD_MS,
  cancelSpeech,
  forSpeech,
  hasStressMark,
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

describe('speech text', () => {
  it('keeps the stress mark (U+0301) intact', () => {
    const name = 'Урдхва Куккута́сана Б';
    expect(forSpeech(name)).toBe(name);
    expect(hasStressMark(name)).toBe(true);
    expect(hasStressMark('Урдхва Куккутасана')).toBe(false);
  });

  it('reads variant letters as Russian, not Latin', () => {
    expect(forSpeech('Виранчьясана A1')).toBe('Виранчьясана А1');
    expect(forSpeech('Поза B')).toBe('Поза Б');
    expect(forSpeech('Поза C')).toBe('Поза В');
    // Латиница внутри слова не трогаем (IAST-имена для en-озвучки).
    expect(forSpeech('Aṣṭāvakrāsana A')).toBe('Aṣṭāvakrāsana А');
  });

  it('turns separators into natural pauses', () => {
    expect(forSpeech('  Шаваса́на · отдых  ')).toBe('Шаваса́на, отдых');
  });
});
