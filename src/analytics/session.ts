import { getPlatformHost } from '../platform';
import { getVisitorId } from '../platform/identity';

export type SessionKind = 'app' | 'practice';

/** Дельта одной сессии; на Sheets upsert по visitorId. */
export interface SessionPayload {
  visitorId: string;
  platform: string;
  kind: SessionKind;
  startedAt: string;
  endedAt: string;
  durationSec: number;
  seriesId?: string;
  screen?: string;
}

interface LiveSession {
  kind: SessionKind;
  startedAtMs: number;
  seriesId?: string;
}

const webhookUrl =
  (import.meta.env.VITE_ANALYTICS_WEBHOOK_URL as string | undefined)?.trim() ??
  '';

/** Что должно быть активно, пока экран жив (после pause на hide — resume). */
const wanted = new Map<SessionKind, { seriesId?: string }>();
const live = new Map<SessionKind, LiveSession>();

export function isAnalyticsEnabled(): boolean {
  return webhookUrl.length > 0;
}

function currentScreen(): string {
  if (typeof window === 'undefined') return '#/';
  return window.location.hash || '#/';
}

function buildPayload(session: LiveSession, endedAtMs: number): SessionPayload {
  const durationSec = Math.max(
    0,
    Math.round((endedAtMs - session.startedAtMs) / 1000),
  );
  return {
    visitorId: getVisitorId(),
    platform: getPlatformHost(),
    kind: session.kind,
    startedAt: new Date(session.startedAtMs).toISOString(),
    endedAt: new Date(endedAtMs).toISOString(),
    durationSec,
    seriesId: session.seriesId,
    screen: currentScreen(),
  };
}

/**
 * GET ?payload=… — надёжнее POST у Apps Script (редирект ломает тело POST).
 */
export function sendSessionPayload(payload: SessionPayload): void {
  if (!isAnalyticsEnabled()) return;
  // Нулевые вспышки (hide→show) не засоряют агрегат
  if (payload.durationSec < 1) return;

  const url = `${webhookUrl}${webhookUrl.includes('?') ? '&' : '?'}payload=${encodeURIComponent(JSON.stringify(payload))}`;

  try {
    void fetch(url, { method: 'GET', mode: 'no-cors', keepalive: true });
  } catch {
    /* аналитика best-effort */
  }
}

function beginLive(kind: SessionKind, seriesId?: string): void {
  const existing = live.get(kind);
  if (existing) {
    sendSessionPayload(buildPayload(existing, Date.now()));
  }
  live.set(kind, {
    kind,
    startedAtMs: Date.now(),
    seriesId,
  });
}

/** Старт (или перезапуск) сессии; остаётся «желаемой» до явного end. */
export function startSession(kind: SessionKind, seriesId?: string): void {
  if (!isAnalyticsEnabled()) return;
  wanted.set(kind, { seriesId });
  beginLive(kind, seriesId);
}

/** Явное завершение (размонтирование практики). */
export function endSession(kind: SessionKind): void {
  wanted.delete(kind);
  const session = live.get(kind);
  if (!session) return;
  live.delete(kind);
  sendSessionPayload(buildPayload(session, Date.now()));
}

/** Скрыта вкладка: записать длительность, не снимая «желание». */
export function pauseAllSessions(): void {
  const now = Date.now();
  for (const [kind, session] of [...live.entries()]) {
    live.delete(kind);
    sendSessionPayload(buildPayload(session, now));
  }
}

/** Вкладка снова видима: продолжить желаемые сессии. */
export function resumeWantedSessions(): void {
  if (!isAnalyticsEnabled()) return;
  for (const [kind, meta] of wanted) {
    if (!live.has(kind)) beginLive(kind, meta.seriesId);
  }
}

export function flushAllSessions(): void {
  pauseAllSessions();
}

let lifecycleBound = false;

/** Один раз: pause/resume по visibility, flush на pagehide. */
export function bindSessionLifecycle(): void {
  if (lifecycleBound || typeof window === 'undefined') return;
  lifecycleBound = true;

  window.addEventListener('pagehide', () => flushAllSessions());
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      pauseAllSessions();
    } else if (document.visibilityState === 'visible') {
      resumeWantedSessions();
    }
  });
}
