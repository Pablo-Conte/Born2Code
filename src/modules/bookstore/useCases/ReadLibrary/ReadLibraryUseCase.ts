import { inject, injectable } from "tsyringe";
import { LibraryIdDTO } from "../../@types";
import { LibraryEntity } from "../../infra/entities/LibraryEntity";
import { LibraryRepository } from "../../infra/repositories/implementations/LibraryRepository";

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
