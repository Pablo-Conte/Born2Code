import {
  CreateBookDTO,
  UpdateBookDTO,
  DeleteBookDTO,
  FindByNameDTO,
  FindByIdDTO,
  ReadBooksDTO,
  ReadAllLibrariesOnBookDTO,
} from "@modules/books/@types";
import { BookImageDTO } from "@modules/books/useCases/UploadImageBook/UploadImageBookUseCase";
import { BookEntity } from "../entities/BookEntity";

type BookDTO = {
  id?: string;
  bookImage?: string;
  bookData?: Partial<BookEntity>;
};

interface IBooksRepository {
  createBook({ dataToCreateBook }: CreateBookDTO): Promise<BookEntity>;
  updateBook({ dataBook, bookId, userId }: UpdateBookDTO): Promise<BookEntity>;
  uploadImageBook({ bookImage }: BookDTO): Promise<BookEntity>;
  deleteBook({ id, userId }: DeleteBookDTO);
  findByName({ name }: FindByNameDTO): Promise<BookEntity>;
  findById({ id }: FindByIdDTO);
  readBooks({ queryLibrary, queryBook }: ReadBooksDTO): Promise<BookEntity[]>;
  readAllLibrariesOnBook({ queryBook }: ReadAllLibrariesOnBookDTO);
}

export { IBooksRepository, BookDTO };
