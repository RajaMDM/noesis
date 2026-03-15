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
    await expect(page.getByText('Bring Your Own Key')).toBeVisible();
    await expect(page.getByText('Socratic Dialogue Mode')).toBeVisible();
  });

  test('topic card links to correct topic page', async ({ page }) => {
    await page.getByText('Data Sources').first().click();
    await expect(page).toHaveURL(/.*data-sources.*/);
    await expect(page.getByRole('heading', { name: 'Data Sources' })).toBeVisible();
  });
});
