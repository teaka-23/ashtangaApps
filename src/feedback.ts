import { getPlatformHost } from './platform';

/**
 * Ссылка для респондентов (Forms → Отправить → ссылка).
 * Предзаполнение: Forms → ⋮ → «Получить ссылку для предзаполнения»
 * → скопировать entry.XXXX в FEEDBACK_FORM_ENTRY_CONTEXT.
 * См. docs/feedback.md
 */
export const FEEDBACK_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSdGWRdEMhbLZebpYOC6IGy6dRkw8q_6fWXykXOL2y4rBgpozw/viewform';

/**
 * ID поля «Технический контекст» (только цифры из entry.123456789).
 * Сейчас в форме этого поля нет — предзаполнение выключено.
 * Добавите поле → Forms ⋮ → ссылка для предзаполнения → цифры сюда.
 */
export const FEEDBACK_FORM_ENTRY_CONTEXT = '';

/** Реестр triage (после разбора ответов в таблице Forms). */
export const FEEDBACK_ISSUES_URL =
  'https://github.com/teaka-23/ashtangaApps/issues/new?template=feedback.yml';

export interface FeedbackContext {
  seriesId?: string;
  asanaId?: string;
  /** Hash-роут или краткое имя экрана */
  screen?: string;
}

export function buildFeedbackContextLine(ctx: FeedbackContext = {}): string {
  const host = getPlatformHost();
  const screen =
    ctx.screen ??
    (typeof window !== 'undefined' ? window.location.hash || '#/' : '#/');
  const ua =
    typeof navigator !== 'undefined' ? navigator.userAgent.slice(0, 140) : '—';

  return [
    `platform=${host}`,
    `screen=${screen}`,
    `series=${ctx.seriesId ?? '—'}`,
    `asana=${ctx.asanaId ?? '—'}`,
    `ua=${ua}`,
  ].join('; ');
}

/** URL формы с опциональным предзаполнением контекста. */
export function buildFeedbackFormUrl(ctx: FeedbackContext = {}): string {
  const url = new URL(FEEDBACK_FORM_URL);
  if (FEEDBACK_FORM_ENTRY_CONTEXT) {
    url.searchParams.set(
      `entry.${FEEDBACK_FORM_ENTRY_CONTEXT}`,
      buildFeedbackContextLine(ctx),
    );
  }
  return url.toString();
}

function openExternalUrl(url: string): void {
  const tg = (
    window as Window & {
      Telegram?: {
        WebApp?: {
          openLink?: (url: string) => void;
        };
      };
    }
  ).Telegram?.WebApp;

  if (typeof tg?.openLink === 'function') {
    tg.openLink(url);
    return;
  }

  window.open(url, '_blank', 'noopener,noreferrer');
}

/** Открывает Google Form (в TG Mini App — openLink). */
export function startFeedback(ctx: FeedbackContext = {}): void {
  openExternalUrl(buildFeedbackFormUrl(ctx));
}
