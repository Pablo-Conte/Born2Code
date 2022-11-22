import { AppError } from "@shared/errors/appError";
import { inject, injectable } from "tsyringe";
import { DeleteUserDTO } from "@modules/accounts/@types/DeleteUserDTO";
import { UsersRepository } from "@modules/accounts/infra/repositories/implementations/UsersRepository";
import { IUsersRepository } from "@modules/accounts/infra/repositories/IUsersRepository";

@injectable()
class DeleteUserUseCase {
  constructor(
    @inject(UsersRepository)
    private usersRepository: IUsersRepository
  ) {}

  async execute({ id, myId }: DeleteUserDTO): Promise<void> {
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

export { DeleteUserUseCase };
