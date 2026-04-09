import { test, expect } from '@playwright/test';

test('canvas loads and survives click interactions', async ({ page }) => {
  await page.goto('/');

  const canvas = page.locator('canvas');
  await expect(canvas).toBeVisible({ timeout: 10000 });

  // Click through TitleScene → MarketScene
  await canvas.click();
  await page.waitForTimeout(800);

  // Canvas should still be visible after scene transition
  await expect(canvas).toBeVisible();

  // Click several more times to verify stability
  for (let i = 0; i < 5; i++) {
    await canvas.click();
    await page.waitForTimeout(400);
  }

  await expect(canvas).toBeVisible();
});
