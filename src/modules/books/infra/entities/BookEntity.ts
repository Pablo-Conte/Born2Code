import { Library_BookEntity } from "@modules/bookstore/infra/entities/Library_BookEntity";
import { Book } from "@prisma/client";

class BookEntity implements Book {
  readonly id: string;

  name: string;
  hourValue: number;
  library?: Library_BookEntity[];
}

export { BookEntity };
