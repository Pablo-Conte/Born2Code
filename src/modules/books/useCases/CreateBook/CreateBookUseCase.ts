import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/appError";
import { BookEntity } from "@modules/books/infra/entities/BookEntity";
import { IBooksRepository } from "@modules/books/infra/repositories/IBooksRepository";
import { BooksRepository } from "@modules/books/infra/repositories/implementations/BooksRepository";

type TUserData = {
  dataToCreateBook: BookEntity;
};

@injectable()
class CreateBookUseCase {
  constructor(
    @inject(BooksRepository)
    private booksRepository: IBooksRepository
  ) {}

  async execute({ dataToCreateBook }: TUserData): Promise<BookEntity> {
    const nameConflict = await this.booksRepository.findByName({
      name: dataToCreateBook.name,
    });

    if (nameConflict) throw new AppError("This book already exists", 409);

    const newBook = await this.booksRepository.createBook({ dataToCreateBook });

    return newBook;
  }
}

export { CreateBookUseCase };
