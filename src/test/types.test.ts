import { describe, it, expect } from 'vitest';
import type { Vendor, PriceCalculation, ConsumptionLevel } from '../types/vendor';

describe('Type Definitions', () => {
  describe('Vendor interface', () => {
    it('should accept valid vendor data', () => {
      const vendor: Vendor = {
        vendor: 'Test Vendor',
        plan: 'Test Plan',
        fixedPrice: 10.0,
        kwhPrice: 0.15,
        link: 'https://test.com'
      };

      expect(vendor.vendor).toBe('Test Vendor');
      expect(vendor.plan).toBe('Test Plan');
      expect(vendor.fixedPrice).toBe(10.0);
      expect(vendor.kwhPrice).toBe(0.15);
      expect(vendor.link).toBe('https://test.com');
    });

    it('should allow empty link', () => {
      const vendor: Vendor = {
        vendor: 'Test Vendor',
        plan: 'Test Plan',
        fixedPrice: 10.0,
        kwhPrice: 0.15,
        link: ''
      };

      expect(vendor.link).toBe('');
    });

    it('should allow decimal prices', () => {
      const vendor: Vendor = {
        vendor: 'Test Vendor',
        plan: 'Test Plan',
        fixedPrice: 10.123,
        kwhPrice: 0.12345,
        link: 'https://test.com'
      };

      expect(vendor.fixedPrice).toBe(10.123);
      expect(vendor.kwhPrice).toBe(0.12345);
    });
  });

  describe('PriceCalculation interface', () => {
    it('should accept valid price calculation data', () => {
      const calculation: PriceCalculation = {
        vendor: 'Test Vendor',
        plan: 'Test Plan',
        fixedPrice: 10.0,
        kwhPrice: 0.15,
        totalPrice: 25.0,
        link: 'https://test.com'
      };

      expect(calculation.vendor).toBe('Test Vendor');
      expect(calculation.plan).toBe('Test Plan');
      expect(calculation.fixedPrice).toBe(10.0);
      expect(calculation.kwhPrice).toBe(0.15);
      expect(calculation.totalPrice).toBe(25.0);
      expect(calculation.link).toBe('https://test.com');
    });

    it('should allow zero prices', () => {
      const calculation: PriceCalculation = {
        vendor: 'Test Vendor',
        plan: 'Test Plan',
        fixedPrice: 0.0,
        kwhPrice: 0.0,
        totalPrice: 0.0,
        link: ''
      };

      expect(calculation.fixedPrice).toBe(0.0);
      expect(calculation.kwhPrice).toBe(0.0);
      expect(calculation.totalPrice).toBe(0.0);
    });
  });

  describe('ConsumptionLevel interface', () => {
    it('should accept valid consumption level data', () => {
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
  });

  describe('Type compatibility', () => {
    it('should allow Vendor to be used in arrays', () => {
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

    it('should allow PriceCalculation to be used in arrays', () => {
      const calculations: PriceCalculation[] = [
        {
          vendor: 'Vendor A',
          plan: 'Plan A',
          fixedPrice: 5.0,
          kwhPrice: 0.12,
          totalPrice: 17.0,
          link: 'https://vendor-a.com'
        }
      ];

      expect(calculations).toHaveLength(1);
      expect(calculations[0].totalPrice).toBe(17.0);
    });

    it('should allow ConsumptionLevel to be used in arrays', () => {
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
});
