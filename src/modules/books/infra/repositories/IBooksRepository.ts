import {
  CreateBookDTO,
  UpdateBookDTO,
  DeleteBookDTO,
  FindByNameDTO,
  FindByIdDTO,
  ReadBooksDTO,
  ReadAllLibrariesOnBookDTO,
} from "@modules/books/@types";
import { BookEntity } from "../entities/BookEntity";

interface IBooksRepository {
  createBook({ dataToCreateBook }: CreateBookDTO): Promise<BookEntity>;
  updateBook({ dataBook, bookId }: UpdateBookDTO);
  deleteBook({ id }: DeleteBookDTO);
  findByName({ name }: FindByNameDTO): Promise<BookEntity>;
  findById({ id }: FindByIdDTO);
  readBooks({ queryLibrary, queryBook }: ReadBooksDTO): Promise<BookEntity[]>;
  readAllLibrariesOnBook({ queryBook }: ReadAllLibrariesOnBookDTO);
}

export { IBooksRepository };
