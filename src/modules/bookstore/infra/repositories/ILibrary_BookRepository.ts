import {
  FindLibraryBookByIdDTO,
  CreateRelationDTO,
  AlreadyRelationConflictDTO,
  UpdateToRentedDTO,
  UpdateToNotRentedDTO,
} from "@modules/bookstore/@types";
import { Library_BookEntity } from "../entities/Library_BookEntity";

interface ILibrary_BookRepository {
  findById({
    library_bookId,
  }: FindLibraryBookByIdDTO): Promise<Library_BookEntity>;
  createRelation({
    bookId,
    libraryId,
    userId,
  }: CreateRelationDTO): Promise<void>;
  alreadyRelationConflict({
    bookId,
    libraryId,
  }: AlreadyRelationConflictDTO): Promise<Library_BookEntity>;
  updateToRented({ library_bookId }: UpdateToRentedDTO): Promise<void>;
  updateToNotRented({ library_bookId }: UpdateToNotRentedDTO): Promise<void>;
}

export { ILibrary_BookRepository };
