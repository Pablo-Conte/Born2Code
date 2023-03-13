import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/appError";
// import { RentUserLibraryBookRepository } from "../../../accounts/infra/repositories/implementations/RentUserLibraryBookRepository";
import { UsersRepository } from "../../../accounts/infra/repositories/implementations/UsersRepository";
import { HistoryRentEntity } from "../../../audit/infra/entities/HistoryRentEntity";

import { VerifyOpenBillsService } from "../../../billsToPay/useCases/VerifyOpenBillsService";
import { Library_BookRepository } from "../../../bookstore/infra/repositories/implementations/Library_BookRepository";
import { EmphasisBookRepository } from "../../../emphasisBook/infra/repositories/implementations/EmphasisBookRepository";
import { LibraryRepository } from "../../../bookstore/infra/repositories/implementations/LibraryRepository";
import { Mail } from "../../../emails/useCase/mailUseCase";
import { BooksRepository } from "../../infra/repositories/implementations/BookRepository";
import { IRentUserLibraryBookRepository } from "../../../accounts/infra/repositories/IRentUserLibraryBookRepository";
import { HistoryRentRepository } from "../../../audit/infra/repositories/implementations/HistoryRentRepository";
import { BillRepository } from "../../../billsToPay/infra/repositories/implementations/BillRepository";




type TBookId = {
  library_bookId: string;
  userId: string;
};

@injectable()
class RentABookService {

  constructor (
    @inject("RentUserLibraryBookRepository")
    private rentUserLibraryBookRepository: IRentUserLibraryBookRepository,
    @inject("HistoryRentRepository")
    private historyRentRepository: HistoryRentRepository,
    @inject("UsersRepository")
    private usersRepository: UsersRepository,
    @inject("LibraryRepository")
    private libraryRepository: LibraryRepository,
    @inject("Library_BookRepository")
    private library_bookRepository: Library_BookRepository,
    @inject("BooksRepository")
    private booksRepository: BooksRepository,
    @inject("EmphasisBookRepository")
    private emphasisBookRepository: EmphasisBookRepository,
    @inject("BillRepository")
    private billRepository: BillRepository,
  ) {}

  async execute({ library_bookId, userId }: TBookId): Promise<void> {

    const rentedBooks = await this.usersRepository.readAllBooks({ userId });

    if (rentedBooks >= 3)
      throw new AppError(
        "Maximum books rented, return one and come back here!",
        400
      );

    const openBill = await this.billRepository.verifyOpenBill({ userId });
    
    if (openBill) {
      throw new AppError("An open Bill is open for you, pay it first!", 400);
    }

    const libraryBook = await this.library_bookRepository.findById({
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

    const CreatedHistory = await this.historyRentRepository.CreateHistoryRent(
      { dataToCreateHistory }
    );

    await this.rentUserLibraryBookRepository.rent({
      userId,
      library_bookId,
      historyRentId: CreatedHistory.id,
    });

    // add total rents on emphasisBook
    const { bookId } = libraryBook;
    await this.emphasisBookRepository.updateTotalRents({ bookId });
    //
    await this.library_bookRepository.updateToRented({ library_bookId });

    const library_book = await this.library_bookRepository.findById({
      library_bookId,
    });
    const { libraryId } = library_book;
    const library = await this.libraryRepository.findById({ libraryId });
    const { email } = library;
    const namePersonWhoRent = await this.usersRepository.findById( { id: userId } )
    const { name } = namePersonWhoRent;
    const book = await this.booksRepository.findById( {id: bookId} )

    const mail = new Mail(
      email,
      "Um de seus Livros foi alugado!",
      `<h1>Você acaba de alugar um livro!</h1><p>Livro alugado: ${book.name}</p><p>Nome de quem alugou: ${name}</p>`
    );
    mail.sendMail();
  }
}

export { RentABookService };
