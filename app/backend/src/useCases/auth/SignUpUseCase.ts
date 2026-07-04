import { IAuthRepository } from '../../repositories/IAuthRepository';
import { IProfileRepository } from '../../repositories/IProfileRepository';
import { Profile } from '../../models/Profile';
import { isValidCPF, sanitizeCPF } from '../../utils/cpfValidator';

export interface SignUpDTO {
  email: string;
  password: string;
  name: string;
  phone: string;
  document: string;
}

export class SignUpUseCase {
  constructor(
    private authRepository: IAuthRepository,
    private profileRepository: IProfileRepository
  ) {}

  async execute(data: SignUpDTO): Promise<Profile> {
    if (!data.document || data.document.trim() === '') {
      throw new Error('Document is required');
    }

    const sanitizedDocument = sanitizeCPF(data.document);
    if (!isValidCPF(sanitizedDocument)) {
      throw new Error('Invalid CPF');
    }

    const existingProfile = await this.profileRepository.findByDocument(sanitizedDocument);
    if (existingProfile) {
      throw new Error('CPF already registered');
    }

    const { authUserId } = await this.authRepository.signUp(data.email, data.password);

    const profile = new Profile({
      id: authUserId,
      name: data.name,
      phone: data.phone,
      document: data.document,
    });

    return await this.profileRepository.create(profile);
  }
}
