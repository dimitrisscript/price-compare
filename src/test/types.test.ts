import { describe, it, expect } from 'vitest';
import type { Vendor, PriceCalculation, ConsumptionLevel } from '../types/vendor';

describe('Vendor Types', () => {
  describe('Vendor interface', () => {
    it('should allow valid vendor objects', () => {
      const validVendor: Vendor = {
        vendor: 'Test Vendor',
        plan: 'Test Plan',
        fixedPrice: 10.0,
        kwhPrice: 0.15,
        link: 'https://test.com'
      };

      expect(validVendor.vendor).toBe('Test Vendor');
      expect(validVendor.plan).toBe('Test Plan');
      expect(validVendor.fixedPrice).toBe(10.0);
      expect(validVendor.kwhPrice).toBe(0.15);
      expect(validVendor.link).toBe('https://test.com');
    });

    it('should allow vendors with empty link', () => {
      const vendorWithEmptyLink: Vendor = {
        vendor: 'Test Vendor',
        plan: 'Test Plan',
        fixedPrice: 10.0,
        kwhPrice: 0.15,
        link: ''
      };

      expect(vendorWithEmptyLink.link).toBe('');
    });

    it('should allow vendors with special characters', () => {
      const vendorWithSpecialChars: Vendor = {
        vendor: 'ΔΕΗ',
        plan: 'myHomeEnter',
        fixedPrice: 5.0,
        kwhPrice: 0.145,
        link: 'https://www.dei.gr/el/gia-to-spiti/revma/myhome-enter/'
      };

      expect(vendorWithSpecialChars.vendor).toBe('ΔΕΗ');
      expect(vendorWithSpecialChars.plan).toBe('myHomeEnter');
    });

    it('should allow vendors with decimal prices', () => {
      const vendorWithDecimals: Vendor = {
        vendor: 'Test Vendor',
        plan: 'Test Plan',
        fixedPrice: 10.123,
        kwhPrice: 0.12345,
        link: 'https://test.com'
      };

      expect(vendorWithDecimals.fixedPrice).toBe(10.123);
      expect(vendorWithDecimals.kwhPrice).toBe(0.12345);
    });

    it('should allow vendors with zero prices', () => {
      const vendorWithZeroPrices: Vendor = {
        vendor: 'Test Vendor',
        plan: 'Test Plan',
        fixedPrice: 0.0,
        kwhPrice: 0.0,
        link: 'https://test.com'
      };

      expect(vendorWithZeroPrices.fixedPrice).toBe(0.0);
      expect(vendorWithZeroPrices.kwhPrice).toBe(0.0);
    });

    it('should allow vendors with negative prices (edge case)', () => {
      const vendorWithNegativePrices: Vendor = {
        vendor: 'Test Vendor',
        plan: 'Test Plan',
        fixedPrice: -5.0,
        kwhPrice: -0.05,
        link: 'https://test.com'
      };

      expect(vendorWithNegativePrices.fixedPrice).toBe(-5.0);
      expect(vendorWithNegativePrices.kwhPrice).toBe(-0.05);
    });
  });

  describe('PriceCalculation interface', () => {
    it('should extend Vendor with totalPrice', () => {
      const priceCalculation: PriceCalculation = {
        vendor: 'Test Vendor',
        plan: 'Test Plan',
        fixedPrice: 10.0,
        kwhPrice: 0.15,
        totalPrice: 25.0,
        link: 'https://test.com'
      };

      expect(priceCalculation.vendor).toBe('Test Vendor');
      expect(priceCalculation.plan).toBe('Test Plan');
      expect(priceCalculation.fixedPrice).toBe(10.0);
      expect(priceCalculation.kwhPrice).toBe(0.15);
      expect(priceCalculation.totalPrice).toBe(25.0);
      expect(priceCalculation.link).toBe('https://test.com');
    });

    it('should allow calculated prices with decimals', () => {
      const priceCalculation: PriceCalculation = {
        vendor: 'Test Vendor',
        plan: 'Test Plan',
        fixedPrice: 10.123,
        kwhPrice: 0.12345,
        totalPrice: 22.47,
        link: 'https://test.com'
      };

      expect(priceCalculation.totalPrice).toBe(22.47);
    });

    it('should allow zero total price', () => {
      const priceCalculation: PriceCalculation = {
        vendor: 'Test Vendor',
        plan: 'Test Plan',
        fixedPrice: 0.0,
        kwhPrice: 0.0,
        totalPrice: 0.0,
        link: 'https://test.com'
      };

      expect(priceCalculation.totalPrice).toBe(0.0);
    });

    it('should allow negative total price (edge case)', () => {
      const priceCalculation: PriceCalculation = {
        vendor: 'Test Vendor',
        plan: 'Test Plan',
        fixedPrice: -5.0,
        kwhPrice: -0.05,
        totalPrice: -10.0,
        link: 'https://test.com'
      };

      expect(priceCalculation.totalPrice).toBe(-10.0);
    });
  });

  describe('ConsumptionLevel interface', () => {
    it('should have kwh and calculations properties', () => {
      const consumptionLevel: ConsumptionLevel = {
        kwh: 100,
        calculations: [
          {
            vendor: 'Vendor A',
            plan: 'Plan A',
            fixedPrice: 5.0,
            kwhPrice: 0.12,
            totalPrice: 17.0,
            link: 'https://vendor-a.com'
          },
          {
            vendor: 'Vendor B',
            plan: 'Plan B',
            fixedPrice: 8.0,
            kwhPrice: 0.10,
            totalPrice: 18.0,
            link: 'https://vendor-b.com'
          }
        ]
      };

      expect(consumptionLevel.kwh).toBe(100);
      expect(consumptionLevel.calculations).toHaveLength(2);
      expect(consumptionLevel.calculations[0].vendor).toBe('Vendor A');
      expect(consumptionLevel.calculations[1].vendor).toBe('Vendor B');
    });

    it('should allow empty calculations array', () => {
      const consumptionLevel: ConsumptionLevel = {
        kwh: 100,
        calculations: []
      };

      expect(consumptionLevel.kwh).toBe(100);
      expect(consumptionLevel.calculations).toHaveLength(0);
    });

    it('should allow large consumption values', () => {
      const consumptionLevel: ConsumptionLevel = {
        kwh: 10000,
        calculations: []
      };

      expect(consumptionLevel.kwh).toBe(10000);
    });

    it('should allow zero consumption', () => {
      const consumptionLevel: ConsumptionLevel = {
        kwh: 0,
        calculations: []
      };

      expect(consumptionLevel.kwh).toBe(0);
    });
  });

  describe('Type compatibility', () => {
    it('should allow Vendor to be used where PriceCalculation is expected', () => {
      const vendor: Vendor = {
        vendor: 'Test Vendor',
        plan: 'Test Plan',
        fixedPrice: 10.0,
        kwhPrice: 0.15,
        link: 'https://test.com'
      };

      // This should compile without errors
      const calculations: PriceCalculation[] = [vendor as PriceCalculation];
      expect(calculations).toHaveLength(1);
    });

    it('should allow arrays of vendors', () => {
      const vendors: Vendor[] = [
        {
          vendor: 'Vendor A',
          plan: 'Plan A',
          fixedPrice: 5.0,
          kwhPrice: 0.12,
          link: 'https://vendor-a.com'
        },
        {
          vendor: 'Vendor B',
          plan: 'Plan B',
          fixedPrice: 8.0,
          kwhPrice: 0.10,
          link: 'https://vendor-b.com'
        }
      ];

      expect(vendors).toHaveLength(2);
      expect(vendors[0].vendor).toBe('Vendor A');
      expect(vendors[1].vendor).toBe('Vendor B');
    });

    it('should allow arrays of price calculations', () => {
      const calculations: PriceCalculation[] = [
        {
          vendor: 'Vendor A',
          plan: 'Plan A',
          fixedPrice: 5.0,
          kwhPrice: 0.12,
          totalPrice: 17.0,
          link: 'https://vendor-a.com'
        },
        {
          vendor: 'Vendor B',
          plan: 'Plan B',
          fixedPrice: 8.0,
          kwhPrice: 0.10,
          totalPrice: 18.0,
          link: 'https://vendor-b.com'
        }
      ];

      expect(calculations).toHaveLength(2);
      expect(calculations[0].totalPrice).toBe(17.0);
      expect(calculations[1].totalPrice).toBe(18.0);
    });

    it('should allow arrays of consumption levels', () => {
      const consumptionLevels: ConsumptionLevel[] = [
        {
          kwh: 100,
          calculations: []
        },
        {
          kwh: 200,
          calculations: []
        }
      ];

      expect(consumptionLevels).toHaveLength(2);
      expect(consumptionLevels[0].kwh).toBe(100);
      expect(consumptionLevels[1].kwh).toBe(200);
    });
  });

  describe('Edge cases and validation', () => {
    it('should handle vendors with very long strings', () => {
      const longString = 'A'.repeat(1000);
      const vendorWithLongStrings: Vendor = {
        vendor: longString,
        plan: longString,
        fixedPrice: 10.0,
        kwhPrice: 0.15,
        link: longString
      };

      expect(vendorWithLongStrings.vendor).toBe(longString);
      expect(vendorWithLongStrings.plan).toBe(longString);
      expect(vendorWithLongStrings.link).toBe(longString);
    });

    it('should handle vendors with special characters in all fields', () => {
      const vendorWithSpecialChars: Vendor = {
        vendor: 'Vendor with "quotes" and émojis 🏠',
        plan: 'Plan with \n newline and €uro symbol',
        fixedPrice: 10.0,
        kwhPrice: 0.15,
        link: 'https://vendor.com/路径/文件.html?param=value&other=123'
      };

      expect(vendorWithSpecialChars.vendor).toContain('émojis');
      expect(vendorWithSpecialChars.plan).toContain('€uro');
      expect(vendorWithSpecialChars.link).toContain('路径');
    });

    it('should handle extreme numeric values', () => {
      const vendorWithExtremeValues: Vendor = {
        vendor: 'Test Vendor',
        plan: 'Test Plan',
        fixedPrice: Number.MAX_SAFE_INTEGER,
        kwhPrice: Number.MIN_SAFE_INTEGER,
        link: 'https://test.com'
      };

      expect(vendorWithExtremeValues.fixedPrice).toBe(Number.MAX_SAFE_INTEGER);
      expect(vendorWithExtremeValues.kwhPrice).toBe(Number.MIN_SAFE_INTEGER);
    });

    it('should handle NaN and Infinity values (edge case)', () => {
      const vendorWithInvalidNumbers: Vendor = {
        vendor: 'Test Vendor',
        plan: 'Test Plan',
        fixedPrice: NaN,
        kwhPrice: Infinity,
        link: 'https://test.com'
      };

      expect(isNaN(vendorWithInvalidNumbers.fixedPrice)).toBe(true);
      expect(vendorWithInvalidNumbers.kwhPrice).toBe(Infinity);
    });
  });
});
