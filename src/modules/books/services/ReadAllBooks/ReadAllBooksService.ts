import { BookEntity } from "../../../../database/entities/BookEntity";
import { BooksRepository } from "../../../../database/repositories/BookRepository";
import { LibraryRepository } from "../../../../database/repositories/LibraryRepository";

type TUserData = {
    queryLibrary: string;
    queryBook: string;
}

class ReadAllBooksService {

    async execute({ queryLibrary, queryBook }: TUserData){

        const bookRepository = new BooksRepository();
        const libraryRepository = new LibraryRepository()

        const booksFound = await bookRepository.readAllBooks()

        if (queryLibrary){
            const booksOnLibraryFound = await libraryRepository.readAllBooks({ queryLibrary });  
            return booksOnLibraryFound;
        } else if (queryBook) {
            const libraryOnBooksFound = await bookRepository.readAllLibrariesOnBook({ queryBook }) 
            return libraryOnBooksFound;
        }
        
        return booksFound;
    }
}

export { ReadAllBooksService }