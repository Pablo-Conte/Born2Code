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
};
