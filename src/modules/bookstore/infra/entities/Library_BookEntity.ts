import { LibraryBook } from "@prisma/client";

class Library_BookEntity implements LibraryBook {
  readonly id: string;

  libraryId: string;
  bookId: string;
  rented: boolean;
}

export { Library_BookEntity };
