import { Library_bookRepository } from "../../../../database/repositories/library_bookRepository"
import { AppError } from "../../../../shared/errors";

type TUserData = {
    bookId: string,
    libraryId: string
}

class AddBookToLibraryService {

    async execute({ bookId, libraryId }: TUserData): Promise<void>{

        const library_bookRepository = new Library_bookRepository();

        const alreadyRelationConflict = library_bookRepository.alreadyRelationConflict({ bookId, libraryId })

        if (alreadyRelationConflict) throw new AppError("This relation already exists!", 400)
        
        await library_bookRepository.createRelation({ bookId, libraryId })

    }
}

export { AddBookToLibraryService }