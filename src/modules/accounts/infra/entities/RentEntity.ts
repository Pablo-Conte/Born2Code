import { RentUserLibraryBook } from "@prisma/client";

class RentEntity implements RentUserLibraryBook {
  readonly id: string;
  rented_at: Date;
  userId: string;
  library_bookId: string;
  historyId: string;
}

export { RentEntity };
