import "reflect-metadata";
import { container } from 'tsyringe';

import { IRentUserLibraryBookRepository } from '../../modules/accounts/infra/repositories/IRentUserLibraryBookRepository';
import { RentUserLibraryBookRepository } from '../../modules/accounts/infra/repositories/implementations/RentUserLibraryBookRepository';
import { IUsersRepository } from "../../modules/accounts/infra/repositories/IUsersRepository";
import { UsersRepository } from "../../modules/accounts/infra/repositories/implementations/UsersRepository";
import { TokenRepository } from "../../modules/accounts/infra/repositories/implementations/TokenRepository";
import { IHistoryRentRepository } from "../../modules/audit/infra/repositories/IHistoryRentRepository";
import { HistoryRentRepository } from "../../modules/audit/infra/repositories/implementations/HistoryRentRepository";
import { ITokenRepository } from "../../modules/accounts/infra/repositories/ITokenRepository";
import { IBillRepository } from "../../modules/billsToPay/infra/repositories/IBillRepository";
import { BillRepository } from "../../modules/billsToPay/infra/repositories/implementations/BillRepository";
import { IBookRepository } from "../../modules/books/infra/repositories/IBookRepository";
import { BooksRepository } from "../../modules/books/infra/repositories/implementations/BookRepository";
import { ILibraryRepository } from "../../modules/bookstore/infra/repositories/ILibraryRepository";
import { ILibrary_BookRepository } from "../../modules/bookstore/infra/repositories/ILibrary_BookRepository";
import { LibraryRepository } from "../../modules/bookstore/infra/repositories/implementations/LibraryRepository";
import { Library_BookRepository } from "../../modules/bookstore/infra/repositories/implementations/Library_BookRepository";
import { IEmphasisBookRepository } from "../../modules/emphasisBook/infra/repositories/IEmphasisBookRepository";
import { EmphasisBookRepository } from "../../modules/emphasisBook/infra/repositories/implementations/EmphasisBookRepository";

container.registerSingleton<IRentUserLibraryBookRepository>(
  "RentUserLibraryBookRepository",
  RentUserLibraryBookRepository
);

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
)

container.registerSingleton<ITokenRepository>(
  "TokenRepository",
  TokenRepository
)

container.registerSingleton<IHistoryRentRepository>(
  "HistoryRentRepository",
  HistoryRentRepository
)

container.registerSingleton<IBillRepository>(
  "BillRepository",
  BillRepository
)

container.registerSingleton<IBookRepository>(
  "BooksRepository",
  BooksRepository
)

container.registerSingleton<ILibraryRepository>(
  "LibraryRepository",
  LibraryRepository
)

container.registerSingleton<ILibrary_BookRepository>(
  "Library_BookRepository",
  Library_BookRepository
)

container.registerSingleton<IEmphasisBookRepository>(
  "EmphasisBookRepository",
  EmphasisBookRepository
)