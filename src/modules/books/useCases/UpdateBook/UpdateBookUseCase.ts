import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/appError";
import { BookEntity } from "@modules/books/infra/entities/BookEntity";
import { IBooksRepository } from "@modules/books/infra/repositories/IBooksRepository";
import { BooksRepository } from "@modules/books/infra/repositories/implementations/BooksRepository";
import { UsersRepository } from "@modules/accounts/infra/repositories/implementations/UsersRepository";
import { IUsersRepository } from "@modules/accounts/infra/repositories/IUsersRepository";

type TUpdateBook = {
  dataBook: Partial<BookEntity>;
  bookId: string;
  userId: string;
};

@injectable()
class UpdateBookUseCase {
  constructor(
    @inject(BooksRepository)
    private booksRepository: IBooksRepository,
    @inject(UsersRepository)
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    dataBook,
    bookId,
    userId,
  }: TUpdateBook): Promise<BookEntity> {
    const userExists = await this.usersRepository.findById({ userId });
    if (userExists.admin === false)
      throw new AppError("User is not admin", 404);

    const bookExists = await this.booksRepository.findById({ id: bookId });
    if (!bookExists)
      throw new AppError("This book id isn't valid, try again!", 404);

    const updateBook = await this.booksRepository.updateBook({
      dataBook,
      bookId,
      userId,
    });

    return updateBook;
  }
}

export { UpdateBookUseCase };
