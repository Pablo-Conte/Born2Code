import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/appError";
import { IBooksRepository } from "@modules/books/infra/repositories/IBooksRepository";
import { BooksRepository } from "@modules/books/infra/repositories/implementations/BooksRepository";

type TDeleteBook = {
  id: string;
};

@injectable()
class DeleteBookUseCase {
  constructor(
    @inject(BooksRepository)
    private booksRepository: IBooksRepository
  ) {}

  async execute({ id }: TDeleteBook): Promise<void> {
    const userExists = await this.booksRepository.findById({ id });

    if (!userExists) throw new AppError("Book doesn't exists, try again!", 404);

    await this.booksRepository.deleteBook({ id });
  }
}

export { DeleteBookUseCase };
