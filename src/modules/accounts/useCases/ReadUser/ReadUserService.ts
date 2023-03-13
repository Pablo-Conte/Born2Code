/* eslint-disable eqeqeq */
import { UserEntity } from "../../infra/entities/UserEntity";
import { inject, injectable } from "tsyringe";
import { UsersRepository } from "../../infra/repositories/implementations/UsersRepository";

type TReadUser = {
  myId: string;
  id: string;
};

@injectable()
class ReadUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: UsersRepository
  ){}
  async execute({ myId, id }: TReadUser): Promise<UserEntity> {

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

export { ReadUserService };
