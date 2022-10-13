import { library_book } from "@prisma/client"

class library_bookEntity implements library_book {
    
    libraryId: string;
    bookId: string;

}

export { library_bookEntity }