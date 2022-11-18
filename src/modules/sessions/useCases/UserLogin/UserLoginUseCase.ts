import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "../../../../settings/auth";
import { AppError } from "../../../../shared/errors/appError";
import { LoginReturnDTO } from "../../../accounts/@types/LoginReturnDTO";
import { UserLoginDTO } from "../../@types/UserLoginDTO";
import { TokenRepository } from "../../infra/repositories/implementations/TokenRepository";
import { UsersRepository } from "../../../accounts/infra/repositories/implementations/UsersRepository";

@injectable()
class UserLoginUseCase {
  constructor(
    @inject(UsersRepository)
    @inject(TokenRepository)
    private usersRepository: UsersRepository,
    private tokensRepository: TokenRepository
  ) {}

  async execute({ email, password }: UserLoginDTO): Promise<LoginReturnDTO> {
    const { secret, countdown } = auth;

    const userAlreadyExists = await this.usersRepository.findByEmail({ email });
    if (!userAlreadyExists) {
      throw new AppError("Incorrect email or password", 400); // bad request
    }

    const passwordMatch = await compare(password, userAlreadyExists.password);
    if (!passwordMatch) {
      throw new AppError("Incorrect email or password", 400);
    }

    const newToken = sign({ email }, secret, {
      subject: userAlreadyExists.id,
      expiresIn: countdown,
    });
    if (!newToken) {
      throw new AppError("Login failed, contact support for more details", 401); // Não autorizado
    }

    const tokenConflict = await this.tokensRepository.findByUserId({
      userId: userAlreadyExists.id,
    });
    if (tokenConflict) {
      await this.tokensRepository.delete({ userId: userAlreadyExists.id });
    }

    this.tokensRepository.create({
      tokenData: {
        userId: userAlreadyExists.id,
        token: newToken,
      },
    });

    return { newToken };
  }
}

export { UserLoginUseCase };
