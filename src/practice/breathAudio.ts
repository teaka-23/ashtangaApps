/** Soft Web Audio cues for inhale / exhale — no asset files. */

let ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  const AC = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AC) return null;
  if (!ctx) ctx = new AC();
  return ctx;
}

export async function resumeBreathAudio(): Promise<void> {
  const audio = getCtx();
  if (audio?.state === 'suspended') await audio.resume();
}

/**
 * Short sine blip. Inhale = slightly higher; exhale = lower.
 */
export function playBreathCue(phase: 'inhale' | 'exhale'): void {
  const audio = getCtx();
  if (!audio) return;

  const now = audio.currentTime;
  const osc = audio.createOscillator();
  const gain = audio.createGain();
  osc.type = 'sine';
  osc.frequency.value = phase === 'inhale' ? 523.25 : 392; // C5 / G4
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.045, now + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);
  osc.connect(gain);
  gain.connect(audio.destination);
  osc.start(now);
  osc.stop(now + 0.24);
}

export const BREATH_TEMPO_MS = {
  slow: 5000,
  normal: 4000,
  fast: 3000,
} as const;

export type BreathTempo = keyof typeof BREATH_TEMPO_MS;

export const TEMPO_KEY = 'ashtanga.breath.tempo';
export const SOUND_KEY = 'ashtanga.breath.sound';

export function loadBreathTempo(): BreathTempo {
  try {
    const v = localStorage.getItem(TEMPO_KEY);
    if (v === 'slow' || v === 'normal' || v === 'fast') return v;
  } catch {
    /* ignore */
  }
  return 'normal';
}

export function saveBreathTempo(tempo: BreathTempo): void {
  try {
    localStorage.setItem(TEMPO_KEY, tempo);
  } catch {
    /* ignore */
  }
}

export function loadBreathSound(): boolean {
  try {
    const v = localStorage.getItem(SOUND_KEY);
    if (v === '0') return false;
    if (v === '1') return true;
  } catch {
    /* ignore */
  }
  return true;
}

export function saveBreathSound(on: boolean): void {
  try {
    localStorage.setItem(SOUND_KEY, on ? '1' : '0');
  } catch {
    /* ignore */
  }
}
