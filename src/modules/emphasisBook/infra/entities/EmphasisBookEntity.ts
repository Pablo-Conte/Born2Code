import { EmphasisBook } from "@prisma/client";

class EmphasisBookEntity implements EmphasisBook {

  bookId: string;
  totalRents: number;
}

export { EmphasisBookEntity };
