import { test, expect } from '@playwright/test';

// These tests run in the 'Mobile Safari' project (iPhone 14 viewport from playwright.config.ts)
test.describe('Mobile layout', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('hamburger menu button is visible at mobile viewport', async ({ page }) => {
    const hamburger = page.getByLabel('Open menu');
    await expect(hamburger).toBeVisible();
  });

  test('hamburger opens menu with all 7 topics', async ({ page }) => {
    await page.getByLabel('Open menu').click();
    const topicTitles = [
      'Data Sources', 'Data Integration', 'Data Quality',
      'Master Data Management', 'Reverse Integration',
      'Data Governance', 'AI in Data Management',
    ];
    for (const title of topicTitles) {
      await expect(page.getByText(title).first()).toBeVisible();
    }
  });

  test('touch targets are minimum 44px height', async ({ page }) => {
    const hamburger = page.getByLabel('Open menu');
    const box = await hamburger.boundingBox();
    expect(box?.height).toBeGreaterThanOrEqual(44);
  });

  test('hero text does not overflow at mobile viewport', async ({ page }) => {
    const heading = page.getByRole('heading', { name: 'Noesis', level: 1 });
    const box = await heading.boundingBox();
    const viewport = page.viewportSize();
    // Heading should not extend beyond viewport width
    expect(box?.x).toBeGreaterThanOrEqual(0);
    if (viewport && box) {
      expect(box.x + box.width).toBeLessThanOrEqual(viewport.width);
    }
  });
});
