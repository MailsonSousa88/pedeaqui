import { IAuthRepository } from '../../../repositories/IAuthRepository';
import { IProfileRepository } from '../../../repositories/IProfileRepository';
import { SignUpUseCase } from '../SignUpUseCase';
import { Profile } from '../../../models/Profile';

describe('SignUpUseCase', () => {
  let mockAuthRepo: jest.Mocked<IAuthRepository>;
  let mockProfileRepo: jest.Mocked<IProfileRepository>;
  let signUpUseCase: SignUpUseCase;

  beforeEach(() => {
    mockAuthRepo = {
      signUp: jest.fn(),
      signIn: jest.fn(),
      signOut: jest.fn(),
      resetPasswordForEmail: jest.fn(),
      updateUserPassword: jest.fn(),
      refreshSession: jest.fn()
    };
    mockProfileRepo = {
      create: jest.fn(),
      findById: jest.fn()
    };
    signUpUseCase = new SignUpUseCase(mockAuthRepo, mockProfileRepo);
  });

  it('should successfully sign up a user and create a profile', async () => {
    mockAuthRepo.signUp.mockResolvedValue({ authUserId: 'user-123' });
    const mockProfile = new Profile({ id: 'user-123', name: 'Test User', phone: '123456789' });
    mockProfileRepo.create.mockResolvedValue(mockProfile);

    const result = await signUpUseCase.execute({
      email: 'test@test.com',
      password: 'password123',
      name: 'Test User',
      phone: '123456789'
    });

    expect(mockAuthRepo.signUp).toHaveBeenCalledWith('test@test.com', 'password123');
    expect(mockProfileRepo.create).toHaveBeenCalled();
    expect(result).toEqual(mockProfile);
  });

  it('should throw an error if auth signup fails', async () => {
    mockAuthRepo.signUp.mockRejectedValue(new Error('Auth failed'));

    await expect(signUpUseCase.execute({
      email: 'test@test.com',
      password: 'password123',
      name: 'Test User',
      phone: '123456789'
    })).rejects.toThrow('Auth failed');

    expect(mockProfileRepo.create).not.toHaveBeenCalled();
  });
});
