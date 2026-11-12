import { expect, test } from '@playwright/test';

test.describe('Ashtanga Mini App', () => {
  test('shows series picker and opens primary catalog', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Первая серия' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Вторая серия' })).toBeVisible();
    await page
      .getByRole('article')
      .filter({ hasText: 'Первая серия' })
      .getByRole('button', { name: 'Открыть' })
      .click();
    await expect(page.getByRole('heading', { name: 'Первая серия' })).toBeVisible();
    await page.getByRole('button', { name: /Surya Namaskara A/i }).click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Surya Namaskara A' })).toBeVisible();
  });

  test('opens intermediate catalog and asana', async ({ page }) => {
    await page.goto('/#/series/intermediate');
    await expect(page.getByRole('heading', { name: 'Вторая серия' })).toBeVisible();
    await page.getByRole('button', { name: /Pasasana/i }).click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Pasasana' })).toBeVisible();
  });

  test('starts practice and advances manually', async ({ page }) => {
    await page.goto('/#/series/primary/practice/surya-a');
    await expect(page.getByRole('heading', { name: 'Surya Namaskara A' })).toBeVisible();
    await expect(page.getByText('1 / 61')).toBeVisible();
    await page.getByRole('button', { name: 'Далее' }).click();
    await expect(page.getByRole('heading', { name: 'Surya Namaskara B' })).toBeVisible();
    await expect(page.getByText('2 / 61')).toBeVisible();
  });

  test('legacy practice hash still works for primary', async ({ page }) => {
    await page.goto('/#/practice/surya-a');
    await expect(page.getByRole('heading', { name: 'Surya Namaskara A' })).toBeVisible();
    await expect(page.getByText('1 / 61')).toBeVisible();
  });

  test('opens asana by hash route', async ({ page }) => {
    await page.goto('/#/asana/uttana-padasana');
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Uttana Padasana' })).toBeVisible();
    await expect(page.getByText(/Лёжа на спине/)).toBeVisible();
  });
});
