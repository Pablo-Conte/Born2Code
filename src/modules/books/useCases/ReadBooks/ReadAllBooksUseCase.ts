import { AppError } from "../../../../shared/errors/appError";
import { BookEntity } from "../../infra/entities/BookEntity";
import { IBooksRepository } from "../../infra/repositories/IBooksRepository";

type TUserData = {
  queryLibrary: string;
  queryBook: string;
  all: string;
};

class ReadAllBooksUseCase {
  constructor(private booksRepository: IBooksRepository) {}

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
