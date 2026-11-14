import { getPlatformHost } from './platform';

/**
 * Куда открывать чат для замечаний.
 * Бот Mini App принимает личные сообщения только если есть обработчик
 * (forwarder / getUpdates). Иначе смените на личный @username.
 * См. docs/feedback.md
 */
export const FEEDBACK_CHAT_USERNAME = 'd_teaka';
/** Личный чат владельца — шаблон вставляется из буфера. */
export const FEEDBACK_BOT_URL = `https://t.me/${FEEDBACK_CHAT_USERNAME}`;

/** Реестр для triage владельцем (не публичная форма для всех). */
export const FEEDBACK_ISSUES_URL =
  'https://github.com/teaka-23/ashtangaApps/issues/new?template=feedback.yml';

export interface FeedbackContext {
  seriesId?: string;
  asanaId?: string;
  /** Hash-роут или краткое имя экрана */
  screen?: string;
}

export function buildFeedbackMessage(ctx: FeedbackContext = {}): string {
  const host = getPlatformHost();
  const screen =
    ctx.screen ??
    (typeof window !== 'undefined' ? window.location.hash || '#/' : '#/');
  const ua =
    typeof navigator !== 'undefined' ? navigator.userAgent.slice(0, 140) : '—';

  return [
    'Замечание по приложению Аштанга',
    '',
    'Тип: [баг / неудобно / ошибка в асане / иллюстрация / идея]',
    'Где: [практика / каталог / шторка / другое]',
    'Что не так:',
    '',
    '',
    '---',
    'Контекст (не удаляйте):',
    `Платформа: ${host}`,
    `Экран: ${screen}`,
    `Серия: ${ctx.seriesId ?? '—'}`,
    `Асана: ${ctx.asanaId ?? '—'}`,
    `UA: ${ua}`,
  ].join('\n');
}

export async function copyFeedbackTemplate(ctx: FeedbackContext = {}): Promise<boolean> {
  const text = buildFeedbackMessage(ctx);
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

/** Открывает чат бота (в TG Mini App — openTelegramLink). */
export function openFeedbackChat(): void {
  const url = FEEDBACK_BOT_URL;
  const tg = (
    window as Window & {
      Telegram?: {
        WebApp?: {
          openTelegramLink?: (url: string) => void;
          openLink?: (url: string) => void;
        };
      };
    }
  ).Telegram?.WebApp;

  if (typeof tg?.openTelegramLink === 'function') {
    tg.openTelegramLink(url);
    return;
  }
  if (typeof tg?.openLink === 'function') {
    tg.openLink(url);
    return;
  }

  window.open(url, '_blank', 'noopener,noreferrer');
}

/** Копирует шаблон и открывает бота. */
export async function startFeedback(ctx: FeedbackContext = {}): Promise<boolean> {
  const copied = await copyFeedbackTemplate(ctx);
  openFeedbackChat();
  return copied;
}
