import { expect, test } from '@playwright/test';

test.describe('Third series (Advanced A)', () => {
  test('opens Digasana A with the corrected description and illustration', async ({ page }) => {
    await page.goto('/#/series/advanced/asana/digasana-a');
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole('heading', { name: /Dig/ })).toBeVisible();
    await expect(dialog.getByText(/вторая нога вытянута далеко назад/i)).toBeVisible();
    const image = dialog.locator('img').first();
    await expect(image).toBeVisible();
    const src = await image.getAttribute('src');
    expect(src).toBeTruthy();
    expect(src).toMatch(/^data:image\/svg\+xml|\.svg/);
  });

  test('shows the distinct Viranchyasana B2 frame', async ({ page }) => {
    await page.goto('/#/series/advanced/asana/viranchyasana-b2');
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole('heading', { name: /Virañcyāsana B2/i })).toBeVisible();
    await expect(dialog.getByText(/глубже наклон к прямой ноге/i)).toBeVisible();
    await expect(dialog.locator('img').first()).toBeVisible();
  });

  test('shows Hanumanasana as a forward fold with the front foot held', async ({ page }) => {
    await page.goto('/#/series/advanced/asana/hanumanasana');
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole('heading', { name: /Hanumānāsana/i })).toBeVisible();
    await expect(dialog.getByText(/кисти удерживают переднюю стопу/i)).toBeVisible();
    await expect(dialog.locator('img').first()).toBeVisible();
  });

  test('keeps the printed order in the advanced catalog', async ({ page }) => {
    await page.goto('/#/series/advanced/section/advanced');
    const names = await page.locator('main button').allInnerTexts();
    const at = (needle: string) => names.findIndex((t) => t.includes(needle));
    const order = ['Bhairavāsana', 'Skandāsana', 'Durvāsana', 'Ūrdhva Kukkuṭāsana A'];
    for (let i = 1; i < order.length; i++) {
      expect(at(order[i - 1]), `${order[i - 1]} → ${order[i]}`).toBeLessThan(at(order[i]));
    }
  });
});
