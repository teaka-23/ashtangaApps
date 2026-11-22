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

  test('loads catalog illustrations in all series', async ({ page }) => {
    for (const id of ['primary', 'intermediate', 'advanced']) {
      await page.goto(`/#/series/${id}`);
      await page.waitForTimeout(700);
      const images = page.locator('main img');
      expect(await images.count(), `${id}: no images`).toBeGreaterThan(10);
      const broken = await images.evaluateAll((imgs) =>
        imgs
          .filter((img) => img.complete && img.naturalWidth === 0)
          .map((img) => img.getAttribute('src') ?? ''),
      );
      expect(broken, `${id}: broken images`).toEqual([]);
    }
  });

  test('traps focus in the asana sheet and closes on Escape', async ({ page }) => {
    await page.goto('/#/series/advanced/asana/hanumanasana');
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    const inside = await page.evaluate(
      () => Boolean(document.activeElement?.closest('[role="dialog"]')),
    );
    expect(inside).toBe(true);
    await expect(dialog.getByRole('button', { name: 'Закрыть' })).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(dialog).toHaveCount(0);
  });

  test('searches asanas and clears the query', async ({ page }) => {
    await page.goto('/#/series/advanced');
    const search = page.getByPlaceholder('Поиск асаны');
    await search.fill('Хануман');
    await expect(page.locator('.asana-card')).toHaveCount(1);
    await expect(page.getByText('Hanumānāsana')).toBeVisible();
    await expect(page.getByText(/Найдено: 1/)).toBeVisible();
    await page.getByRole('button', { name: 'Очистить поиск' }).click();
    await expect(page.locator('.asana-card').first()).toBeVisible();
    await expect(page.getByPlaceholder('Поиск асаны')).toHaveValue('');
  });

  test('marks completed asanas and confirms before resetting progress', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem(
        'ashtanga.practice.progress.advanced',
        JSON.stringify({
          currentAsanaId: 'vasisthasana',
          completedIds: ['vasisthasana'],
          updatedAt: new Date().toISOString(),
        }),
      );
    });
    await page.goto('/#/series/advanced');
    await expect(page.locator('.asana-card--done')).toHaveCount(1);
    await page.getByRole('button', { name: 'Начать практику' }).click();
    await expect(page.getByRole('heading', { name: 'Начать практику заново?' })).toBeVisible();
    await expect(page.getByText(/Текущий прогресс этой серии будет сброшен/)).toBeVisible();
    await page.getByRole('button', { name: 'Начать заново' }).click();
    await expect(page).toHaveURL(/#\/series\/advanced\/practice/);
  });

  test('restores the catalog scroll position after closing a sheet', async ({ page }) => {
    await page.goto('/#/series/advanced');
    const card = page.getByRole('button', { name: /Hanumānāsana/ });
    await card.scrollIntoViewIfNeeded();
    await page.waitForTimeout(150);
    const before = await page.evaluate(() => window.scrollY);
    await card.click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.keyboard.press('Escape');
    await page.waitForTimeout(250);
    const after = await page.evaluate(() => window.scrollY);
    expect(Math.abs(after - before)).toBeLessThan(80);
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
