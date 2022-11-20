/* eslint-disable radix */
/* eslint-disable eqeqeq */
import { AppError } from "../../../../shared/errors/appError";
import dayjs, { Dayjs } from "dayjs";
import { RentUserLibraryBookRepository } from "../../../accounts/infra/repositories/RentUserLibraryBookRepository";
import { HistoryRentRepository } from "../../../audit/infra/repositories/HistoryRentRepository";
import { HistoryRentReturnService } from "../../../audit/infra/useCases/HistoryRentReturnService";
import { Library_BookRepository } from "../../../bookstore/infra/repositories/Library_BookRepository";
import { BooksRepository } from "../../infra/repositories/BookRepository";

type TData = {
  returnId: string;
  userId: string;
};

class ReturnBookService {
  async execute({ returnId, userId }: TData): Promise<object> {
    const rentUserLibraryBookRepository = new RentUserLibraryBookRepository();
    const libraryBookRepository = new Library_BookRepository();
    const historyRentRepository = new HistoryRentRepository()
    const historyRentReturnService = new HistoryRentReturnService()
    
    const rentedBook = await rentUserLibraryBookRepository.verifyIfRentExists({
      returnId,
    });
    
    if (rentedBook.userId != userId)
      throw new AppError("You aren't the user who rent this book", 401);
    
    if (!rentedBook) throw new AppError("This Rent not exists!", 404);
    
    

    const { bookId } = await libraryBookRepository.findById({ library_bookId: rentedBook.library_bookId })

    const bookRepository = new BooksRepository();
    const book = await bookRepository.findById({ id: bookId });


    const now = new Date(Date.now()) as Date;
    const rented_at = new Date(rentedBook.rented_at) as Date;

    const { hourValue } = book;

    const parsedNow = now as unknown as number;
    const parsedRentedAt = rented_at as unknown as number;
    
    const time = Math.abs(parsedNow - parsedRentedAt);

    const minutes = Math.ceil(time / (1000 * 60));
    const coefficientHours = minutes / 60;

    const total = (coefficientHours * hourValue).toFixed(2);


    const n = new Dayjs()
    const rent_at_book = new Date(rentedBook.rented_at) as Date
    const rent_at = dayjs(rent_at_book)

    
    



    const rentUserLibraryBook = await rentUserLibraryBookRepository.verifyIfRentExists({ returnId })

    await historyRentReturnService.execute({ id: rentUserLibraryBook.historyId, endDate: now, totalValue: total })

    await libraryBookRepository.updateToNotRented({
      library_bookId: rentedBook.library_bookId,
    });
    
    await rentUserLibraryBookRepository.delete({ returnId });
    
    return { total, coefficientHours };
  }
}

export { ReturnBookService };
