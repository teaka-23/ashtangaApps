import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  buildFeedbackContextLine,
  buildFeedbackFormUrl,
  FEEDBACK_FORM_URL,
} from './feedback';

describe('feedback', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('points at a Google Form viewform URL', () => {
    expect(FEEDBACK_FORM_URL).toMatch(
      /^https:\/\/docs\.google\.com\/forms\/d\/e\/.+\/viewform/,
    );
  });

  it('builds a compact context line for prefill', () => {
    vi.stubGlobal('navigator', { userAgent: 'TestAgent/1.0' });
    const line = buildFeedbackContextLine({
      seriesId: 'primary',
      asanaId: 'utthita-trikonasana',
      screen: '#/series/primary/practice/utthita-trikonasana',
    });

    expect(line).toContain('platform=');
    expect(line).toContain('series=primary');
    expect(line).toContain('asana=utthita-trikonasana');
    expect(line).toContain('screen=#/series/primary/practice/utthita-trikonasana');
    expect(line).toContain('ua=TestAgent/1.0');
  });

  it('returns the form URL (prefill only when entry id is set)', () => {
    const url = buildFeedbackFormUrl({ screen: '#/' });
    expect(url.startsWith(FEEDBACK_FORM_URL.split('?')[0]!)).toBe(true);
  });
});
