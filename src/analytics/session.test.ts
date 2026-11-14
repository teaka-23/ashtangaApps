import { afterEach, describe, expect, it } from 'vitest';
import { getVisitorId } from '../platform/identity';
import { endSession, isAnalyticsEnabled, startSession } from './session';

describe('getVisitorId', () => {
  afterEach(() => {
    localStorage.clear();
  });

  it('persists the same anon id', () => {
    const a = getVisitorId();
    const b = getVisitorId();
    expect(a).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
    );
    expect(b).toBe(a);
  });
});

describe('session', () => {
  it('exposes enabled flag', () => {
    expect(typeof isAnalyticsEnabled()).toBe('boolean');
  });

  it('start/end without webhook does not throw', () => {
    expect(() => {
      startSession('app');
      endSession('app');
      startSession('practice', 'primary');
      endSession('practice');
    }).not.toThrow();
  });
});
