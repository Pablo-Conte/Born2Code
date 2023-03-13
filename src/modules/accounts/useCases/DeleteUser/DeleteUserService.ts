/* eslint-disable eqeqeq */
import { AppError } from "../../../../shared/errors/appError";
import { UsersRepository } from "../../infra/repositories/implementations/UsersRepository";
import { injectable, inject } from "tsyringe";

type TDeleteUser = {
  myId: string;
  id: string;
};

@injectable()
class DeleteUserService {

  constructor(
    @inject("UsersRepository")
    private usersRepository: UsersRepository
  ){}
  async execute({ id, myId }: TDeleteUser): Promise<void> {

    let userToDelete = myId;

    if (id && id != myId) {
      const userAlreadyExists = await this.usersRepository.findById({ id });

      if (!userAlreadyExists) {
        throw new AppError("User not exists!", 404);
      }

      userToDelete = id;
    }

    await this.usersRepository.delete({ myId: userToDelete });
  }
}

export { DeleteUserService };
