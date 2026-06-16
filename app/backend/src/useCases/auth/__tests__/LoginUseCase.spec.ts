import { IAuthRepository } from '../../../repositories/IAuthRepository';
import { IProfileRepository } from '../../../repositories/IProfileRepository';
import { LoginUseCase } from '../LoginUseCase';
import { Profile } from '../../../models/Profile';

describe('LoginUseCase', () => {
  let mockAuthRepo: jest.Mocked<IAuthRepository>;
  let mockProfileRepo: jest.Mocked<IProfileRepository>;
  let loginUseCase: LoginUseCase;

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
    loginUseCase = new LoginUseCase(mockAuthRepo, mockProfileRepo);
  });

  it('should successfully log in and return session with profile', async () => {
    mockAuthRepo.signIn.mockResolvedValue({ accessToken: 'token', refreshToken: 'refresh', authUserId: 'user-123' });
    const mockProfile = new Profile({ id: 'user-123', name: 'Test User', phone: '123456789' });
    mockProfileRepo.findById.mockResolvedValue(mockProfile);

    const result = await loginUseCase.execute({ email: 'test@test.com', password: 'password123' });

    expect(mockAuthRepo.signIn).toHaveBeenCalledWith('test@test.com', 'password123');
    expect(mockProfileRepo.findById).toHaveBeenCalledWith('user-123');
    expect(result).toEqual({
      accessToken: 'token',
      refreshToken: 'refresh',
      profile: mockProfile
    });
  });

  it('should throw an error if login fails', async () => {
    mockAuthRepo.signIn.mockRejectedValue(new Error('Invalid credentials'));

    await expect(loginUseCase.execute({ email: 'test@test.com', password: 'wrong' }))
      .rejects.toThrow('Invalid credentials');
  });

  it('should return session with null profile if profile is not found', async () => {
    mockAuthRepo.signIn.mockResolvedValue({ accessToken: 'token', refreshToken: 'refresh', authUserId: 'user-123' });
    mockProfileRepo.findById.mockResolvedValue(null);

    const result = await loginUseCase.execute({ email: 'test@test.com', password: 'password123' });

    expect(result.profile).toBeNull();
  });
});
