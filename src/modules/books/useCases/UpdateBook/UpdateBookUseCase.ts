import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/appError";
import { BookEntity } from "../../infra/entities/BookEntity";
import { IBooksRepository } from "../../infra/repositories/IBooksRepository";
import { BooksRepository } from "../../infra/repositories/implementations/BooksRepository";

type TUpdateBook = {
  dataBook: Partial<BookEntity>;
  bookId: string;
};

@injectable()
class UpdateBookUseCase {
  constructor(
    @inject(BooksRepository)
    private booksRepository: IBooksRepository
  ) {}

  async execute({ dataBook, bookId }: TUpdateBook): Promise<BookEntity> {
    const bookExists = await this.booksRepository.findById({ id: bookId });

    if (!bookExists)
      throw new AppError("This book id isn't valid, try again!", 404);

    const updateBook = await this.booksRepository.updateBook({
      dataBook,
      bookId,
    });

    return updateBook;
  }
}

export { UpdateBookUseCase };
