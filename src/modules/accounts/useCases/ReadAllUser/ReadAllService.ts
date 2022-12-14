/* eslint-disable eqeqeq */
import { AppError } from "../../../../shared/errors/appError";
import { UsersRepository } from "../../infra/repositories/UsersRepository";

type TReadUser = {
  userId: string;
};

class ReadAllService {
  async execute({ userId }: TReadUser) {
    const usersRepository = new UsersRepository();

    const isAdmin = await usersRepository.findById({ id: userId });

    if (!(isAdmin.admin == true)) {
      throw new AppError("You aren't a admin!", 401);
    }

    const readUsers = await usersRepository.readAll();

    return readUsers;
  }
}

export { ReadAllService };
