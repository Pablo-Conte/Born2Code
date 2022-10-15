import { Book } from "@prisma/client";
import { library_bookEntity } from "./library_bookEntity";

class BookEntity implements Book {

    readonly id: string;
    library?: library_bookEntity[];
    name: string;
    hourValue: number;
    rented: boolean

}

export { BookEntity };