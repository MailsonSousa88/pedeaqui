export interface ICreateProductVariationDTO {
  tenantId: string;
  productId: string;
  label: string;
  sortOrder?: number;
}

export interface IUpdateProductVariationDTO {
  tenantId: string;
  productId: string;
  variationId: string;
  label?: string;
  sortOrder?: number;
}

export interface ICreateVariationOptionDTO {
  tenantId: string;
  productId: string;
  variationId: string;
  value: string;
  priceModifierCents?: number;
  sortOrder?: number;
}

export interface IUpdateVariationOptionDTO {
  tenantId: string;
  productId: string;
  variationId: string;
  optionId: string;
  value?: string;
  priceModifierCents?: number;
  sortOrder?: number;
}
