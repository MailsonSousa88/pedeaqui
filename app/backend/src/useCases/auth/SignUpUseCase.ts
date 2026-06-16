import { IAuthRepository } from '../../repositories/IAuthRepository';
import { IProfileRepository } from '../../repositories/IProfileRepository';
import { Profile } from '../../models/Profile';

export interface SignUpDTO {
  email: string;
  password: string;
  name: string;
  phone: string;
}

export class SignUpUseCase {
  constructor(
    private authRepository: IAuthRepository,
    private profileRepository: IProfileRepository
  ) {}

  async execute(data: SignUpDTO): Promise<Profile> {
    const { authUserId } = await this.authRepository.signUp(data.email, data.password);

    const profile = new Profile({
      id: authUserId,
      name: data.name,
      phone: data.phone,
    });

    return await this.profileRepository.create(profile);
  }
}
