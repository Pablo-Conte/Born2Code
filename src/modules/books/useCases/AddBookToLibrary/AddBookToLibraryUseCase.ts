import { AppError } from "../../../../shared/errors/appError";
import { UserDataDTO } from "../../../bookstore/@types";
import { ILibrary_BookRepository } from "../../../bookstore/infra/repositories/ILibrary_BookRepository";

class AddBookToLibraryUseCase {
  constructor(private library_bookRepository: ILibrary_BookRepository) {}

  async execute({ bookId, libraryId }: UserDataDTO): Promise<void> {
    const alreadyRelationConflict =
      await this.library_bookRepository.alreadyRelationConflict({
        bookId,
        libraryId,
      });

    if (alreadyRelationConflict)
      throw new AppError("This relation already exists!", 400);

    await this.library_bookRepository.createRelation({ bookId, libraryId });
  }
}

export { AddBookToLibraryUseCase };
