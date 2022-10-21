import { AppError } from "../../../../shared/errors/appError";
import { BookEntity } from "../../infra/entities/BookEntity";
import { BooksRepository } from "../../infra/repositories/BookRepository";

type TUpdateBook = {
  dataBook: Partial<BookEntity>;
  bookId: string;
};

class UpdateBookService {
  async execute({ dataBook, bookId }: TUpdateBook): Promise<BookEntity> {
    const bookRepository = new BooksRepository();

    const bookExists = await bookRepository.findById({ id: bookId });

    if (!bookExists)
      throw new AppError("This book id isn't valid, try again!", 404);

    const updateBook = await bookRepository.updateBook({ dataBook, bookId });

    return updateBook;
  }
}

export { UpdateBookService };
