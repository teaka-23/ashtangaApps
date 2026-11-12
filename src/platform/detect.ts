import bridge from '@vkontakte/vk-bridge';
import type { PlatformHost } from './types';

function hasTelegramInitData(): boolean {
  const tg = (
    window as Window & { Telegram?: { WebApp?: { initData?: string } } }
  ).Telegram?.WebApp;
  return Boolean(tg && typeof tg.initData === 'string' && tg.initData.length > 0);
}

function hasVkLaunchParams(search = window.location.search): boolean {
  const params = new URLSearchParams(search);
  return params.has('vk_app_id') || params.has('vk_platform');
}

/**
 * Определяет хост: Telegram (есть initData) → VK (launch params / embedded) → web.
 */
export function detectHost(
  search = typeof window !== 'undefined' ? window.location.search : '',
): PlatformHost {
  if (typeof window !== 'undefined' && hasTelegramInitData()) {
    return 'telegram';
  }
  if (hasVkLaunchParams(search)) {
    return 'vk';
  }
  try {
    if (typeof window !== 'undefined' && bridge.isEmbedded()) {
      return 'vk';
    }
  } catch {
    /* bridge недоступен */
  }
  return 'web';
}
