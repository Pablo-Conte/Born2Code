import { AppError } from "../../../../shared/errors/appError";
import { LibraryEntity } from "../../infra/entities/LibraryEntity";
import { LibraryRepository } from "../../infra/repositories/LibraryRepository";

type TCreateBook = {
  nameLibrary: string;
};

class CreateLibraryService {
  /**
   * Verify name conflict
   * Create Library with name
   */

  async execute({ nameLibrary }: TCreateBook): Promise<LibraryEntity> {
    const libraryRepository = new LibraryRepository();

    const nameConflict = await libraryRepository.findByName({
      name: nameLibrary,
    });

    if (nameConflict) throw new AppError("Library Already exists!", 409);

    const newBook = await libraryRepository.create({ nameLibrary });

    return newBook;
  }
}

export { CreateLibraryService };
