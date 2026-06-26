import { ITenantRepository } from '../ITenantRepository';
import { Tenant } from '../../models/Tenant';
import supabase from '../../infra/supabase/supabaseClient';

export class SupabaseTenantRepository implements ITenantRepository {
  async findById(id: string): Promise<Tenant | null> {
    const { data, error } = await supabase
      .from('tenants')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      if (error && error.code !== 'PGRST116') { // PGRST116 is not found
        console.error('Error finding tenant:', error);
      }
      return null;
    }

    return new Tenant({
      id: data.id,
      status: data.status,
      businessDocument: data.business_document,
      photoStorageLimit: data.photo_storage_limit,
      stripeCustomerId: data.stripe_customer_id,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at)
    });
  }

  async create(tenant: Tenant): Promise<Tenant> {
    const { data, error } = await supabase
      .from('tenants')
      .insert({
        id: tenant.id,
        status: tenant.status,
        business_document: tenant.businessDocument,
        photo_storage_limit: tenant.photoStorageLimit,
        stripe_customer_id: tenant.stripeCustomerId,
        created_at: tenant.createdAt.toISOString(),
        updated_at: tenant.updatedAt.toISOString()
      })
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create tenant: ${error.message}`);
    }

    return new Tenant({
      id: data.id,
      status: data.status,
      businessDocument: data.business_document,
      photoStorageLimit: data.photo_storage_limit,
      stripeCustomerId: data.stripe_customer_id,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at)
    });
  }

  async update(tenant: Tenant): Promise<Tenant> {
    const { data, error } = await supabase
      .from('tenants')
      .update({
        status: tenant.status,
        business_document: tenant.businessDocument,
        photo_storage_limit: tenant.photoStorageLimit,
        stripe_customer_id: tenant.stripeCustomerId,
        updated_at: tenant.updatedAt.toISOString()
      })
      .eq('id', tenant.id)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update tenant: ${error.message}`);
    }

    return new Tenant({
      id: data.id,
      status: data.status,
      businessDocument: data.business_document,
      photoStorageLimit: data.photo_storage_limit,
      stripeCustomerId: data.stripe_customer_id,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at)
    });
  }
}
