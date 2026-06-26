import { IStoreRepository } from '../IStoreRepository';
import { Store } from '../../models/Store';
import supabase from '../../infra/supabase/supabaseClient';

export class SupabaseStoreRepository implements IStoreRepository {
  async findById(id: string): Promise<Store | null> {
    const { data, error } = await supabase
      .from('stores')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) return null;
    return this.mapToModel(data);
  }

  async findByTenantId(tenantId: string): Promise<Store | null> {
    const { data, error } = await supabase
      .from('stores')
      .select('*')
      .eq('tenant_id', tenantId)
      .single();

    if (error || !data) return null;
    return this.mapToModel(data);
  }

  async findBySlug(slug: string): Promise<Store | null> {
    const { data, error } = await supabase
      .from('stores')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error || !data) return null;
    return this.mapToModel(data);
  }

  async create(store: Store): Promise<Store> {
    const { data, error } = await supabase
      .from('stores')
      .insert({
        id: store.id,
        tenant_id: store.tenantId,
        slug: store.slug,
        store_name: store.storeName,
        horario_abertura: store.horarioAbertura,
        horario_fechamento: store.horarioFechamento,
        endereco: store.endereco,
        descricao: store.descricao,
        logo_url: store.logoUrl,
        whatsapp_number: store.whatsappNumber,
        active: store.active,
        deleted_at: store.deletedAt ? store.deletedAt.toISOString() : null,
        created_at: store.createdAt.toISOString(),
        updated_at: store.updatedAt.toISOString()
      })
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create store: ${error.message}`);
    }

    return this.mapToModel(data);
  }

  async update(store: Store): Promise<Store> {
    const { data, error } = await supabase
      .from('stores')
      .update({
        slug: store.slug,
        store_name: store.storeName,
        horario_abertura: store.horarioAbertura,
        horario_fechamento: store.horarioFechamento,
        endereco: store.endereco,
        descricao: store.descricao,
        logo_url: store.logoUrl,
        whatsapp_number: store.whatsappNumber,
        active: store.active,
        deleted_at: store.deletedAt ? store.deletedAt.toISOString() : null,
        updated_at: store.updatedAt.toISOString()
      })
      .eq('id', store.id)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update store: ${error.message}`);
    }

    return this.mapToModel(data);
  }

  private mapToModel(data: any): Store {
    return new Store({
      id: data.id,
      tenantId: data.tenant_id,
      slug: data.slug,
      storeName: data.store_name,
      horarioAbertura: data.horario_abertura,
      horarioFechamento: data.horario_fechamento,
      endereco: data.endereco,
      descricao: data.descricao,
      logoUrl: data.logo_url,
      whatsappNumber: data.whatsapp_number,
      active: data.active,
      deletedAt: data.deleted_at ? new Date(data.deleted_at) : null,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at)
    });
  }
}
