import { detectHost } from './detect';
import { telegramAdapter } from './telegram';
import { vkAdapter } from './vk';
import { webAdapter } from './web';
import type { HapticKind, PlatformAdapter, PlatformHost } from './types';

export type { HapticKind, PlatformHost };
export { detectHost } from './detect';
export { sanitizeVkStorageKey } from './storageLocal';
export { keepScreenOn } from './wakeLock';

let adapter: PlatformAdapter = webAdapter;
let initialized = false;

function pickAdapter(host: PlatformHost): PlatformAdapter {
  switch (host) {
    case 'telegram':
      return telegramAdapter;
    case 'vk':
      return vkAdapter;
    default:
      return webAdapter;
  }
}

/** Текущий хост после init (до init — результат detectHost). */
export function getPlatformHost(): PlatformHost {
  return initialized ? adapter.host : detectHost();
}

export async function initPlatform(): Promise<boolean> {
  const host = detectHost();
  adapter = pickAdapter(host);
  const ok = await Promise.resolve(adapter.init());
  initialized = true;
  return ok;
}

/** @deprecated используйте initPlatform */
export const initTelegram = initPlatform;

export function showBackButton(onClick: () => void): void {
  adapter.showBackButton(onClick);
}

export function hideBackButton(): void {
  adapter.hideBackButton();
}

export function haptic(kind: HapticKind = 'light'): void {
  adapter.haptic(kind);
}

export function storageGet(key: string): Promise<string | null> {
  return adapter.storageGet(key);
}

export function storageSet(key: string, value: string): Promise<void> {
  return adapter.storageSet(key, value);
}

export function storageRemove(key: string): Promise<void> {
  return adapter.storageRemove(key);
}
