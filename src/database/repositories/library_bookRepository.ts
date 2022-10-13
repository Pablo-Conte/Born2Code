
import { prisma } from "../../../prisma/PrismaClient"
import { library_bookEntity } from "../entities/library_book"

type CreateRelationDTO = {
    bookId: string,
    libraryId: string
}

type AlreadyRelationConflictDTO = {
    bookId: string,
    libraryId: string
}

class Library_bookRepository {

    async createRelation({ bookId, libraryId }:CreateRelationDTO): Promise<void> {

        await prisma.library_book.create({
            data: {
                bookId,
                libraryId
            }
        })
    }

    async alreadyRelationConflict({ bookId, libraryId}: AlreadyRelationConflictDTO): Promise<library_bookEntity>{

        const verifyConflict = prisma.library_book.findFirst({
            where: {
                bookId,
                libraryId
            }
        })

        return verifyConflict;
    }
}

export { Library_bookRepository }