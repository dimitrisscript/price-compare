import type { Vendor, PriceCalculation, ConsumptionLevel } from '../types/vendor';
export { getDefaultVendors } from './prices';

export const CONSUMPTION_LEVELS = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500];

export function calculatePrice(vendor: Vendor, kwh: number): PriceCalculation {
  const totalPrice = vendor.fixedPrice + (vendor.kwhPrice * kwh);
  return {
    vendor: vendor.vendor,
    plan: vendor.plan,
    fixedPrice: vendor.fixedPrice,
    kwhPrice: vendor.kwhPrice,
    totalPrice: Math.round(totalPrice * 100) / 100, // Round to 2 decimal places
    link: vendor.link
  };
}

export function calculateAllPrices(vendors: Vendor[], kwh: number): PriceCalculation[] {
  return vendors
    .map(vendor => calculatePrice(vendor, kwh))
    .sort((a, b) => a.totalPrice - b.totalPrice); // Sort by price ascending
}

export function calculateAllConsumptionLevels(vendors: Vendor[]): ConsumptionLevel[] {
  return CONSUMPTION_LEVELS.map(kwh => ({
    kwh,
    calculations: calculateAllPrices(vendors, kwh)
  }));
}

export function parseCSVData(csvText: string): Vendor[] {
  const lines = csvText.trim().split('\n');
  const headers = lines[0].split(',');
  
  if (headers.length < 5) {
    throw new Error('Invalid CSV format: expected at least 5 columns');
  }
  
  return lines.slice(1).map(line => {
    const values = line.split(',');
    
    if (values.length < 5) {
      throw new Error('Invalid CSV format: expected at least 5 columns');
    }
    
    const fixedPrice = parseFloat(values[2].trim());
    const kwhPrice = parseFloat(values[3].trim());
    
    if (isNaN(fixedPrice) || isNaN(kwhPrice)) {
      throw new Error('Invalid numeric values in CSV');
    }
    
    return {
      vendor: values[0].trim(),
      plan: values[1].trim(),
      fixedPrice,
      kwhPrice,
      link: values[4].trim()
    };
  });
}

export function saveVendorsToStorage(vendors: Vendor[]): void {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('customVendors', JSON.stringify(vendors));
    } catch (error) {
      console.warn('Failed to save vendors to localStorage:', error);
    }
  }
}

export function loadVendorsFromStorage(): Vendor[] {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem('customVendors');
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.warn('Failed to load vendors from localStorage:', error);
      return [];
    }
  }
  return [];
}
