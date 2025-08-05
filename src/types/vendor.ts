export interface Vendor {
  vendor: string;
  plan: string;
  fixedPrice: number;
  kwhPrice: number;
  link: string;
}

export interface PriceCalculation {
  vendor: string;
  plan: string;
  fixedPrice: number;
  kwhPrice: number;
  totalPrice: number;
  link: string;
}

export interface ConsumptionLevel {
  kwh: number;
  calculations: PriceCalculation[];
} 