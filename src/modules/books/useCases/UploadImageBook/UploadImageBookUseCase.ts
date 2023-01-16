import { BookEntity } from "@modules/books/infra/entities/BookEntity";
import { IBooksRepository } from "@modules/books/infra/repositories/IBooksRepository";
import { inject, injectable } from "tsyringe";

type BookImageDTO = {
  bookId?: string;
  userId: string;
  bookImage?: string;
  bookData?: Partial<BookEntity>;
};

@injectable()
class UploadImageBookUseCase {
  constructor(
    @inject("BooksRepository")
    private booksRepository: IBooksRepository
  ) {}

  async execute({ bookId, bookImage }: BookImageDTO): Promise<BookEntity> {
    const uploadImage = await this.booksRepository.uploadImageBook({
      id: bookId,
      bookImage,
    });

    return uploadImage;
  }
}

export { UploadImageBookUseCase, BookImageDTO };
