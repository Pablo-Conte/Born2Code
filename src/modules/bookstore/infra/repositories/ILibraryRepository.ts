import { FindByNameDTO } from "@modules/books/@types";
import { BookEntity } from "@modules/books/infra/entities/BookEntity";
import {
  DataToUpdateDTO,
  DeleteLibraryDTO,
  FindByIdDTO,
  ReadAllBooksDTO,
} from "@modules/bookstore/@types";
import { CreateBookDTO } from "@modules/bookstore/@types/CreateBookDTO";
import { LibraryEntity } from "../entities/LibraryEntity";

interface ILibraryRepository {
  create({ nameLibrary }: CreateBookDTO): Promise<LibraryEntity>;
  update({ data, libraryId }: DataToUpdateDTO): Promise<LibraryEntity>;
  findById({ libraryId }: FindByIdDTO): Promise<LibraryEntity>;
  delete({ libraryId }: DeleteLibraryDTO): Promise<void>;
  findByName({ name }: FindByNameDTO): Promise<LibraryEntity>;
  readAllBooks({ queryLibrary }: ReadAllBooksDTO): Promise<BookEntity[]>;
}

export { ILibraryRepository };
