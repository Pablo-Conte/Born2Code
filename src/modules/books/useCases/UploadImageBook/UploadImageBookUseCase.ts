import { BookEntity } from "@modules/books/infra/entities/BookEntity";
import { IBooksRepository } from "@modules/books/infra/repositories/IBooksRepository";
import { BooksRepository } from "@modules/books/infra/repositories/implementations/BooksRepository";
import { inject, injectable } from "tsyringe";

type BookImageDTO = {
  bookImage?: string;
  userId?: string;
  bookData?: Partial<BookEntity>;
  bookId?: string;
};

@injectable()
class UploadImageBookUseCase {
  constructor(
    @inject("BooksRepository")
    private booksRepository: IBooksRepository
  ) {}

  async execute({ userId, bookImage }: BookImageDTO): Promise<BookEntity> {
    const uploadImage = await this.booksRepository.uploadImageBook({
      userId,
      bookImage,
    });

    return uploadImage;
  }
}

export { UploadImageBookUseCase, BookImageDTO };
