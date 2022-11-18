import { inject, injectable } from "tsyringe";
import { ReadUserDTO } from "../../@types/ReadUserDTO";
import { UserEntity } from "../../infra/entities/UserEntity";
import { UsersRepository } from "../../infra/repositories/implementations/UsersRepository";

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
