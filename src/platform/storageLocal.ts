export function localGet(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function localSet(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* ignore quota / private mode */
  }
}

export function localRemove(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch {
    /* ignore */
  }
}

/** VK Storage допускает только [a-zA-Z_\-0-9] */
export function sanitizeVkStorageKey(key: string): string {
  return key.replace(/[^a-zA-Z0-9_-]/g, '_');
}
