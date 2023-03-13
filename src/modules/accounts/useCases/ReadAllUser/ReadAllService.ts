/* eslint-disable eqeqeq */
import { AppError } from "../../../../shared/errors/appError";
import { UsersRepository } from "../../infra/repositories/implementations/UsersRepository";
import { injectable, inject } from "tsyringe";

type TReadUser = {
  userId: string;
};

@injectable()
class ReadAllService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: UsersRepository
  ){}
  async execute({ userId }: TReadUser) {

    const isAdmin = await this.usersRepository.findById({ id: userId });

    if (!(isAdmin.admin == true)) {
      throw new AppError("You aren't a admin!", 401);
    }

    const readUsers = await this.usersRepository.readAll();

    return readUsers;
  }
}

export { ReadAllService };
