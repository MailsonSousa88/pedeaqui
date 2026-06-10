export interface ICategoryProps {
  id: string;
  storeId: string;
  tenantId: string;
  name: string;
  description: string | null;
  sortOrder: number;
  deletedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export class Category {
  public readonly id: string;
  public readonly storeId: string;
  public readonly tenantId: string;
  public name: string;
  public description: string | null;
  public sortOrder: number;
  public deletedAt: Date | null;
  public readonly createdAt: Date;
  public updatedAt: Date;

  constructor(props: ICategoryProps) {
    if (!props.name || props.name.trim() === '') {
      throw new Error('Category name is required');
    }
    this.id = props.id;
    this.storeId = props.storeId;
    this.tenantId = props.tenantId;
    this.name = props.name;
    this.description = props.description;
    this.sortOrder = props.sortOrder;
    this.deletedAt = props.deletedAt;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
}
