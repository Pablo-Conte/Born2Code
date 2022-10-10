import { Book } from "@prisma/client";

class BookEntity implements Book {

    readonly id: string;
    readonly libraryId: string;
    name: string;
    hourValue: number;

}

export { BookEntity };