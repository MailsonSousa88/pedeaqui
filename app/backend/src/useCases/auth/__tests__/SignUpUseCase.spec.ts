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
      findById: jest.fn(),
      findByDocument: jest.fn().mockResolvedValue(null)
    };
    signUpUseCase = new SignUpUseCase(mockAuthRepo, mockProfileRepo);
  });

  it('should successfully sign up a user and create a profile', async () => {
    mockAuthRepo.signUp.mockResolvedValue({ authUserId: 'user-123' });
    const mockProfile = new Profile({
      id: 'user-123',
      name: 'Test User',
      phone: '123456789',
      document: '52886531863'
    });
    mockProfileRepo.create.mockResolvedValue(mockProfile);

    const result = await signUpUseCase.execute({
      email: 'test@test.com',
      password: 'password123',
      name: 'Test User',
      phone: '123456789',
      document: '52886531863'
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
      phone: '123456789',
      document: '52886531863'
    })).rejects.toThrow('Auth failed');

    expect(mockProfileRepo.create).not.toHaveBeenCalled();
  });

  it('should throw an error if document is missing', async () => {
    await expect(signUpUseCase.execute({
      email: 'test@test.com',
      password: 'password123',
      name: 'Test User',
      phone: '123456789',
      document: ''
    })).rejects.toThrow('Document is required');

    expect(mockAuthRepo.signUp).not.toHaveBeenCalled();
    expect(mockProfileRepo.create).not.toHaveBeenCalled();
  });

  it('should throw an error if document is invalid', async () => {
    await expect(signUpUseCase.execute({
      email: 'test@example.com',
      password: 'password123',
      name: 'Test',
      phone: '11999999999',
      document: '123456'
    })).rejects.toThrow('Invalid CPF');

    expect(mockAuthRepo.signUp).not.toHaveBeenCalled();
    expect(mockProfileRepo.create).not.toHaveBeenCalled();
  });

  it('should throw an error if document is a valid CNPJ (Profile only accepts CPF)', async () => {
    await expect(signUpUseCase.execute({
      email: 'test@example.com',
      password: 'password123',
      name: 'Test',
      phone: '11999999999',
      document: '33683111000107' // Valid CNPJ
    })).rejects.toThrow('Invalid CPF');

    expect(mockAuthRepo.signUp).not.toHaveBeenCalled();
    expect(mockProfileRepo.create).not.toHaveBeenCalled();
  });

  it('should throw an error if CPF is already registered', async () => {
    const existingProfile = new Profile({
      id: 'user-999',
      name: 'Existing User',
      phone: '987654321',
      document: '52886531863'
    });
    mockProfileRepo.findByDocument.mockResolvedValue(existingProfile);

    await expect(signUpUseCase.execute({
      email: 'test@test.com',
      password: 'password123',
      name: 'Test User',
      phone: '123456789',
      document: '52886531863'
    })).rejects.toThrow('CPF already registered');

    expect(mockAuthRepo.signUp).not.toHaveBeenCalled();
    expect(mockProfileRepo.create).not.toHaveBeenCalled();
  });
});
