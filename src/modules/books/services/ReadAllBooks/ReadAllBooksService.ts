import { BookEntity } from "../../../../database/entities/BookEntity";
import { BooksRepository } from "../../../../database/repositories/BookRepository";
import { LibraryRepository } from "../../../../database/repositories/LibraryRepository";

type TUserData = {
    query: string;
}

class ReadAllBooksService {

    async execute({ query }: TUserData): Promise<BookEntity[]>{

        const bookRepository = new BooksRepository();
        const libraryRepository = new LibraryRepository()

        const booksOnLibraryFound = await libraryRepository.readAllBooks({ query });        

        const booksFound = await bookRepository.readAllBooks()

        if (query){
            return booksOnLibraryFound;
        } else {
            return booksFound;
        }
        
    }
}

export { ReadAllBooksService }