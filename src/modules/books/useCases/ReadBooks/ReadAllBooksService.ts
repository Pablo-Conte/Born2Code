/* eslint-disable eqeqeq */
import { AppError } from "../../../../shared/errors/appError";
import { BookEntity } from "../../infra/entities/BookEntity";
import { BooksRepository } from "../../infra/repositories/BookRepository";

type TUserData = {
  queryLibrary: string;
  queryBook: string;
  all: string;
};

class ReadBooksService {
  async execute({ queryLibrary, queryBook, all }: TUserData) {
    const bookRepository = new BooksRepository();

    const getAll = all == "true";

    let booksFound: BookEntity[];
    switch (getAll) {
      case true:
        booksFound = await bookRepository.readBooks({
          queryLibrary,
        });
        break;
      case false:
        if (!queryBook) throw new AppError("Book id missing", 400);
        booksFound = await bookRepository.readBooks({
          queryBook,
        });
        break;
      default:
    }

    if (booksFound.length < 1) throw new AppError("Books not found", 404);

    return booksFound;
  }
}

export { ReadBooksService };
