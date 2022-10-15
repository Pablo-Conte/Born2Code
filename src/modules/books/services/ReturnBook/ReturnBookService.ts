import { BooksRepository } from "../../../../database/repositories/BookRepository";
import { Rentuser_bookRepository } from "../../../../database/repositories/Rentuser_book";
import { AppError } from "../../../../shared/errors";

type TData = {
    bookId: string;
    userId: string
}

class ReturnBookService {

    async execute({ bookId, userId }: TData): Promise<number>{

        const rentUser_BookRepository = new Rentuser_bookRepository();

        const rentedBook = await rentUser_BookRepository.verifyIfRentExists({ bookId, userId })

        if(!rentedBook) throw new AppError("This Rent not exists!", 404)
      
        const now = new Date(Date.now()) as any;
        const rented_at = new Date(rentedBook.rented_at) as any
        
        const bookRepository = new BooksRepository();
        const book = await bookRepository.findById({ id: bookId });

        const hourValue = book.hourValue

        const time  = Math.abs(now - rented_at);
        const hours = Math.ceil(time/(1000*60*60));

        const total = hours * hourValue;

        return total;

    }
}

export { ReturnBookService }