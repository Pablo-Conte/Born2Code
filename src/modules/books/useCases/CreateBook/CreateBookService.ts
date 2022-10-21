import { AppError } from "../../../../shared/errors/appError";
import { BookEntity } from "../../infra/entities/BookEntity";
import { BooksRepository } from "../../infra/repositories/BookRepository";

type TUserData = {
  dataToCreateBook: BookEntity;
};

class CreateBookService {
  async execute({ dataToCreateBook }: TUserData): Promise<BookEntity> {
    const booksRepository = new BooksRepository();

    const nameConflict = await booksRepository.findByName({
      name: dataToCreateBook.name,
    });

    if (nameConflict) throw new AppError("This book already exists", 409);

    const newBook = await booksRepository.createBook({ dataToCreateBook });

    return newBook;
  }
}

export { CreateBookService };
