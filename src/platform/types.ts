export type PlatformHost = 'telegram' | 'vk' | 'web';

export type HapticKind = 'light' | 'medium' | 'success' | 'warning' | 'selection';

export interface ThemeColors {
  bg?: string;
  text?: string;
  hint?: string;
  link?: string;
  button?: string;
  secondaryBg?: string;
}

export interface PlatformAdapter {
  readonly host: PlatformHost;
  init(): boolean | Promise<boolean>;
  showBackButton(onClick: () => void): void;
  hideBackButton(): void;
  haptic(kind: HapticKind): void;
  storageGet(key: string): Promise<string | null>;
  storageSet(key: string, value: string): Promise<void>;
  storageRemove(key: string): Promise<void>;
}
