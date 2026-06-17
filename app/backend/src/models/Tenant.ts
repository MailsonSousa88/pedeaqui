export type TenantStatus = 'active' | 'suspended';

export interface ITenantProps {
  id: string;
  status: TenantStatus;
  document: string;
  photoStorageLimit: number;
  stripeCustomerId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export class Tenant {
  public readonly id: string;
  public status: TenantStatus;
  public document: string;
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
    this.id = props.id;
    this.status = props.status;
    this.document = props.document;
    this.photoStorageLimit = props.photoStorageLimit;
    this.stripeCustomerId = props.stripeCustomerId;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
}
