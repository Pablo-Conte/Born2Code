import { LibraryEntity } from "../infra/entities/LibraryEntity";

type CreateBookDTO = {
  nameLibrary: string;
};

type FindByNameDTO = {
  name: string;
};

type DataToUpdateDTO = {
  data: Partial<LibraryEntity>;
  libraryId: string;
};

type FindByIdDTO = {
  libraryId: string;
};

type DeleteLibraryDTO = {
  libraryId: string;
};

type ReadAllBooksDTO = {
  queryLibrary: string;
};

type CreateRelationDTO = {
  bookId: string;
  libraryId: string;
  userId?: string;
};

type AlreadyRelationConflictDTO = {
  bookId: string;
  libraryId: string;
};

type FindLibraryBookByIdDTO = {
  library_bookId: string;
};

type UpdateToRentedDTO = {
  library_bookId: string;
};

type UpdateToNotRentedDTO = {
  library_bookId: string;
};

type LibraryIdDTO = {
  libraryId: string;
};

type DataDTO = {
  data: Partial<LibraryEntity>;
  libraryId: string;
};

type UserDataDTO = {
  bookId: string;
  libraryId: string;
  userId?: string;
};

export {
  CreateBookDTO,
  DataToUpdateDTO,
  DeleteLibraryDTO,
  FindByIdDTO,
  FindByNameDTO,
  ReadAllBooksDTO,
  AlreadyRelationConflictDTO,
  UpdateToRentedDTO,
  UpdateToNotRentedDTO,
  CreateRelationDTO,
  FindLibraryBookByIdDTO,
  LibraryIdDTO,
  DataDTO,
  UserDataDTO,
};
