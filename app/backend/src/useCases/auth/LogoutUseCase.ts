import { IAuthRepository } from '../../repositories/IAuthRepository';

export class LogoutUseCase {
  constructor(private authRepository: IAuthRepository) {}

  async execute(accessToken: string): Promise<void> {
    await this.authRepository.signOut(accessToken);
  }
}
