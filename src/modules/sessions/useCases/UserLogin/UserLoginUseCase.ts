import auth from "@settings/auth";
import { inject, injectable } from "tsyringe";
import { sign } from "jsonwebtoken";
import { compare } from "bcrypt";
import { AppError } from "@shared/errors/appError";
import { LoginReturnDTO } from "@modules/accounts/@types/LoginReturnDTO";
import { UsersRepository } from "@modules/accounts/infra/repositories/implementations/UsersRepository";
import { IUsersRepository } from "@modules/accounts/infra/repositories/IUsersRepository";
import { UserLoginDTO } from "@modules/sessions/@types/UserLoginDTO";
import { TokenRepository } from "@modules/sessions/infra/repositories/implementations/TokenRepository";
import { ITokenRepository } from "@modules/sessions/infra/repositories/ITokenRepository";

@injectable()
class UserLoginUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("TokenRepository")
    private tokensRepository: ITokenRepository
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
