import { prisma } from "../../../prisma/PrismaClient"
import { BookEntity } from "../entities/BookEntity";

type CreateBookDTO = {
    dataToCreateBook: BookEntity;
    libraryId: string
}

type FindByNameDTO = {
    name: string
}

class BooksRepository {
    
    async CreateBook({ dataToCreateBook, libraryId }: CreateBookDTO): Promise<BookEntity>{
        
        const newBook = await prisma.book.create({
            data: {
                ... dataToCreateBook,
                libraryId
            }
        })

        return newBook;
    }

    async findByName({ name }: FindByNameDTO): Promise<BookEntity>{

        const BookFound = prisma.book.findFirst({
            where: {
                name
            }
        })

        return BookFound;
    }

}

export { BooksRepository }