import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/appError";
import { BookEntity } from "../../infra/entities/BookEntity";
import { IBooksRepository } from "../../infra/repositories/IBooksRepository";
import { BooksRepository } from "../../infra/repositories/implementations/BooksRepository";

type TUserData = {
  queryLibrary: string;
  queryBook: string;
  all: string;
};

@injectable()
class ReadAllBooksUseCase {
  constructor(
    @inject(BooksRepository)
    private booksRepository: IBooksRepository
  ) {}

  async execute({ queryLibrary, queryBook, all }: TUserData) {
    const getAll = all == "true";

    let booksFound: BookEntity[];
    switch (getAll) {
      case true:
        booksFound = await this.booksRepository.readBooks({
          queryLibrary,
        });
        break;
      case false:
        if (!queryBook) throw new AppError("Book id missing", 400);
        booksFound = await this.booksRepository.readBooks({
          queryBook,
        });
        break;
      default:
    }

    if (booksFound.length < 1) throw new AppError("Books not found", 404);

    return booksFound;
  }
}

export { ReadAllBooksUseCase };
