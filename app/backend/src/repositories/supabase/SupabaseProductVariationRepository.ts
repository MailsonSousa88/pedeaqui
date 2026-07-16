import { IProductVariationRepository } from '../IProductVariationRepository';
import { ProductVariation } from '../../models/ProductVariation';
import supabase from '../../infra/supabase/supabaseClient';

export class SupabaseProductVariationRepository implements IProductVariationRepository {
  async findById(id: string): Promise<ProductVariation | null> {
    const { data, error } = await supabase
      .from('product_variations')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) return null;
    return this.mapToModel(data);
  }

  async findByProductId(productId: string): Promise<ProductVariation[]> {
    const { data, error } = await supabase
      .from('product_variations')
      .select('*')
      .eq('product_id', productId)
      .order('sort_order', { ascending: true });

    if (error || !data) return [];
    return data.map(this.mapToModel);
  }

  async create(variation: ProductVariation): Promise<ProductVariation> {
    const { data, error } = await supabase
      .from('product_variations')
      .insert({
        id: variation.id,
        product_id: variation.productId,
        label: variation.label,
        sort_order: variation.sortOrder,
        created_at: variation.createdAt.toISOString()
      })
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create product variation: ${error.message}`);
    }

    return this.mapToModel(data);
  }

  async update(variation: ProductVariation): Promise<ProductVariation> {
    const { data, error } = await supabase
      .from('product_variations')
      .update({
        label: variation.label,
        sort_order: variation.sortOrder
      })
      .eq('id', variation.id)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update product variation: ${error.message}`);
    }

    return this.mapToModel(data);
  }

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('product_variations')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(`Failed to delete product variation: ${error.message}`);
    }
  }

  private mapToModel(data: any): ProductVariation {
    return new ProductVariation({
      id: data.id,
      productId: data.product_id,
      label: data.label,
      sortOrder: data.sort_order,
      createdAt: new Date(data.created_at)
    });
  }
}
