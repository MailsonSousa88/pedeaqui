import { IAuthRepository } from '../../../repositories/IAuthRepository';
import { IProfileRepository } from '../../../repositories/IProfileRepository';
import { RefreshSessionUseCase } from '../RefreshSessionUseCase';
import { Profile } from '../../../models/Profile';

describe('RefreshSessionUseCase', () => {
  let mockAuthRepo: jest.Mocked<IAuthRepository>;
  let mockProfileRepo: jest.Mocked<IProfileRepository>;
  let refreshSessionUseCase: RefreshSessionUseCase;

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
      findById: jest.fn(),
      findByDocument: jest.fn(),
      update: jest.fn()
    };
    refreshSessionUseCase = new RefreshSessionUseCase(mockAuthRepo, mockProfileRepo);
  });

  it('should successfully refresh session and return session with profile', async () => {
    mockAuthRepo.refreshSession.mockResolvedValue({ accessToken: 'new-token', refreshToken: 'new-refresh', authUserId: 'user-123' });
    const mockProfile = new Profile({ id: 'user-123', name: 'Test User', phone: '123456789' });
    mockProfileRepo.findById.mockResolvedValue(mockProfile);

    const result = await refreshSessionUseCase.execute('old-refresh');

    expect(mockAuthRepo.refreshSession).toHaveBeenCalledWith('old-refresh');
    expect(mockProfileRepo.findById).toHaveBeenCalledWith('user-123');
    expect(result).toEqual({
      accessToken: 'new-token',
      refreshToken: 'new-refresh',
      profile: mockProfile
    });
  });

  it('should throw an error if refreshing session fails', async () => {
    mockAuthRepo.refreshSession.mockRejectedValue(new Error('Invalid refresh token'));

    await expect(refreshSessionUseCase.execute('invalid-refresh'))
      .rejects.toThrow('Invalid refresh token');
  });
});
