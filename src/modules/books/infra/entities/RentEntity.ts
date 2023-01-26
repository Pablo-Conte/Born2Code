import { RentUserLibraryBook } from "@prisma/client";

class RentEntity implements RentUserLibraryBook {
  id: string;
  rented_at: Date;
  userId: string;
  percentage: number;
  library_bookId: string;
  historyId: string;

}

export { RentEntity };
