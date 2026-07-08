import { ICategoryRepository } from '../ICategoryRepository';
import { Category } from '../../models/Category';
import supabase from '../../infra/supabase/supabaseClient';

export class SupabaseCategoryRepository implements ICategoryRepository {
  async findById(id: string): Promise<Category | null> {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) return null;
    return this.mapToModel(data);
  }

  async findByStoreId(storeId: string): Promise<Category[]> {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('store_id', storeId)
      .is('deleted_at', null)
      .order('sort_order', { ascending: true });

    if (error || !data) return [];
    return data.map(this.mapToModel);
  }

  async findByTenantId(tenantId: string): Promise<Category[]> {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('tenant_id', tenantId)
      .is('deleted_at', null)
      .order('sort_order', { ascending: true });

    if (error || !data) return [];
    return data.map(this.mapToModel);
  }

  async countActiveByStoreId(storeId: string): Promise<number> {
    const { count, error } = await supabase
      .from('categories')
      .select('*', { count: 'exact', head: true })
      .eq('store_id', storeId)
      .is('deleted_at', null);

    if (error) {
      throw new Error(`Failed to count active categories: ${error.message}`);
    }

    return count || 0;
  }

  async create(category: Category): Promise<Category> {
    const { data, error } = await supabase
      .from('categories')
      .insert({
        id: category.id,
        store_id: category.storeId,
        tenant_id: category.tenantId,
        name: category.name,
        description: category.description,
        sort_order: category.sortOrder,
        deleted_at: category.deletedAt ? category.deletedAt.toISOString() : null,
        created_at: category.createdAt.toISOString(),
        updated_at: category.updatedAt.toISOString()
      })
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create category: ${error.message}`);
    }

    return this.mapToModel(data);
  }

  async update(category: Category): Promise<Category> {
    const { data, error } = await supabase
      .from('categories')
      .update({
        name: category.name,
        sort_order: category.sortOrder,
        description: category.description,
        deleted_at: category.deletedAt ? category.deletedAt.toISOString() : null,
        updated_at: category.updatedAt.toISOString()
      })
      .eq('id', category.id)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update category: ${error.message}`);
    }

    return this.mapToModel(data);
  }

  async softDelete(id: string): Promise<void> {
    const { error } = await supabase
      .from('categories')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id);

    if (error) {
      throw new Error(`Failed to soft delete category: ${error.message}`);
    }
  }

  private mapToModel(data: any): Category {
    return new Category({
      id: data.id,
      storeId: data.store_id,
      tenantId: data.tenant_id,
      name: data.name,
      sortOrder: data.sort_order,
      description: data.description,
      deletedAt: data.deleted_at ? new Date(data.deleted_at) : null,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at)
    });
  }
}
