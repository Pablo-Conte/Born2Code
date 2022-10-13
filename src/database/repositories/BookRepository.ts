import { prisma } from "../../../prisma/PrismaClient"
import { BookEntity } from "../entities/BookEntity";

type CreateBookDTO = {
    dataToCreateBook: BookEntity;
}

type FindByNameDTO = {
    name: string;
}

type FindByIdDTO = {
    id: string;
}

type DeleteBookDTO = {
    id: string;
}

type UpdateBookDTO = {
    dataBook: Partial<BookEntity>;
    bookId: string;
}

class BooksRepository {
    
    async createBook({ dataToCreateBook }: CreateBookDTO): Promise<BookEntity>{
        
        const newBook = await prisma.book.create({
            data: {
                ... dataToCreateBook
            }
        })

        return newBook;
    }

    async updateBook({ dataBook, bookId }: UpdateBookDTO){

        const updatedBook = await prisma.book.update({
            where: {
                id: bookId
            },
            data: dataBook
        })

        return updatedBook;
    }

    async deleteBook({ id }: DeleteBookDTO){

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