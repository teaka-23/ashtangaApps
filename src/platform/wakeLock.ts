/**
 * Screen Wake Lock: не даёт экрану гаснуть (например, во время практики).
 * Нативного API у Telegram/VK нет — используем браузерный Wake Lock:
 * Android WebView и iOS WKWebView 16.4+ его поддерживают.
 * Блокировка снимается системой при сворачивании — перезапрашиваем
 * на visibilitychange, пока режим включён.
 */
let sentinel: WakeLockSentinel | null = null;
let wanted = false;

async function acquire(): Promise<void> {
  if (!('wakeLock' in navigator)) return;
  try {
    sentinel = await navigator.wakeLock.request('screen');
  } catch {
    // Нет активации жестом или отказ системы — просто работаем без блокировки
  }
}

export function keepScreenOn(on: boolean): void {
  wanted = on;
  if (on) {
    void acquire();
  } else {
    void sentinel?.release();
    sentinel = null;
  }
}

document.addEventListener('visibilitychange', () => {
  if (wanted && document.visibilityState === 'visible') void acquire();
});
