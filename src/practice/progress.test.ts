import { beforeEach, describe, expect, it } from 'vitest';
import {
  clearProgress,
  loadProgress,
  PROGRESS_KEY_LEGACY,
  progressKey,
  saveProgress,
} from './progress';

describe('practice progress', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns null when empty', async () => {
    expect(await loadProgress('primary')).toBeNull();
  });

  it('saves and loads progress per series', async () => {
    await saveProgress('primary', 'navasana', ['surya-a', 'padangusthasana']);
    await saveProgress('intermediate', 'pasasana', ['int-surya-a']);
    const primary = await loadProgress('primary');
    const intermediate = await loadProgress('intermediate');
    expect(primary?.currentAsanaId).toBe('navasana');
    expect(primary?.completedIds).toEqual(['surya-a', 'padangusthasana']);
    expect(intermediate?.currentAsanaId).toBe('pasasana');
    expect(localStorage.getItem(progressKey('primary'))).toContain('navasana');
    expect(localStorage.getItem(progressKey('intermediate'))).toContain('pasasana');
  });

  it('dedupes completed ids', async () => {
    await saveProgress('primary', 'navasana', ['surya-a', 'surya-a']);
    const loaded = await loadProgress('primary');
    expect(loaded?.completedIds).toEqual(['surya-a']);
  });

  it('clears progress for one series only', async () => {
    await saveProgress('primary', 'navasana', ['surya-a']);
    await saveProgress('intermediate', 'pasasana', ['int-surya-a']);
    await clearProgress('primary');
    expect(await loadProgress('primary')).toBeNull();
    expect(await loadProgress('intermediate')).not.toBeNull();
  });

  it('migrates legacy primary progress key', async () => {
    localStorage.setItem(
      PROGRESS_KEY_LEGACY,
      JSON.stringify({
        currentAsanaId: 'navasana',
        completedIds: ['surya-a'],
        updatedAt: '2026-01-01T00:00:00.000Z',
      }),
    );
    const loaded = await loadProgress('primary');
    expect(loaded?.currentAsanaId).toBe('navasana');
    expect(localStorage.getItem(progressKey('primary'))).toContain('navasana');
    expect(localStorage.getItem(PROGRESS_KEY_LEGACY)).toBeNull();
  });

  it('ignores corrupt storage', async () => {
    localStorage.setItem(progressKey('primary'), '{not-json');
    expect(await loadProgress('primary')).toBeNull();
  });
});
