import { test, expect } from '@playwright/test';

// Define the app URL
const appAddress = 'http://localhost:5173';

// Generate random user data
const name = (Math.random() + 1).toString(36).substring(7);
const email = `${name}@${(Math.random() + 1).toString(36).substring(7)}.io`;

/**
 * Test Case: Adds a new user
 * - Opens the app
 * - Fills out the name and email fields
 * - Clicks the "Create" button
 * - Verifies that the new user appears in the list
 */
test('adds a new user', async ({ page }) => {
    // Navigate to the app
    await page.goto(appAddress);

    // Fill the name and email fields
    await page.fill('input[placeholder="Name"]', name);
    await page.fill('input[placeholder="Email"]', email);

    // Click the "Create" button
    await page.click('button:has-text("Create")');
    await page.pause();

    // Wait for the success message and check if it appears
    await expect(page.locator(`text=User created successfully: ${name}`)).toBeVisible();
    await page.pause();

    // Ensure the new user appears in the list
    const userItem = page.locator(`li:has-text("Name: ${name}, Email: ${email}")`);
    await expect(userItem).toBeVisible();
});

/**
 * Test Case: Deletes the correct user
 * - Opens the app
 * - Waits for the newly created user to appear
 * - Clicks the "Delete" button inside that user's <li>
 * - Verifies that the user is removed from the list
 */
test('deletes the correct user', async ({ page }) => {
    // Navigate to the app
    await page.goto(appAddress);

    // Wait for the user to be visible in the list
    const userItem = page.locator(`li:has-text("Name: ${name}, Email: ${email}")`);
    await expect(userItem).toBeVisible();

    // Find and click the delete button inside the correct <li>
    const deleteButton = userItem.locator('button:has-text("Delete")');
    await deleteButton.click();

    // Ensure the user is no longer in the list
    await expect(userItem).not.toBeVisible();
});
