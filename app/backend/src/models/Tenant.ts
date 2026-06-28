export type TenantStatus = 'active' | 'suspended';

export interface ITenantProps {
  id: string;
  name: string;
  status: TenantStatus;
  cpfCnpj: string;
  photoStorageLimit: number;
  stripeCustomerId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export class Tenant {
  public readonly id: string;
  public name: string;
  public status: TenantStatus;
  public cpfCnpj: string;
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
    this.name = props.name;
    this.status = props.status;
    this.cpfCnpj = props.cpfCnpj;
    this.photoStorageLimit = props.photoStorageLimit;
    this.stripeCustomerId = props.stripeCustomerId;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
}
