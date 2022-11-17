import { container } from "tsyringe";
import { IUsersRepository } from "../../modules/accounts/infra/repositories/IUsersRepository";
import { UsersRepository } from "../../modules/accounts/infra/repositories/implementations/UsersRepository";

// Passar a interface e dar um nome para o registro
container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);
