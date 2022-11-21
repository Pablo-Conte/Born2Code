import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/appError";
import { RentRepository } from "../../../accounts/infra/repositories/implementations/RentRepository";
import { IRentRepository } from "../../../accounts/infra/repositories/IRentRepository";
import { IUsersRepository } from "../../../accounts/infra/repositories/IUsersRepository";
import { HistoryRentReturnUseCase } from "../../../audit/infra/useCases/HistoryRentReturnUseCase";
import { ILibrary_BookRepository } from "../../../bookstore/infra/repositories/ILibrary_BookRepository";
import { Library_BookRepository } from "../../../bookstore/infra/repositories/implementations/Library_BookRepository";
import { IBooksRepository } from "../../infra/repositories/IBooksRepository";
import { BooksRepository } from "../../infra/repositories/implementations/BooksRepository";

type TData = {
  returnId: string;
  userId: string;
};

@injectable()
class ReturnBookUseCase {
  constructor(
    @inject(RentRepository)
    @inject(BooksRepository)
    @inject(Library_BookRepository)
    @inject(HistoryRentReturnUseCase)
    private rentRepository: IRentRepository,
    private bookRepository: IBooksRepository,
    private library_bookRepository: ILibrary_BookRepository,
    private historyRentReturnUseCase: HistoryRentReturnUseCase
  ) {}

  async execute({ returnId, userId }: TData): Promise<object> {
    const rentedBook = await this.rentRepository.verifyIfRentExists({
      returnId,
    });
    if (rentedBook.userId != userId)
      throw new AppError("You aren't the user who rent this book", 401);

    if (!rentedBook) throw new AppError("This Rent not exists!", 404);

    const now = new Date(Date.now()) as Date;
    const rented_at = new Date(rentedBook.rented_at) as Date;

    const { bookId } = await this.library_bookRepository.findById({
      library_bookId: rentedBook.library_bookId,
    });

    const book = await this.bookRepository.findById({ id: bookId });

    const { hourValue } = book;

    const parsedNow = now as unknown as number;
    const parsedRentedAt = rented_at as unknown as number;

    const time = Math.abs(parsedNow - parsedRentedAt);

    const minutes = Math.ceil(time / (1000 * 60));
    const coefficientHours = minutes / 60;

    const total = (coefficientHours * hourValue).toFixed(2);

    const rentUserLibraryBook = await this.rentRepository.verifyIfRentExists({
      returnId,
    });

    await this.historyRentReturnUseCase.execute({
      id: rentUserLibraryBook.historyId,
      endDate: now,
      totalValue: total,
    });

    await this.library_bookRepository.updateToNotRented({
      library_bookId: rentedBook.library_bookId,
    });

    await this.rentRepository.delete({ returnId });

    return { total, coefficientHours };
  }
}

export { ReturnBookUseCase };
