import { IAuthRepository } from '../IAuthRepository';
import supabase from '../../infra/supabase/supabaseClient';

export class SupabaseAuthRepository implements IAuthRepository {
  async signUp(email: string, password: string): Promise<{ authUserId: string }> {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      throw new Error(`Failed to sign up: ${error.message}`);
    }
    if (!data.user) {
      throw new Error('Sign up did not return user data');
    }
    return { authUserId: data.user.id };
  }

  async signIn(email: string, password: string): Promise<{ accessToken: string; refreshToken: string; authUserId: string }> {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      throw new Error(`Failed to sign in: ${error.message}`);
    }
    if (!data.user || !data.session) {
      throw new Error('Sign in did not return session data');
    }
    return {
      accessToken: data.session.access_token,
      refreshToken: data.session.refresh_token,
      authUserId: data.user.id
    };
  }

  async signOut(accessToken: string): Promise<void> {
    const { error } = await supabase.auth.signOut({ scope: 'global' });
    if (error) {
      throw new Error(`Failed to sign out: ${error.message}`);
    }
  }

  async resetPasswordForEmail(email: string): Promise<void> {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) {
      throw new Error(`Failed to request password reset: ${error.message}`);
    }
  }

  async updateUserPassword(password: string): Promise<void> {
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      throw new Error(`Failed to update password: ${error.message}`);
    }
  }

  async refreshSession(refreshToken: string): Promise<{ accessToken: string; refreshToken: string; authUserId: string }> {
    const { data, error } = await supabase.auth.refreshSession({ refresh_token: refreshToken });
    if (error) {
      throw new Error(`Failed to refresh session: ${error.message}`);
    }
    if (!data.user || !data.session) {
      throw new Error('Refresh session did not return session data');
    }
    return {
      accessToken: data.session.access_token,
      refreshToken: data.session.refresh_token,
      authUserId: data.user.id
    };
  }
}
