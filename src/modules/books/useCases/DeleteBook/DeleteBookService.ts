import { AppError } from "../../../../shared/errors/appError";
import { BooksRepository } from "../../infra/repositories/implementations/BookRepository";
import { inject, injectable } from "tsyringe";

type TDeleteBook = {
  id: string;
};

@injectable()
class DeleteBookService {
  constructor(
    @inject("BooksRepository")
    private booksRepository: BooksRepository
  ){}
  async execute({ id }: TDeleteBook): Promise<void> {

    const userExists = await this.booksRepository.findById({ id });

    if (!userExists) throw new AppError("Book doesn't exists, try again!", 404);

    await this.booksRepository.deleteBook({ id });
  }
}

export { DeleteBookService };
