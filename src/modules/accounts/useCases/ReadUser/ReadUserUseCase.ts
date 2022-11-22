import { ReadUserDTO } from "@modules/accounts/@types/ReadUserDTO";
import { UserEntity } from "@modules/accounts/infra/entities/UserEntity";
import { UsersRepository } from "@modules/accounts/infra/repositories/implementations/UsersRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class ReadUserUseCase {
  constructor(
    @inject(UsersRepository)
    private usersRepository: UsersRepository
  ) {}

  async execute({ myId, id }: ReadUserDTO): Promise<UserEntity> {
    let userToRead = myId;
    if (id && id != myId) {
      userToRead = id;
    }

    const userAlreadyExists = await this.usersRepository.findById({
      id: userToRead,
    });

    return userAlreadyExists;
  }
}

export { ReadUserUseCase };
