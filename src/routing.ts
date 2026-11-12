import { PRIMARY_SERIES, type SectionId, SECTIONS } from './data/primarySeries';

export type Route =
  | { name: 'catalog'; sectionId?: SectionId }
  | { name: 'asana'; id: string }
  | { name: 'practice'; startId: string; resume?: boolean };

function isAsanaId(id: string): boolean {
  return PRIMARY_SERIES.some((a) => a.id === id);
}

function isSectionId(id: string): id is SectionId {
  return SECTIONS.some((s) => s.id === id);
}

/** Нормализует location.hash → маршрут */
export function parseHash(hash = window.location.hash): Route {
  const raw = hash.replace(/^#/, '').replace(/^\//, '');
  const parts = raw.split('/').filter(Boolean);

  if (parts.length === 0 || parts[0] === 'catalog') {
    return { name: 'catalog' };
  }

  if (parts[0] === 'section' && parts[1] && isSectionId(parts[1])) {
    return { name: 'catalog', sectionId: parts[1] };
  }

  // Legacy anchors: #section-surya-a
  if (parts[0]?.startsWith('section-')) {
    const id = parts[0].slice('section-'.length);
    if (isSectionId(id)) return { name: 'catalog', sectionId: id };
  }

  if (parts[0] === 'asana' && parts[1] && isAsanaId(parts[1])) {
    return { name: 'asana', id: parts[1] };
  }

  if (parts[0] === 'practice') {
    if (parts[1] === 'continue') {
      return { name: 'practice', startId: PRIMARY_SERIES[0].id, resume: true };
    }
    if (parts[1] && isAsanaId(parts[1])) {
      return { name: 'practice', startId: parts[1] };
    }
    return { name: 'practice', startId: PRIMARY_SERIES[0].id };
  }

  return { name: 'catalog' };
}

export function toHash(route: Route): string {
  switch (route.name) {
    case 'catalog':
      return route.sectionId ? `#/section/${route.sectionId}` : '#/';
    case 'asana':
      return `#/asana/${route.id}`;
    case 'practice':
      if (route.resume) return '#/practice/continue';
      return route.startId === PRIMARY_SERIES[0].id
        ? '#/practice'
        : `#/practice/${route.startId}`;
  }
}

export function navigate(route: Route, replace = false): void {
  const next = toHash(route);
  if (window.location.hash === next) return;

  if (replace) {
    const url = `${window.location.pathname}${window.location.search}${next}`;
    window.history.replaceState(null, '', url);
    window.dispatchEvent(new HashChangeEvent('hashchange'));
    return;
  }

  window.location.hash = next;
}

export function asanaShareUrl(id: string): string {
  const base = `${window.location.origin}${window.location.pathname}`;
  return `${base}${toHash({ name: 'asana', id })}`;
}
