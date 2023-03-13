/* eslint-disable no-param-reassign */
import { hash } from "bcrypt";
import { injectable, inject } from "tsyringe";

import { AppError } from "../../../../shared/errors/appError";
import { UserEntity } from "../../infra/entities/UserEntity";
import { UsersRepository } from "../../infra/repositories/implementations/UsersRepository";

type TCreateUser = {
  userData: UserEntity;
};

@injectable()
class CreateUserService {

  constructor(
    @inject("UsersRepository")
    private usersRepository: UsersRepository
  ){}
  async execute({ userData }: TCreateUser): Promise<UserEntity> {
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
      userData.birthDate = new Date(
        userData.birthDate
      ).toISOString() as unknown as Date;
    }

    const newUser = await this.usersRepository.create({ uData: userData });
    if (!newUser) {
      throw new AppError(
        "User creation failed, contact support for more details",
        400
      );
    }

    return newUser;
  }
}

export { CreateUserService };
