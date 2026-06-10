export interface IVariationOptionProps {
  id: string;
  variationId: string;
  value: string;
  sortOrder: number;
  createdAt: Date;
}

export class VariationOption {
  public readonly id: string;
  public readonly variationId: string;
  public value: string;
  public sortOrder: number;
  public readonly createdAt: Date;

  constructor(props: IVariationOptionProps) {
    if (!props.value || props.value.trim() === '') {
      throw new Error('Variation option value is required');
    }
    this.id = props.id;
    this.variationId = props.variationId;
    this.value = props.value;
    this.sortOrder = props.sortOrder;
    this.createdAt = props.createdAt;
  }
}
