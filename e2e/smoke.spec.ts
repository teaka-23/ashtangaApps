import { expect, test } from '@playwright/test';

test.describe('Ashtanga Mini App', () => {
  test('opens catalog and asana sheet', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await page.getByRole('button', { name: /Surya Namaskara A/i }).click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Surya Namaskara A' })).toBeVisible();
  });

  test('starts practice and advances manually', async ({ page }) => {
    await page.goto('/#/practice/surya-a');
    await expect(page.getByRole('heading', { name: 'Surya Namaskara A' })).toBeVisible();
    await expect(page.getByText('1 / 61')).toBeVisible();
    await page.getByRole('button', { name: 'Далее' }).click();
    await expect(page.getByRole('heading', { name: 'Surya Namaskara B' })).toBeVisible();
    await expect(page.getByText('2 / 61')).toBeVisible();
  });

  test('opens asana by hash route', async ({ page }) => {
    await page.goto('/#/asana/uttana-padasana');
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Uttana Padasana' })).toBeVisible();
    await expect(page.getByText(/Лёжа на спине/)).toBeVisible();
  });

  test('switches locale', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'EN' }).click();
    await expect(page.getByRole('button', { name: 'Start practice' })).toBeVisible();
    await page.getByRole('button', { name: 'RU' }).click();
    await expect(page.getByRole('button', { name: 'Начать практику' })).toBeVisible();
  });
});
