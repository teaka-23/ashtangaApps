import { beforeEach, describe, expect, it } from 'vitest';
import { clearProgress, loadProgress, PROGRESS_KEY, saveProgress } from './progress';

describe('practice progress', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns null when empty', async () => {
    expect(await loadProgress()).toBeNull();
  });

  it('saves and loads progress', async () => {
    await saveProgress('navasana', ['surya-a', 'padangusthasana']);
    const loaded = await loadProgress();
    expect(loaded?.currentAsanaId).toBe('navasana');
    expect(loaded?.completedIds).toEqual(['surya-a', 'padangusthasana']);
    expect(loaded?.updatedAt).toBeTruthy();
    expect(localStorage.getItem(PROGRESS_KEY)).toContain('navasana');
  });

  it('dedupes completed ids', async () => {
    await saveProgress('navasana', ['surya-a', 'surya-a']);
    const loaded = await loadProgress();
    expect(loaded?.completedIds).toEqual(['surya-a']);
  });

  it('clears progress', async () => {
    await saveProgress('navasana', ['surya-a']);
    await clearProgress();
    expect(await loadProgress()).toBeNull();
  });

  it('ignores corrupt storage', async () => {
    localStorage.setItem(PROGRESS_KEY, '{not-json');
    expect(await loadProgress()).toBeNull();
  });
});
