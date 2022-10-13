import { library_book } from "@prisma/client"
import { Library_bookRepository } from "../../../../database/repositories/library_bookRepository"

type TUserData = {
    bookId: string,
    libraryId: string
}

class AddBookToLibraryService {

    async execute({ bookId, libraryId }: TUserData): Promise<library_book>{

        const library_bookRepository = new Library_bookRepository();

        const newRelation = library_bookRepository.createRelation({ bookId, libraryId })

        return newRelation;
    }
}

export { AddBookToLibraryService }