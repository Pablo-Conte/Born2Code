/* eslint-disable radix */
/* eslint-disable eqeqeq */
import { AppError } from "../../../../shared/errors/appError";
import { RentUserLibraryBookRepository } from "../../../accounts/infra/repositories/RentUserLibraryBookRepository";
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
    
    const rentedBook = await rentUserLibraryBookRepository.verifyIfRentExists({
      returnId,
    });
    
    if (rentedBook.userId != userId)
      throw new AppError("You aren't the user who rent this book", 401);
    
    if (!rentedBook) throw new AppError("This Rent not exists!", 404);
    
    const now = new Date(Date.now()) as Date;
    const rented_at = new Date(rentedBook.rented_at) as Date;

    const { bookId } = await libraryBookRepository.findById({ library_bookId: rentedBook.library_bookId })

    const bookRepository = new BooksRepository();
    const book = await bookRepository.findById({ id: bookId });

    const { hourValue } = book;

    const parsedNow = now as unknown as number;
    const parsedRentedAt = rented_at as unknown as number;
    
    const time = Math.abs(parsedNow - parsedRentedAt);

    const minutes = Math.ceil(time / (1000 * 60));
    const coefficientHours = minutes / 60;

    const total = (coefficientHours * hourValue).toFixed(2);
    
    await libraryBookRepository.updateToNotRented({
      library_bookId: rentedBook.library_bookId,
    });
    
    await rentUserLibraryBookRepository.delete({ returnId });
    
    return { total, coefficientHours };
  }
}

export { ReturnBookService };
