export interface ProductDetailImage {
  id: string;
  url: string;
  sortOrder: number;
}

export interface ProductDetailOption {
  id: string;
  value: string;
  priceModifierCents: number;
  sortOrder: number;
}

export interface ProductDetailVariation {
  id: string;
  label: string;
  sortOrder: number;
  options: ProductDetailOption[];
}

export interface ProductDetail {
  id: string;
  storeId: string;
  categoryId: string;
  name: string;
  description: string | null;
  priceCents: number;
  promoPriceCents: number | null;
  promoEndsAt: Date | null;
  details: Record<string, unknown>;
  available: boolean;
  images: ProductDetailImage[];
  variations: ProductDetailVariation[];
  createdAt: Date;
  updatedAt: Date;
}
