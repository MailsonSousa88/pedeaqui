import { IAuthRepository } from '../../repositories/IAuthRepository';
import { IProfileRepository } from '../../repositories/IProfileRepository';
import { Profile } from '../../models/Profile';

export interface LoginDTO {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  profile: Profile | null;
}

export class LoginUseCase {
  constructor(
    private authRepository: IAuthRepository,
    private profileRepository: IProfileRepository
  ) {}

  async execute(data: LoginDTO): Promise<LoginResponse> {
    const session = await this.authRepository.signIn(data.email, data.password);
    const profile = await this.profileRepository.findById(session.authUserId);

    return {
      accessToken: session.accessToken,
      refreshToken: session.refreshToken,
      profile
    };
  }
}
