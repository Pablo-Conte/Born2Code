import { AppError } from "../../../../shared/errors/appError";
import { CreateEmphasisBookUseCase } from "../../../emphasisBook/useCases/CreateEmphasisBookUseCase";
import { BookEntity } from "../../infra/entities/BookEntity";
import { BooksRepository } from "../../infra/repositories/implementations/BookRepository";
import { inject, injectable } from "tsyringe";
import { EmphasisBookRepository } from "../../../emphasisBook/infra/repositories/implementations/EmphasisBookRepository";

type TUserData = {
  dataToCreateBook: BookEntity;
};

@injectable()
class CreateBookService {
  constructor(
    @inject("BooksRepository")
    private booksRepository: BooksRepository,
    @inject("EmphasisBookRepository")
    private emphasisBookRepository: EmphasisBookRepository
  ){}
  async execute({ dataToCreateBook }: TUserData): Promise<BookEntity> {

    const nameConflict = await this.booksRepository.findByName({
      name: dataToCreateBook.name,
    });

    if (nameConflict) throw new AppError("This book already exists", 409);

    const newBook = await this.booksRepository.createBook({ dataToCreateBook });

    await this.emphasisBookRepository.create({ bookId: newBook.id });
    
    return newBook;
  }
}

export { CreateBookService };
