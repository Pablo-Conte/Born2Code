import { LibraryIdDTO } from "@modules/bookstore/@types";
import { LibraryEntity } from "@modules/bookstore/infra/entities/LibraryEntity";
import { LibraryRepository } from "@modules/bookstore/infra/repositories/implementations/LibraryRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class ReadLibraryUseCase {
  constructor(
    @inject(LibraryRepository)
    private libraryRepository: LibraryRepository
  ) {}

  async execute({ libraryId }: LibraryIdDTO): Promise<LibraryEntity> {
    const libraryFound = await this.libraryRepository.findById({ libraryId });

    return libraryFound;
  }
}

export { ReadLibraryUseCase };
