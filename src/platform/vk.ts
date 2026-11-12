import bridge from '@vkontakte/vk-bridge';
import { applyThemeColors, THEME_DARK, THEME_LIGHT } from './theme';
import { localGet, localRemove, localSet, sanitizeVkStorageKey } from './storageLocal';
import type { HapticKind, PlatformAdapter } from './types';

type VkConfig = {
  appearance?: 'light' | 'dark';
  scheme?: string;
};

function isDarkScheme(config: VkConfig): boolean {
  if (config.appearance === 'dark') return true;
  if (config.appearance === 'light') return false;
  const scheme = config.scheme ?? '';
  return scheme.includes('dark') || scheme === 'space_gray';
}

function applyVkConfig(config: VkConfig): void {
  applyThemeColors(isDarkScheme(config) ? THEME_DARK : THEME_LIGHT);
}

function hashToVkLocation(hash = window.location.hash): string {
  const raw = hash.replace(/^#/, '');
  if (!raw || raw === '/') return '/';
  return raw.startsWith('/') ? raw : `/${raw}`;
}

function vkLocationToHash(location: string): string {
  if (!location || location === '/') return '#/';
  if (location.startsWith('#')) return location;
  return location.startsWith('/') ? `#${location}` : `#/${location}`;
}

function syncHashToVk(replace = true): void {
  void bridge
    .send('VKWebAppSetLocation', {
      location: hashToVkLocation(),
      replace_state: replace,
    })
    .catch(() => {
      /* не в клиенте VK */
    });
}

let fragmentHandler:
  | ((event: { detail: { type: string; data?: { location?: string } } }) => void)
  | null = null;
let hashHandler: (() => void) | null = null;

export const vkAdapter: PlatformAdapter = {
  host: 'vk',

  async init(): Promise<boolean> {
    try {
      await bridge.send('VKWebAppInit');
    } catch {
      return false;
    }

    fragmentHandler = (event) => {
      if (event.detail.type !== 'VKWebAppChangeFragment') return;
      const loc = event.detail.data?.location;
      if (!loc) return;
      const next = vkLocationToHash(loc);
      if (window.location.hash !== next) {
        window.location.hash = next;
      }
    };
    bridge.subscribe(fragmentHandler as Parameters<typeof bridge.subscribe>[0]);

    hashHandler = () => syncHashToVk(true);
    window.addEventListener('hashchange', hashHandler);
    syncHashToVk(true);

    const onConfig = (event: { detail: { type: string; data?: VkConfig } }) => {
      if (event.detail.type === 'VKWebAppUpdateConfig' && event.detail.data) {
        applyVkConfig(event.detail.data);
      }
    };
    bridge.subscribe(onConfig as Parameters<typeof bridge.subscribe>[0]);

    try {
      const config = (await bridge.send('VKWebAppGetConfig')) as VkConfig;
      applyVkConfig(config);
    } catch {
      applyThemeColors(THEME_DARK);
    }

    return true;
  },

  showBackButton(_onClick: () => void): void {
    /* У VK нет Telegram-like BackButton — навигация in-app */
  },

  hideBackButton(): void {
    /* no-op */
  },

  haptic(kind: HapticKind = 'light'): void {
    if (kind === 'selection') {
      void bridge.send('VKWebAppTapticSelectionChanged').catch(() => undefined);
      return;
    }
    if (kind === 'success' || kind === 'warning') {
      void bridge
        .send('VKWebAppTapticNotificationOccurred', { type: kind })
        .catch(() => undefined);
      return;
    }
    void bridge
      .send('VKWebAppTapticImpactOccurred', { style: kind })
      .catch(() => undefined);
  },

  async storageGet(key: string): Promise<string | null> {
    const vkKey = sanitizeVkStorageKey(key);
    try {
      const data = await bridge.send('VKWebAppStorageGet', { keys: [vkKey] });
      const entry = data.keys?.find((k) => k.key === vkKey);
      if (entry && entry.value !== undefined && entry.value !== '') {
        return entry.value;
      }
    } catch {
      /* fallback */
    }
    return localGet(key) ?? localGet(vkKey);
  },

  async storageSet(key: string, value: string): Promise<void> {
    const vkKey = sanitizeVkStorageKey(key);
    localSet(key, value);
    localSet(vkKey, value);
    try {
      await bridge.send('VKWebAppStorageSet', { key: vkKey, value });
    } catch {
      /* local only */
    }
  },

  async storageRemove(key: string): Promise<void> {
    const vkKey = sanitizeVkStorageKey(key);
    localRemove(key);
    localRemove(vkKey);
    try {
      await bridge.send('VKWebAppStorageSet', { key: vkKey, value: '' });
    } catch {
      /* local only */
    }
  },
};
