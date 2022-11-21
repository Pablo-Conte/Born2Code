import { DataDTO } from "@modules/bookstore/@types";
import { LibraryEntity } from "@modules/bookstore/infra/entities/LibraryEntity";
import { LibraryRepository } from "@modules/bookstore/infra/repositories/implementations/LibraryRepository";
import { AppError } from "@shared/errors/appError";
import { inject, injectable } from "tsyringe";

@injectable()
class UpdateLibraryUseCase {
  constructor(
    @inject(LibraryRepository)
    private libraryRepository: LibraryRepository
  ) {}

  async execute({ data, libraryId }: DataDTO): Promise<LibraryEntity> {
    const nameConflict = await this.libraryRepository.findByName({
      name: data.name,
    });

    if (nameConflict)
      throw new AppError("Name of library already in use, try again!", 409);

    const updateLibrary = await this.libraryRepository.update({
      data,
      libraryId,
    });

    return updateLibrary;
  }
}

export { UpdateLibraryUseCase };
