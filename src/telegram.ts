/** @deprecated Импортируйте из `./platform`. Thin shim для совместимости. */
export {
  initPlatform as initTelegram,
  initPlatform,
  showBackButton,
  hideBackButton,
  haptic,
  storageGet,
  storageSet,
  storageRemove,
  getPlatformHost,
  detectHost,
  type HapticKind,
  type PlatformHost,
} from './platform';
