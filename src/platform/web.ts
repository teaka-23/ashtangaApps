import type { HapticKind, PlatformAdapter } from './types';
import { localGet, localRemove, localSet } from './storageLocal';

export const webAdapter: PlatformAdapter = {
  host: 'web',

  init(): boolean {
    return true;
  },

  showBackButton(_onClick: () => void): void {
    /* browser: in-app navigation */
  },

  hideBackButton(): void {
    /* no-op */
  },

  haptic(_kind: HapticKind = 'light'): void {
    /* no-op */
  },

  storageGet(key: string): Promise<string | null> {
    return Promise.resolve(localGet(key));
  },

  storageSet(key: string, value: string): Promise<void> {
    localSet(key, value);
    return Promise.resolve();
  },

  storageRemove(key: string): Promise<void> {
    localRemove(key);
    return Promise.resolve();
  },
};
