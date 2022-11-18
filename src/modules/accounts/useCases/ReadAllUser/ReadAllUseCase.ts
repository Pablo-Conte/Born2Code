/* eslint-disable eqeqeq */
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/appError";
import { ReadUserDTO } from "../../@types/ReadUserDTO";
import { UsersRepository } from "../../infra/repositories/implementations/UsersRepository";
import { IUsersRepository } from "../../infra/repositories/IUsersRepository";

@injectable()
class ReadAllUseCase {
  constructor(
    @inject(UsersRepository)
    private usersRepository: IUsersRepository
  ) {}

  async execute({ userId }: ReadUserDTO) {
    const isAdmin = await this.usersRepository.findById({ id: userId });
    if (!(isAdmin.admin == true)) {
      throw new AppError("You aren't a admin!", 401);
    }

    const readUsers = await this.usersRepository.readAll();

    return readUsers;
  }
}

export { ReadAllUseCase };
