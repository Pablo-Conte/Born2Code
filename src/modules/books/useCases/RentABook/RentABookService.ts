import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/appError";
// import { RentUserLibraryBookRepository } from "../../../accounts/infra/repositories/implementations/RentUserLibraryBookRepository";
import { UsersRepository } from "../../../accounts/infra/repositories/UsersRepository";
import { HistoryRentEntity } from "../../../audit/infra/entities/HistoryRentEntity";
import { HistoryRentService } from "../../../audit/infra/useCases/HistoryRentService";
import { VerifyOpenBillsService } from "../../../billsToPay/useCases/VerifyOpenBillsService";
import { Library_BookRepository } from "../../../bookstore/infra/repositories/Library_BookRepository";
import { EmphasisBookRepository } from "../../../emphasisBook/infra/repositories/EmphasisBookRepository";
import { LibraryRepository } from "../../../bookstore/infra/repositories/LibraryRepository";
import { Mail } from "../../../emails/useCase/mailUseCase";
import { BooksRepository } from "../../infra/repositories/BookRepository";
import { IRentUserLibraryBookRepository } from "../../../accounts/infra/repositories/IRentUserLibraryBookRepository";




type TBookId = {
  library_bookId: string;
  userId: string;
};

@injectable()
class RentABookService {

  constructor (
    @inject("RentUserLibraryBookRepository")
    private rentUserLibraryBookRepository: IRentUserLibraryBookRepository
  ) {}

  async execute({ library_bookId, userId }: TBookId): Promise<void> {

    
    // const rentUserLibraryBookRepository = new RentUserLibraryBookRepository();
    const library_bookRepository = new Library_BookRepository();
    const userRepository = new UsersRepository();
    const historyRentService = new HistoryRentService();
    const libraryRepository = new LibraryRepository();
    const bookRepository = new BooksRepository();
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

    await this.rentUserLibraryBookRepository.rent({
      userId,
      library_bookId,
      historyRentId: CreatedHistory.id,
    });

    // add total rents on emphasisBook
    const { bookId } = libraryBook;
    await emphasisBookRepository.updateTotalRents({ bookId });
    //
    await library_bookRepository.updateToRented({ library_bookId });

    const library_book = await library_bookRepository.findById({
      library_bookId,
    });
    const { libraryId } = library_book;
    const library = await libraryRepository.findById({ libraryId });
    const { email } = library;
    const namePersonWhoRent = await userRepository.findById( { id: userId } )
    const { name } = namePersonWhoRent;
    const book = await bookRepository.findById( {id: bookId} )

    const mail = new Mail(
      email,
      "Um de seus Livros foi alugado!",
      `<h1>Você acaba de alugar um livro!</h1><p>Livro alugado: ${book.name}</p><p>Nome de quem alugou: ${name}</p>`
    );
    mail.sendMail();
  }
}

export { RentABookService };
