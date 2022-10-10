import { BooksRepository } from "../../../../database/repositories/BookRepository"
import { AppError } from "../../../../shared/errors";

type TDeleteBook = {
    id: string
}

class DeleteBookService {
    
    async execute({ id }: TDeleteBook): Promise<void>{

        const bookRepository = new BooksRepository();

        const userExists = await bookRepository.findById({ id });

        if (!userExists) throw new AppError("Book doesn't exists, try again!", 404) 

        await bookRepository.DeleteBook({ id });
    }
}

export { DeleteBookService }