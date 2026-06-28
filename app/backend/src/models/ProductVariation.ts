export interface IProductVariationProps {
  id: string;
  productId: string;
  label: string;
  sortOrder: number;
  createdAt: Date;
}

export class ProductVariation {
  public readonly id: string;
  public readonly productId: string;
  public label: string;
  public sortOrder: number;
  public readonly createdAt: Date;

  constructor(props: IProductVariationProps) {
    if (!props.label || props.label.trim() === '') {
      throw new Error('Product variation label is required');
    }
    this.id = props.id;
    this.productId = props.productId;
    this.label = props.label;
    this.sortOrder = props.sortOrder;
    this.createdAt = props.createdAt;
  }
}
