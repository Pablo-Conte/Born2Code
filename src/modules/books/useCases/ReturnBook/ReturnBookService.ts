/* eslint-disable radix */
/* eslint-disable eqeqeq */
import { AppError } from "../../../../shared/errors/appError";
import { RentUserLibraryBookRepository } from "../../../accounts/infra/repositories/RentUserLibraryBookRepository";
import { HistoryRentReturnService } from "../../../audit/infra/useCases/HistoryRentReturnService";
import { CreateBillService } from "../../../billsToPay/useCases/CreateBillService";
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
    const historyRentReturnService = new HistoryRentReturnService();

    const rentedBook = await rentUserLibraryBookRepository.verifyIfRentExists({
      returnId,
    });

    if (rentedBook.userId != userId)
      throw new AppError("You aren't the user who rent this book", 401);

    if (!rentedBook) throw new AppError("This Rent not exists!", 404);

    const now = new Date(Date.now()) as Date;
    const rented_at = new Date(rentedBook.rented_at) as Date;

    const { bookId } = await libraryBookRepository.findById({
      library_bookId: rentedBook.library_bookId,
    });

    const bookRepository = new BooksRepository();
    const book = await bookRepository.findById({ id: bookId });

    const { hourValue } = book;

    const parsedNow = now as unknown as number;
    const parsedRentedAt = rented_at as unknown as number;

    const time = Math.abs(parsedNow - parsedRentedAt);

    const minutes = Math.ceil(time / (1000 * 60));
    const coefficientHours = Number(Math.round((minutes / 60) * 100) / 100);

    const total = Number(Math.round(coefficientHours * hourValue * 100) / 100);

    const rentUserLibraryBook =
      await rentUserLibraryBookRepository.verifyIfRentExists({ returnId });

    await historyRentReturnService.execute({
      id: rentUserLibraryBook.historyId,
      endDate: now,
      totalValue: total,
    });

    await libraryBookRepository.updateToNotRented({
      library_bookId: rentedBook.library_bookId,
    });

    await rentUserLibraryBookRepository.delete({ returnId });

    const createBillService = new CreateBillService();

    await createBillService.execute({ userId, valor: total });

    return { total, coefficientHours };
  }
}

export { ReturnBookService };
