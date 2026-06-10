export interface IStoreProps {
  id: string;
  tenantId: string;
  slug: string;
  name: string;
  description: string | null;
  logoUrl: string | null;
  whatsappNumber: string | null;
  active: boolean;
  deletedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export class Store {
  public readonly id: string;
  public readonly tenantId: string;
  public slug: string;
  public name: string;
  public description: string | null;
  public logoUrl: string | null;
  public whatsappNumber: string | null;
  public active: boolean;
  public deletedAt: Date | null;
  public readonly createdAt: Date;
  public updatedAt: Date;

  constructor(props: IStoreProps) {
    if (!props.slug || props.slug.trim() === '') {
      throw new Error('Store slug is required');
    }
    if (!props.name || props.name.trim() === '') {
      throw new Error('Store name is required');
    }
    this.id = props.id;
    this.tenantId = props.tenantId;
    this.slug = props.slug;
    this.name = props.name;
    this.description = props.description;
    this.logoUrl = props.logoUrl;
    this.whatsappNumber = props.whatsappNumber;
    this.active = props.active;
    this.deletedAt = props.deletedAt;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
}
