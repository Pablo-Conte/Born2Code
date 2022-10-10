import { prisma } from "../../../prisma/PrismaClient"
import { BookEntity } from "../entities/BookEntity";

type CreateBookDTO = {
    dataToCreateBook: BookEntity;
    libraryId: string;
}

type FindByNameDTO = {
    name: string;
}

type FindByIdDTO = {
    id: string;
}

type DeleteBookDTO = {
    id: string
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

    async DeleteBook({ id }: DeleteBookDTO){

        await prisma.book.delete({
            where: {
                id
            }
        })
    }

    async findByName({ name }: FindByNameDTO): Promise<BookEntity>{

        const BookFound = prisma.book.findFirst({
            where: {
                name
            }
        })

        return BookFound;
    }

    async findById({ id }: FindByIdDTO){
        
        const bookFound = prisma.book.findFirst({
            where: {
                id
            }
        })

        return bookFound;
    }

}

export { BooksRepository }