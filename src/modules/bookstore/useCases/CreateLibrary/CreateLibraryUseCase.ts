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
    private libraryRepository: ILibraryRepository
  ) {}

  async execute({ nameLibrary }: CreateBookDTO): Promise<LibraryEntity> {
    const nameConflict = await this.libraryRepository.findByName({
      name: nameLibrary,
    });
    if (nameConflict) throw new AppError("Library Already exists!", 409);

    const newBook = await this.libraryRepository.create({ nameLibrary });

    return newBook;
  }
}

export { CreateLibraryUseCase };
