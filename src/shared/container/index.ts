import { RentRepository } from "@modules/accounts/infra/repositories/implementations/RentRepository";
import { UsersRepository } from "@modules/accounts/infra/repositories/implementations/UsersRepository";
import { IRentRepository } from "@modules/accounts/infra/repositories/IRentRepository";
import { IUsersRepository } from "@modules/accounts/infra/repositories/IUsersRepository";
import { HistoryRentRepository } from "@modules/audit/infra/repositories/HistoryRentRepository";
import { IHistoryRentRepository } from "@modules/audit/infra/repositories/implementations/IHistoryRentRepository";
import { HistoryRentUseCase } from "@modules/audit/useCases/HistoryRentUseCase";
import { IBooksRepository } from "@modules/books/infra/repositories/IBooksRepository";
import { BooksRepository } from "@modules/books/infra/repositories/implementations/BooksRepository";
import { DiscountRepository } from "@modules/books/infra/repositories/implementations/DiscountRepository";
import { ILibraryRepository } from "@modules/bookstore/infra/repositories/ILibraryRepository";
import { LibraryRepository } from "@modules/bookstore/infra/repositories/implementations/LibraryRepository";
import { TokenRepository } from "@modules/sessions/infra/repositories/implementations/TokenRepository";
import { ITokenRepository } from "@modules/sessions/infra/repositories/ITokenRepository";
import { container } from "tsyringe";
import { IDayjsDateProvider } from "./providers/IDayjsDateProvider";
import { DayjsDateProvider } from "./providers/implementations/DayjsDateProvider";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<IBooksRepository>(
  "BooksRepository",
  BooksRepository
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

container.registerSingleton<IDayjsDateProvider>(
  "DayjsDateProvider",
  DayjsDateProvider
);

container.registerSingleton<DiscountRepository>(
  "DiscountRepository",
  DiscountRepository
);
