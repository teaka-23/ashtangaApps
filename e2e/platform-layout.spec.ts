import { expect, test } from '@playwright/test';

test.describe('Platform-specific practice header', () => {
  test('moves voice and exit controls away from VK top-right buttons', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 568 });
    await page.goto('/?vk_app_id=1#/series/advanced/practice/vasisthasana');

    const practice = page.locator('.practice');
    await expect(practice).toBeVisible();
    await expect(practice).toHaveClass(/practice--vk/);
    await expect(page.locator('.practice__header')).toHaveCSS('padding-right', '96px');

    const actions = page.locator('.practice__header-actions');
    const box = await actions.boundingBox();
    expect(box).not.toBeNull();
    const right = (box?.x ?? 0) + (box?.width ?? 0);
    expect(right).toBeLessThanOrEqual(320 - 88);
    await expect(page.locator('.practice__voice')).toBeVisible();
    await expect(page.locator('.practice__exit')).toHaveText('Выйти');
  });

  test('keeps the Telegram practice header at the right edge', async ({ page }) => {
    await page.addInitScript(() => {
      type TestTelegram = {
        initData: string;
        ready: () => void;
        expand: () => void;
        disableVerticalSwipes: () => void;
      };
      const host = window as unknown as { Telegram?: { WebApp?: TestTelegram } };
      host.Telegram = {
        WebApp: {
          initData: 'query_id=1&user=%7B%7D',
          ready: () => undefined,
          expand: () => undefined,
          disableVerticalSwipes: () => undefined,
        },
      };
    });
    await page.setViewportSize({ width: 320, height: 568 });
    await page.goto('/#/series/advanced/practice/vasisthasana');

    const practice = page.locator('.practice');
    await expect(practice).toBeVisible();
    await expect(practice).not.toHaveClass(/practice--vk/);
    await expect(page.locator('.practice__header')).toHaveCSS('padding-right', '0px');
  });
});
