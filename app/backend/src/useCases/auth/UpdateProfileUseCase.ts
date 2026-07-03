import { IProfileRepository } from '../../repositories/IProfileRepository';
import { Profile } from '../../models/Profile';
import { isValidCPF, sanitizeCPF } from '../../utils/cpfValidator';

export interface UpdateProfileDTO {
  profileId: string;
  name?: string;
  phone?: string;
  document?: string;
}

export class UpdateProfileUseCase {
  constructor(private profileRepository: IProfileRepository) {}

  async execute(data: UpdateProfileDTO): Promise<Profile> {
    if (data.name === undefined && data.phone === undefined && data.document === undefined) {
      throw new Error('At least one field must be provided to update');
    }

    const profile = await this.profileRepository.findById(data.profileId);
    if (!profile) {
      throw new Error('Profile not found');
    }

    if (data.document !== undefined) {
      const sanitized = sanitizeCPF(data.document);
      if (!isValidCPF(sanitized)) {
        throw new Error('Invalid CPF');
      }

      // Garante unicidade: verifica se o CPF já pertence a outro perfil
      const existingByDoc = await this.profileRepository.findByDocument(sanitized);
      if (existingByDoc && existingByDoc.id !== data.profileId) {
        throw new Error('CPF already registered');
      }

      profile.document = sanitized;
    }

    if (data.name !== undefined) {
      if (!data.name || data.name.trim() === '') {
        throw new Error('Profile name cannot be empty');
      }
      profile.name = data.name.trim();
    }

    if (data.phone !== undefined) {
      if (!data.phone || data.phone.trim() === '') {
        throw new Error('Profile phone cannot be empty');
      }
      profile.phone = data.phone.trim();
    }

    return this.profileRepository.update(profile);
  }
}
