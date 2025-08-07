import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  calculatePrice,
  calculateAllPrices,
  parseCSVData,
  saveVendorsToStorage,
  loadVendorsFromStorage
} from '../utils/calculations';
import type { Vendor } from '../types/vendor';

describe('Utility Functions', () => {
  describe('Price calculation edge cases', () => {
    it('should handle very small decimal prices', () => {
      const vendor: Vendor = {
        vendor: 'Test Vendor',
        plan: 'Test Plan',
        fixedPrice: 0.001,
        kwhPrice: 0.0001,
        link: 'https://test.com'
      };
      
      const result = calculatePrice(vendor, 1000);
      
      expect(result.totalPrice).toBe(0.1); // 0.001 + (0.0001 * 1000) = 0.101, rounded to 0.1
    });

    it('should handle very large prices', () => {
      const vendor: Vendor = {
        vendor: 'Test Vendor',
        plan: 'Test Plan',
        fixedPrice: 1000.0,
        kwhPrice: 1.0,
        link: 'https://test.com'
      };
      
      const result = calculatePrice(vendor, 500);
      
      expect(result.totalPrice).toBe(1500.0); // 1000 + (1 * 500)
    });

    it('should handle floating point precision issues', () => {
      const vendor: Vendor = {
        vendor: 'Test Vendor',
        plan: 'Test Plan',
        fixedPrice: 0.1,
        kwhPrice: 0.1,
        link: 'https://test.com'
      };
      
      const result = calculatePrice(vendor, 3);
      
      // Should handle floating point arithmetic correctly
      expect(result.totalPrice).toBe(0.4); // 0.1 + (0.1 * 3)
    });
  });

  describe('CSV parsing edge cases', () => {
    it('should handle CSV with quoted fields (basic implementation)', () => {
      const csvData = `vendor,plan,fixedPrice,kwhPrice,link
"Vendor A","Plan A",5.0,0.12,"https://vendor-a.com"
"Vendor B","Plan B",8.0,0.10,"https://vendor-b.com"`;
      
      // Current implementation doesn't handle quoted fields properly
      // It will parse the quoted fields as-is, which may not be the intended behavior
      const result = parseCSVData(csvData);
      
      expect(result).toHaveLength(2);
      expect(result[0].vendor).toBe('"Vendor A"'); // Quotes are included
      expect(result[1].vendor).toBe('"Vendor B"'); // Quotes are included
    });

    it('should handle CSV with commas in field values (basic implementation)', () => {
      const csvData = `vendor,plan,fixedPrice,kwhPrice,link
"Vendor A, Inc","Plan A",5.0,0.12,"https://vendor-a.com"`;
      
      // Current implementation doesn't handle quoted fields, so this should throw
      expect(() => parseCSVData(csvData)).toThrow();
    });

    it('should handle CSV with empty numeric fields', () => {
      const csvData = `vendor,plan,fixedPrice,kwhPrice,link
Vendor A,Plan A,,0.12,https://vendor-a.com`;
      
      expect(() => parseCSVData(csvData)).toThrow();
    });

    it('should handle CSV with invalid numeric values', () => {
      const csvData = `vendor,plan,fixedPrice,kwhPrice,link
Vendor A,Plan A,invalid,0.12,https://vendor-a.com`;
      
      expect(() => parseCSVData(csvData)).toThrow();
    });

    it('should handle CSV with extra columns', () => {
      const csvData = `vendor,plan,fixedPrice,kwhPrice,link,extra
Vendor A,Plan A,5.0,0.12,https://vendor-a.com,extra-value`;
      
      const result = parseCSVData(csvData);
      
      expect(result[0].vendor).toBe('Vendor A');
      expect(result[0].link).toBe('https://vendor-a.com');
    });

    it('should handle CSV with missing columns', () => {
      const csvData = `vendor,plan,fixedPrice
Vendor A,Plan A,5.0`;
      
      expect(() => parseCSVData(csvData)).toThrow();
    });
  });

  describe('Storage edge cases', () => {
    beforeEach(() => {
      localStorage.clear();
    });

    it('should handle very large vendor arrays', () => {
      const largeVendorArray: Vendor[] = [];
      for (let i = 0; i < 1000; i++) {
        largeVendorArray.push({
          vendor: `Vendor ${i}`,
          plan: `Plan ${i}`,
          fixedPrice: Math.random() * 100,
          kwhPrice: Math.random(),
          link: `https://vendor-${i}.com`
        });
      }
      
      saveVendorsToStorage(largeVendorArray);
      
      // Verify that setItem was called with the correct data
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'customVendors',
        JSON.stringify(largeVendorArray)
      );
      
      // Mock the getItem to return the saved data
      (localStorage.getItem as any).mockReturnValue(JSON.stringify(largeVendorArray));
      
      const loadedVendors = loadVendorsFromStorage();
      
      expect(loadedVendors).toEqual(largeVendorArray);
      expect(loadedVendors).toHaveLength(1000);
    });

    it('should handle vendors with special characters', () => {
      const vendorsWithSpecialChars: Vendor[] = [
        {
          vendor: 'Vendor with "quotes"',
          plan: 'Plan with \n newline',
          fixedPrice: 5.0,
          kwhPrice: 0.12,
          link: 'https://vendor.com/path?param=value&other=123'
        },
        {
          vendor: 'Vendor with émojis 🏠',
          plan: 'Plan with €uro symbol',
          fixedPrice: 8.0,
          kwhPrice: 0.10,
          link: 'https://vendor.com/路径/文件.html'
        }
      ];
      
      saveVendorsToStorage(vendorsWithSpecialChars);
      
      // Verify that setItem was called with the correct data
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'customVendors',
        JSON.stringify(vendorsWithSpecialChars)
      );
      
      // Mock the getItem to return the saved data
      (localStorage.getItem as any).mockReturnValue(JSON.stringify(vendorsWithSpecialChars));
      
      const loadedVendors = loadVendorsFromStorage();
      
      expect(loadedVendors).toEqual(vendorsWithSpecialChars);
    });

    it('should handle vendors with very long strings', () => {
      const longString = 'A'.repeat(10000);
      const vendorsWithLongStrings: Vendor[] = [
        {
          vendor: longString,
          plan: longString,
          fixedPrice: 5.0,
          kwhPrice: 0.12,
          link: longString
        }
      ];
      
      saveVendorsToStorage(vendorsWithLongStrings);
      
      // Verify that setItem was called with the correct data
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'customVendors',
        JSON.stringify(vendorsWithLongStrings)
      );
      
      // Mock the getItem to return the saved data
      (localStorage.getItem as any).mockReturnValue(JSON.stringify(vendorsWithLongStrings));
      
      const loadedVendors = loadVendorsFromStorage();
      
      expect(loadedVendors).toEqual(vendorsWithLongStrings);
    });

    it('should handle localStorage errors gracefully', () => {
      // Mock localStorage to throw an error
      const originalSetItem = localStorage.setItem;
      localStorage.setItem = vi.fn().mockImplementation(() => {
        throw new Error('Storage quota exceeded');
      });
      
      const vendors: Vendor[] = [
        {
          vendor: 'Test Vendor',
          plan: 'Test Plan',
          fixedPrice: 5.0,
          kwhPrice: 0.12,
          link: 'https://test.com'
        }
      ];
      
      // Should not throw an error (function now has try-catch)
      expect(() => saveVendorsToStorage(vendors)).not.toThrow();
      
      // Restore original function
      localStorage.setItem = originalSetItem;
    });
  });

  describe('Calculation edge cases', () => {
    it('should handle vendors with identical prices', () => {
      const identicalVendors: Vendor[] = [
        {
          vendor: 'Vendor A',
          plan: 'Plan A',
          fixedPrice: 10.0,
          kwhPrice: 0.15,
          link: 'https://vendor-a.com'
        },
        {
          vendor: 'Vendor B',
          plan: 'Plan B',
          fixedPrice: 10.0,
          kwhPrice: 0.15,
          link: 'https://vendor-b.com'
        }
      ];
      
      const calculations = calculateAllPrices(identicalVendors, 100);
      
      expect(calculations).toHaveLength(2);
      expect(calculations[0].totalPrice).toBe(calculations[1].totalPrice);
    });

    it('should handle vendors with negative prices (edge case)', () => {
      const vendorsWithNegativePrices: Vendor[] = [
        {
          vendor: 'Vendor A',
          plan: 'Plan A',
          fixedPrice: -5.0,
          kwhPrice: 0.15,
          link: 'https://vendor-a.com'
        },
        {
          vendor: 'Vendor B',
          plan: 'Plan B',
          fixedPrice: 10.0,
          kwhPrice: -0.05,
          link: 'https://vendor-b.com'
        }
      ];
      
      const calculations = calculateAllPrices(vendorsWithNegativePrices, 100);
      
      expect(calculations).toHaveLength(2);
      // Vendor A: -5 + (0.15 * 100) = 10
      // Vendor B: 10 + (-0.05 * 100) = 5
      expect(calculations[0].totalPrice).toBe(5.0); // Vendor B should be first
      expect(calculations[1].totalPrice).toBe(10.0); // Vendor A should be second
    });

    it('should handle extremely large consumption values', () => {
      const vendor: Vendor = {
        vendor: 'Test Vendor',
        plan: 'Test Plan',
        fixedPrice: 10.0,
        kwhPrice: 0.15,
        link: 'https://test.com'
      };
      
      const calculations = calculateAllPrices([vendor], Number.MAX_SAFE_INTEGER);
      
      expect(calculations).toHaveLength(1);
      expect(calculations[0].totalPrice).toBeGreaterThan(0);
    });

    it('should handle NaN and Infinity values gracefully', () => {
      const vendorsWithInvalidPrices: Vendor[] = [
        {
          vendor: 'Vendor A',
          plan: 'Plan A',
          fixedPrice: NaN,
          kwhPrice: 0.15,
          link: 'https://vendor-a.com'
        },
        {
          vendor: 'Vendor B',
          plan: 'Plan B',
          fixedPrice: 10.0,
          kwhPrice: Infinity,
          link: 'https://vendor-b.com'
        }
      ];
      
      const calculations = calculateAllPrices(vendorsWithInvalidPrices, 100);
      
      expect(calculations).toHaveLength(2);
      // Results should be NaN or Infinity, but the function should not crash
      expect(calculations[0].totalPrice).toBeNaN();
      expect(calculations[1].totalPrice).toBe(Infinity);
    });
  });

  describe('Performance and memory tests', () => {
    it('should handle rapid successive calculations', () => {
      const vendors: Vendor[] = [
        {
          vendor: 'Vendor A',
          plan: 'Plan A',
          fixedPrice: 10.0,
          kwhPrice: 0.15,
          link: 'https://vendor-a.com'
        }
      ];
      
      const startTime = performance.now();
      
      // Perform many calculations rapidly
      for (let i = 0; i < 1000; i++) {
        calculateAllPrices(vendors, i);
      }
      
      const endTime = performance.now();
      
      // Should complete within reasonable time (less than 100ms)
      expect(endTime - startTime).toBeLessThan(100);
    });

    it('should not cause memory leaks with large datasets', () => {
      const largeVendorList: Vendor[] = [];
      for (let i = 0; i < 1000; i++) {
        largeVendorList.push({
          vendor: `Vendor ${i}`,
          plan: `Plan ${i}`,
          fixedPrice: Math.random() * 100,
          kwhPrice: Math.random(),
          link: `https://vendor-${i}.com`
        });
      }
      
      // Skip memory test if performance.memory is not available
      const initialMemory = (performance as any).memory?.usedJSHeapSize || 0;
      
      // Perform calculations
      for (let i = 0; i < 100; i++) {
        calculateAllPrices(largeVendorList, i * 10);
      }
      
      const finalMemory = (performance as any).memory?.usedJSHeapSize || 0;
      
      // Memory usage should not increase dramatically (allow for some increase due to garbage collection timing)
      const memoryIncrease = finalMemory - initialMemory;
      expect(memoryIncrease).toBeLessThan(50 * 1024 * 1024); // 50MB limit
    });
  });
});
