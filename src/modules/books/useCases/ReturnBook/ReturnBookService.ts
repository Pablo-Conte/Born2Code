/* eslint-disable radix */
/* eslint-disable eqeqeq */
import { AppError } from "../../../../shared/errors/appError";
import { RentUserLibraryBookRepository } from "../../../accounts/infra/repositories/implementations/RentUserLibraryBookRepository";
import { HistoryRentRepository } from "../../../audit/infra/repositories/implementations/HistoryRentRepository";
import { HistoryRentReturnService } from "../../../audit/infra/useCases/HistoryRentReturnService";
import { CreateBillService } from "../../../billsToPay/useCases/CreateBillService";
import { Library_BookRepository } from "../../../bookstore/infra/repositories/implementations/Library_BookRepository";
import { BooksRepository } from "../../infra/repositories/implementations/BookRepository";
import { inject, injectable } from "tsyringe";
import { BillRepository } from "../../../billsToPay/infra/repositories/implementations/BillRepository";

type TData = {
  returnId: string;
  userId: string;
};

@injectable()
class ReturnBookService {
  constructor(
    @inject("RentUserLibraryBookRepository")
    private rentUserLibraryBookRepository: RentUserLibraryBookRepository,
    @inject("HistoryRentRepository")
    private historyRentRepository: HistoryRentRepository,
    @inject("Library_BookRepository")
    private library_bookRepository: Library_BookRepository,
    @inject("BooksRepository")
    private booksRepository: BooksRepository,
    @inject("BillRepository")
    private billRepository: BillRepository
  ){}
  async execute({ returnId, userId }: TData): Promise<object> {

    const rentedBook = await this.rentUserLibraryBookRepository.verifyIfRentExists({
      returnId,
    });

    if (rentedBook.userId != userId) { 
      throw new AppError("You aren't the user who rent this book", 401);
    }

    if (!rentedBook) throw new AppError("This Rent not exists!", 404);

    const now = new Date(Date.now()) as Date;
    const rented_at = new Date(rentedBook.rented_at) as Date;

    const { bookId } = await this.library_bookRepository.findById({
      library_bookId: rentedBook.library_bookId,
    });

    const bookRepository = new BooksRepository();
    const book = await bookRepository.findById({ id: bookId });

    const { hourValue } = book;

    const parsedNow = now as unknown as number;
    const parsedRentedAt = rented_at as unknown as number;

    const time = Math.abs(parsedNow - parsedRentedAt);

    const minutes = Math.ceil(time / (1000 * 60));

    const coefficientHours = Number(Math.round((minutes / 60)*100) / 100);
    
    const total = Number(Math.round((coefficientHours * hourValue) * 100) / 100);

    const rentUserLibraryBook = await this.rentUserLibraryBookRepository.verifyIfRentExists({ returnId })

    await this.historyRentRepository.Update({id: rentUserLibraryBook.historyId, endDate: now, totalValue: total})

    await this.library_bookRepository.updateToNotRented({
      library_bookId: rentedBook.library_bookId,
    });

    await this.rentUserLibraryBookRepository.delete({ returnId });

    const createBillService = await this.billRepository.create({ userId, valor: total });

    return { total, coefficientHours };
  }
}

export { ReturnBookService };
