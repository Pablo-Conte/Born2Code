import { library_book } from "@prisma/client"

class library_bookEntity implements library_book {
    
    id: string
    libraryId: string;
    bookId: string;
    rented: boolean

}

export { library_bookEntity }