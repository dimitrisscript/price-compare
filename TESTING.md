# Testing Guide

This project includes comprehensive testing with both unit tests (Vitest) and end-to-end tests (Playwright).

## Test Structure

```
tests/
├── e2e/                    # End-to-end tests
│   ├── app.spec.ts        # Main application tests
│   └── user-workflows.spec.ts  # User workflow tests
src/
└── test/                  # Unit tests
    ├── calculations.test.ts
    ├── i18n.test.ts
    ├── integration.test.ts
    ├── types.test.ts
    └── utils.test.ts
```

## Running Tests

### Unit Tests (Vitest)

```bash
# Run all unit tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

### End-to-End Tests (Playwright)

```bash
# Run all E2E tests
npm run test:e2e

# Run E2E tests with UI
npm run test:e2e:ui

# Run E2E tests in headed mode (see browser)
npm run test:e2e:headed

# Run E2E tests in debug mode
npm run test:e2e:debug

# Run only visual regression tests
npm run test:visual
```

### Run All Tests

```bash
# Run both unit and E2E tests
npm run test:all
```

## Test Types

### Unit Tests
- **Location**: `src/test/`
- **Framework**: Vitest + JSDOM
- **Coverage**: Business logic, utilities, calculations
- **Files**:
  - `calculations.test.ts` - Price calculation logic
  - `i18n.test.ts` - Internationalization
  - `integration.test.ts` - Complete workflows
  - `types.test.ts` - Type definitions
  - `utils.test.ts` - Utility functions

### End-to-End Tests
- **Location**: `tests/e2e/`
- **Framework**: Playwright
- **Coverage**: User interactions, UI functionality
- **Files**:
  - `app.spec.ts` - Main application functionality
  - `user-workflows.spec.ts` - Specific user workflows

## Visual Regression Testing

The E2E tests include visual regression testing that captures screenshots of key UI components:

- Main page layout
- Vendor management section
- Consumption analysis table
- Plan comparison section
- Mobile layout

Screenshots are automatically compared against baseline images to detect visual regressions.

## Test Features

### E2E Test Features
- **Multi-browser testing**: Chrome, Firefox, Safari
- **Mobile testing**: iPhone 12, Pixel 5
- **Visual regression**: Automatic screenshot comparison
- **Responsive testing**: Different viewport sizes
- **Accessibility testing**: Keyboard navigation, focus management

### Unit Test Features
- **JSDOM environment**: Browser-like testing environment
- **Mocked localStorage**: Persistent storage testing
- **Type safety**: Full TypeScript support
- **Coverage reporting**: Detailed coverage metrics

## Continuous Integration

GitHub Actions automatically runs tests on:
- Push to main/develop branches
- Pull requests

### CI Jobs
1. **Unit Tests**: Runs Vitest with coverage
2. **E2E Tests**: Runs Playwright tests
3. **Visual Regression**: Runs visual regression tests

## Debugging Tests

### Debug Unit Tests
```bash
# Run specific test file
npm run test src/test/calculations.test.ts

# Run with debug output
npm run test -- --reporter=verbose
```

### Debug E2E Tests
```bash
# Run specific test
npm run test:e2e -- --grep "should add a custom vendor"

# Run with headed browser
npm run test:e2e:headed

# Run with debug mode
npm run test:e2e:debug
```

## Writing Tests

### Adding Unit Tests
1. Create test file in `src/test/`
2. Import functions to test
3. Use Vitest's `describe`, `it`, `expect`
4. Mock browser APIs as needed

Example:
```typescript
import { describe, it, expect } from 'vitest';
import { calculatePrice } from '../utils/calculations';

describe('Price Calculations', () => {
  it('should calculate correct price', () => {
    const result = calculatePrice(100, 5, 0.12);
    expect(result).toBe(17);
  });
});
```

### Adding E2E Tests
1. Create test file in `tests/e2e/`
2. Use Playwright's `test`, `expect`
3. Navigate and interact with the page
4. Assert expected outcomes

Example:
```typescript
import { test, expect } from '@playwright/test';

test('should add vendor', async ({ page }) => {
  await page.goto('/');
  await page.fill('#vendorName', 'Test Vendor');
  await page.click('button[type="submit"]');
  await expect(page.locator('#customVendorsList')).toContainText('Test Vendor');
});
```

## Best Practices

### Unit Tests
- Test one function/feature per test
- Use descriptive test names
- Mock external dependencies
- Test edge cases and error conditions
- Aim for high coverage

### E2E Tests
- Test complete user workflows
- Use data attributes for selectors
- Wait for elements to be ready
- Test across different browsers
- Include accessibility testing

### Visual Regression
- Take screenshots of key UI components
- Test responsive layouts
- Update baselines when UI changes intentionally
- Review visual differences carefully

## Troubleshooting

### Common Issues

**E2E tests failing on CI but passing locally**
- Check for timing issues
- Increase timeouts if needed
- Ensure consistent test data

**Visual regression tests failing**
- Review screenshot differences
- Update baseline images if changes are intentional
- Check for flaky rendering

**Unit tests failing**
- Check for mocked dependencies
- Verify test data setup
- Review test isolation

### Getting Help
- Check test output for detailed error messages
- Use debug mode for E2E tests
- Review CI logs for environment issues
- Consult Playwright and Vitest documentation
