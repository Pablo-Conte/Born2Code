import { LibraryEntity } from "../../infra/entities/LibraryEntity";
import { LibraryRepository } from "../../infra/repositories/LibraryRepository";

type TLibraryId = {
  libraryId: string;
};

class ReadLibraryService {
  async execute({ libraryId }: TLibraryId): Promise<LibraryEntity> {
    const libraryRepository = new LibraryRepository();

    const libraryFound = await libraryRepository.findById({ libraryId });

    return libraryFound;
  }
}

export { ReadLibraryService };
