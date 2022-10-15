import { Rentuser_book } from '@prisma/client'

class Rentuser_bookEntity implements Rentuser_book {
    
    userId: string;
    bookId: string;
    rented_at: Date;
}

export { Rentuser_bookEntity }