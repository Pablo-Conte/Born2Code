import "reflect-metadata";
import { container } from 'tsyringe';


import { IRentUserLibraryBookRepository } from '../../modules/accounts/infra/repositories/IRentUserLibraryBookRepository';
import { RentUserLibraryBookRepository } from '../../modules/accounts/infra/repositories/implementations/RentUserLibraryBookRepository';

container.registerSingleton<IRentUserLibraryBookRepository>(
  "RentUserLibraryBookRepository",
  RentUserLibraryBookRepository
);