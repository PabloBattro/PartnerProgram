import { expect, test } from '@playwright/test';

test('homepage smoke flow works', async ({ page }) => {
  await page.goto('/');

  await expect(
    page.getByRole('button', { name: 'I Want to Expand' })
  ).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'I Want to Join as Partner' })
  ).toBeVisible();

  await expect(page.getByAltText('Amazon')).toBeVisible();
  await expect(page.getByAltText('Mercado Libre')).toBeVisible();
  await expect(page.getByAltText('Walmart')).toBeVisible();
  await expect(page.getByAltText('Linio')).toBeVisible();

  await page
    .getByRole('button', { name: 'I Want to Join as Partner' })
    .click();
  await expect(
    page.getByRole('heading', {
      name: "Join Payoneer's LATAM Partner Ecosystem",
    })
  ).toBeVisible();

  await page.getByRole('button', { name: 'I Want to Expand' }).click();
  await expect(
    page.getByRole('heading', { name: 'Expand into LATAM with Confidence' })
  ).toBeVisible();
});
