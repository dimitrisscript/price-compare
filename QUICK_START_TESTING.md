# Quick Start Testing Guide

This guide will get you up and running with the testing setup in under 5 minutes.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Unit Tests
```bash
npm run test
```

### 3. Run E2E Tests
```bash
# Start the dev server in one terminal
npm run dev

# Run E2E tests in another terminal
npm run test:e2e
```

### 4. Run Visual Regression Tests
```bash
npm run test:visual
```

## 📋 Available Test Commands

| Command | Description |
|---------|-------------|
| `npm run test` | Run unit tests with coverage |
| `npm run test:watch` | Run unit tests in watch mode |
| `npm run test:ui` | Run unit tests with UI |
| `npm run test:e2e` | Run all E2E tests |
| `npm run test:e2e:headed` | Run E2E tests with visible browser |
| `npm run test:e2e:debug` | Run E2E tests in debug mode |
| `npm run test:visual` | Run visual regression tests |
| `npm run test:all` | Run both unit and E2E tests |
| `npm run update-screenshots` | Update baseline screenshots |

## 🎯 What Gets Tested

### Unit Tests (Vitest)
- ✅ Price calculations
- ✅ Data management (localStorage)
- ✅ CSV parsing
- ✅ Type definitions
- ✅ Utility functions

### E2E Tests (Playwright)
- ✅ Page loading and navigation
- ✅ Form interactions (add vendors)
- ✅ Accordion functionality
- ✅ Price calculations display
- ✅ Plan ranking analysis
- ✅ Mobile responsiveness
- ✅ Keyboard navigation

### Visual Regression Tests
- ✅ Main page layout
- ✅ Vendor management section
- ✅ Price comparison tables
- ✅ Plan ranking section
- ✅ Mobile layout

## 🔧 Troubleshooting

### E2E Tests Failing?
1. Make sure the dev server is running: `npm run dev`
2. Check that the app loads at `http://localhost:4321`
3. Try running with headed browser: `npm run test:e2e:headed`

### Visual Regression Tests Failing?
1. Run `npm run update-screenshots` to update baselines
2. Review the differences in the test report
3. Check for intentional UI changes

### Unit Tests Failing?
1. Check for TypeScript errors: `npm run build`
2. Review test output for specific failures
3. Ensure all dependencies are installed

## 📊 Test Coverage

Run coverage report:
```bash
npm run test:coverage
```

View coverage in browser:
```bash
npm run test:ui
```

## 🎨 Visual Testing

### Update Screenshots
When you make intentional UI changes:
```bash
npm run update-screenshots
```

### Review Visual Changes
```bash
npx playwright show-report
```

## 🚀 CI/CD Integration

The tests are automatically run on:
- Push to main/develop branches
- Pull requests

CI jobs include:
- Unit tests with coverage
- E2E tests across browsers
- Visual regression tests

## 📝 Writing New Tests

### Add Unit Test
```typescript
// src/test/new-feature.test.ts
import { describe, it, expect } from 'vitest';
import { yourFunction } from '../utils/your-module';

describe('Your Feature', () => {
  it('should work correctly', () => {
    const result = yourFunction('input');
    expect(result).toBe('expected');
  });
});
```

### Add E2E Test
```typescript
// tests/e2e/new-feature.spec.ts
import { test, expect } from '@playwright/test';

test('should work in browser', async ({ page }) => {
  await page.goto('/');
  await page.click('#your-button');
  await expect(page.locator('#result')).toContainText('expected');
});
```

## 🎯 Best Practices

1. **Run tests frequently** during development
2. **Use watch mode** for unit tests: `npm run test:watch`
3. **Test user workflows** not just individual features
4. **Update screenshots** when UI changes intentionally
5. **Review test reports** to understand failures

## 📚 Learn More

- [Vitest Documentation](https://vitest.dev/)
- [Playwright Documentation](https://playwright.dev/)
- [Testing Best Practices](TESTING.md)
