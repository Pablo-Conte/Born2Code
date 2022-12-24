import { AppError } from "../../../../shared/errors/appError";
import { RentUserLibraryBookRepository } from "../../../accounts/infra/repositories/RentUserLibraryBookRepository";
import { UsersRepository } from "../../../accounts/infra/repositories/UsersRepository";
import { HistoryRentEntity } from "../../../audit/infra/entities/HistoryRentEntity";
import { HistoryRentService } from "../../../audit/infra/useCases/HistoryRentService";
import { VerifyOpenBillsService } from "../../../billsToPay/useCases/VerifyOpenBillsService";
import { Library_BookRepository } from "../../../bookstore/infra/repositories/Library_BookRepository";
import { EmphasisBookRepository } from "../../../emphasisBook/infra/repositories/EmphasisBookRepository";


type TBookId = {
  library_bookId: string;
  userId: string;
};

class RentABookService {
  async execute({ library_bookId, userId }: TBookId): Promise<void> {
    const rentUserLibraryBookRepository = new RentUserLibraryBookRepository();
    const library_bookRepository = new Library_BookRepository();
    const userRepository = new UsersRepository();
    const historyRentService = new HistoryRentService();

    const emphasisBookRepository = new EmphasisBookRepository();

    const rentedBooks = await userRepository.readAllBooks({ userId });

    if (rentedBooks >= 3)
      throw new AppError(
        "Maximum books rented, return one and come back here!",
        400
      );

    const verifyOpenBill = new VerifyOpenBillsService();
    
    const openBill = await verifyOpenBill.execute({ userId });
    
    if (openBill) {
      throw new AppError("An open Bill is open for you, pay it first!", 400);
    }

    const libraryBook = await library_bookRepository.findById({
      library_bookId,
    });

    if (libraryBook.rented) throw new AppError("Book already rented", 409);

    const dataToCreateHistory: HistoryRentEntity = {
      libraryid: libraryBook.libraryId,
      bookId: libraryBook.bookId,
      clienteId: userId,
      startDate: new Date(),
      endDate: undefined,
      id: undefined,
      totalValue: undefined,
    };

    const CreatedHistory = await historyRentService.execute(
      dataToCreateHistory
    );

    await rentUserLibraryBookRepository.rent({
      userId,
      library_bookId,
      historyRentId: CreatedHistory.id,
    });
    // add total rents on emphasisBook
    const { bookId } = libraryBook;
    await emphasisBookRepository.updateTotalRents({ bookId });
    //
    await library_bookRepository.updateToRented({ library_bookId });
  }
}

export { RentABookService };
