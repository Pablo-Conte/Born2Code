import { UsersRepository } from "@modules/accounts/infra/repositories/implementations/UsersRepository";
import { IUsersRepository } from "@modules/accounts/infra/repositories/IUsersRepository";
import { CreateBookDTO } from "@modules/bookstore/@types/CreateBookDTO";
import { LibraryEntity } from "@modules/bookstore/infra/entities/LibraryEntity";
import { ILibraryRepository } from "@modules/bookstore/infra/repositories/ILibraryRepository";
import { LibraryRepository } from "@modules/bookstore/infra/repositories/implementations/LibraryRepository";
import { AppError } from "@shared/errors/appError";
import { inject, injectable } from "tsyringe";

@injectable()
class CreateLibraryUseCase {
  constructor(
    @inject(LibraryRepository)
    private libraryRepository: ILibraryRepository,
    @inject(UsersRepository)
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    nameLibrary,
    userId,
  }: CreateBookDTO): Promise<LibraryEntity> {
    const userExists = await this.usersRepository.findById({ userId });
    if (userExists.admin === false)
      throw new AppError("User is not admin", 404);

    const nameConflict = await this.libraryRepository.findByName({
      name: nameLibrary,
    });
    if (nameConflict) throw new AppError("Library Already exists!", 409);

    const newBook = await this.libraryRepository.create({
      nameLibrary,
      userId,
    });

    return newBook;
  }
}

export { CreateLibraryUseCase };
