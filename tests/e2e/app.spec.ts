import { test, expect } from '@playwright/test';

test.describe('Energy Price Comparison App', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for the page to be fully loaded
    await page.waitForSelector('[data-translate="vendorManagement"]');
  });

  test('should load the main page with all sections', async ({ page }) => {
    // Check that main sections are present
    await expect(page.locator('[data-translate="vendorManagement"]')).toBeVisible();
    await expect(page.locator('[data-translate="planRankingAnalysis"]')).toBeVisible();
    await expect(page.locator('[data-translate="priceComparison"]')).toBeVisible();
  });

  test('should expand and collapse accordion sections', async ({ page }) => {
    // Test vendor management accordion
    const vendorAccordion = page.locator('.vendor-accordion-trigger');
    const vendorContent = page.locator('#vendor-accordion');
    
    // Initially hidden
    await expect(vendorContent).toHaveClass(/hidden/);
    
    // Click to expand
    await vendorAccordion.click();
    await expect(vendorContent).not.toHaveClass(/hidden/);
    
    // Click to collapse
    await vendorAccordion.click();
    await expect(vendorContent).toHaveClass(/hidden/);
  });

  test('should add a custom vendor', async ({ page }) => {
    // Expand vendor management section
    await page.locator('.vendor-accordion-trigger').click();
    
    // Fill in vendor form
    await page.fill('#vendorName', 'Test Vendor');
    await page.fill('#planName', 'Test Plan');
    await page.fill('#fixedPrice', '5.00');
    await page.fill('#kwhPrice', '0.12');
    await page.fill('#vendorLink', 'https://test-vendor.com');
    
    // Submit form
    await page.locator('#vendorForm button[type="submit"]').click();
    
    // Check that vendor was added to the list
    await expect(page.locator('#customVendorsList')).toContainText('Test Vendor - Test Plan');
  });

  test('should calculate prices for different consumption levels', async ({ page }) => {
    // Wait for the first consumption level accordion to be available
    await page.waitForSelector('.accordion-trigger', { timeout: 10000 });
    
    // Click on the first consumption level (100 kWh)
    await page.locator('.accordion-trigger').first().click();
    
    // Wait for the table to be populated
    await page.waitForSelector('table tbody tr', { timeout: 10000 });
    
    // Check that we have results
    const rows = page.locator('table tbody tr');
    const rowCount = await rows.count();
    expect(rowCount).toBeGreaterThan(0);
    
    // Check that prices are calculated (first row should have numeric values)
    const firstRow = rows.first();
    const totalPriceText = await firstRow.locator('td').nth(5).textContent();
    expect(totalPriceText).toMatch(/^€\d+\.\d+$/); // Total price should be numeric with euro symbol
  });

  test('should select and analyze a specific plan', async ({ page }) => {
    // Open the plan ranking accordion
    await page.locator('.plan-ranking-accordion-trigger').click();
    await page.waitForSelector('#planSelector', { timeout: 10000 });
    
    // Select a specific plan from the dropdown
    await page.selectOption('#planSelector', 'ΔΕΗ|myHomeEnter');
    
    // Verify that the ranking results are displayed
    await expect(page.locator('#planRankingResults')).toBeVisible();
    await expect(page.locator('#selectedPlanName')).toContainText('ΔΕΗ - myHomeEnter');
    
    // Verify that the ranking table has data
    const rankingRows = page.locator('#planRankingTable tr');
    const rowCount = await rankingRows.count();
    expect(rowCount).toBeGreaterThan(0);
    
    // Verify summary statistics are displayed
    await expect(page.locator('#averageRank')).not.toHaveText('-');
    await expect(page.locator('#bestRank')).not.toHaveText('-');
    await expect(page.locator('#worstRank')).not.toHaveText('-');
    await expect(page.locator('#timesFirst')).not.toHaveText('-');
  });

  test('should expand and collapse price comparison sections', async ({ page }) => {
    // Wait for price comparison section to load
    await page.waitForSelector('[data-translate="priceComparison"]');
    
    // Click on the first consumption level accordion
    const firstAccordion = page.locator('.accordion-trigger').first();
    await firstAccordion.click();
    
    // Check that the content is visible
    const accordionContent = page.locator('.accordion-content').first();
    await expect(accordionContent).not.toHaveClass(/hidden/);
    
    // Click again to collapse
    await firstAccordion.click();
    await expect(accordionContent).toHaveClass(/hidden/);
  });

  test('should handle language switching', async ({ page }) => {
    // Find language selector
    const languageSelector = page.locator('#language-selector');
    
    if (await languageSelector.isVisible()) {
      // Switch to Greek
      await page.selectOption('#language-selector', 'el');
      
      // Check that content changed (look for Greek text)
      await expect(page.locator('[data-translate="vendorManagement"]')).toContainText('Διαχείριση');
      
      // Check that footer disclaimer also changed to Greek
      const disclaimerText = page.locator('#footer-disclaimer');
      await expect(disclaimerText).toContainText('Αυτή η σελίδα συγκρίνει μόνο τα σταθερά (μπλέ) τιμολόγια παρόχων.');
      
      // Check that last update text also changed to Greek
      const lastUpdateText = page.locator('#footer-last-update');
      await expect(lastUpdateText).toContainText('Τελευταία ενημέρωση: 2025-08-08');
      
      // Switch back to English
      await page.selectOption('#language-selector', 'en');
      
      // Check that content changed back to English
      await expect(page.locator('[data-translate="vendorManagement"]')).toContainText('Vendor Management');
      
      // Check that footer disclaimer also changed back to English
      await expect(disclaimerText).toContainText('This page compares only the fixed (blue) tariffs of providers.');
      
      // Check that last update text also changed back to English
      await expect(lastUpdateText).toContainText('Last update: 2025-08-08');
    }
  });

  test('should be responsive on mobile devices', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Check that all sections are still accessible
    await expect(page.locator('[data-translate="vendorManagement"]')).toBeVisible();
    await expect(page.locator('[data-translate="planRankingAnalysis"]')).toBeVisible();
    
    // Test mobile navigation
    await page.locator('.vendor-accordion-trigger').click();
    await expect(page.locator('#vendor-accordion')).toBeVisible();
  });

  test('should display footer with last update and dynamic disclaimer', async ({ page }) => {
    // Check that footer is present
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    
    // Check last update text
    const lastUpdateText = page.locator('#footer-last-update');
    await expect(lastUpdateText).toContainText('Last update: 2025-08-08');
    
    // Check disclaimer text (should be in English by default)
    const disclaimerText = page.locator('#footer-disclaimer');
    await expect(disclaimerText).toContainText('This page compares only the fixed (blue) tariffs of providers.');
    
    // Check that footer has proper styling
    await expect(footer).toHaveClass(/mt-12/);
    await expect(footer).toHaveClass(/py-6/);
    await expect(footer).toHaveClass(/border-t/);
  });

  test('footer should be visible on mobile devices', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Check that footer is still visible and properly styled
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    
    // Check that all text is readable on mobile
    const lastUpdateText = page.locator('#footer-last-update');
    await expect(lastUpdateText).toBeVisible();
    
    const disclaimerText = page.locator('#footer-disclaimer');
    await expect(disclaimerText).toBeVisible();
  });

  test('table headers should be properly translated', async ({ page }) => {
    // Wait for the first consumption level accordion to be available
    await page.waitForSelector('.accordion-trigger', { timeout: 10000 });
    
    // Click on the first consumption level (100 kWh)
    await page.locator('.accordion-trigger').first().click();
    
    // Wait for the table to be populated
    await page.waitForSelector('table tbody tr', { timeout: 10000 });
    
    // Get the first visible table (the one we just opened)
    const firstTable = page.locator('.accordion-content:not(.hidden) table').first();
    
    // Verify that "Vendor" and "Plan" headers have data-translate attributes
    const vendorHeader = firstTable.locator('thead th[data-translate="vendor"]');
    const planHeader = firstTable.locator('thead th[data-translate="plan"]');
    
    await expect(vendorHeader).toBeVisible();
    await expect(planHeader).toBeVisible();
    
    // Verify the English text is displayed by default
    await expect(vendorHeader).toHaveText('Vendor');
    await expect(planHeader).toHaveText('Plan');
    
    // Test language switching (if language selector is available)
    const languageSelector = page.locator('select[name="language"], [data-translate="languageSelect"]');
    if (await languageSelector.count() > 0) {
      // Switch to Greek
      await languageSelector.selectOption('el');
      
      // Wait for translations to update
      await page.waitForTimeout(500);
      
      // Verify Greek translations are displayed
      await expect(vendorHeader).toHaveText('Πάροχος');
      await expect(planHeader).toHaveText('Πρόγραμμα');
      
      // Switch back to English
      await languageSelector.selectOption('en');
      
      // Wait for translations to update
      await page.waitForTimeout(500);
      
      // Verify English text is displayed again
      await expect(vendorHeader).toHaveText('Vendor');
      await expect(planHeader).toHaveText('Plan');
    }
  });
});

