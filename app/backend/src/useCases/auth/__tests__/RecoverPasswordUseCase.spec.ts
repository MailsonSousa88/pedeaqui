import { IAuthRepository } from '../../../repositories/IAuthRepository';
import { RecoverPasswordUseCase } from '../RecoverPasswordUseCase';

describe('RecoverPasswordUseCase', () => {
  let mockAuthRepo: jest.Mocked<IAuthRepository>;
  let recoverPasswordUseCase: RecoverPasswordUseCase;

  beforeEach(() => {
    mockAuthRepo = {
      signUp: jest.fn(),
      signIn: jest.fn(),
      signOut: jest.fn(),
      resetPasswordForEmail: jest.fn(),
      updateUserPassword: jest.fn(),
      refreshSession: jest.fn()
    };
    recoverPasswordUseCase = new RecoverPasswordUseCase(mockAuthRepo);
  });

  it('should successfully request password recovery', async () => {
    mockAuthRepo.resetPasswordForEmail.mockResolvedValue();

    await recoverPasswordUseCase.execute('test@test.com');

    expect(mockAuthRepo.resetPasswordForEmail).toHaveBeenCalledWith('test@test.com');
  });

  it('should throw an error if password recovery fails', async () => {
    mockAuthRepo.resetPasswordForEmail.mockRejectedValue(new Error('Recovery failed'));

    await expect(recoverPasswordUseCase.execute('test@test.com')).rejects.toThrow('Recovery failed');
  });
});
