import { ISubscriptionRepository } from '../ISubscriptionRepository';
import { Subscription } from '../../models/Subscription';
import supabase from '../../infra/supabase/supabaseClient';

export class SupabaseSubscriptionRepository implements ISubscriptionRepository {
  async findById(id: string): Promise<Subscription | null> {
    const { data, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) return null;
    return this.mapToModel(data);
  }

  async findByTenantId(tenantId: string): Promise<Subscription | null> {
    const { data, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('tenant_id', tenantId)
      .eq('status', 'active')
      .single();

    if (error || !data) return null;
    return this.mapToModel(data);
  }

  async createOrUpdate(subscription: Partial<Subscription>): Promise<Subscription> {
    const { data, error } = await supabase
      .from('subscriptions')
      .upsert({
        id: subscription.id,
        tenant_id: subscription.tenantId,
        plan_id: subscription.planId,
        status: subscription.status,
        stripe_subscription_id: subscription.stripeSubscriptionId,
        starts_at: subscription.startsAt?.toISOString(),
        ends_at: subscription.endsAt?.toISOString(),
        created_at: subscription.createdAt?.toISOString(),
        updated_at: subscription.updatedAt?.toISOString()
      }, { onConflict: 'id' })
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to save subscription: ${error.message}`);
    }

    return this.mapToModel(data);
  }

  private mapToModel(data: any): Subscription {
    return new Subscription({
      id: data.id,
      tenantId: data.tenant_id,
      planId: data.plan_id,
      status: data.status,
      stripeSubscriptionId: data.stripe_subscription_id,
      startsAt: new Date(data.starts_at),
      endsAt: new Date(data.ends_at),
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at)
    });
  }
}
