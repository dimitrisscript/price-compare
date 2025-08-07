import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  calculatePrice,
  calculateAllPrices,
  calculateAllConsumptionLevels,
  parseCSVData,
  saveVendorsToStorage,
  loadVendorsFromStorage,
  getDefaultVendors,
  CONSUMPTION_LEVELS
} from '../utils/calculations';
import type { Vendor, PriceCalculation } from '../types/vendor';

describe('Calculations Utils', () => {
  let mockVendor: Vendor;
  let mockVendors: Vendor[];

  beforeEach(() => {
    mockVendor = {
      vendor: 'Test Vendor',
      plan: 'Test Plan',
      fixedPrice: 10.0,
      kwhPrice: 0.15,
      link: 'https://test.com'
    };

    mockVendors = [
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
      },
      {
        vendor: 'Vendor C',
        plan: 'Plan C',
        fixedPrice: 0.0,
        kwhPrice: 0.14,
        link: 'https://vendor-c.com'
      }
    ];
  });

  describe('calculatePrice', () => {
    it('should calculate price correctly for a given vendor and consumption', () => {
      const result = calculatePrice(mockVendor, 100);
      
      expect(result).toEqual({
        vendor: 'Test Vendor',
        plan: 'Test Plan',
        fixedPrice: 10.0,
        kwhPrice: 0.15,
        totalPrice: 25.0, // 10 + (0.15 * 100)
        link: 'https://test.com'
      });
    });

    it('should round total price to 2 decimal places', () => {
      const vendorWithDecimal = {
        ...mockVendor,
        fixedPrice: 10.123,
        kwhPrice: 0.12345
      };
      
      const result = calculatePrice(vendorWithDecimal, 100);
      
      expect(result.totalPrice).toBe(22.47); // 10.123 + (0.12345 * 100) = 22.468, rounded to 22.47
    });

    it('should handle zero consumption', () => {
      const result = calculatePrice(mockVendor, 0);
      
      expect(result.totalPrice).toBe(10.0); // Only fixed price
    });

    it('should handle negative consumption (edge case)', () => {
      const result = calculatePrice(mockVendor, -50);
      
      expect(result.totalPrice).toBe(2.5); // 10 + (0.15 * -50) = 2.5
    });
  });

  describe('calculateAllPrices', () => {
    it('should calculate prices for all vendors and sort by total price', () => {
      const result = calculateAllPrices(mockVendors, 100);
      
      expect(result).toHaveLength(3);
      expect(result[0].totalPrice).toBeLessThan(result[1].totalPrice);
      expect(result[1].totalPrice).toBeLessThan(result[2].totalPrice);
    });

    it('should return correct calculations for each vendor', () => {
      const result = calculateAllPrices(mockVendors, 100);
      
      // Vendor A: 5 + (0.12 * 100) = 17
      // Vendor B: 8 + (0.10 * 100) = 18
      // Vendor C: 0 + (0.14 * 100) = 14
      // So order should be: C, A, B
      expect(result[0]).toEqual({
        vendor: 'Vendor C',
        plan: 'Plan C',
        fixedPrice: 0.0,
        kwhPrice: 0.14,
        totalPrice: 14.0,
        link: 'https://vendor-c.com'
      });
      
      expect(result[1].vendor).toBe('Vendor A');
      expect(result[2].vendor).toBe('Vendor B');
    });

    it('should handle empty vendors array', () => {
      const result = calculateAllPrices([], 100);
      
      expect(result).toEqual([]);
    });

    it('should handle zero consumption for all vendors', () => {
      const result = calculateAllPrices(mockVendors, 0);
      
      expect(result).toHaveLength(3);
      expect(result[0].totalPrice).toBe(0.0); // Vendor C has 0 fixed price
      expect(result[1].totalPrice).toBe(5.0); // Vendor A
      expect(result[2].totalPrice).toBe(8.0); // Vendor B
    });
  });

  describe('calculateAllConsumptionLevels', () => {
    it('should calculate prices for all consumption levels', () => {
      const result = calculateAllConsumptionLevels(mockVendors);
      
      expect(result).toHaveLength(CONSUMPTION_LEVELS.length);
      expect(result[0].kwh).toBe(100);
      expect(result[0].calculations).toHaveLength(3);
    });

    it('should sort calculations by price for each consumption level', () => {
      const result = calculateAllConsumptionLevels(mockVendors);
      
      result.forEach(level => {
        expect(level.calculations).toHaveLength(3);
        for (let i = 0; i < level.calculations.length - 1; i++) {
          expect(level.calculations[i].totalPrice).toBeLessThanOrEqual(level.calculations[i + 1].totalPrice);
        }
      });
    });
  });

  describe('parseCSVData', () => {
    it('should parse valid CSV data correctly', () => {
      const csvData = `vendor,plan,fixedPrice,kwhPrice,link
Vendor A,Plan A,5.0,0.12,https://vendor-a.com
Vendor B,Plan B,8.0,0.10,https://vendor-b.com`;
      
      const result = parseCSVData(csvData);
      
      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({
        vendor: 'Vendor A',
        plan: 'Plan A',
        fixedPrice: 5.0,
        kwhPrice: 0.12,
        link: 'https://vendor-a.com'
      });
    });

    it('should handle CSV with empty link field', () => {
      const csvData = `vendor,plan,fixedPrice,kwhPrice,link
Vendor A,Plan A,5.0,0.12,`;
      
      const result = parseCSVData(csvData);
      
      expect(result[0].link).toBe('');
    });

    it('should handle CSV with extra whitespace', () => {
      const csvData = `vendor,plan,fixedPrice,kwhPrice,link
  Vendor A  ,  Plan A  ,  5.0  ,  0.12  ,  https://vendor-a.com  `;
      
      const result = parseCSVData(csvData);
      
      expect(result[0]).toEqual({
        vendor: 'Vendor A',
        plan: 'Plan A',
        fixedPrice: 5.0,
        kwhPrice: 0.12,
        link: 'https://vendor-a.com'
      });
    });

    it('should throw error for invalid CSV format', () => {
      const invalidCsv = `vendor,plan,fixedPrice
Vendor A,Plan A,5.0`;
      
      expect(() => parseCSVData(invalidCsv)).toThrow();
    });
  });

  describe('Storage Functions', () => {
    beforeEach(() => {
      // Clear localStorage before each test
      localStorage.clear();
    });

    describe('saveVendorsToStorage', () => {
      it('should save vendors to localStorage', () => {
        saveVendorsToStorage(mockVendors);
        
        expect(localStorage.setItem).toHaveBeenCalledWith(
          'customVendors',
          JSON.stringify(mockVendors)
        );
      });

      it('should handle empty vendors array', () => {
        saveVendorsToStorage([]);
        
        expect(localStorage.setItem).toHaveBeenCalledWith(
          'customVendors',
          '[]'
        );
      });
    });

    describe('loadVendorsFromStorage', () => {
      it('should load vendors from localStorage', () => {
        (localStorage.getItem as any).mockReturnValue(JSON.stringify(mockVendors));
        
        const result = loadVendorsFromStorage();
        
        expect(localStorage.getItem).toHaveBeenCalledWith('customVendors');
        expect(result).toEqual(mockVendors);
      });

      it('should return empty array when no data in storage', () => {
        (localStorage.getItem as any).mockReturnValue(null);
        
        const result = loadVendorsFromStorage();
        
        expect(result).toEqual([]);
      });

      it('should return empty array when invalid JSON in storage', () => {
        (localStorage.getItem as any).mockReturnValue('invalid json');
        
        const result = loadVendorsFromStorage();
        
        expect(result).toEqual([]);
      });

      it('should handle localStorage errors in loadVendorsFromStorage', () => {
        // Mock localStorage to throw an error
        (localStorage.getItem as any).mockImplementation(() => {
          throw new Error('Storage error');
        });
        
        // Should not throw and should return empty array
        expect(() => loadVendorsFromStorage()).not.toThrow();
        expect(loadVendorsFromStorage()).toEqual([]);
      });
    });
  });

  describe('getDefaultVendors', () => {
    it('should return an array of default vendors', () => {
      const result = getDefaultVendors();
      
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
    });

    it('should return vendors with correct structure', () => {
      const result = getDefaultVendors();
      
      result.forEach(vendor => {
        expect(vendor).toHaveProperty('vendor');
        expect(vendor).toHaveProperty('plan');
        expect(vendor).toHaveProperty('fixedPrice');
        expect(vendor).toHaveProperty('kwhPrice');
        expect(vendor).toHaveProperty('link');
        expect(typeof vendor.fixedPrice).toBe('number');
        expect(typeof vendor.kwhPrice).toBe('number');
      });
    });

    it('should include specific known vendors', () => {
      const result = getDefaultVendors();
      
      const deiVendor = result.find(v => v.vendor === 'ΔΕΗ');
      expect(deiVendor).toBeDefined();
      expect(deiVendor?.plan).toBe('myHomeEnter');
    });
  });

  describe('CONSUMPTION_LEVELS', () => {
    it('should contain expected consumption levels', () => {
      expect(CONSUMPTION_LEVELS).toEqual([
        100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500
      ]);
    });

    it('should be sorted in ascending order', () => {
      for (let i = 0; i < CONSUMPTION_LEVELS.length - 1; i++) {
        expect(CONSUMPTION_LEVELS[i]).toBeLessThan(CONSUMPTION_LEVELS[i + 1]);
      }
    });
  });
});
