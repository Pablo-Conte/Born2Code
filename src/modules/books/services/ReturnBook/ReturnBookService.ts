import { BooksRepository } from "../../../../database/repositories/BookRepository";
import { Library_bookRepository } from "../../../../database/repositories/library_bookRepository";
import { Rentuser_bookRepository } from "../../../../database/repositories/Rentuser_book";
import { AppError } from "../../../../shared/errors";

type TData = {
    returnId: string;
    userId: string;
}

class ReturnBookService {

    async execute({ returnId, userId }: TData): Promise<object>{

        const rentUser_BookRepository = new Rentuser_bookRepository();
        const libraryBookRepository = new Library_bookRepository();

        const rentedBook = await rentUser_BookRepository.verifyIfRentExists({ returnId })

        if (rentedBook.userId != userId) throw new AppError("You aren't the user who rent this book", 401);

        if(!rentedBook) throw new AppError("This Rent not exists!", 404)
      
        const now = new Date(Date.now()) as any;
        const rented_at = new Date(rentedBook.rented_at) as any;
        
        const bookRepository = new BooksRepository();
        const book = await bookRepository.findById({ id: rentedBook.bookId });

        const hourValue = book.hourValue

        const time  = Math.abs(now - rented_at);
        const minutes = Math.ceil(time/(1000*60));
        const coeficientHours = (minutes/60)

        const total = (coeficientHours * hourValue).toFixed(2);
        
        await libraryBookRepository.updateToNotRented({ library_bookId: rentedBook.library_bookId })
        await rentUser_BookRepository.delete({ returnId })
        

        return { total, coeficientHours };

    }
}

export { ReturnBookService }