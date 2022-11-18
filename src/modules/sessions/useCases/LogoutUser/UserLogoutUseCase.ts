import { inject, injectable } from "tsyringe";
import { TokenRepository } from "../../infra/repositories/implementations/TokenRepository";
import { ITokenRepository } from "../../infra/repositories/ITokenRepository";
import { UserLogoutDTO } from "../../@types/UserLogoutDTO";

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
