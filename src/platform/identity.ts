const VISITOR_KEY = 'ashtanga.analytics.visitorId';

/**
 * Стабильный анонимный id установки (без TG/VK user id).
 * Живёт в localStorage; смена устройства / очистка хранилища = новый visitor.
 */
export function getVisitorId(): string {
  if (typeof window === 'undefined') return 'unknown';
  try {
    const existing = localStorage.getItem(VISITOR_KEY);
    if (existing) return existing;
    const id = crypto.randomUUID();
    localStorage.setItem(VISITOR_KEY, id);
    return id;
  } catch {
    return 'ephemeral';
  }
}
