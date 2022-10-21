import { AppError } from "../../../../shared/errors/appError";
import { BooksRepository } from "../../infra/repositories/BookRepository";

type TDeleteBook = {
  id: string;
};

class DeleteBookService {
  async execute({ id }: TDeleteBook): Promise<void> {
    const bookRepository = new BooksRepository();

    const userExists = await bookRepository.findById({ id });

    if (!userExists) throw new AppError("Book doesn't exists, try again!", 404);

    await bookRepository.deleteBook({ id });
  }
}

export { DeleteBookService };
