/** Shared asana / section types for all series */

export interface Section {
  id: string;
  title: string;
  subtitle: string;
}

export interface Asana {
  id: string;
  /** Транслитерация санскритского названия (латиницей) */
  sanskrit: string;
  /** Название деванагари */
  devanagari: string;
  /** Русская транскрипция — как произносится */
  transcription: string;
  /** Название на русском */
  russian: string;
  /** Ключ SVG-позы из poses.ts */
  pose: string;
  /** Количество виньяс (для Сурьи — общее, для асан — до положения) */
  vinyasa?: number;
  /** Дришти — точка концентрации взгляда */
  drishti?: string;
  /** Число дыханий в удержании асаны */
  breaths?: number;
  /**
   * Нет в Yoga Mala как отдельная позиция — современное дополнение серии.
   * Состав списка оставляем современным; такие асаны выделяются в UI.
   */
  modernAddition?: boolean;
  /** Заметка: вариации, количество дыханий и т.п. */
  note?: string;
  section: string;
}

export type SeriesId = 'primary' | 'intermediate';

export interface SeriesDef {
  id: SeriesId;
  /** Краткий ключ для UI / i18n */
  slug: SeriesId;
  asanas: Asana[];
  sections: Section[];
}
