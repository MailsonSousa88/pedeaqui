export type SubscriptionStatus = 'active' | 'past_due' | 'unpaid' | 'canceled';

export interface ISubscriptionProps {
  id: string;
  tenantId: string;
  planId: string;
  status: SubscriptionStatus;
  stripeSubscriptionId: string | null;
  startsAt: Date;
  endsAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export class Subscription {
  public readonly id: string;
  public readonly tenantId: string;
  public planId: string;
  public status: SubscriptionStatus;
  public stripeSubscriptionId: string | null;
  public startsAt: Date;
  public endsAt: Date;
  public readonly createdAt: Date;
  public updatedAt: Date;

  constructor(props: ISubscriptionProps) {
    const validStatuses: SubscriptionStatus[] = ['active', 'past_due', 'unpaid', 'canceled'];
    if (!validStatuses.includes(props.status)) {
      throw new Error('Invalid subscription status');
    }
    this.id = props.id;
    this.tenantId = props.tenantId;
    this.planId = props.planId;
    this.status = props.status;
    this.stripeSubscriptionId = props.stripeSubscriptionId;
    this.startsAt = props.startsAt;
    this.endsAt = props.endsAt;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
}
