import { container } from "tsyringe";

import { IUsersRepository } from "../../modules/accounts/infra/repositories/IUsersRepository";
import { UsersRepository } from "../../modules/accounts/infra/repositories/implementations/UsersRepository";
import { ITokenRepository } from "../../modules/accounts/infra/repositories/ITokenRepository";
import { TokenRepository } from "../../modules/accounts/infra/repositories/implementations/TokenRepository";
import { IRentRepository } from "../../modules/accounts/infra/repositories/IRentRepository";
import { RentRepository } from "../../modules/accounts/infra/repositories/implementations/RentRepository";

// Passar a interface e dar um nome para o registro
container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<ITokenRepository>(
  "TokenRepository",
  TokenRepository
);

container.registerSingleton<IRentRepository>("RentRepository", RentRepository);
