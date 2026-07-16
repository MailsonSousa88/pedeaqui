import { IVariationOptionRepository } from '../IVariationOptionRepository';
import { VariationOption } from '../../models/VariationOption';
import supabase from '../../infra/supabase/supabaseClient';

export class SupabaseVariationOptionRepository implements IVariationOptionRepository {
  async findById(id: string): Promise<VariationOption | null> {
    const { data, error } = await supabase
      .from('variation_options')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) return null;
    return this.mapToModel(data);
  }

  async findByVariationId(variationId: string): Promise<VariationOption[]> {
    const { data, error } = await supabase
      .from('variation_options')
      .select('*')
      .eq('variation_id', variationId)
      .order('sort_order', { ascending: true });

    if (error || !data) return [];
    return data.map(this.mapToModel);
  }

  async create(option: VariationOption): Promise<VariationOption> {
    const { data, error } = await supabase
      .from('variation_options')
      .insert({
        id: option.id,
        variation_id: option.variationId,
        value: option.value,
        price_modifier_cents: option.priceModifierCents,
        sort_order: option.sortOrder,
        created_at: option.createdAt.toISOString()
      })
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create variation option: ${error.message}`);
    }

    return this.mapToModel(data);
  }

  async update(option: VariationOption): Promise<VariationOption> {
    const { data, error } = await supabase
      .from('variation_options')
      .update({
        value: option.value,
        price_modifier_cents: option.priceModifierCents,
        sort_order: option.sortOrder
      })
      .eq('id', option.id)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update variation option: ${error.message}`);
    }

    return this.mapToModel(data);
  }

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('variation_options')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(`Failed to delete variation option: ${error.message}`);
    }
  }

  private mapToModel(data: any): VariationOption {
    return new VariationOption({
      id: data.id,
      variationId: data.variation_id,
      value: data.value,
      priceModifierCents: Number(data.price_modifier_cents),
      sortOrder: data.sort_order,
      createdAt: new Date(data.created_at)
    });
  }
}
