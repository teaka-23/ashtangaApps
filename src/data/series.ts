import {
  ADVANCED_SECTIONS,
  ADVANCED_SERIES,
} from './advancedSeries';
import {
  INTERMEDIATE_SECTIONS,
  INTERMEDIATE_SERIES,
} from './intermediateSeries';
import { PRIMARY_SERIES, SECTIONS } from './primarySeries';
import type { Asana, Section, SeriesDef, SeriesId } from './types';

export type { SeriesId, SeriesDef };

export const SERIES: Record<SeriesId, SeriesDef> = {
  primary: {
    id: 'primary',
    slug: 'primary',
    asanas: PRIMARY_SERIES,
    sections: SECTIONS,
  },
  intermediate: {
    id: 'intermediate',
    slug: 'intermediate',
    asanas: INTERMEDIATE_SERIES,
    sections: INTERMEDIATE_SECTIONS,
  },
  advanced: {
    id: 'advanced',
    slug: 'advanced',
    asanas: ADVANCED_SERIES,
    sections: ADVANCED_SECTIONS,
  },
};

export const SERIES_ORDER: SeriesId[] = ['primary', 'intermediate', 'advanced'];

export function isSeriesId(id: string): id is SeriesId {
  return id === 'primary' || id === 'intermediate' || id === 'advanced';
}

export function getSeries(id: SeriesId): SeriesDef {
  return SERIES[id];
}

export function findAsana(seriesId: SeriesId, asanaId: string): Asana | undefined {
  return SERIES[seriesId].asanas.find((a) => a.id === asanaId);
}

export function findAsanaIndex(seriesId: SeriesId, asanaId: string): number {
  return SERIES[seriesId].asanas.findIndex((a) => a.id === asanaId);
}

export function isAsanaInSeries(seriesId: SeriesId, asanaId: string): boolean {
  return findAsanaIndex(seriesId, asanaId) >= 0;
}

export function isSectionInSeries(seriesId: SeriesId, sectionId: string): boolean {
  return SERIES[seriesId].sections.some((s) => s.id === sectionId);
}

export function getSection(seriesId: SeriesId, sectionId: string): Section | undefined {
  return SERIES[seriesId].sections.find((s) => s.id === sectionId);
}

/** Strip int-/adv- clone prefix for shared i18n lookups */
export function contentKeyForAsana(asanaId: string): string {
  if (asanaId.startsWith('int-')) return asanaId.slice(4);
  if (asanaId.startsWith('adv-')) return asanaId.slice(4);
  return asanaId;
}
