/** Озвучка названий асан (Web Speech API). Настройка хранится локально. */

export const VOICE_KEY = 'ashtanga.practice.voice';

export function voiceSupported(): boolean {
  return (
    typeof window !== 'undefined' &&
    typeof window.speechSynthesis !== 'undefined' &&
    typeof window.SpeechSynthesisUtterance !== 'undefined'
  );
}

export function loadVoiceEnabled(): boolean {
  try {
    const v = localStorage.getItem(VOICE_KEY);
    if (v === '0') return false;
    if (v === '1') return true;
  } catch {
    /* ignore */
  }
  return true;
}

export function saveVoiceEnabled(on: boolean): void {
  try {
    localStorage.setItem(VOICE_KEY, on ? '1' : '0');
  } catch {
    /* ignore */
  }
}

export function cancelSpeech(): void {
  if (!voiceSupported()) return;
  try {
    window.speechSynthesis.cancel();
  } catch {
    /* ignore */
  }
}

function pickVoice(locale: 'ru' | 'en'): SpeechSynthesisVoice | undefined {
  try {
    const prefix = locale === 'en' ? 'en' : 'ru';
    return window.speechSynthesis
      .getVoices()
      .find((v) => v.lang?.toLowerCase().startsWith(prefix));
  } catch {
    return undefined;
  }
}

/**
 * Проговаривает название асаны. Возвращает false, если озвучка недоступна
 * (Telegram WebView без Speech API) — вызывающий код просто продолжает таймер.
 */
export function speakAsana(text: string, locale: 'ru' | 'en'): boolean {
  if (!voiceSupported() || !text.trim()) return false;
  try {
    const synth = window.speechSynthesis;
    synth.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = locale === 'en' ? 'en-US' : 'ru-RU';
    utterance.rate = 0.92;
    utterance.pitch = 1;
    utterance.volume = 1;
    const voice = pickVoice(locale);
    if (voice) utterance.voice = voice;
    synth.speak(utterance);
    return true;
  } catch {
    return false;
  }
}

/** Пауза перед стартом таймера: даём договорить название и рассмотреть позу. */
export const VOICE_LEAD_MS = 2000;
