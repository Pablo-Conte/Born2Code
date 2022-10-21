import { RentUserLibraryBook } from "@prisma/client";

class RentUserLibraryBookEntity implements RentUserLibraryBook {
  readonly id: string;
  rented_at: Date;
  userId: string;
  library_bookId: string;
}

export { RentUserLibraryBookEntity };
