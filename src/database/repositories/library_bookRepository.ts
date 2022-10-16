
import { prisma } from "../../../prisma/PrismaClient"
import { library_bookEntity } from "../entities/library_bookEntity"

type CreateRelationDTO = {
    bookId: string,
    libraryId: string
}

type AlreadyRelationConflictDTO = {
    bookId: string,
    libraryId: string
}

type FindByIdDTO = {
    library_bookId: string;
}

type UpdateToRentedDTO = {
    library_bookId: string;
}

type UpdateToNotRentedDTO = {
    library_bookId: string;
}

class Library_bookRepository {

    async findById({ library_bookId }: FindByIdDTO): Promise<library_bookEntity>{
        
        const library_bookFound = await prisma.library_book.findFirst({
            where: {
                id: library_bookId
            }
        })
        
        return library_bookFound;
    }

    async createRelation({ bookId, libraryId }: CreateRelationDTO): Promise<void> {

        await prisma.library_book.create({
            data: {
                bookId,
                libraryId
            }
        })
    }

    async alreadyRelationConflict({ bookId, libraryId }: AlreadyRelationConflictDTO): Promise<library_bookEntity> {

        const verifyConflict = await prisma.library_book.findFirst({
            where: {
                bookId,
                libraryId
            }
        })

        return verifyConflict;
    }

    async updateToRented({ library_bookId }: UpdateToRentedDTO): Promise<void> {
        
        await prisma.library_book.update({
            where: {
                id: library_bookId
            },
            data: {
                rented: true
            }
        })
    }

    async updateToNotRented({ library_bookId }: UpdateToNotRentedDTO): Promise<void> {
        
        await prisma.library_book.update({
            where: {
                id: library_bookId
            },
            data: {
                rented: false
            }
        })
    }
}

export { Library_bookRepository }