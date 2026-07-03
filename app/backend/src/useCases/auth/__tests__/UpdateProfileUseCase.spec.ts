import { UpdateProfileUseCase } from '../UpdateProfileUseCase';
import { IProfileRepository } from '../../../repositories/IProfileRepository';
import { Profile } from '../../../models/Profile';

jest.mock('../../../utils/cpfValidator', () => ({
  isValidCPF: jest.fn((doc: string) => doc.length === 11),
  sanitizeCPF: jest.fn((doc: string) => doc.replace(/\D/g, '')),
}));

describe('UpdateProfileUseCase', () => {
  let useCase: UpdateProfileUseCase;
  let mockProfileRepo: jest.Mocked<IProfileRepository>;

  const existingProfile = new Profile({
    id: 'profile-1',
    name: 'João Silva',
    phone: '11999999999',
    document: '52886531863',
  });

  beforeEach(() => {
    mockProfileRepo = {
      create: jest.fn(),
      findById: jest.fn(),
      findByDocument: jest.fn(),
      update: jest.fn(),
    };

    useCase = new UpdateProfileUseCase(mockProfileRepo);
  });

  it('should throw if no field is provided', async () => {
    await expect(
      useCase.execute({ profileId: 'profile-1' })
    ).rejects.toThrow('At least one field must be provided to update');
  });

  it('should throw if profile is not found', async () => {
    mockProfileRepo.findById.mockResolvedValue(null);

    await expect(
      useCase.execute({ profileId: 'profile-1', name: 'Novo Nome' })
    ).rejects.toThrow('Profile not found');
  });

  it('should update name successfully', async () => {
    mockProfileRepo.findById.mockResolvedValue(
      new Profile({ id: 'profile-1', name: 'João Silva', phone: '11999999999' })
    );
    mockProfileRepo.update.mockImplementation(async (p) => p);

    const result = await useCase.execute({ profileId: 'profile-1', name: 'Maria Souza' });

    expect(result.name).toBe('Maria Souza');
    expect(mockProfileRepo.update).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'Maria Souza' })
    );
  });

  it('should update phone successfully', async () => {
    mockProfileRepo.findById.mockResolvedValue(
      new Profile({ id: 'profile-1', name: 'João Silva', phone: '11999999999' })
    );
    mockProfileRepo.update.mockImplementation(async (p) => p);

    const result = await useCase.execute({ profileId: 'profile-1', phone: '21988888888' });

    expect(result.phone).toBe('21988888888');
  });

  it('should update document (CPF) when valid and not duplicated', async () => {
    mockProfileRepo.findById.mockResolvedValue(
      new Profile({ id: 'profile-1', name: 'João Silva', phone: '11999999999' })
    );
    mockProfileRepo.findByDocument.mockResolvedValue(null);
    mockProfileRepo.update.mockImplementation(async (p) => p);

    const result = await useCase.execute({ profileId: 'profile-1', document: '07147775086' });

    expect(result.document).toBe('07147775086');
    expect(mockProfileRepo.update).toHaveBeenCalled();
  });

  it('should throw if CPF is invalid', async () => {
    mockProfileRepo.findById.mockResolvedValue(
      new Profile({ id: 'profile-1', name: 'João Silva', phone: '11999999999' })
    );

    await expect(
      useCase.execute({ profileId: 'profile-1', document: '123' })
    ).rejects.toThrow('Invalid CPF');
  });

  it('should throw if CPF is already registered to another profile', async () => {
    mockProfileRepo.findById.mockResolvedValue(
      new Profile({ id: 'profile-1', name: 'João Silva', phone: '11999999999' })
    );
    mockProfileRepo.findByDocument.mockResolvedValue(
      new Profile({ id: 'profile-999', name: 'Outro', phone: '11911111111', document: '07147775086' })
    );

    await expect(
      useCase.execute({ profileId: 'profile-1', document: '07147775086' })
    ).rejects.toThrow('CPF already registered');
  });

  it('should allow updating CPF to the same value (own document)', async () => {
    mockProfileRepo.findById.mockResolvedValue(existingProfile);
    // findByDocument retorna o próprio perfil — mesmo id, não é duplicata
    mockProfileRepo.findByDocument.mockResolvedValue(existingProfile);
    mockProfileRepo.update.mockImplementation(async (p) => p);

    const result = await useCase.execute({ profileId: 'profile-1', document: '52886531863' });

    expect(result.document).toBe('52886531863');
    expect(mockProfileRepo.update).toHaveBeenCalled();
  });

  it('should throw if name is empty string', async () => {
    mockProfileRepo.findById.mockResolvedValue(existingProfile);

    await expect(
      useCase.execute({ profileId: 'profile-1', name: '   ' })
    ).rejects.toThrow('Profile name cannot be empty');
  });

  it('should throw if phone is empty string', async () => {
    mockProfileRepo.findById.mockResolvedValue(existingProfile);

    await expect(
      useCase.execute({ profileId: 'profile-1', phone: '' })
    ).rejects.toThrow('Profile phone cannot be empty');
  });
});
