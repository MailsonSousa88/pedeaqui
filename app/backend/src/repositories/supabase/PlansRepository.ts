import { IPlansRepository, CreatePlanDTO } from '../IPlansRepository';
import { Plan } from '../../models/Plan';
import supabase from '../../infra/supabase/supabaseClient';

export class PlansRepository implements IPlansRepository {
  async create(plan: CreatePlanDTO): Promise<Plan> {
    const { data, error } = await supabase
      .from('plans')
      .insert({
        name: plan.name,
        price_brl_cents: plan.priceBrlCents,
        stripe_price_id: plan.stripePriceId,
        active: plan.active,
      })
      .select()
      .single();

    if (error) {
      if (error.code === '23505') {
        throw new Error(`Plan already exists: ${error.message}`);
      }
      throw new Error(`Failed to create plan: ${error.message}`);
    }

    return this.mapToModel(data);
  }

  async findAll(filters?: { active?: boolean }): Promise<Plan[]> {
    let query = supabase.from('plans').select('*');

    if (filters && filters.active !== undefined) {
      query = query.eq('active', filters.active);
    }

    const { data, error } = await query;

    if (error) {
      throw new Error(`Failed to fetch plans: ${error.message}`);
    }

    return (data || []).map(this.mapToModel);
  }

  async findByStripeId(stripeId: string): Promise<Plan | null> {
    const { data, error } = await supabase
      .from('plans')
      .select('*')
      .eq('stripe_price_id', stripeId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw new Error(`Failed to fetch plan by stripe id: ${error.message}`);
    }

    if (!data) return null;

    return this.mapToModel(data);
  }

  async updateStatus(id: string, active: boolean): Promise<Plan | null> {
    const { data, error } = await supabase
      .from('plans')
      .update({
        active,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null;
      }
      throw new Error(`Failed to update plan status: ${error.message}`);
    }

    if (!data) return null;

    return this.mapToModel(data);
  }

  private mapToModel(data: any): Plan {
    return new Plan({
      id: data.id,
      name: data.name,
      priceBrlCents: data.price_brl_cents,
      stripePriceId: data.stripe_price_id,
      active: data.active,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at)
    });
  }
}
