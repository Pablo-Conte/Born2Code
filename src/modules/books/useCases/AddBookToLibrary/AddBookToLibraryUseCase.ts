import { UserDataDTO } from "@modules/bookstore/@types";
import { ILibrary_BookRepository } from "@modules/bookstore/infra/repositories/ILibrary_BookRepository";
import { Library_BookRepository } from "@modules/bookstore/infra/repositories/implementations/Library_BookRepository";
import { AppError } from "@shared/errors/appError";
import { inject, injectable } from "tsyringe";

@injectable()
class AddBookToLibraryUseCase {
  constructor(
    @inject(Library_BookRepository)
    private library_bookRepository: ILibrary_BookRepository
  ) {}

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
