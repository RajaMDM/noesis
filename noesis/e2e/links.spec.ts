import { test, expect } from '@playwright/test';

test.describe('Cross-topic links', () => {
  test.skip('cross-topic inline links in data-quality navigate correctly', async ({ page }) => {
    await page.goto('/topics/data-quality');
    // Find first cross-topic link in the content area (not progress strip)
    const contentLinks = page.locator('main a[href^="/topics/"]');
    const count = await contentLinks.count();
    expect(count).toBeGreaterThan(0);
    // Click the first one and confirm no 404
    await contentLinks.first().click();
    await expect(page).not.toHaveURL(/404/);
  });

  test.skip('cross-topic inline links in master-data-management navigate correctly', async ({ page }) => {
    await page.goto('/topics/master-data-management');
    const contentLinks = page.locator('main a[href^="/topics/"]');
    const count = await contentLinks.count();
    expect(count).toBeGreaterThan(0);
  });

  test.skip('all "Where to Go Next" links resolve without 404', async ({ page }) => {
    await page.goto('/topics/data-integration');
    const nextSection = page.locator('section').filter({ hasText: 'Where to Go Next' });
    const links = nextSection.getByRole('link');
    const hrefs: (string | null)[] = [];
    const count = await links.count();
    for (let i = 0; i < count; i++) {
      hrefs.push(await links.nth(i).getAttribute('href'));
    }
    for (const href of hrefs) {
      if (href) {
        const response = await page.goto(href);
        expect(response?.status()).not.toBe(404);
      }
    }
  });
});
