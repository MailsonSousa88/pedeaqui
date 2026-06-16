export interface IProductImageProps {
  id: string;
  productId: string;
  r2Key: string;
  url: string;
  sizeBytes: number;
  mimeType: string;
  sortOrder: number;
  createdAt: Date;
}

export class ProductImage {
  public readonly id: string;
  public readonly productId: string;
  public r2Key: string;
  public url: string;
  public sizeBytes: number;
  public mimeType: string;
  public sortOrder: number;
  public readonly createdAt: Date;

  constructor(props: IProductImageProps) {
    if (!props.url || props.url.trim() === '') {
      throw new Error('Product image URL is required');
    }
    if (!props.r2Key || props.r2Key.trim() === '') {
      throw new Error('Product image r2Key is required');
    }
    this.id = props.id;
    this.productId = props.productId;
    this.r2Key = props.r2Key;
    this.url = props.url;
    this.sizeBytes = props.sizeBytes;
    this.mimeType = props.mimeType;
    this.sortOrder = props.sortOrder;
    this.createdAt = props.createdAt;
  }
}
