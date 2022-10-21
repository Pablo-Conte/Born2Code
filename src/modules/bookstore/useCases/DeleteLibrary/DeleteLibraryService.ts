import { AppError } from "../../../../shared/errors/appError";
import { LibraryRepository } from "../../infra/repositories/LibraryRepository";

type TDeleteLibrary = {
  libraryId: string;
};

class DeleteLibraryService {
  /**
   *
   */

  async execute({ libraryId }: TDeleteLibrary): Promise<void> {
    const libraryRepository = new LibraryRepository();

    const libraryExists = libraryRepository.findById({ libraryId });

    if (!libraryExists)
      throw new AppError("This book doesn't exists! Try again", 404);

    await libraryRepository.delete({ libraryId });
  }
}

export { DeleteLibraryService };
