import { AppError } from "../../../../shared/errors/appError";
import { RentUserLibraryBookRepository } from "../../../accounts/infra/repositories/RentUserLibraryBookRepository";
import { UsersRepository } from "../../../accounts/infra/repositories/UsersRepository";
import { Library_BookRepository } from "../../../bookstore/infra/repositories/Library_BookRepository";


type TBookId = {
  library_bookId: string;
  userId: string;
};

class RentABookService {
  async execute({ library_bookId, userId }: TBookId): Promise<void> {
    const rentUserLibraryBookRepository = new RentUserLibraryBookRepository();
    const library_bookRepository = new Library_BookRepository();
    const userRepository = new UsersRepository();

    const rentedBooks = await userRepository.readAllBooks({ userId })

    if (rentedBooks >= 3)
      throw new AppError(
        "Maximum books rented, return one and come back here!",
        400
      );

    const { rented } = await library_bookRepository.findById(
      {
        library_bookId,
      }
    );

    if (rented) throw new AppError("Book already rented", 409);

    await rentUserLibraryBookRepository.rent({
      userId,
      library_bookId,
    });

    await library_bookRepository.updateToRented({ library_bookId });
  }
}

export { RentABookService };
