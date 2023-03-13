import { LibraryEntity } from "../../infra/entities/LibraryEntity";
import { LibraryRepository } from "../../infra/repositories/implementations/LibraryRepository";
import { inject, injectable } from "tsyringe";

type TLibraryId = {
  libraryId: string;
};

@injectable()
class ReadLibraryService {
  constructor(
    @inject("LibraryRepository")
    private libraryRepository: LibraryRepository
  ){}
  async execute({ libraryId }: TLibraryId): Promise<LibraryEntity> {

    const libraryFound = await this.libraryRepository.findById({ libraryId });

    return libraryFound;
  }
}

export { ReadLibraryService };
