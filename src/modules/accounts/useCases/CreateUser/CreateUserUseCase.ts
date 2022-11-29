import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/appError";
import { CreateUserDTO } from "@modules/accounts/@types/CreateUserDTO";
import { UserEntity } from "@modules/accounts/infra/entities/UserEntity";
import { IUsersRepository } from "@modules/accounts/infra/repositories/IUsersRepository";
import { IDayjsDateProvider } from "@shared/container/providers/IDayjsDateProvider";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("DayjsDateProvider")
    private dayjsDateProvider: IDayjsDateProvider
  ) {}

  async execute({ userData }: CreateUserDTO): Promise<UserEntity> {
    const { email, password, cellNumber } = userData;

    const cellNumberConflict = await this.usersRepository.findByCellNumber({
      cellNumber,
    });
    const userConflict = await this.usersRepository.findByEmail({ email });

    if (userConflict || cellNumberConflict) {
      throw new AppError("User Already exists!", 409);
    }

    const newPass = await hash(password, 10);
    userData.password = newPass;

    if (userData?.birthDate) {
      userData.birthDate = this.dayjsDateProvider.dateNow(userData);
    }

    const newUser = await this.usersRepository.create({ userData });
    if (!newUser) {
      throw new AppError(
        "User creation failed, contact support for more details",
        400
      );
    }

    return newUser;
  }
}

export { CreateUserUseCase };
