import { UsersRepository } from "@modules/accounts/infra/repositories/implementations/UsersRepository";
import { IUsersRepository } from "@modules/accounts/infra/repositories/IUsersRepository";
import { UserDataDTO } from "@modules/bookstore/@types";
import { ILibrary_BookRepository } from "@modules/bookstore/infra/repositories/ILibrary_BookRepository";
import { Library_BookRepository } from "@modules/bookstore/infra/repositories/implementations/Library_BookRepository";
import { AppError } from "@shared/errors/appError";
import { inject, injectable } from "tsyringe";

@injectable()
class AddBookToLibraryUseCase {
  constructor(
    @inject(Library_BookRepository)
    private library_bookRepository: ILibrary_BookRepository,
    @inject(UsersRepository)
    private usersRepository: IUsersRepository
  ) {}

  async execute({ bookId, libraryId, userId }: UserDataDTO): Promise<void> {
    const userFound = await this.usersRepository.findById({ userId });
    if (userFound.admin === false) throw new AppError("User is not admin", 404);

    const alreadyRelationConflict =
      await this.library_bookRepository.alreadyRelationConflict({
        bookId,
        libraryId,
      });

    if (alreadyRelationConflict)
      throw new AppError("This relation already exists!", 400);

    await this.library_bookRepository.createRelation({
      bookId,
      libraryId,
      userId,
    });
  }
}

export { AddBookToLibraryUseCase };
