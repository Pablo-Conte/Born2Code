import { BookEntity } from "../infra/entities/BookEntity";

type CreateBookDTO = {
  dataToCreateBook: BookEntity;
};

type FindByNameDTO = {
  name: string;
};

type FindByIdDTO = {
  id: string;
};

type DeleteBookDTO = {
  id: string;
};

type UpdateBookDTO = {
  dataBook: Partial<BookEntity>;
  bookId: string;
};

type ReadAllLibrariesOnBookDTO = {
  queryBook: string;
};

type ReadBooksDTO = {
  queryLibrary?: string;
  queryBook?: string;
};

export {
  CreateBookDTO,
  DeleteBookDTO,
  FindByIdDTO,
  FindByNameDTO,
  ReadAllLibrariesOnBookDTO,
  UpdateBookDTO,
  ReadBooksDTO,
};
