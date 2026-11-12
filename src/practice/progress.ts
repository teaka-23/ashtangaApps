import type { SeriesId } from '../data/types';
import { storageGet, storageRemove, storageSet } from '../telegram';

/** Legacy key (primary only) — migrated on first read */
export const PROGRESS_KEY_LEGACY = 'ashtanga.practice.progress';

export function progressKey(seriesId: SeriesId): string {
  return `ashtanga.practice.progress.${seriesId}`;
}

export interface PracticeProgress {
  currentAsanaId: string;
  completedIds: string[];
  updatedAt: string;
}

export async function loadProgress(
  seriesId: SeriesId,
): Promise<PracticeProgress | null> {
  const key = progressKey(seriesId);
  let raw = await storageGet(key);

  // One-time migrate legacy primary progress
  if (!raw && seriesId === 'primary') {
    raw = await storageGet(PROGRESS_KEY_LEGACY);
    if (raw) {
      await storageSet(key, raw);
      await storageRemove(PROGRESS_KEY_LEGACY);
    }
  }

  if (!raw) return null;

  try {
    const data = JSON.parse(raw) as PracticeProgress;
    if (!data.currentAsanaId || !Array.isArray(data.completedIds)) return null;
    return data;
  } catch {
    return null;
  }
}

export async function saveProgress(
  seriesId: SeriesId,
  currentAsanaId: string,
  completedIds: string[],
): Promise<void> {
  const payload: PracticeProgress = {
    currentAsanaId,
    completedIds: [...new Set(completedIds)],
    updatedAt: new Date().toISOString(),
  };
  await storageSet(progressKey(seriesId), JSON.stringify(payload));
}

export async function clearProgress(seriesId: SeriesId): Promise<void> {
  await storageRemove(progressKey(seriesId));
  if (seriesId === 'primary') {
    await storageRemove(PROGRESS_KEY_LEGACY);
  }
}
