import { DeleteLibraryDTO } from "@modules/bookstore/@types";
import { ILibraryRepository } from "@modules/bookstore/infra/repositories/ILibraryRepository";
import { LibraryRepository } from "@modules/bookstore/infra/repositories/implementations/LibraryRepository";
import { AppError } from "@shared/errors/appError";
import { inject, injectable } from "tsyringe";

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
