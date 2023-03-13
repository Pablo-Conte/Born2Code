// 1 - pegar ID do user
// 2 - verificar se o user com esse ID é administrador
// 3 - se for, pega o user do header e muda o atributo admin para true
// 4 - se não, retorna erro de autorização

import { AppError } from "../../../../shared/errors/appError";
import { UsersRepository } from "../../infra/repositories/implementations/UsersRepository";
import { injectable, inject } from "tsyringe";

type TAddUser = {
  isAdmin: boolean;
  headerUserId: string;
};

@injectable()
class ToggleAdminService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: UsersRepository
  ){}
  async execute({ isAdmin, headerUserId }: TAddUser): Promise<boolean> {

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

export { ToggleAdminService };
