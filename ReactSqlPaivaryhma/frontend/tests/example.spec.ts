import { test, expect } from '@playwright/test';

const appAddress = 'http://localhost:5173'

test('The app should display the title', async ({ page }) => {
    // opening the page
    await page.goto(appAddress);
    // Check that the main title is found
    await expect(page.locator('h1')).toHaveText('User Management App');
    // Test run can be interrupted if started with --headed
    await page.pause();
});

test('Adding feeds to a list', async ({ page }) => {
    // Random strings are generated
    const name = (Math.random() + 1).toString(36).substring(7);
    const email = name + '@' + (Math.random() + 1).toString(36).substring(7) + '.io';
    // Opening the page
    await page.goto(appAddress);
    // These are linked to the content of the page
    // Here the values of the fields on the page are filled
    await page.fill("input#formName", name);
    await page.fill("input#formEmail", email);
    // Press the button
    await page.click('button:has-text("Create")');
    // Wait for at least one user to appear in the list
    await page.waitForSelector('.list-group-item');
    // Select the last user in the list and confirm its text
    const lastUser = page.locator('.list-group-item').last();
    await expect(lastUser).toHaveText(`${name} (${email})`);
});
