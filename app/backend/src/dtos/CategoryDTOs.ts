export interface ICreateCategoryDTO {
  storeId: string;
  tenantId: string;
  name: string;
  description?: string;
  sortOrder?: number;
}

export interface IUpdateCategoryDTO {
  name?: string;
  description?: string;
  sortOrder?: number;
}
