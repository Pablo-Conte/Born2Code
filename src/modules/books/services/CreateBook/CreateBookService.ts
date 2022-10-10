import { BookEntity } from "../../../../database/entities/BookEntity"
import { BooksRepository } from "../../../../database/repositories/BookRepository"
import { AppError } from "../../../../shared/errors";

type TUserData = {
    dataToCreateBook: BookEntity;
    libraryId: string;
}

class CreateBookService {
    
    async execute( { dataToCreateBook, libraryId }: TUserData): Promise<BookEntity> {

        const booksRepository = new BooksRepository();

        const nameConflict = await booksRepository.findByName({ name: dataToCreateBook.name })
        
        if (nameConflict) throw new AppError("This book already exists", 409);

        const newBook = await booksRepository.CreateBook({ dataToCreateBook, libraryId})

        return newBook;
    }
}

export { CreateBookService }