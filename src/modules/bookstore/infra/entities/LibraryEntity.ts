import { Library } from "@prisma/client";

class LibraryEntity implements Library {
  readonly id: string;

  name: string;
}

export { LibraryEntity };
