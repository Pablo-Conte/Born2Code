import { Book } from "@prisma/client";

import { Library_BookEntity } from "../../../bookstore/infra/entities/Library_BookEntity";

class BookEntity implements Book {
  readonly id: string;

  name: string;
  hourValue: number;
  library?: Library_BookEntity[];
}

export { BookEntity };
