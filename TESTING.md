# Testing Documentation

This document provides comprehensive information about the testing setup for the Energy Price Comparison Tool.

## Test Structure

The project includes a comprehensive test suite organized into the following categories:

### 1. Unit Tests (`src/test/calculations.test.ts`)
Tests individual utility functions with focused, isolated test cases:
- **Price Calculations**: Tests for `calculatePrice`, `calculateAllPrices`, `calculateAllConsumptionLevels`
- **Data Management**: Tests for `getDefaultVendors`, `saveVendorsToStorage`, `loadVendorsFromStorage`
- **CSV Parsing**: Tests for `parseCSVData` with various input formats
- **Constants**: Tests for `CONSUMPTION_LEVELS` array

### 2. Type Tests (`src/test/types.test.ts`)
Verifies TypeScript type definitions work correctly:
- **Interface Validation**: Tests that `Vendor`, `PriceCalculation`, and `ConsumptionLevel` interfaces work as expected
- **Type Compatibility**: Tests that types can be used in arrays and other data structures
- **Edge Cases**: Tests with empty strings, decimal values, and zero prices

### 3. Integration Tests (`src/test/integration.test.ts`)
Tests complete workflows and real-world scenarios:
- **Complete Workflows**: Tests the entire process from loading vendors to calculating prices
- **Custom Vendors**: Tests saving, loading, and combining custom vendors with defaults
- **Real-world Scenarios**: Tests typical household consumption patterns
- **Data Consistency**: Tests that data integrity is maintained across operations
- **Performance**: Tests with large datasets and multiple calculations

### 4. Utility Tests (`src/test/utils.test.ts`)
Tests edge cases, error handling, and performance:
- **Edge Cases**: Tests with very small/large numbers, negative values, NaN, Infinity
- **CSV Parsing**: Tests various CSV formats and error conditions
- **Storage**: Tests localStorage operations with large data and special characters
- **Performance**: Tests rapid calculations and memory usage

## Test Coverage

The test suite provides excellent coverage of the core functionality:

- **95.87%** coverage of `src/utils/calculations.ts` (the core business logic)
- **100%** function coverage of utility functions
- **90.9%** branch coverage of utility functions
- **64 total tests** across all categories

## Running Tests

### Available Commands

```bash
# Run tests in watch mode (recommended for development)
npm test

# Run tests with UI interface
npm run test:ui

# Run tests once
npm run test:run

# Run tests with coverage report
npm run test:coverage
```

### Test Environment

The tests use:
- **Vitest**: Fast test runner with excellent TypeScript support
- **jsdom**: Browser-like environment for DOM testing
- **Mocked localStorage**: Simulated browser storage for testing
- **Performance testing**: Built-in performance measurement

## Test Categories

### Price Calculation Tests

Tests verify that price calculations are accurate and handle edge cases:

```typescript
// Basic calculation
expect(calculatePrice(vendor, 100).totalPrice).toBe(25.0);

// Edge cases
expect(calculatePrice(vendor, 0).totalPrice).toBe(10.0); // Only fixed price
expect(calculatePrice(vendor, -50).totalPrice).toBe(2.5); // Negative consumption
```

### Storage Tests

Tests verify localStorage operations work correctly:

```typescript
// Save and load vendors
saveVendorsToStorage(vendors);
expect(localStorage.setItem).toHaveBeenCalledWith('customVendors', JSON.stringify(vendors));

// Handle errors gracefully
expect(() => saveVendorsToStorage(vendors)).not.toThrow();
```

### CSV Parsing Tests

Tests verify CSV data can be parsed correctly:

```typescript
// Valid CSV
const result = parseCSVData(csvData);
expect(result[0].vendor).toBe('Vendor A');

// Invalid CSV throws error
expect(() => parseCSVData(invalidCsv)).toThrow();
```

### Integration Tests

Tests verify complete workflows work end-to-end:

```typescript
// Complete workflow
const allVendors = [...defaultVendors, ...loadVendorsFromStorage()];
const calculations = calculateAllPrices(allVendors, 500);
expect(calculations.length).toBe(allVendors.length);
```

## Test Data

### Mock Vendors

Tests use consistent mock data for reliable results:

```typescript
const mockVendors = [
  {
    vendor: 'Vendor A',
    plan: 'Plan A',
    fixedPrice: 5.0,
    kwhPrice: 0.12,
    link: 'https://vendor-a.com'
  },
  // ... more vendors
];
```

### Consumption Levels

Tests verify behavior across all consumption levels:

```typescript
const CONSUMPTION_LEVELS = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500];
```

## Error Handling

The test suite verifies that the application handles errors gracefully:

### localStorage Errors
- Storage quota exceeded
- Invalid JSON data
- Missing data

### CSV Parsing Errors
- Invalid format
- Missing columns
- Invalid numeric values

### Calculation Errors
- NaN values
- Infinity values
- Negative numbers

## Performance Testing

Tests verify that the application performs well:

### Speed Tests
- Large vendor lists (1000+ vendors)
- Multiple consumption level calculations
- Rapid successive calculations

### Memory Tests
- Memory usage doesn't increase dramatically
- No memory leaks with large datasets

## Best Practices

### Writing New Tests

1. **Test the behavior, not the implementation**
2. **Use descriptive test names**
3. **Test edge cases and error conditions**
4. **Keep tests isolated and independent**
5. **Use consistent mock data**

### Test Organization

```typescript
describe('Function Name', () => {
  describe('specific behavior', () => {
    it('should do something specific', () => {
      // Arrange
      const input = 'test data';
      
      // Act
      const result = functionUnderTest(input);
      
      // Assert
      expect(result).toBe(expectedValue);
    });
  });
});
```

### Mocking Guidelines

```typescript
// Mock localStorage
(localStorage.getItem as any).mockReturnValue(JSON.stringify(data));

// Mock performance
const startTime = performance.now();
// ... test code ...
const endTime = performance.now();
expect(endTime - startTime).toBeLessThan(100);
```

## Continuous Integration

The test suite is designed to run in CI/CD environments:

- **Fast execution**: Tests complete in under 1 second
- **No external dependencies**: All tests are self-contained
- **Consistent results**: Tests are deterministic and reliable
- **Good coverage**: Core functionality is thoroughly tested

## Troubleshooting

### Common Issues

1. **localStorage not mocked**: Ensure test setup is loaded
2. **Performance tests failing**: May need to adjust timing thresholds
3. **Type errors**: Ensure TypeScript types are correctly imported

### Debugging Tests

```bash
# Run specific test file
npm test -- calculations.test.ts

# Run with verbose output
npm test -- --reporter=verbose

# Run with UI for debugging
npm run test:ui
```

## Future Enhancements

Potential areas for test expansion:

1. **UI Component Tests**: Test Astro components with testing-library
2. **End-to-End Tests**: Test complete user workflows
3. **API Tests**: If external APIs are added
4. **Accessibility Tests**: Ensure UI is accessible
5. **Visual Regression Tests**: Ensure UI doesn't break visually

## Conclusion

The comprehensive test suite ensures that the Energy Price Comparison Tool is reliable, maintainable, and performs well. The tests cover all critical functionality while remaining fast and easy to run.
