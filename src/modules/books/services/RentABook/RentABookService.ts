import { BooksRepository } from "../../../../database/repositories/BookRepository"
import { Library_bookRepository } from "../../../../database/repositories/library_bookRepository";
import { Rentuser_bookRepository } from "../../../../database/repositories/Rentuser_book";
import { UsersRepository } from "../../../../database/repositories/UsersRepository";
import { AppError } from "../../../../shared/errors"

type TBookId = {
    library_bookId: string;
    userId: string;
}

class RentABookService {

    async execute({ library_bookId, userId }: TBookId): Promise<void>{
        
        const rentUser_BookRepository = new Rentuser_bookRepository()
        const library_bookRepository = new Library_bookRepository()
        const userRepository = new UsersRepository();

        const rentedBooks = await userRepository.readAllBooks({ userId })
        if (rentedBooks[0].length >= 3) throw new AppError("Maximum books rented, return one and come back here!", 400)

        const library_book = await library_bookRepository.findById({ library_bookId })
        
        if(library_book.rented) throw new AppError("Book already rented", 409)

        console.log(library_book.bookId)
        
        await rentUser_BookRepository.rent({ bookId: library_book.bookId, userId, libraryId:library_book.libraryId, library_bookId })
        await library_bookRepository.updateToRented({ library_bookId })
    
    }
}

export { RentABookService }