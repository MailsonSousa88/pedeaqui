import { IProductRepository } from '../IProductRepository';
import { Product } from '../../models/Product';
import supabase from '../../infra/supabase/supabaseClient';

export class SupabaseProductRepository implements IProductRepository {
  async findById(id: string): Promise<Product | null> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) return null;
    return this.mapToModel(data);
  }

  async findByStoreId(storeId: string): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('store_id', storeId)
      .is('deleted_at', null);

    if (error || !data) return [];
    return data.map(this.mapToModel);
  }

  async findByCategoryId(categoryId: string): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('category_id', categoryId)
      .is('deleted_at', null);

    if (error || !data) return [];
    return data.map(this.mapToModel);
  }

  async countActiveByCategoryId(categoryId: string): Promise<number> {
    const { count, error } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true })
      .eq('category_id', categoryId)
      .is('deleted_at', null);

    if (error) {
      throw new Error(`Failed to count active products: ${error.message}`);
    }

    return count || 0;
  }

  async create(product: Product): Promise<Product> {
    const { data, error } = await supabase
      .from('products')
      .insert({
        id: product.id,
        tenant_id: product.tenantId,
        store_id: product.storeId,
        category_id: product.categoryId,
        name: product.name,
        description: product.description,
        price_cents: product.priceCents,
        promo_price_cents: product.promoPriceCents,
        promo_ends_at: product.promoEndsAt ? product.promoEndsAt.toISOString() : null,
        details: product.details,
        available: product.available,
        deleted_at: product.deletedAt ? product.deletedAt.toISOString() : null,
        created_at: product.createdAt.toISOString(),
        updated_at: product.updatedAt.toISOString()
      })
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create product: ${error.message}`);
    }

    return this.mapToModel(data);
  }

  async update(product: Product): Promise<Product> {
    const { data, error } = await supabase
      .from('products')
      .update({
        category_id: product.categoryId,
        name: product.name,
        description: product.description,
        price_cents: product.priceCents,
        promo_price_cents: product.promoPriceCents,
        promo_ends_at: product.promoEndsAt ? product.promoEndsAt.toISOString() : null,
        details: product.details,
        available: product.available,
        deleted_at: product.deletedAt ? product.deletedAt.toISOString() : null,
        updated_at: product.updatedAt.toISOString()
      })
      .eq('id', product.id)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update product: ${error.message}`);
    }

    return this.mapToModel(data);
  }

  async toggleAvailability(id: string, available: boolean): Promise<Product> {
    const { data, error } = await supabase
      .from('products')
      .update({
        available,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to toggle product availability: ${error.message}`);
    }

    return this.mapToModel(data);
  }

  async softDelete(id: string): Promise<void> {
    const { error } = await supabase
      .from('products')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id);

    if (error) {
      throw new Error(`Failed to soft delete product: ${error.message}`);
    }
  }

  private mapToModel(data: any): Product {
    return new Product({
      id: data.id,
      tenantId: data.tenant_id,
      storeId: data.store_id,
      categoryId: data.category_id,
      name: data.name,
      description: data.description,
      priceCents: Number(data.price_cents),
      promoPriceCents: data.promo_price_cents !== null ? Number(data.promo_price_cents) : null,
      promoEndsAt: data.promo_ends_at ? new Date(data.promo_ends_at) : null,
      details: data.details || {},
      available: data.available,
      deletedAt: data.deleted_at ? new Date(data.deleted_at) : null,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at)
    });
  }
}
