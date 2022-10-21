import { AppError } from "../../../../shared/errors/appError";
import { LibraryEntity } from "../../infra/entities/LibraryEntity";
import { LibraryRepository } from "../../infra/repositories/LibraryRepository";

type TData = {
  data: Partial<LibraryEntity>;
  libraryId: string;
};

class UpdateLibraryService {
  async execute({ data, libraryId }: TData): Promise<LibraryEntity> {
    const libraryRepository = new LibraryRepository();

    const nameConflict = await libraryRepository.findByName({
      name: data.name,
    });

    if (nameConflict)
      throw new AppError("Name of library already in use, try again!", 409);

    const updateLibrary = await libraryRepository.update({ data, libraryId });

    return updateLibrary;
  }
}

export { UpdateLibraryService };
