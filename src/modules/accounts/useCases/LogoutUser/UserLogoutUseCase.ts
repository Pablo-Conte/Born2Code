import { inject, injectable } from "tsyringe";
import { UserLogoutDTO } from "../../@types/UserLogoutDTO";
import { TokenRepository } from "../../infra/repositories/implementations/TokenRepository";
import { ITokenRepository } from "../../infra/repositories/ITokenRepository";

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
