import { LibraryEntity } from "../../../../database/entities/LibraryEntity";
import { LibraryRepository } from "../../../../database/repositories/LibraryRepository";

type TLibraryId = {
    libraryId: string
}

class ReadLibraryService {

    async execute({ libraryId }: TLibraryId): Promise<LibraryEntity>{

        const libraryRepository = new LibraryRepository();

        const libraryFound = await libraryRepository.findById({ libraryId });
        
        return libraryFound;
    }
}

export { ReadLibraryService };