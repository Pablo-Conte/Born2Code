import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/appError";
import { BookEntity } from "@modules/books/infra/entities/BookEntity";
import { IBooksRepository } from "@modules/books/infra/repositories/IBooksRepository";
import { BooksRepository } from "@modules/books/infra/repositories/implementations/BooksRepository";
import { UsersRepository } from "@modules/accounts/infra/repositories/implementations/UsersRepository";
import { IUsersRepository } from "@modules/accounts/infra/repositories/IUsersRepository";

type TUserData = {
  dataToCreateBook?: BookEntity;
  userId?: string;
};

@injectable()
class CreateBookUseCase {
  constructor(
    @inject(BooksRepository)
    private booksRepository: IBooksRepository,
    @inject(UsersRepository)
    private usersRepository: IUsersRepository
  ) {}

  async execute({ dataToCreateBook, userId }: TUserData): Promise<BookEntity> {
    const nameConflict = await this.booksRepository.findByName({
      name: dataToCreateBook.name,
    });
    if (nameConflict) throw new AppError("This book already exists", 409);

    const userFound = await this.usersRepository.findById({ userId });
    if (userFound.admin === false)
      throw new AppError("You aren't an Admin!", 401);

    const newBook = await this.booksRepository.createBook({
      dataToCreateBook,
      userId,
    });

    return newBook;
  }
}

export { CreateBookUseCase };
