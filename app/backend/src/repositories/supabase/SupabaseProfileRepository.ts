import { IProfileRepository } from '../IProfileRepository';
import { Profile } from '../../models/Profile';
import supabase from '../../infra/supabase/supabaseClient';

export class SupabaseProfileRepository implements IProfileRepository {
  async create(profile: Profile): Promise<Profile> {
    const { data, error } = await supabase
      .from('profiles')
      .insert({
        id: profile.id,
        name: profile.name,
        phone: profile.phone,
        document: profile.document
      })
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create profile: ${error.message}`);
    }

    return new Profile({
      id: data.id,
      name: data.name,
      phone: data.phone,
      document: data.document,
      createdAt: data.created_at ? new Date(data.created_at) : undefined,
      updatedAt: data.updated_at ? new Date(data.updated_at) : undefined
    });
  }

  async findById(id: string): Promise<Profile | null> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // PostgREST code for "JSON object requested, multiple (or no) rows returned"
        return null;
      }
      throw new Error(`Failed to find profile: ${error.message}`);
    }

    if (!data) return null;

    return new Profile({
      id: data.id,
      name: data.name,
      phone: data.phone,
      document: data.document,
      createdAt: data.created_at ? new Date(data.created_at) : undefined,
      updatedAt: data.updated_at ? new Date(data.updated_at) : undefined
    });
  }

  async findByDocument(document: string): Promise<Profile | null> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('document', document)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null;
      }
      throw new Error(`Failed to find profile by document: ${error.message}`);
    }

    if (!data) return null;

    return new Profile({
      id: data.id,
      name: data.name,
      phone: data.phone,
      document: data.document,
      createdAt: data.created_at ? new Date(data.created_at) : undefined,
      updatedAt: data.updated_at ? new Date(data.updated_at) : undefined
    });
  }
}
