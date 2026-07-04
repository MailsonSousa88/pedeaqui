import { IAuthRepository } from '../../../repositories/IAuthRepository';
import { ResetPasswordUseCase } from '../ResetPasswordUseCase';

describe('ResetPasswordUseCase', () => {
  let mockAuthRepo: jest.Mocked<IAuthRepository>;
  let resetPasswordUseCase: ResetPasswordUseCase;

  beforeEach(() => {
    mockAuthRepo = {
      signUp: jest.fn(),
      signIn: jest.fn(),
      signOut: jest.fn(),
      resetPasswordForEmail: jest.fn(),
      updateUserPassword: jest.fn(),
      refreshSession: jest.fn()
    };
    resetPasswordUseCase = new ResetPasswordUseCase(mockAuthRepo);
  });

  it('should successfully reset the password', async () => {
    mockAuthRepo.updateUserPassword.mockResolvedValue();

    await resetPasswordUseCase.execute('newPassword123');

    expect(mockAuthRepo.updateUserPassword).toHaveBeenCalledWith('newPassword123');
  });

  it('should throw an error if resetting the password fails', async () => {
    mockAuthRepo.updateUserPassword.mockRejectedValue(new Error('Reset failed'));

    await expect(resetPasswordUseCase.execute('newPassword123')).rejects.toThrow('Reset failed');
  });
});
