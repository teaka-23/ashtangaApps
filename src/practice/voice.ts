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

let speakToken = 0;
let pendingSpeak: number | null = null;
/** Chrome собирает utterance, если на него нет ссылки, и молчит. */
let activeUtterance: SpeechSynthesisUtterance | null = null;
/** Последняя фраза: гасит дубль «клик → эффект компонента» в пределах 1.5 с. */
let lastText = '';
let lastAt = 0;

function rememberSpoken(text: string): void {
  lastText = text;
  lastAt = Date.now();
}

function isRecentDuplicate(text: string): boolean {
  return text === lastText && Date.now() - lastAt < 1500;
}

export function cancelSpeech(): void {
  speakToken += 1;
  if (pendingSpeak !== null) {
    window.clearTimeout(pendingSpeak);
    pendingSpeak = null;
  }
  activeUtterance = null;
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

/** Для диагностики: какой голос выберется и сколько их всего. */
export function voiceInfo(locale: 'ru' | 'en'): { count: number; label: string } {
  if (!voiceSupported()) return { count: 0, label: 'нет Speech API' };
  try {
    const all = window.speechSynthesis.getVoices();
    const v = pickVoice(locale);
    return { count: all.length, label: v ? `${v.name} · ${v.lang}` : 'нет голоса на языке' };
  } catch {
    return { count: 0, label: 'ошибка Speech API' };
  }
}

function startUtterance(utterance: SpeechSynthesisUtterance, token: number): void {
  if (token !== speakToken || activeUtterance !== utterance) return;
  const synth = window.speechSynthesis;
  try {
    if (synth.paused) synth.resume();
    synth.speak(utterance);
    // Некоторые WebView стартуют в paused — мягко будим.
    window.setTimeout(() => {
      if (token !== speakToken || activeUtterance !== utterance) return;
      if (!synth.speaking && !synth.pending && synth.paused) synth.resume();
    }, 400);
  } catch {
    /* ignore */
  }
}

function buildUtterance(text: string, locale: 'ru' | 'en'): SpeechSynthesisUtterance {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = locale === 'en' ? 'en-US' : 'ru-RU';
  utterance.rate = 0.92;
  utterance.pitch = 1;
  utterance.volume = 1;
  const voice = pickVoice(locale);
  if (voice) utterance.voice = voice;
  return utterance;
}

/**
 * Проговаривает фразу немедленно. Вызывать из обработчика клика: так фраза
 * попадает в user gesture (важно для Safari/iOS).
 */
export function speakNow(text: string, locale: 'ru' | 'en'): boolean {
  if (!voiceSupported() || !text.trim()) return false;
  try {
    const synth = window.speechSynthesis;
    if (synth.speaking || synth.pending) synth.cancel();
    const token = ++speakToken;
    const utterance = buildUtterance(text, locale);
    activeUtterance = utterance;
    rememberSpoken(text);
    startUtterance(utterance, token);
    return true;
  } catch {
    return false;
  }
}

/**
 * Проговаривает название асаны (не из клика). Если предыдущая фраза ещё
 * звучит — отмена и запуск идут с паузой 40 мс: в Chrome `cancel()` и `speak()`
 * в одном тике гасят новую фразу. Возвращает false без Speech API.
 */
export function speakAsana(text: string, locale: 'ru' | 'en'): boolean {
  if (!voiceSupported() || !text.trim()) return false;
  if (isRecentDuplicate(text)) return true;
  try {
    const synth = window.speechSynthesis;
    const needCancel = synth.speaking || synth.pending;
    if (needCancel) synth.cancel();
    const token = ++speakToken;
    const utterance = buildUtterance(text, locale);
    activeUtterance = utterance;
    rememberSpoken(text);

    // Без отмены говорим сразу: так вызов ближе к user gesture и не теряется.
    if (!needCancel) {
      startUtterance(utterance, token);
      return true;
    }
    pendingSpeak = window.setTimeout(() => {
      pendingSpeak = null;
      startUtterance(utterance, token);
    }, 40);
    return true;
  } catch {
    return false;
  }
}

/** Пауза перед стартом таймера: даём договорить название и рассмотреть позу. */
export const VOICE_LEAD_MS = 2000;
