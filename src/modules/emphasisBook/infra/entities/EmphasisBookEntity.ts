import { EmphasisBook } from "@prisma/client";

class EmphasisBookEntity implements EmphasisBook {
  id: string;

  bookId: string;
  totalRents: number;
}

export { EmphasisBookEntity };
