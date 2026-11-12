import { afterEach, describe, expect, it } from 'vitest';
import { parseHash, toHash } from './routing';

describe('parseHash', () => {
  it('parses home / series picker', () => {
    expect(parseHash('')).toEqual({ name: 'home' });
    expect(parseHash('#/')).toEqual({ name: 'home' });
  });

  it('parses series catalog', () => {
    expect(parseHash('#/series/primary')).toEqual({
      name: 'catalog',
      seriesId: 'primary',
    });
    expect(parseHash('#/series/intermediate')).toEqual({
      name: 'catalog',
      seriesId: 'intermediate',
    });
    expect(parseHash('#/catalog')).toEqual({
      name: 'catalog',
      seriesId: 'primary',
    });
  });

  it('parses section', () => {
    expect(parseHash('#/series/primary/section/standing')).toEqual({
      name: 'catalog',
      seriesId: 'primary',
      sectionId: 'standing',
    });
    expect(parseHash('#/section/standing')).toEqual({
      name: 'catalog',
      seriesId: 'primary',
      sectionId: 'standing',
    });
  });

  it('parses legacy section anchor', () => {
    expect(parseHash('#section-seated')).toEqual({
      name: 'catalog',
      seriesId: 'primary',
      sectionId: 'seated',
    });
  });

  it('parses asana deep link', () => {
    expect(parseHash('#/series/primary/asana/padangusthasana')).toEqual({
      name: 'asana',
      seriesId: 'primary',
      id: 'padangusthasana',
    });
    expect(parseHash('#/asana/padangusthasana')).toEqual({
      name: 'asana',
      seriesId: 'primary',
      id: 'padangusthasana',
    });
    expect(parseHash('#/series/intermediate/asana/pasasana')).toEqual({
      name: 'asana',
      seriesId: 'intermediate',
      id: 'pasasana',
    });
  });

  it('rejects unknown asana', () => {
    expect(parseHash('#/asana/not-a-pose')).toEqual({ name: 'home' });
  });

  it('parses practice routes', () => {
    expect(parseHash('#/practice')).toEqual({
      name: 'practice',
      seriesId: 'primary',
      startId: 'surya-a',
    });
    expect(parseHash('#/series/primary/practice')).toEqual({
      name: 'practice',
      seriesId: 'primary',
      startId: 'surya-a',
    });
    expect(parseHash('#/series/intermediate/practice/pasasana')).toEqual({
      name: 'practice',
      seriesId: 'intermediate',
      startId: 'pasasana',
    });
    expect(parseHash('#/practice/utkatasana')).toEqual({
      name: 'practice',
      seriesId: 'primary',
      startId: 'utkatasana',
    });
    expect(parseHash('#/practice/continue')).toEqual({
      name: 'practice',
      seriesId: 'primary',
      startId: 'surya-a',
      resume: true,
    });
  });
});

describe('toHash', () => {
  afterEach(() => {
    window.location.hash = '';
  });

  it('builds shareable hashes', () => {
    expect(toHash({ name: 'home' })).toBe('#/');
    expect(toHash({ name: 'catalog', seriesId: 'primary' })).toBe(
      '#/series/primary',
    );
    expect(
      toHash({ name: 'catalog', seriesId: 'primary', sectionId: 'finishing' }),
    ).toBe('#/series/primary/section/finishing');
    expect(toHash({ name: 'asana', seriesId: 'primary', id: 'navasana' })).toBe(
      '#/series/primary/asana/navasana',
    );
    expect(
      toHash({ name: 'practice', seriesId: 'primary', startId: 'surya-a' }),
    ).toBe('#/series/primary/practice');
    expect(
      toHash({ name: 'practice', seriesId: 'primary', startId: 'sirsasana' }),
    ).toBe('#/series/primary/practice/sirsasana');
    expect(
      toHash({
        name: 'practice',
        seriesId: 'intermediate',
        startId: 'int-surya-a',
        resume: true,
      }),
    ).toBe('#/series/intermediate/practice/continue');
  });
});
