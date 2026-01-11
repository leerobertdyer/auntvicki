// Shared types for the Aunt Vicki app

export interface IcartItem {
  name: string;
  quantity: number;
  price: number;
  photos: string[];
  // Variant options (maps to PostgreSQL array types)
  availableSizes?: string[];
  availableColors?: string[];
  // Selected variants (for cart items)
  selectedSize?: string;
  selectedColor?: string;
}

