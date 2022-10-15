import { BooksRepository } from "../../../../database/repositories/BookRepository"
import { AppError } from "../../../../shared/errors"

type TBookId = {
    bookId: string;
    userId: string;
}

class RentABookService {

    async execute({ bookId, userId }: TBookId): Promise<void>{

        const booksRepository = new BooksRepository()

        const bookRented = await booksRepository.verifyIfIsNotRented({ bookId })

        if(bookRented.rented) throw new AppError("Book already rented", 409)

        await booksRepository.rentABook({ bookId, userId })
    }
}

export { RentABookService }