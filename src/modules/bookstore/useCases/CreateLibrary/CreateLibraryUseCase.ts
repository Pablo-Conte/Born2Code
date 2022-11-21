import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/appError";
import { CreateBookDTO } from "../../@types/CreateBookDTO";
import { LibraryEntity } from "../../infra/entities/LibraryEntity";
import { ILibraryRepository } from "../../infra/repositories/ILibraryRepository";
import { LibraryRepository } from "../../infra/repositories/implementations/LibraryRepository";

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
