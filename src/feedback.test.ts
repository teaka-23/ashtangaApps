import { afterEach, describe, expect, it, vi } from 'vitest';
import { buildFeedbackMessage, FEEDBACK_BOT_URL } from './feedback';

describe('feedback', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('exposes bot deep-link with start=feedback', () => {
    expect(FEEDBACK_BOT_URL).toBe('https://t.me/d_teaka');
  });

  it('builds a paste-ready template with context', () => {
    vi.stubGlobal('navigator', { userAgent: 'TestAgent/1.0' });
    const text = buildFeedbackMessage({
      seriesId: 'primary',
      asanaId: 'utthita-trikonasana',
      screen: '#/series/primary/practice/utthita-trikonasana',
    });

    expect(text).toContain('Замечание по приложению Аштанга');
    expect(text).toContain('Тип:');
    expect(text).toContain('Серия: primary');
    expect(text).toContain('Асана: utthita-trikonasana');
    expect(text).toContain('Экран: #/series/primary/practice/utthita-trikonasana');
    expect(text).toContain('UA: TestAgent/1.0');
  });
});
