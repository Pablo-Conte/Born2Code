import { AppError } from "../../../../shared/errors/appError";
import { LibraryRepository } from "../../infra/repositories/implementations/LibraryRepository";
import { inject, injectable } from "tsyringe";

type TDeleteLibrary = {
  libraryId: string;
};

@injectable()
class DeleteLibraryService {
  /**
   *
   */
  constructor(
    @inject("LibraryRepository")
    private libraryRepository: LibraryRepository
  ){}
  async execute({ libraryId }: TDeleteLibrary): Promise<void> {

    const libraryExists = this.libraryRepository.findById({ libraryId });

    if (!libraryExists)
      throw new AppError("This book doesn't exists! Try again", 404);

    await this.libraryRepository.delete({ libraryId });
  }
}

export { DeleteLibraryService };
