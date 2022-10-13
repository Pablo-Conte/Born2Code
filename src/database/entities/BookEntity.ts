import { Book } from "@prisma/client";
import { library_bookEntity } from "./library_book";

class BookEntity implements Book {

    readonly id: string;
    library?: library_bookEntity[];
    name: string;
    hourValue: number;

}

export { BookEntity };