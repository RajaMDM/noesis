import { test, expect } from '@playwright/test';

const TOPIC_SLUGS = [
  'data-sources',
  'data-integration',
  'data-quality',
  'master-data-management',
  'reverse-integration',
  'data-governance',
  'ai-in-data-management',
];

test.describe('Topic pages', () => {
  for (const slug of TOPIC_SLUGS) {
    test.skip(`/topics/${slug} loads and shows content`, async ({ page }) => {
      await page.goto(`/topics/${slug}`);
      await expect(page).not.toHaveURL(/404/);
      // Overview section visible
      await expect(page.getByRole('heading', { name: 'Overview' })).toBeVisible();
      // How AI Applies section visible
      await expect(page.getByRole('heading', { name: 'How AI Applies' })).toBeVisible();
      // From the Field callout visible
      await expect(page.getByText('From the Field')).toBeVisible();
      // Architecture/diagram section visible
      await expect(page.getByRole('heading', { name: 'Architecture' })).toBeVisible();
      // Progress strip renders (7 steps)
      const progressStrip = page.getByRole('navigation', { name: 'Learning path' });
      await expect(progressStrip).toBeVisible();
      const steps = progressStrip.getByRole('listitem');
      await expect(steps).toHaveCount(7);
    });
  }

  test.skip('progress strip current step is highlighted', async ({ page }) => {
    await page.goto('/topics/data-quality');
    const strip = page.getByRole('navigation', { name: 'Learning path' });
    // The "Data Quality" step should have aria-current="step"
    const activeStep = strip.locator('[aria-current="step"]');
    await expect(activeStep).toBeVisible();
  });

  test.skip('progress strip steps are all clickable links', async ({ page }) => {
    await page.goto('/topics/data-sources');
    const strip = page.getByRole('navigation', { name: 'Learning path' });
    const links = strip.getByRole('link');
    await expect(links).toHaveCount(7);
  });

  test.skip('"Where to Go Next" section renders and has clickable links', async ({ page }) => {
    await page.goto('/topics/data-sources');
    await expect(page.getByRole('heading', { name: 'Where to Go Next' })).toBeVisible();
    const nextLinks = page.locator('section').filter({ hasText: 'Where to Go Next' }).getByRole('link');
    await expect(nextLinks.first()).toBeVisible();
  });
});
