import { describe, it, expect, beforeEach } from 'vitest';
import {
  getDefaultVendors,
  calculateAllPrices,
  calculateAllConsumptionLevels,
  saveVendorsToStorage,
  loadVendorsFromStorage
} from '../utils/calculations';
import type { Vendor } from '../types/vendor';

describe('Integration Tests', () => {
  let defaultVendors: Vendor[];
  let customVendors: Vendor[];

  beforeEach(() => {
    defaultVendors = getDefaultVendors();
    customVendors = [
      {
        vendor: 'Custom Vendor A',
        plan: 'Custom Plan A',
        fixedPrice: 3.0,
        kwhPrice: 0.11,
        link: 'https://custom-a.com'
      },
      {
        vendor: 'Custom Vendor B',
        plan: 'Custom Plan B',
        fixedPrice: 7.0,
        kwhPrice: 0.09,
        link: 'https://custom-b.com'
      }
    ];
  });

  describe('Complete workflow with default vendors', () => {
    it('should calculate prices for all consumption levels with default vendors', () => {
      const consumptionLevels = calculateAllConsumptionLevels(defaultVendors);
      
      expect(consumptionLevels).toHaveLength(15); // 100 to 1500 kWh
      
      // Test a few specific consumption levels
      const lowConsumption = consumptionLevels.find(cl => cl.kwh === 100);
      const mediumConsumption = consumptionLevels.find(cl => cl.kwh === 500);
      const highConsumption = consumptionLevels.find(cl => cl.kwh === 1000);
      
      expect(lowConsumption).toBeDefined();
      expect(mediumConsumption).toBeDefined();
      expect(highConsumption).toBeDefined();
      
      // All calculations should be sorted by price
      [lowConsumption, mediumConsumption, highConsumption].forEach(level => {
        if (level) {
          for (let i = 0; i < level.calculations.length - 1; i++) {
            expect(level.calculations[i].totalPrice).toBeLessThanOrEqual(level.calculations[i + 1].totalPrice);
          }
        }
      });
    });

    it('should find the best plan for different consumption levels', () => {
      const testConsumptionLevels = [100, 500, 1000];
      
      testConsumptionLevels.forEach(kwh => {
        const calculations = calculateAllPrices(defaultVendors, kwh);
        
        expect(calculations.length).toBeGreaterThan(0);
        
        // The first plan should be the cheapest
        const cheapestPlan = calculations[0];
        const mostExpensivePlan = calculations[calculations.length - 1];
        
        expect(cheapestPlan.totalPrice).toBeLessThanOrEqual(mostExpensivePlan.totalPrice);
        
        // Verify the calculation is correct
        const expectedTotalPrice = cheapestPlan.fixedPrice + (cheapestPlan.kwhPrice * kwh);
        expect(cheapestPlan.totalPrice).toBeCloseTo(expectedTotalPrice, 2);
      });
    });
  });

  describe('Complete workflow with custom vendors', () => {
    it('should save and load custom vendors correctly', () => {
      // Save custom vendors
      saveVendorsToStorage(customVendors);
      
      // Verify that setItem was called
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'customVendors',
        JSON.stringify(customVendors)
      );
      
      // Mock the getItem to return the saved data
      (localStorage.getItem as any).mockReturnValue(JSON.stringify(customVendors));
      
      // Load custom vendors
      const loadedVendors = loadVendorsFromStorage();
      
      expect(loadedVendors).toEqual(customVendors);
      expect(loadedVendors).toHaveLength(2);
    });

    it('should combine default and custom vendors for calculations', () => {
      // Save custom vendors
      saveVendorsToStorage(customVendors);
      
      // Mock the getItem to return the saved data
      (localStorage.getItem as any).mockReturnValue(JSON.stringify(customVendors));
      
      // Simulate the app's vendor loading logic
      const allVendors = [...defaultVendors, ...loadVendorsFromStorage()];
      
      expect(allVendors.length).toBeGreaterThan(defaultVendors.length);
      
      // Test calculations with combined vendors
      const calculations = calculateAllPrices(allVendors, 500);
      
      expect(calculations.length).toBe(allVendors.length);
      
      // Verify custom vendors are included
      const customVendorCalculations = calculations.filter(calc => 
        calc.vendor.startsWith('Custom Vendor')
      );
      
      expect(customVendorCalculations.length).toBe(2);
    });

    it('should maintain correct sorting when custom vendors are added', () => {
      // Add a very cheap custom vendor
      const veryCheapVendor: Vendor = {
        vendor: 'Very Cheap Vendor',
        plan: 'Super Cheap Plan',
        fixedPrice: 0.0,
        kwhPrice: 0.05,
        link: 'https://very-cheap.com'
      };
      
      const allVendors = [...defaultVendors, veryCheapVendor];
      const calculations = calculateAllPrices(allVendors, 1000);
      
      // The very cheap vendor should be first
      expect(calculations[0].vendor).toBe('Very Cheap Vendor');
      expect(calculations[0].totalPrice).toBe(50.0); // 0 + (0.05 * 1000)
    });
  });

  describe('Real-world scenarios', () => {
    it('should handle typical household consumption patterns', () => {
      const typicalConsumptionLevels = [200, 400, 600, 800, 1000];
      
      typicalConsumptionLevels.forEach(kwh => {
        const calculations = calculateAllPrices(defaultVendors, kwh);
        
        // Should always have results
        expect(calculations.length).toBeGreaterThan(0);
        
        // Prices should be reasonable (not negative, not extremely high)
        calculations.forEach(calc => {
          expect(calc.totalPrice).toBeGreaterThan(0);
          expect(calc.totalPrice).toBeLessThan(1000); // Reasonable upper limit
        });
        
        // Should be sorted correctly
        for (let i = 0; i < calculations.length - 1; i++) {
          expect(calculations[i].totalPrice).toBeLessThanOrEqual(calculations[i + 1].totalPrice);
        }
      });
    });

    it('should handle edge cases gracefully', () => {
      // Test with very low consumption
      const lowCalculations = calculateAllPrices(defaultVendors, 1);
      expect(lowCalculations.length).toBeGreaterThan(0);
      
      // Test with very high consumption
      const highCalculations = calculateAllPrices(defaultVendors, 10000);
      expect(highCalculations.length).toBeGreaterThan(0);
      
      // Test with zero consumption
      const zeroCalculations = calculateAllPrices(defaultVendors, 0);
      expect(zeroCalculations.length).toBeGreaterThan(0);
      
      // All calculations should still be sorted
      [lowCalculations, highCalculations, zeroCalculations].forEach(calculations => {
        for (let i = 0; i < calculations.length - 1; i++) {
          expect(calculations[i].totalPrice).toBeLessThanOrEqual(calculations[i + 1].totalPrice);
        }
      });
    });
  });

  describe('Data consistency', () => {
    it('should maintain data integrity across operations', () => {
      const originalVendors = [...defaultVendors];
      
      // Save and load vendors
      saveVendorsToStorage(customVendors);
      
      // Mock the getItem to return the saved data
      (localStorage.getItem as any).mockReturnValue(JSON.stringify(customVendors));
      
      const loadedVendors = loadVendorsFromStorage();
      
      // Combine vendors
      const allVendors = [...originalVendors, ...loadedVendors];
      
      // Calculate prices
      const calculations = calculateAllPrices(allVendors, 500);
      
      // Verify that the original vendors haven't been modified
      expect(defaultVendors).toEqual(originalVendors);
      
      // Verify that loaded vendors match saved vendors
      expect(loadedVendors).toEqual(customVendors);
      
      // Verify that all vendors are represented in calculations
      expect(calculations.length).toBe(allVendors.length);
    });

    it('should handle multiple save/load cycles correctly', () => {
      // First cycle
      saveVendorsToStorage(customVendors);
      
      // Mock the getItem to return the saved data
      (localStorage.getItem as any).mockReturnValue(JSON.stringify(customVendors));
      
      const firstLoad = loadVendorsFromStorage();
      expect(firstLoad).toEqual(customVendors);
      
      // Second cycle with different data
      const newCustomVendors = [
        {
          vendor: 'New Vendor',
          plan: 'New Plan',
          fixedPrice: 5.0,
          kwhPrice: 0.12,
          link: 'https://new-vendor.com'
        }
      ];
      
      saveVendorsToStorage(newCustomVendors);
      
      // Mock the getItem to return the new data
      (localStorage.getItem as any).mockReturnValue(JSON.stringify(newCustomVendors));
      
      const secondLoad = loadVendorsFromStorage();
      expect(secondLoad).toEqual(newCustomVendors);
      expect(secondLoad).not.toEqual(customVendors);
    });
  });

  describe('Performance considerations', () => {
    it('should handle large numbers of vendors efficiently', () => {
      // Create a large number of vendors
      const largeVendorList: Vendor[] = [];
      for (let i = 0; i < 100; i++) {
        largeVendorList.push({
          vendor: `Vendor ${i}`,
          plan: `Plan ${i}`,
          fixedPrice: Math.random() * 20,
          kwhPrice: Math.random() * 0.2,
          link: `https://vendor-${i}.com`
        });
      }
      
      // Test calculations with large vendor list
      const startTime = performance.now();
      const calculations = calculateAllPrices(largeVendorList, 500);
      const endTime = performance.now();
      
      expect(calculations.length).toBe(100);
      // Verify that calculations are sorted by price
      for (let i = 0; i < calculations.length - 1; i++) {
        expect(calculations[i].totalPrice).toBeLessThanOrEqual(calculations[i + 1].totalPrice);
      }
      
      // Should complete within reasonable time (less than 100ms)
      expect(endTime - startTime).toBeLessThan(100);
    });

    it('should handle multiple consumption level calculations efficiently', () => {
      const startTime = performance.now();
      const consumptionLevels = calculateAllConsumptionLevels(defaultVendors);
      const endTime = performance.now();
      
      expect(consumptionLevels.length).toBe(15);
      
      // Should complete within reasonable time (less than 50ms)
      expect(endTime - startTime).toBeLessThan(50);
    });
  });
});
