import { UsersRepository } from "@modules/accounts/infra/repositories/implementations/UsersRepository";
import { IUsersRepository } from "@modules/accounts/infra/repositories/IUsersRepository";
import { DataDTO } from "@modules/bookstore/@types";
import { LibraryEntity } from "@modules/bookstore/infra/entities/LibraryEntity";
import { LibraryRepository } from "@modules/bookstore/infra/repositories/implementations/LibraryRepository";
import { AppError } from "@shared/errors/appError";
import { inject, injectable } from "tsyringe";

@injectable()
class UpdateLibraryUseCase {
  constructor(
    @inject(LibraryRepository)
    private libraryRepository: LibraryRepository,
    @inject(UsersRepository)
    private usersRepository: IUsersRepository
  ) {}

  async execute({ data, libraryId, userId }: DataDTO): Promise<LibraryEntity> {
    const userExists = await this.usersRepository.findById({ userId });
    if (userExists.admin === false)
      throw new AppError("User is not Admin", 404);

    const nameConflict = await this.libraryRepository.findByName({
      name: data.name,
    });
    if (nameConflict)
      throw new AppError("Name of library already in use, try again!", 409);

    const updateLibrary = await this.libraryRepository.update({
      data,
      libraryId,
      userId,
    });

    return updateLibrary;
  }
}

export { UpdateLibraryUseCase };
