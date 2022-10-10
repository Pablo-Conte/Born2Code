import { BookEntity } from "../../../../database/entities/BookEntity";
import { BooksRepository } from "../../../../database/repositories/BookRepository";
import { AppError } from "../../../../shared/errors";

type TReadBook = {
    id: string;
}

class ReadBookService {
    
    async execute({ id }: TReadBook): Promise<BookEntity>{

        const bookRepository = new BooksRepository();

        const bookExists = await bookRepository.findById({ id });
        
        if (!bookExists) throw new AppError("This book id doesn't exists! Try again.", 404);
       
        return bookExists;
    }
}

export { ReadBookService }