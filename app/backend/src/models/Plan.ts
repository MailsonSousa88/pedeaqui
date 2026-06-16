export interface IPlanProps {
  id: string;
  name: string;
  priceBrlCents: number;
  stripePriceId: string | null;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class Plan {
  public readonly id: string;
  public name: string;
  public priceBrlCents: number;
  public stripePriceId: string | null;
  public active: boolean;
  public readonly createdAt: Date;
  public updatedAt: Date;

  constructor(props: IPlanProps) {
    if (props.priceBrlCents <= 0) {
      throw new Error('Price BRL cents must be greater than 0');
    }
    this.id = props.id;
    this.name = props.name;
    this.priceBrlCents = props.priceBrlCents;
    this.stripePriceId = props.stripePriceId;
    this.active = props.active;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
}
