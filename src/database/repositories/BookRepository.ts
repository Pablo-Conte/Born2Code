import { prisma } from "../../../prisma/PrismaClient"
import { BookEntity } from "../entities/BookEntity";
import { Rentuser_bookRepository } from "./Rentuser_book";

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

type ReadAllLibrariesOnBookDTO = {
    queryBook: string;
}

type RentABookDTO = {
    bookId: string;
    userId: string;
}

type VerifyIfIsNotRentedDTO = {
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

    async readAllBooks(): Promise<BookEntity[]>{

        const booksFound = prisma.book.findMany()

        return booksFound;
    }

    async readAllLibrariesOnBook({ queryBook }: ReadAllLibrariesOnBookDTO) {
        
        const librariesFound = await prisma.book.findMany({
            where: {
                id: queryBook
            },
            include: {
                library: { include: { Library: true } }
            }
        })

        const result = librariesFound.map((libraries) => {
            
            const book = libraries.library

            return book.map((books) => { return books.Library })
        })

        return result[0];
        
    }

    async rentABook({ bookId, userId }: RentABookDTO): Promise<void> {
        await prisma.book.update({
            where: {
                id: bookId
            },
            data: {
                rented: true
            }
        })

        const rentuser_book = new Rentuser_bookRepository();
        await rentuser_book.rent({ bookId, userId })
    }

    async verifyIfIsNotRented({ bookId }: VerifyIfIsNotRentedDTO):Promise<BookEntity>{
        const rentedBook = prisma.book.findUnique({
            where: {
                id: bookId
            }
        });

        return rentedBook;
    }
}

export { BooksRepository }