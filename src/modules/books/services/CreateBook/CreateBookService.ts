import { BookEntity } from "../../../../database/entities/BookEntity"
import { BooksRepository } from "../../../../database/repositories/BookRepository"
import { AppError } from "../../../../shared/errors";

type TUserData = {
    dataToCreateBook: BookEntity;
}

class CreateBookService {
    
    async execute( { dataToCreateBook }: TUserData): Promise<BookEntity> {

        const booksRepository = new BooksRepository();

        const nameConflict = await booksRepository.findByName({ name: dataToCreateBook.name })
        
        if (nameConflict) throw new AppError("This book already exists", 409);

        const newBook = await booksRepository.createBook({ dataToCreateBook })

        return newBook;
    }
}

export { CreateBookService }