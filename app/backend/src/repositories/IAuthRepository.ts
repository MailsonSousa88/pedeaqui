export interface IAuthRepository {
  signUp(email: string, password: string): Promise<{ authUserId: string }>;
  signIn(email: string, password: string): Promise<{ accessToken: string; refreshToken: string; authUserId: string }>;
  signOut(accessToken: string): Promise<void>;
  resetPasswordForEmail(email: string): Promise<void>;
  updateUserPassword(password: string): Promise<void>;
  refreshSession(refreshToken: string): Promise<{ accessToken: string; refreshToken: string; authUserId: string }>;
}
