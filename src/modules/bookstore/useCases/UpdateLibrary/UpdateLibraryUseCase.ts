import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/appError";
import { DataDTO } from "../../@types";
import { LibraryEntity } from "../../infra/entities/LibraryEntity";
import { LibraryRepository } from "../../infra/repositories/implementations/LibraryRepository";

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
