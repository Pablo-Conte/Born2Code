import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import auth from "../../../../settings/auth";
import { AppError } from "../../../../shared/errors/appError";
import { TokenRepository } from "../../infra/repositories/implementations/TokenRepository";
import { UsersRepository } from "../../infra/repositories/implementations/UsersRepository";

type TUserLogin = {
  email: string;
  password: string;
};

type TLoginReturn = {
  newToken: string;
};

@injectable()
class UserLoginService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: UsersRepository,
    @inject("TokenRepository")
    private tokenRepository: TokenRepository
  ){}
  async execute({ email, password }: TUserLogin): Promise<TLoginReturn> {
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

    const tokenConflict = await this.tokenRepository.findByUserId({
      userId: userAlreadyExists.id,
    });

    if (tokenConflict) {
      await this.tokenRepository.delete({ userId: userAlreadyExists.id });
    }

    this.tokenRepository.create({
      tokenData: {
        userId: userAlreadyExists.id,
        token: newToken,
      },
    });

    return { newToken };
  }
}

export { UserLoginService };
