/* eslint-disable eqeqeq */
import { AppError } from "../../../../shared/errors/appError";
import { UsersRepository } from "../../infra/repositories/UsersRepository";

type TDeleteUser = {
  myId: string;
  id: string;
};

class DeleteUserService {
  async execute({ id, myId }: TDeleteUser): Promise<void> {
    const usersRepository = new UsersRepository();

    let userToDelete = myId;

    if (id && id != myId) {
      const userAlreadyExists = await usersRepository.findById({ id });

      if (!userAlreadyExists) {
        throw new AppError("User not exists!", 404);
      }

      userToDelete = id;
    }

    await usersRepository.delete({ myId: userToDelete });
  }
}

export { DeleteUserService };
