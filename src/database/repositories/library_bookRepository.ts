
import { prisma } from "../../../prisma/PrismaClient"
import { library_bookEntity } from "../entities/library_book"

type CreateRelationDTO = {
    bookId: string,
    libraryId: string
}

class Library_bookRepository {

    createRelation({ bookId, libraryId }:CreateRelationDTO): Promise<library_bookEntity> {

        const newRelation = prisma.library_book.create({
            data: {
                bookId,
                libraryId
            }
        })

        return newRelation;
    }
}

export { Library_bookRepository }