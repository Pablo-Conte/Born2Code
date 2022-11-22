import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/appError";
import { SetAdminDTO } from "@modules/accounts/@types/SetAdminDTO";
import { UsersRepository } from "@modules/accounts/infra/repositories/implementations/UsersRepository";

@injectable()
class ToggleAdminUseCase {
  constructor(
    @inject(UsersRepository)
    private usersRepository: UsersRepository
  ) {}

  async execute({ isAdmin, headerUserId }: SetAdminDTO): Promise<boolean> {
    if (!isAdmin)
      throw new AppError(
        "User is not a Admin to change permission for this user",
        401
      );

    const userToChangeExists = await this.usersRepository.findById({
      id: headerUserId,
    });
    if (!userToChangeExists)
      throw new AppError("This isn't a valid user ID, try again!", 404);

    await this.usersRepository.toggleAdmin({
      userId: headerUserId,
      admin: userToChangeExists.admin,
    });

    return userToChangeExists.admin;
  }
}

export { ToggleAdminUseCase };
