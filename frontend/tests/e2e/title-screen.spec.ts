import { test, expect } from '@playwright/test';

test('title screen loads with Phaser canvas', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('Atlys Travel Experience');

  const canvas = page.locator('canvas');
  await expect(canvas).toBeVisible({ timeout: 10000 });
});
