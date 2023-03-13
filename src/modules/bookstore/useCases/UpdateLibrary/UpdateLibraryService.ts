import { AppError } from "../../../../shared/errors/appError";
import { LibraryEntity } from "../../infra/entities/LibraryEntity";
import { LibraryRepository } from "../../infra/repositories/implementations/LibraryRepository";
import { inject, injectable } from "tsyringe";

type TData = {
  data: Partial<LibraryEntity>;
  libraryId: string;
};

@injectable()
class UpdateLibraryService {
  constructor(
    @inject("LibraryRepository")
    private libraryRepository: LibraryRepository
  ){}
  async execute({ data, libraryId }: TData): Promise<LibraryEntity> {

    const nameConflict = await this.libraryRepository.findByName({
      name: data.name,
    });

    if (nameConflict)
      throw new AppError("Name of library already in use, try again!", 409);

    const updateLibrary = await this.libraryRepository.update({ data, libraryId });

    return updateLibrary;
  }
}

export { UpdateLibraryService };
