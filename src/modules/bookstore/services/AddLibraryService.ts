import { LibraryEntity } from "../../../database/entities/LibraryEntity";
import { LibraryRepository } from "../../../database/repositories/LibraryRepository"

type TCreateBook = {
    nameBook: string
}

class AddLibraryService {

    async execute({ nameBook }: TCreateBook): Promise<LibraryEntity> {

        const libraryRepository = new LibraryRepository();

        const newBook = libraryRepository.create({ nameBook })

        return newBook;
    }
}

export { AddLibraryService }