import { AppError } from "../../../../shared/errors/appError";
import { Library_BookRepository } from "../../../bookstore/infra/repositories/implementations/Library_BookRepository";
import { inject, injectable } from "tsyringe";

type TUserData = {
  bookId: string;
  libraryId: string;
};

@injectable()
class AddBookToLibraryService {
  constructor(
    @inject("Library_BookRepository")
    private library_bookRepository: Library_BookRepository
  ){}
  async execute({ bookId, libraryId }: TUserData): Promise<void> {

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

export { AddBookToLibraryService };
