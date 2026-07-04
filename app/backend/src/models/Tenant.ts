import { isValidCNPJ, sanitizeCNPJ } from '../utils/cnpjValidator';

export type TenantStatus = 'active' | 'suspended';

export interface ITenantProps {
  id: string;
  status: TenantStatus;
  businessDocument?: string | null;
  photoStorageLimit: number;
  stripeCustomerId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export class Tenant {
  public readonly id: string;
  public status: TenantStatus;
  public businessDocument: string | null;
  public photoStorageLimit: number;
  public stripeCustomerId: string | null;
  public readonly createdAt: Date;
  public updatedAt: Date;

  constructor(props: ITenantProps) {
    if (props.photoStorageLimit <= 0) {
      throw new Error('Photo storage limit must be greater than 0');
    }
    if (props.status !== 'active' && props.status !== 'suspended') {
      throw new Error('Invalid tenant status');
    }

    if (props.businessDocument !== undefined && props.businessDocument !== null) {
      const sanitized = sanitizeCNPJ(props.businessDocument);
      if (!isValidCNPJ(sanitized)) {
        throw new Error('Invalid business document');
      }
      this.businessDocument = sanitized;
    } else {
      this.businessDocument = null;
    }

    this.id = props.id;
    this.status = props.status;
    this.photoStorageLimit = props.photoStorageLimit;
    this.stripeCustomerId = props.stripeCustomerId;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
}
