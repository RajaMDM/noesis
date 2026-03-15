import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('renders hero section with Noesis headline', async ({ page }) => {
    const heading = page.getByRole('heading', { name: 'Noesis', level: 1 });
    await expect(heading).toBeVisible();
  });

  test('topic cards grid shows 7 cards', async ({ page }) => {
    // All 7 topic titles must appear
    const topicTitles = [
      'Data Sources', 'Data Integration', 'Data Quality',
      'Master Data Management', 'Reverse Integration',
      'Data Governance', 'AI in Data Management',
    ];
    for (const title of topicTitles) {
      await expect(page.getByText(title).first()).toBeVisible();
    }
  });

  test('sticky nav is visible on scroll', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, 500));
    const nav = page.getByRole('navigation', { name: 'Main navigation' });
    await expect(nav).toBeVisible();
  });

  test('"What makes Noesis different" section is visible below fold', async ({ page }) => {
    await expect(page.getByText('What Makes Noesis Different')).toBeVisible();
    // Use role-based locator to avoid strict mode violation (badge and heading both contain 'Bring Your Own Key')
    await expect(page.getByRole('heading', { name: 'Bring Your Own Key' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Socratic Dialogue Mode' })).toBeVisible();
  });

  test('topic card links to correct topic page', async ({ page }) => {
    // Scroll to bring topic cards into view (whileInView animation requires intersection)
    await page.evaluate(() => window.scrollTo(0, 400));
    await page.waitForTimeout(300);
    const dataSourcesLink = page.getByRole('link', { name: /Data Sources/ }).first();
    await dataSourcesLink.click();
    await expect(page).toHaveURL(/.*data-sources.*/);
    await expect(page.getByRole('heading', { name: 'Data Sources' })).toBeVisible();
  });
});
