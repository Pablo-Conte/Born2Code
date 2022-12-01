import { UsersRepository } from "@modules/accounts/infra/repositories/implementations/UsersRepository";
import { IUsersRepository } from "@modules/accounts/infra/repositories/IUsersRepository";
import { DeleteLibraryDTO } from "@modules/bookstore/@types";
import { ILibraryRepository } from "@modules/bookstore/infra/repositories/ILibraryRepository";
import { LibraryRepository } from "@modules/bookstore/infra/repositories/implementations/LibraryRepository";
import { AppError } from "@shared/errors/appError";
import { inject, injectable } from "tsyringe";

@injectable()
class DeleteLibraryUseCase {
  constructor(
    @inject(LibraryRepository)
    private libraryRepository: ILibraryRepository,
    @inject(UsersRepository)
    private usersRepository: IUsersRepository
  ) {}

  async execute({ libraryId, userId }: DeleteLibraryDTO): Promise<void> {
    const userExists = await this.usersRepository.findById({ userId });
    if (userExists.admin === false)
      throw new AppError("User is not admin", 404);

    const libraryExists = this.libraryRepository.findById({ libraryId });
    if (!libraryExists)
      throw new AppError("This book doesn't exists! Try again", 404);

    await this.libraryRepository.delete({ libraryId, userId });
  }
}

export { DeleteLibraryUseCase };
