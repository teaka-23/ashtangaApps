interface TelegramThemeParams {
  bg_color?: string;
  text_color?: string;
  hint_color?: string;
  link_color?: string;
  button_color?: string;
  button_text_color?: string;
  secondary_bg_color?: string;
}

interface TelegramWebApp {
  ready(): void;
  expand(): void;
  disableVerticalSwipes?(): void;
  setHeaderColor?(color: string): void;
  setBackgroundColor?(color: string): void;
  colorScheme?: 'light' | 'dark';
  themeParams?: TelegramThemeParams;
  initData?: string;
}

declare global {
  interface Window {
    Telegram?: { WebApp?: TelegramWebApp };
  }
}

export function initTelegram(): boolean {
  const tg = window.Telegram?.WebApp;
  if (!tg) return false;

  tg.ready();
  tg.expand();
  tg.disableVerticalSwipes?.();

  const params = tg.themeParams ?? {};
  const root = document.documentElement;
  const setVar = (name: string, value?: string) => {
    if (value) root.style.setProperty(name, value);
  };

  setVar('--tg-bg', params.bg_color);
  setVar('--tg-text', params.text_color);
  setVar('--tg-hint', params.hint_color);
  setVar('--tg-link', params.link_color);
  setVar('--tg-button', params.button_color);
  setVar('--tg-secondary-bg', params.secondary_bg_color);

  if (params.bg_color) {
    tg.setHeaderColor?.(params.bg_color);
    tg.setBackgroundColor?.(params.bg_color);
  }

  return true;
}
