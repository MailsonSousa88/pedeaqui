export interface TenantDetailsDTO {
  tenantId: string;
  status: 'active' | 'suspended';
  businessDocument: string | null;
  profileDocument: string | null;
  billingDocument: string | null;
  photoStorageLimit: number;
  stripeCustomerId: string | null;
  createdAt: Date;
  updatedAt: Date;
}
