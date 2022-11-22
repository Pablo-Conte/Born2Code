import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/appError";
import { RentRepository } from "@modules/accounts/infra/repositories/implementations/RentRepository";
import { UsersRepository } from "@modules/accounts/infra/repositories/implementations/UsersRepository";
import { IRentRepository } from "@modules/accounts/infra/repositories/IRentRepository";
import { IUsersRepository } from "@modules/accounts/infra/repositories/IUsersRepository";
import { HistoryRentEntity } from "@modules/audit/infra/entities/HistoryRentEntity";
import { HistoryRentUseCase } from "@modules/audit/infra/useCases/HistoryRentUseCase";
import { ILibrary_BookRepository } from "@modules/bookstore/infra/repositories/ILibrary_BookRepository";
import { Library_BookRepository } from "@modules/bookstore/infra/repositories/implementations/Library_BookRepository";

type TBookId = {
  library_bookId: string;
  userId: string;
};

@injectable()
class RentABookUseCase {
  constructor(
    @inject(UsersRepository)
    private usersRepository: IUsersRepository,
    @inject(Library_BookRepository)
    private library_bookRepository: ILibrary_BookRepository,
    @inject(RentRepository)
    private rentRepository: IRentRepository,
    @inject(HistoryRentUseCase)
    private historyRentUseCase: HistoryRentUseCase
  ) {}

  async execute({ library_bookId, userId }: TBookId): Promise<void> {
    const rentedBooks = await this.usersRepository.readAllBooks({ userId });

    if (rentedBooks >= 3)
      throw new AppError(
        "Maximum books rented, return one and come back here!",
        400
      );

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

    const CreatedHistory = await this.historyRentUseCase.execute(
      dataToCreateHistory
    );

    await this.rentRepository.rent({
      userId,
      library_bookId,
      historyRentId: CreatedHistory.id,
    });

    await this.library_bookRepository.updateToRented({ library_bookId });
  }
}

export { RentABookUseCase };
