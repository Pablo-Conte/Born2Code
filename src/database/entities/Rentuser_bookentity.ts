import { Rentuser_book } from '@prisma/client'

class Rentuser_bookEntity implements Rentuser_book {
    
    id: string;
    userId: string;
    bookId: string;
    rented_at: Date;
    libraryId: string;
    library_bookId: string;
    
}

export { Rentuser_bookEntity }