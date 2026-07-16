export interface ICreateProductDTO {
  tenantId: string;
  storeId: string;
  categoryId: string;
  name: string;
  description?: string;
  priceCents: number;
  promoPriceCents?: number;
  promoEndsAt?: string;
  details?: Record<string, unknown>;
  available?: boolean;
}

export interface IUpdateProductDTO {
  categoryId?: string;
  name?: string;
  description?: string;
  priceCents?: number;
  promoPriceCents?: number;
  promoEndsAt?: string | null;
  details?: Record<string, unknown>;
}
