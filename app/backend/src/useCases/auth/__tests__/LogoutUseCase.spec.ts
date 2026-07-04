import { IAuthRepository } from '../../../repositories/IAuthRepository';
import { LogoutUseCase } from '../LogoutUseCase';

describe('LogoutUseCase', () => {
  let mockAuthRepo: jest.Mocked<IAuthRepository>;
  let logoutUseCase: LogoutUseCase;

  beforeEach(() => {
    mockAuthRepo = {
      signUp: jest.fn(),
      signIn: jest.fn(),
      signOut: jest.fn(),
      resetPasswordForEmail: jest.fn(),
      updateUserPassword: jest.fn(),
      refreshSession: jest.fn()
    };
    logoutUseCase = new LogoutUseCase(mockAuthRepo);
  });

  it('should successfully log out', async () => {
    mockAuthRepo.signOut.mockResolvedValue();

    await logoutUseCase.execute('some-token');

    expect(mockAuthRepo.signOut).toHaveBeenCalledWith('some-token');
  });

  it('should throw an error if logout fails', async () => {
    mockAuthRepo.signOut.mockRejectedValue(new Error('Logout failed'));

    await expect(logoutUseCase.execute('some-token')).rejects.toThrow('Logout failed');
  });
});
