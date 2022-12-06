import { UserEntity } from "@modules/accounts/infra/entities/UserEntity";
import { IUsersRepository } from "@modules/accounts/infra/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";

type AvatarDTO = {
  avatar?: string;
  userId: string;
  userData?: Partial<UserEntity>;
};

@injectable()
class UploadAvatarUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ userId, avatar }: AvatarDTO): Promise<UserEntity> {
    const uploadAvatar = await this.usersRepository.addAvatar({
      id: userId,
      avatar,
    });

    return uploadAvatar;
  }
}

export { UploadAvatarUseCase };
