import { AppError } from "../../../../shared/errors/appError";
import { Library_BookRepository } from "../../../bookstore/infra/repositories/Library_BookRepository";

type TUserData = {
  bookId: string;
  libraryId: string;
};

class AddBookToLibraryService {
  async execute({ bookId, libraryId }: TUserData): Promise<void> {
    const library_bookRepository = new Library_BookRepository();

    const alreadyRelationConflict =
      await library_bookRepository.alreadyRelationConflict({
        bookId,
        libraryId,
      });

    if (alreadyRelationConflict)
      throw new AppError("This relation already exists!", 400);

    await library_bookRepository.createRelation({ bookId, libraryId });
  }
}

export { AddBookToLibraryService };
