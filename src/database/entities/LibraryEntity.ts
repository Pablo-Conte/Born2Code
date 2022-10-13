import { Library } from "@prisma/client";
import { library_bookEntity } from "./library_book";

class LibraryEntity implements Library {

    readonly id: string;
    name: string;
    book?: library_bookEntity[];
}

export { LibraryEntity }; 