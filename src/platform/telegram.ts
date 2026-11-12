import { applyThemeColors } from './theme';
import { localGet, localRemove, localSet } from './storageLocal';
import type { HapticKind, PlatformAdapter } from './types';

interface TelegramThemeParams {
  bg_color?: string;
  text_color?: string;
  hint_color?: string;
  link_color?: string;
  button_color?: string;
  button_text_color?: string;
  secondary_bg_color?: string;
}

interface TelegramBackButton {
  isVisible: boolean;
  show(): void;
  hide(): void;
  onClick(cb: () => void): void;
  offClick(cb: () => void): void;
}

type HapticImpact = 'light' | 'medium' | 'heavy' | 'rigid' | 'soft';
type HapticNotification = 'error' | 'success' | 'warning';

interface TelegramHapticFeedback {
  impactOccurred(style: HapticImpact): void;
  notificationOccurred(type: HapticNotification): void;
  selectionChanged(): void;
}

interface TelegramCloudStorage {
  setItem(key: string, value: string, callback?: (error: string | null, ok?: boolean) => void): void;
  getItem(key: string, callback: (error: string | null, value?: string) => void): void;
  removeItem(key: string, callback?: (error: string | null, ok?: boolean) => void): void;
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
  BackButton?: TelegramBackButton;
  HapticFeedback?: TelegramHapticFeedback;
  CloudStorage?: TelegramCloudStorage;
}

declare global {
  interface Window {
    Telegram?: { WebApp?: TelegramWebApp };
  }
}

function getTelegram(): TelegramWebApp | undefined {
  return window.Telegram?.WebApp;
}

let backHandler: (() => void) | null = null;

export const telegramAdapter: PlatformAdapter = {
  host: 'telegram',

  init(): boolean {
    const tg = getTelegram();
    if (!tg) return false;

    tg.ready();
    tg.expand();
    tg.disableVerticalSwipes?.();

    const params = tg.themeParams ?? {};
    applyThemeColors({
      bg: params.bg_color,
      text: params.text_color,
      hint: params.hint_color,
      link: params.link_color,
      button: params.button_color,
      secondaryBg: params.secondary_bg_color,
    });

    if (params.bg_color) {
      tg.setHeaderColor?.(params.bg_color);
      tg.setBackgroundColor?.(params.bg_color);
    }

    return true;
  },

  showBackButton(onClick: () => void): void {
    const btn = getTelegram()?.BackButton;
    if (!btn) return;

    if (backHandler) btn.offClick(backHandler);
    backHandler = onClick;
    btn.onClick(onClick);
    btn.show();
  },

  hideBackButton(): void {
    const btn = getTelegram()?.BackButton;
    if (!btn) return;

    if (backHandler) {
      btn.offClick(backHandler);
      backHandler = null;
    }
    btn.hide();
  },

  haptic(kind: HapticKind = 'light'): void {
    const hf = getTelegram()?.HapticFeedback;
    if (!hf) return;

    if (kind === 'selection') {
      hf.selectionChanged();
      return;
    }
    if (kind === 'success' || kind === 'warning') {
      hf.notificationOccurred(kind);
      return;
    }
    hf.impactOccurred(kind);
  },

  storageGet(key: string): Promise<string | null> {
    const cs = getTelegram()?.CloudStorage;
    if (!cs) return Promise.resolve(localGet(key));

    return new Promise((resolve) => {
      cs.getItem(key, (error, value) => {
        if (error) {
          resolve(localGet(key));
          return;
        }
        resolve(value ?? null);
      });
    });
  },

  storageSet(key: string, value: string): Promise<void> {
    localSet(key, value);
    const cs = getTelegram()?.CloudStorage;
    if (!cs) return Promise.resolve();

    return new Promise((resolve) => {
      cs.setItem(key, value, () => resolve());
    });
  },

  storageRemove(key: string): Promise<void> {
    localRemove(key);
    const cs = getTelegram()?.CloudStorage;
    if (!cs) return Promise.resolve();

    return new Promise((resolve) => {
      cs.removeItem(key, () => resolve());
    });
  },
};
