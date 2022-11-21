import { container } from "tsyringe";

import { IUsersRepository } from "../../modules/accounts/infra/repositories/IUsersRepository";
import { UsersRepository } from "../../modules/accounts/infra/repositories/implementations/UsersRepository";
import { ITokenRepository } from "../../modules/sessions/infra/repositories/ITokenRepository";
import { TokenRepository } from "../../modules/sessions/infra/repositories/implementations/TokenRepository";
import { IRentRepository } from "../../modules/accounts/infra/repositories/IRentRepository";
import { RentRepository } from "../../modules/accounts/infra/repositories/implementations/RentRepository";
import { LibraryRepository } from "../../modules/bookstore/infra/repositories/implementations/LibraryRepository";
import { ILibraryRepository } from "../../modules/bookstore/infra/repositories/ILibraryRepository";
import { IHistoryRentRepository } from "../../modules/audit/infra/repositories/implementations/IHistoryRentRepository";
import { HistoryRentRepository } from "../../modules/audit/infra/repositories/HistoryRentRepository";
import { HistoryRentUseCase } from "../../modules/audit/infra/useCases/HistoryRentUseCase";

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

container.registerSingleton<ILibraryRepository>(
  "LibraryRepository",
  LibraryRepository
);

container.registerSingleton<IHistoryRentRepository>(
  "HistoryRentRepository",
  HistoryRentRepository
);

container.registerSingleton<HistoryRentUseCase>(
  "HistoryRentUseCase",
  HistoryRentUseCase
);
