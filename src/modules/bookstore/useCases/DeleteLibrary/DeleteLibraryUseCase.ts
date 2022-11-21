import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/appError";
import { DeleteLibraryDTO } from "../../@types/DeleteLibraryDTO";
import { ILibraryRepository } from "../../infra/repositories/ILibraryRepository";
import { LibraryRepository } from "../../infra/repositories/implementations/LibraryRepository";

@injectable()
class DeleteLibraryUseCase {
  constructor(
    @inject(LibraryRepository)
    private libraryRepository: ILibraryRepository
  ) {}

  async execute({ libraryId }: DeleteLibraryDTO): Promise<void> {
    const libraryExists = this.libraryRepository.findById({ libraryId });

    if (!libraryExists)
      throw new AppError("This book doesn't exists! Try again", 404);

    await this.libraryRepository.delete({ libraryId });
  }
}

export { DeleteLibraryUseCase };
