import { Prisma } from "@prisma/client";

import { prisma } from "../../../../../../prisma/PrismaClient";
import {
  CreateBookDTO,
  UpdateBookDTO,
  DeleteBookDTO,
  FindByNameDTO,
  FindByIdDTO,
  ReadAllLibrariesOnBookDTO,
  ReadBooksDTO,
} from "../../../@types";
import { BookEntity } from "../../entities/BookEntity";

class BooksRepository {
  async createBook({ dataToCreateBook }: CreateBookDTO): Promise<BookEntity> {
    const newBook = await prisma.book.create({
      data: {
        ...dataToCreateBook,
      },
    });

    return newBook;
  }

  async updateBook({ dataBook, bookId }: UpdateBookDTO) {
    const updatedBook = await prisma.book.update({
      where: {
        id: bookId,
      },
      data: dataBook,
    });

    return updatedBook;
  }

  async deleteBook({ id }: DeleteBookDTO) {
    await prisma.book.delete({
      where: {
        id
      },
    });
  }

  async findByName({ name }: FindByNameDTO): Promise<BookEntity> {
    const BookFound = prisma.book.findFirst({
      where: {
        name,
      },
    });

    return BookFound;
  }

  async findById({ id }: FindByIdDTO) {
    const bookFound = prisma.book.findFirst({
      where: {
        id,
      },
    });

    return bookFound;
  }

  async readBooks({
    queryLibrary,
    queryBook,
  }: ReadBooksDTO): Promise<BookEntity[]> {
    const whereObject: Prisma.BookWhereInput = {
      Library: {
        some: {
          libraryId: queryLibrary,
        },
      },
      id: queryBook,
    };

    if (!queryLibrary) delete whereObject.Library;
    if (!queryBook) delete whereObject.id;

    const booksFound = prisma.book.findMany({
      where: whereObject,
    });

    return booksFound;
  }

  async readAllLibrariesOnBook({ queryBook }: ReadAllLibrariesOnBookDTO) {
    const librariesFound = await prisma.book.findMany({
      where: {
        id: queryBook,
      },
      include: {
        Library: { include: { Library: true } },
      },
    });

    return librariesFound;
  }
}

export { BooksRepository };
