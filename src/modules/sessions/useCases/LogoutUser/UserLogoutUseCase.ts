import { UserLogoutDTO } from "@modules/sessions/@types/UserLogoutDTO";
import { TokenRepository } from "@modules/sessions/infra/repositories/implementations/TokenRepository";
import { ITokenRepository } from "@modules/sessions/infra/repositories/ITokenRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class UserLogoutUseCase {
  constructor(
    @inject(TokenRepository)
    private tokenRepository: ITokenRepository
  ) {}

  async execute({ userId }: UserLogoutDTO): Promise<void> {
    await this.tokenRepository.delete({ userId });
  }
}

export { UserLogoutUseCase };
