import { Request, Response } from 'express';
import { SignUpUseCase } from '../useCases/auth/SignUpUseCase';
import { LoginUseCase } from '../useCases/auth/LoginUseCase';
import { LogoutUseCase } from '../useCases/auth/LogoutUseCase';
import { RecoverPasswordUseCase } from '../useCases/auth/RecoverPasswordUseCase';
import { ResetPasswordUseCase } from '../useCases/auth/ResetPasswordUseCase';
import { RefreshSessionUseCase } from '../useCases/auth/RefreshSessionUseCase';

import { SupabaseAuthRepository } from '../repositories/supabase/SupabaseAuthRepository';
import { SupabaseProfileRepository } from '../repositories/supabase/SupabaseProfileRepository';

export class AuthController {
  private authRepo = new SupabaseAuthRepository();
  private profileRepo = new SupabaseProfileRepository();

  private signUpUseCase = new SignUpUseCase(this.authRepo, this.profileRepo);
  private loginUseCase = new LoginUseCase(this.authRepo, this.profileRepo);
  private logoutUseCase = new LogoutUseCase(this.authRepo);
  private recoverPasswordUseCase = new RecoverPasswordUseCase(this.authRepo);
  private resetPasswordUseCase = new ResetPasswordUseCase(this.authRepo);
  private refreshSessionUseCase = new RefreshSessionUseCase(this.authRepo, this.profileRepo);

  signUp = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password, name, phone } = req.body;
      if (!email || !password || !name || !phone) {
        res.status(400).json({ error: 'Missing required fields' });
        return;
      }
      const profile = await this.signUpUseCase.execute({ email, password, name, phone });
      res.status(201).json({ message: 'User created successfully', profile });
    } catch (error: any) {
      res.status(400).json({ error: error.message || 'Error signing up' });
    }
  };

  login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        res.status(400).json({ error: 'Missing email or password' });
        return;
      }
      const session = await this.loginUseCase.execute({ email, password });
      res.status(200).json(session);
    } catch (error: any) {
      res.status(401).json({ error: error.message || 'Invalid credentials' });
    }
  };

  logout = async (req: Request, res: Response): Promise<void> => {
    try {
      const authHeader = req.header('Authorization');
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ error: 'Invalid token' });
        return;
      }
      const token = authHeader.replace('Bearer ', '');
      await this.logoutUseCase.execute(token);
      res.status(200).json({ message: 'Logged out successfully' });
    } catch (error: any) {
      res.status(500).json({ error: error.message || 'Error logging out' });
    }
  };

  recoverPassword = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email } = req.body;
      if (!email) {
        res.status(400).json({ error: 'Missing email' });
        return;
      }
      await this.recoverPasswordUseCase.execute(email);
      res.status(200).json({ message: 'Password recovery email sent' });
    } catch (error: any) {
      res.status(400).json({ error: error.message || 'Error requesting password recovery' });
    }
  };

  resetPassword = async (req: Request, res: Response): Promise<void> => {
    try {
      const { password } = req.body;
      if (!password) {
        res.status(400).json({ error: 'Missing new password' });
        return;
      }
      // Note: This assumes the user clicked a link in the recovery email
      // and their session is established/token is passed appropriately by Supabase client
      // or we use update user. For API, normally we need the token from the URL hash.
      // This is a simplified flow relying on the auth client state or a passed token.
      await this.resetPasswordUseCase.execute(password);
      res.status(200).json({ message: 'Password reset successfully' });
    } catch (error: any) {
      res.status(400).json({ error: error.message || 'Error resetting password' });
    }
  };

  refreshSession = async (req: Request, res: Response): Promise<void> => {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) {
        res.status(400).json({ error: 'Missing refresh token' });
        return;
      }
      const session = await this.refreshSessionUseCase.execute(refreshToken);
      res.status(200).json(session);
    } catch (error: any) {
      res.status(401).json({ error: error.message || 'Error refreshing session' });
    }
  };
}
