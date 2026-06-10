export interface IProductImageProps {
  id: string;
  productId: string;
  url: string;
  sortOrder: number;
  createdAt: Date;
}

export class ProductImage {
  public readonly id: string;
  public readonly productId: string;
  public url: string;
  public sortOrder: number;
  public readonly createdAt: Date;

  constructor(props: IProductImageProps) {
    if (!props.url || props.url.trim() === '') {
      throw new Error('Product image URL is required');
    }
    this.id = props.id;
    this.productId = props.productId;
    this.url = props.url;
    this.sortOrder = props.sortOrder;
    this.createdAt = props.createdAt;
  }
}
