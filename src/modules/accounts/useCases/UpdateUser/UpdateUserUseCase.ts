import { UpdateUserDTO } from "@modules/accounts/@types/UpdateUserDTO";
import { UserEntity } from "@modules/accounts/infra/entities/UserEntity";
import { UsersRepository } from "@modules/accounts/infra/repositories/implementations/UsersRepository";
import { AppError } from "@shared/errors/appError";
import { inject, injectable } from "tsyringe";

@injectable()
class UpdateUserUseCase {
  constructor(
    @inject(UsersRepository)
    private usersRepository: UsersRepository
  ) {}

  async execute({ id, userData }: UpdateUserDTO): Promise<UserEntity> {
    const userAlreadyExists = await this.usersRepository.findById({ id });
    if (!userAlreadyExists) {
      throw new AppError("User not found!", 404);
    }

    const updatedUser = await this.usersRepository.update({ id, userData });
    if (!updatedUser) {
      throw new AppError(
        "User update failed, contact support for more details",
        400
      );
    }

    return updatedUser;
  }
}

export { UpdateUserUseCase };
