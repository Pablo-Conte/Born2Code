/* eslint-disable eqeqeq */
import { UserEntity } from "../../infra/entities/UserEntity";
import { UsersRepository } from "../../infra/repositories/implementations/UsersRepository";

type TReadUser = {
  myId: string;
  id: string;
};

class ReadUserService {
  async execute({ myId, id }: TReadUser): Promise<UserEntity> {
    const usersRepository = new UsersRepository();

    let userToRead = myId;

    if (id && id != myId) {
      userToRead = id;
    }

    const userAlreadyExists = await usersRepository.findById({
      id: userToRead,
    });

    return userAlreadyExists;
  }
}

export { ReadUserService };
