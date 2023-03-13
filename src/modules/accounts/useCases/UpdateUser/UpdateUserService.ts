import { AppError } from "../../../../shared/errors/appError";
import { UserEntity } from "../../infra/entities/UserEntity";
import { UsersRepository } from "../../infra/repositories/implementations/UsersRepository";
import { inject, injectable } from "tsyringe";

type TUpdateUser = {
  id: string;
  userData: Partial<UserEntity>;
};

@injectable()
class UpdateUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: UsersRepository
  ){}
  async execute({ id, userData }: TUpdateUser): Promise<UserEntity> {

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

export { UpdateUserService };
