import { createContext, useContext } from 'react';
import { contentKeyForAsana } from '../data/series';
import type { Asana, Section, SeriesId } from '../data/types';
import { DRISHTI_EN, ENGLISH_NAME, NOTE_EN, SECTION_NAV, SECTIONS_EN } from './content';
import { messages, type Locale, type MessageKey } from './messages';

export type { Locale, MessageKey };
export { messages };

export const LocaleContext = createContext<Locale>('ru');

export function useLocale(): Locale {
  return useContext(LocaleContext);
}

export function t(locale: Locale, key: MessageKey): string {
  const value = messages[locale][key];
  return typeof value === 'string' ? value : String(value);
}

export function pluralizeAsana(locale: Locale, count: number): string {
  if (locale === 'en') {
    return count === 1 ? messages.en.asanaWord.one : messages.en.asanaWord.many;
  }
  const n = count % 100;
  if (n >= 5 && n <= 20) return messages.ru.asanaWord.many;
  const n1 = count % 10;
  if (n1 === 1) return messages.ru.asanaWord.one;
  if (n1 >= 2 && n1 <= 4) return messages.ru.asanaWord.few;
  return messages.ru.asanaWord.many;
}

export function seriesTitle(seriesId: SeriesId, locale: Locale): string {
  return t(locale, seriesId === 'primary' ? 'seriesPrimary' : 'seriesIntermediate');
}

export function seriesSubtitle(seriesId: SeriesId, locale: Locale): string {
  return t(
    locale,
    seriesId === 'primary' ? 'seriesPrimarySub' : 'seriesIntermediateSub',
  );
}

export function asanaDisplayName(asana: Asana, locale: Locale): string {
  if (locale === 'en') {
    const key = contentKeyForAsana(asana.id);
    return ENGLISH_NAME[asana.id] ?? ENGLISH_NAME[key] ?? asana.sanskrit;
  }
  return asana.russian;
}

export function asanaSecondaryName(asana: Asana, locale: Locale): string {
  if (locale === 'en') return asana.sanskrit;
  return asana.transcription;
}

export function asanaDrishti(asana: Asana, locale: Locale): string | undefined {
  if (!asana.drishti) return undefined;
  if (locale === 'en') return DRISHTI_EN[asana.drishti] ?? asana.drishti;
  return asana.drishti;
}

export function asanaNote(asana: Asana, locale: Locale): string | undefined {
  if (locale === 'en') {
    const key = contentKeyForAsana(asana.id);
    return NOTE_EN[asana.id] ?? NOTE_EN[key] ?? asana.note;
  }
  return asana.note;
}

export function sectionTitle(section: Section, locale: Locale): string {
  if (locale === 'en') return SECTIONS_EN[section.id]?.title ?? section.title;
  return section.title;
}

export function sectionSubtitle(section: Section, locale: Locale): string {
  if (locale === 'en') return SECTIONS_EN[section.id]?.subtitle ?? section.subtitle;
  return section.subtitle;
}

/** Short chip label for sticky section nav */
export function sectionNavLabel(section: Section, locale: Locale): string {
  const short = SECTION_NAV[section.id];
  if (short) return locale === 'en' ? short.en : short.ru;
  return sectionTitle(section, locale);
}

/** Textual technique summary for screen readers */
export function asanaDescription(asana: Asana, locale: Locale): string {
  const parts = [
    asana.sanskrit,
    asanaDisplayName(asana, locale),
    asana.vinyasa !== undefined ? `${t(locale, 'vinyasas')}: ${asana.vinyasa}` : null,
    asana.breaths !== undefined ? `${t(locale, 'breaths')}: ${asana.breaths}` : null,
    asanaDrishti(asana, locale)
      ? `${t(locale, 'drishti')}: ${asanaDrishti(asana, locale)}`
      : null,
    asanaNote(asana, locale),
  ];
  return parts.filter(Boolean).join('. ');
}

export const LOCALE_KEY = 'ashtanga.locale';
