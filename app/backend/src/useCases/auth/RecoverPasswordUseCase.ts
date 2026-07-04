import { IAuthRepository } from '../../repositories/IAuthRepository';

export class RecoverPasswordUseCase {
  constructor(private authRepository: IAuthRepository) {}

  async execute(email: string): Promise<void> {
    await this.authRepository.resetPasswordForEmail(email);
  }
}
