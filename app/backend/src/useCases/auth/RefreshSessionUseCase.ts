import { IAuthRepository } from '../../repositories/IAuthRepository';
import { IProfileRepository } from '../../repositories/IProfileRepository';
import { Profile } from '../../models/Profile';

export interface RefreshSessionResponse {
  accessToken: string;
  refreshToken: string;
  profile: Profile | null;
}

export class RefreshSessionUseCase {
  constructor(
    private authRepository: IAuthRepository,
    private profileRepository: IProfileRepository
  ) {}

  async execute(refreshToken: string): Promise<RefreshSessionResponse> {
    const session = await this.authRepository.refreshSession(refreshToken);
    const profile = await this.profileRepository.findById(session.authUserId);

    return {
      accessToken: session.accessToken,
      refreshToken: session.refreshToken,
      profile
    };
  }
}
