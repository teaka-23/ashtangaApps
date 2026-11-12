import { afterEach, describe, expect, it, vi } from 'vitest';
import { detectHost } from './detect';
import { sanitizeVkStorageKey } from './storageLocal';
import { storageGet, storageSet, storageRemove, initPlatform, getPlatformHost } from './index';

describe('sanitizeVkStorageKey', () => {
  it('replaces dots and other illegal chars with underscore', () => {
    expect(sanitizeVkStorageKey('ashtanga.practice.progress.primary')).toBe(
      'ashtanga_practice_progress_primary',
    );
  });

  it('keeps allowed characters', () => {
    expect(sanitizeVkStorageKey('ashtanga_practice-progress1')).toBe(
      'ashtanga_practice-progress1',
    );
  });
});

function setTelegram(initData: string | undefined | false): void {
  const w = window as unknown as {
    Telegram?: { WebApp?: { initData?: string } };
  };
  if (initData === false) {
    delete w.Telegram;
    return;
  }
  w.Telegram = { WebApp: { initData } };
}

describe('detectHost', () => {
  afterEach(() => {
    setTelegram(false);
  });

  it('returns telegram when initData is present', () => {
    setTelegram('query_id=1&user=%7B%7D');
    expect(detectHost('')).toBe('telegram');
  });

  it('returns vk when vk_app_id is in query', () => {
    setTelegram('');
    expect(detectHost('?vk_app_id=123&vk_platform=mobile_iphone')).toBe('vk');
  });

  it('returns vk when vk_platform is in query', () => {
    setTelegram(false);
    expect(detectHost('?vk_platform=desktop_web')).toBe('vk');
  });

  it('returns web when no telegram initData and no vk params', () => {
    setTelegram('');
    expect(detectHost('')).toBe('web');
  });
});

describe('platform web storage', () => {
  afterEach(() => {
    localStorage.clear();
    setTelegram(false);
    vi.unstubAllGlobals();
  });

  it('initPlatform selects web in test env and persists via localStorage', async () => {
    setTelegram('');
    const ok = await initPlatform();
    expect(ok).toBe(true);
    expect(getPlatformHost()).toBe('web');

    await storageSet('ashtanga.practice.progress.primary', '{"ok":true}');
    await expect(storageGet('ashtanga.practice.progress.primary')).resolves.toBe(
      '{"ok":true}',
    );
    await storageRemove('ashtanga.practice.progress.primary');
    await expect(storageGet('ashtanga.practice.progress.primary')).resolves.toBeNull();
  });
});
