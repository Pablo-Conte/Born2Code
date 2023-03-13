import { TokenRepository } from "../../infra/repositories/implementations/TokenRepository";
import {inject, injectable} from "tsyringe";

type TUserLogout = {
  userId: string;
};

@injectable()
class UserLogoutService {
  constructor(
    @inject("TokenRepository")
    private tokenRepository: TokenRepository
  ){}
  async execute({ userId }: TUserLogout): Promise<void> {

    await this.tokenRepository.delete({ userId });
  }
}

export { UserLogoutService };
