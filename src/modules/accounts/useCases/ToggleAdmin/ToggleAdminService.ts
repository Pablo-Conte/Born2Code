// 1 - pegar ID do user
// 2 - verificar se o user com esse ID é administrador
// 3 - se for, pega o user do header e muda o atributo admin para true
// 4 - se não, retorna erro de autorização

import { AppError } from "../../../../shared/errors/appError";
import { UsersRepository } from "../../infra/repositories/implementations/UsersRepository";

type TAddUser = {
  isAdmin: boolean;
  headerUserId: string;
};

class ToggleAdminService {
  async execute({ isAdmin, headerUserId }: TAddUser): Promise<boolean> {
    const usersRepository = new UsersRepository();

    if (!isAdmin)
      throw new AppError(
        "User is not a Admin to change permission for this user",
        401
      );

    const userToChangeExists = await usersRepository.findById({
      id: headerUserId,
    });
    if (!userToChangeExists)
      throw new AppError("This isn't a valid user ID, try again!", 404);

    await usersRepository.toggleAdmin({
      userId: headerUserId,
      admin: userToChangeExists.admin,
    });

    return userToChangeExists.admin;
  }
}

export { ToggleAdminService };
