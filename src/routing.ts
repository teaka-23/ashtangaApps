import {
  getSeries,
  isAsanaInSeries,
  isSectionInSeries,
  isSeriesId,
  type SeriesId,
} from './data/series';

export type Route =
  | { name: 'home' }
  | { name: 'catalog'; seriesId: SeriesId; sectionId?: string }
  | { name: 'asana'; seriesId: SeriesId; id: string }
  | {
      name: 'practice';
      seriesId: SeriesId;
      startId: string;
      resume?: boolean;
    };

/** Нормализует location.hash → маршрут */
export function parseHash(hash = window.location.hash): Route {
  const raw = hash.replace(/^#/, '').replace(/^\//, '');
  const parts = raw.split('/').filter(Boolean);

  if (parts.length === 0) {
    return { name: 'home' };
  }

  // #/series/:seriesId/...
  if (parts[0] === 'series' && parts[1] && isSeriesId(parts[1])) {
    const seriesId = parts[1];
    const series = getSeries(seriesId);
    const rest = parts.slice(2);

    if (rest.length === 0 || rest[0] === 'catalog') {
      return { name: 'catalog', seriesId };
    }

    if (rest[0] === 'section' && rest[1] && isSectionInSeries(seriesId, rest[1])) {
      return { name: 'catalog', seriesId, sectionId: rest[1] };
    }

    if (rest[0] === 'asana' && rest[1] && isAsanaInSeries(seriesId, rest[1])) {
      return { name: 'asana', seriesId, id: rest[1] };
    }

    if (rest[0] === 'practice') {
      if (rest[1] === 'continue') {
        return {
          name: 'practice',
          seriesId,
          startId: series.asanas[0].id,
          resume: true,
        };
      }
      if (rest[1] && isAsanaInSeries(seriesId, rest[1])) {
        return { name: 'practice', seriesId, startId: rest[1] };
      }
      return { name: 'practice', seriesId, startId: series.asanas[0].id };
    }

    return { name: 'catalog', seriesId };
  }

  // Legacy primary routes (без /series/primary)
  const primary = getSeries('primary');

  if (parts[0] === 'catalog') {
    return { name: 'catalog', seriesId: 'primary' };
  }

  if (parts[0] === 'section' && parts[1] && isSectionInSeries('primary', parts[1])) {
    return { name: 'catalog', seriesId: 'primary', sectionId: parts[1] };
  }

  if (parts[0]?.startsWith('section-')) {
    const id = parts[0].slice('section-'.length);
    if (isSectionInSeries('primary', id)) {
      return { name: 'catalog', seriesId: 'primary', sectionId: id };
    }
  }

  if (parts[0] === 'asana' && parts[1] && isAsanaInSeries('primary', parts[1])) {
    return { name: 'asana', seriesId: 'primary', id: parts[1] };
  }

  if (parts[0] === 'practice') {
    if (parts[1] === 'continue') {
      return {
        name: 'practice',
        seriesId: 'primary',
        startId: primary.asanas[0].id,
        resume: true,
      };
    }
    if (parts[1] && isAsanaInSeries('primary', parts[1])) {
      return { name: 'practice', seriesId: 'primary', startId: parts[1] };
    }
    return { name: 'practice', seriesId: 'primary', startId: primary.asanas[0].id };
  }

  return { name: 'home' };
}

export function toHash(route: Route): string {
  switch (route.name) {
    case 'home':
      return '#/';
    case 'catalog': {
      const base = `#/series/${route.seriesId}`;
      return route.sectionId ? `${base}/section/${route.sectionId}` : base;
    }
    case 'asana':
      return `#/series/${route.seriesId}/asana/${route.id}`;
    case 'practice': {
      const base = `#/series/${route.seriesId}/practice`;
      if (route.resume) return `${base}/continue`;
      const firstId = getSeries(route.seriesId).asanas[0].id;
      return route.startId === firstId ? base : `${base}/${route.startId}`;
    }
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

export function asanaShareUrl(seriesId: SeriesId, id: string): string {
  const base = `${window.location.origin}${window.location.pathname}`;
  return `${base}${toHash({ name: 'asana', seriesId, id })}`;
}
