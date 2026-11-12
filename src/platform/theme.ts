import type { ThemeColors } from './types';

/** CSS-токены темы (исторически --tg-*; используются и в VK/web) */
export function applyThemeColors(colors: ThemeColors): void {
  const root = document.documentElement;
  const setVar = (name: string, value?: string) => {
    if (value) root.style.setProperty(name, value);
  };

  setVar('--tg-bg', colors.bg);
  setVar('--tg-text', colors.text);
  setVar('--tg-hint', colors.hint);
  setVar('--tg-link', colors.link);
  setVar('--tg-button', colors.button);
  setVar('--tg-secondary-bg', colors.secondaryBg);
}

export const THEME_DARK: ThemeColors = {
  bg: '#19191a',
  text: '#e1e3e6',
  hint: '#969a9f',
  link: '#71aaeb',
  button: '#2688eb',
  secondaryBg: '#2c2d2e',
};

export const THEME_LIGHT: ThemeColors = {
  bg: '#ffffff',
  text: '#000000',
  hint: '#818c99',
  link: '#2a5885',
  button: '#2688eb',
  secondaryBg: '#f0f2f5',
};
