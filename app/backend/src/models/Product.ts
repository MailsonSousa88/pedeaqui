export interface IProductProps {
  id: string;
  storeId: string;
  tenantId: string;
  categoryId: string | null;
  name: string;
  description: string | null;
  priceCents: number;
  promoPriceCents: number | null;
  promoEndsAt: Date | null;
  details: Record<string, unknown>;
  available: boolean;
  deletedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export class Product {
  public readonly id: string;
  public readonly storeId: string;
  public readonly tenantId: string;
  public categoryId: string | null;
  public name: string;
  public description: string | null;
  public priceCents: number;
  public promoPriceCents: number | null;
  public promoEndsAt: Date | null;
  public details: Record<string, unknown>;
  public available: boolean;
  public deletedAt: Date | null;
  public readonly createdAt: Date;
  public updatedAt: Date;

  constructor(props: IProductProps) {
    if (!props.name || props.name.trim() === '') {
      throw new Error('Product name is required');
    }
    if (props.priceCents <= 0) {
      throw new Error('Price cents must be greater than 0');
    }
    if (props.promoPriceCents !== null) {
      if (props.promoPriceCents <= 0) {
        throw new Error('Promo price cents must be greater than 0');
      }
      if (props.promoPriceCents >= props.priceCents) {
        throw new Error('Promo price cents must be less than base price cents');
      }
    }
    if (props.promoEndsAt !== null && props.promoPriceCents === null) {
      throw new Error('Promo ends at requires promo price cents to be defined');
    }

    this.id = props.id;
    this.storeId = props.storeId;
    this.tenantId = props.tenantId;
    this.categoryId = props.categoryId;
    this.name = props.name;
    this.description = props.description;
    this.priceCents = props.priceCents;
    this.promoPriceCents = props.promoPriceCents;
    this.promoEndsAt = props.promoEndsAt;
    this.details = props.details;
    this.available = props.available;
    this.deletedAt = props.deletedAt;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
}
