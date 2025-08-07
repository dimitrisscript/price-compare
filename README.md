# Energy Price Comparison Tool

A comprehensive tool for comparing electricity prices across different vendors and consumption levels. Built with Astro and TypeScript.

## Features

- **Price Comparison**: Compare electricity prices across multiple vendors at different consumption levels
- **Vendor Management**: Add custom vendors with their pricing plans
- **Plan Ranking Analysis**: Analyze how specific plans rank across different consumption levels
- **Interactive UI**: Expandable sections with modern, responsive design
- **Dark Mode Support**: Automatic dark/light mode detection
- **Local Storage**: Save custom vendors for future sessions
- **Internationalization**: Multi-language support (English and Greek)
- **Language Selection**: Easy language switching with persistent preferences

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd price-compare
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:4321`

## Language Support

The application supports multiple languages:

- **English** (default)
- **Greek** (Ελληνικά)

### Language Selection

- Use the language selector in the header to switch between languages
- Language preference is saved in localStorage and persists across sessions
- All UI elements, including form placeholders and dynamic content, are translated

### Supported Languages

| Language | Code | Status |
|----------|------|--------|
| English | `en` | ✅ Complete |
| Greek | `el` | ✅ Complete |

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build
- `npm run test` - Run tests in watch mode
- `npm run test:ui` - Run tests with UI interface
- `npm run test:run` - Run tests once
- `npm run test:coverage` - Run tests with coverage report

## Testing

The project includes comprehensive tests for all core functionality:

### Test Structure

- **Unit Tests** (`src/test/calculations.test.ts`): Test individual utility functions
- **Type Tests** (`src/test/types.test.ts`): Verify TypeScript type definitions
- **Integration Tests** (`src/test/integration.test.ts`): Test complete workflows
- **Utility Tests** (`src/test/utils.test.ts`): Test edge cases and performance

### Running Tests

```bash
# Run all tests
npm test

# Run tests with UI
npm run test:ui

# Run tests once
npm run test:run

# Run tests with coverage
npm run test:coverage
```

### Test Coverage

The test suite covers:

- ✅ Price calculation functions
- ✅ CSV data parsing
- ✅ Local storage operations
- ✅ Type definitions
- ✅ Edge cases and error handling
- ✅ Performance considerations
- ✅ Integration workflows

## Project Structure

```
src/
├── i18n/
│   └── translations.ts        # Internationalization translations
├── layouts/
│   └── Layout.astro          # Main layout component
├── pages/
│   └── index.astro           # Main application page
├── styles/
│   └── global.css            # Global styles
├── types/
│   └── vendor.ts             # TypeScript type definitions
├── utils/
│   └── calculations.ts       # Core calculation functions
└── test/                     # Test files
    ├── setup.ts              # Test setup and mocks
    ├── calculations.test.ts  # Unit tests
    ├── types.test.ts         # Type tests
    ├── integration.test.ts   # Integration tests
    └── utils.test.ts         # Utility tests
```

## Internationalization

The application uses a custom internationalization system:

### Translation System

- **Translation Keys**: All text content is keyed for easy translation
- **Dynamic Updates**: UI updates automatically when language changes
- **Persistent Settings**: Language preference is saved in localStorage
- **Fallback Support**: Falls back to English if translation is missing

### Adding New Languages

To add a new language:

1. Add the language code and translations to `src/i18n/translations.ts`
2. Update the language selector in `src/layouts/Layout.astro`
3. Test the new language thoroughly

### Translation Keys

The application uses the following translation keys:

- `title` - Main page title
- `description` - Page description
- `vendorManagement` - Vendor management section
- `addCustomVendor` - Add custom vendor button
- `planRankingAnalysis` - Plan ranking analysis section
- `priceComparison` - Price comparison section
- And many more...

## Core Functions

### Price Calculations

- `calculatePrice(vendor, kwh)`: Calculate total price for a vendor at given consumption
- `calculateAllPrices(vendors, kwh)`: Calculate prices for all vendors and sort by price
- `calculateAllConsumptionLevels(vendors)`: Calculate prices for all consumption levels

### Data Management

- `getDefaultVendors()`: Get predefined vendor list
- `saveVendorsToStorage(vendors)`: Save custom vendors to localStorage
- `loadVendorsFromStorage()`: Load custom vendors from localStorage
- `parseCSVData(csvText)`: Parse CSV data into vendor objects

### Internationalization

- `getTranslation(key)`: Get translated text for a given key
- `getCurrentLanguage()`: Get the currently selected language
- `setLanguage(language)`: Set the language preference

## Data Format

### Vendor Object
```typescript
interface Vendor {
  vendor: string;      // Vendor name
  plan: string;        // Plan name
  fixedPrice: number;  // Fixed monthly price (€)
  kwhPrice: number;    // Price per kWh (€)
  link: string;        // Vendor website URL
}
```

### Price Calculation Object
```typescript
interface PriceCalculation {
  vendor: string;      // Vendor name
  plan: string;        // Plan name
  fixedPrice: number;  // Fixed monthly price (€)
  kwhPrice: number;    // Price per kWh (€)
  totalPrice: number;  // Calculated total price (€)
  link: string;        // Vendor website URL
}
```

## Consumption Levels

The application supports consumption levels from 100 kWh to 1500 kWh in 100 kWh increments:

- 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500 kWh

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Run the test suite
6. Submit a pull request

## Testing Guidelines

When adding new features:

1. **Write unit tests** for new utility functions
2. **Add integration tests** for new workflows
3. **Test edge cases** and error conditions
4. **Ensure type safety** with TypeScript
5. **Maintain test coverage** above 90%

### Running Tests Locally

```bash
# Install dependencies
npm install

# Run tests in watch mode
npm test

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- calculations.test.ts
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.
