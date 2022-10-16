import { LibraryEntity } from "../../../../database/entities/LibraryEntity";
import { LibraryRepository } from "../../../../database/repositories/LibraryRepository";
import { UsersRepository } from "../../../../database/repositories/UsersRepository";
import { AppError } from "../../../../shared/errors";

type TCreateBook = {
    nameLibrary: string
}

class CreateLibraryService {

    /**
     * Verify name conflict
     * Create Library with name
     */

    async execute({ nameLibrary }: TCreateBook): Promise<LibraryEntity> {

        const libraryRepository = new LibraryRepository();

        const nameConflict = await libraryRepository.findByName({ name: nameLibrary })

        if (nameConflict) throw new AppError("Library Already exists!", 409);

        const newBook = await libraryRepository.create({ nameLibrary })

        return newBook;
    }
}

export { CreateLibraryService }