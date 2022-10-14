import { Library } from "@prisma/client";
import { library_bookEntity } from "./library_book";

class LibraryEntity implements Library {

    readonly id: string;
    name: string;
    books?: library_bookEntity[];
}

export { LibraryEntity }; 