import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/appError";
import { IBooksRepository } from "@modules/books/infra/repositories/IBooksRepository";
import { BooksRepository } from "@modules/books/infra/repositories/implementations/BooksRepository";
import { UsersRepository } from "@modules/accounts/infra/repositories/implementations/UsersRepository";
import { IUsersRepository } from "@modules/accounts/infra/repositories/IUsersRepository";

type TDeleteBook = {
  id: string;
  userId: string;
};

@injectable()
class DeleteBookUseCase {
  constructor(
    @inject(BooksRepository)
    private booksRepository: IBooksRepository,
    @inject(UsersRepository)
    private usersRepository: IUsersRepository
  ) {}

  async execute({ id, userId }: TDeleteBook): Promise<void> {
    const userExists = await this.usersRepository.findById({ userId });
    if (userExists.admin === false)
      throw new AppError("User is not admin", 404);

    const bookExists = await this.booksRepository.findById({ id });

    if (!bookExists) throw new AppError("Book doesn't exists, try again!", 404);

    await this.booksRepository.deleteBook({ id, userId });
  }
}

export { DeleteBookUseCase };
