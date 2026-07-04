import { IAuthRepository } from '../../repositories/IAuthRepository';

export class ResetPasswordUseCase {
  constructor(private authRepository: IAuthRepository) {}

  async execute(password: string): Promise<void> {
    await this.authRepository.updateUserPassword(password);
  }
}
