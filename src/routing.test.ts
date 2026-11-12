import { afterEach, describe, expect, it } from 'vitest';
import { parseHash, toHash } from './routing';

describe('parseHash', () => {
  it('parses catalog', () => {
    expect(parseHash('')).toEqual({ name: 'catalog' });
    expect(parseHash('#/')).toEqual({ name: 'catalog' });
    expect(parseHash('#/catalog')).toEqual({ name: 'catalog' });
  });

  it('parses section', () => {
    expect(parseHash('#/section/standing')).toEqual({
      name: 'catalog',
      sectionId: 'standing',
    });
  });

  it('parses legacy section anchor', () => {
    expect(parseHash('#section-seated')).toEqual({
      name: 'catalog',
      sectionId: 'seated',
    });
  });

  it('parses asana deep link', () => {
    expect(parseHash('#/asana/padangusthasana')).toEqual({
      name: 'asana',
      id: 'padangusthasana',
    });
  });

  it('rejects unknown asana', () => {
    expect(parseHash('#/asana/not-a-pose')).toEqual({ name: 'catalog' });
  });

  it('parses practice routes', () => {
    expect(parseHash('#/practice')).toEqual({
      name: 'practice',
      startId: 'surya-a',
    });
    expect(parseHash('#/practice/utkatasana')).toEqual({
      name: 'practice',
      startId: 'utkatasana',
    });
    expect(parseHash('#/practice/continue')).toEqual({
      name: 'practice',
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
    expect(toHash({ name: 'catalog' })).toBe('#/');
    expect(toHash({ name: 'catalog', sectionId: 'finishing' })).toBe(
      '#/section/finishing',
    );
    expect(toHash({ name: 'asana', id: 'navasana' })).toBe('#/asana/navasana');
    expect(toHash({ name: 'practice', startId: 'surya-a' })).toBe('#/practice');
    expect(toHash({ name: 'practice', startId: 'sirsasana' })).toBe(
      '#/practice/sirsasana',
    );
    expect(toHash({ name: 'practice', startId: 'surya-a', resume: true })).toBe(
      '#/practice/continue',
    );
  });
});
