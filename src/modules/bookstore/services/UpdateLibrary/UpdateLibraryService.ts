import { LibraryEntity } from "../../../../database/entities/LibraryEntity"
import { LibraryRepository } from "../../../../database/repositories/LibraryRepository"
import { AppError } from "../../../../shared/errors"

type TData = {
    data: Partial<LibraryEntity>
    libraryId: string
}

class UpdateLibraryService {

    async execute({ data, libraryId }: TData): Promise<LibraryEntity>{

        const libraryRepository = new LibraryRepository();

        const nameConflict = await libraryRepository.findByName({ name: data.name })

        if (nameConflict) throw new AppError("Name of library already in use, try again!", 409)

        const updateLibrary = await libraryRepository.update({ data, libraryId })

        return updateLibrary;
    }
}

export { UpdateLibraryService }