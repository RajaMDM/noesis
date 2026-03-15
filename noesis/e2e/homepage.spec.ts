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

  test('"Start Here" CTA links to /topics/data-sources', async ({ page }) => {
    const startHereLink = page.getByRole('link', { name: 'Start Here' });
    await expect(startHereLink).toBeVisible();
    await expect(startHereLink).toHaveAttribute('href', '/topics/data-sources');
  });

  test('testimonials section shows at least 3 cards by default', async ({ page }) => {
    const section = page.locator('#testimonials');
    await expect(section).toBeVisible();
    const cards = section.locator('[class*="GlassCard"], .backdrop-blur-\\[10px\\]');
    // At least 3 testimonial cards visible
    await expect(cards.first()).toBeVisible();
  });

  test('"Show all 6 endorsements" button expands testimonials', async ({ page }) => {
    const expandButton = page.getByText('Show all 6 endorsements →');
    await expect(expandButton).toBeVisible();
    await expandButton.click();
    // Button should disappear after clicking
    await expect(expandButton).not.toBeVisible();
  });

  test('About Raja section is visible', async ({ page }) => {
    const aboutSection = page.locator('#about');
    await expect(aboutSection).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Raja Shahnawaz Soni' })).toBeVisible();
  });

  test('logo strip shows company names', async ({ page }) => {
    const logoSection = page.locator('#logos');
    await expect(logoSection).toBeVisible();
    await expect(page.getByText('Alshaya Group')).toBeVisible();
    await expect(page.getByText('Informatica')).toBeVisible();
  });
});