test.describe('Visual Regression Tests', () => {
  test('main page layout should match baseline', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('[data-translate="vendorManagement"]');
    
    // Take screenshot of the entire page
    await expect(page).toHaveScreenshot('main-page-layout.png');
  });

  test('vendor management section should match baseline', async ({ page }) => {
    await page.goto('/');
    await page.locator('.vendor-accordion-trigger').click();
    await page.waitForSelector('#vendor-accordion');
    
    // Take screenshot of the vendor management section
    const vendorSection = page.locator('.vendor-accordion-content');
    await expect(vendorSection).toHaveScreenshot('vendor-management-section.png');
  });

  test('price comparison table should match baseline', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.accordion-trigger', { timeout: 10000 });
    
    // Click on the first consumption level
    await page.locator('.accordion-trigger').first().click();
    await page.waitForSelector('table tbody tr', { timeout: 10000 });
    
    // Wait for the accordion content to be fully visible
    await page.waitForTimeout(1000);
    
    // Ensure accordion content is visible and stable before taking screenshot
    const accordionContent = page.locator('.accordion-content').first();
    await page.waitForTimeout(2000); // Wait for any animations to complete
    
    // Wait for accordion content to be visible and have data
    await expect(accordionContent).toBeVisible();
    const rowCount = await page.locator('table tbody tr').count();
    expect(rowCount).toBeGreaterThan(0);
    
    // Take screenshot of the price comparison table
    // This will create the baseline on first run
    await expect(accordionContent).toHaveScreenshot('price-comparison-table.png');
  });

  test('plan ranking section should match baseline', async ({ page }) => {
    await page.goto('/');
    await page.locator('.plan-ranking-accordion-trigger').click();
    await page.waitForSelector('#planSelector', { timeout: 10000 });
    
    // Take screenshot of the plan ranking section
    const rankingSection = page.locator('.plan-ranking-accordion-content');
    await expect(rankingSection).toHaveScreenshot('plan-ranking-section.png');
  });

  test('mobile layout should match baseline', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForSelector('[data-translate="vendorManagement"]');
    
    // Take screenshot of mobile layout
    await expect(page).toHaveScreenshot('mobile-layout.png');
  });

  test('footer should match baseline', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('footer');
    
    // Scroll to footer to ensure it's visible
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
    
    // Wait a moment for any animations to complete
    await page.waitForTimeout(1000);
    
    // Take screenshot of the footer
    const footer = page.locator('footer');
    await expect(footer).toHaveScreenshot('footer-layout.png');
  });
});
