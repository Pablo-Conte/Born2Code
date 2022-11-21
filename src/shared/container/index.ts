import { RentRepository } from "@modules/accounts/infra/repositories/implementations/RentRepository";
import { UsersRepository } from "@modules/accounts/infra/repositories/implementations/UsersRepository";
import { IRentRepository } from "@modules/accounts/infra/repositories/IRentRepository";
import { IUsersRepository } from "@modules/accounts/infra/repositories/IUsersRepository";
import { HistoryRentRepository } from "@modules/audit/infra/repositories/HistoryRentRepository";
import { IHistoryRentRepository } from "@modules/audit/infra/repositories/implementations/IHistoryRentRepository";
import { HistoryRentUseCase } from "@modules/audit/infra/useCases/HistoryRentUseCase";
import { ILibraryRepository } from "@modules/bookstore/infra/repositories/ILibraryRepository";
import { LibraryRepository } from "@modules/bookstore/infra/repositories/implementations/LibraryRepository";
import { TokenRepository } from "@modules/sessions/infra/repositories/implementations/TokenRepository";
import { ITokenRepository } from "@modules/sessions/infra/repositories/ITokenRepository";
import { container } from "tsyringe";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<ILibraryRepository>(
  "LibraryRepository",
  LibraryRepository
);

container.registerSingleton<ITokenRepository>(
  "TokenRepository",
  TokenRepository
);

container.registerSingleton<IRentRepository>("RentRepository", RentRepository);

container.registerSingleton<IHistoryRentRepository>(
  "HistoryRentRepository",
  HistoryRentRepository
);

container.registerSingleton<HistoryRentUseCase>(
  "HistoryRentUseCase",
  HistoryRentUseCase
);
