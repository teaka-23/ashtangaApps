import { storageGet, storageRemove, storageSet } from '../telegram';

export const PROGRESS_KEY = 'ashtanga.practice.progress';

export interface PracticeProgress {
  currentAsanaId: string;
  completedIds: string[];
  updatedAt: string;
}

export async function loadProgress(): Promise<PracticeProgress | null> {
  const raw = await storageGet(PROGRESS_KEY);
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
  currentAsanaId: string,
  completedIds: string[],
): Promise<void> {
  const payload: PracticeProgress = {
    currentAsanaId,
    completedIds: [...new Set(completedIds)],
    updatedAt: new Date().toISOString(),
  };
  await storageSet(PROGRESS_KEY, JSON.stringify(payload));
}

export async function clearProgress(): Promise<void> {
  await storageRemove(PROGRESS_KEY);
}
