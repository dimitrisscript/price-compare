#!/usr/bin/env node

/**
 * Script to update baseline screenshots for visual regression testing
 * Run this when you intentionally change the UI and want to update the baselines
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🖼️  Updating baseline screenshots for visual regression tests...');

// Check if we're in the right directory
if (!fs.existsSync('playwright.config.ts')) {
  console.error('❌ Error: This script must be run from the project root directory');
  process.exit(1);
}

try {
  // Run Playwright tests to generate new screenshots
  console.log('📸 Running visual regression tests to generate new baselines...');
  
  execSync('npx playwright test --grep "Visual Regression" --project=chromium', {
    stdio: 'inherit',
    cwd: process.cwd()
  });
  
  console.log('✅ Baseline screenshots updated successfully!');
  console.log('');
  console.log('📁 Screenshots are saved in:');
  console.log('   - tests/e2e/app.spec.ts-snapshots/');
  console.log('');
  console.log('💡 To review the changes:');
  console.log('   - Run: npx playwright show-report');
  console.log('   - Check the "test-results" folder for actual screenshots');
  
} catch (error) {
  console.error('❌ Error updating screenshots:', error.message);
  console.log('');
  console.log('💡 Tips:');
  console.log('   - Make sure the dev server is running: npm run dev');
  console.log('   - Check that all UI elements are visible');
  console.log('   - Ensure the page loads completely before screenshots');
  process.exit(1);
}
