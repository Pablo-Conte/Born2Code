import { AppError } from "../../../../shared/errors/appError";
import { BookEntity } from "../../infra/entities/BookEntity";
import { BooksRepository } from "../../infra/repositories/implementations/BookRepository";
import { inject, injectable } from "tsyringe";

type TUpdateBook = {
  dataBook: Partial<BookEntity>;
  bookId: string;
};

@injectable()
class UpdateBookService {
  constructor(
    @inject("BooksRepository")
    private booksRepository: BooksRepository
  ){}
  async execute({ dataBook, bookId }: TUpdateBook): Promise<BookEntity> {

    const bookExists = await this.booksRepository.findById({ id: bookId });

    if (!bookExists)
      throw new AppError("This book id isn't valid, try again!", 404);

    const updateBook = await this.booksRepository.updateBook({ dataBook, bookId });

    return updateBook;
  }
}

export { UpdateBookService };
