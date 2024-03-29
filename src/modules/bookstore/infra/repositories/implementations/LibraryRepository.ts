import { prisma } from "../../../../../../prisma/PrismaClient";
import { BookEntity } from "../../../../books/infra/entities/BookEntity";
import {
  CreateBookDTO,
  DataToUpdateDTO,
  FindByIdDTO,
  DeleteLibraryDTO,
  FindByNameDTO,
  ReadAllBooksDTO,
} from "../../../@types";
import { LibraryEntity } from "../../entities/LibraryEntity";
import { ILibraryRepository } from "../ILibraryRepository";

class LibraryRepository implements ILibraryRepository{
  async create({ nameLibrary, email }: CreateBookDTO): Promise<LibraryEntity> {
    const newLibrary = await prisma.library.create({
      data: {
        name: nameLibrary,
        email
      },
    });

    return newLibrary;
  }

  async update({ data, libraryId }: DataToUpdateDTO): Promise<LibraryEntity> {
    const updatedLibrary = await prisma.library.update({
      where: {
        id: libraryId,
      },
      data: {
        ...data,
      },
    });

    return updatedLibrary;
  }

  async findById({ libraryId }: FindByIdDTO): Promise<LibraryEntity> {
    const libraryFound = await prisma.library.findUnique({
      where: {
        id: libraryId,
      },
    });

    return libraryFound;
  }

  async delete({ libraryId }: DeleteLibraryDTO): Promise<void> {
    await prisma.library.delete({
      where: {
        id: libraryId,
      },
    });
  }

  async findByName({ name }: FindByNameDTO): Promise<LibraryEntity> {
  
    const libraryFound = await prisma.library.findFirst({
      where: {
        name,
      },
    });

    return libraryFound;
  }

  async readAllBooks({ queryLibrary }: ReadAllBooksDTO): Promise<BookEntity[]> {
    const { Books } = await prisma.library.findFirst({
      where: {
        name: queryLibrary,
      },
      include: {
        Books: { include: { Book: true } },
      },
    });

    const result = Books.map((book) => book.Book);

    return result;
  }
}

export { LibraryRepository };
